const domino = require('./src/domino.js')

const fs = require('fs');
const lunr = require('lunr');

const outputDir = './_site/';

async function getDoc(unid) {
    return domino.getDocument(unid);
}
module.exports = function (eleventyConfig) {

    // Copy `static/` to `_site/static`
    eleventyConfig.addPassthroughCopy("static");
    // Nunjucks Filter
    eleventyConfig.addNunjucksAsyncFilter("getDoc", function (unid, callback) {
        getDoc(unid)
            .then(res => callback(null, res))

    });



    eleventyConfig.on('afterBuild', () => {
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

        fs.writeFileSync(outputDir + 'index.json', JSON.stringify(idx));
    });
};