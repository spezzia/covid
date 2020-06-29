'use strict'

google.load('visualization', '1.0', {'packages':['corechart', 'table']});

var datos_estados = new Array();
var casos_totales = 0;

google.setOnLoadCallback(drawSheetNameGraficaPrincipalEstados);
function drawSheetNameGraficaPrincipalEstados(nuevaConsulta)
{
    while(nuevaConsulta == null)
    {
        nuevaConsulta = "select A, B, D, F, H, J, L, N, P, R, T, V, X, Z, AB, AD, AF, AH, AJ, AL, AN, AP, AR, AT, AV, AX, AZ, BB, BD, BF, BH, BJ, BL"
    }
    var queri = new google.visualization.Query(
    'https://docs.google.com/spreadsheets/d/1n65j8P31lIdU5YV7n-VbKhCTra8csTlGLUbnd8Q4Z_0/edit#gid=0');
    
    queri.setQuery(nuevaConsulta);

    queri.send(handleSampleDataQueryResponseGralGraficaPrincipalEstados);
}

function handleSampleDataQueryResponseGralGraficaPrincipalEstados(response) {
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

google.setOnLoadCallback(drawSheetNameGraficaEstadoIndividual);
var cuerito;
function drawSheetNameGraficaEstadoIndividual(cuerito) {
    var query = new google.visualization.Query(
    'https://docs.google.com/spreadsheets/d/1n65j8P31lIdU5YV7n-VbKhCTra8csTlGLUbnd8Q4Z_0/edit#gid=0');
    
    query.setQuery(cuerito);
    query.send(handleSampleDataQueryResponseGraficaEstadoIndividual);
}

function handleSampleDataQueryResponseGraficaEstadoIndividual(response) {
    if (response.isError()) {
    alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
    return;}

    var data = response.getDataTable();
    data.Kf[1].label = "Contagios";
    data.Kf[2].label = "Decesos";

    var options = {
        width: '100%',
      height: '400px'
    };
    var chart = new google.visualization.LineChart(document.getElementById('chart'));
    chart.draw(data, options);   
}

google.setOnLoadCallback(drawSheetNameTablaEstado);
var cueritoTabla;

function drawSheetNameTablaEstado(cueritoTabla) {
    var query = new google.visualization.Query(
    'https://docs.google.com/spreadsheets/d/1t8yE6uEjGOxPyVljYUkDrPv_d7sVdCaEMg0L-9UM4D0/edit#gid=0');
    query.setQuery(cueritoTabla);
    query.send(handleSampleDataQueryResponseTablaEstado);
  }

function handleSampleDataQueryResponseTablaEstado(response) {
    if (response.isError()) {
      alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
      return;
    }

    var data = response.getDataTable();

    var div_ord = document.getElementById('orden');
    console.log(div_ord.firstChild);
    div_ord.removeChild(div_ord.firstChild);
    var select = document.createElement('select');
    select.setAttribute('class','custom-select');
    select.setAttribute('id','ordenar');
    select.setAttribute('name','ordenar');
    var op = ['Ordenar','Ascendente','Descendente'];
    for(var i = 0 ; i < op.length; i++)
    {
        var opt = document.createElement('option');
        opt.setAttribute('vale',op[i]);
        var tx = document.createTextNode(op[i]);
        opt.appendChild(tx);
        select.appendChild(opt);
    }

    div_ord.appendChild(select);

    var div = document.getElementById('tablaMun');
    var tablaanterior = div.firstChild;
    div.removeChild(tablaanterior);
    var tabla = document.createElement('table');
    tabla.setAttribute('class','table');
    tabla.setAttribute('id','municipios');
    var Ttabla = document.createElement('thead');
    var trhead = document.createElement('tr');
    var titulos = new Array();
    for(var i = 0; i < 3 ; i++)
    {
        var title = document.createElement('th');
        title.setAttribute('scope',"col");
        var text = document.createTextNode(data.Kf[i].label);
        titulos.push(data.Kf[i].label);
        title.appendChild(text);
        trhead.appendChild(title);
    }
    datos_estados.push(titulos);
    Ttabla.appendChild(trhead);
    tabla.appendChild(Ttabla);

    var tbody = document.createElement('tbody');

    var i = 0;
    while(data.hg[i].c[1] != null)
    {
        var trhead = document.createElement('tr');
        var fila = new Array();
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
                fila.push(data.hg[i].c[e].v );  
            }
            if(i == 0 && e == 2)
            {
                casos_totales = data.hg[i].c[e].v;
            }
            td.appendChild(text);
            trhead.appendChild(td);
        }
        datos_estados.push(fila);
        tbody.appendChild(trhead);
        i++;
    }
    tabla.appendChild(tbody);

    div.appendChild(tabla);


    //var chart = new google.visualization.Table(document.getElementById('tablaMun'));
    //chart.draw(data, { height: 250 });
    const ordenar = document.querySelector("#ordenar");
    ordenar.addEventListener('change', (event)=>{
    var est = `${event.target.value}`;
    console.log(datos_estados);
    if(est == "Ascendente")
    {
        datos_estados.sort(function(a, b){return a[1]-b[1]});
        console.log(datos_estados);
        ordenar_tabla();

    }
    if(est == "Descendente")
    {   
        datos_estados.sort(function(a, b){return b[1]-a[1]});
        console.log(datos_estados);
        ordenar_tabla();
    }
    });
  }


  function ordenar_tabla()
  {
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
        var text = document.createTextNode(datos_estados[0][i]);
        title.appendChild(text);
        trhead.appendChild(title);
    }
    Ttabla.appendChild(trhead);
    tabla.appendChild(Ttabla);

    var tbody = document.createElement('tbody');

    var i = 1;
    while(datos_estados[i] != null)
    {
        var trhead = document.createElement('tr');
        for(var e = 0; e < 3 ; e++)
        {
            var td = document.createElement('td');
            if(datos_estados[i][e] == null)
            {
                var text = document.createTextNode('');
            }
            else
            {
                var text = document.createTextNode(datos_estados[i][e]);
            }
            if(i == 1 && e == 2)
            {
                var text =  document.createTextNode(casos_totales);
            }
            if(e == 2 && datos_estados[i][e] != null )
            {
                var text = document.createTextNode('');   
            }
            td.appendChild(text);
            trhead.appendChild(td);
        }
        tbody.appendChild(trhead);
        i++;
    }
    tabla.appendChild(tbody);

    div.appendChild(tabla);
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
        drawSheetNameGraficaEstadoIndividual(cuerito);
        drawSheetNameTablaEstado(cueritoTabla);
        break;
    case 'Baja California':
        cuerito = "select A, D, E";
        cueritoTabla = "select D,E,F";
        drawSheetNameGraficaEstadoIndividual(cuerito);
        drawSheetNameTablaEstado(cueritoTabla);
        break;
    case 'Baja California Sur':
        cuerito = "select A, F, G";
        cueritoTabla = "select G,H,I";
        drawSheetNameGraficaEstadoIndividual(cuerito);
        drawSheetNameTablaEstado(cueritoTabla);
        break;    
    case 'Campeche':
        cuerito = "select A, H, I";
        cueritoTabla = "select J,K,L";
        drawSheetNameGraficaEstadoIndividual(cuerito);
        drawSheetNameTablaEstado(cueritoTabla);
        break;
    case 'Coahuila':
        cuerito = "select A, J, K";
        cueritoTabla = "select M,N,O";
        drawSheetNameGraficaEstadoIndividual(cuerito);
        drawSheetNameTablaEstado(cueritoTabla);
        break;
    case 'Colima':  
        cuerito = "select A, L, M";
        cueritoTabla = "select P,Q,R";
        drawSheetNameGraficaEstadoIndividual(cuerito);
        drawSheetNameTablaEstado(cueritoTabla);
        break;
    case 'Chiapas':
        cuerito = "select A, N, O";
        cueritoTabla = "select S,T,U";
        drawSheetNameGraficaEstadoIndividual(cuerito);
        drawSheetNameTablaEstado(cueritoTabla);
        break;
    case 'Chihuahua':
        cuerito = "select A, P, Q";
        cueritoTabla = "select V,W,X";
        drawSheetNameGraficaEstadoIndividual(cuerito);
        drawSheetNameTablaEstado(cueritoTabla);
        break;
    case 'CDMX':
        cuerito = "select A, R, S";
        cueritoTabla = "select Y,Z,AA";
        drawSheetNameGraficaEstadoIndividual(cuerito);
        drawSheetNameTablaEstado(cueritoTabla);
        break;
    case 'Durango':
        cuerito = "select A, T, U";
        cueritoTabla = "select AB,AC,AD";
        drawSheetNameGraficaEstadoIndividual(cuerito);
        drawSheetNameTablaEstado(cueritoTabla);
        break;
    case 'Guanajuato':
        cuerito = "select A, V, W";
        cueritoTabla = "select AE,AF,AG";
        drawSheetNameGraficaEstadoIndividual(cuerito);
        drawSheetNameTablaEstado(cueritoTabla);
        break;
    case 'Guerrero':
        cuerito = "select A, X, Y";
        cueritoTabla = "select AH,AI,AJ";
        drawSheetNameGraficaEstadoIndividual(cuerito);
        drawSheetNameTablaEstado(cueritoTabla);
        break;
    case 'Hidalgo':
        cuerito = "select A, Z, AA";
        cueritoTabla = "select AK,AL,AM";
        drawSheetNameGraficaEstadoIndividual(cuerito);
        drawSheetNameTablaEstado(cueritoTabla);
        break;
    case 'Jalisco':
        cuerito = "select A, AB, AC";
        cueritoTabla = "select AN,AO,AP";
        drawSheetNameGraficaEstadoIndividual(cuerito);
        drawSheetNameTablaEstado(cueritoTabla);
        break;
    case 'Estado de México':
        cuerito = "select A, AD, AE";
        cueritoTabla = "select AQ,AR,AS";
        drawSheetNameGraficaEstadoIndividual(cuerito);
        drawSheetNameTablaEstado(cueritoTabla);
        break;
    case 'Michoacán':
        cuerito = "select A, AF, AG";
        cueritoTabla = "select AT,AU,AV";
        drawSheetNameGraficaEstadoIndividual(cuerito);
        drawSheetNameTablaEstado(cueritoTabla);
        break;
    case 'Morelos':
        cuerito = "select A, AH, AI";
        cueritoTabla = "select AW,AX,AY";
        drawSheetNameGraficaEstadoIndividual(cuerito);
        drawSheetNameTablaEstado(cueritoTabla);
        break;
    case 'Nayarit':
        cuerito = "select A, AJ, AK";
        cueritoTabla = "select AZ,BA,BB";
        drawSheetNameGraficaEstadoIndividual(cuerito);
        drawSheetNameTablaEstado(cueritoTabla);
        break;
    case 'Nuevo León':
        cuerito = "select A, AL, AM";
        cueritoTabla = "select BC,BD,BE";
        drawSheetNameGraficaEstadoIndividual(cuerito);
        drawSheetNameTablaEstado(cueritoTabla);
        break;                                 
    case 'Oaxaca':
        cuerito = "select A, AN, AO";
        cueritoTabla = "select BF,BG,BH";
        drawSheetName(cuerito);
        drawSheetNameTablaEstado(cueritoTabla);
        break;
    case 'Puebla':
        cuerito = "select A, AP, AQ";
        cueritoTabla = "select BI,BJ,BK";
        drawSheetNameGraficaEstadoIndividual(cuerito);
        drawSheetNameTablaEstado(cueritoTabla);
        break;
    case 'Querétaro':
        cuerito = "select A, AR, AS";
        cueritoTabla = "select BL,BM,BN";
        drawSheetNameGraficaEstadoIndividual(cuerito);
        drawSheetNameTablaEstado(cueritoTabla);
        break;
    case 'Quintana Roo':
        cuerito = "select A, AT, AU";
        cueritoTabla = "select BO,BP,BQ";
        drawSheetNameGraficaEstadoIndividual(cuerito);
        drawSheetNameTablaEstado(cueritoTabla);
        break;
    case 'San Luis Potosí':
        cuerito = "select A, AV, AW";
        cueritoTabla = "select BR,BS,BT";
        drawSheetNameGraficaEstadoIndividual(cuerito);
        drawSheetNameTablaEstado(cueritoTabla);
        break;
    case 'Sinaloa':
        cuerito = "select A, AX, AY";
        cueritoTabla = "select BU,BV,BW";
        drawSheetNameGraficaEstadoIndividual(cuerito);
        drawSheetNameTablaEstado(cueritoTabla);
        break;
    case 'Sonora':
        cuerito = "select A, AZ, BA";
        cueritoTabla = "select BX,BY,BZ";
        drawSheetNameGraficaEstadoIndividual(cuerito);
        drawSheetNameTablaEstado(cueritoTabla);
        break;
    case 'Tabasco':
        cuerito = "select A, BB, BC";
        cueritoTabla = "select CA,CB,CC";
        drawSheetNameGraficaEstadoIndividual(cuerito);
        drawSheetNameTablaEstado(cueritoTabla);
        break;
    case 'Tamaulipas':
        cuerito = "select A, BD, BE";
        cueritoTabla = "select CD,CE,CF";
        drawSheetNameGraficaEstadoIndividual(cuerito);
        drawSheetNameTablaEstado(cueritoTabla);
        break;
    case 'Tlaxcala':
        cuerito = "select A, BF, BG";
        cueritoTabla = "select CG,CH,CI";
        drawSheetNameGraficaEstadoIndividual(cuerito);
        drawSheetNameTablaEstado(cueritoTabla);
        break;
    case 'Veracruz':
        cuerito = "select A, BH, BI";
        cueritoTabla = "select CJ,CK,CL";
        drawSheetNameGraficaEstadoIndividual(cuerito);
        drawSheetNameTablaEstado(cueritoTabla);
        break;
    case 'Yucatán':
        cuerito = "select A, BJ, BK";
        cueritoTabla = "select CM,CN,CO";
        drawSheetNameGraficaEstadoIndividual(cuerito);
        drawSheetNameTablaEstado(cueritoTabla);
        break;
    case 'Zacatecas':
        cuerito = "select A, BL, BM";
        cueritoTabla = "select CP,CQ,CR";
        drawSheetNameGraficaEstadoIndividual(cuerito);
        drawSheetNameTablaEstado(cueritoTabla);
        break;
    }
}

/**Función que genera el array de los estados seleccionados */
$("#checkEstado").on('change', function() {
    var val = $(this).val();
    // te muestra un array de todos los seleccionados
    console.log(val);

  if(val.length == 0)/**Si el array está vacío se le propocionara el array para graficar todos los estados */
    {
        val = ["B, D, F, H, J, L, N, P, R, T, V, X, Z, AB, AD, AF, AH, AJ, AL, AN, AP, AR, AT, AV, AX, AZ, BB, BD, BF, BH, BJ, BL"];
        obtenerEstados(val);
    }

    else{
        obtenerEstados(val);
    }
    
  });

  
/**"Función que genera el query para cargar el grafico dependiendo de que eatados hayan sido seleccionados" */
function obtenerEstados(val)
{
    let nuevaConsulta = "select A,";
    nuevaConsulta += val.join();
    console.log(nuevaConsulta);
    drawSheetNameGraficaPrincipalEstados(nuevaConsulta);
}
