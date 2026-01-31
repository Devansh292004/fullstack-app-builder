import { Module } from '@nestjs/common';
import { ProjectsModule } from './projects/projects.module';
import { AiModule } from './ai/ai.module';
import { PrismaModule } from './prisma';

@Module({
  imports: [PrismaModule, ProjectsModule, AiModule],
})
export class AppModule {}
