"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageConstruct = void 0;
const constructs_1 = require("constructs");
const s3 = require("aws-cdk-lib/aws-s3");
const rds = require("aws-cdk-lib/aws-rds");
class StorageConstruct extends constructs_1.Construct {
    constructor(scope, id, props) {
        super(scope, id);
        this.bucket = new s3.Bucket(this, 'AssetsBucket', { encryption: s3.BucketEncryption.S3_MANAGED });
        this.db = new rds.DatabaseInstance(this, 'Instance', {
            engine: rds.DatabaseInstanceEngine.postgres({ version: rds.PostgresEngineVersion.VER_15 }),
            vpc: props.vpc,
        });
    }
}
exports.StorageConstruct = StorageConstruct;
//# sourceMappingURL=storage.js.map