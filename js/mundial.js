'use strict'

google.charts.load('current', {'packages':['geochart', 'table']});
//google.load('visualization', '1.0', {'packages':['table']});

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
            if(data.hg[i].c[e] == null)
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