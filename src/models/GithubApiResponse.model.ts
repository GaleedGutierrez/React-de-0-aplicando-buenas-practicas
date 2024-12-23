import { GithubActions } from './githubActions.model';
import { GithubPullRequest } from './githubPullRequests.model';
import { GithubRepository } from './githubRepository.model';

export interface GithubApiResponse {
	repositoryData: GithubRepository;
	pullRequest: GithubPullRequest[];
	ciStatus: GithubActions;
}
