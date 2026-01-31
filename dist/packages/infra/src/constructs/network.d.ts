import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
export declare class NetworkConstruct extends Construct {
    readonly vpc: ec2.IVpc;
    constructor(scope: Construct, id: string);
}
