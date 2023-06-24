/*
  Create a HTTP server in Node.js which will handle the logic of an authentication server.

  The expected API endpoints are defined below,
  1. POST /signup - User Signup
    Description: Allows users to create an account. This should be stored in an array on the server, and a unique id should be generated for every new user that is added.
    Request Body: JSON object with username, password, firstName and lastName fields.
    Response: 201 Created if successful, or 400 Bad Request if the username already exists.
    Example: POST http://localhost:3000/signup

  2. POST /login - User Login
    Description: Gets user back their details like firstname, lastname and id
    Request Body: JSON object with username and password fields.
    Response: 200 OK with an authentication token in JSON format if successful, or 401 Unauthorized if the credentials are invalid.
    Example: POST http://localhost:3000/login

  3. GET /data - Fetch all user's names and ids from the server (Protected route)
    Description: Gets details of all users like firstname, lastname and id in an array format. Returned object should have a key called users which contains the list of all users with their email/firstname/lastname.
    The users username and password should be fetched from the headers and checked before the array is returned
    Response: 200 OK with the protected data in JSON format if the username and password in headers are valid, or 401 Unauthorized if the username and password are missing or invalid.
    Example: GET http://localhost:3000/data

  - For any other route not defined in the server return 404
 */

const express = require("express")
const PORT = 3000;
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());

var users = [];

const Register = (req, res) => {
    var user = req.body;
    let userAlreadyExists = false;
    for (var i = 0; i < users.length; i++) {
        if (users[i].email === user.email) {
            userAlreadyExists = true;
            break;
        }
    }
    if (userAlreadyExists) {
        res.status(400).send('user already exists');
    } else {
        users.push(user);
        res.status(201).send("Signup successful");
    }
}
app.post('/signup', Register);

const Login = (req, res) => {
    var user = req.body;
    let userFound = null;
    for (var i = 0; i < users.length; i++) {
        if (users[i].email === user.email && users[i].password === user.password) {
            userFound = users[i];
            break;
        }
    }

    if (userFound) {
        res.json({
            firstName: userFound.firstName,
            lastName: userFound.lastName,
            email: userFound.email
        });
    } else {
        res.Status(401).send('unauthorized user');
    }
}
app.post('/login', Login);

const FetchAllData = (req, res) => {
    var email = req.headers.email;
    var password = req.headers.password;
    let userFound = false;
    for (var i = 0; i < users.length; i++) {
        if (users[i].email === email && users[i].password === password) {
            userFound = true;
            break;
        }
    }

    if (userFound) {
        let usersToReturn = [];
        for (let i = 0; i < users.length; i++) {
            usersToReturn.push({
                firstName: users[i].firstName,
                lastName: users[i].lastName,
                email: users[i].email
            });
        }
        res.json({
            users
        });
    } else {
        res.Status(401).send('unauthorized user');
    }
}
app.get('/data', FetchAllData);

const otherRoute = (req, res, next) => {
    res.status(404).send('Route not found');
}
app.use(otherRoute);

app.listen(PORT, () => {
    console.log(`app is running on port ${PORT}`);
})