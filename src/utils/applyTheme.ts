function applyTheme(): void {
	const HAS_THEME =
		document.body.classList.contains('dark') ||
		document.body.classList.contains('light');

	// Setup theme for the first time
	if (!HAS_THEME) {
		const IS_DARK_THEME = globalThis.matchMedia(
			'(prefers-color-scheme: dark)',
		).matches;

		document.body.classList.add(IS_DARK_THEME ? 'dark' : 'light');
	}

	document.body.classList.toggle('dark');
	document.body.classList.toggle('light');
}

export default applyTheme;
