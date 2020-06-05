'use strict'

google.load('visualization', '1.0', {'packages':['corechart']});
google.setOnLoadCallback(drawSheetName1);

function drawSheetName1()
{
    let queri = new google.visualization.Query(
    'https://docs.google.com/spreadsheets/d/1i3NyIHxA4cse7YItA5dzrfmnMtcxSNdA639VEnYYkX0/edit#gid=0');
    
    queri.setQuery("select A, B, C, D,");

    queri.send(handleSampleDataQueryResponseGral1);
}

function handleSampleDataQueryResponseGral1(response) {
    if (response.isError()) {
    alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
    return;}

    let  data = response.getDataTable();

    let opt = {
        width: '100%',
      height: '900px'
    };
    let chartMain = new google.visualization.LineChart(document.getElementById('chartpueblacontagios'));
    chartMain.draw(data, opt);   
}

