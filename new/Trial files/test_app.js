// from data.js
var tableData = data;



function filterDataByDate(dataArray) {
  // grab the date time that we have stored in the browser
  const date = localStorage.getItem("datetime");

  // use the Array.filter method to filter out any sightings that don't match the date we want
   return dataArray.filter((dataObject) => { 

     // if a date is present
     if (date) {

       // check to see if the sighting's date matches our filter date, and return that sighting if so
       return dataObject.datetime === date;

     // otherwise return the sighting
     } else {
       return data;
     }
  });
}

function createTable(sightings) {

  // filter sightings by date
  sightings = filterDataByDate(sightings);

  // grab the <tbody id="table-body"> element from index.html
  const tableBod = document.getElementById("table-body");
  
  // iterate through the filtered sightings
  sightings.forEach((sighting) => {

    // create a <tr> (table row) element for this sighting  
    const tableRow = document.createElement("tr");

    // get an array of this sighting object's keys. ie --> ["datetime", "city", "state", "country", "shape"...etc]
    // see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys which explains Object.keys()
    const sightingKeys = Object.keys(sighting);

    // iterate through the array of sighting keys
    sightingKeys.forEach((sightingKey) => {

      // create a <td> (table data) element
      const tableData = document.createElement("td");

      // set the <td> value to the sighting object's key value
      // ie. sighting["datetime"] === '1/1/2010'
      tableData.innerHTML = sighting[sightingKey];

      // our table data element now looks like --> <td>1/1/2010</td>
      // and so we want to append it to our <tr> element we created above
      tableRow.appendChild(tableData);

      // our table row now looks like:
      //  <tr> <td>1/1/2010</td> </tr>

      // and our <tr> will continue to build like so as we iterate until we get:
      //            Date              City          State      Country       Shape          Duration                 Description
      //  <tr> <td>1/1/2010</td> <td>benton</td> <td>ar</td> <td>us</td> <td>circle</td> <td>5 mins.</td> <td>4 bright green circles...</td> </tr>
    });

    // finally we append our now populated row to the <tbody> element we grabbed at the beginning of the function
    tableBod.appendChild(tableRow);

    // our table body now looks like:
    //  <tbody>
    //    <tr> <td>1/1/2010</td> <td>benton</td> <td>ar</td> <td>us</td> <td>circle</td> <td>5 mins.</td> <td>4 bright green circles...</td> </tr>
    //  </tbody>

    // and our <tbody> will continue to build like so as we iterate until the last sighting is reached:
    //  <tbody>
    //    <tr> <td>1/1/2010</td> <td>benton</td> <td>ar</td> <td>us</td> <td>circle</td> <td>5 mins.</td> <td>4 bright green circles...</td> </tr>
    //    <tr> <td>1/1/2010</td> <td>bonita</td> <td>ca</td> <td>us</td> <td>light</td> <td>13 mins.</td> <td>Three bright red lights...~</td> </tr>
    //  </tbody>

  });
}

function storeFilterDate() {

  // grab the value that is in the <input id="datetime"> element which should contain
  // the date the user wants to filter by
  const input = document.getElementById("datetime").value;

  // store the user's date input in the browser, so that we can access it to filter the data even if the page reloads
  // * localStorage is basically used for temporary storage of info in the browser - the data is lost if you close out the browser
  localStorage.setItem("datetime", input);
}



//***** start from here and follow the code trail *****//
createTable(tableData);