import { GitHubActions } from '../GitHubActions.model';
import { GitHubPullRequest } from '../GitHubPullRequests.model';
import { GitHubRepository } from '../GitHubRepository.model';

export interface GitHubApiResponse {
	repositoryData: GitHubRepository;
	pullRequests: GitHubPullRequest[];
	ciStatus: GitHubActions;
}
