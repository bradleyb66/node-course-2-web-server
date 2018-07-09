const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use( (request, response, next) => {  // next = what express should do when your middleware function is done
    var now = new Date().toString();
    var log = `${now}: ${request.method} ${request.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server log.');
        }
    });
    next();
});

// app.use((request, response, next) => {
//     response.render('maint.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (request, response) => {
    // response.send('<h1>hello express</h1>');
    // response.send({
    //     name: 'Brad',
    //     likes: ['music', 'biking', 'running']
    // });
    response.render('home.hbs', {
        pageTitle: 'BB Home Page',
        welcomeMessage: 'This is my awesome welcome message'
    });
});

app.get('/about', (request, response) => {
    response.render('about.hbs', {
        pageTitle: 'BB About Page'
    });
});


//create a route at /bad
//send back an error, with jason errorMessage
app.get('/bad', (request, response) => {
    response.send({
        errorMessage: 'Bad request.  Do not do that'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000.');
});