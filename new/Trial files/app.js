//grab data from data.js
// select the location it will go to
//build table function
// loop through the list of data, then loop through the values 
// in each object and add them to a table 
//// utilize day 3, activity 3 class exercise \\\\
var tbody = d3.select("tbody");

d3.event.preventDefault();
// Console.log the weather data from data.js
console.log(data);

data.forEach(function(Sightings) {
    console.log(Sightings);
});


data.forEach(function(Sightings) {
    console.log(Sightings);
    var row = tbody.append("tr");
});

data.forEach(function(Sightings) {
    console.log(Sightings);
    var row = tbody.append("tr");
  
    Object.entries(Sightings).forEach(function([key, value]) {
      console.log(key, value);
    });
  });
  
  // Step 4: Use d3 to append 1 cell per weather report value (weekday, date, high, low)
  data.forEach(function(Sightings) {
    console.log(Sightings);
    var row = tbody.append("tr");
  
    Object.entries(Sightings).forEach(function([key, value]) {
      console.log(key, value);
      // Append a cell to the row for each value
      // in the weather report object
      var cell = tbody.append("td");
    });
  });

  data.forEach(function(weatherReport) {
    console.log(weatherReport);
    var row = tbody.append("tr");
    Object.entries(weatherReport).forEach(function([key, value]) {
      console.log(key, value);
      // Append a cell to the row for each value
      // in the weather report object
      var cell = tbody.append("td");
      cell.text(value);
    });
  });
    // get npm
//use jquery 

//document.getElementById("unique").innerHTML = "something new";
