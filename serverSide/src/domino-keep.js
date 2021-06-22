const config = require('config');
const axios = require('axios')


const username = config.get('domino.httpUser');
const password = config.get('domino.httpPassword');

const token = Buffer.from(`${username}:${password}`, 'utf8').toString('base64');
let bearer = undefined;
const baseurl = 'http://keep.acme.test:8880/api/v1/'
async function getFakenamesData() {

    try {
        console.time("getFakenamesData");

        let resultData = await axios.get(baseurl + 'lists/PeopleCat?db=fakenames',
            {
                headers: {
                    'Authorization': `Bearer ${bearer}`
                }
            })
        console.timeEnd("getFakenamesData");
        console.log('data', resultData.data);
        return resultData.data;
    } catch (error) {
        console.error(error)
    }

}

async function searchDocs(search) {
    try {
        console.time("searchDocs");
        const query = `form = 'Person' and contains ('*${search}*')`;
        const data = {
            database: 'lm/fakenames.nsf',
            query: query,
            fields: ['form', 'InternetAddress', 'LastName', 'FirstName', 'CompanyName']
        };
        console.log('search ', data)
        let resultData = await axios.post(baseurl + 'searchViewDQL', data,
            {
                headers: {
                    'Authorization': `Basic ${token}`
                }
            })

        console.timeEnd("searchDocs");
        // console.log('resultData ', resultData.data)
        return resultData.data;
    } catch (error) {
        console.error(error)
    }


}


async function getDocByUNID(uniqueId) {
    try {
        const data = {
            database: 'lm/fakenames.nsf',
            unid: uniqueId

        };
        let resultData = await axios.post(baseurl + 'documentContent', data,
            {
                headers: {
                    'Authorization': `Basic ${token}`
                }
            })
        return resultData.data;
    }
    catch (error) {
        console.error(error);
    }
}

async function login() {
    try {
        const data = {
            username: username,
            password: password

        };
        let resultData = await axios.post(baseurl + 'auth', data)
        console.log('resultData', resultData.data.bearer);

        if (resultData.data && resultData.data.bearer) {
            bearer = resultData.data.bearer
        }
        return bearer;
    }
    catch (error) {
        console.error(error);
    }
};

module.exports = {
    getFakenamesData,
    getDocByUNID,
    searchDocs,
    login
};

