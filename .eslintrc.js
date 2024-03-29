module.exports = {
	env: {
		browser: true,
		node: true,
		es6: true
	},
	extends: [
		'eslint:recommended',
		'plugin:@angular-eslint/recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/recommended-requiring-type-checking',
		'prettier/@typescript-eslint',
		'plugin:prettier/recommended'
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: 'tsconfig.json',
		sourceType: 'module'
	},
	plugins: ['@typescript-eslint', '@typescript-eslint/tslint', 'prettier', 'unused-imports', 'jsdoc'],
	rules: {
		'no-restricted-syntax': ['error', 'ForOfStatement', 'ForInStatement', 'LabeledStatement', 'WithStatement'],
		'no-console': 'off',
		'lines-around-comment': ['error', { beforeLineComment: false, beforeBlockComment: false, allowBlockStart: true, allowObjectStart: true }],
		'line-comment-position': ['warn', { position: 'above' }],
		'jsdoc/require-jsdoc': [
			'warn',
			{
				enableFixer: false,
				require: {
					ArrowFunctionExpression: false,
					ClassDeclaration: true,
					FunctionDeclaration: true,
					FunctionExpression: false,
					MethodDefinition: true
				},
				contexts: ['TSMethodSignature', 'TSInterfaceDeclaration', 'TSTypeAliasDeclaration', 'TSEnumDeclaration'],
				exemptEmptyConstructors: true
			}
		],
		'@angular-eslint/directive-selector': ['error', { type: 'attribute', prefix: 'ldsly', style: 'camelCase' }],
		'@angular-eslint/component-selector': ['error', { type: 'element', prefix: 'ldsly', style: 'kebab-case' }],
		'@typescript-eslint/no-var-requires': 0,
		'object-curly-spacing': [2, 'always'],
		'no-unused-vars': 'off',
		'unused-imports/no-unused-imports': 'error',
		'unused-imports/no-unused-vars': ['warn', { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' }],
		'prettier/prettier': ['error', { endOfLine: 'auto' }],
		'@typescript-eslint/unbound-method': ['error', { ignoreStatic: true }],
		'object-curly-spacing': ['error', 'always'],
		'spaced-comment': ['error', 'always'],
		'no-unused-vars': 'off',
		'@typescript-eslint/no-unused-vars': [
			'error',
			{
				vars: 'all',
				args: 'after-used',
				ignoreRestSiblings: false
			}
		],
		'no-unused-expressions': ['error', { allowShortCircuit: true, allowTernary: true }],
		eqeqeq: ['error', 'always'],
		'@typescript-eslint/no-empty-function': ['error', { allow: ['constructors', 'methods'] }],
		'@typescript-eslint/no-explicit-any': ['off'],
		'@typescript-eslint/no-unused-vars': ['error', { vars: 'all' }],
		'@typescript-eslint/no-unnecessary-type-assertion': ['error', { typesToIgnore: ['FormArray'] }],
		'@typescript-eslint/member-ordering': ['warn', { default: ['public-decorated-method', 'protected-decorated-method', 'private-decorated-method'] }]
	}
};
