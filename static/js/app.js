// from data.js
var tableData = data;
//console.log(tableData);

var ufotable = d3.select("tbody");
var ufohead = d3.select("thead");

  function writeData(dataInput) {
    dataInput.forEach(function(ufosights) {
    console.log(ufosights);
    var row = ufotable.append("tr");
  
    Object.entries(ufosights).forEach(function([key, value]) {
      console.log(key, value);
      var cell = row.append("td");
      cell.text(value);
    });
  });
}

writeData(tableData);

var datetime_form = d3.select("#datetime");
var city_form = d3.select("#city");
city_form.on("subnmit", runEnter);
datetime_form.on("submit",runEnter);

var filter_button = d3.select("#filter-btn");
filter_button.on("click", runEnter);


function runEnter() {

    d3.event.preventDefault();
    
    var inputDate = d3.select("#datetime");
    var inputCity = d3.select("#city");

    var DateInput = inputDate.property("value");
    var CityInput = inputCity.property("value");
  
    // console.log(DateInput);
    // console.log(CityInput);

    var filteredDate = tableData.filter(tableData => tableData.datetime === DateInput);
    var filteredCity = tableData.filter(tableData => tableData.city === CityInput);

    var filterCombined = tableData.filter(tableData => tableData.datetime === DateInput && tableData.city === CityInput);
  
    // console.log(filteredDate);
    // console.log(filteredCity);
    // console.log(filteredCombined);
    // document.getElementById("ufo-data").innerHTML = "";


    ufotable.html("");
let response = {
    filteredDate, filteredCity, filterCombined
}


if(response.filterCombined.length !== 0) {
    writeData(filterCombined);
}


else if(response.filterCombined.length === 0 && ((response.filteredDate.length !== 0 || response.filteredCity.length !== 0))) {
    writeData(filteredDate) || writeData(filteredCity);
    }

else {
        ufohead.html("");
        ufohead.append("tr").append("td").text(`No sightings on ${DateInput || CityInput} ... The Truth is still out there.`);
    

        function timedRefresh(timeoutPeriod) {
            setTimeout("location.reload(true);",timeoutPeriod);
        }
        
        var timeleft = 10;
        var downloadTimer = setInterval(function(){
          if(timeleft <= 0){

            window.onload = timedRefresh(0);
    
          } else {
            ufohead.html("");
            ufohead.append("tr").append("td").text(`Memory will be wiped in ${timeleft} seconds`);
          }
          timeleft -= 1;
        }, 1000);



        

        


    }
}
