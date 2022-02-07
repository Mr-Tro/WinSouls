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
            display: flex;
        }
        body{
            width: 100%;
            height: 97%;
            border: 1px solid #3293a8;
            font-family: 'Univers','Muli','Lato','Open Sans', Arial, sans-serif;
        }
        #theRest{ 
            width: 100%; width: 100%; position: relative; 
            /* background: #aad3df;  */
        }
        #head, #body, #foot{ text-align: center; width: 100%; position: absolute}
        #body{ height: 100%; }
        #foot{ height: 3%; bottom: 0; background: #3293a8; color: white;}
        #logoImg{ width: 100%; }
        
        #map { height: 100%; border: 1px solid transparent; }
        #subHeadingText{ height: 10%; border: 1px solid transparent; color: #3293a8; position: relative; }
        .navLink{ 
            text-decoration: none;
            background: #3293a8;
            color: white;
            display: block;
            width: 80%;margin-left: 10%;
            padding: 2%;
            margin-bottom: 5px;
        }
    </style>
</head>
<body>
    <div id='theRest'>
        <div id='body'>
            <div style='width: 100px;position:absolute;left:0;color: white;top: 0px;'>
                <select name='areaSelected' style='width: 100%;height: 50px;color:black;'>
                    <option value=0>Select Area</option>
                    <option value=1>Vlakfontein </option><option value=2>Windmill Park</option><option value=3>Ydgegegsg</option>                    </select>
            </div>
            <div id="map">
            </div>
        </div>
        <div id='foot'>Win Souls For Christ </div>
    </div>
    <script>
        coords = [[-26.131773100000000198406269191764295101165771484375,28.195823499999999484089130419306457042694091796875],[-26.13195269999999936771928332746028900146484375,28.198693999999999704186848248355090618133544921875],[-26.13171810000000050422386266291141510009765625,28.198783500000001112084646592848002910614013671875],[-26.131971899999999919828042038716375827789306640625,28.198878199999999338842826546169817447662353515625],[-26.131828500000001014313966152258217334747314453125,28.198285399999999611964085488580167293548583984375],[-26.128983399999999193141775322146713733673095703125,28.21441589999999877136360737495124340057373046875],[-26.1289976999999993267920217476785182952880859375,28.2151692999999994526660884730517864227294921875],[-26.110758000000000578211256652139127254486083984375,28.23749490000000150757841765880584716796875],[-26.11224440000000157624526764266192913055419921875,28.23481939999999923429641057737171649932861328125],[-26.3908449999999987767296261154115200042724609375,27.88968390000000141526470542885363101959228515625],[-26.390893599999998286875779740512371063232421875,27.88993860000000069021552917547523975372314453125],[-26.390849800000001579292074893601238727569580078125,27.889690900000001505532054579816758632659912109375],[-26.39068329999999917845343588851392269134521484375,27.88951109999999999899955582804977893829345703125],[-26.390865600000001478520061937160789966583251953125,27.889362299999998384691934916190803050994873046875],[-26.3908449999999987767296261154115200042724609375,27.88968390000000141526470542885363101959228515625],[-26.390893599999998286875779740512371063232421875,27.88993860000000069021552917547523975372314453125],[-26.390849800000001579292074893601238727569580078125,27.889690900000001505532054579816758632659912109375],[-26.39068329999999917845343588851392269134521484375,27.88951109999999999899955582804977893829345703125],[-26.390865600000001478520061937160789966583251953125,27.889362299999998384691934916190803050994873046875],[-26.390841900000001629678081371821463108062744140625,27.889496900000001033959051710553467273712158203125]];
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