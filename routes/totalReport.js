const router=require('express').Router();
var moment = require('moment');
var fs=require("fs")
const {processLineByLine}=require('../helper/fileReader')


router.post('/total',(req,res)=>{
  
    const {startDate,endDate}=req.body
    let rootDirectory='C:/Users/USER/Documents/EJFolder/Ej/'
    // console.log('sfromf ',startDate,' efromf ',endDate);
    var a = moment(startDate);
    var b = moment(endDate);

    var report={}
    var total=0
    var eachTotal=Array(16).fill(0)
    count=0
    const time=''
    try{ 
        for (var m = moment(a); m.diff(b, 'days')<=0 ; m.add(1, 'days')) {
        
        const time=m.toString() 
        // console.log('how much ',count);
        count++
        let folderToRead= rootDirectory+m.format('DDMMYYYY')
        console.log('folder to read ',folderToRead);
        const exist=fs.existsSync(folderToRead)
        if(!exist) break;
        const list=fs.readdirSync(folderToRead)

        list.forEach((file,err) => {
          processLineByLine(file,report,folderToRead,total,eachTotal,time)
        });
        
        }
        return res.json({report,eachTotal})

    }
    catch(error){
      res.send(error)
     }

})
module.exports=router