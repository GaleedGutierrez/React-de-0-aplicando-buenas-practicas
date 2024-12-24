import { Dashboard } from '@components/Dashboard';
import { act, render, screen } from '@testing-library/react';
import { describe, expect, it, Mock, vi } from 'vitest';

import { githubApiResponses } from '@/data/githubApiResponses';
import { GithubApiGithubRepositoryRepository } from '@/infrastructure/GithubApiGithubRepositoryRepository';

// Mock the entire module
vi.mock(import('@/infrastructure/GithubApiGithubRepositoryRepository'), () => {
	const MOCK_SEARCH = vi.fn();

	return {
		GithubApiGithubRepositoryRepository: vi.fn().mockImplementation(() => ({
			search: MOCK_SEARCH,
		})),
	};
});

describe('Dashboard Component', () => {
	let mockRepository: GithubApiGithubRepositoryRepository;

	beforeEach(() => {
		mockRepository = new GithubApiGithubRepositoryRepository('fake-token');
	});

	it('renders a no results message when no repositories are found', async () => {
		(mockRepository.search as Mock).mockResolvedValue(Promise.resolve([]));

		act(() => {
			render(<Dashboard />);
		});

		const noResultsMessage = await screen.findByText(
			/No hay widgets configurados/,
		);

		expect(noResultsMessage).toBeInTheDocument();
	});

	it('renders all widgets when repositories are available', async () => {
		(mockRepository.search as Mock).mockResolvedValue(
			Promise.resolve(githubApiResponses),
		);

		act(() => {
			render(<Dashboard />);
		});

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

	it('show last modified date in human readable format', async () => {
		const mockedResponse = [...githubApiResponses];

		// eslint-disable-next-line camelcase
		mockedResponse[0].repositoryData.updated_at = new Date().toISOString();

		(mockRepository.search as Mock).mockResolvedValue(
			Promise.resolve(githubApiResponses),
		);

		render(<Dashboard />);

		const MODIFICATION_DATE = await screen.findByText(/today/);

		expect(MODIFICATION_DATE).toBeInTheDocument();
	});
});
