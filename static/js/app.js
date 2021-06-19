// from data.js
var tableData = data;
//console.log(tableData);

var ufotable = d3.select("#ufo-table");

  tableData.forEach(function(ufosights) {
    console.log(ufosights);
    var row = ufotable.append("tr");
  
    Object.entries(ufosights).forEach(function([key, value]) {
      console.log(key, value);
      var cell = row.append("td");
      cell.text(value);
    });
  });


// Select the form
var datetime_form = d3.select("#datetime");
datetime_form.on("submit",runEnter);

var filter_button = d3.select("#filter-btn");
filter_button.on("click", runEnter);


function runEnter() {

    d3.event.preventDefault();
    
    var inputElement = d3.select("#datetime");

    var inputDate = inputElement.property("value");
  
    console.log(inputDate);
    
    var filteredDate = tableData.filter(tableData => tableData.datetime === inputDate);
  
    console.log(filteredDate);
    document.getElementById("ufo-table").innerHTML = "";

    filteredDate.forEach(function(datedata) {
        
        var filteredrow = ufotable.append("tr");
      
        Object.entries(datedata).forEach(function([key, value]) {
          
          var filteredcell = filteredrow.append("td");
          filteredcell.text(value);
        });
    });
     
  
};