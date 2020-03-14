const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/f2e82bb1dc65e32b904eb0bb33e9d4e6/' + lat + ',' + long

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, {
                summary: body.daily.data[0].summary,
                temp: body.currently.temperature,
                precip: body.currently.precipProbability
            })   
        }
    })
}

module.exports = forecast