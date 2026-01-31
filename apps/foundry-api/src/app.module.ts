import { Module } from '@nestjs/common';
import { ProjectsModule } from './projects/projects.module';
import { AiModule } from './ai/ai.module';

@Module({
  imports: [ProjectsModule, AiModule],
})
export class AppModule {}
