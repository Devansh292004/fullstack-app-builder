import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { NetworkConstruct } from './constructs/network';
import { StorageConstruct } from './constructs/storage';

export class A1FoundryStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const network = new NetworkConstruct(this, 'Network');
    new StorageConstruct(this, 'Storage', { vpc: network.vpc });
  }
}
