(function () {
    'use strict'

    let iso_ccaa = $('#iso').text();
    const url = `https://eu-gb.functions.appdomain.cloud/api/v1/web/pablo.gimeno%40urv.cat_dev/NLHackaton2020/api?ccaa=${iso_ccaa}`;
    console.log(url)

    $.getJSON(url,
        function (data) {
            console.log(data);

            const n_cases = Object.values(data['num_casos']);

            var labels = []
            for (var i = 0; i < n_cases.length; i++) {
                labels.push(i)
            }

            console.log(n_cases)

            var ctx = document.getElementById('bar_chart');
            var chart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        data: n_cases,
                        lineTension: 0,
                        backgroundColor: 'transparent',
                        borderColor: '#007bff',
                        borderWidth: 4,
                        pointBackgroundColor: '#007bff',
                        label: 'Total casos por día'
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: false
                            }
                        }]
                    },
                },
            })

            const n_cases_acum = Object.values(data['num_casos_acum']);
            const n_cases_predict = Object.values(data['svm_pred'])

            var labels = []
            for (var i = 0; i < n_cases_predict.length; i++) {
                labels.push(i)
            }

            var ctx = document.getElementById('line_chart');
            var chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        data: n_cases_acum,
                        lineTension: 0,
                        backgroundColor: 'transparent',
                        borderColor: '#007bff',
                        borderWidth: 4,
                        pointBackgroundColor: '#007bff',
                        pointRadius: 0,
                        label: 'Total casos acumulados'
                    },
                    {
                        data: n_cases_predict,
                        lineTension: 0,
                        borderDash: [5, 5],
                        backgroundColor: 'transparent',
                        borderColor: '#007bff',
                        borderWidth: 4,
                        pointBackgroundColor: '#007bff',
                        pointRadius: 0,
                        label: 'Predicción SVM'
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: false
                            }
                        }]
                    },
                },
            })
        })

})()
