const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

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
//send back an error, with json errorMessage
app.get('/bad', (request, response) => {
    response.send({
        errorMessage: 'Bad request.  Do not do that'
    });
});

// create a new projects page to the web site
//  page will link to github projects
//  create the url, handlebars template
//  new view file, header and footer
//  just put a message in 'portfolio goes here'
//  add a new link to the header, to the new projects page
//  once done, and tested locally, push it up to github
//  then do git push heroku, open app in the browser
app.get('/projects', (request, response) => {
    response.render('projects.hbs', {
        pageTitle: 'BB Projects Page'
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`);
});