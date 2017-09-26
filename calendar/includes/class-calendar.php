<?php

namespace Bundles\Calendar\Includes;

use Timber\Timber;

class Calendar {

	private static $template = 'bundles/calendar/calendar.twig';

	public static function init() {

		add_action( 'deco_office_calendar', __CLASS__ . '::office_calendar' );
		add_action( 'deco_category_calendar', __CLASS__ . '::category_calendar' );

	}

	public static function office_calendar( $office_id ) {

		if ( ! empty( $office_id ) ) {

			$context = array();

			$office_events = apply_filters( 'deco_get_regional_office_events', array( 'office_id' => $office_id ) );
			$events_data   = apply_filters( 'deco_generate_big_calendar_data', $office_events );
			if ( ! empty( $events_data ) ) {
				$events_data            = htmlspecialchars( json_encode( $events_data ) );
				$context['events_data'] = $events_data;
			}

			$featured_and_latest_events['featured'] = apply_filters( 'deco_get_regional_featured_events', array( 'office_id' => $office_id ) );
			$featured_and_latest_events['latest']   = apply_filters( 'deco_get_regional_latest_events', array( 'office_id' => $office_id ) );

			$context['featured_and_latest_events'] = $featured_and_latest_events;
			Timber::render( self::$template, $context );

		}


	}

	public static function category_calendar( $category_id ) {

		if ( ! empty( $category_id ) ) {

			$context = array();

			$events      = apply_filters( 'deco_get_events_from_category', array( 'cat' => $category_id ) );
			$events_data = apply_filters( 'deco_generate_big_calendar_data', $events );
			if ( ! empty( $events_data ) ) {
				$events_data            = htmlspecialchars( json_encode( $events_data ) );
				$context['events_data'] = $events_data;
			}

			$featured_and_latest_events['featured'] = apply_filters( 'deco_get_category_featured_events', array( 'cat' => $category_id ) );
			$featured_and_latest_events['latest']   = apply_filters( 'deco_get_category_latest_events', array( 'cat' => $category_id ) );

			$context['featured_and_latest_events'] = $featured_and_latest_events;
			Timber::render( self::$template, $context );

		}

	}

}