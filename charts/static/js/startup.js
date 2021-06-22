let mapBoxUrl = 'https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png';
let mapLayer = L.tileLayer(mapBoxUrl, {
    maxZoom: 18,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
})



let center = [52.511624, 13.397827];

let map = L.map('mapid', {
    center: center,
    zoom: 10,
    layers: [mapLayer]
})


let baseMaps = {
    "streepMap": mapLayer
};




let points = {};

let colors = {
    'Regional KAM GFGH': {
        color: 'red',
        fillColor: '#C10000',
    },
    'AM TEAM': {
        color: 'blue',
        fillColor: '#3364FF',
    },
    'grow-AM TEAM': {
        color: 'green',
        fillColor: '#1cbd47'
    },
    'grow-Regional KAM GFGH': {
        color: 'yellow',
        fillColor: '#abab00'
    }
}

let colorM1 = {
    'Dresden_Chemnitz': {
        color: '#e042f5',
        fillColor: '#eca9f5',
    },
    'Frankfurt (Oder)_Cottbus': {
        color: '#1821c7',
        fillColor: '#666efa',
    },
    'Leipzig_Halle': {
        color: '#004773',
        fillColor: '#406780',
    },
    'Wernigerode Magdeburg': {
        color: '#00ff9d',
        fillColor: '#69ffc5',
    },
    'Erfurt_Jena_Weimar': {
        color: '#d43100',
        fillColor: '#d6a698',
    },
    'Berlin West': {
        color: '#4dff00',
        fillColor: '#a4ed85',
    },
    'Berlin Ost': {
        color: '#00ffff',
        fillColor: '#99ffff',
    },
    'Sachsen Anhalt Brandenburg': {
        color: '#ffb300',
        fillColor: '#f5c85f',
    },
    'Coast_McPom': {
        color: '#9e003f',
        fillColor: '#75324d',
    }


}

dataPoints.forEach(element => {
    let key = element['FINAL'].trim();
    let clusterNew = element['Cluster NEU'].trim();
    let colorEntry = colors[key];
    let subKey = clusterNew + '-' + key;

    let newColorEntry = colors[subKey];
    let pointArray = points[key];
    let newPointArray = points[subKey];
    if (!pointArray) {
        pointArray = [];
    }
    if (!newPointArray) {
        newPointArray = [];
    }
    let circle = L.circle([element['lat'], element['lon']], {
        color: colorEntry.color,
        fillColor: colorEntry.fillColor,
        fillOpacity: 0.5,
        radius: 5000
    }).bindPopup(element['Account']);
    if (newColorEntry) {
        let circleNew = L.circle([element['lat'], element['lon']], {
            color: newColorEntry.color,
            fillColor: newColorEntry.fillColor,
            fillOpacity: 0.5,
            radius: 5000
        }).bindPopup(element['Account']);
        newPointArray.push(circleNew)
        points[subKey] = newPointArray;
    }

    pointArray.push(circle);
    points[key] = pointArray;
});

console.log('points', points);
let pointKeys = Object.keys(points);
let overlayMaps = {};

pointKeys.forEach(key => {
    let value = points[key];
    let group = L.layerGroup(value);
    overlayMaps[key] = group;
})
let m1Keys = Object.keys(m1Data);
console.log('m1Keys', m1Keys);

m1Keys.forEach(key => {
    let keyClean = key.replaceAll('_', ' ');
    let data = m1Data[key];
    let geoData = data.geoData;
    let color = colorM1[key];

    let m1Map = L.geoJSON(geoData,
        {
            style: {
                color: color.color,
                opacity: 0.75,
                weight: 1,
                fillColor: color.fillColor,

            }
        });
    overlayMaps[keyClean] = m1Map;

})

L.control.layers(baseMaps, overlayMaps).addTo(map);


/**
 * let circle = L.circle([52.531677, 13.381777], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 750
});

let circle2 = L.circle([52.531677, 13.881777], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 750
})

let circle3 = L.circle([52.031677, 13.381777], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 750
})


let cirlces = L.layerGroup([circle, circle2, circle3]);



let overlayMaps = {
    "cirlces": cirlces
};
 */