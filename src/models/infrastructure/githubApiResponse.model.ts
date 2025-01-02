import type { GitHubActions } from '@models/GitHub/GitHubActions.model';
import type { GitHubPullRequest } from '@models/GitHub/GitHubPullRequests.model';
import type { GitHubRepository } from '@models/GitHub/GitHubRepository.model';

export interface GitHubApiResponse {
	repositoryData: GitHubRepository;
	pullRequests: GitHubPullRequest[];
	ciStatus: GitHubActions;
}
