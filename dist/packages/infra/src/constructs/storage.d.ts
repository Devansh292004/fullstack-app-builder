import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as rds from 'aws-cdk-lib/aws-rds';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
export declare class StorageConstruct extends Construct {
    readonly bucket: s3.IBucket;
    readonly db: rds.IDatabaseInstance;
    constructor(scope: Construct, id: string, props: {
        vpc: ec2.IVpc;
    });
}
