import { Dashboard } from '@components/Dashboard';
import { act, render, screen } from '@testing-library/react';
import { describe, expect, it, Mock, vi } from 'vitest';

import { GithubApiGithubRepositoryRepository } from '@/infrastructure/GithubApiGithubRepositoryRepository';
import { GithubRepository } from '@/models/domain/GithubRepository.model';

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
	let mockGithubRepository: GithubRepository;

	beforeEach(() => {
		mockRepository = new GithubApiGithubRepositoryRepository('fake-token');
		mockGithubRepository = {
			id: {
				organization: 'CodelyTV',
				name: 'dotly',
			},
			description: '🌚 Modular and easy to customize dotfiles framework',
			url: 'https://github.com/CodelyTV/dotly',
			isPrivate: true,
			forks: 132,
			hasWorkflows: true,
			isLastWorkflowSuccess: false,
			stars: 4000,
			issues: 12,
			pullRequests: 1,
			updatedAt: new Date(),
			watchers: 134,
		};
	});

	it('renders all widgets when repositories are available', async () => {
		(mockRepository.search as Mock).mockResolvedValue(
			Promise.resolve([mockGithubRepository]),
		);

		render(<Dashboard />);

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
		(mockRepository.search as Mock).mockResolvedValue(Promise.resolve([]));

		act(() => {
			render(<Dashboard />);
		});

		const noResultsMessage = await screen.findByText(
			/No hay widgets configurados/,
		);

		expect(noResultsMessage).toBeInTheDocument();
	});

	it('show last modified date in human readable format', async () => {
		(mockRepository.search as Mock).mockResolvedValue(
			Promise.resolve([mockGithubRepository]),
		);

		act(() => {
			render(<Dashboard />);
		});

		const MODIFICATION_DATE = await screen.findByText(/today/);

		expect(MODIFICATION_DATE).toBeInTheDocument();
	});
});
