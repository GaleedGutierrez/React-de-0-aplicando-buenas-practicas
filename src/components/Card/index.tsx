import Check from '@icons/check.svg';
import Error from '@icons/error.svg';
import PullRequests from '@icons/git-pull-request.svg';
import IssueOpened from '@icons/issue-opened.svg';
import Lock from '@icons/lock.svg';
import Forks from '@icons/repo-forked.svg';
import Star from '@icons/star.svg';
import Unlock from '@icons/unlock.svg';
import Watchers from '@icons/watchers.svg';
import { JSX } from 'react';

import { GithubActions } from '@/models/githubActions.model';
import { isoToReadableDate } from '@/utils/isoToReadableDate';

import styles from './index.module.css';

interface Properties {
	login: string;
	name: string;
	htmlUrl: string;
	isPrivate: boolean;
	githubActions: GithubActions;
	date: string;
	description: string;
	stargazersCount: number;
	forksCount: number;
	openIssuesCount: number;
	pullRequest: unknown[];
	watchersCount: number;
}

export const Card = ({
	login,
	name,
	htmlUrl,
	isPrivate,
	githubActions,
	date,
	description,
	stargazersCount,
	forksCount,
	openIssuesCount,
	pullRequest,
	watchersCount,
}: Properties): JSX.Element => (
	<article className={styles.widget}>
		<header className={styles.widget__header}>
			<a
				className={styles.widget__title}
				href={htmlUrl}
				rel="noreferrer"
				target="_blank"
				title={`${login}/${name}`}
			>
				{login}/{name}
			</a>
			{isPrivate ? <Lock /> : <Unlock />}
		</header>

		<main>
			<div>
				<p>Last update {isoToReadableDate(date)}</p>
				{githubActions.workflow_runs.length > 0 &&
					(githubActions.workflow_runs[0].status === 'completed' ? (
						<Check />
					) : (
						<Error />
					))}
			</div>
			<p className={styles.widget__description}>{description}</p>
		</main>

		<footer className={styles.widget__footer}>
			<div className={styles.widget__stat}>
				<Star />
				<p>{stargazersCount}</p>
			</div>
			<div className={styles.widget__stat}>
				<Watchers />
				<p>{watchersCount}</p>
			</div>
			<div className={styles.widget__stat}>
				<Forks />
				<span>{forksCount}</span>
			</div>
			<div className={styles.widget__stat}>
				<IssueOpened />
				<span>{openIssuesCount}</span>
			</div>
			<div className={styles.widget__stat}>
				<PullRequests />
				<span>{pullRequest.length}</span>
			</div>
		</footer>
	</article>
);
