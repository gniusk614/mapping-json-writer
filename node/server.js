

const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();

const server = require('http').createServer(app);

app.use(express.json())
app.use(express.urlencoded({extended:true}))


// app.update('/settings',) => {

// }

const fs = require('fs');
const { finished } = require('stream');
const { Http } = require('@mui/icons-material');


const saveData = (data) => {

  // var oldData = "";
  // fs.readFile('../src/lib/mappingRule.json','utf-8', (error,readData)=>{
  //   if(error){
  //     console.error("Read error =>"+error)
  //     return;
  //   }
  //   oldData = readData
  //   console.log(oldData)
  // })
  const finished = (error) => {
    if(error){
      console.error("error => "+error)
      return;
    }
  }
  // oldData.put=data
  // console.log(oldData)

  fs.writeFile('../src/lib/mappingRule.json',data,finished)
}



app.use(cors()); // cors 미들웨어를 삽입합니다.


app.put("/api/setting",function(req,res){
  try {
    const jsonData = JSON.stringify(req.body);
    saveData(jsonData);
  } catch (error) {
    console.log('error->'+error.message)
    return res.status(200).json({
      "result" : 'error',
      message : error.message
    })
  }
  return res.status(200).json({
    "result" : 'success',
    message : 'success'
  })
})



app.get('/', (req,res) => { 
  res.send({message:'hello'});
});

server.listen(4000, ()=>{
  console.log('server is running on 4000')
})