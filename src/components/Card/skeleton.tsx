import 'react-loading-skeleton/dist/skeleton.css';

import PullRequests from '@icons/git-pull-request.svg';
import IssueOpened from '@icons/issue-opened.svg';
import Forks from '@icons/repo-forked.svg';
import Start from '@icons/star.svg';
import Watchers from '@icons/watchers.svg';
import type { JSX } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import styles from './index.module.css';
import stylesSkeleton from './skeleton.module.css';

interface CardsSkeletonProperties {
	numberOfWidgets: number;
}

function CardSkeleton(): JSX.Element {
	return (
		<article className={styles.widget}>
			<header
				className={`${styles.widget__header} ${stylesSkeleton.widget__header}`}
			>
				<Skeleton
					baseColor="#3CFF64"
					highlightColor="#1a2233"
					width="70%"
				/>
			</header>
			<main
				className={`${styles.widget__body} ${stylesSkeleton.widget__body}`}
			>
				<p>
					Last update{' '}
					<Skeleton
						inline
						width="20%"
					/>
				</p>
				<p className={styles.widget__description}>
					<Skeleton height={45} />
				</p>
			</main>
			<footer
				className={`${styles.widget__footer} ${stylesSkeleton.widget__footer}`}
			>
				<div className={styles.widget__stat}>
					<Start />
					<span>
						<Skeleton width={35} />
					</span>
				</div>
				<div className={styles.widget__stat}>
					<Watchers />
					<span>
						<Skeleton width={25} />
					</span>
				</div>
				<div className={styles.widget__stat}>
					<Forks />
					<span>
						<Skeleton width={15} />
					</span>
				</div>
				<div className={styles.widget__stat}>
					<IssueOpened />
					<span>
						<Skeleton width={15} />
					</span>
				</div>
				<div className={styles.widget__stat}>
					<PullRequests />
					<span>
						<Skeleton width={15} />
					</span>
				</div>
			</footer>
		</article>
	);
}

export function CardsSkeleton({
	numberOfWidgets,
}: CardsSkeletonProperties): JSX.Element {
	return (
		<SkeletonTheme
			baseColor="#1A2233"
			highlightColor="#535966"
		>
			{Array.from({ length: numberOfWidgets }).map(() => (
				<CardSkeleton key={globalThis.crypto.randomUUID()} />
			))}
		</SkeletonTheme>
	);
}
