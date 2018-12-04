var queryUrl = 
"https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson" 

// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {
  // console.log(data)
  // Once we get a response, send the data.features object to the createFeatures function
  createFeatures(data.features);

});

function createFeatures(earthquakeData) {
  console.log(earthquakeData.properties)
  var earthquakes = L.geoJson(earthquakeData, {
  
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng)
    }, 
    style: setStyle,
    onEachFeature: onEachFeature

  })

  // Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the place and time of the earthquake
  function onEachFeature(feature, layer) {
    layer.bindPopup("<h3>" + feature.properties.place +
      "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
  }
  function setStyle(feature){
    return {opacity: 1,
    fillOpacity: 1,
    fillColor: setColor(feature.properties.mag),
    color: '#000000',
    radius: getRadius(feature.properties.mag),
    stroke: true,
    weight: .5

}

  }


  function setColor(magnitude){
    // Conditionals for countries points
    var color = "";
    if (magnitude > 5) {
      color = "black";
    }
    else if (magnitude > 4) {
      color = "red";
    }
    else if (magnitude > 3) {
      color = "orange";
    }
    else if (magnitude > 2) {
      color = "yellow";
    }
    else if (magnitude > 1) {
      color = "green";
    }
    else {
      color = "grey";
    }
  return color  
}

function getRadius(radius){
  radius = radius * 5
  return radius
}
/////////////


//////////////

  // Create a GeoJSON layer containing the features array on the earthquakeData object
  // Run the onEachFeature function once for each piece of data in the array

  // Sending our earthquakes layer to the createMap function
  createMap(earthquakes);

}

function createMap(earthquakes) {

  // Define streetmap and darkmap layers
  var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  });

  var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.dark",
    accessToken: API_KEY
  });


  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap
  };

  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    Earthquakes: earthquakes
  };

///////////////////


  ///////////////
  // Create our map, giving it the streetmap and earthquakes layers to display on load
  var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [streetmap, earthquakes]
  });
  
  

  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

  createLabels(myMap);

}

function createLabels(map) {
  function setColor(magnitude){
    // Conditionals for countries points
    var color = "";
    if (magnitude > 5) {
      color = "black";
    }
    else if (magnitude > 4) {
      color = "red";
    }
    else if (magnitude > 3) {
      color = "orange";
    }
    else if (magnitude > 2) {
      color = "yellow";
    }
    else if (magnitude > 1) {
      color = "green";
    }
    else {
      color = "grey";
    }
  return color  
}

  
  var legend = L.control({position: 'bottomright'});

  legend.onAdd = function () {
  
    var div = L.DomUtil.create('div', 'info legend');
        var magnitude = [7, 4, 3, 2, 1, -1]
        var colors = ["black", "red", "orange", "yellow", "green", "grey"]
    
    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < magnitude.length; i++) {
        div.innerHTML +=
            '<i style="background:' + setColor(magnitude[i] + 1) + '"></i> ' +
            magnitude[i] + (magnitude[i + 1] ? '&ndash;' + magnitude[i + 1] + '<br>' : '+');
    }

    return div;
};
legend.addTo(map);
}

