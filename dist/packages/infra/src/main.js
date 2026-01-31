#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("source-map-support/register");
const cdk = require("aws-cdk-lib");
const stack_1 = require("./stack");
const app = new cdk.App();
new stack_1.A1FoundryStack(app, 'A1FoundryStack', {
    env: {
        account: process.env.CDK_DEFAULT_ACCOUNT,
        region: process.env.CDK_DEFAULT_REGION
    },
});
//# sourceMappingURL=main.js.map