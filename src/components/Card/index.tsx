import Check from '@icons/check.svg';
import Error from '@icons/error.svg';
import Lock from '@icons/lock.svg';
import Unlock from '@icons/unlock.svg';
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
}

export const Card = ({
	login,
	name,
	htmlUrl,
	isPrivate,
	githubActions,
	date,
}: Properties): JSX.Element => (
	<article>
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
		<p>Last update {isoToReadableDate(date)}</p>
		{githubActions.workflow_runs.length > 0 &&
			(githubActions.workflow_runs[0].status === 'completed' ? (
				<Check />
			) : (
				<Error />
			))}
	</article>
);
