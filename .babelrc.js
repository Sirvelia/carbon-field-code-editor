module.exports = {
	presets: [
		[
			'@babel/preset-env',
			{
				modules: false,
				targets: '> 0.25%, not dead',
				useBuiltIns: 'usage',
				corejs: '3.31',
			},
		],
		[
			'@babel/preset-react',
			{
				runtime: 'classic',
				pragma: 'wp.element.createElement',
				pragmaFrag: 'wp.element.Fragment',
			},
		],
	],
	plugins: [
		'@babel/plugin-transform-runtime',
	],
	env: {
		production: {
			plugins: [
				[
					'@wordpress/babel-plugin-makepot',
					{
						output: 'languages/carbon-fields-code-editor.pot',
					},
				],
			],
		},
	},
};
