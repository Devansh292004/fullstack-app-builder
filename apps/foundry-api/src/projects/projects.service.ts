import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { Emitter } from '@a1/generator';
import * as path from 'path';
import { GitHubService } from './github.service';
import { DeploymentService } from './deployment.service';
import { PrismaService } from '../prisma/prisma.module';

@Injectable()
export class ProjectsService {
  private readonly logger = new Logger(ProjectsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly githubService: GitHubService,
    private readonly deploymentService: DeploymentService,
  ) {}

  async create(data: { name: string; slug: string; pitch: string; spec?: any }) {
    if (!data.slug || !/^[a-z0-9-]+$/.test(data.slug)) {
      throw new BadRequestException('Invalid project slug. Use only lowercase, numbers, and hyphens.');
    }

    // Ensure we have a default tenant for demo purposes
    let tenant = await this.prisma.tenant.findFirst();
    if (!tenant) {
      tenant = await this.prisma.tenant.create({
        data: { name: 'A1 Primary Orbit' }
      });
    }

    const project = await this.prisma.project.create({
      data: {
        name: data.name,
        slug: data.slug,
        description: data.pitch,
        spec: data.spec || {},
        tenantId: tenant.id
      }
    });

    await this.prisma.auditLog.create({
      data: {
        action: 'PROJECT_CREATED',
        metadata: { projectId: project.id, slug: project.slug },
        tenantId: tenant.id
      }
    });

    // Run emission in background
    this.emitProject(project);

    return project;
  }

  private async emitProject(project: any) {
    try {
      const outDir = path.resolve(process.cwd(), 'generated', project.slug);

      const emitter = new Emitter({
        outDir,
        spec: project.spec || {}
      });

      this.logger.log(`Starting emission for ${project.name}...`);
      await emitter.emit();

      // Step 2: Push to GitHub
      this.logger.log(`Exporting to GitHub...`);
      const githubToken = process.env.GITHUB_TOKEN || 'simulated-token';
      await this.githubService.pushToNewRepo(outDir, project.slug, githubToken);

      // Step 3: Deploy to AWS
      this.logger.log(`Deploying to AWS...`);
      const deployResult = await this.deploymentService.deployToAWS(outDir, 'dev');

      await this.prisma.project.update({
        where: { id: project.id },
        data: {
          spec: {
            ...(project.spec as object),
            status: 'ready',
            deployment: deployResult
          }
        }
      });

      this.logger.log(`Project ${project.name} fully shipped!`);
    } catch (error: any) {
      this.logger.error(`Failed to generate project ${project.name}`, error);

      await this.prisma.project.update({
        where: { id: project.id },
        data: {
          spec: {
            ...(project.spec as object),
            status: 'error',
            error: error.message
          }
        }
      });
    }
  }

  async findAll() {
    return this.prisma.project.findMany({
      include: { tenant: true }
    });
  }

  async findOne(slug: string) {
    return this.prisma.project.findUnique({
      where: { slug },
      include: { tenant: true }
    });
  }
}
