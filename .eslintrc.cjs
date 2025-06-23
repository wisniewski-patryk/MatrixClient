module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		'react-app',
		'react-app/jest',
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:@typescript-eslint/recommended',
		'prettier',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['react', '@typescript-eslint'],
	rules: {
		'indent': ['error', 'tab'],
		'@typescript-eslint/indent': ['error', 'tab'],
		'react/jsx-indent': ['error', 'tab'],
		'react/jsx-indent-props': ['error', 'tab'],
	},
	settings: {
		react: {
			version: 'detect',
		},
	},
};
