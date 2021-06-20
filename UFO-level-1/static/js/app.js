// from data.js
var tableData = data;
//console.log(tableData);

//using D3 to select the HTML elements
var ufotable = d3.select("tbody");
var ufohead = d3.select("thead");

//creating a function to write the data on the HTML page
  function writeData(dataInput) {
    dataInput.forEach(function(ufosights) {
    //console.log(ufosights); //for quality checks
    var row = ufotable.append("tr"); //add a new row for each record
    
    Object.entries(ufosights).forEach(function([key, value]) {
      console.log(key, value);
      var cell = row.append("td"); //add a new data for each record
      cell.text(value); //add the data into the tabledata previously added
    });
  });
}

//using the function just created to write the tableData into the table. 
writeData(tableData);

//creating more variables with D3 for input and data manipulation
var datetime_form = d3.select("#datetime");

//for action when form is sumbitted
datetime_form.on("submit",runEnter);

//for action when button is clicked
var filter_button = d3.select("#filter-btn");
filter_button.on("click", runEnter);


//creating a function for when the form is submitted or button is clicked
function runEnter() {

    d3.event.preventDefault(); //using d3 to prevent the page from being refreshed
    
    //grabbing the inputs
    var inputDate = d3.select("#datetime"); 

    //assigning the inputs with the value
    var DateInput = inputDate.property("value");
  
    // console.log(DateInput);

    //using the date input for the filter
    var filteredDate = tableData.filter(tableData => tableData.datetime === DateInput);

    //quality checks
    // console.log(filteredDate);
  
    ufotable.html(""); //clearing the tbody element

    //declaring response as let for the current block statement
let response = {
    filteredDate
}

//conditionals to check if Date Input is valid
if(response.filteredDate.length !== 0) {
    writeData(filteredDate); //populate the table with the date
}

else { //nothing entered matched, hence the table is cleared and page is automatically refreshed in 10 seconds
        ufohead.html(""); //clearing headers then include the notes
        ufohead.append("tr").append("td").text(`No sightings on ${DateInput} ... The Truth is still out there.`);

        //following function is to reload the page
        function timedRefresh(timeoutPeriod) {
            setTimeout("location.reload(true);",timeoutPeriod);
        }
        
        var timeleft = 10; //timer set to 10 seconds
        var downloadTimer = setInterval(function(){
          if(timeleft <= 0){

            window.onload = timedRefresh(0); //page reload in 0 seconds once the timer is 0
    
          } else {
            ufohead.html(""); //clear the headers on each loop and shows the countdown
            ufohead.append("tr").append("td").text(`Memory will be wiped in ${timeleft} seconds`);
          }
          timeleft -= 1;
        }, 1000);



        

        


    }
}
