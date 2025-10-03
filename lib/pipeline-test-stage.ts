import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { PipelineTestStack } from './pipeline-test-stack';

export class PipelineTestStage extends cdk.Stage {
  constructor(scope: Construct, id: string, props?: cdk.StageProps) {
    super(scope, id, props);

    // Add your stack(s) to this Stage
    new PipelineTestStack(this, 'PipelineTestStack', props);
  }
}
