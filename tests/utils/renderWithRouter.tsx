import type { RenderResult } from '@testing-library/react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ReactElement } from 'react';
import { BrowserRouter } from 'react-router';

interface CustomRenderResult extends RenderResult {
	user: ReturnType<typeof userEvent.setup>;
}

export function renderWithRouter(
	ui: ReactElement,
	{ route = '/' } = {},
): CustomRenderResult {
	globalThis.history.pushState({}, 'Test page', route);

	const result = render(ui, { wrapper: BrowserRouter });

	return {
		user: userEvent.setup(),
		...result,
	};
}
