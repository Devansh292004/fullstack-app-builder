import { Module } from '@nestjs/common';
import { AiService } from './ai.service';
import { AIArchitectService } from './ai-architect.service';

@Module({
  providers: [AiService, AIArchitectService],
  exports: [AiService, AIArchitectService],
})
export class AiModule {}
