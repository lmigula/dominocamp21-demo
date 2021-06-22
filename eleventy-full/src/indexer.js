const fs = require('fs');
const lunr = require('lunr');

const outputDir = './_site/';
let data = fs.readFileSync(outputDir + 'data.json', 'utf-8');
let docs = JSON.parse(data);

let idx = lunr(function () {
    this.ref('unid');
    this.field('firstname');
    this.field('lastname');
    this.field('internetAddress');
    this.field('officeCity');
    docs.forEach(function (doc, idx) {

        this.add(doc);
    }, this);
});

console.log('index', idx)
fs.writeFileSync(outputDir + 'index.json', JSON.stringify(idx));