const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()


//exp cfg
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//handlebars config
app.use(express.static(path.join(__dirname, '../public')))
app.set('views', viewPath)
app.set('view engine','hbs')
hbs.registerPartials(partialPath);

app.get('', (req,res) => {
    res.render('index', {
        title: 'weatherapp val',
        name: 'rob'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'about me',
        name: 'rob'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        helpText: 'Here is the help text for you - it is very helpful!',
        title: 'help me!',
        name: 'rob'
    })
})

app.get('/weather', (req,res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address, (error, {lat, long, name} = {}) => {
        if (error) { 
            return res.send({error})
        }
        forecast(lat, long, (error, fcdata) => {
            if (error) { 
                return res.send({error})
            }
            res.send({
                location: name,
                forecast: fcdata,
                address: req.query.address
            })
        })
    })
     
})


app.get('/help/*', (req,res) => {
    res.render('404', {
        title: 'Not Found',
        message: 'Help Article Not Found',
        name: 'rob'
    })
})


app.get('*', (req,res) => {
    res.render('404', {
        title: 'Not Found',
        message: 'Page Not Found',
        name: 'rob'
    })
})

app.listen(3000, () => {
    console.log('server started on 3000')
})