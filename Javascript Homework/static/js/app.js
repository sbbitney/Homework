// from data.js
var tableData = data;



function filterDataByDate(dataArray, date) {
  
  // use the Array.filter method to filter out any sightings that don't match the date 
  return dataArray.filter((dataObject) => { 
    // check to see if the sightings date matches filter date
    return dataObject.datetime === date;
  });
}

function createTable(sightings) {
  
  // grab the date time in the browser
  const date = localStorage.getItem("datetime");
console.log(date);
  
  // if a date is present filter sightings by date
  if (date) {
    sightings = filterDataByDate(sightings, date);
  }

  // grab the <tbody id="table-body"> element from index.html
  const tableBod = document.getElementById("table-body");
  
  // iterate through the filtered sightings
  sightings.forEach((sighting) => {

    // create a <tr> (table row) element for this sighting  
    const tableRow = document.createElement("tr");

    const sightingKeys = Object.keys(sighting);


    // iterate through the array of sighting keys
    sightingKeys.forEach((sightingKey) => {
      // create a <td> (table data) element
      const tableData = document.createElement("td");

      // set the <td> value to the sighting object's key value
      // ie. sighting["datetime"] === '1/1/2010'
      tableData.innerHTML = sighting[sightingKey];

      // append to table row created above 
      tableRow.appendChild(tableData);

  
    });

    // append populated row to  <tbody> element 
    tableBod.appendChild(tableRow);


  });
}

function storeFilterDate() {


  const input = document.getElementById("datetime").value;

  // store the user's date input in the browser, so that we can access it to filter the data even if the page reloads
  // using localStorage as temporary storage of info in the browser - data is lost if browser is refreshed or closed.
  localStorage.setItem("datetime", input);
}



// initiate our function createTable 
createTable(tableData);

