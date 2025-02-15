type CustomProperties = unknown;

export interface License {
	key: string;
	name: string;
	node_id: string;
	spdx_id: string;
	url: string;
}

export interface Permissions {
	admin: boolean;
	maintain: boolean;
	push: boolean;
	triage: boolean;
	pull: boolean;
}

export interface Owner {
	login: string;
	id: number;
	node_id: string;
	avatar_url: string;
	gravatar_id: string;
	url: string;
	html_url: string;
	followers_url: string;
	following_url: string;
	gists_url: string;
	starred_url: string;
	subscriptions_url: string;
	organizations_url: string;
	repos_url: string;
	events_url: string;
	received_events_url: string;
	type: string;
	site_admin: boolean;
	user_view_type: string;
}

export interface CommonRepo {
	default_branch: string;
	deployments_url: string;
	description: string;
	disabled: boolean;
	downloads_url: string;
	events_url: string;
	fork: boolean;
	forks: number;
	forks_count: number;
	forks_url: string;
	full_name: string;
	git_commits_url: string;
	git_refs_url: string;
	git_tags_url: string;
	git_url: string;
	has_discussions: boolean;
	has_downloads: boolean;
	has_issues: boolean;
	has_pages: boolean;
	has_projects: boolean;
}

export interface GitHubRepository extends CommonRepo {
	permissions: Permissions;
	allow_forking: boolean;
	archive_url: string;
	archived: boolean;
	assignees_url: string;
	blobs_url: string;
	branches_url: string;
	clone_url: string;
	collaborators_url: string;
	comments_url: string;
	commits_url: string;
	compare_url: string;
	contents_url: string;
	contributors_url: string;
	created_at: string;
	custom_properties: CustomProperties;
	has_wiki: boolean;
	homepage: string;
	hooks_url: string;
	html_url: string;
	id: number;
	is_template: boolean;
	issue_comment_url: string;
	issue_events_url: string;
	issues_url: string;
	keys_url: string;
	labels_url: string;
	language: string;
	languages_url: string;
	license: License;
	merges_url: string;
	milestones_url: string;
	mirror_url: null;
	name: string;
	network_count: number;
	node_id: string;
	notifications_url: string;
	open_issues: number;
	open_issues_count: number;
	organization: Owner;
	owner: Owner;
	private: boolean;
	pulls_url: string;
	pushed_at: string;
	releases_url: string;
	size: number;
	ssh_url: string;
	stargazers_count: number;
	stargazers_url: string;
	statuses_url: string;
	subscribers_count: number;
	subscribers_url: string;
	subscription_url: string;
	svn_url: string;
	tags_url: string;
	teams_url: string;
	temp_clone_token: string;
	topics: string[];
	trees_url: string;
	updated_at: string;
	url: string;
	visibility: string;
	watchers: number;
	watchers_count: number;
	web_commit_signoff_required: boolean;
}
