import * as cdk from 'aws-cdk-lib';
import { Queue } from 'aws-cdk-lib/aws-sqs';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import { PipelineTestStack } from '../lib/pipeline-test-stack';
import { PipelineTestStage } from './pipeline-test-stage';

interface pipelineStackProps extends cdk.StackProps {
    queueStack: cdk.Stack
}

export class pipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: pipelineStackProps) {
    super(scope, id, props);
     const prefix="room"

         // Create a CodePipeline with CDK Pipelines construct
    const pipeline = new cdk.pipelines.CodePipeline(this, 'Pipeline', {
      pipelineName: 'MyCdkPipeline',
      synth: new cdk.pipelines.ShellStep('Synth', {
        input: cdk.pipelines.CodePipelineSource.gitHub('saurabhsoni379/temp-test-pipeline', 'main',{
             authentication: cdk.SecretValue.secretsManager('github-token'),
        }),
        commands: [
          'npm ci',
          'npm run build',
          'npx cdk synth',
        ],
      }),
    });



    // ✅ Add Stage instead of Stack
    pipeline.addStage(new PipelineTestStage(this, `DevStage-${prefix}`));

  }
}


