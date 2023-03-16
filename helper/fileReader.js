const {atmCondition,atmConditionOpcode,atmConditionForE}=require('./atmConditions')
var fs=require("fs")
var moment = require('moment');
const DeclineCondtitions=["STATUS: CODE 116 DESC. INSUFFICIENT FUNDS",
	    			  	"STATUS: CODE 117 DESC. INCORRECT PIN",
	    			  	"STATUS: CODE 400 DESC.",
	    			  	"HOST TX TIMEOUT",
	    				"STATUS: CODE 121 DESC. WITHDRAWAL LMT EXCEEDED",
	    			  "STATUS: CODE107 DESC CONTACT ISSUER",
	    			  "STATUS: CODE 206 DESC. PIN TRIES EXCEEDED CAP",
	    			 	"STATUS: CODE 114 DESC. NO ACCOUNT", 
	    			 	"STATUS: CODE 907 DESC.",
	    			 	"STATUS: CODE 201 DESC. EXPIRED CARD CAP",
	    			 	"EXTERNAL AUTHENTICATE: NO ARPC",
               "*E*",
	    			 	"    POWER INTERRUPTION DURING",
	    			 	
	    			 	"WITHDRAWAL",
	    			 	"BALANCE INQUIRY",
	    			 	"FAST CASH WITHDRAWAL"
	    			 	
];
const DeclineTransactionTtype = ["WITHDRAWAL",
	    			  "BALANCE INQUIRY","FAST CASH WITHDRAWAL"
];
  
async function processLineByLine(file,report,folderToRead,total,eachTotal,time) {

  const lines=[]
  let totalName=file.split('.')[0]
  let atmName= totalName.slice(11,totalName.length)
  // console.log('moment : ',time);
  //  console.log('moment : ',moment(time),' atm names',moment(totalName.slice(0,10)),' m : ',moment(time).subtract(1,));
  //  console.log(moment(totalName.slice(0,10)).toString()===moment(time).subtract(1,'days').toString());

  if(moment(totalName.slice(0,10)).toString()===moment(time).subtract(1,'days').toString()){
    if(!(atmName in report)){
      report[atmName]=Array(16).fill(0)
    }
  
      let prev=" "
  
      const allFileContents = fs.readFileSync(folderToRead+'/'+file, 'utf-8');

      let prevIdx=0
      let count=0
      
      allFileContents.split(/\r?\n/).forEach(line =>  {
   
        
        const find = "TRANSACTION TYPE: ";
        if (line.includes(find)||line.includes("OPCODE = "))
          lines.push(line.toString())
        if(line.toString()===DeclineCondtitions[0]){
          report[atmName][0]+=1
          total+=1
          eachTotal[0]+=1
          atmCondition(lines,report,find,atmName,eachTotal)
        }
  
       else if(line.toString()===DeclineCondtitions[1]){
        report[atmName][1]+=1
        total+=1
        eachTotal[1]+=1
        atmCondition(lines,report,find,atmName,eachTotal)
       }
  
       else if(line.toString()===DeclineCondtitions[2]){
         report[atmName][2]+=1
         total+=1
         eachTotal[2]+=1
         atmCondition(lines,report,find,atmName,eachTotal)
       }
  
       else if(line.toString()===DeclineCondtitions[3]){
         report[atmName][3]+=1
         total+=1
         eachTotal[3]+=1
         atmCondition(lines,report,find,atmName,eachTotal)
       }
  
       else if(line.toString()===DeclineCondtitions[4]){
         report[atmName][4]+=1
         total+=1
         eachTotal[4]+=1
         atmCondition(lines,report,find,atmName,eachTotal)
         total+=1
       }
  
       else if(line.toString()===DeclineCondtitions[5]){
         report[atmName][5]+=1
         total+=1
         eachTotal[5]+=1
         atmCondition(lines,report,find,atmName,eachTotal)
       }
  
       else if(line.toString()===DeclineCondtitions[6]){
         report[atmName][6]+=1
         total+=1
         eachTotal[6]+=1
         atmCondition(lines,report,find,atmName,eachTotal)
       }
  
       else if(line.toString()===DeclineCondtitions[7]){
        report[atmName][7]+=1
        total+=1
        eachTotal[7]+=1
         atmCondition(lines,report,find,atmName,eachTotal)
       }
  
       else if(line.toString()===DeclineCondtitions[8]){
         report[atmName][8]+=1
         total+=1
         eachTotal[8]+=1
         atmCondition(lines,report,find,atmName,eachTotal)
       }
       
        else if(line.toString()===DeclineCondtitions[9]){
         report[atmName][9]+=1
         total+=1
         eachTotal[9]+=1
         atmConditionOpcode(lines,report,atmName,eachTotal)
       }
  
       else if(line.toString()===(DeclineCondtitions[10])){
           prevIdx=count
                
       }
       
       else if(line.toString().includes(DeclineCondtitions[11])){
        const findd= "*E*"
        atmConditionForE(lines,report,findd,atmName,total,eachTotal)
        
     
       }
       else if(prev.includes(DeclineCondtitions[12]) &&line.includes("TRANSACTION END") ){
            //console.log('cond12');
            report[atmName][12]+=1
            total+=1
            eachTotal[12]+=1
        }
      else if(line.includes("TRANSACTION END") && count-prevIdx===3){
        report[atmName][10]+=1
        total+=1
        eachTotal[10]+=1
        atmCondition(lines,report,find,atmName,eachTotal)
         
      }
        prev=line
        count++
      });
  }

  }


  module.exports={processLineByLine}