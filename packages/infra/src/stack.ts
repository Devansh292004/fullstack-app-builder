import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ecs_patterns from 'aws-cdk-lib/aws-ecs-patterns';
import * as rds from 'aws-cdk-lib/aws-rds';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cognito from 'aws-cdk-lib/aws-cognito';
import { Construct } from 'constructs';

export class A1FoundryStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // 1. Networking (Isolated Environment)
    const vpc = new ec2.Vpc(this, 'FoundryVpc', {
      maxAzs: 2,
      natGateways: 1,
    });

    // 2. Identity & Access (Cognito)
    const userPool = new cognito.UserPool(this, 'FoundryUserPool', {
      selfSignUpEnabled: true,
      signInAliases: { email: true },
      autoVerify: { email: true },
      passwordPolicy: {
        minLength: 12,
        requireLowercase: true,
        requireUppercase: true,
        requireDigits: true,
        requireSymbols: true,
      },
    });

    const userPoolClient = userPool.addClient('FoundryClient', {
      authFlows: {
        adminNoSrp: true,
        custom: true,
        userPassword: true,
      },
    });

    // 3. Database (RDS Aurora or Postgres)
    const database = new rds.DatabaseInstance(this, 'FoundryDB', {
      engine: rds.DatabaseInstanceEngine.postgres({ version: rds.PostgresEngineVersion.VER_15 }),
      vpc,
      vpcSubnets: { subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS },
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.BURSTABLE3, ec2.InstanceSize.MEDIUM),
      allocatedStorage: 50,
      backupRetention: cdk.Duration.days(7),
      deletionProtection: false, // For demo/foundry purposes
    });

    // 4. Compute (Fargate Cluster)
    const cluster = new ecs.Cluster(this, 'FoundryCluster', { vpc });

    // 5. Application (Fargate Service)
    const fargateService = new ecs_patterns.ApplicationLoadBalancedFargateService(this, 'FoundryService', {
      cluster,
      cpu: 512,
      memoryLimitMiB: 1024,
      desiredCount: 2,
      taskImageOptions: {
        image: ecs.ContainerImage.fromRegistry('a1foundry/api:latest'),
        environment: {
          DATABASE_URL: `postgresql://postgres@${database.instanceEndpoint.hostname}:5432/foundry`,
          COGNITO_USER_POOL_ID: userPool.userPoolId,
          COGNITO_CLIENT_ID: userPoolClient.userPoolClientId,
        },
      },
      publicLoadBalancer: true,
    });

    // 6. Outputs
    new cdk.CfnOutput(this, 'API_URL', {
      value: fargateService.loadBalancer.loadBalancerDnsName,
    });
  }
}
