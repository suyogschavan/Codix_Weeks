const express = require('express');
const jwt = require('jsonwebtoken');
const app = express()

app.get('/api', (req, res) => {
    res.json({
        message: "hey there welcome to this api service"
    });
});

app.post('/api/posts', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403); //Forbidden
        } else {
            res.json({
                message: 'post created ...',

                authData,
            });
        }
    });
});


app.post('/api/login', (req, res) => {
    const user = {
        id: 1,
        username: 'Suyog',
        email: "suyogschavan03@gmail.com",
    };

    jwt.sign({ user: user }, 'secretkey', (err, token) => {
        res.json({
            token,
        });
    });
});

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization']
    if (typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(' ')[1]
        req.token = bearerToken
        next()

    } else {
        res.sendStatus(403); //Forbidden
    }
}

app.listen(3000, (req, res) => {
    console.log("server started on server 3000");

})