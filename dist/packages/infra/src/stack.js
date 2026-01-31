"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.A1FoundryStack = void 0;
const cdk = require("aws-cdk-lib");
const network_1 = require("./constructs/network");
const storage_1 = require("./constructs/storage");
class A1FoundryStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const network = new network_1.NetworkConstruct(this, 'Network');
        new storage_1.StorageConstruct(this, 'Storage', { vpc: network.vpc });
    }
}
exports.A1FoundryStack = A1FoundryStack;
//# sourceMappingURL=stack.js.map