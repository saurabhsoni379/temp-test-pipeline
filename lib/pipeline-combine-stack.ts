import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { QueueStack } from './queue-stack';


export class PipelineCombineStack extends cdk.Stage {
  constructor(scope: Construct, id: string, props?: cdk.StageProps) {
    super(scope, id, props);
    const prefix="KuchBHi"
    // Add your stack(s) to this Stage
    new QueueStack(this, `queue-${prefix}`, props);
  }
}
