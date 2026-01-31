"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AiService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiService = void 0;
const common_1 = require("@nestjs/common");
let AiService = AiService_1 = class AiService {
    constructor() {
        this.logger = new common_1.Logger(AiService_1.name);
    }
    async generateSpecFromPitch(pitch) {
        this.logger.log(`Generating spec for pitch: ${pitch}`);
        return {
            name: "Luxury SaaS Project",
            slug: "luxury-saas-project",
            description: `A production-grade application based on: ${pitch}`,
            entities: [
                { name: "User", fields: [{ name: "email", type: "String", required: true }] },
                { name: "Product", fields: [{ name: "name", type: "String", required: true }, { name: "price", type: "Number", required: true }] }
            ],
            roles: ["Admin", "Customer"],
            integrations: ["stripe", "s3"]
        };
    }
    async auditSecurity(spec) {
        this.logger.log(`Auditing security for spec: ${spec.name}`);
        return {
            score: 95,
            suggestions: ["Enforce MFA for Admin role", "Add rate limiting to public endpoints"],
            isSecure: true
        };
    }
};
exports.AiService = AiService;
exports.AiService = AiService = AiService_1 = __decorate([
    (0, common_1.Injectable)()
], AiService);
//# sourceMappingURL=ai.service.js.map