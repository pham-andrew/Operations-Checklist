const express = require('express')
const app = express()
const port = 3001

const u = require('./mock_data/users.json')
const users = u.users
const checklists = require('./mock_data/checklists.json')

var cors = require('cors')
app.use(cors())

app.get('/', (req, res) => res.send('Hello World!'))
app.get('/users', async (req, res) => res.send(users))
app.get('/checklists', async (req, res) => res.send(checklists))

app.post('/login', async (req, res) => {
    console.log(req.body)
    var auth = false
    for(var i=0;i<users.length;i++)
        if(users[i].username === req.body.username && users[i].password === req.body.password)
            auth = true
    if(auth)
        res.status(200)
    else
        res.status(401)
    res.end()
});
app.post('/users', async (req, res) => {
    console.log(req.body)
    if(req.body.id && req.body.username && req.body.password && req.body.admin){
        users.push({"id":"req.body.id", "username":"req.body.username", "password":"req.body.password", "admin":"req.body.admin"})
        res.status(200)
    }
    else
        res.status(400)
    res.end()
});
app.post('/checklists', async (req, res) => {
    const postData = req.body;
    //todo create a checklist
    res.end()
});
app.post('/assignUsers', async (req, res) => {
    const postData = req.body;
    //todo assign users to checklist
    res.end()
});

app.listen(port,  ()=>{
    console.log(`Listening on ${port}`)
})
