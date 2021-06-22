let moment = require('moment');
let formatMonth = 'YYYY-MM';

let docs = [
    {
        orderProducts: ['Product B', 'Product A'],
        amount: [123, 3456],
        orderDateDT: {
            data: '2020-02'
        }
    },
    {
        orderProducts: ['Product C', 'Product B', 'Product A'],
        amount: [123, 3456, 34536],
        orderDateDT: {
            data: '2020-01'
        }
    },
    {
        orderProducts: ['Product B', 'Product A', 'Product C'],
        amount: [123, 3456, 34536],
        orderDateDT: {
            data: '2020-02'
        }
    },
    {
        orderProducts: ['Product B', 'Product A'],
        amount: [123, 3456],
        orderDateDT: {
            data: '2020-01'
        }
    },
    {
        orderProducts: ['Product B', 'Product A'],
        amount: [123, 3456],
        orderDateDT: {
            data: '2020-02'
        }
    },

]


let findEntry = function (data, key) {
    let result = -1;

    if (data) {
        data.forEach((entry, idx) => {
            if (Object.keys(entry)[0] == key) {
                result = idx;
            }
        })
    }
    return result;
}


/*
let dataObj = [];
docs.forEach(doc => {
    let products = doc.orderProducts
    let amountArray = doc.amount
    let orderDate = new Date(doc.orderDateDT.data);
    let monthString = moment(orderDate).format(formatMonth)
    let idx = findEntry(dataObj, monthString);
    console.log('idx', idx);
    let data;
    if (idx >= 0) {
        let tmpData = dataObj[idx];
        data = tmpData[monthString];
    } else {
        let tmpData = {};
        data = [];
        tmpData[monthString] = data;
        dataObj.push(tmpData);
    }
    products.forEach((product, idx) => {
        console.log('data', data);
        let prodIdx = findEntry(data, product);
        let prodCount = prodIdx >= 0 ? data[prodIdx] : 0;
        let addCount = amountArray[idx] ? amountArray[idx] : 0;
        if (prodIdx >= 0) {
            data[prodIdx] = prodCount + addCount;
        } else {
            let newEntry = {};
            newEntry[product] = addCount;
            data.push(newEntry);
        }
    });
});
 */

let dataObj = {};
docs.forEach(doc => {
    let products = doc.orderProducts
    let amountArray = doc.amount
    let orderDate = new Date(doc.orderDateDT.data);
    let monthString = moment(orderDate).format(formatMonth)
    if (!dataObj[monthString]) {
        dataObj[monthString] = {};
    }
    let data = dataObj[monthString];
    products.forEach((product, idx) => {
        let prodCount = data[product] ? data[product] : 0;
        let addCount = amountArray[idx] ? amountArray[idx] : 0;
        data[product] = prodCount + addCount;
    });
});
console.log('dataObj', dataObj);



let json2array = function (jsonObj) {
    let result = [];
    let keys = Object.keys(jsonObj);
    keys.forEach(function (key) {
        let tmpObj = {};
        let value = jsonObj[key];
        if (typeof value == 'object') {
            value = json2array(value);
        }
        tmpObj[key] = value;
        result.push(tmpObj)
    });
    return result;
}


dataObj = json2array(dataObj);

console.log('dataObj', dataObj);
/*


let dataObj = [{
    "2020-02": [
        { "Product B": 2875 },
        { "Product A": 2601 },
        { "Product C": 2843 }
    ],
}, {
    "2020-01": [
        { "Product B": 3516 },
        { "Product C": 3228 },
        { "Product A": 3416 }
    ]
}];
 */

function sortByKey(jsObj) {
    let sortedArray = [];

    // Push each JSON Object entry in array by [key, value]
    for (let i in jsObj) {
        if (typeof jsObj[i] == 'object') {
            sortedArray.push([i, sortByKey(jsObj[i])]);
        } else {
            sortedArray.push([i, jsObj[i]]);
        }
    }

    // Run native sort function and returns sorted array.
    return sortedArray.sort();
}

function sortArray(a, b) {
    let aKey = Object.keys(a)[0]
    let bKey = Object.keys(b)[0]
    if (aKey < bKey) {
        return -1;
    }
    if (aKey > bKey) {
        return 1;
    }
    return 0;
}

function callSort(tmpObj) {
    let isArray = Array.isArray(tmpObj);
    if (isArray) {
        tmpObj.sort(sortArray);
        tmpObj.forEach(obj => {
            let keys = Object.keys(obj);
            keys.forEach(function (key) {
                let keyObj = obj[key];
                if (Array.isArray(keyObj)) {
                    callSort(keyObj);
                }
            });
        });
    }
    return tmpObj;
}

/*
dataObj.sort(sortArray);
// console.log(dataObj);

dataObj.forEach(obj => {
    Object.values(obj)
        .forEach(entryObj => {
            entryObj.sort(sortArray);
        });
}); */

dataObj = callSort(dataObj);

console.log('dataObj', dataObj);
dataObj.forEach(entry => console.log('entry', entry))