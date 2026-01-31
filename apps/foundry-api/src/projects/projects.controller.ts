import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ProjectsService } from './projects.service';

@ApiTags('projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new project from a pitch/spec' })
  create(@Body() createProjectDto: any) {
    return this.projectsService.create(createProjectDto);
  }

  @Post('generate')
  @ApiOperation({ summary: 'Generate a project spec from a pitch using AI' })
  async generate(@Body() body: { pitch: string }) {
    // In a real app, this would call the AiService
    return {
      name: 'Generated Startup',
      slug: 'generated-startup',
      description: `A startup based on: ${body.pitch}`,
      entities: [
        { name: 'User', fields: [{ name: 'email', type: 'String', required: true }] },
        { name: 'Task', fields: [{ name: 'title', type: 'String', required: true }] }
      ]
    };
  }

  @Get()
  findAll() {
    return this.projectsService.findAll();
  }
}
