const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +  encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicmdvcmRvbjEyMSIsImEiOiJjazR5a3RqcWMwMW40M2Zwb25ubjQ5cW5hIn0.WAguIo4MHQMbzxLyzEtt0A&limit=1'
    request({url, json:true}, (error, {body}) => {
        if (error) {
            callback(error, undefined)
        } else if (body.features.length === 0) {
            console.log('here')
            callback('Unable to find location. Try another search.', undefined)
        }
        else {
            callback(undefined, {
                lat: body.features[0].center[1],
                long: body.features[0].center[0],
                name: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode