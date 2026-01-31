"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ProjectsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectsService = void 0;
const common_1 = require("@nestjs/common");
const generator_1 = require("@a1/generator");
const path = require("path");
let ProjectsService = ProjectsService_1 = class ProjectsService {
    constructor() {
        this.logger = new common_1.Logger(ProjectsService_1.name);
        this.projects = [];
    }
    async create(project) {
        const newProject = {
            ...project,
            id: Date.now().toString(),
            createdAt: new Date(),
            status: 'generating'
        };
        this.projects.push(newProject);
        this.emitProject(newProject);
        return newProject;
    }
    async emitProject(project) {
        try {
            const outDir = path.join(process.cwd(), 'generated', project.slug);
            const emitter = new generator_1.Emitter({
                outDir,
                spec: project
            });
            await emitter.emit();
            project.status = 'ready';
            project.outputPath = outDir;
            this.logger.log(`Project ${project.name} generated successfully at ${outDir}`);
        }
        catch (error) {
            project.status = 'error';
            project.error = error.message;
            this.logger.error(`Failed to generate project ${project.name}`, error);
        }
    }
    findAll() {
        return this.projects;
    }
};
exports.ProjectsService = ProjectsService;
exports.ProjectsService = ProjectsService = ProjectsService_1 = __decorate([
    (0, common_1.Injectable)()
], ProjectsService);
//# sourceMappingURL=projects.service.js.map