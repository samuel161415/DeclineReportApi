const router=require('express').Router();
var moment = require('moment');
var fs=require("fs")
const {processLineByLine}=require('../helper/fileReader')


router.post('/total',(req,res)=>{


    const {startDate,endDate}=req.body
    let rootDirectory='C:/Users/USER/Documents/EJFolder/Ej/'
    var a = moment(startDate);
    var b = moment(endDate);
    var report={}
    var total=0
    var eachTotal=Array(16).fill(0)
    count=0

    try{ 
        for (var m = moment(a); m.diff(b, 'days')<=0 ; m.add(1, 'days')) {
          
        count++
        let folderToRead= rootDirectory+m.format('DDMMYYYY')
        const exist=fs.existsSync(folderToRead)
        if(!exist) break;
        const list=fs.readdirSync(folderToRead)
        console.log('filelist',list);

        list.forEach((file,err) => {
          processLineByLine(file,report,folderToRead,total,eachTotal)
        });
        
        }
        console.log('done');
        return res.json({report,eachTotal})
      // setTimeout(() => {
      //   console.log('count',count)
      //   return res.json(report)
      // },count*5000);

          
    }
    catch(error){
      res.send(error)
     }

})
module.exports=router