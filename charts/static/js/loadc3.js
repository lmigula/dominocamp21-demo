let chartColors = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)'
};
let colorNames = Object.keys(chartColors);

let lineChart;
let areaSplineChart;
let splineChart;
let stackedChart;
let pieChart;
let barChart;
let gaugeChart;


let dataset = [
    [
        'x',
        '01.2021',
        '02.2021',
        '03.2021',
        '04.2021',
        '05.2021',
        '06.2021',
        '07.2021'
    ],
    [
        'data1',
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor()
    ],
    [
        'data2',
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor()
    ],
    [
        'data3',
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor()
    ]
];
window.onload = function () {

    lineChart = c3.generate({
        bindto: '#lineChart',
        data: {
            x: 'x',
            xFormat: '%m.%Y',
            columns: dataset
        },
        axis: {
            x: {
                type: 'timeseries',
                tick: {
                    format: '%m.%Y'
                }
            }
        }
    });


    barChart = c3.generate({
        bindto: '#barChart',
        data: {
            x: 'x',
            xFormat: '%m.%Y',
            columns: [
                [
                    'x',
                    '01.2021',
                    '02.2021',
                    '03.2021',
                    '04.2021',
                    '05.2021',
                    '06.2021',
                    '07.2021'
                ],
                [
                    'data1',
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor()
                ],
                [
                    'data2',
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor()
                ],
                [
                    'data3',
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor()
                ]
            ],
            type: 'bar',
        },
        axis: {
            x: {
                type: 'timeseries',
                tick: {
                    format: '%m.%Y'
                }
            }
        },
        bar: {
            width: {
                ratio: 0.8 // this makes bar width 50% of length between ticks
            }
            // or
            //width: 100 // this makes bar width 100px
        }
    });


    pieChart = c3.generate({
        bindto: '#pieChart',
        data: {
            // iris data from R
            columns: [
                ['data1', randomScalingFactor()],
                ['data2', randomScalingFactor()],
                ['data3', randomScalingFactor()],
                ['data4', randomScalingFactor()],
            ],
            type: 'pie',
        }
    });


    stackedChart = c3.generate({
        bindto: '#stackedBarChart',
        data: {
            x: 'x',
            xFormat: '%m.%Y',
            columns: [
                [
                    'x',
                    '01.2021',
                    '02.2021',
                    '03.2021',
                    '04.2021',
                    '05.2021',
                    '06.2021',
                    '07.2021'
                ],
                [
                    'data1',
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor()
                ],
                [
                    'data2',
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor()
                ],
                [
                    'data3',
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor()
                ]
            ],
            type: 'bar',
            groups: [
                ['data1', 'data2', 'data3']
            ]
        },
        axis: {
            x: {
                type: 'timeseries',
                tick: {
                    format: '%m.%Y'
                }
            }
        },
        bar: {
            width: {
                ratio: 0.8 // this makes bar width 50% of length between ticks
            }
            // or
            //width: 100 // this makes bar width 100px
        }
    });

    splineChart = c3.generate({
        bindto: '#splineChart',
        data: {
            x: 'x',
            xFormat: '%m.%Y',
            columns: [
                [
                    'x',
                    '01.2021',
                    '02.2021',
                    '03.2021',
                    '04.2021',
                    '05.2021',
                    '06.2021',
                    '07.2021'
                ],
                [
                    'data1',
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor()
                ],
                [
                    'data2',
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor()
                ],
                [
                    'data3',
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor()
                ]
            ],
            type: 'spline'
        },
        axis: {
            x: {
                type: 'timeseries',
                tick: {
                    format: '%m.%Y'
                }
            }
        }
    });

    areaSplineChart = c3.generate({
        bindto: '#areaSplineChart',
        data: {
            x: 'x',
            xFormat: '%m.%Y',
            columns: [
                [
                    'x',
                    '01.2021',
                    '02.2021',
                    '03.2021',
                    '04.2021',
                    '05.2021',
                    '06.2021',
                    '07.2021'
                ],
                [
                    'data1',
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor()
                ],
                [
                    'data2',
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor()
                ],
                [
                    'data3',
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor()
                ]
            ],
            types: {
                data1: 'area-spline',
                data2: 'area-spline',
                data3: 'area-spline'
                // 'line', 'spline', 'step', 'area', 'area-step' are also available to stack
            },
            groups: [['data1', 'data2', 'data3']]
        },
        axis: {
            x: {
                type: 'timeseries',
                tick: {
                    format: '%m.%Y'
                }
            }
        }
    });

    gaugeChart = c3.generate({
        bindto: '#gaugeChart',
        data: {
            columns: [
                ['data', randomScalingFactor()],
                ['data2', randomScalingFactor()],

            ],
            type: 'gauge',
        },
        gauge: {
            //        label: {
            //            format: function(value, ratio) {
            //                return value;
            //            },
            //            show: false // to turn off the min/max labels.
            //        },
            //    min: 0, // 0 is default, //can handle negative min e.g. vacuum / voltage / current flow / rate of change
            //    max: 100, // 100 is default
            //    units: ' %',
            //    width: 39 // for adjusting arc thickness
        },
        color: {
            pattern: ['#FF0000', '#F97600', '#F6C600', '#60B044'], // the three color levels for the percentage values.
            threshold: {
                //            unit: 'value', // percentage is default
                //            max: 200, // 100 is default
                values: [30, 60, 90, 100]
            }
        },
        size: {
            height: 180
        }
    });
}
function triggerDownload(imgURI, name) {
    let evt = new MouseEvent('click', {
        view: window,
        bubbles: false,
        cancelable: true
    });

    let a = document.createElement('a');
    a.setAttribute('download', name + '.png');
    a.setAttribute('href', imgURI);
    a.setAttribute('target', '_blank');
    a.dispatchEvent(evt);
}

function saveAsPng(idString) {
    console.log('save')
    let svg = document.querySelector(`#${idString} svg`);

    let width = svg.getAttribute('width');
    let height = svg.getAttribute('height');
    let canvas = document.getElementById('canvas');

    let ctx = canvas.getContext('2d');
    ctx.canvas.width = width;
    ctx.canvas.height = height;
    //let data = svg.outerHTML
    var data = new XMLSerializer().serializeToString(svg);
    let DOMURL = window.URL || window.webkitURL || window;
    let img = new Image();
    let svgBlob = new Blob([data], { type: 'image/svg+xml;charset=utf-8' });
    let url = DOMURL.createObjectURL(svgBlob);
    img.onload = function () {
        ctx.drawImage(img, 0, 0);

        let imgURI = canvas
            .toDataURL('image/png')
            .replace('image/png', 'image/octet-stream');
        triggerDownload(imgURI, idString);
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    };
    img.src = url;
    console.log('img', img)
}

function refreshData() {
    console.log('refreshData');
    lineChart.load({
        columns: [
            [
                'x',
                '01.2021',
                '02.2021',
                '03.2021',
                '04.2021',
                '05.2021',
                '06.2021',
                '07.2021'
            ],
            [
                'data1',
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor()
            ],
            [
                'data2',
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor()
            ],
            [
                'data3',
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor()
            ]
        ]
    });

    barChart.load({
        x: 'x',
        xFormat: '%m.%Y',
        columns: [
            [
                'x',
                '01.2021',
                '02.2021',
                '03.2021',
                '04.2021',
                '05.2021',
                '06.2021',
                '07.2021'
            ],
            [
                'data1',
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor()
            ],
            [
                'data2',
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor()
            ],
            [
                'data3',
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor()
            ]
        ],
        type: 'bar',
    });

    pieChart.load({
        // iris data from R
        columns: [
            ['data1', randomScalingFactor()],
            ['data2', randomScalingFactor()],
            ['data3', randomScalingFactor()],
            ['data4', randomScalingFactor()],
        ],
        type: 'pie',
    });

    stackedChart.load({
        x: 'x',
        xFormat: '%m.%Y',
        columns: [
            [
                'x',
                '01.2021',
                '02.2021',
                '03.2021',
                '04.2021',
                '05.2021',
                '06.2021',
                '07.2021'
            ],
            [
                'data1',
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor()
            ],
            [
                'data2',
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor()
            ],
            [
                'data3',
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor()
            ]
        ],
        type: 'bar',
        groups: [
            ['data1', 'data2', 'data3']
        ]
    });

    splineChart.load({
        x: 'x',
        xFormat: '%m.%Y',
        columns: [
            [
                'x',
                '01.2021',
                '02.2021',
                '03.2021',
                '04.2021',
                '05.2021',
                '06.2021',
                '07.2021'
            ],
            [
                'data1',
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor()
            ],
            [
                'data2',
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor()
            ],
            [
                'data3',
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor()
            ]
        ],
        type: 'spline'
    });

    areaSplineChart.load({
        x: 'x',
        xFormat: '%m.%Y',
        columns: [
            [
                'x',
                '01.2021',
                '02.2021',
                '03.2021',
                '04.2021',
                '05.2021',
                '06.2021',
                '07.2021'
            ],
            [
                'data1',
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor()
            ],
            [
                'data2',
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor()
            ],
            [
                'data3',
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor()
            ]
        ],
        types: {
            data1: 'area-spline',
            data2: 'area-spline',
            data3: 'area-spline'
            // 'line', 'spline', 'step', 'area', 'area-step' are also available to stack
        },
        groups: [['data1', 'data2', 'data3']]
    });

    gaugeChart.load({
        columns: [
            ['data', randomScalingFactor()],
            ['data2', randomScalingFactor()],

        ],
        type: 'gauge',
    })

}



function downloadPdf(idString) {

    console.log('createPdf')
    let tableBody = [];

    let svg = document.querySelector(`#${idString} svg`);
    tableBody.push(['Name', 'Value'])
    dataset.forEach((entry, idx) => {
        tableBody.push(['Product ' + idx, entry])
    })

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
                svg: svg.outerHTML,
                fit: [500, 300]

            },
        ],
        defaultStyle: {
            fontSize: 15,

        }
    };
    pdfMake.createPdf(docDefinition).download();
}