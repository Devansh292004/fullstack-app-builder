import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { AiModule } from '../ai/ai.module';
import { GitHubService } from './github.service';
import { DeploymentService } from './deployment.service';
import { AuditLogService } from './audit-log.service';
import { PrismaModule } from '@a1/db';

@Module({
  imports: [AiModule, PrismaModule],
  controllers: [ProjectsController],
  providers: [ProjectsService, GitHubService, DeploymentService, AuditLogService],
})
export class ProjectsModule {}
