// Create our initial map object
// Set the longitude, latitude, and the starting zoom level

url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

var myMap = L.map("map").setView([34.05, -97.21], 4);

// Add a tile layer (the background map image) to our map
// Use the addTo method to add objects to our map
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);

d3.json(url).then(d => {
console.log(d)
d.features.forEach(element => {
var Lat = element.geometry.coordinates[1]
var Lon = element.geometry.coordinates[0]
var popup = `<h2>${element.properties.place}</h2><p>magnitude: ${element.properties.mag}</p>`


  L.circle([Lat, Lon], 40000*element.properties.mag, {
    color: 'black',
    fillColor: getColor(element.properties.mag),
    fillOpacity: 0.5,
    weight:0.2,
    
  }).bindPopup(popup).addTo(myMap);
  
});

})


function getColor(d) {
  return  d < 1  ? 'green':
          d < 2  ? 'lightgreen':
          d < 3  ? 'gold':
          d < 4  ? 'orange':
          d < 5  ? 'darkorange':
                   'red';
}

// Create a legend to display information about our map
var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
    grades = [0, 1, 2, 3, 4, 5],
    labels = [];

    // div.innerHTML+='Magnitude<br><hr>'

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '">&nbsp&nbsp&nbsp</i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
}

return div;
};

legend.addTo(myMap);


