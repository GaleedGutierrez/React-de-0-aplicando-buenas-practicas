import Check from '@icons/check.svg';
import Error from '@icons/error.svg';
import PullRequests from '@icons/git-pull-request.svg';
import IssueOpened from '@icons/issue-opened.svg';
import Lock from '@icons/lock.svg';
import Forks from '@icons/repo-forked.svg';
import Star from '@icons/star.svg';
import Unlock from '@icons/unlock.svg';
import Watchers from '@icons/watchers.svg';
import type { GitHubRepository } from '@models/domain/GitHubRepository.model';
import { isoToReadableDate } from '@utils/isoToReadableDate';
import type { JSX } from 'react';

import styles from './index.module.css';

interface Properties {
	widget: GitHubRepository;
}

export const Card = ({ widget }: Properties): JSX.Element => {
	const {
		description,
		forks,
		hasWorkflows,
		id,
		isLastWorkflowSuccess,
		isPrivate,
		issues,
		pullRequests,
		stars,
		updatedAt,
		url,
		watchers,
	} = widget;

	return (
		<article className={styles.widget}>
			<header className={styles.widget__header}>
				<a
					className={styles.widget__title}
					href={url}
					rel="noreferrer"
					target="_blank"
					title={`${id.value}`}
				>
					{id.value}
				</a>
				{isPrivate ? <Lock /> : <Unlock />}
			</header>

			<main>
				<div>
					<p>Last update {isoToReadableDate(updatedAt)}</p>
					{hasWorkflows &&
						(isLastWorkflowSuccess ? <Check /> : <Error />)}
				</div>
				<p className={styles.widget__description}>{description}</p>
			</main>

			<footer className={styles.widget__footer}>
				<div className={styles.widget__stat}>
					<Star />
					<p>{stars}</p>
				</div>
				<div className={styles.widget__stat}>
					<Watchers />
					<p>{watchers}</p>
				</div>
				<div className={styles.widget__stat}>
					<Forks />
					<span>{forks}</span>
				</div>
				<div className={styles.widget__stat}>
					<IssueOpened />
					<span>{issues}</span>
				</div>
				<div className={styles.widget__stat}>
					<PullRequests />
					<span>{pullRequests}</span>
				</div>
			</footer>
		</article>
	);
};
