'use strict'
google.load('visualization', '1.0', {'packages':['corechart', 'table']});
google.setOnLoadCallback(drawSheetName);

//google.load('visualization', '1.0', {'packages' : ['table']});
  //google.setOnLoadCallback(init);


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
    data.Kf[1].label = "Contagios";
    data.Kf[2].label = "Decesos";
    console.log(data.Kf[1].label);
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
    console.log(data.hg[0].c[1]);
    console.log(data.hg[0].c[1].v);
    
    var div = document.getElementById('tableMun');
   /* var tablaanterior = div.firstChild;
    div.removeChild(tablaanterior);*/
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
    while(data.hg[i] != null)
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
    /*var chart = new google.visualization.Table(document.getElementById('tabMundial'));
    chart.draw(data, { height: 250 });*/
}