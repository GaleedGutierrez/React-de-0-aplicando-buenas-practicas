import { JSX } from 'react';

function SkipLinks(): JSX.Element {
	return (
		<ul>
			<li>
				<a
					aria-label='Skip to "Vite Documentation"'
					className="is-skip-link"
					href="https://vite.dev/guide/"
				>
					Skip Link
				</a>
			</li>
		</ul>
	);
}

export default SkipLinks;
