const fs = require('fs');

async function getActivityData() {

    let data = fs.readFileSync('src/responseClean.json', 'utf-8');
    let docs = JSON.parse(data);
    return docs
}
module.exports = {

    getActivityData
};