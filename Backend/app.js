const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mysql = require('mysql2')
const port = 4000

const app = express()

app.use(bodyParser.json())
app.use(cors())

let db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'survey',
    port:3306
})

db.connect((err)=>{
    if(!err){console.log("DB Connected successfully")}
    else{console.log("DB cannot connected....\n\n",err)}
})

// APIs

app.get('/api',(req,res)=>{ 
    res.sendFile(__dirname+'/template/index.html')
 })


app.get('/',(req,res)=>{
    let qr = 'select * from questions'
    db.query(qr,(err,data)=>{
        if(err){console.log("cannot get data...",err)}
        else{res.send(data)}
    })
})


app.post('/',(req,res)=>{

    let ques1 = req.body.q1
    let ques2 = req.body.q2
    let ques3 = req.body.q3
    let ques4 = req.body.q4
    let ques5 = req.body.q5

    let qr = `insert into questions(q1,q2,q3,q4,q5) values ('${ques1}','${ques2}','${ques3}','${ques4}','${ques5}')`
    db.query(qr,(err,data)=>{
        if(err){console.log("cannot get data...",err)}
        else{res.send(data)}
    })
})

app.listen(port,()=>{
    console.log(`Server listening at port ${port}`)
})