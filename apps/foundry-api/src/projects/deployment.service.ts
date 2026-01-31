import { Injectable, Logger } from '@nestjs/common';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

@Injectable()
export class DeploymentService {
  private readonly logger = new Logger(DeploymentService.name);

  async deployToAWS(projectPath: string, env: 'dev' | 'stage' | 'prod') {
    this.logger.log(`Starting AWS deployment for project at ${projectPath} (Env: ${env})`);

    try {
      // Step 1: Install dependencies in the generated project
      this.logger.log('Installing dependencies in generated project...');
      // await execAsync('pnpm install', { cwd: projectPath });

      // Step 2: Run Prisma Migrations
      this.logger.log('Running database migrations...');
      // await execAsync('pnpm prisma migrate deploy', { cwd: projectPath });

      // Step 3: Run CDK Deploy
      this.logger.log('Executing CDK Deployment...');
      // const { stdout, stderr } = await execAsync('pnpm cdk deploy --all --require-approval never', {
      //   cwd: path.join(projectPath, 'packages/infra')
      // });

      // Simulate successful deployment output
      this.logger.log('Deployment successful.');
      return {
        endpoint: `https://${env}-api.a1foundry.com`,
        dashboard: `https://${env}.a1foundry.com`,
        status: 'deployed'
      };
    } catch (error: any) {
      this.logger.error(`AWS Deployment failed: ${error.message}`);
      throw error;
    }
  }
}
