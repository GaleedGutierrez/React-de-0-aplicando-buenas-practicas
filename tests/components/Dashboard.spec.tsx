import { Dashboard } from '@components/Dashboard';
import { act, screen } from '@testing-library/react';
import { GitHubRepositoryMother } from '@tests/mothers/GitHubRepositoryMother';
import { renderWithRouter } from '@tests/utils/renderWithRouter';
import { describe, expect, it } from 'vitest';
import { mock } from 'vitest-mock-extended';

import type { GitHubRepositoryRepository } from '@/models/domain/GitHubRepositoryRepository.model';

// Mock the entire module
const MOCK_REPOSITORY = mock<GitHubRepositoryRepository>();

describe('Dashboard Component', () => {
	it('renders all widgets when repositories are available', async () => {
		const MOCK_GITHUB_REPOSITORY = GitHubRepositoryMother.create();

		MOCK_REPOSITORY.search.mockResolvedValue([MOCK_GITHUB_REPOSITORY]);
		renderWithRouter(<Dashboard repository={MOCK_REPOSITORY} />);

		const FIRST_WIDGET_TITLE = MOCK_GITHUB_REPOSITORY.id.value;
		const FIRST_WIDGET_HEADER = await screen.findByRole('link', {
			name: FIRST_WIDGET_TITLE,
		});

		expect(FIRST_WIDGET_HEADER).toBeInTheDocument();
	});

	it('renders a no results message when no repositories are found', async () => {
		MOCK_REPOSITORY.search.mockResolvedValue([]);
		act(() => {
			renderWithRouter(<Dashboard repository={MOCK_REPOSITORY} />);
		});

		const noResultsMessage = await screen.findByText(
			/No hay widgets configurados/,
		);

		expect(noResultsMessage).toBeInTheDocument();
	});

	it('show last modified date in human readable format', async () => {
		const MOCK_GITHUB_REPOSITORY = GitHubRepositoryMother.create({
			updatedAt: new Date(),
		});

		MOCK_REPOSITORY.search.mockResolvedValue([MOCK_GITHUB_REPOSITORY]);
		act(() => {
			renderWithRouter(<Dashboard repository={MOCK_REPOSITORY} />);
		});

		const MODIFICATION_DATE = await screen.findByText(/today/);

		expect(MODIFICATION_DATE).toBeInTheDocument();
	});
});
