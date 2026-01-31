import { Injectable, Logger } from '@nestjs/common';
import { simpleGit, SimpleGit } from 'simple-git';

@Injectable()
export class GitHubService {
  private readonly logger = new Logger(GitHubService.name);

  async pushToNewRepo(localPath: string, repoName: string, githubToken: string) {
    this.logger.log(`Pushing code from ${localPath} to GitHub repository: ${repoName}`);

    const git: SimpleGit = simpleGit(localPath);

    try {
      await git.init();
      await git.add('./*');
      await git.commit('Initial commit from A1 App Foundry');

      const remote = `https://x-access-token:${githubToken}@github.com/a1foundry/${repoName}.git`;

      this.logger.log(`Setting remote origin: ${remote}`);
      await git.addRemote('origin', remote);

      // Perform actual push
      await git.push('origin', 'main');

      return { success: true, url: `https://github.com/a1foundry/${repoName}` };
    } catch (error: any) {
      this.logger.error(`GitHub export failed: ${error.message}`);
      throw error;
    }
  }
}
