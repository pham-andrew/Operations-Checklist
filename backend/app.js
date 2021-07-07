const express = require('express')
const app = express()
const port = 3001
const db = require("./db")
const session = require("express-session")
const cookieParser = require('cookie-parser')


var cors = require('cors')
app.use(cors({
    credentials:true,
    origin:"http://localhost:3000"
}))
app.use(express.json())
app.use(session({
    name: 'checklist_cookie',
    secret: "super secret password"
}))

app.use(cookieParser())

app.get('/', (req, res) => {
    console.log(req.session.user)
    if( req.session.user ){
        res.send(`Hello ${req.session.userID}:${req.session.user}`)
    } else {
        res.send('Hello user. Please login.')
    }
});

app.get('/user', (req, res) => {
    db.query('SELECT * FROM users;')
    .then(data => {
        //console.log(data.rows)
        res.json(data.rows).status(200)
    })
});

app.get('/checklists', (req, res) => {
    db.query('SELECT * FROM checklists;')
    .then(data => {
        //console.log(data.rows)
        res.json(data.rows)
        res.status(200)
    })
});

//get checklist by id
app.get('/checklist/:id', (req, res) => {
    //console.log(req.params.id)
    db.query(`SELECT * FROM checklists WHERE id = '${req.params.id}';`)
    .then(data => {
        res.json(data.rows).status(200)
    })
});

//get all the todos from todos_list given checklist id
app.get('/todos_list/:checklistid', (req, res) => {
    db.query(`SELECT todos_id FROM todos_list WHERE checklist_id = '${req.params.checklistid}';`)
    .then(data => {
        var result = []
        var ids = (data.rows.map(element => {
            return element.todos_id
        }))
        db.query(`SELECT * FROM todos WHERE id IN (${ids});`)
        .then(data => {
            result.push(data.rows)
            res.json(result[0])
        })
    })
});

//get todo by id
app.get('/todos/:id', (req, res) => {
    db.query(`SELECT * FROM todos WHERE id = '${req.params.id}';`)
    .then(data => {
        res.json(data.rows).status(200)
    })
});

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
        console.log(data.rows[0].id)
        if(data.rows.length > 0){
            req.session.user = req.body.username
            req.session.userID = data.rows[0].id
            res.cookie('username', `${req.body.username}`).send('Logged in').status(200)
        } else {
            res.send('Invalid credentials.').status(401)
        }
    })
}); 

app.post('/user', (req, res) => {
    //console.log(req.body.username)
    if(req.body.username && req.body.password){
        db.query(`INSERT INTO users ( username, password ) VALUES ('${req.body.username}', '${req.body.password}');`)
        .then(data => {
            res.status(200)
        })
    }
    else
        res.status(400)
    res.end()
});

app.post('/checklists', (req, res) => {
    if(req.body.author && req.body.title){
        db.query(`INSERT INTO checklists ( author, title ) VALUES ('${req.body.author}', '${req.body.title}') RETURNING id;`)
        .then((checklistId) => {
            // console.log(checklistId.rows[0])
            for(var i=0;i<req.body.todos.length;i++){
                //insert into todo table
                db.query(`INSERT INTO todos (todo_order, todo) VALUES ('${req.body.todos[i].order}', '${req.body.todos[i].todo}') RETURNING id;`)
                .then( (todoId) => {
                    // console.log(todoId.rows)
                    db.query(`INSERT INTO todos_list (todos_id, checklist_id) VALUES ('${todoId.rows[0].id}', '${checklistId.rows[0].id}');`)
                })
            }
            //insert into todo checklist join table
        })
        //chain then for each insert todo req.body.todo
    }
    else
        res.status(400)
    res.end()
});

// author title, array called todos, each todo is an obj with order number and text
//insert into checklist table
// get id of the checklist
//todo tables,

// app.post('/assignUsers', (req, res) => {
//     const postData = req.body
//     //todo assign users to checklist
//     res.end()
// });

app.listen(port,  ()=>{
    console.log(`Listening on ${port}`)
})
