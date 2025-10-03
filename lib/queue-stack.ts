import * as cdk from 'aws-cdk-lib';
import { Queue } from 'aws-cdk-lib/aws-sqs';
import { Construct } from 'constructs';


export class QueueStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
     const prefix="KuchBHi"
    // The code that defines your stack goes here

    // example resource
    const queue = new Queue(this, `Queue-Service-${prefix}`, {
      queueName: 'my-queue',
      visibilityTimeout: cdk.Duration.seconds(300)
    });
  }
}
