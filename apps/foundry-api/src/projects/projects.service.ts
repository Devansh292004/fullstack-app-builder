import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { Emitter } from '@a1/generator';
import * as path from 'path';
import { GitHubService } from './github.service';
import { DeploymentService } from './deployment.service';

@Injectable()
export class ProjectsService {
  private readonly logger = new Logger(ProjectsService.name);
  private projects: any[] = [];

  constructor(
    private readonly githubService: GitHubService,
    private readonly deploymentService: DeploymentService,
  ) {}

  async create(project: any) {
    if (!project.slug || !/^[a-z0-9-]+$/.test(project.slug)) {
      throw new BadRequestException('Invalid project slug. Use only lowercase, numbers, and hyphens.');
    }

    const newProject = {
      ...project,
      id: Date.now().toString(),
      createdAt: new Date(),
      status: 'generating'
    };
    this.projects.push(newProject);

    // Run emission in background
    this.emitProject(newProject);

    return newProject;
  }

  private async emitProject(project: any) {
    try {
      const outDir = path.resolve(process.cwd(), 'generated', project.slug);

      // Safety check for path traversal
      if (!outDir.startsWith(path.join(process.cwd(), 'generated'))) {
        throw new Error('Invalid output directory');
      }

      const emitter = new Emitter({
        outDir,
        spec: project
      });

      this.logger.log(`Starting emission for ${project.name}...`);
      await emitter.emit();

      // Step 2: Push to GitHub
      this.logger.log(`Exporting to GitHub...`);
      await this.githubService.pushToNewRepo(outDir, project.slug, 'fake-token');

      // Step 3: Deploy to AWS
      this.logger.log(`Deploying to AWS...`);
      const deployResult = await this.deploymentService.deployToAWS(outDir, 'dev');

      project.status = 'ready';
      project.outputPath = outDir;
      project.deployment = deployResult;
      this.logger.log(`Project ${project.name} fully shipped!`);
    } catch (error: any) {
      project.status = 'error';
      project.error = error.message;
      this.logger.error(`Failed to generate project ${project.name}`, error);
    }
  }

  findAll() {
    return this.projects;
  }
}
