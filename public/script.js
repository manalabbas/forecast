var xhr = new XMLHttpRequest();
var today = new Date();
var days = ["Sun","Mon","Tues","Wed","Thurs","Fri","Sat"];
var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function bodyLoaded() {
    document.getElementById("getForecast").addEventListener("click", function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition); // request geolocation
        }
    });
}

function weatherIcon(value) { // return weather icon class from library based on weather code from aeris api
    var code;
    value = value.split(":")[2];
    switch (value) {
        case "R":
            code = "wi-rain";
            break;
        case "RW":
            code = "wi-showers";
            break;
        case "S":  
            code = "wi-snow";
            break;
        case "CL":
        case "FW":
            code = "wi-day-sunny";
            break;
        case "SC":
        case "BK":
        case "OV":
            code = "wi-cloudy";
            break;
        default:
            code = "wi-cloud";
    }
    return code;
}

function populate(daysArray) { // build inner html of card div displaying 7-day forecast using responses from aeris api
    console.log(daysArray);
    document.getElementById("card").style.display = "flex";
    document.getElementById("temp").innerHTML += '<p><strong>Max Temperature:</strong> '+daysArray[0].maxTempF+'&deg;F<br><strong>Min Temperature:</strong> '+daysArray[0].minTempF+'&deg;F<br><strong>Precipitation:</strong> '+daysArray[0].pop+'%<br><strong>Humidity:</strong> '+daysArray[0].maxHumidity+'%</p>';
    document.getElementById("date").innerHTML += '<p style="margin-top: 0rem; font-weight: 400; font-size: 1.5rem;">'+days[today.getDay()]+', '+months[today.getMonth()]+' '+today.getDate()+', '+today.getFullYear()+'</p><p style="margin-top: -1.5rem; font-weight: 400; font-size: 0.75rem;">'+daysArray[0].weather+'</p><i class="wi '+weatherIcon(daysArray[0].weatherPrimaryCoded)+'" style="font-size: 4rem;"></i>';
    var i;
    var j = today.getDay()+1;
    for (i=1; i<7; i++) {
        if (j > 6) {
            j = 0;
        };
        document.getElementById("week").innerHTML += '<div class="day"><div class="dayOfWeek">'+days[j]+'</div><div class="forecastTemp">'+daysArray[i].maxTempF + '&deg;</div><i class="wi '+weatherIcon(daysArray[i].weatherPrimaryCoded)+'"></i></div>';
        j++;
    };
}

function showPosition(pos) { // hide button, display message for 5 seconds
    document.getElementById("button").style.display = "none";
    document.getElementById("messages").style.display = "inline";
    var lat = pos.coords.latitude;
    var lon = pos.coords.longitude;
    document.getElementById("messages").innerHTML = "Fetching forecast for lat " + lat + ", lon " + lon;
    xhr.open("GET", "/getweather?lat="+lat+"&lon="+lon, true); // send GET request to server-side /getweather endpoint
    xhr.send();
    xhr.responseType = "json";
    setTimeout(function() {
        document.getElementById("messages").style.display = "none";
        populate(xhr.response); // pass json response to populate()
    }, 5000);
}
