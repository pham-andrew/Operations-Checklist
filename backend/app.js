const express = require('express')
const app = express()
const port = 3001

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/users', (req, res) => res.send('TODO get all users'))

app.listen(port,  ()=>{
    console.log(`Listening on ${port}`)
})
