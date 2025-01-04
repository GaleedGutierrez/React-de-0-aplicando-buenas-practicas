import Lock from '@icons/lock.svg';
import Unlock from '@icons/unlock.svg';
import wrapPromise, { type Resource } from '@utils/wrapPromise';
import { type JSX, Suspense, useMemo } from 'react';
import { useParams } from 'react-router';

import type { GitHubRepository } from '@/models/domain/GitHubRepository.model';
import type { GitHubRepositoryRepository } from '@/models/domain/GitHubRepositoryRepository.model';

import styles from './index.module.css';

interface Properties {
	repository: GitHubRepositoryRepository;
}

interface RepositoryParameters extends Record<string, string> {
	organization: string;
	name: string;
}

export function Detail({ repository }: Properties): JSX.Element {
	const { organization, name } = useParams() as RepositoryParameters;

	const repositoryId = useMemo(
		() => ({ organization, name }),
		[organization, name],
	);

	const RESOURCE = wrapPromise(repository.byId(repositoryId));

	return (
		<Suspense fallback={<h1>Loading...</h1>}>
			{/* <ErrorBoundary fallback={<Navigate to={AppRoutes.error404} />}> */}
			<DetailContent resource={RESOURCE} />
			{/* </ErrorBoundary> */}
		</Suspense>
	);
}

function DetailContent({
	resource,
}: {
	resource: Resource<GitHubRepository>;
}): JSX.Element {
	const REPOSITORY_DATA = resource.read();

	return (
		<main className={styles['repository-detail']}>
			<header className={styles.header}>
				<a
					href={REPOSITORY_DATA.url}
					rel="noreferrer"
					target="_blank"
				>
					<h2 className={styles.header__title}>
						{REPOSITORY_DATA.id.organization}/
						{REPOSITORY_DATA.id.name}
					</h2>
				</a>
				{REPOSITORY_DATA.isPrivate ? <Lock /> : <Unlock />}
			</header>

			<p>{REPOSITORY_DATA.description}</p>

			<h3>Repository stats</h3>
			<table className={styles.detail__table}>
				<thead>
					<tr>
						<th>Stars</th>
						<th>Watchers</th>
						<th>Forks</th>
						<th>Issues</th>
						<th>Pull Requests</th>
					</tr>
				</thead>

				<tbody>
					<tr>
						<td>{REPOSITORY_DATA.stars}</td>
						<td>{REPOSITORY_DATA.watchers}</td>
						<td>{REPOSITORY_DATA.forks}</td>
						<td>{REPOSITORY_DATA.issues}</td>
						<td>{REPOSITORY_DATA.pullRequests}</td>
					</tr>
				</tbody>
			</table>

			<h3>Workflow runs status</h3>
			<table className={styles.detail__table}>
				<thead>
					<tr>
						<th>Name</th>
						<th>Title</th>
						<th>Date</th>
						<th>Status</th>
						<th>Conclusion</th>
					</tr>
				</thead>
				<tbody>
					{REPOSITORY_DATA.workFlowRunsStatus.map((run) => (
						<tr key={run.id}>
							<td>{run.name}</td>
							<td>
								<a
									href={run.url}
									rel="noreferrer"
									target="_blank"
								>
									{run.title}
								</a>
							</td>
							<td>{run.createdAt.toLocaleDateString('es-ES')}</td>
							<td>{run.status}</td>
							<td>{run.conclusion}</td>
						</tr>
					))}
				</tbody>
			</table>
		</main>
	);
}
