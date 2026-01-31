import { Injectable, Logger } from '@nestjs/common';
import { Emitter } from '@a1/generator';
import * as path from 'path';

@Injectable()
export class ProjectsService {
  private readonly logger = new Logger(ProjectsService.name);
  private projects: any[] = [];

  async create(project: any) {
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
      const outDir = path.join(process.cwd(), 'generated', project.slug);
      const emitter = new Emitter({
        outDir,
        spec: project
      });
      await emitter.emit();
      project.status = 'ready';
      project.outputPath = outDir;
      this.logger.log(`Project ${project.name} generated successfully at ${outDir}`);
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
