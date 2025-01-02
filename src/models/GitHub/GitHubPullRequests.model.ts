import type { CommonRepo, Owner } from './GitHubRepository.model';

export enum DefaultBranch {
	Main = 'main',
	Master = 'master',
}

export enum SpdxID {
	MIT = 'MIT',
}

export enum LicenseNodeID {
	MDc6TGljZW5ZZTEz = 'MDc6TGljZW5zZTEz',
}

export enum LicenseName {
	MITLicense = 'MIT License',
}

export enum Key {
	MIT = 'mit',
}

export interface Comments {
	href: string;
}

export enum AuthorAssociation {
	Collaborator = 'COLLABORATOR',
	Contributor = 'CONTRIBUTOR',
	Member = 'MEMBER',
	None = 'NONE',
}

export enum TopicEnum {
	Angular = 'angular',
	Javascript = 'javascript',
	Pwa = 'pwa',
	Typescript = 'typescript',
	Web = 'web',
	WebFramework = 'web-framework',
	WebPerformance = 'web-performance',
}

export enum Description {
	DeliverWebAppsWithConfidence = 'Deliver web apps with confidence \uD83D\uDE80',
	OneFrameworkMobileDesktop = 'One framework. Mobile & desktop.',
	TheModernWebDeveloperSPlatform = 'The modern web developer’s platform',
}

export enum Language {
	TypeScript = 'TypeScript',
}

export enum Type {
	Organization = 'Organization',
	User = 'User',
}

export enum UserViewType {
	Public = 'public',
}

export enum MilestoneNodeID {
	MDk6TWlsZXN0B25LMzA0NTk2Nw = 'MDk6TWlsZXN0b25lMzA0NTk2Nw==',
}

export enum State {
	Open = 'open',
}

export enum Title {
	Backlog = 'Backlog',
}

export interface License {
	key: Key;
	name: LicenseName;
	node_id: LicenseNodeID;
	spdx_id: SpdxID;
	url: string;
}

export type User = Owner;

export interface Repo extends CommonRepo {
	default_branch: DefaultBranch;
	deployments_url: string;
	hooks_url: string;
	html_url: string;
	id: number;
	is_template: boolean;
	issue_comment_url: string;
	issue_events_url: string;
	issues_url: string;
	keys_url: string;
	labels_url: string;
	language: Language | null;
	languages_url: string;
	license: License;
	merges_url: string;
	milestones_url: string;
	mirror_url: null;
	name: TopicEnum;
	node_id: string;
	notifications_url: string;
	open_issues: number;
	open_issues_count: number;
	owner: User;
	private: boolean;
	pulls_url: string;
	pushed_at: Date;
	releases_url: string;
	size: number;
	ssh_url: string;
	stargazers_count: number;
	stargazers_url: string;
	statuses_url: string;
	subscribers_url: string;
	subscription_url: string;
	svn_url: string;
	tags_url: string;
	teams_url: string;
	topics: TopicEnum[];
	trees_url: string;
	updated_at: Date;
	url: string;
	visibility: UserViewType;
	watchers: number;
	watchers_count: number;
	web_commit_signoff_required: boolean;
}

export interface Base {
	label: string;
	ref: string;
	repo: Repo;
	sha: string;
	user: User;
}

export interface Links {
	comments: Comments;
	commits: Comments;
	html: Comments;
	issue: Comments;
	review_comment: Comments;
	review_comments: Comments;
	self: Comments;
	statuses: Comments;
}

export interface Label {
	color: string;
	default: boolean;
	description: string;
	id: number;
	name: string;
	node_id: string;
	url: string;
}

export interface Milestone {
	closed_at: null;
	closed_issues: number;
	created_at: Date;
	creator: User;
	description: string;
	due_on: null;
	html_url: string;
	id: number;
	labels_url: string;
	node_id: MilestoneNodeID;
	number: number;
	open_issues: number;
	state: State;
	title: Title;
	updated_at: Date;
	url: string;
}

export interface GitHubPullRequest {
	_links: Links;
	active_lock_reason: null;
	assignee: null;
	assignees: unknown[];
	author_association: AuthorAssociation;
	auto_merge: null;
	base: Base;
	body: null | string;
	closed_at: null;
	comments_url: string;
	commits_url: string;
	created_at: Date;
	diff_url: string;
	draft: boolean;
	head: Base;
	html_url: string;
	id: number;
	issue_url: string;
	labels: Label[];
	locked: boolean;
	merge_commit_sha: null | string;
	merged_at: null;
	milestone: Milestone | null;
	node_id: string;
	number: number;
	patch_url: string;
	requested_reviewers: User[];
	requested_teams: unknown[];
	review_comment_url: string;
	review_comments_url: string;
	state: State;
	statuses_url: string;
	title: string;
	updated_at: Date;
	url: string;
	user: User;
}
