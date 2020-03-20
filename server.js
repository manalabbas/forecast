var express = require("express");
var aeriskey = require("./private/aeriskey.json")
var app = express();
app.use(express.static("public"));
app.listen(8080);
var request = require("request");
app.get("/getweather", function(req, res) {
      request({
          method: "GET",
          uri: "https://api.aerisapi.com/forecasts/"+req.query.lat+","+req.query.lon,
          qs: {
             format: "json",
             filter: "mdnt2mdnt",
             limit: "7",
             fields: "periods.maxTempF,periods.minTempF,periods.weather,periods.pop,periods.maxHumidity,periods.weatherPrimaryCoded",
             client_id: aeriskey.client_id,
             client_secret: aeriskey.client_secret
          }
      }, function(error, response, body) {
          if (error) {
             return console.error(error);
          };
          console.log(body);
	  res.send(JSON.parse(body).response[0].periods);
      });
});

