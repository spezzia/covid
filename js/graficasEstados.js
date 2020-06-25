'use strict'

google.load('visualization', '1.0', {'packages':['corechart', 'table']});
//google.load('visualization', '1.0', {'packages':['table']});


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
      height: '400px'
    };
    let chartMain = new google.visualization.LineChart(document.getElementById('chartMain'));
    chartMain.draw(data, opt);   
}

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
    data.Kf[1].label = "Contagios";
    data.Kf[2].label = "Decesos";
    //console.log(data.Kf[1].label);

    var options = {
        width: '100%',
      height: '400px'
    };
    var chart = new google.visualization.LineChart(document.getElementById('chart'));
    chart.draw(data, options);   
}

google.setOnLoadCallback(drawSheetNameT);
var cueritoTabla;
function drawSheetNameT(cueritoTabla) {
    var query = new google.visualization.Query(
    'https://docs.google.com/spreadsheets/d/1t8yE6uEjGOxPyVljYUkDrPv_d7sVdCaEMg0L-9UM4D0/edit#gid=0');
    query.setQuery(cueritoTabla);
    query.send(handleSampleDataQueryResponseT);
  }

  function handleSampleDataQueryResponseT(response) {
    if (response.isError()) {
      alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
      return;
    }

    var data = response.getDataTable();
    console.log(data);
    console.log(data.hg[0].c[1]);
    console.log(data.hg[0].c[1].v);
    var div = document.getElementById('tablaMun');
    var tablaanterior = div.firstChild;
    div.removeChild(tablaanterior);
    var tabla = document.createElement('table');
    tabla.setAttribute('class','table');
    tabla.setAttribute('id','municipios');
    var Ttabla = document.createElement('thead');
    var trhead = document.createElement('tr');
    for(var i = 0; i < 3 ; i++)
    {
        var title = document.createElement('th');
        title.setAttribute('scope',"col");
        var text = document.createTextNode(data.Kf[i].label);
        title.appendChild(text);
        trhead.appendChild(title);
    }
    Ttabla.appendChild(trhead);
    tabla.appendChild(Ttabla);

    var tbody = document.createElement('tbody');

    var i = 0;
    while(data.hg[i].c[1] != null)
    {
        var trhead = document.createElement('tr');
        for(var e = 0; e < 3 ; e++)
        {
            var td = document.createElement('td');
            if(data.hg[i].c[e].v == null)
            {
                var text = document.createTextNode('');
            }
            else
            {
                var text = document.createTextNode(data.hg[i].c[e].v );
            }
            td.appendChild(text);
            trhead.appendChild(td);
        }
        tbody.appendChild(trhead);
        i++;
    }
    tabla.appendChild(tbody);

    div.appendChild(tabla);


    //var chart = new google.visualization.Table(document.getElementById('tablaMun'));
    //chart.draw(data, { height: 250 });
  }
  

const estados = document.querySelector("#estado");

estados.addEventListener('change', (event)=>{
    var est = `${event.target.value}`;
    buscarEstado(est);
});

function buscarEstado(est){
    let state = est;
    switch(state){
    case 'Aguascalientes':
        cuerito = "select A, B, C";
        cueritoTabla = "select A,B,C";
        drawSheetName(cuerito);
        drawSheetNameT(cueritoTabla);
        break;
    case 'Baja California':
        cuerito = "select A, D, E";
        cueritoTabla = "select D,E,F";
        drawSheetName(cuerito);
        drawSheetNameT(cueritoTabla);
        break;
    case 'Baja California Sur':
        cuerito = "select A, F, G";
        cueritoTabla = "select G,H,I";
        drawSheetName(cuerito);
        drawSheetNameT(cueritoTabla);
        break;    
    case 'Campeche':
        cuerito = "select A, H, I";
        cueritoTabla = "select J,K,L";
        drawSheetName(cuerito);
        drawSheetNameT(cueritoTabla);
        break;
    case 'Coahuila':
        cuerito = "select A, J, K";
        cueritoTabla = "select M,N,O";
        drawSheetName(cuerito);
        drawSheetNameT(cueritoTabla);
        break;
    case 'Colima':
        cuerito = "select A, L, M";
        cueritoTabla = "select P,Q,R";
        drawSheetName(cuerito);
        drawSheetNameT(cueritoTabla);
        break;
    case 'Chiapas':
        cuerito = "select A, N, O";
        cueritoTabla = "select S,T,U";
        drawSheetName(cuerito);
        drawSheetNameT(cueritoTabla);
        break;
    case 'Chihuahua':
        cuerito = "select A, P, Q";
        cueritoTabla = "select V,W,X";
        drawSheetName(cuerito);
        drawSheetNameT(cueritoTabla);
        break;
    case 'CDMX':
        cuerito = "select A, R, S";
        cueritoTabla = "select Y,Z,AA";
        drawSheetName(cuerito);
        drawSheetNameT(cueritoTabla);
        break;
    case 'Durango':
        cuerito = "select A, T, U";
        cueritoTabla = "select AB,AC,AD";
        drawSheetName(cuerito);
        drawSheetNameT(cueritoTabla);
        break;
    case 'Guanajuato':
        cuerito = "select A, V, W";
        cueritoTabla = "select AE,AF,AG";
        drawSheetName(cuerito);
        drawSheetNameT(cueritoTabla);
        break;
    case 'Guerrero':
        cuerito = "select A, X, Y";
        cueritoTabla = "select AH,AI,AJ";
        drawSheetName(cuerito);
        drawSheetNameT(cueritoTabla);
        break;
    case 'Hidalgo':
        cuerito = "select A, Z, AA";
        cueritoTabla = "select AK,AL,AM";
        drawSheetName(cuerito);
        drawSheetNameT(cueritoTabla);
        break;
    case 'Jalisco':
        cuerito = "select A, AB, AC";
        cueritoTabla = "select AN,AO,AP";
        drawSheetName(cuerito);
        drawSheetNameT(cueritoTabla);
        break;
    case 'Estado de México':
        cuerito = "select A, AD, AE";
        cueritoTabla = "select AQ,AR,AS";
        drawSheetName(cuerito);
        drawSheetNameT(cueritoTabla);
        break;
    case 'Michoacán':
        cuerito = "select A, AF, AG";
        cueritoTabla = "select AT,AU,AV";
        drawSheetName(cuerito);
        drawSheetNameT(cueritoTabla);
        break;
    case 'Morelos':
        cuerito = "select A, AH, AI";
        cueritoTabla = "select AW,AX,AY";
        drawSheetName(cuerito);
        drawSheetNameT(cueritoTabla);
        break;
    case 'Nayarit':
        cuerito = "select A, AJ, AK";
        cueritoTabla = "select AZ,BA,BB";
        drawSheetName(cuerito);
        drawSheetNameT(cueritoTabla);
        break;
    case 'Nuevo León':
        cuerito = "select A, AL, AM";
        cueritoTabla = "select BC,BD,BE";
        drawSheetName(cuerito);
        drawSheetNameT(cueritoTabla);
        break;                                 
    case 'Oaxaca':
        cuerito = "select A, AN, AO";
        cueritoTabla = "select BF,BG,BH";
        drawSheetName(cuerito);
        drawSheetNameT(cueritoTabla);
        break;
    case 'Puebla':
        cuerito = "select A, AP, AQ";
        cueritoTabla = "select BI,BJ,BK";
        drawSheetName(cuerito);
        drawSheetNameT(cueritoTabla);
        break;
    case 'Querétaro':
        cuerito = "select A, AR, AS";
        cueritoTabla = "select BL,BM,BN";
        drawSheetName(cuerito);
        drawSheetNameT(cueritoTabla);
        break;
    case 'Quintana Roo':
        cuerito = "select A, AT, AU";
        cueritoTabla = "select BO,BP,BQ";
        drawSheetName(cuerito);
        drawSheetNameT(cueritoTabla);
        break;
    case 'San Luis Potosí':
        cuerito = "select A, AV, AW";
        cueritoTabla = "select BR,BS,BT";
        drawSheetName(cuerito);
        drawSheetNameT(cueritoTabla);
        break;
    case 'Sinaloa':
        cuerito = "select A, AX, AY";
        cueritoTabla = "select BU,BV,BW";
        drawSheetName(cuerito);
        drawSheetNameT(cueritoTabla);
        break;
    case 'Sonora':
        cuerito = "select A, AZ, BA";
        cueritoTabla = "select BX,BY,BZ";
        drawSheetName(cuerito);
        drawSheetNameT(cueritoTabla);
        break;
    case 'Tabasco':
        cuerito = "select A, BB, BC";
        cueritoTabla = "select CA,CB,CC";
        drawSheetName(cuerito);
        drawSheetNameT(cueritoTabla);
        break;
    case 'Tamaulipas':
        cuerito = "select A, BD, BE";
        cueritoTabla = "select CD,CE,CF";
        drawSheetName(cuerito);
        drawSheetNameT(cueritoTabla);
        break;
    case 'Tlaxcala':
        cuerito = "select A, BF, BG";
        cueritoTabla = "select CG,CH,CI";
        drawSheetName(cuerito);
        drawSheetNameT(cueritoTabla);
        break;
    case 'Veracruz':
        cuerito = "select A, BH, BI";
        cueritoTabla = "select CJ,CK,CL";
        drawSheetName(cuerito);
        drawSheetNameT(cueritoTabla);
        break;
    case 'Yucatán':
        cuerito = "select A, BJ, BK";
        cueritoTabla = "select CM,CN,CO";
        drawSheetName(cuerito);
        drawSheetNameT(cueritoTabla);
        break;
    case 'Zacatecas':
        cuerito = "select A, BL, BM";
        cueritoTabla = "select CP,CQ,CR";
        drawSheetName(cuerito);
        drawSheetNameT(cueritoTabla);
        break;
    }
}


