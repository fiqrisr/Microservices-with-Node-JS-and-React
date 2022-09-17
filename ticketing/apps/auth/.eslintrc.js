module.exports = {
	env: {
		commonjs: true,
		es2021: true
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:prettier/recommended',
		'prettier'
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module'
	},
	plugins: ['@typescript-eslint'],
	rules: {
		'@typescript-eslint/no-var-requires': 'off',
		'@typescript-eslint/ban-ts-comment': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'prettier/prettier': ['error', { endOfLine: 'auto' }]
	}
};
