'use strict'
google.load('visualization', '1.0', {'packages':['corechart', 'table']});
google.setOnLoadCallback(drawSheetName);

//google.load('visualization', '1.0', {'packages' : ['table']});
  //google.setOnLoadCallback(init);

  var datos_estados = new Array();
  var casos_totales = 0;

/*Grafica*/
function drawSheetName() {
    
    var query = new google.visualization.Query(
    'https://docs.google.com/spreadsheets/d/1n65j8P31lIdU5YV7n-VbKhCTra8csTlGLUbnd8Q4Z_0/gviz/tq?');
    
    query.setQuery("select A, AP, AQ");
    query.send(handleSampleDataQueryResponse);
}

function handleSampleDataQueryResponse(response) {
    if (response.isError()) {
    alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
    return;}
    var options = {
      width: '100%',
      height: '100%',
    };
    var data = response.getDataTable();
    data.If[1].label = "Contagios";
    data.If[2].label = "Decesos";
    console.log(data.If[1].label);
    var chart = new google.visualization.LineChart(document.getElementById('chartPuebla'));
    chart.draw(data, options);
}

google.setOnLoadCallback(drawSheetNameTabPue);
function drawSheetNameTabPue() {
    //var queryStringPaises = encodeURIComponent('SELECT *');
    var query = new google.visualization.Query(
    'https://docs.google.com/spreadsheets/d/1i3NyIHxA4cse7YItA5dzrfmnMtcxSNdA639VEnYYkX0/edit#gid=0');
    query.setQuery('select *');
    query.send(handleSampleDataQueryResponseT);
  }

function handleSampleDataQueryResponseT(response) {
    if (response.isError()) {
        alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
        return;
    }

    var data = response.getDataTable();
    console.log(data);
    console.log(data.fg[0].c[1]);
    console.log(data.fg[0].c[1].v);

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


    
    var div = document.getElementById('tableMun');
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
       var text = document.createTextNode(data.If[i].label);
       titulos.push(data.If[i].label);
        title.appendChild(text);
        trhead.appendChild(title);
    }
    datos_estados.push(titulos);
    Ttabla.appendChild(trhead);
    tabla.appendChild(Ttabla);

    var tbody = document.createElement('tbody');

    var i = 0;
    while(data.fg[i] != null)
    {
        var trhead = document.createElement('tr');
        var fila = new Array();
        for(var e = 0; e < 3 ; e++)
        {
            var td = document.createElement('td');
            if(data.fg[i].c[e].v == null)
            {
                var text = document.createTextNode('');
            }
            else
            {
                var text = document.createTextNode(data.fg[i].c[e].v );
                fila.push(data.fg[i].c[e].v );  
            }
            if(i == 0 && e == 2)
            {
                casos_totales = data.fg[i].c[e].v;
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
    /*var chart = new google.visualization.Table(document.getElementById('tabMundial'));
    chart.draw(data, { height: 250 });*/
    function ordenar_tabla()
    {
      var div = document.getElementById('tableMun');
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
}

