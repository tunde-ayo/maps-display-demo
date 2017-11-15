// Global variables
var map;
var geocoder;
var locations;
var markers = [];
var bounds;
var infoWindow;

$(window).on('load orientationchange', function() {
    getData(); // Retrieve data from spreadsheet
    initialiseMap(); // Initialise the map
});

function getData() {
    //Initialise Tabletop thing
    Tabletop.init({ key: '1Dx1mGp6WWZ0x5oPkwB8LJqUhxMo39k_pbgd6Dtp5Fo4',
        callback: function (data, tabletop) {
            locations = data; // Save returned data
            loadMarkers(locations);
            // geocodeAddress(locations);
        },
        simpleSheet: true });
}

function initialiseMap() {
    var currentCentre;
    var currentZoom;
    geocoder = new google.maps.Geocoder();
    // The default position
    var mapCentre = {
        lat: 52.561928,
        lng: -1.464854
    };
    var mapOptions = {
        center: mapCentre,
        zoom: 6 // Specify amount of zoom
    };
    // The actual map object
    map = new google.maps.Map(document.getElementById('medical-map'), mapOptions); // Create the map element

    if(!isIE()){
        google.maps.event.addDomListener(window, 'resize', function() {
            map.fitBounds(bounds);
        });
    }
}

function loadMarkers(locations) {

    // For every location
    locations.forEach(function(location) {

        var retName = location.Name;
        var retAddress = location.Address1 + " " + location.Address2 + " " + location.Address3 + " " + location.Postcode;
        var retRegion = location.Coverage;
        var retExtraInfo = location.ExtraInfo;
        var retLatitude = parseFloat(location.Lat);
        var retLongitude = parseFloat(location.Long);

        // Place the markers
        var marker = new google.maps.Marker({
            map: map,
            position: {lat: retLatitude, lng: retLongitude},
            title: retName
        });

        markers.push(marker);

        // Add infoWindow on click
        google.maps.event.addListener(marker, 'click', function () {
            if (infoWindow) {
                infoWindow.close(); // Close infowindow
            }

            var iwContent = createInfoWindow(retName, retAddress, retRegion, retExtraInfo);

            infoWindow = new google.maps.InfoWindow({
                content: iwContent // Populate infoWindow contents
            });

            infoWindow.open(map, marker); // Open infoWindow
        });

        // Only showing an area covered with markers
        if(!isIE()) {
            bounds = new google.maps.LatLngBounds();
            
                for (var i = 0; i < markers.length; i++) {
                    bounds.extend(markers[i].getPosition());
                }
                map.fitBounds(bounds);
        }
    });
}

function createInfoWindow(name, address, region, extraInfo) {
    var iwContent = "";
    // Initialise iwContent with standard data
    iwContent = "<div class=\"infoWindow\">";
    if(name){
        iwContent += "<h1>" + name + "</h1>"; // Add name
    }
    
    if(address){
        iwContent+= "<p> Address: " + address + "</p>"; // Add address
    }

    if(region){
        iwContent+= "<p>Coverage: " + region + "</p>" // Add region details
    }

    if(extraInfo){
        iwContent+= "<p>Extra Information: " + extraInfo + "</p>"; // Add extra info
    }

    iwContent+= "</div>";
    return iwContent;
}

function isIE() {
    ua = navigator.userAgent;
    /* MSIE used to detect old browsers and Trident used to newer ones*/
    var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
    return is_ie; 
}
