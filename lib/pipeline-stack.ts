import * as cdk from 'aws-cdk-lib';
import { Queue } from 'aws-cdk-lib/aws-sqs';
import { Construct } from 'constructs';
import { getPipelineStage, StageConfig, StageName, StageStackGenerator } from './pipeline-stage';
import { StackGenerator } from './queue-stack-generator';



export class pipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const prefix="sandbox"
    const shortName = `QueueModule`;

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

    const stageConfig: StageConfig = {
      stageName: StageName.sandbox,
      regionalEnvironments: [
        {
          env: { account: '105052141415', region: 'us-west-2' },
          isProd: false,
        },
      ],
    };

    const stackGenerator = new StackGenerator();

    const pipelineStage = getPipelineStage(scope, shortName, stageConfig, stackGenerator);
      // Here is where you can add things to stages (like `post` validation steps) before adding them to the pipeline construct.
      // Exa: https://aws.amazon.com/blogs/developer/cdk-pipelines-continuous-delivery-for-aws-cdk-applications/
      pipeline.addStage(pipelineStage);




  }
}


