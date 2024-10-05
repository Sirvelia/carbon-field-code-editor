<?php

use Carbon_Fields\Carbon_Fields;
use Carbon_Field_Code_Editor\Code_Editor_Field;

define( 'Carbon_Field_Code_Editor\\DIR', __DIR__ );

Carbon_Fields::extend( Code_Editor_Field::class, function( $container ) {
	return new Code_Editor_Field(
		$container['arguments']['type'],
		$container['arguments']['name'],
		$container['arguments']['label']
	);
} );
