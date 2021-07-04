const express=require('express');
const app=express();
const mysql = require('mysql2');
const bodyParser=require('body-parser');
const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    insecureAuth : true,
    database: "spectrum"
  });
  
conn.connect((err)=>{
if (err) throw err;
console.log("DB Connected!");

});




let login=false;
let msg="";

app.use(express.urlencoded({ extended: true }));
// EJS
app.set('view engine', 'ejs');

// Public Folder
app.use(express.static('./public'));


app.get('/',(req,res)=>{
     res.render('index',{login})
})
app.get('/login',(req,res)=>{
     res.render('login')
})
app.get('/register',(req,res)=>{
     res.render('register')
})
app.get('/logout',(req,res)=>{
    login=false;
    res.redirect('/')
})
app.post('/login',(req,res)=>{
    login=true;
    res.redirect('/')
})
app.post('/register',(req,res)=>{
    const {name, email, phno, branch, dob, password}=req.body;
    var sql = "INSERT INTO `user` (`name`, `email`, `phno`, `branch`, `dob`, `password`) VALUES ('"+name+"','"+ email+"','"+ phno+"','"+ branch+"','"+ dob+"','"+ password+"')";
    conn.query(sql, function (err, result) {
        if (err) throw err;
       
    });
})


const port = 4004;

app.listen(port, () => console.log(`Server started on port ${port}`));