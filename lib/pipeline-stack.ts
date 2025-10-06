import * as cdk from 'aws-cdk-lib';
import { Queue } from 'aws-cdk-lib/aws-sqs';
import { Construct } from 'constructs';
import { PipelineCombineStack } from './pipeline-combine-stack';





export class pipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
     const prefix="kuchBHi"

         // Create a CodePipeline with CDK Pipelines construct
    const pipeline = new cdk.pipelines.CodePipeline(this, `Pipeline-${prefix}`, {
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
    pipeline.addStage(new PipelineCombineStack(this, `Dev-Stage-new`));
    // pipeline.addStage(new PipelineCombineStack(this, `Prod-Stage-new`));

  }
}


