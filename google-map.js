    <div class="cm-list">
    <div class="title">
    </div>
    <div class="cm-list-inner cm_list_inner scrollable2" data-coords=''>
    </div>
    </div>
    <div class="brand-map cm-map" id="gmap"></div>
    <!--<div id="brand-map" class="brand-map full-width-block" data-center-map="49.010177,31.602173">-->


<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAA7GtDE7FyNS9SqUQ0wiBM-bW3pbQpQZk"></script>
<script src="assets/js/scripts.min.js"></script>
<script src="deco-framework/bundles/contact-us-map/assets/js/contact-us-map.js"></script>


/*
 Constructor for the tooltip
 @ param options an object containing: marker(required), content(required) and cssClass(a css class, optional)
 @ see google.maps.OverlayView()
 */

function Tooltip(options) {

    // Now initialize all properties.
    this.marker_ = options.marker;

    this.content_ = options.content;
    this.map_ = options.marker.get('map');
    this.cssClass_ = options.cssClass || null;
    // We define a property to hold the content's
    // div. We'll actually create this div
    // upon receipt of the add() method so we'll
    // leave it null for now.
    this.div_ = null;

    //Explicitly call setMap on this overlay
    this.setMap(this.map_);
    var me = this;



    function offsetCenter(latlng,offsetx,offsety) {

        var scale = Math.pow(2, me.map_.getZoom());
        var worldCoordinateCenter = me.map_.getProjection().fromLatLngToPoint(latlng);
        var pixelOffset = new google.maps.Point((offsetx/scale) || 0,(offsety/scale) ||0);

        var worldCoordinateNewCenter = new google.maps.Point(
            worldCoordinateCenter.x - pixelOffset.x,
            worldCoordinateCenter.y + pixelOffset.y
        );

        var newCenter = me.map_.getProjection().fromPointToLatLng(worldCoordinateNewCenter);



        me.map_.setCenter(newCenter);

    }


    // Show tooltip on mouseover event.
    google.maps.event.addListener(me.marker_, 'mouseover', function () {
        jQuery('.map_tooltip').css('visibility', 'hidden');

        // offsetCenter(me.marker_.getPosition(),0,-80);
        me.toggle();


    });
    // Hide tooltip on mouseout event.

};
// Now we extend google.maps.OverlayView()
Tooltip.prototype = new google.maps.OverlayView();

// onAdd is one of the functions that we must implement,
// it will be called when the map is ready for the overlay to be attached.
Tooltip.prototype.onAdd = function () {

    // Create the DIV and set some basic attributes.
    var div = document.createElement('DIV');
    div.style.position = "absolute";
    // Hide tooltip
    div.style.visibility = "hidden";
    if (this.cssClass_)
        div.className += " " + this.cssClass_;

    //Attach content to the DIV.
    div.innerHTML = this.content_;

    // Set the overlay's div_ property to this DIV
    this.div_ = div;

    // We add an overlay to a map via one of the map's panes.
    // We'll add this overlay to the floatPane pane.
    var panes = this.getPanes();
    panes.floatPane.appendChild(this.div_);

};
// We here implement draw
Tooltip.prototype.draw = function () {

    // Position the overlay. We use the position of the marker
    // to peg it to the correct position, just northeast of the marker.
    // We need to retrieve the projection from this overlay to do this.
    var overlayProjection = this.getProjection();

    // Retrieve the coordinates of the marker
    // in latlngs and convert them to pixels coordinates.
    // We'll use these coordinates to place the DIV.
    var ne = overlayProjection.fromLatLngToDivPixel(this.marker_.getPosition());

    // Position the DIV.
    var div = this.div_;
    div.style.left = ne.x + 'px';
    div.style.top = ne.y + 'px';

};
// We here implement onRemove
Tooltip.prototype.onRemove = function () {
    this.div_.parentNode.removeChild(this.div_);
};

// Note that the visibility property must be a string enclosed in quotes
Tooltip.prototype.hide = function () {
    if (this.div_) {
        this.div_.style.visibility = "hidden";
    }
};

Tooltip.prototype.show = function () {
    if (this.div_) {
        this.div_.style.visibility = "visible";
    }
};

Tooltip.prototype.toggle = function () {
    if (this.div_.style.visibility == "visible") {
        this.div_.style.visibility = "hidden";
    }
    else{
        this.div_.style.visibility = "visible";
    }
};




var Contact_Us_Page_Map = {

    mapInit: function () {

        // var stylesArray = [
        // 	{
        // 		"featureType": "landscape.natural",
        // 		"elementType": "geometry.fill",
        // 		"stylers"    : [
        // 			{
        // 				"visibility": "on"
        // 			},
        // 			{
        // 				"color": "#F2F2F2"
        // 			}
        // 		]
        // 	},
        // 	{
        // 		"featureType": "poi",
        // 		"elementType": "geometry.fill",
        // 		"stylers"    : [
        // 			{
        // 				"visibility": "on"
        // 			},
        // 			{
        // 				"hue": "#5CB3E1"
        // 			},
        // 			{
        // 				"color": "#F2F2F2"
        // 			}
        // 		]
        // 	},
        // 	{
        // 		"featureType": "road",
        // 		"elementType": "geometry",
        // 		"stylers"    : [
        // 			{
        // 				"lightness": 100
        // 			},
        // 			{
        // 				"visibility": "simplified"
        // 			}
        // 		]
        // 	},
        // 	{
        // 		"featureType": "road",
        // 		"elementType": "labels",
        // 		"stylers"    : [
        // 			{
        // 				"visibility": "off"
        // 			}
        // 		]
        // 	},
        // 	{
        // 		"featureType": "transit.line",
        // 		"elementType": "geometry",
        // 		"stylers"    : [
        // 			{
        // 				"visibility": "on"
        // 			},
        // 			{
        // 				"lightness": 700
        // 			}
        // 		]
        // 	},
        // 	{
        // 		"featureType": "water",
        // 		"elementType": "all",
        // 		"stylers"    : [
        // 			{
        // 				"color": "#5CB3E1"
        // 			}
        // 		]
        // 	}
        // ];

        var addressBlock = jQuery('.cm_list_inner');

        if (addressBlock.length > 0) {
            var jsonAddressesData = [
                {
                    "title": "АВТ Бавария",
                    "city": "Киев",
                    "address": "ул. Мечникова, 2",
                    "phone": "",
                    "hours": "",
                    "coords": {
                        "address": "Airport Road, Karachi, \u041f\u0430\u043a\u0438\u0441\u0442\u0430\u043d",
                        "id": "ChIJL1sS9uo5sz4RbKYTdtUIJ80",
                        "latitude": "24.8959179",
                        "longitude": "67.16892310000003"
                    }
                }, {
                    "title": "АВТ Бавария",
                    "city": "Airport Road, Lahore 54000, Pakistan",
                    "address": "ул. Мечникова, 2",
                    "phone": "",
                    "hours": "",
                    "coords": {
                        "address": "Airport Road, Lahore, \u041f\u0430\u043a\u0438\u0441\u0442\u0430\u043d",
                        "id": "ChIJ55M-ZpwPGTkReEQEGWpxDaM",
                        "latitude": "31.52048529999999",
                        "longitude": "74.42373450000002"
                    }
                }, {
                    "title": "АВТ Бавария",
                    "city": "Киев",
                    "address": "Airport Road, Multan 60000, Pakistan",
                    "phone": "",
                    "hours": "",
                    "coords": {
                        "address": "Airport Road, Multan, \u041f\u0430\u043a\u0438\u0441\u0442\u0430\u043d",
                        "id": "ChIJKbkhLTQyOzkROQx8pg_yOP8",
                        "latitude": "30.1959365",
                        "longitude": "71.42645059999995"
                    }
                }, {
                    "title": "АВТ Бавария",
                    "city": "Киев",
                    "address": "ул. Мечникова, 2",
                    "phone": "",
                    "hours": "",
                    "coords": {
                        "address": "Airport Road, Sialkot, \u041f\u0430\u043a\u0438\u0441\u0442\u0430\u043d",
                        "id": "Eh9BaXJwb3J0IFJvYWQsIFNpYWxrb3QsIFBha2lzdGFu",
                        "latitude": "32.5238326",
                        "longitude": "74.48977680000007"
                    }
                }, {
                    "title": "АВТ Бавария",
                    "city": "Киев",
                    "address": "ул. Мечникова, 2",
                    "coords": {
                        "address": "Airport Rd, Rawalpindi 46000, \u041f\u0430\u043a\u0438\u0441\u0442\u0430\u043d",
                        "id": "ChIJ28hduFuT3zgR_1phos3vsKg",
                        "latitude": "33.58763299999999",
                        "longitude": "73.07470569999998"
                    }
                }
            ];
            try {
                var addressData = jsonAddressesData;
                console.log(addressData);

                try {
                    var mapCenter = {
                        lat: parseFloat(addressData[0].coords.latitude),
                        lng: parseFloat(addressData[0].coords.longitude)
                    };

                    var isDraggable = !jQuery('body').hasClass('mobile') ? true : false;
                    var mapOptions = {
                        zoom: 7,//7
                        center: mapCenter,
                        panControl: false,
                        zoomControl: true,
                        mapTypeControl: false,
                        scaleControl: false,
                        streetViewControl: false,
                        overviewMapControl: false,
                        scrollwheel: false,
                        draggable: isDraggable,
                        zoomControlOptions: {
                            style: google.maps.ZoomControlStyle.SMALL
                        }
                    };

                    var map = new google.maps.Map(document.getElementById('gmap'), mapOptions);
                    // map.setOptions({styles: stylesArray});

                    var markerImage = new google.maps.MarkerImage(
                        'assets/img/map-pin-circle.svg',
                        new google.maps.Size(30, 30),
                        new google.maps.Point(0, 0)
                    );
                    var markerImageHover = new google.maps.MarkerImage(
                        'assets/img/map-pin-circle-hover.svg',
                        new google.maps.Size(30, 30),
                        new google.maps.Point(0, 0)
                    );

                    function TooltipOptions(marker, content) {
                        this.marker = marker,
                            this.content = content,
                            this.cssClass = 'map_tooltip'
                    }

                    var markersArray = [];

                    for (var i = 0; i < addressData.length; i++) {
                        var markerElement = {};

                        var imageForCurrentMarker = markerImage;

                        if (i === 0) {
                            imageForCurrentMarker = markerImageHover;
                        }

                        var markerCoordinates = {
                            lat: parseFloat(addressData[i].coords.latitude),
                            lng: parseFloat(addressData[i].coords.longitude)
                        };

                        var marker = new google.maps.Marker({
                            icon: imageForCurrentMarker,
                            position: markerCoordinates,
                            map: map
                        });

                        var tooltipContent = '<span class="icon-close close_map_tooltip"></span>'
                            + '<h3>' + addressData[i].title + '</h3>';

                        if (addressData[i].address) {
                            tooltipContent += '<address class="address">' + addressData[i].address + '</address>';
                        }

                        if (addressData[i].phone) {
                            tooltipContent += '<span class="contact-link phone-link"><span class="icon-phone"></span>' + addressData[i].phone + '</span>';
                        }

                        if (addressData[i].hours) {
                            tooltipContent += '<span class="contact-link">'
                                + '<span class="icon-clock2"></span>'
                                + 'Opening Hours: ' + addressData[i].hours
                                + '</span>';
                        }

                        // + '<a class="btn-readmore">Get Directions</a>';

                        markerElement.marker = marker;
                        markerElement.coordinates = markerCoordinates;
                        markerElement.tooltip = tooltipContent;

                        markersArray.push(markerElement);

                    }

                    if (markersArray.length > 0) {
                        jQuery.each(markersArray, function (index, element) {

                            //Side nav click
                            try {
                                jQuery(document).on('click', '.cm_list_inner [data-marker="marker' + index + '"]', function () {
                                    map.setCenter(element.coordinates);
                                    jQuery('.cm_list_inner .cm-item').removeClass('current');
                                    if ($(window).width() < 770) {
                                        jQuery('html, body').animate({
                                            scrollTop: $(".cm-list").offset().top
                                        }, 500);
                                    }

                                    jQuery('.cm_list_inner .cm-item[data-marker="marker' + index + '"]').addClass('current');
                                    jQuery.each(markersArray, function (markerIndex, markerElement) {
                                        var icon = markerImage;
                                        if (markerIndex === index) {
                                            icon = markerImageHover;
                                        }
                                        markerElement.marker.setIcon(icon);
                                    });
                                });
                            } catch (e) {
                                console.log(e);
                            }

                            //Marker click
                            try {
                                google.maps.event.addListener(element.marker, 'click', function () {
                                    map.setCenter({
                                        lat: jQuery(this)[0].getPosition().lat(),
                                        lng: jQuery(this)[0].getPosition().lng()
                                    });
                                    jQuery('.cm_list_inner .cm-item').removeClass('current');
                                    jQuery('.cm_list_inner .cm-item[data-marker="marker' + index + '"]').addClass('current');
                                    jQuery.each(markersArray, function (markerIndex, markerElement) {
                                        if (markerIndex === index) {
                                            markerElement.marker.setIcon(markerImageHover);
                                        } else {
                                            markerElement.marker.setIcon(markerImage);
                                        }
                                    });
                                });
                            } catch (e) {
                                console.log(e);
                            }

                            try {
                                var tooltipOptions = new TooltipOptions(element.marker, element.tooltip);
                                new Tooltip(tooltipOptions);
                            } catch (e) {
                                console.log(e);
                            }
                        })
                    }

                    jQuery(document).on('click', '.close_map_tooltip', function (e) {
                        e.stopPropagation();
                        jQuery(this).parents('.map_tooltip').css('visibility', 'hidden');
                    });

                } catch (e) {
                    console.log(e);
                }
            } catch (e) {
                console.log(e);
            }

        }

    },

    init: function () {

        var mapHolder = jQuery('#gmap');

        if (mapHolder.length > 0) {
            /*try {
             Contact_Us_Page_Map.mapInit();
             } catch (e) {
             console.log(e);
             }*/

            try {
                google.maps.event.addDomListener(window, 'load', Contact_Us_Page_Map.mapInit());
            } catch (e) {
                console.log(e);
            }

        }

    }
};

jQuery(document).ready(function () {

    Contact_Us_Page_Map.init();

});