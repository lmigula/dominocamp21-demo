const fs = require('fs');
const output = require('d3node-output');
const D3Node = require('d3-node')
const d3n = new D3Node()      // initializes D3 with container element
const d3 = require('d3');
let moment = require('moment');
let formatMonth = 'MM.YY';
let pdf = require('html-pdf');
let nunjucks = require('nunjucks');


let html = fs.readFileSync('src/template.njk', 'utf8');
let options = {
    format: 'A4',
    orientation: 'landscape',
};
nunjucks.configure({ autoescape: true });

const domino = require('./domino-rest.js');




domino.getActivityData()
    .then(res => {
        let data = res;
        console.log('data', data[0]);


        let dataObj = [];
        data.forEach(doc => {
            let activityType = doc.activityreportactivitytype;
            let activityCustomer = doc.activityreportprojectcustomer;
            let activityDuration = doc.activityreportactivityduration;
            let activityBillable = doc.activityreportdurationbillable;
            let activityDate = new Date(doc.activityreportdate);
            let monthString = moment(activityDate).format(formatMonth)

            let data = dataObj.find(el => el.month == monthString);

            if (data) {
                data.duration = data.duration + activityDuration;
                data.billable = data.billable + activityBillable;
            } else {
                let tmpData = {
                    month: monthString,
                    duration: activityDuration,
                    billable: activityBillable
                }
                dataObj.push(tmpData);
            }

        });
        console.log('dataObj', dataObj);
        dataObj = dataObj.sort((a, b) => {
            var x = a.month < b.month ? -1 : 1;
            return x;
        });
        console.log('dataObj', dataObj);
        let xAxisLabels = dataObj.map(el => el.month);

        let margin = { top: 10, right: 10, bottom: 25, left: 25 };
        let wOrg = 800;
        let hOrg = 450;
        let w = wOrg - margin.left - margin.right;
        let h = hOrg - margin.top - margin.bottom;

        let headers = ['duration', 'billable']


        let svgObj = d3n.createSVG()
            //()  .attr("preserveAspectRatio", "xMinYMin meet")
            .attr("viewBox", `-20 -20 ${wOrg + 20} ${hOrg + 20}`)
            .attr('width', wOrg + 10)
            .attr('height', hOrg + 10)
            .append('g')
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");


        let x = d3.scaleBand()
            .domain(xAxisLabels)
            .range([0, w])
            .padding([0.2])


        let y = d3.scaleLinear()
            .domain([0, 1000])
            .range([h, 0]);



        let xSubgroup = d3.scaleBand()
            .domain(headers)
            .range([0, x.bandwidth()])
            .padding([0.05])


        let color = d3.scaleOrdinal()
            .domain(headers)
            .range(['#e41a1c', '#377eb8']);

        svgObj.append("g")
            .call(d3.axisLeft(y));

        svgObj.append("g")
            .attr("transform", "translate(0," + h + ")")
            .call(d3.axisBottom(x).tickSize(0));

        svgObj.selectAll('rect')
            .data(dataObj)
            .enter()
            .append('g')
            .attr("transform", function (d) { return "translate(" + x(d.month) + ",0)"; })
            .selectAll("rect")
            .data(function (d) {
                return headers.map(function (key) {
                    return {
                        key: key,
                        value: d[key]
                    };
                }
                );
            })

            .enter().append("rect")
            .attr("x", function (d) { return xSubgroup(d.key); })
            .attr("y", function (d) { return y(d.value); })
            .attr("width", xSubgroup.bandwidth())
            .attr("height", function (d) { return h - y(d.value); })
            .attr("fill", function (d) { return color(d.key); });

        let svg = d3n.svgString();
        let tableBody = [];
        let tableheader = ['Monat', 'gesamt', 'abrechenbar'];
        dataObj.forEach(entry => {
            tableBody.push([entry.month, entry.duration, entry.billable])
        })
        console.log('tableBody', tableBody);
        let htmlString = nunjucks.renderString(html,
            {
                svg: svg,
                tableBody: tableBody,
                tableheader: tableheader
            });

        fs.writeFileSync('test.html', htmlString);
        fs.writeFileSync('test.svg', svg);
        pdf.create(htmlString, options).toFile('report.pdf', function (err, res) {
            if (err) return console.log(err);
            console.log(res); // { filename: '/app/businesscard.pdf' }
        });


    })
/* let _seed = Date.now();

let rand = function (min, max) {
    var seed = _seed;
    min = min === undefined
        ? 0
        : min;
    max = max === undefined
        ? 1
        : max;
    _seed = (seed * 9301 + 49297) % 233280;
    return min + (_seed / 233280) * (max - min);
};


let randomScalingFactor = function () {
    let result = Math.round(rand(0, 100));
    return result;
};
let w = 700;
let h = 300;
let barPadding = 1;

let dataset = [];
for (let idx = 1; idx < 10; idx++) {
    let key = 'Product ' + idx;
    dataset.push(
        {
            'key': key,
            value: randomScalingFactor()
        }
    )
};

console.log('dataset', dataset);
let xScale = d3.scaleBand()
    .domain(d3.range(dataset.length))
    .rangeRound([0, w])
    .paddingInner(0.05);

let yScale = d3.scaleLinear()
    .domain([0, d3.max(dataset, (d) => d.value)])
    .range([0, h]);


let svgObj = d3n.createSVG()
    //()  .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", `0 0 ${ w } ${ h }`)
    .attr('width', w)
    .attr('height', h)
    .append('g');

// .attr("preserveAspectRatio", "xMinYMin meet")
// .attr("viewBox", `0 0 ${ w } ${ h }`);


svgObj.selectAll('rect')
    .data(dataset)
    .enter()
    .append('rect')
    .attr('x', function (d, i) {
        return xScale(i);
    })
    .attr('y', function (d) {
        console.log('y', d.value);
        return h - yScale(d.value);
    })
    .attr('width', xScale.bandwidth())
    .attr('height', function (d) {
        return yScale(d.value);
    })
    .attr('fill', function (d) {
        return 'rgb(0, 0, ' + (255 - Math.round(d.value * 2)) + ')';
    })

console.log('svgObj', d3n.svgString())
 */
