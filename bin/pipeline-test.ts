#!/opt/homebrew/opt/node/bin/node
import * as cdk from 'aws-cdk-lib';
import { pipelineStack } from '../lib/pipeline-stack';

const app = new cdk.App();
const prefix="KuchBHi"


new pipelineStack(app, `pipeline-Stack-${prefix}`, {});  