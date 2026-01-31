import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ProjectsService } from './projects.service';
import { AiService } from '../ai/ai.service';
import { CreateProjectDto } from './dto/create-project.dto';

@ApiTags('projects')
@Controller('projects')
export class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly aiService: AiService
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new project from a pitch/spec' })
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }

  @Post('generate')
  @ApiOperation({ summary: 'Generate a project spec from a pitch using AI' })
  async generate(@Body() body: { pitch: string }) {
    const spec = await this.aiService.generateSpecFromPitch(body.pitch);
    const audit = await this.aiService.auditSecurity(spec);
    return { ...spec, securityAudit: audit };
  }

  @Get()
  findAll() {
    return this.projectsService.findAll();
  }
}
