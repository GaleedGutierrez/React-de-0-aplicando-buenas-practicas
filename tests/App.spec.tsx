import { act, fireEvent, render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';

import App from '../src/App';

test('App component display header', () => {
	render(<App />);

	const HEADING = screen.getByText(
		/⚡ Vite React Best Practices Template \(by Codely\) ⚛️/i,
	);
	const BUTTON_THEME = screen.getByText(/Change Theme/i);

	act(() => {
		fireEvent.click(BUTTON_THEME);
	});

	expect(HEADING).toBeInTheDocument();
	expect(BUTTON_THEME).toBeInTheDocument();
});
