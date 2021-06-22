


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
    center: [51.509302, 7.087093],
    zoom: 13,
    layers: [osmDE, imagery, open]
});

//Arnhem, Niederlande
// 52.009954, 5.903205

let baseLayers = {
    "WorldImagery": imagery,
    "osmDE": osmDE,
    "OpenstreetMap": open,
};

L.control.layers(baseLayers).addTo(mymap);
let marker = L.marker([51.509302, 7.087093]).addTo(mymap);
marker.bindPopup("<b>NotesCamp 2021</b><br>Gelsenkirchen").openPopup();

let popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("Derzeitige Position " + e.latlng.toString())
        .openOn(mymap);
}

let LeafIcon = L.Icon.extend({
    options: {
        shadowUrl: 'css/images/marker-shadow.png',
        iconSize: [26.773, 42.908],
        shadowSize: [26.773, 42.908],
        iconAnchor: [13.3, 42.908],
        shadowAnchor: [3.3, 42.908],
        popupAnchor: [0, -35]
    }
});
let greenIcon = new LeafIcon({ iconUrl: 'images/marker-green.svg' });
let cyanIcon = new LeafIcon({ iconUrl: 'images/marker-cyan.svg' });
let greyIcon = new LeafIcon({ iconUrl: 'images/marker-grey.svg' });
let lgreyIcon = new LeafIcon({ iconUrl: 'images/marker-lgrey.svg' });
let yellowIcon = new LeafIcon({ iconUrl: 'images/marker-yellow.svg' });


let markerArray = [greenIcon, cyanIcon, greyIcon, lgreyIcon, yellowIcon]
mymap.on('click', onMapClick);


let addCircle = () => {
    let circle = L.circle([51.509302, 7.087093], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.2,
        radius: 500
    }).addTo(mymap);

}

let addMarker = function () {
    let randomName = faker.company.companyName(); // Caitlyn Kerluke
    let randValue = parseInt(rand(0, markerArray.length));
    let icon = markerArray[randValue];
    let ranlat = rand(50, 53);
    let ranlon = rand(6, 8);
    L.marker([ranlat, ranlon], { icon: icon }).addTo(mymap).bindPopup(randomName);
};

let startAddMarker = function () {
    //window.setInterval(addMarker, 1000);
    for (let idx = 0; idx < 50; idx++) {
        addMarker();
    }
}
