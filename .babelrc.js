module.exports = {
	presets: [
		['@babel/preset-env', {
			modules: false
		}],
		['@babel/preset-react', {
			pragma: 'wp.element.createElement',
			pragmaFrag: 'wp.element.Fragment'
		}]
	],
	plugins: [
		'@babel/plugin-syntax-async-generators',
		'@babel/plugin-transform-runtime'
	],
	env: {
		production: {
			plugins: [
				['@wordpress/babel-plugin-makepot', {
					output: 'languages/carbon-fields-code-editor.pot'
				}]
			]
		}
	}
};