'use strict'
google.load('visualization', '1.0', {'packages':['corechart']});

google.setOnLoadCallback(drawSheetNameContagios);
function drawSheetNameContagios(nuevaConsulta)
{
    while(nuevaConsulta == null)
    {
        nuevaConsulta = "select A, B, D, F, H, J, L, N, P, R, T, V, X, Z, AB, AD, AF, AH, AJ, AL, AN, AP, AR, AT, AV, AX, AZ, BB, BD, BF, BH, BJ, BL"
    }
    let queri = new google.visualization.Query(
    'https://docs.google.com/spreadsheets/d/1n65j8P31lIdU5YV7n-VbKhCTra8csTlGLUbnd8Q4Z_0/edit#gid=0');
    
    queri.setQuery(nuevaConsulta);

    queri.send(handleSampleDataQueryResponseGralContagios);
}

function handleSampleDataQueryResponseGralContagios(response) {
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

/**Función que genera el array de los estados seleccionados */
$("#checkEstado").on('change', function() {
    var val = $(this).val();
    // te muestra un array de todos los seleccionados
    console.log(val);

    if(val.length == 0)/**Si el array está vacío se le propocionara el array para graficar todos los estados */
    {
        val = ["B, D, G, H, J, L, N, P, R, T, V, X, Z, AB, AD, AF, AH, AJ, AL, AN, AP, AR, AT, AV, AX, AZ, BB, BD, BF, BH, BJ, BL"];
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
    drawSheetNameContagios(nuevaConsulta);   
    
}

google.setOnLoadCallback(drawSheetNameMuertes);
function drawSheetNameMuertes(consultaMuertes)
{
    while(consultaMuertes == null)
    {
        consultaMuertes = "select A, C, E, G, I, K, M, O, Q, S, U, W, Y, AA, AC, AE, AG, AI, AK, AM, AO, AQ, AS, AU, AW, AY, BA, BC, BE, BG, BI, BK, BM";
    }
    let queri = new google.visualization.Query(
    'https://docs.google.com/spreadsheets/d/1n65j8P31lIdU5YV7n-VbKhCTra8csTlGLUbnd8Q4Z_0/edit#gid=0');
    queri.setQuery(consultaMuertes);
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
/*
/**Función que genera el array de los estados seleccionados */
$("#checkDecesos").on('change', function() {
    let val = $(this).val();
    // te muestra un array de todos los seleccionados
    console.log(val);

    if(val.length == 0)/**Si el array está vacío se le propocionara el array para graficar todos los estados */
    {
        //val = ["C, E, G, I, K, M, O, Q, S, U, W, Y, AA, AC, AE, AG, AI, AK, AM, AO, AQ, AS, AU, AW, AY, BA, BC, BE, BG, BI, BK, BM"];
        obtenerEstadosMuertes(val);
    }
    else{
        obtenerEstadosMuertes(val);
    }
});

/**"Función que genera el query para cargar el grafico dependiendo de que eatados hayan sido seleccionados" */
function obtenerEstadosMuertes(val)
{
    let consultaMuertes = "select A,";
    consultaMuertes += val.join();
    console.log(consultaMuertes);
    drawSheetNameMuertes(consultaMuertes);   
    
}