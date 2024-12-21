export interface Actor {
	avatar_url: string;
	events_url: string;
	followers_url: string;
	following_url: string;
	gists_url: string;
	gravatar_id: string;
	html_url: string;
	id: number;
	login: string;
	node_id: string;
	organizations_url: string;
	received_events_url: string;
	repos_url: string;
	site_admin: boolean;
	starred_url: string;
	subscriptions_url: string;
	type: string;
	url: string;
	user_view_type: string;
}

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

export interface Repository {
	archive_url: string;
	assignees_url: string;
	blobs_url: string;
	branches_url: string;
	collaborators_url: string;
	comments_url: string;
	commits_url: string;
	compare_url: string;
	contents_url: string;
	contributors_url: string;
	deployments_url: string;
	description: string;
	downloads_url: string;
	events_url: string;
	fork: boolean;
	forks_url: string;
	full_name: string;
	git_commits_url: string;
	git_refs_url: string;
	git_tags_url: string;
	hooks_url: string;
	html_url: string;
	id: number;
	issue_comment_url: string;
	issue_events_url: string;
	issues_url: string;
	keys_url: string;
	labels_url: string;
	languages_url: string;
	merges_url: string;
	milestones_url: string;
	name: string;
	node_id: string;
	notifications_url: string;
	owner: Actor;
	private: boolean;
	pulls_url: string;
	releases_url: string;
	stargazers_url: string;
	statuses_url: string;
	subscribers_url: string;
	subscription_url: string;
	tags_url: string;
	teams_url: string;
	trees_url: string;
	url: string;
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
	head_repository: Repository;
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
	repository: Repository;
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

export interface GithubActions {
	total_count: number;
	workflow_runs: WorkflowRun[];
}
