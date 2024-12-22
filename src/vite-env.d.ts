/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

// eslint-disable-next-line unicorn/prevent-abbreviations
interface ImportMetaEnv {
	readonly VITE_PERSONAL_ACCESS_TOKEN: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
