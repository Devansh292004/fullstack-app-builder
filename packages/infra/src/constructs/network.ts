import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
export class NetworkConstruct extends Construct {
  public readonly vpc: ec2.IVpc;
  constructor(scope: Construct, id: string) {
    super(scope, id);
    this.vpc = new ec2.Vpc(this, 'Vpc', { maxAzs: 2 });
  }
}
