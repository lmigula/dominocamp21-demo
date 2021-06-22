const { useServer } = require('@domino/domino-db');
const config = require('config');

const path = require('path');
const fs = require('fs');

const readFile = fileName => {
    try {
        return fs.readFileSync(path.resolve(fileName));
    } catch (error) {
        console.error('error', error);
        return undefined;
    }
};

const fakeNamesConfig = {
    filePath: config.get('domino.fakenames')
};



async function getFakenamesData(start = 0, count = 50) {
    try {

        //Verbindung zum Server herstellen
        let server = await useServer(serverConfig);
        //const query = "form = 'Person' "; //"form = 'Person'";
        //const query = "form = 'person'";
        const query = "in ('($people)')"; //form = 'Person'
        //Datenbank öffnen
        let database = await server.useDatabase(fakeNamesConfig);
        //Start der Zeitmessung
        console.time("getNotebookData");
        //Dokumente gemäß query auswerten
        let docs = await database.bulkReadDocuments({
            query: query,
            count: count,
            start: start,
            onErrorOptions: "ON_ERROR_CONTINUE",
            itemNames: ['form', 'InternetAddress', 'LastName', 'FirstName', 'CompanyName']
        });
        //Ende der Zeitmessung
        console.timeEnd("getNotebookData");

        //Rückgabe der Dokumente
        return (docs);
    } catch (error) {
        console.error(error);
    }

}
async function searchDocs(search) {
    try {
        //Start der Zeitmessung
        console.time("searchData");
        //Verbindung zum Server herstellen
        let server = await useServer(serverConfig);
        const query = `form = 'Person' and contains ('*${search}*')`;

        //Datenbank öffnen
        let database = await server.useDatabase(fakeNamesConfig);

        //Dokumente gemäß query auswerten
        let docs = await database.bulkReadDocuments({
            query: query,
            count: 50,
            onErrorOptions: "ON_ERROR_CONTINUE",
            itemNames: ['form', 'InternetAddress', 'LastName', 'FirstName', 'CompanyName']
        });
        //Ende der Zeitmessung
        console.timeEnd("searchData");
        //Rückgabe der Dokumente
        return (docs);
    } catch (error) {
        console.error(error);
    }

}

async function getDocByUNID(uniqueId) {
    try {
        let server = await useServer(serverConfig);
        const database = await server.useDatabase(fakeNamesConfig);
        const document = await database.useDocument({
            unid: uniqueId,
        });
        const myDocument = await document.read({
            itemNames: ['form', 'InternetAddress', 'LastName',
                'FirstName', 'CompanyName', 'NetUserName',
                'AltFullName', 'MailSystem', 'ShortName',
            ]
        });
        return myDocument;
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