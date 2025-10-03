#!/opt/homebrew/opt/node/bin/node
import * as cdk from 'aws-cdk-lib';
import { PipelineTestStack } from '../lib/pipeline-test-stack';
import { pipelineStack } from '../lib/pipeline-stack';

const app = new cdk.App();
const prefix="room"
const queueStack=new PipelineTestStack(app, `ss-${prefix}`, {

});

new pipelineStack(app, `ps-${prefix}`, {
queueStack
});