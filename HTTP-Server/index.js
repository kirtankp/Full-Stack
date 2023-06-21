const express = require('express')
const app = express()
const port = 3000

app.get('/get', (req, res) => {
    res.send('This is /get route with get method')
})

app.post('/post', (req, res) => {
    res.send('This is /post route with post method')
})

app.put('/put', (req, res) => {
    res.send('This is /put route with put method')
})

app.delete('/delete', (req, res) => {
    res.send('This is /delete route with delete method')
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})