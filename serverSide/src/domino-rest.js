const config = require('config');
const axios = require('axios')
const fs = require('fs');

let data = fs.readFileSync('src/response.json', 'utf-8');


async function getFakenamesData(start = 0, count = 50) {

    try {

        console.log({ start, count });
        let docs = JSON.parse(data);
        docs.dataAr = docs.dataAr.slice(start, count + start);

        //http Request removed
        return docs;
    } catch (error) {
        console.error(error)
    }

}

async function searchDocs(search) {
    try {
        search = search.toLowerCase();
        console.time("searchDocs");
        //http Request removed
        let docs = JSON.parse(data);
        docs.dataAr = docs.dataAr.filter(el => el.firstname.toLowerCase().indexOf(search) > -1 || el.lastname.toLowerCase().indexOf(search) > -1)
        console.timeEnd("searchDocs");
        // console.log('resultData ', resultData.data)
        return docs;
    } catch (error) {
        console.error(error)
    }


}


async function getDocByUNID(uniqueId) {
    try {
        //http Request removed
        let docs = JSON.parse(data);
        docs.dataAr = docs.dataAr.filter(el => el.unid == uniqueId);
        return docs;
    }
    catch (error) {
        console.error(error);
    }
}

module.exports = {
    getFakenamesData,
    getDocByUNID,
    searchDocs
};