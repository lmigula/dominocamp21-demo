


let open = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

let osmDE = L.tileLayer('https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

let imagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

let mymap = L.map('mapid', {
    center: [51.5093617, 7.0872152],
    zoom: 13,
    layers: [osmDE, imagery, open]
});


let baseLayers = {
    "WorldImagery": imagery,
    "osmDE": osmDE,
    "OpenstreetMap": open,
};

L.control.layers(baseLayers).addTo(mymap);
let marker = L.marker([51.5093617, 7.0872152]).addTo(mymap);
marker.bindPopup("<b>Notescamp 2020</b><br>Gelsenkirchen").openPopup();
let circle = L.circle([51.5093617, 7.0872152], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.2,
    radius: 500
}).addTo(mymap);

let popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("Wir sind gerade hier " + e.latlng.toString())
        .openOn(mymap);
}

let LeafIcon = L.Icon.extend({
    options: {
        shadowUrl: 'css/images/marker-shadow.png',
        //iconSize: [38, 95],
        //shadowSize: [50, 64],
        iconAnchor: [0, 0],
        shadowAnchor: [0, 0],
        popupAnchor: [15, -6]
    }
});
let greenIcon = new LeafIcon({ iconUrl: 'images/marker-green.svg' });
let cyanIcon = new LeafIcon({ iconUrl: 'images/marker-cyan.svg' });
let greyIcon = new LeafIcon({ iconUrl: 'images/marker-grey.svg' });
let lgreyIcon = new LeafIcon({ iconUrl: 'images/marker-lgrey.svg' });
let yellowIcon = new LeafIcon({ iconUrl: 'images/marker-yellow.svg' });


let markerArray = [greenIcon, cyanIcon, greyIcon, lgreyIcon, yellowIcon]
mymap.on('click', onMapClick);




let addMarker = function () {
    let randomName = faker.company.companyName(); // Caitlyn Kerluke
    let randValue = parseInt(rand(0, markerArray.length));
    let icon = markerArray[randValue];
    let ranlon = rand(48, 53.3);
    let ranlat = rand(6, 12);
    L.marker([ranlon, ranlat], { icon: icon }).addTo(mymap).bindPopup(randomName);
};

let startAddMarker = function () {
    //window.setInterval(addMarker, 1000);
    for (let idx = 0; idx < 50; idx++) {
        addMarker();
    }
}
