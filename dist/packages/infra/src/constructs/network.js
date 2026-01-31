"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetworkConstruct = void 0;
const constructs_1 = require("constructs");
const ec2 = require("aws-cdk-lib/aws-ec2");
class NetworkConstruct extends constructs_1.Construct {
    constructor(scope, id) {
        super(scope, id);
        this.vpc = new ec2.Vpc(this, 'Vpc', { maxAzs: 2 });
    }
}
exports.NetworkConstruct = NetworkConstruct;
//# sourceMappingURL=network.js.map