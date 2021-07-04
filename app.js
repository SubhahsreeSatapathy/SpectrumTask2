const express=require('express');
const app=express();
const mysql = require('mysql2');


// const conn = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "root",
//     insecureAuth : true,
//     database: "port"
//   });
  
// conn.connect((err)=>{
// if (err) throw err;
// console.log("DB Connected!");
// });

// conn.query("SELECT * FROM user", function (err, result) {
//     if (err) throw err;
//     console.log(result);
// });

// conn.end();


// EJS
app.set('view engine', 'ejs');

// Public Folder
app.use(express.static('./public'));


app.get('/',(req,res)=>{
     res.render('index',{login:true})
})
app.get('/login',(req,res)=>{
     res.render('index')
})
app.get('/register',(req,res)=>{
     res.render('index')
})
app.get('/logout',(req,res)=>{
     res.render('index')
})


const port = 4004;

app.listen(port, () => console.log(`Server started on port ${port}`));