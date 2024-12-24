export interface RepositoryId {
	organization: string;
	name: string;
}

export interface GithubRepository {
	id: RepositoryId;
	url: string;
	description: string;
	isPrivate: boolean;
	updatedAt: Date;
	hasWorkflows: boolean;
	isLastWorkflowSuccess: boolean;
	stars: number;
	watchers: number;
	forks: number;
	issues: number;
	pullRequests: number;
}
