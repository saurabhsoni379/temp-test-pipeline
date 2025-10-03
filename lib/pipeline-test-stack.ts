import * as cdk from 'aws-cdk-lib';
import { Queue } from 'aws-cdk-lib/aws-sqs';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';


export class PipelineTestStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
     const prefix="room"
    // The code that defines your stack goes here

    // example resource
    const queue = new Queue(this, `Queue${prefix}`, {
      visibilityTimeout: cdk.Duration.seconds(300)
    });
  }
}
