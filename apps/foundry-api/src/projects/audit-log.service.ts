import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@a1/db';

@Injectable()
export class AuditLogService {
  constructor(private prisma: PrismaService) {}

  async log(tenantId: string, action: string, metadata: any, userId?: string): Promise<any> {
    return this.prisma.auditLog.create({
      data: {
        tenantId,
        action,
        metadata,
        userId
      }
    });
  }
}
