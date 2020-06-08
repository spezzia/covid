'use strict'

google.load('visualization', '1.0', {'packages':['corechart']});
google.setOnLoadCallback(drawSheetName);

google.load('visualization', '1.0', {'packages' : ['table']});
  google.setOnLoadCallback(init);
  

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

    var data = response.getDataTable();
    var chart = new google.visualization.LineChart(document.getElementById('chartPuebla'));
    chart.draw(data, { height: 400 });
}

/*Tabla Municipios*/

var TableQueryWrapper = function(query, container, options) {

  this.table = new google.visualization.Table(container);
  this.query = query;
  this.sortQueryClause = '';
  this.pageQueryClause = '';
  this.container = container;
  this.currentDataTable = null;

  var self = this;
  var addListener = google.visualization.events.addListener;
  addListener(this.table, 'page', function(e) {self.handlePage(e)});
  addListener(this.table, 'sort', function(e) {self.handleSort(e)});

  options = options || {};
  options = TableQueryWrapper.clone(options);

  options['sort'] = 'event';
  options['page'] = 'event';
  options['showRowNumber'] = true;
  var buttonConfig = 'pagingButtonsConfiguration';
  options[buttonConfig] = options[buttonConfig] || 'both';
  options['pageSize'] = (options['pageSize'] > 0) ? options['pageSize'] : 50;
  this.pageSize = options['pageSize'];
  this.tableOptions = options;
  this.currentPageIndex = 0;
  this.setPageQueryClause(0);
};


/**
 * Sends the query and upon its return draws the Table visualization in the
 * container. If the query refresh interval is set then the visualization will
 * be redrawn upon each refresh.
 */
TableQueryWrapper.prototype.sendAndDraw = function() {
  this.query.abort();
  var queryClause = this.sortQueryClause + ' ' + this.pageQueryClause;
  this.query.setQuery(queryClause);
  this.table.setSelection([]);
  var self = this;
  this.query.send(function(response) {self.handleResponse(response)});
};


/** Handles the query response after a send returned by the data source. */
TableQueryWrapper.prototype.handleResponse = function(response) {
  this.currentDataTable = null;
  if (response.isError()) {
    google.visualization.errors.addError(this.container, response.getMessage(),
        response.getDetailedMessage(), {'showInTooltip': false});
  } else {
    this.currentDataTable = response.getDataTable();
    this.table.draw(this.currentDataTable, this.tableOptions);
  }
};


/** Handles a sort event with the given properties. Will page to page=0. */
TableQueryWrapper.prototype.handleSort = function(properties) {
  var columnIndex = properties['column'];
  var isAscending = properties['ascending'];
  this.tableOptions['sortColumn'] = columnIndex;
  this.tableOptions['sortAscending'] = isAscending;
  // dataTable exists since the user clicked the table.
  var colID = this.currentDataTable.getColumnId(columnIndex);
  this.sortQueryClause = 'order by `' + colID + (!isAscending ? '` desc' : '`');
  // Calls sendAndDraw internally.
  this.handlePage({'page': 0});
};


/** Handles a page event with the given properties. */
TableQueryWrapper.prototype.handlePage = function(properties) {
  var localTableNewPage = properties['page']; // 1, -1 or 0
  var newPage = 0;
  if (localTableNewPage != 0) {
    newPage = this.currentPageIndex + localTableNewPage;
  }
  if (this.setPageQueryClause(newPage)) {
    this.sendAndDraw();
  }
};


/**
 * Sets the pageQueryClause and table options for a new page request.
 * In case the next page is requested - checks that another page exists
 * based on the previous request.
 * Returns true if a new page query clause was set, false otherwise.
 */
TableQueryWrapper.prototype.setPageQueryClause = function(pageIndex) {
  var pageSize = this.pageSize;

  if (pageIndex < 0) {
    return false;
  }
  var dataTable = this.currentDataTable;
  if ((pageIndex == this.currentPageIndex + 1) && dataTable) {
    if (dataTable.getNumberOfRows() <= pageSize) {
      return false;
    }
  }
  this.currentPageIndex = pageIndex;
  var newStartRow = this.currentPageIndex * pageSize;
  // Get the pageSize + 1 so that we can know when the last page is reached.
  this.pageQueryClause = 'limit ' + (pageSize + 1) + ' offset ' + newStartRow;
  // Note: row numbers are 1-based yet dataTable rows are 0-based.
  this.tableOptions['firstRowNumber'] = newStartRow + 1;
  return true;
};


/** Performs a shallow clone of the given object. */
TableQueryWrapper.clone = function(obj) {
  var newObj = {};
  for (var key in obj) {
    newObj[key] = obj[key];
  }
  return newObj;
};

google.charts.load('current', {'packages' : ['table']});
google.charts.setOnLoadCallback(init);

var dataSourceUrl = 'https://docs.google.com/spreadsheets/d/1i3NyIHxA4cse7YItA5dzrfmnMtcxSNdA639VEnYYkX0/edit#gid=0';
var query, options, container;

function init() {
  query = new google.visualization.Query(dataSourceUrl);
  container = document.getElementById("table");
  options = {'pageSize': 570};
  sendAndDraw();
}

function sendAndDraw() {
  query.abort();
  var tableQueryWrapper = new TableQueryWrapper(query, container, options);
  tableQueryWrapper.sendAndDraw();
}

function setOption(prop, value) {
  options[prop] = value;
  sendAndDraw();
}
