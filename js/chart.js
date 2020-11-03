function PlacesChart() {
    const REQUEST = new XMLHttpRequest();
    let url = 'http://api_riot.local/tft/count_places/ofry';

    function paintChart() {
        let response = REQUEST.responseText;
        let responseJson = JSON.parse(response);
        let data = responseJson.data.count_places;
        let places = Object.keys(data);
        let counts = Object.values(data);

        console.log(data, places, counts)

        var ctx = document.getElementById('myChart').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'horizontalBar',
            data: {
                labels: places,
                datasets: [{
                    barPercentage: 0.5,
                    barThickness: 6,
                    maxBarThickness: 8,
                    minBarLength: 1,
                    label: '',
                    data: counts,
                    backgroundColor: [
                        'rgba(205, 141, 32, 1)',
                        'rgba(69, 72, 65, 1)',
                        'rgba(167, 163, 153, 1)',
                        'rgba(219, 113, 113, 1)',
                        'rgba(51, 79, 98, 1)',
                        'rgba(100, 78, 53, 1)',
                        'rgba(7, 9, 12, 1)',
                        'rgba(39, 63, 107, 1)'
                    ]
                }]
            },
            options: {
                scales: {
                    xAxes: [{
                        gridLines: {
                            offsetGridLines: true
                        }
                    }]
                },
                legend: {
                    display: false
                }
            }
        });

    }

    function sendRequest() {
        REQUEST.open('GET', url);
        REQUEST.setRequestHeader('Content-Type', 'application/x-www-form-url');
        REQUEST.addEventListener('readystatechange', () => {
            if (REQUEST.readyState === 4 && REQUEST.status === 200) {
                paintChart();
            }
        });


        REQUEST.send();
    }

    sendRequest();
}

new PlacesChart();
