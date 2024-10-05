<?php

namespace Carbon_Field_Code_Editor;

use Carbon_Fields\Field\Field;

class Code_Editor_Field extends Field
{
	protected $language = 'php';
	protected $indent_unit = 4;
	protected $tab_size = 4;

	/**
	 * Prepare the field type for use.
	 * Called once per field type when activated.
	 *
	 * @static
	 * @access public
	 *
	 * @return void
	 */
	public static function field_type_activated()
	{
		$dir = \Carbon_Field_Code_Editor\DIR . '/languages/';
		$locale = get_locale();
		$path = $dir . $locale . '.mo';
		load_textdomain('carbon-field-code-editor', $path);
	}

	/**
	 * Enqueue scripts and styles in admin.
	 * Called once per field type.
	 *
	 * @static
	 * @access public
	 *
	 * @return void
	 */
	public static function admin_enqueue_scripts()
	{
		$root_uri = \Carbon_Fields\Carbon_Fields::directory_to_url(\Carbon_Field_Code_Editor\DIR);

		// Enqueue field styles.
		wp_enqueue_style(
			'carbon-field-code-editor',
			$root_uri . '/build/bundle' . ((defined('SCRIPT_DEBUG') && SCRIPT_DEBUG) ? '' : '.min') . '.css'
		);

		// Enqueue field scripts.
		wp_enqueue_script(
			'carbon-field-code-editor',
			$root_uri . '/build/bundle' . ((defined('SCRIPT_DEBUG') && SCRIPT_DEBUG) ? '' : '.min') . '.js',
			['carbon-fields-core']
		);

		// // Enqueue CodeMirror settings
		$settings = wp_enqueue_code_editor(
			[
				'type' => 'text/plain',
				'codemirror' => [
					'lint'    => true,
					'gutters' => ['CodeMirror-lint-markers'],
				],
			]
		);

		if (false === $settings) {
			$settings = ['codemirror' => []];
		}

		wp_localize_script('carbon-field-code-editor', 'codeEditorSettings', $settings);
	}

	/**
	 * Pass field data to JavaScript.
	 */
	public function to_json($load)
	{
		$field_data = parent::to_json($load);

		$field_data = array_merge($field_data, [
			'language' => $this->language,
			'indent_unit' => $this->indent_unit,
			'tab_size' => $this->tab_size,
		]);

		return $field_data;
	}

	public function get_formatted_value()
	{
		$value = $this->get_value();

		return $value;
	}

	// /**
	//  * Set the language mode for CodeMirror.
	//  *
	//  * @param string $language
	//  * @return $this
	//  */
	public function set_language($language)
	{
		$this->language = $language;
		return $this;
	}

	// /**
	//  * Set the indent unit for CodeMirror.
	//  *
	//  * @param int $indent_unit
	//  * @return $this
	//  */
	public function set_indent_unit($indent_unit)
	{
		$this->indent_unit = $indent_unit;
		return $this;
	}

	// /**
	//  * Set the tab size for CodeMirror.
	//  *
	//  * @param int $tab_size
	//  * @return $this
	//  */
	public function set_tab_size($tab_size)
	{
		$this->tab_size = $tab_size;
		return $this;
	}
}
