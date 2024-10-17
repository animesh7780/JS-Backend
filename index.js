require('dotenv').config()
const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/twitter', (req, res) => {
    res.send('Hello Twitter!')
})

app.get('/login', (req, res) => {
    res.send('Hello Login')
})

app.get('/youtube', (req, res) => {
    res.send('Padh na')
})

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}!`)
})
