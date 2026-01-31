import { Injectable, Logger } from '@nestjs/common';
// We mock the Emitter import since we might not have the package linked in this shell
// import { Emitter } from '@a1/generator';
import * as path from 'path';

@Injectable()
export class ProjectsService {
  private readonly logger = new Logger(ProjectsService.name);
  private projects = [];

  async create(project: any) {
    const newProject = {
      ...project,
      id: Date.now().toString(),
      createdAt: new Date(),
      status: 'generating'
    };
    this.projects.push(newProject);
    return newProject;
  }

  findAll() {
    return this.projects;
  }
}
