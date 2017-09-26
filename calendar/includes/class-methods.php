<?php

namespace Bundles\Calendar\Includes;

class Methods {

	public static function init() {

		add_action( 'wp_ajax_deco_get_filtered_events', __CLASS__ . '::get_filtered_events' );
		add_action( 'wp_ajax_nopriv_deco_get_filtered_events', __CLASS__ . '::get_filtered_events' );

		add_filter( 'deco_get_upcoming_events', __CLASS__ . '::get_upcoming_events' );

		add_filter( 'deco_get_regional_office_events', __CLASS__ . '::get_regional_office_events' );
		add_filter( 'deco_get_regional_featured_events', __CLASS__ . '::get_featured_events' );
		add_filter( 'deco_get_regional_latest_events', __CLASS__ . '::get_latest_events' );
		add_filter( 'deco_generate_big_calendar_data', __CLASS__ . '::generate_calendar_data' );

		add_filter( 'deco_get_events_from_category', __CLASS__ . '::get_events_from_category' );
		add_filter( 'deco_get_category_featured_events', __CLASS__ . '::get_category_featured_events' );
		add_filter( 'deco_get_category_latest_events', __CLASS__ . '::get_category_latest_events' );

	}

	public static function get_filtered_events() {

		global $wpdb;

		$city          = empty( $_GET['city'] ) ? '' : $_GET['city'];
		$categories    = empty( $_GET['categories'] ) ? '' : $_GET['categories'];
		$subcategories = empty( $_GET['subcategories'] ) ? '' : $_GET['subcategories'];
		$lang          = apply_filters( 'deco_get_current_language', '' );

		$sql = "SELECT 
{$wpdb->prefix}deco_events.ID as table_id,
event_id,
event_start_date, 
event_end_date, 
event_title, 
permalink,
tax_name_{$lang} as event_category
FROM {$wpdb->prefix}deco_events 
LEFT JOIN {$wpdb->prefix}deco_events_cats
ON ({$wpdb->prefix}deco_events.event_id = {$wpdb->prefix}deco_events_cats.event_post_id)
LEFT JOIN {$wpdb->prefix}deco_taxonomies_names_translations
ON ({$wpdb->prefix}deco_events_cats.event_cat_id = {$wpdb->prefix}deco_taxonomies_names_translations.term_id)
WHERE event_status = 'publish'
AND taxonomy_slug = 'tribe_events_cat'";

		if ( ! empty( $city ) ) {
			$sql .= " AND event_main_office = $city";
		}

		if ( ! empty( $categories ) && ! empty( $subcategories ) ) {
			$sql .= " AND event_cat_id IN ($subcategories) OR event_cat_id IN ($categories)";
		} elseif ( empty( $categories ) && ! empty( $subcategories ) ) {
			$sql .= " AND event_cat_id IN ($subcategories)";
		} elseif ( empty( $subcategories ) && ! empty( $categories ) ) {
			$sql .= " AND event_cat_id IN ($categories)";
		}

		$sql .= " GROUP BY table_id";

		$events = $wpdb->get_results( $sql, ARRAY_A );

		$count = count( $events );

		if ( ! empty( $events ) ) {
			$calendar_data = self::generate_calendar_data( $events );

			if ( ! empty( $calendar_data ) ) {
				$calendar_data = json_encode( $calendar_data );
				wp_send_json_success( array(
					'calendar_data' => $calendar_data,
					'count'         => $count,
					'city'          => $city,
					'categories'    => $categories,
					'subcategories' => $subcategories,
					'sql'           => $sql
				) );
			}

		}

		wp_send_json_success( array(
			'calendar_data' => json_encode( array() )
		) );

	}

	public static function get_upcoming_events( $args = array() ) {
		global $wpdb;
		$result       = array();
		$events_count = empty( $args['events_count'] ) ? 3 : $args['events_count'];

		$now = date( 'Y-m-d H:i:s' );

		$sql_latest = $wpdb->prepare( "SELECT 
	event_title, 
	event_start_date, 
	permalink, 
	thumbnail_id
	FROM {$wpdb->prefix}deco_events
	WHERE
	event_status = 'publish'
	AND event_end_date > %s
	ORDER BY event_start_date ASC
	LIMIT %d", $now, $events_count );

		$latest = $wpdb->get_results( $sql_latest, ARRAY_A );
		$latest = self::add_thumbnail_to_events( $latest, 'img_size_370_x_270' );
		$result = $latest;

		return $result;
	}

	public static function get_regional_office_events( $args = array() ) {

		global $wpdb;

		$office_id = empty( $args['office_id'] ) ? 'any' : $args['office_id'];

		$result = array();

		if ( ! empty( $office_id ) ) {
			$lang = apply_filters( 'deco_get_current_language', '' );

			$sql = "SELECT 
{$wpdb->prefix}deco_events.ID as table_id,
event_id,
event_start_date, 
event_end_date, 
event_title, 
permalink,
tax_name_{$lang} as event_category
FROM {$wpdb->prefix}deco_events 
LEFT JOIN {$wpdb->prefix}deco_events_cats
ON ({$wpdb->prefix}deco_events.event_id = {$wpdb->prefix}deco_events_cats.event_post_id)
LEFT JOIN {$wpdb->prefix}deco_taxonomies_names_translations
ON ({$wpdb->prefix}deco_events_cats.event_cat_id = {$wpdb->prefix}deco_taxonomies_names_translations.term_id)
WHERE event_status = 'publish'
AND taxonomy_slug = 'tribe_events_cat'";

			if ( ! empty( $office_id != 'any' ) ) {
				$sql .= " AND event_main_office = $office_id";
			}
			$sql .= " GROUP BY table_id";

			$events = $wpdb->get_results( $sql, ARRAY_A );
			if ( is_array( $events ) ) {
				$result = $events;
			}
		}

		return $result;

	}

	public static function get_featured_events( $args = array() ) {

		global $wpdb;
		$result       = array();
		$office_id    = empty( $args['office_id'] ) ? 'any' : $args['office_id'];
		$events_count = empty( $args['events_count'] ) ? 3 : $args['events_count'];
		if ( ! empty( $office_id ) ) {

			$now = date( 'Y-m-d H:i:s' );

			if ( $office_id == 'any' ) {
				$sql_featured = $wpdb->prepare( "SELECT 
event_title, 
event_start_date, 
permalink, 
thumbnail_id 
FROM {$wpdb->prefix}deco_events
WHERE
event_status = 'publish'
AND featured = 1
AND event_end_date > %s
LIMIT %d", $now, $events_count );
			} else {
				$sql_featured = $wpdb->prepare( "SELECT 
event_title, 
event_start_date, 
permalink, 
thumbnail_id 
FROM {$wpdb->prefix}deco_events
WHERE
event_status = 'publish'
AND featured = 1
AND event_end_date > %s
AND event_main_office = %s
LIMIT %d", $now, $office_id, $events_count );
			}

			$featured = $wpdb->get_results( $sql_featured, ARRAY_A );
			$featured = self::add_thumbnail_to_events( $featured, 'img_size_370_x_270' );

			$result = $featured;
		}

		return $result;

	}

	public static function get_latest_events( $args = array() ) {

		global $wpdb;
		$result       = array();
		$office_id    = empty( $args['office_id'] ) ? 'any' : $args['office_id'];
		$events_count = empty( $args['events_count'] ) ? 3 : $args['events_count'];
		if ( ! empty( $office_id ) ) {

			$now = date( 'Y-m-d H:i:s' );

			if ( $office_id == 'any' ) {
				$sql_latest = $wpdb->prepare( "SELECT 
	event_title, 
	event_start_date, 
	permalink, 
	thumbnail_id
	FROM {$wpdb->prefix}deco_events
	WHERE
	event_status = 'publish'
	AND event_end_date < %s
	ORDER BY event_start_date DESC
	LIMIT %d", $now, $events_count );
			} else {
				$sql_latest = $wpdb->prepare( "SELECT 
	event_title, 
	event_start_date, 
	permalink, 
	thumbnail_id
	FROM {$wpdb->prefix}deco_events
	WHERE
	event_status = 'publish'
	AND event_end_date < %s
	AND event_main_office = %s
	ORDER BY event_start_date DESC
	LIMIT %d", $now, $office_id, $events_count );
			}

			$latest = $wpdb->get_results( $sql_latest, ARRAY_A );

			$latest = self::add_thumbnail_to_events( $latest, 'img_size_370_x_270' );

			$result = $latest;
		}

		return $result;

	}

	public static function get_events_from_category( $args = array() ) {

		global $wpdb;

		$events = array();

		$limit    = empty( $args['limit'] ) ? '' : $args['limit'];
		$category = empty( $args['cat'] ) ? '' : $args['cat'];

		if ( ! empty( $category ) ) {
			$lang = apply_filters( 'deco_get_current_language', '' );
			$sql  = $wpdb->prepare( "SELECT 
	DISTINCT event_id, 
	event_title, 
	permalink, 
	thumbnail_id,
	event_start_date,
	event_end_date,
	tax_name_{$lang} as event_category
	FROM {$wpdb->prefix}deco_events LEFT JOIN {$wpdb->prefix}deco_events_cats
	ON ({$wpdb->prefix}deco_events.event_id =  {$wpdb->prefix}deco_events_cats.event_post_id)
	LEFT JOIN {$wpdb->prefix}deco_taxonomies_names_translations
	ON ({$wpdb->prefix}deco_events_cats.event_cat_id = {$wpdb->prefix}deco_taxonomies_names_translations.term_id)
	WHERE event_status = 'publish'
	AND event_cat_id = %d
	ORDER BY event_start_date DESC, event_id
	", $category );

			if ( ! empty( $limit ) ) {
				$sql .= "LIMIT $limit";
			}

			$events = $wpdb->get_results( $sql, ARRAY_A );
		}

		return $events;

	}

	public static function get_category_featured_events( $args = array() ) {

		global $wpdb;
		$result       = array();
		$category     = empty( $args['cat'] ) ? '' : $args['cat'];
		$events_count = empty( $args['events_count'] ) ? 3 : $args['events_count'];
		if ( ! empty( $category ) ) {

			$now = date( 'Y-m-d H:i:s' );

			$sql_featured = $wpdb->prepare( "SELECT 
DISTINCT event_id, 
event_title, 
event_start_date, 
permalink, 
thumbnail_id 
FROM {$wpdb->prefix}deco_events LEFT JOIN {$wpdb->prefix}deco_events_cats
ON ({$wpdb->prefix}deco_events.event_id =  {$wpdb->prefix}deco_events_cats.event_post_id)
WHERE
event_status = 'publish'
AND featured = 1
AND event_end_date > %s
AND event_cat_id = %s
LIMIT %d", $now, $category, $events_count );

			$featured = $wpdb->get_results( $sql_featured, ARRAY_A );
			$featured = self::add_thumbnail_to_events( $featured, 'img_size_370_x_270' );

			$result = $featured;
		}

		return $result;

	}

	public static function get_category_latest_events( $args = array() ) {
		global $wpdb;
		$result       = array();
		$category     = empty( $args['cat'] ) ? '' : $args['cat'];
		$events_count = empty( $args['events_count'] ) ? 3 : $args['events_count'];
		if ( ! empty( $category ) ) {

			$now = date( 'Y-m-d H:i:s' );


			$sql_latest = $wpdb->prepare( "SELECT 
	event_title, 
	event_start_date, 
	permalink, 
	thumbnail_id
	FROM {$wpdb->prefix}deco_events LEFT JOIN {$wpdb->prefix}deco_events_cats
ON ({$wpdb->prefix}deco_events.event_id =  {$wpdb->prefix}deco_events_cats.event_post_id)
	WHERE
	event_status = 'publish'
	AND event_end_date < %s
	AND event_cat_id = %s
	ORDER BY event_start_date DESC
	LIMIT %d", $now, $category, $events_count );

			$latest = $wpdb->get_results( $sql_latest, ARRAY_A );

			$latest = self::add_thumbnail_to_events( $latest, 'img_size_370_x_270' );

			$result = $latest;
		}

		return $result;
	}

	public static function add_thumbnail_to_events( $featured_and_latest_events, $image_size ) {

		if ( empty( $image_size ) ) {
			$image_size = 'thumbnail';
		}

		if ( ! empty( $featured_and_latest_events ) ) {
			$lang = apply_filters( 'deco_get_current_language', '' );

			foreach ( $featured_and_latest_events as $event_key => $single_event ) {
				if ( $single_event['thumbnail_id'] != 0 ) {
					$thumb = wp_get_attachment_image_src( $single_event['thumbnail_id'], $image_size );
					if ( ! empty( $thumb[0] ) ) {
						$featured_and_latest_events[ $event_key ]['thumbnail_url'] = $thumb[0];
					} else {
						//$images                                                    = apply_filters( 'deco_get_default_images', '' );
						//$featured_and_latest_events[ $event_key ]['thumbnail_url'] = $images[ $image_size ];
						$featured_and_latest_events[ $event_key ]['thumbnail_url'] = apply_filters( 'deco_get_default_images', $image_size );;
					}
				} else {
					//$images                                                    = apply_filters( 'deco_get_default_images', '' );
					//$featured_and_latest_events[ $event_key ]['thumbnail_url'] = $images[ $image_size ];
					$featured_and_latest_events[ $event_key ]['thumbnail_url'] = apply_filters( 'deco_get_default_images', $image_size );;
				}
				$featured_and_latest_events[ $event_key ]['title'] = apply_filters( 'deco_qtranxf_use', $single_event['event_title'], $lang );
			}

		}

		return $featured_and_latest_events;

	}

	public static function generate_calendar_data( $events ) {
		$events_data = array();
		if ( ! empty( $events ) ) {
			$lang        = apply_filters( 'deco_get_current_language', '' );
			$i           = 0;
			$events_data = array();

			foreach ( $events as $single_event ) {
				$events_data[ $i ] = array(
					'eventName'     => apply_filters( 'deco_qtranxf_use', $single_event['event_title'], $lang ),
					'color'         => 'blue',
					'eventLink'     => $single_event['permalink'],
					'eventTime'     => date( 'H:i', strtotime( $single_event['event_start_date'] ) ) . ' - ' . date( 'H:i', strtotime( $single_event['event_end_date'] ) ),
					'eventDate'     => date( 'Y-m-d', strtotime( $single_event['event_start_date'] ) ),
					'eventCategory' => $single_event['event_category'],
				);
				$i ++;
			}
		}

		return $events_data;
	}

}