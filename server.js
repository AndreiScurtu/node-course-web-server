const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


//// Express Middleware ////
app.use((req, res, next) => {
    const now = new Date().toString();
    const log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log  + '\n', error => error ? console.log(error) : '');
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));


//// Helpers ////
hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());

hbs.registerHelper('screamIt', text => text.toUpperCase());


//// Handle Requests ////
app.get('/', (req, res) => {
    // response.send('<h1>Hello Express!</h1>');
    response.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to this page!'       
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle request'
    });
});


//// Set up localhost:3000 ////
app.listen(3000, () => {
    console.log('Server is up on port 3000');
});