import { StageStackGenerator } from './pipeline-stage';
import { Stack } from 'aws-cdk-lib';
import { Construct } from 'constructs'; 
import { StageName, RegionalEnvironmentConfig } from './pipeline-stage';
import { QueueStack } from './queue-stack';

export class StackGenerator extends StageStackGenerator {
  generateStageStacks(stageConstruct: Construct, nameSuffix: string, stageName: StageName ): Stack[] {
    const generatedStacks: Stack[] = [];
    const prefix=`${stageName.toString()}`
    // Add your stack(s) to this Stage
  const firstStack=  new QueueStack(stageConstruct, `queue-${prefix}`, {});

    generatedStacks.push(firstStack);

    return generatedStacks;
  }
}
