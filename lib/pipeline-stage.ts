import { Stack, Stage, StageProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';


export enum StageName {
  production = 'production', // (Prod-Root & linked accounts)
  preprod = 'preprod', // (Dev-Root & linked accounts)
  //qa = 'qa',                 // FUTURE: Planned step in-between Dev & PreProd.
  development = 'development', // (offshore)
  demo = 'demo', // Configured for saas application
  sandbox = 'sandbox' // Isolated sandbox environments.
}


export interface StageConfig {
  readonly stageName: StageName;
  readonly regionalEnvironments: RegionalEnvironmentConfig[];
}

export interface RegionalEnvironmentConfig {
  // AWS Account & Region to deploy to
  env: {
    account: string;
    region: string;
  };
  // isProd flag used to set things like destroy behavior and retention
  readonly isProd: boolean;

}

export interface PipelineStageProps extends StageProps {
  nameSuffix: string;
  stageName: string; // Note this is not the same as StageName type, as it is the name of the pipeline stage which needs to include region for uniqueness
  CRxStageName: StageName; // Workaround for the stageName already being used by the StageProps of the CodePipeline lib
  stageStackGenerator: StageStackGenerator;
}

export abstract class StageStackGenerator {
  abstract generateStageStacks(
    stageConstruct: Construct, 
    nameSuffix: string,
    stageName: StageName): Stack[];
}

export class PipelineStage extends Stage {
  constructor(scope: Construct, id: string, props: PipelineStageProps) {
    super(scope, id, props);

    const stacks = props.stageStackGenerator.generateStageStacks(this, props.nameSuffix, props.CRxStageName, );
    for (const stack of stacks) {
      console.log(`Generated pipeline stack: ${stack.stackName}`);
    }``
  }
}


export function getPipelineStage(scope: Construct, shortName: string, stageConfig: StageConfig , stageStackGenerator: StageStackGenerator, stackNameSuffix?: string): PipelineStage {
  let nameSuffix = `${stageConfig.stageName.toString()}`;

  // option item
  if (stackNameSuffix) {
      nameSuffix = `${nameSuffix}-${stackNameSuffix}`;
  }

  const pipelineStage = new PipelineStage(
    scope,
    `${shortName}-${nameSuffix}`,
    {
      nameSuffix,
      stageName: "development-vchauhan",
      CRxStageName: stageConfig.stageName,
      stageStackGenerator,
    },
  );

  return pipelineStage;
}