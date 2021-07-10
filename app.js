const express = require('express');
const app = express();
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const e = require('express');
const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    insecureAuth: true,
    database: "spectrum"
});

conn.connect((err) => {
    if (err) throw err;
    console.log("DB Connected!");

});



//Global variables

let login = false;
let msg = "";
let userId=null;
//Body parser

app.use(express.urlencoded({ extended: true }));

// EJS
app.set('view engine', 'ejs');

// Public Folder
app.use(express.static('./public'));

//APIS
app.get('/', (req, res) => {
    msg = ""
    res.render('index', { login, userId })
})
app.get('/login', (req, res) => {
    res.render('login', { msg })
})
app.get('/register', (req, res) => {
    res.render('register', { msg })
})
app.get('/logout', (req, res) => {
    login = false;
    res.redirect('/')
})
app.post('/login', (req, res) => {
    const { uname, password } = req.body;
    const sql = "SELECT * FROM `user` WHERE (`email`='" + uname + "' OR `phno`= '" + uname + "' ) AND `password`='" + password + "'";
    conn.query(sql, (err, result) => {
        if (err) {
            msg = "Login Failed!";
            res.redirect('/login');
        } if (result.length == 0) {
            msg = "No User Found!";
            res.redirect('/login');
        } else {
            login = true;
            msg = "";
            userId=result[0].id;
            res.redirect('/')
        }
    })
})
app.post('/register', (req, res) => {
    const { name, email, phno, branch, dob, password } = req.body;
    var sql = "INSERT INTO `user` (`name`, `email`, `phno`, `branch`, `dob`, `password`) VALUES ('" + name + "','" + email + "','" + phno + "','" + branch + "','" + dob + "','" + password + "')";
    conn.query(sql, function (err) {
        if (err) {
            msg = "Registeration Failed!"
            res.redirect('/register')
        }
        else {
            msg = "Registered Successfully!"
            res.redirect('/login')
        }
    });
})

app.get('/profile/:id', (req, res) => {
    const id=parseInt(req.params.id);
    const sql = "SELECT * FROM `user` WHERE `id`='" + id + "'";
    conn.query(sql, (err, result) => {
        console.log(result);
        res.render('profile',{user:result[0]})
    });
})

app.get("/profiletest",(req,res)=>{
    res.render('profile',{user:{2:324}})
})

app.get('/feedback', (req, res) => {
    const { name, phone, subject } = req.body;
    var sql = "INSERT INTO `feedback` (`name`, `phone`, `subject`) VALUES ('" + name + "','" + phone + "','" + subject + "')";
    conn.query(sql, function (err) {
        if (err) {
            msg = "Registeration Failed!"
            res.redirect('/register')
        }
        else {
            msg = "Registered Successfully!"
            res.redirect('/login')
        }
    });
})

const port = 4004;

app.listen(port, () => console.log(`Server started on port ${port}`));