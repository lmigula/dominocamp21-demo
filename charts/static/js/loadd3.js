
let w = 900;
let h = 300;
let barPadding = 1;

let dataset = [randomScalingFactor(),
randomScalingFactor(),
randomScalingFactor(),
randomScalingFactor(),
randomScalingFactor(),
randomScalingFactor(),
randomScalingFactor(),
randomScalingFactor(),
randomScalingFactor(),
randomScalingFactor(),
randomScalingFactor(),
randomScalingFactor(),
randomScalingFactor(),
randomScalingFactor()
];

let xScale = d3.scaleBand()
    .domain(d3.range(dataset.length))
    .rangeRound([0, w])
    .paddingInner(0.05);

let yScale = d3.scaleLinear()
    .domain([0, d3.max(dataset)])
    .range([0, h]);


let svgObj = d3.select('#d3').append('svg')

    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", `0 0 ${w} ${h}`)


console.log('dataset', dataset)
svgObj.selectAll('rect')
    .data(dataset)
    .enter()
    .append('rect')
    .attr('x', function (d, i) {
        return xScale(i);
    })
    .attr('y', function (d) {
        return h - yScale(d);
    })
    .attr('width', xScale.bandwidth())
    .attr('height', function (d) {
        return yScale(d);
    })
    .attr('fill', function (d) {
        return 'rgb(0, 0, ' + (255 - Math.round(d * 2)) + ')';
    })
    .on('mouseover', function (d) {
        d3.select(this)
            .attr('fill', 'rgb(0,  ' + (255 - Math.round(d * 2)) + ',0)');
    })
    .on('mouseout', function (d) {
        d3.select(this)
            .transition()
            .duration(250)
            .attr('fill', 'rgb(0, 0, ' + (255 - Math.round(d * 2)) + ')');
    })




svgObj.selectAll('text')
    .data(dataset)
    .enter()
    .append('text')
    .text(function (d) {
        return d;
    })
    .attr('text-anchor', 'middle')
    .attr('x', function (d, i) {
        return xScale(i) + xScale.bandwidth() / 2;
    })
    .attr('y', function (d) {
        return h - yScale(d) + 14;
    })
    .attr('font-family', 'sans-serif')
    .attr('font-size', '11px')
    .attr('fill', 'white');



//Create SVG element
let sortSvg = d3.select("#sortChart")
    .append("svg")
    .attr("width", w)
    .attr("height", h);



//Create bars
sortSvg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("x", function (d, i) {
        return xScale(i);
    })
    .attr("y", function (d) {
        return h - yScale(d);
    })
    .attr("width", xScale.bandwidth())
    .attr("height", function (d) {
        return yScale(d);
    })
    .attr("fill", function (d) {
        return "rgb(0, 0, " + Math.round(d * 10) + ")";
    })
    .on("click", function () {
        sortBars();
    });


//Define sort order flag
let sortOrder = false;

//Define sort function
let sortBars = function () {

    //Flip value of sortOrder
    sortOrder = !sortOrder;

    sortSvg.selectAll("rect")
        .sort(function (a, b) {
            if (sortOrder) {
                return d3.ascending(a, b);
            } else {
                return d3.descending(a, b);
            }
        })
        .transition()
        .duration(1000)
        .attr("x", function (d, i) {
            return xScale(i);
        });

};

let outerRadius = w / 6;
let innerRadius = 0;
let arc = d3.arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius);


let pieDataset = [randomScalingFactor(),
randomScalingFactor(),
randomScalingFactor(),
randomScalingFactor(),
randomScalingFactor(),
randomScalingFactor(),
];
let pie = d3.pie();


console.log('datasetPie', pieDataset);
console.log('pie(datasetPie)', pie(pieDataset));

//Easy colors accessible via a 10-step ordinal scale
let color = d3.scaleOrdinal(d3.schemeCategory10);


//Create SVG element
let svgPie = d3.select('#pieChart')
    .append('svg')
    .attr('width', w)
    .attr('height', h);


//Set up groups
let arcs = svgPie.selectAll('g.arc')
    .data(pie(pieDataset))
    .enter()
    .append('g')
    .attr('class', 'arc')
    .attr('transform', 'translate(' + outerRadius + ',' + outerRadius + ')');


//Draw arc paths
arcs.append('path')
    .attr('fill', function (d, i) {
        return color(i);
    })
    .attr('d', arc);

//Labels
arcs.append('text')
    .attr('transform', function (d) {
        return 'translate(' + arc.centroid(d) + ')';
    })
    .attr('text-anchor', 'middle')
    .text(function (d) {
        return d.value;
    });



let stackedDataset = [];
for (let idx = 0; idx < 10; idx++) {
    stackedDataset.push({
        'Produkt 1': randomScalingFactor(),
        'Produkt 2': randomScalingFactor(),
        'Produkt 3': randomScalingFactor(),
    })
}


//Set up stack method
let stack = d3.stack()
    .keys(['Produkt 1', 'Produkt 2', 'Produkt 3'])
    .order(d3.stackOrderDescending);  // <-- Flipped stacking order


//Data, stacked
let series = stack(stackedDataset);

//Set up scales
let xScaleStacked = d3.scaleBand()
    .domain(d3.range(stackedDataset.length))
    .range([0, w])
    .paddingInner(0.05);

let yScaleStacked = d3.scaleLinear()
    .domain([0,
        d3.max(stackedDataset, function (d) {
            return d['Produkt 1'] + d['Produkt 2'] + d['Produkt 3'];
        })
    ])
    .range([h, 0]);  // <-- Flipped vertical scale

//Easy colors accessible via a 10-step ordinal scale
let colors = d3.scaleOrdinal(d3.schemeCategory10);


//Create SVG element
let svg = d3.select('#stackedChart')
    .append('svg')
    .attr('width', w)
    .attr('height', h);

// Add a group for each row of data
let groups = svg.selectAll('g')
    .data(series)
    .enter()
    .append('g')
    .style('fill', function (d, i) {
        return colors(i);
    });

// Add a rect for each data value
let rects = groups.selectAll('rect')
    .data(function (d) { return d; })
    .enter()
    .append('rect')
    .attr('x', function (d, i) {
        return xScaleStacked(i);
    })
    .attr('y', function (d) {
        return yScaleStacked(d[1]);  // <-- Changed y value
    })
    .attr('height', function (d) {
        return yScaleStacked(d[0]) - yScaleStacked(d[1]);  // <-- Changed height value
    })
    .attr('width', xScaleStacked.bandwidth());


//Original data
let datasetForce = {
    nodes: [
        { name: 'Adam' },
        { name: 'Bob' },
        { name: 'Carrie' },
        { name: 'Donovan' },
        { name: 'Edward' },
        { name: 'Felicity' },
        { name: 'George' },
        { name: 'Hannah' },
        { name: 'Iris' },
        { name: 'Jerry' }
    ],
    edges: [
        { source: 0, target: 1 },
        { source: 0, target: 2 },
        { source: 0, target: 3 },
        { source: 0, target: 4 },
        { source: 1, target: 5 },
        { source: 2, target: 5 },
        { source: 2, target: 5 },
        { source: 3, target: 4 },
        { source: 5, target: 8 },
        { source: 5, target: 9 },
        { source: 6, target: 7 },
        { source: 7, target: 8 },
        { source: 8, target: 9 }
    ]
};

//Initialize a simple force layout, using the nodes and edges in dataset
let force = d3.forceSimulation(datasetForce.nodes)
    .force('charge', d3.forceManyBody())
    .force('link', d3.forceLink(datasetForce.edges))
    .force('center', d3.forceCenter().x(w / 2).y(h / 2));

//Create SVG element
let svgForce = d3.select('#force')
    .append('svg')
    .attr('width', w)
    .attr('height', h);


//Create edges as lines
let edges = svgForce.selectAll('line')
    .data(datasetForce.edges)
    .enter()
    .append('line')
    .style('stroke', '#ccc')
    .style('stroke-width', 1);



let nodes = svgForce.selectAll('circle')
    .data(datasetForce.nodes)
    .enter()
    .append('circle')
    .attr('r', 10)
    .style('fill', function (d, i) {
        return colors(i);
    })
    .call(d3.drag()  //Define what to do on drag events
        .on('start', dragStarted)
        .on('drag', dragging)
        .on('end', dragEnded));

//Add a simple tooltip
nodes.append('title')
    .text(function (d) {
        return d.name;
    });

//Every time the simulation 'ticks', this will be called
force.on('tick', function () {

    edges.attr('x1', function (d) { return d.source.x; })
        .attr('y1', function (d) { return d.source.y; })
        .attr('x2', function (d) { return d.target.x; })
        .attr('y2', function (d) { return d.target.y; });

    nodes.attr('cx', function (d) { return d.x; })
        .attr('cy', function (d) { return d.y; });

});

//Define drag event functions
function dragStarted(d) {
    if (!d3.event.active) force.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
}

function dragging(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
}

function dragEnded(d) {
    if (!d3.event.active) force.alphaTarget(0);
    d.fx = null;
    d.fy = null;
}


function refreshData() {
    console.log('updateData');
    dataset = [randomScalingFactor(),
    randomScalingFactor(),
    randomScalingFactor(),
    randomScalingFactor(),
    randomScalingFactor(),
    randomScalingFactor(),
    randomScalingFactor(),
    randomScalingFactor(),
    randomScalingFactor(),
    randomScalingFactor(),
    randomScalingFactor(),
    randomScalingFactor(),
    randomScalingFactor(),
    randomScalingFactor()
    ]
    svgObj.selectAll('rect')
        .data(dataset)
        .transition()
        .duration(1000)
        .attr('y', function (d) {
            return h - yScale(d);
        })
        .attr('height', function (d) {
            return yScale(d);
        })
        .attr('fill', function (d) {
            return 'rgb(0, 0, ' + (255 - Math.round(d * 2)) + ')';
        });

    svgObj.selectAll('text')
        .data(dataset)
        .transition()
        .duration(1000)
        .text(function (d) {
            return d;
        })
        .attr('x', function (d, i) {
            return xScale(i) + xScale.bandwidth() / 2;
        })
        .attr('y', function (d) {
            return h - yScale(d) + 25;
        });
    let innerRadius = w / 8;
    arc = d3.arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius);
    svgPie.selectAll('g.arc')
        .data(pie(pieDataset))
        .transition()
        .duration(1000)
        .attr('class', 'arc')
        .attr('transform', 'translate(' + outerRadius + ',' + outerRadius + ')');

}



function downloadPdf() {

    console.log('createPdf')
    let tableBody = [];
    tableBody.push(['Name', 'Value'])
    dataset.forEach((entry, idx) => {
        tableBody.push(['Product ' + idx, entry])
    })
    let orgWidth = svg.attr('width');
    let orgHeigth = svg.attr('height');
    console.log('svg.node().outerHTM', svg);
    svg.attr('width', 400);
    svg.attr('height', 300);
    let docDefinition = {
        content: [

            {
                layout: 'lightHorizontalLines', // optional
                table: {
                    // headers are automatically repeated if the table spans over multiple pages
                    // you can declare how many rows should be treated as headers

                    headerRows: 1,
                    body: tableBody
                }
            },
            {
                // If no width/height/fit is used, then dimensions from the svg element is used.
                svg: svgObj.node().outerHTML,
                fit: [500, 300]

            },
        ],
        defaultStyle: {
            fontSize: 15,

        }
    };
    pdfMake.createPdf(docDefinition).download();

}

