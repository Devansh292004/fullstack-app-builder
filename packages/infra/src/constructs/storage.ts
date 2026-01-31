import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as rds from 'aws-cdk-lib/aws-rds';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
export class StorageConstruct extends Construct {
  public readonly bucket: s3.IBucket;
  public readonly db: rds.IDatabaseInstance;
  constructor(scope: Construct, id: string, props: { vpc: ec2.IVpc }) {
    super(scope, id);
    this.bucket = new s3.Bucket(this, 'AssetsBucket', { encryption: s3.BucketEncryption.S3_MANAGED });
    this.db = new rds.DatabaseInstance(this, 'Instance', {
      engine: rds.DatabaseInstanceEngine.postgres({ version: rds.PostgresEngineVersion.VER_15 }),
      vpc: props.vpc,
    });
  }
}
