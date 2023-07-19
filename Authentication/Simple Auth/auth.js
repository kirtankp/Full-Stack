const express = require('express')
const app = express()
const port = 3000
const bodyParser = require("body-parser");
app.use(bodyParser.json());

const Users = []

app.post('/signup', (req, res) => {
    const user = req.body;
    var exists = false;

    for (let index = 0; index < Users.length; index++) {
        if (Users[index].email === user.email) {
            exists = true;
            break;
        }
    }
    if (exists) {
        res.status(400).send('user already exists');
    } else {
        Users.push(user);
        res.status(201).send('SignUp Successful..!');
    }
})

app.post('/login', (req, res) => {
    const user = req.body;
    var userFound = null;

    for (var i = 0; i < Users.length; i++) {
        if (Users[i].email === user.email && Users[i].password === user.password) {
            userFound = Users[i];
            break;
        }
    }
    if (userFound) {
        res.status(201).json({
            email: userFound.email
        });
    } else {
        res.sendStatus(401);
        // res.Status(401).send('unauthorized user');
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})