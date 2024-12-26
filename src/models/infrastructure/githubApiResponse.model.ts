import { GitHubActions } from '../GitHub/GitHubActions.model';
import { GitHubPullRequest } from '../GitHub/GitHubPullRequests.model';
import { GitHubRepository } from '../GitHub/GitHubRepository.model';

export interface GitHubApiResponse {
	repositoryData: GitHubRepository;
	pullRequests: GitHubPullRequest[];
	ciStatus: GitHubActions;
}
