import { Card } from '@components/Card';
import { CardsSkeleton } from '@components/Card/skeleton';
import type { GitHubRepository } from '@models/domain/GitHubRepository.model';
import type { GitHubRepositoryRepository } from '@models/domain/GitHubRepositoryRepository.model';
import type { Resource } from '@utils/wrapPromise';
import wrapPromise from '@utils/wrapPromise';
import { type JSX, Suspense } from 'react';

import { config } from '@/devdash.config';

import styles from './index.module.css';

interface Properties {
	repository: GitHubRepositoryRepository;
}

interface DetailContentProperties {
	resource: Resource<GitHubRepository[]>;
}

const REPOSITORY_URLS = config.widgets.map((widget) => widget.repositoryUrl);

function DashboardContent({ resource }: DetailContentProperties): JSX.Element {
	const repositories = resource.read();

	return (
		<>
			{repositories.length === 0 && <p>No hay widgets configurados</p>}
			{repositories.length > 0 &&
				repositories.map((widget) => (
					<Card
						key={`${widget.id.value}`}
						widget={widget}
					/>
				))}
		</>
	);
}

export const Dashboard = ({ repository }: Properties): JSX.Element => {
	const RESOURCE = wrapPromise(repository.search(REPOSITORY_URLS));
	const AMOUNT_OF_WIDGETS = config.widgets.length;

	return (
		<main className={styles.container}>
			<Suspense
				fallback={<CardsSkeleton numberOfWidgets={AMOUNT_OF_WIDGETS} />}
			>
				<DashboardContent resource={RESOURCE} />
				<CardsSkeleton numberOfWidgets={AMOUNT_OF_WIDGETS} />
			</Suspense>
		</main>
	);
};
