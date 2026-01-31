import { ProjectsService } from './projects.service';
import { AiService } from '../ai/ai.service';
import { CreateProjectDto } from './dto/create-project.dto';
export declare class ProjectsController {
    private readonly projectsService;
    private readonly aiService;
    constructor(projectsService: ProjectsService, aiService: AiService);
    create(createProjectDto: CreateProjectDto): Promise<any>;
    generate(body: {
        pitch: string;
    }): Promise<{
        securityAudit: {
            score: number;
            suggestions: string[];
            isSecure: boolean;
        };
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
    findAll(): any[];
}
