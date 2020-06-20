'use strict'

google.load('visualization', '1.0', {'packages':['corechart']});
google.setOnLoadCallback(drawSheetName1);

function drawSheetName1()
{
    let queri = new google.visualization.Query(
    'https://docs.google.com/spreadsheets/d/1n65j8P31lIdU5YV7n-VbKhCTra8csTlGLUbnd8Q4Z_0/gviz/tq?');
    
    queri.setQuery("select A, B, D, G, H, J, L, N, P, R, T, V, X, Z, AB, AD, AF, AH, AJ, AL, AN, AP, AR, AT, AV, AX, AZ, BB, BD, BF, BH, BJ, BL");

    queri.send(handleSampleDataQueryResponseGral1);
}

function handleSampleDataQueryResponseGral1(response) {
    if (response.isError()) {
    alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
    return;}

    let  data = response.getDataTable();

    let opt = {
        width: '100%',
      height: '100%'
    };
    let chartMain = new google.visualization.LineChart(document.getElementById('chartContagios'));
    chartMain.draw(data, opt);   
}

google.setOnLoadCallback(drawSheetNameMuertes);
function drawSheetNameMuertes()
{
    let queri = new google.visualization.Query(
    'https://docs.google.com/spreadsheets/d/1n65j8P31lIdU5YV7n-VbKhCTra8csTlGLUbnd8Q4Z_0/gviz/tq?');
    
    queri.setQuery("select A, C, E, F, I, K, M, O, Q, S, U, W, Y, AA, AC, AE, AG, AI, AK, AM, AO, AQ, AS, AU, AW, AY, BA, BC, BE, BG, BI, BK, BM");

    queri.send(handleSampleDataQueryResponseGralMuertes);
}

function handleSampleDataQueryResponseGralMuertes(response) {
    if (response.isError()) {
    alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
    return;}

    let  data = response.getDataTable();

    let opt = {
        width: '100%',
      height: '100%'
    };
    let chartMain = new google.visualization.LineChart(document.getElementById('chartMuertes'));
    chartMain.draw(data, opt);   
}
