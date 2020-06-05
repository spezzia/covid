'use strict'
function drawTable() {
    var data = new google.visualization.DataTable('https://docs.google.com/spreadsheets/d/1i3NyIHxA4cse7YItA5dzrfmnMtcxSNdA639VEnYYkX0/edit#gid=0');
    var table = new google.visualization.Table(document.getElementById('table_div'));
    table.draw(data, {showRowNumber: true, width: '100%', height: '100%'});
  
    google.visualization.events.addListener(table, 'select', function() {
      var row = table.getSelection()[0].row;
      alert('You selected ' + data.getValue(row, 0));
    });
  }