#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import {AppSyncWorkingLunchStack} from '../lib/appsync-wl-stack';

const app = new cdk.App();
new AppSyncWorkingLunchStack(app, 'AppSyncWorkingLunchStack');