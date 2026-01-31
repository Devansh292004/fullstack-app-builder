import { Module } from '@nestjs/common';
import { ProjectsModule } from './projects/projects.module';
import { AiModule } from './ai/ai.module';
import { PrismaModule } from '@a1/db';

@Module({
  imports: [PrismaModule, ProjectsModule, AiModule],
})
export class AppModule {}
