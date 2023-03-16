const DeclineTransactionTtype = ["WITHDRAWAL",
	    			  "BALANCE INQUIRY","FAST CASH WITHDRAWAL"
];


const atmCondition= (lines,report,find,atmName,eachTotal)=>{
    
    for  (var i=lines.length-1;i>=0;i--){
       
        if(lines[i].includes(find)){
          let Trxn=lines[i].replace(find,'')

          if(Trxn===DeclineTransactionTtype[0]) {
            report[atmName][13]+=1
            eachTotal[13]+=1
          }
               
          else if(Trxn===DeclineTransactionTtype[1]) {
             report[atmName][14]+=1
             eachTotal[14]+=1
            }
          else if(Trxn===DeclineTransactionTtype[2]) {
             report[atmName][15]+=1
             eachTotal[15]+=1
            }

          break
        }
        
      }
      
   
}

const atmConditionForE= (lines,report,find,atmName,total,eachTotal)=>{
  
  for  (var i=lines.length-1;i>=0;i--){
     
      if(lines[i].includes(find)){
        
        let Trxn=lines[i].slice(27,lines[i].length)
        let c=Trxn[0]
        console.log('e*',c);
      
        if(c=='5'){
          let mValue=Trxn[12]+Trxn[13]
          if(mValue!=="00") {
            report[atmName][11]+=1
            total+=1
            eachTotal[11]+=1
          }
        }
      
        break
      }
      
    }
    
 
}
const atmConditionOpcode= (lines,report,atmName,eachTotal)=>{

    const find = "OPCODE = "
    for (var i=lines.length-1;i>=0;i--){
        if(lines[i].includes(find)){
          let opcode=lines[i].slice(24,lines[i].length).replaceAll(" ","")
         
          if(opcode==="AC"|| opcode==="AB"||                    
          opcode==="AAC"||opcode==="AAB"||
          opcode==="ABC"||opcode==="ABB"||
          opcode==="ACC"||opcode==="ACB"||
          opcode==="ADC"||opcode==="ADB") {
          report[atmName][13]+=1
          eachTotal[13]+=1
  }
  else if(opcode==="CC"|| opcode==="CB"||                    
          opcode==="CAC"||opcode==="CAB"||
          opcode==="CBC"||opcode==="CBB"||
          opcode==="CCB"||opcode==="CCC"||
          opcode==="CDC"||opcode==="CDB") {
           

       report[atmName][14]+=1
       eachTotal[14]+=1
      
  }
  else if(opcode==="ABCD"|| opcode==="ABCC") {
       report[atmName][15]+=1
       eachTotal[15]+=1
       console.log('on abcd');
  }     
  
    break
        }
      }
   
}
module.exports={atmCondition,atmConditionOpcode,atmConditionForE}