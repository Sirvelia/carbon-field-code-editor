import { Component, createRef } from '@wordpress/element';
import { withInstanceId } from '@wordpress/compose';

class CodeEditorField extends Component {
	constructor(props) {
		super(props);
		this.textareaRef = createRef();
	}

	componentDidMount() {
		const { id, value, field, onChange } = this.props;

		// Initialize CodeMirror editor
		if (typeof wp.codeEditor !== 'undefined') {
			const editorSettings = { ...window.codeEditorSettings };

			editorSettings.codemirror = {
				...editorSettings.codemirror,
				mode: field.language || 'php',
				indentUnit: parseInt(field.indent_unit) || 4,
				tabSize: parseInt(field.tab_size) || 4,
				lint: true,
                gutters: ['CodeMirror-lint-markers']
			};

			this.editor = wp.codeEditor.initialize(this.textareaRef.current, editorSettings);

			// Set initial value
			this.editor.codemirror.setValue(value || '');

			// Update field value on change
			this.editor.codemirror.on('change', () => {
				onChange(id, this.editor.codemirror.getValue());
			});
		}
	}

	render() {
		const {
			id,
			name,
			value
		} = this.props;

		return (
			<textarea
				id={id}
				name={name}
				ref={this.textareaRef}
				className="cf-code-editor__input"
				defaultValue={value || ''}
			/>
		);
	}
}

export default withInstanceId(CodeEditorField);
