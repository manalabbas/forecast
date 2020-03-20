# 7-Day Weather Forecast
Powered by [Aeris Weather API](https://www.aerisweather.com/support/docs/api/).

#### Required Dependencies
Install [`node.js`](https://nodejs.org/en/download/) on environment, as well as the `express` and `request` modules. 

    $ npm install express
    $ npm install request

### Configure the `aeriskey.json` file.
```js
{
  "client_id": "FILL IN",
  "client_secret": "FILL IN"
} 
```

#### Start

    $ node hw4server.js
Request index.html from server by visiting [`http://localhost:8080/index.html`](http://localhost:8080/index.html).
