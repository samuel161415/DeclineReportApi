const express=require("express")
const app=express()
const cors=require('cors')
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({
    extended: true
  }));

const totalReport=require('./routes/totalReport')

app.use('/api',totalReport)

app.listen(process.env.PORT||5000,()=>{
    console.log("app is listning!");
})