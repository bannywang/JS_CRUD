const express = require('express')
const app = express()
const port = 3005
require('dotenv').config()
const path = require('path')

app.use(express.json())

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'public')))

const router = require('./routers/router')
app.use('/', router)

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})
