const express = require('express')
const app = express()
const port = 5000
const nunjucks = require('nunjucks');
app.use(express.json());
app.use(express.urlencoded());
let moment = require('moment');
let dominoRest = require('./domino-rest.js');


let env = nunjucks.configure('views', {
    autoescape: true,
    express: app
});


env.addFilter('dateFilter', function (inputDate) {
    return moment(inputDate).format('DD.MM.YYYY');
});

app.use(express.static('static'));

app.get('/start', function (req, res) {
    res.render('index.html');
});


app.get('/njk', function (req, res) {
    res.render('njk.njk', {
        title: 'Hallo Camp',
    });
});

app.get('/', function (req, res) {
    res.render('index.njk', {
        title: 'Hallo Camp',
        content: '<h6>Wilkommen zum Server Side Rendering</h6>'
    });
});

app.get('/dominoData', function (req, res) {
    let start = req.query.start ? parseInt(req.query.start) : 0;
    let count = req.query.count ? parseInt(req.query.count) : 50;
    dominoRest.getFakenamesData(start, count)
        .then(data => {
            console.log('docs', data.dataAr[0]);
            let range = {
                entries: count,
                size: 5000,
                start: start
            };
            console.log('range', range);
            res.render('dominoData.njk', {
                title: 'Domino Data',
                docs: data.dataAr,
                range: range
            });
        })

});
app.get('/document/:unid', function (req, res) {
    let unid = req.params.unid;
    dominoRest.getDocByUNID(unid)
        .then(data => {
            let docData = data.dataAr ? data.dataAr : [];
            let doc = docData[0]
            console.log('data', data);
            res.render('document.njk', {
                title: doc.firstname + ' ' + doc.lastname,
                doc: doc
            });
        })

});


app.get('/search', function (req, res) {
    let search = req.query.search;
    // console.log('req', req.query)
    dominoRest.searchDocs(search)
        .then(data => {


            let docs = data ? data.dataAr : [];
            // console.log('docs ', docs[0])
            res.render('dominoData.njk', {
                title: 'Suche nach ' + search,
                docs: docs,
                range: undefined,
                size: docs.length
            });

        });
});



app.listen(port, () => console.log(`Example app listening on port ${port}!`))