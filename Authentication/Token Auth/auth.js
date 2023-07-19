const express = require('express')
const app = express()
const port = 3000
const jwt = require('jsonwebtoken');
const bodyParser = require("body-parser");
app.use(bodyParser.json());

const Users = []

//secret key for the token generation
const secretKey = 'asagc@#vcjs';

//Generate Token based on credentials
const generateJwt = (user) => {
    const payload = { username: user.username, };
    return jwt.sign(payload, secretKey, { expiresIn: '1h' });
};

// Middleware to verify the JWT token
const authenticateToken = (req, res, next) => {
    // Get the token from the request headers
    const token = req.headers.authorization;

    // Check if the token exists
    if (token) {
        // Verify the token using the secret key
        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                // Return an error if the token is invalid
                res.send(token)
                res.status(403).json({ error: 'Invalid token' });
            } else {
                // Set the decoded token in the request object for later use
                req.decoded = decoded;
                next();
            }
        });
    } else {
        // Return an error if the token is not provided
        res.status(401).json({ error: 'Token not provided' });
    }
}

app.post('/signup', (req, res) => {
    const user = req.body;
    const exists = Users.find(a => a.email === user.email);
    if (exists) {
        res.status(403).json({ message: 'user already exists' });
    } else {
        Users.push(user);
        const token = generateJwt(user);
        res.json({ message: 'SignUp Successfully', token });
    }
})

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = Users.find(a => a.email === email && a.password === password);

    if (user) {
        const token = generateJwt(user);
        res.json({ message: 'Logged in successfully', token });
    } else {
        res.status(403).json({ message: 'user authentication failed' });
    }
})

app.get('/protected', authenticateToken, (req, res) => {
    // Return a success message if the token is valid
    res.json({ message: 'Protected route accessed successfully' });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})