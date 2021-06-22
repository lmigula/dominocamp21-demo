let express = require('express');
let nunjucks = require('nunjucks');
var multer = require('multer')
const sharp = require('sharp');
const bodyParser = require('body-parser')


let app = express();
app.use(bodyParser.urlencoded({ extended: true }))
let storage = multer.memoryStorage()
let upload = multer({ storage: storage });

app.use(express.static('static'));
// Apply nunjucks and add custom filter and function (for example). 
let env = nunjucks.configure(['_includes/'], { // set folders with templates
    autoescape: true,
    express: app
});

app.get('/', function (req, res) {
    res.render('index.njk', {
        title: 'Canvas',
        content: 'Content',
        includePartial: 'partials/canvas.njk'
    }
    );
});

app.get('/svg', function (req, res) {
    res.render('index.njk', {
        title: 'Static svg',
        content: 'Content',
        includePartial: 'partials/static-svg.njk'
    }
    );
});


app.get('/chart-js', function (req, res) {
    res.render('index.njk', {
        title: 'Chart.js Bar Chart',
        content: 'Content',
        includePartial: 'partials/chart.njk'
    }
    );
});

app.get('/roughViz', function (req, res) {
    res.render('index.njk', {
        title: 'roughViz.js',
        content: 'Content',
        includePartial: 'partials/roughViz.njk'
    }
    );
});

app.get('/c3js', function (req, res) {
    res.render('index.njk', {
        title: 'C3.js',
        content: 'Content',
        includePartial: 'partials/c3js.njk'
    }
    );
});


app.get('/d3', function (req, res) {
    res.render('index.njk', {
        title: 'D3js',
        content: 'Content',
        includePartial: 'partials/d3.njk'
    }
    );
});

app.get('/leaflet', function (req, res) {
    res.render('index.njk', {
        title: 'Leaflet',
        content: 'Content',
        includePartial: 'partials/leaflet.njk'
    }
    );
});


app.get('/mermaid', function (req, res) {
    res.render('index.njk', {
        title: 'mermaid',
        content: 'Content',
        includePartial: 'partials/mermaid.njk'
    }
    );
});

app.post('/svgToPng', upload.single('svgFile'), function (req, res) {
    console.log('req', req['file']);
    sharp(req['file'].buffer)
        .png()
        .pipe(res);
});


app.listen(3000, function () {
    console.log('Example app listening on port 3000...');
});