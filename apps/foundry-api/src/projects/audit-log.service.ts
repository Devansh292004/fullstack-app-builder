import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma';

@Injectable()
export class AuditLogService {
  private readonly logger = new Logger(AuditLogService.name);

  constructor() {}

  async log(action: string, details: any) {
    this.logger.log(`Audit: ${action} - ${JSON.stringify(details)}`);
  }
}
