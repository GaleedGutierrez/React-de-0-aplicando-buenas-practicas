import { Dashboard } from '@components/Dashboard';
import { act, render, screen } from '@testing-library/react';
import { GithubRepositoryMother } from '@tests/GithubRepositoryMother';
import { describe, expect, it } from 'vitest';
import { mock } from 'vitest-mock-extended';

import { GitHubRepositoryRepository } from '@/models/domain/GitHubRepositoryRepository.model';

// Mock the entire module
const MOCK_REPOSITORY = mock<GitHubRepositoryRepository>();

describe('Dashboard Component', () => {
	it('renders all widgets when repositories are available', async () => {
		const MOCK_GITHUB_REPOSITORY = GithubRepositoryMother.create({
			id: {
				organization: 'CodelyTV',
				name: 'dotly',
			},
		});

		MOCK_REPOSITORY.search.mockResolvedValue([MOCK_GITHUB_REPOSITORY]);
		render(<Dashboard repository={MOCK_REPOSITORY} />);

		// Validate the main heading
		const dashboardTitle = await screen.findByRole('heading', {
			name: /DevDash_/,
		});

		expect(dashboardTitle).toBeInTheDocument();

		// Validate the presence of a specific widget
		const firstWidgetLink = await screen.findByRole('link', {
			name: /CodelyTV\/dotly/,
		});

		expect(firstWidgetLink).toBeInTheDocument();
	});

	it('renders a no results message when no repositories are found', async () => {
		MOCK_REPOSITORY.search.mockResolvedValue([]);
		act(() => {
			render(<Dashboard repository={MOCK_REPOSITORY} />);
		});

		const noResultsMessage = await screen.findByText(
			/No hay widgets configurados/,
		);

		expect(noResultsMessage).toBeInTheDocument();
	});

	it('show last modified date in human readable format', async () => {
		const MOCK_GITHUB_REPOSITORY = GithubRepositoryMother.create({
			updatedAt: new Date(),
		});

		MOCK_REPOSITORY.search.mockResolvedValue([MOCK_GITHUB_REPOSITORY]);
		act(() => {
			render(<Dashboard repository={MOCK_REPOSITORY} />);
		});

		const MODIFICATION_DATE = await screen.findByText(/today/);

		expect(MODIFICATION_DATE).toBeInTheDocument();
	});
});
