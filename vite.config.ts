/// <reference types="vitest" />
/// <reference types="vite/client" />

import { fileURLToPath } from 'node:url';

import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import pluginPurgeCss from 'vite-plugin-purgecss-updated-v5';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig(() => ({
	plugins: [
		react(),
		svgr({
			// svgr options: https://react-svgr.com/docs/options/
			svgrOptions: {
				exportType: 'default',
				ref: true,
				svgo: false,
				titleProp: true,
			},
			include: '**/*.svg',
		}),
		pluginPurgeCss({
			variables: true,
		}),
	],
	server: {
		open: true,
		host: true,
	},
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('src/', import.meta.url)),
			'@tests': fileURLToPath(new URL('tests/', import.meta.url)),
			'@e2e': fileURLToPath(new URL('e2e/', import.meta.url)),
			'@assets': fileURLToPath(new URL('src/assets/', import.meta.url)),
			'@components': fileURLToPath(
				new URL('src/components/', import.meta.url),
			),
			'@context': fileURLToPath(new URL('src/context/', import.meta.url)),
			'@data': fileURLToPath(new URL('src/data/', import.meta.url)),
			'@guard': fileURLToPath(new URL('src/guard/', import.meta.url)),
			'@hooks': fileURLToPath(new URL('src/hooks/', import.meta.url)),
			'@icons': fileURLToPath(
				new URL('src/assets/icons/', import.meta.url),
			),
			'@models': fileURLToPath(new URL('src/models/', import.meta.url)),
			'@pages': fileURLToPath(new URL('src/pages/', import.meta.url)),
			'@private': fileURLToPath(new URL('src/private/', import.meta.url)),
			'@routes': fileURLToPath(new URL('src/routes/', import.meta.url)),
			'@services': fileURLToPath(
				new URL('src/services/', import.meta.url),
			),
			'@state': fileURLToPath(new URL('src/state/', import.meta.url)),
			'@templates': fileURLToPath(
				new URL('src/templates/', import.meta.url),
			),
			'@styles': fileURLToPath(new URL('src/styles/', import.meta.url)),
			'@utils': fileURLToPath(new URL('src/utils/', import.meta.url)),
			'@views': fileURLToPath(new URL('src/views/', import.meta.url)),
			'@images': fileURLToPath(
				new URL('src/assets/images/', import.meta.url),
			),
			'@fonts': fileURLToPath(
				new URL('src/assets/fonts/', import.meta.url),
			),
		},
	},
	test: {
		// browser: {
		// 	enabled: true,
		// 	name: 'chromium',
		// 	provider: 'playwright',
		// }, @vitest/browser" is not installed
		clearMocks: true, // Automatically clear mock calls, instances, contexts and results before every test
		// If you need coverage, you can enable it here
		// coverage: {
		// 	enabled: true, // Indicates whether the coverage information should be collected while executing the test
		// 	provider: 'v8', // Indicates which provider should be used to instrument code for coverage
		// 	reportsDirectory: 'coverage', // The directory where Vitest should output its coverage files
		// 	include: ['src/**/*'], // The glob patterns Vitest uses to detect test files
		// },
		globals: true,
		css: true,
		environment: 'jsdom', // The test environment that will be used for testing
		setupFiles: ['./tests/setup.ts'], // A list of paths to modules that run some code to configure or set up the testing framework before each test
		include: ['./tests/**/*.{test,spec}.?(c|m)[jt]s?(x)'],
		// A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
		alias: {
			'\\.(css|less|scss|sass)$': 'identity-obj-proxy',
			'\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
				'jest-transform-stub',
		},
		// A map from regular expressions to paths to transformers
		transformMode: {
			web: ['**/*.tsx', '**/*.ts'], // Support for TypeScript files
		},
		reporters: process.env.GITHUB_ACTIONS
			? ['dot', 'github-actions']
			: ['dot'], // The list of reporters that will be used to report the test results
	},
}));
