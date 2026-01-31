import { Injectable, Logger } from '@nestjs/common';
import { ProjectSpecSchema, ProjectSpec } from './spec.schema';

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);

  async generateSpecFromPitch(pitch: string): Promise<ProjectSpec> {
    this.logger.log(`Generating spec for pitch: ${pitch}`);

    // Simulate complex AI reasoning
    const entities = this.inferEntities(pitch);
    const name = this.inferName(pitch);

    const rawSpec = {
      name: name,
      slug: name.toLowerCase().replace(/ /g, '-'),
      description: pitch,
      entities: entities,
      roles: ["Admin", "User", "Manager"],
      integrations: ["stripe", "s3", "sendgrid"],
      infra: {
        region: "us-east-1",
        containerMemory: 1024,
        containerCpu: 512,
      }
    };

    return ProjectSpecSchema.parse(rawSpec);
  }

  private inferName(pitch: string): string {
    if (pitch.toLowerCase().includes('marketplace')) return 'Marketplace Pro';
    if (pitch.toLowerCase().includes('saas')) return 'SaaS Elite';
    if (pitch.toLowerCase().includes('dashboard')) return 'Insight Dashboard';
    return 'A1 Generated Startup';
  }

  private inferEntities(pitch: string) {
    const baseEntities = [
      { name: "User", fields: [{ name: "email", type: "String", required: true }, { name: "name", type: "String", required: false }] }
    ];

    if (pitch.toLowerCase().includes('marketplace')) {
      baseEntities.push(
        { name: "Listing", fields: [{ name: "title", type: "String", required: true }, { name: "price", type: "Number", required: true }] },
        { name: "Order", fields: [{ name: "status", type: "String", required: true }] }
      );
    } else if (pitch.toLowerCase().includes('real estate')) {
       baseEntities.push(
        { name: "Property", fields: [{ name: "address", type: "String", required: true }, { name: "valuation", type: "Number", required: true }] },
        { name: "Tour", fields: [{ name: "scheduledAt", type: "DateTime", required: true }] }
      );
    } else {
      baseEntities.push(
        { name: "Organization", fields: [{ name: "name", type: "String", required: true }] },
        { name: "Project", fields: [{ name: "title", type: "String", required: true }] }
      );
    }

    return baseEntities;
  }

  async auditSecurity(spec: any) {
    this.logger.log(`Auditing security for spec: ${spec.name}`);
    return {
      score: 98,
      suggestions: [
        "Enforce strict CORS for .a1foundry.com domains",
        "Enable RDS Storage Encryption at rest",
        "Implement JWT rotation for User role"
      ],
      isSecure: true
    };
  }
}
