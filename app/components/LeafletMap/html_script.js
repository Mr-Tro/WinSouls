const html_script = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Win Souls</title>
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
    integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
    crossorigin=""/>
    <script src="https://unpkg.com/leaflet@1.6.0/dist/leaflet.js"
    integrity="sha512-gZwIG9x3wUXg2hdXF6+rVkLF/0Vi9U8D2Ntg4Ga5I5BZpVkVxlJWbSQtXPSiUTtC0TjtGOmxa1AJPuV0CPthew=="
    crossorigin=""></script>
    <style>
    html, body{
        box-sizing: border-box;
        height: 100%;
    }
    
    #map { height: 99%; }
    </style>
</head>
<body>
            <div id="map">
    <script>
        uId = 1;
        var strURL="https://winsouls.co.za/app/map/getData.php?uId="+uId;
        coords = [[-26.131773100000000198406269191764295101165771484375,28.195823499999999484089130419306457042694091796875],[-26.13195269999999936771928332746028900146484375,28.198693999999999704186848248355090618133544921875]];
        locs = [{"lat":"-26.3909638","lng":"27.8896262","time":null},{"lat":"-26.3908887","lng":"27.8896805","time":null},{"lat":"-26.3908812","lng":"27.8897882","time":null},{"lat":"-26.1318686","lng":"28.1987492","time":null}];
        console.log(locs);
        console.log(coords);
        var map = L.map( 'map', {
            center: [-26.3908013, 27.8898946],
            minZoom: 5,
            zoom: 15 //max is 18
        });
        L.tileLayer( 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            subdomains: ['a','b','c']
        }).addTo( map );
        var pointsForJson = coords;
        var markers = locs;
        L.Icon.Default.prototype.options.iconSize = [20, 24];
        L.Icon.Default.prototype.options.shadowSize = [0, 0];
        L.Icon.Default.prototype.options.iconAnchor = [9, 21];
        L.Icon.Default.prototype.options.popupAnchor = [0, -14];
        for ( var i=0; i < markers.length; ++i ) 
        {
        L.marker( [markers[i].lat, markers[i].lng] )
            // .bindPopup( '<span href="' + markers[i].url + '" target="_blank">' + markers[i].name + '</span>' )
            .bindPopup( '<span href="#" target="_blank">' + markers[i].time + '</span>' )
            .addTo( map );
        }
        var polyline = L.polyline(pointsForJson).addTo(map);
        // map.fitBounds(polyline.getBounds());
    </script>
</body>
</html>
`;

export default html_script;