'use strict'

google.charts.load('current', {'packages':['geochart']});

google.setOnLoadCallback(drawRegionsMap);

function drawRegionsMap() {
    var queryString = encodeURIComponent('SELECT *');

    var query = new google.visualization.Query(
    'https://docs.google.com/spreadsheets/d/1rOGqa5SmbhXWQzhr121ENOOxujE5_rR1_0WMJDTI_68/edit?usp=sharing' + queryString);
    query.send(handleSampleDataQueryResponse);
}

function handleSampleDataQueryResponse(response) {
    if (response.isError()) {
        alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
        return;
    }

    var view = new google.visualization.DataView(response.getDataTable());
    view.setColumns([0, 1, 2]);
    var options = {
        colorAxis: {colors: ['#DA0000', '#580000']}
    };

    //var data = response.getDataTable();
    var chart = new google.visualization.GeoChart(document.getElementById('chart_div'));
    chart.draw(view, options);
}