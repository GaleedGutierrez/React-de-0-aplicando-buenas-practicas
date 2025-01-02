import type { ErrorInfo, ReactNode } from 'react';
import { Component } from 'react';

interface ErrorBoundaryState {
	hasError: boolean;
}

interface ErrorBoundaryProperties {
	children: ReactNode;
	fallback?: ReactNode;
}

class ErrorBoundary extends Component<
	ErrorBoundaryProperties,
	ErrorBoundaryState
> {
	constructor(properties: ErrorBoundaryProperties) {
		super(properties);

		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error: Error): ErrorBoundaryState {
		console.info(`Derived  Error: ${error}`);

		return { hasError: true };
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
		console.info(`Error: ${error}`);
		console.info(`Error info: ${JSON.stringify(errorInfo)}`);
	}

	render(): ReactNode {
		const { hasError } = this.state;
		const { children, fallback } = this.props;

		if (hasError) {
			return fallback ?? <h1>Ops! I did it again ;)</h1>;
		}

		return children;
	}
}

export default ErrorBoundary;
