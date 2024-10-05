/**
 * External dependencies.
 */
import { registerFieldType } from '@carbon-fields/core';

/**
 * Internal dependencies.
 */
import './style.scss';
import CodeEditor from './main';

registerFieldType( 'codeeditor', CodeEditor );
