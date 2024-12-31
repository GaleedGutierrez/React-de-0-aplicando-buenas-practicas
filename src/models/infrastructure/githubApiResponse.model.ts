import { GitHubActions } from '@models/GitHub/GitHubActions.model';
import { GitHubPullRequest } from '@models/GitHub/GitHubPullRequests.model';
import { GitHubRepository } from '@models/GitHub/GitHubRepository.model';

export interface GitHubApiResponse {
	repositoryData: GitHubRepository;
	pullRequests: GitHubPullRequest[];
	ciStatus: GitHubActions;
}
