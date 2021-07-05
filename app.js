const express = require('express');
const app = express();
const bodyParser = require('body-parser');
//middleware
app.use(express.static(__dirname + '/public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.listen(3000, function() {
    console.log("server started");

});

app.post('/', function(req, res) {
    addEmailToMailchimp(req.body.email);
    res.end('success!!!');
});

function addEmailToMailchimp(email){
    var request = require('request');

    var options = {
      method: 'POST',
      url: 'https://us6.api.mailchimp.com/3.0/lists/8ff092e04c/members',
      headers: {
        'Authorization': 'Basic YW55c3RyaW5nOjI3NGVhMjExNGM0NDllOTI0Nzk0NmU3NjRkZDU1NjEzLXVzNg==',
        'Content-Type': 'application/json',
        'Cookie': 'ak_bmsc=4C4F5A60B93026A1F3A352992892BE6F~000000000000000000000000000000~YAAQ1nMsMXyvQWh6AQAAXSxwcgxBRhsac0kR0bfFoyD5hZ0YA0sBfpGK274Qdzpr+C2xzxui9WAfdGfCZoFn5P/YgZaVZNbstFaM/BZC1YdLFVBvX5x4SDLxDHchqffH+gFwKOV8IJ8Sf7q5sWEc/va5MCig+Ipf72Fm1xcOY0hzeGZer8XT5n4UTUT2BFnqeoY/g2351KXxeuR2zWcrz/b2IvZU8oe72Sn0zVVyfo4mLH/CxKnGP5oO3FfepG8oyiMILsvaOGGq0iqtlYM0IJN/M4AEjMUv2YWi0e8SV8FWRCxqtnE2sC5l1Etrt26yu0P7wY2gd5fZOA8o7AGePSb0I4/7cO3EbyFW15S2MN/K2cu2lJBDDupeahfQb9/qHSM=; bm_sv=2BF8EA3999AAEB442A653ED312403B56~I5epAUoXNapJqKwaXRcEVNehF1THy70JoZcrzEDDpfV0YkJ9xoDvZ8169MDmfIaymlTCIdhdgnQKTkT3BS7mQ44A/ahfysIhW46OLEAfYkRbftAXE2r0rbWhdB+F8Rf0jTJgkrLKJoWYVbkArYSzdmz8hPz2lYO0iruo4dUxrL4='
      },
      body:({
        "email_address": email,
        "status": "subscribed"}),
        json: true 
    };
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      
      console.log(body);
    });
    
}