'use strict'

google.load('visualization', '1.0', {'packages':['corechart']});
google.setOnLoadCallback(drawSheetName);

var cuerito;
function drawSheetName(cuerito) {
    
    var query = new google.visualization.Query(
    'https://docs.google.com/spreadsheets/d/1n65j8P31lIdU5YV7n-VbKhCTra8csTlGLUbnd8Q4Z_0/gviz/tq?');
    
    query.setQuery(cuerito);
    query.send(handleSampleDataQueryResponse);
}

function handleSampleDataQueryResponse(response) {
    if (response.isError()) {
    alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
    return;}

    var data = response.getDataTable();
    var chart = new google.visualization.LineChart(document.getElementById('chart'));
    chart.draw(data, { height: 400 });
}


const estados = document.querySelector("#estado");

estados.addEventListener('change', (event)=>{
    let estado  = document.querySelector("#resultado");
    var est = `${event.target.value}`;
    resultado.textContent = "Elegiste el estado "+ est;
    buscarEstado(est);
    });

function buscarEstado(est){
    let state = est;
    switch(state){
    case 'Aguascalientes':
        cuerito = "select A, B, C";
        drawSheetName(cuerito);
        break;
    case 'Baja California':
        cuerito = "select A, D, E";
        drawSheetName(cuerito);
        break;
    case 'Baja California Sur':
        cuerito = "select A, F, G";
        drawSheetName(cuerito);
        break;
    
    case 'Campeche':
        cuerito = "select A, H, I";
        drawSheetName(cuerito);
        break;
    case 'Coahuila':
        cuerito = "select A, J, K";
        drawSheetName(cuerito);
        break;
    case 'Colima':
        cuerito = "select A, L, M";
        drawSheetName(cuerito);
        break;
    case 'Chiapas':
        cuerito = "select A, N, O";
        drawSheetName(cuerito);
        break;
    case 'Chihuahua':
        cuerito = "select A, P, Q";
        drawSheetName(cuerito);
        break;
    case 'CDMX':
        cuerito = "select A, R, S";
        drawSheetName(cuerito);
        break;
    

    case 'Durango':
        cuerito = "select A, T, U";
        drawSheetName(cuerito);
        break;
    
    case 'Guanajuato':
        cuerito = "select A, V, W";
        drawSheetName(cuerito);
        break;
    case 'Guerrero':
        cuerito = "select A, X, Y";
        drawSheetName(cuerito);
        break;
    case 'Hidalgo':
        cuerito = "select A, Z, AA";
        drawSheetName(cuerito);
        break;
    case 'Jalisco':
        cuerito = "select A, AB, AC";
        drawSheetName(cuerito);
        break;
    case 'Estado de México':
        cuerito = "select A, AD, AE";
        drawSheetName(cuerito);
        break;
    case 'Michoacán':
        cuerito = "select A, AF, AG";
        drawSheetName(cuerito);
        break;
    case 'Morelos':
        cuerito = "select A, AH, AI";
        drawSheetName(cuerito);
        break;
    case 'Nayarit':
        cuerito = "select A, AJ, AK";
        drawSheetName(cuerito);
        break;
    case 'Nuevo León':
        cuerito = "select A, AL, AM";
        drawSheetName(cuerito);
        break;                                 
    case 'Oaxaca':
        cuerito = "select A, AN, AO";
        drawSheetName(cuerito);
        break;
    case 'Puebla':
        cuerito = "select A, AP, AQ";
        drawSheetName(cuerito);
        break;
    case 'Querétaro':
        cuerito = "select A, AR, AS";
        drawSheetName(cuerito);
        break;
    case 'Quintana Roo':
        cuerito = "select A, AT, AU";
        drawSheetName(cuerito);
        break;
    case 'San Luis Potosí':
        cuerito = "select A, AV, AW";
        drawSheetName(cuerito);
        break;
    case 'Sinaloa':
        cuerito = "select A, AX, AY";
        drawSheetName(cuerito);
        break;
    case 'Sonora':
        cuerito = "select A, AZ, BA";
        drawSheetName(cuerito);
        break;
    case 'Tabasco':
        cuerito = "select A, BB, BC";
        drawSheetName(cuerito);
        break;
    case 'Tamaulipas':
        cuerito = "select A, BD, BE";
        drawSheetName(cuerito);
        break;
    case 'Tlaxcala':
        cuerito = "select A, BF, BG";
        drawSheetName(cuerito);
        break;
    case 'Veracruz':
        cuerito = "select A, BH, BI";
        drawSheetName(cuerito);
        break;
    case 'Yucatán':
        cuerito = "select A, BJ, BK";
        drawSheetName(cuerito);
        break;
    case 'Zacatecas':
        cuerito = "select A, BL, BM";
        drawSheetName(cuerito);
        break;
    
    }
}

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
      height: '900px'
    };
    let chartMain = new google.visualization.LineChart(document.getElementById('chartMain'));
    chartMain.draw(data, opt);   
}