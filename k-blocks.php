<?php
/*
Plugin Name: Gutenberg Blocks for "K Overstrap"
Description: Block package for theme "K Overstrap"
Version: 1.5.3
Author: Constantine
Author URI: https://github.com/constantine-demo/
Text Domain:
Domain Path:
*/

/*===================================================*/
/*                Block registration                 */
/*===================================================*/

add_action( 'enqueue_block_editor_assets', 'compiled_common_gutenberg_block_enqueue_scripts' );
function compiled_common_gutenberg_block_enqueue_scripts(){
	// Required thing to build Gutenberg Blocks
	$required_js_files = array(
		'wp-blocks',
		'wp-i18n',
		'wp-element',
		'wp-editor'
	);
	wp_enqueue_script( 'k_common_gutenberg_block', plugin_dir_url( __FILE__ ) . 'js/blocks.js', $required_js_files );
}

// Register styles for blocks for frontend
add_action(  'enqueue_block_assets', function(){
	// add slick slider
	wp_enqueue_script( 'slick-slider', plugin_dir_url( __FILE__ ) . 'slick/slick.min.js', array('jquery'), null, true  );
	wp_enqueue_style( 'slick-style', plugin_dir_url( __FILE__ ) . 'slick/slick.css' );
	// add ecco script
	wp_enqueue_script( 'ekko-lightbox', plugin_dir_url( __FILE__ ) . 'ekko/ekko-lightbox.min.js', array('jquery'), null, true  );
	wp_enqueue_style( 'ekko-lightbox-style', plugin_dir_url( __FILE__ ) . 'ekko/ekko-lightbox.css' );
	// main block style
	wp_enqueue_style( 'styles-block', plugin_dir_url( __FILE__ ) . 'css/k-common-block-styles.css');
});

//Register styles/sripts for blocks backend
add_action('enqueue_block_editor_assets', function(){
	// add slick slider
	wp_enqueue_script( 'slick-slider', plugin_dir_url( __FILE__ ) . 'slick/slick.min.js', array('jquery'), null, true  );
	wp_enqueue_style( 'slick-style', plugin_dir_url( __FILE__ ). 'slick/slick.css' );
	// main block style and admin block style
	wp_enqueue_style( 'styles-block-admin', plugin_dir_url( __FILE__ ) . 'css/k-common-block-styles-admin.css');
	wp_enqueue_script( 'admin-bock-scripts', plugin_dir_url( __FILE__ ) . 'admin-scripts.js' );
});


//Register block category
add_filter( 'block_categories', 'k_common_blocks_block_category_registration', 10, 2);
function k_common_blocks_block_category_registration( $categories, $post ) {
	return array_merge(
		array(
			array(
				'slug' => 'k-common-blocks',
				'title' => __( 'Megastrap blocks', 'k-common-blocks' )
			),
		),
		$categories
	);
}

/*===================================================*/
/*              PHP blocks registration              */
/*===================================================*/
include ('php/slider-block.php');


/*===================================================*/
/*                  Usefull actions                  */
/*===================================================*/
// for all in oone migration plugin node folder exclude
if ( has_filter('ai1wm_exclude_content_from_export') ) add_filter( 'ai1wm_exclude_content_from_export', function( $exclude ) {
	$exclude[] = 'mu-plugins\k-blocks\node_modules';
	return $exclude;
} );
