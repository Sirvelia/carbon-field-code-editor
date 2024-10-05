import { Component, createRef } from '@wordpress/element';
import { withInstanceId } from '@wordpress/compose';

class CodeEditorField extends Component {
	constructor(props) {
		super(props);
		this.textareaRef = createRef();
	}

	componentDidMount() {
		const { value, language, indent_unit, tab_size } = this.props;

		// Initialize CodeMirror editor
		if (typeof wp.codeEditor !== 'undefined') {
			const editorSettings = { ...window.codeEditorSettings };

			editorSettings.codemirror = {
				...editorSettings.codemirror,
				mode: language || 'htmlmixed',
				indentUnit: parseInt(indent_unit) || 4,
				tabSize: parseInt(tab_size) || 4,
			};

			this.editor = wp.codeEditor.initialize(this.textareaRef.current, editorSettings);

			// Set initial value
			this.editor.codemirror.setValue(value || '');

			// Update field value on change
			this.editor.codemirror.on('change', () => {
				this.props.setValue(this.editor.codemirror.getValue());
			});
		}
	}

	render() {
		return (
			<textarea ref={this.textareaRef} defaultValue={this.props.value || ''} />
		);
	}
}

export default withInstanceId(CodeEditorField);
