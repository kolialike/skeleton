<?php

namespace Bundles\Calendar;

class Init {

	static $bundle_uri;
	static $bundle_path;

	public static function static_init() {

		self::$bundle_uri  = str_replace( ABSPATH, site_url() . '/', dirname( __FILE__ ) ) . '/';
		self::$bundle_path = dirname( __FILE__ ) . '/';

		Includes\Methods::init();
		Includes\Calendar::init();

		add_action( 'wp_enqueue_scripts', __CLASS__ . '::enqueue_assets' );

	}

	public static function enqueue_assets() {
		wp_register_script( 'deco-eba-events-calendar',
			self::$bundle_uri . 'assets/js/calendar.js',
			array( 'jquery' ),
			filemtime( self::$bundle_path . 'assets/js/calendar.js' ),
			true
		);

		if ( is_singular( 'regional_office' ) || is_page_template( 'templates/template-homepage.php' ) || is_page_template( 'templates/template-education.php' ) ) {
			wp_enqueue_script( 'deco-eba-events-calendar' );
		}

		wp_register_script( 'deco-eba-events-calendar-big',
			self::$bundle_uri . 'assets/js/calendar-big.js',
			array( 'jquery', 'moment-with-locales.js' ),
			filemtime( self::$bundle_path . 'assets/js/calendar-big.js' ),
			true
		);

		if ( is_page_template( 'templates/template-calendar.php' ) || is_post_type_archive( 'tribe_events' ) ) {
			wp_enqueue_script( 'deco-eba-events-calendar-big' );
		}

		wp_localize_script( 'deco-eba-events-calendar-big', 'big_calendar_args', array(
			'weekdays' => array(
				__( 'Mon', 'eba' ),
				__( 'Tue', 'eba' ),
				__( 'Wed', 'eba' ),
				__( 'Thu', 'eba' ),
				__( 'Fri', 'eba' ),
				__( 'Sat', 'eba' ),
				__( 'Sun', 'eba' ),
			),
			'ajaxurl'  => admin_url( 'admin-ajax.php' ),
		) );
	}

}