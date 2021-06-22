
const config = require('config');
const axios = require('axios')


const username = config.get('domino.httpUser');
const password = config.get('domino.httpPassword');

let count = ''; //'&count=50'
let bearer = undefined;
const baseurl = 'http://keep.acme.test:8880/api/v1/'
async function getFakenamesData() {

    try {
        console.time("getFakenamesData");
        if (!bearer) {
            bearer = await login();
        }
        let resultData = await axios.get(baseurl + 'lists/%28%24VIMPeople%29?db=fakenames' + count,
            {
                headers: {
                    'Authorization': `Bearer ${bearer}`
                }
            })
        console.timeEnd("getFakenamesData");
        return resultData.data;
    } catch (error) {
        console.error('error')
    }

}

async function getDocument(unid) {

    try {
        if (!bearer) {
            bearer = await login();
        }
        // console.time("getDocument");

        let resultData = await axios.get(baseurl + `document/${unid}/default?db=fakenames&computeWithForm=true`,
            {
                headers: {
                    'Authorization': `Bearer ${bearer}`
                }
            })
        // console.timeEnd("getDocument");
        return resultData.data;
    } catch (error) {
        console.error(error)
    }

}

async function getAllDocs() {
    try {
        if (!bearer) {
            bearer = await login();
        }
        const query = {
            "timeoutSecs": 300,
            "query": "form = 'Person'"

        };
        let resultData = await axios.post(baseurl + `query?db=fakenames&action=execute${count}`,
            query,
            {
                headers: {
                    'Authorization': `Bearer ${bearer}`
                }
            })
        return resultData.data;
    } catch (error) {
        console.error(error)
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

module.exports =
{
    login,
    getFakenamesData,
    getDocument,
    getAllDocs
}