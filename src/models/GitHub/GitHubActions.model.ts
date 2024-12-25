import { GitHubRepository, Owner } from './GitHubRepository.model';

type Actor = Owner;

export interface Author {
	email: string;
	name: string;
}

export interface HeadCommit {
	author: Author;
	committer: Author;
	id: string;
	message: string;
	timestamp: Date;
	tree_id: string;
}

export interface WorkflowRun {
	actor: Actor;
	artifacts_url: string;
	cancel_url: string;
	check_suite_id: number;
	check_suite_node_id: string;
	check_suite_url: string;
	conclusion: string;
	created_at: Date;
	display_title: string;
	event: string;
	head_branch: string;
	head_commit: HeadCommit;
	head_repository: GitHubRepository;
	head_sha: string;
	html_url: string;
	id: number;
	jobs_url: string;
	logs_url: string;
	name: string;
	node_id: string;
	path: string;
	previous_attempt_url: null;
	pull_requests: unknown[];
	referenced_workflows: unknown[];
	repository: GitHubRepository;
	rerun_url: string;
	run_attempt: number;
	run_number: number;
	run_started_at: Date;
	status: string;
	triggering_actor: Actor;
	updated_at: Date;
	url: string;
	workflow_id: number;
	workflow_url: string;
}

export interface GitHubActions {
	total_count: number;
	workflow_runs: WorkflowRun[];
}
