const express = require('express');
const hbs = require('hbs');
const fs = require('fs');


var app = express();
const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
})

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err){
            console.log('Unable to appenderver.log')
        }
    })
    next();
})

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home page',
        page: 'Home'
    });
});
app.get('/rotate', (req, res) => {
    res.render('rotating.hbs', {
        pageTitle: 'Rotate page',
        page: 'Rotating'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    })
});

app.listen(port, () => {
    console.log('Server is up on port ' + port)
});