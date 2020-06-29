'use strict'

google.charts.load('current', {'packages':['geochart', 'table']});
//google.load('visualization', '1.0', {'packages':['table']});

google.setOnLoadCallback(drawRegionsMap);

var datos_estados = new Array();
var casos_totales = 0;

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


google.setOnLoadCallback(drawSheetNameMundial);
function drawSheetNameMundial() {
    //var queryStringPaises = encodeURIComponent('SELECT *');
    var query = new google.visualization.Query(
    'https://docs.google.com/spreadsheets/d/1rOGqa5SmbhXWQzhr121ENOOxujE5_rR1_0WMJDTI_68/edit?usp=sharing');
    query.setQuery('SELECT *');
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

    var div_ord = document.getElementById('orden');
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

    
    var div = document.getElementById('tabMundial');
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
    while(data.hg[i] != null)
    {
        var trhead = document.createElement('tr');
        var fila = new Array();
        for(var e = 0; e < 3 ; e++)
        {
            var td = document.createElement('td');
            if(data.hg[i].c[e] == null)
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

    function ordenar_tabla()
    {
      var div = document.getElementById('tabMundial');
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
              td.appendChild(text);
              trhead.appendChild(td);
          }
          tbody.appendChild(trhead);
          i++;
      }
      tabla.appendChild(tbody);
  
      div.appendChild(tabla);
    }
    /*var chart = new google.visualization.Table(document.getElementById('tabMundial'));
    chart.draw(data, { height: 250 });*/
}