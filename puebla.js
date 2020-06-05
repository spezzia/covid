'use strict'

google.setOnLoadCallback(drawSheetName);

function drawSheetName() {
    
    var query = new google.visualization.Query(
    'https://docs.google.com/spreadsheets/d/1n65j8P31lIdU5YV7n-VbKhCTra8csTlGLUbnd8Q4Z_0/gviz/tq?');
    
    query.setQuery("select ");
    query.send(handleSampleDataQueryResponse);
}

function handleSampleDataQueryResponse(response) {
    if (response.isError()) {
    alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
    return;}

    var data = response.getDataTable();
    var chart = new google.visualization.LineChart(document.getElementById('chartPuebla'));
    chart.draw(data, { height: 400 });
}