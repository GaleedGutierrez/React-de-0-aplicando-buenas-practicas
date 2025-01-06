export enum StatusWorkFlow {
	QUEUED = 'queued',
	IN_PROGRESS = 'in_progress',
	COMPLETED = 'completed',
	WAITING = 'waiting',
	REQUESTED = 'requested',
	PENDING = 'pending',
}

export interface RepositoryId {
	value: `${string}/${string}`;
	organization: string;
	name: string;
}
export interface WorkFlowRunStatus {
	id: number;
	name: string;
	title: string;
	url: string;
	createdAt: Date;
	status: StatusWorkFlow;
	conclusion: string | null;
}

export interface GitHubRepository {
	id: RepositoryId;
	url: string;
	description: string;
	isPrivate: boolean;
	updatedAt: Date;
	hasWorkflows: boolean;
	isLastWorkflowSuccess: boolean;
	workFlowRunsStatus: WorkFlowRunStatus[];
	stars: number;
	watchers: number;
	forks: number;
	issues: number;
	pullRequests: number;
}
