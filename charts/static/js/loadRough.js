
let fillStyles = [
    'hachure',
    'cross-hatch',
    'zigzag',
    'dashed',
    'solid',
    'zigzag-line'
];

new roughViz.Bar({
    element: '#vis0',
    data: {
        labels: [
            'Januar',
            'Februar',
            'März',
            'April',
            'Mai',
            'Juni',
            'Juli'
        ],
        values: [
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor()

        ]
    },
    //data: 'https://gist.githubusercontent.com/mbostock/3310560/raw/98311dc46685ed02588afdcb69e5fa296febc1eb/letter-frequency.tsv',
    title: 'Verkäufe',
    stroke: 'coral',
    strokeWidth: 3,
    roughness: rand(1, 10),
    width: window.innerWidth * 0.7,
    color: 'pink',
    fillStyle: fillStyles[Math.floor(rand(0, fillStyles.length))],
    fillWeight: 1.5
});

new roughViz.StackedBar({
    element: '#vis1',
    data: [
        {
            month: 'Januar',
            A: randomScalingFactor(),
            B: randomScalingFactor(),
            C: randomScalingFactor()
        }, {
            month: 'Februar',
            A: randomScalingFactor(),
            B: randomScalingFactor(),
            C: randomScalingFactor()
        }, {
            month: 'März',
            A: randomScalingFactor(),
            B: randomScalingFactor(),
            C: randomScalingFactor()
        }

    ],
    labels: 'month',
    title: 'Verkäufe nach Monat',
    height: window.innerHeight * 0.7,
    width: window.innerWidth * 0.7,
    roughness: rand(1, 10),
    colors: [
        'blue', '#f996ae', 'skyblue', '#9ff4df'
    ],
    fillWeight: 0.35,
    strokeWidth: 0.5,
    fillStyle: fillStyles[Math.floor(rand(0, fillStyles.length))],
    stroke: 'black'
});

new roughViz.Line({
    element: '#vis2',
    data: 'https://raw.githubusercontent.com/jwilber/random_data/master/tweets.csv',
    title: 'Line Chart',
    // x: 'gdpPercap',
    y: 'favorites',
    y2: 'retweets',
    y3: 'tweets',
    yLabel: 'Anzahl',
    colorVar: 'continent',
    highlightLabel: 'country',
    highlight: 'red',
    fillWeight: 2,
    roughness: rand(0, 10),
    width: window.innerWidth * 0.7,
    height: 500
});

new roughViz.Pie({
    element: '#vis3',
    titleFontSize: '1.5rem',
    legend: true,
    margin: {
        top: 50,
        bottom: 100,
        left: 40,
        right: 100
    },
    data: {
        labels: [
            'Produkt 1', 'Produkt 2', 'Produkt 3', 'Produkt 4', 'Produckt 5'
        ],
        values: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor()]
    },
    strokeWidth: 3,
    roughness: rand(1, 10),
    width: window.innerWidth * 0.7,
    fillStyle: fillStyles[Math.floor(rand(0, fillStyles.length))],
    highlight: 'gold'
});