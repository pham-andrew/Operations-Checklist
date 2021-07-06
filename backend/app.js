const express = require('express')
const app = express()
const port = 3001
const db = require("./db")
const session = require("express-session")

var cors = require('cors')
app.use(cors())
app.use(express.json())
app.use(session({secret: "super secret password", cookie: {maxAge: 60000}}))

const u = require('./mock_data/users.json')
const users = u.users
const checklists = require('./mock_data/checklists.json')

var cookieParser = require('cookie-parser')

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/user', (req, res) => {
    db.query('SELECT * FROM users;')
    .then(data => {
        console.log(data)
        res.json(data.rows)
        res.status(200)
    })
    // res.end()
});
// app.get('/checklists', (req, res) => res.send(checklists))

// function checkSignIn(req, res){
//     if(req.session.user){
//        next();     //If session exists, proceed to page
//     } else {
//        var err = new Error("Not logged in!");
//        console.log(req.session.user);
//        next(err);  //Error, trying to access unauthorized page!
//     }
//  }

// app.post('/login', function(req, res){
//     console.log(Users);
//     if(!req.body.id || !req.body.password){
//        res.render('login', {message: "Please enter both id and password"});
//     } else {
//        Users.filter(function(user){
//           if(user.id === req.body.id && user.password === req.body.password){
//              req.session.user = user;
//              res.redirect('/protected_page');
//           }
//        });
//        res.render('login', {message: "Invalid credentials!"});
//     }
//  });

app.post('/login', (req, res) => {
    console.log(req.body)
    var auth = false
    db.query(`SELECT * FROM users WHERE username = '${req.body.username}' AND password = '${req.body.password}'`)
    .then(data => {
        if(data.rows.length > 0){
            req.session.user = req.body.username;
            res.status(200)
            // res.redirect('/protected_page');
        } else {
            res.status(401)
        }
    })
    res.end()
});

app.post('/user', (req, res) => {
    console.log(req.body.username)
    if(req.body.username && req.body.password){
        db.query(`INSERT INTO users ( username, password ) VALUES ('${req.body.username}', '${req.body.password}');`)
        .then(data => {
            console.log(data.rows)
            res.status(200)
        })
    }
    else
        res.status(400)
    res.end()
});

// app.post('/checklists', (req, res) => {
//     const postData = req.body
//     //todo create a checklist
//     res.end()
// });

// app.post('/assignUsers', (req, res) => {
//     const postData = req.body
//     //todo assign users to checklist
//     res.end()
// });

app.listen(port,  ()=>{
    console.log(`Listening on ${port}`)
})
