var geocoder = new google.maps.Geocoder();
var address = "Hever Hale'umim tel aviv";
var langLat = null;

function initializeMap() {
    var mapCanvas = document.getElementById('map-canvas');
    var mapOptions = {
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(mapCanvas, mapOptions);

    geocoder.geocode({'address': address}, function (results, status) {     
        if (status === google.maps.GeocoderStatus.OK)
        {
            langLat = results[0].geometry.location;
            result = results[0].geometry.location;
            map.setCenter(result);
            var marker = new google.maps.Marker({
                position: langLat,
                map: map,
                title: familyDetails.familyName+"'s"
            });
        }
    });
}
google.maps.event.addDomListener(window, 'load', initializeMap);