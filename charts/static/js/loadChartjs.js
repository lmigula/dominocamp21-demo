let color = Chart.helpers.color;
let chartColors = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    lightblue: 'rgb(173,216,230)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)'
};
let colorNames = Object.keys(chartColors);

let barChartData = {
    labels: [
        'Januar',
        'Februar',
        'März',
        'April',
        'Mai',
        'Juni',
        'Juli'
    ],
    datasets: [
        {
            label: 'Produkt A',
            backgroundColor: color(chartColors.blue)
                .alpha(0.5)
                .rgbString(),
            borderColor: chartColors.blue,
            borderWidth: 1,
            data: [
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor()
            ]
        }, {
            label: 'Produkt B',
            backgroundColor: color(chartColors.red)
                .alpha(0.5)
                .rgbString(),
            borderColor: chartColors.red,
            borderWidth: 1,
            data: [
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor()
            ]
        },
        {
            label: 'Produkt C',
            backgroundColor: color(chartColors.lightblue)
                .alpha(0.5)
                .rgbString(),
            borderColor: chartColors.blue,
            borderWidth: 1,
            data: [
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor()
            ]
        }
    ]

};

let pieChartData = {
    labels: [
        'Rot', 'Orange', 'Gelb', 'Grün', 'Blau'
    ],
    datasets: [
        {
            label: 'Dataset 1',
            backgroundColor: [
                chartColors.red, chartColors.orange, chartColors.yellow, chartColors.green, chartColors.blue
            ],

            data: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor()]
        }
    ]

};

let lineDataSet =

{
    labels: [
        'Januar',
        'Februar',
        'März',
        'April',
        'Mai',
        'Juni',
        'Juli'
    ],
    datasets: [
        {
            label: 'Produkt 1',
            backgroundColor: chartColors.red,
            borderColor: chartColors.red,
            data: [
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor()
            ],
            fill: false
        }, {
            label: 'Produkt 2',
            fill: false,
            backgroundColor: chartColors.blue,
            borderColor: chartColors.blue,
            data: [
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor()
            ]
        }
    ]
};


let config = {
    type: 'line',
    data: lineDataSet,
    options: {
        responsive: true,
        title: {
            display: true,
            text: 'Chart.js Line Chart'
        },
        tooltips: {
            mode: 'index',
            intersect: false
        },
        hover: {
            mode: 'nearest',
            intersect: true
        },
        scales: {
            xAxes: [
                {
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Monat'
                    }
                }
            ],
            yAxes: [
                {
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Anzahl'
                    }
                }
            ]
        }
    }
};

window.onload = function () {
    let ctx = document
        .getElementById('canvas')
        .getContext('2d');
    window.barChart = new Chart(ctx, {
        type: 'bar',
        data: barChartData,
        options: {
            responsive: true,
            legend: {
                position: 'top'
            },
            title: {
                display: true,
                text: 'Chart.js Bar Chart'
            }
        }
    });

    //canvasStacked
    let ctxStacked = document
        .getElementById('canvasStacked')
        .getContext('2d');
    window.stackedBar = new Chart(ctxStacked, {
        type: 'bar',
        data: barChartData,
        options: {
            responsive: true,
            legend: {
                position: 'top'
            },
            scales: {
                xAxes: [
                    {
                        stacked: true
                    }
                ],
                yAxes: [
                    {
                        stacked: true
                    }
                ]
            },
            title: {
                display: true,
                text: 'Chart.js Bar Chart'
            }
        }
    });

    let ctxPie = document
        .getElementById('canvasPie')
        .getContext('2d');
    window.pieChart = new Chart(ctxPie, {
        type: 'pie',
        data: pieChartData,
        options: {
            responsive: true,
            legend: {
                position: 'top'
            },
            title: {
                display: true,
                text: 'Chart.js Pie Chart'
            }
        }
    });

    let ctxLine = document
        .getElementById('canvasLine')
        .getContext('2d');
    window.lineBar = new Chart(ctxLine, config);
};

function recalcData(dataset) {
    dataset.datasets.forEach(function (dataset) {
        dataset.data = dataset.data.map(function () {

            let result = randomScalingFactor();

            return result;
        });

    });
}

function triggerDownload(imgURI, name) {
    let a = document.createElement('a');
    a.setAttribute('download', name + '.png');
    a.setAttribute('href', imgURI);
    a.setAttribute('target', '_blank');
    // a.dispatchEvent(evt);
    a.click();
    a.remove();
}


function saveImage(idString) {
    let canvas = document.getElementById(idString);
    let imgURI = canvas
        .toDataURL('image/png')
    triggerDownload(imgURI, idString);
}


function refreshData() {

    recalcData(barChartData);
    recalcData(pieChartData);
    recalcData(lineDataSet);
    window.barChart.update();
    window.stackedBar.update();
    window.lineBar.update();
    window.pieChart.update();
}