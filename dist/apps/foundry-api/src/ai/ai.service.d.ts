export declare class AiService {
    private readonly logger;
    generateSpecFromPitch(pitch: string): Promise<{
        name: string;
        slug: string;
        description: string;
        entities: {
            name: string;
            fields: {
                name: string;
                type: string;
                required: boolean;
            }[];
        }[];
        roles: string[];
        integrations: string[];
    }>;
    auditSecurity(spec: any): Promise<{
        score: number;
        suggestions: string[];
        isSecure: boolean;
    }>;
}
