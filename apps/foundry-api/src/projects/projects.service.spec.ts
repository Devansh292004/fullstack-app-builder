import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsService } from './projects.service';
import { GitHubService } from './github.service';
import { DeploymentService } from './deployment.service';

describe('ProjectsService', () => {
  let service: ProjectsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectsService,
        {
          provide: GitHubService,
          useValue: { pushToNewRepo: jest.fn() },
        },
        {
          provide: DeploymentService,
          useValue: { deployToAWS: jest.fn() },
        },
      ],
    }).compile();

    service = module.get<ProjectsService>(ProjectsService);
    // Mock the background emission to avoid async leaks
    jest.spyOn(service as any, 'emitProject').mockImplementation(() => Promise.resolve());
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a project and return it', async () => {
    const project = { name: 'Test Project', slug: 'test-project' };
    const result = await service.create(project);
    expect(result).toBeDefined();
    expect(result.name).toEqual('Test Project');
    expect(result.status).toEqual('generating');
  });

  it('should throw BadRequestException for invalid slug', async () => {
    const project = { name: 'Invalid', slug: 'Invalid Slug' };
    await expect(service.create(project)).rejects.toThrow();
  });
});
