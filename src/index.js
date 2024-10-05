/**
 * External dependencies.
 */
import { registerFieldType } from '@carbon-fields/core';

/**
 * Internal dependencies.
 */
import './style.scss';
import CodeEditorField from './main';

registerFieldType('code_editor', CodeEditorField);
