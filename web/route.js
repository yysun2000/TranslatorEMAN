const global = require("./../global.js")
const express = require('express');
const translate = require("./../translate");
const fs = require('fs');
const multer = require('multer');
// 기타 express 코드
const storage = multer.diskStorage({
  destination: function (req, file, cb){
    cb(null, './files/') // cb 콜백함수를 통해 전송된 파일 저장 디렉토리 설정
  },
  filename: function (req, file, cb){
    cb(null, file.originalname) // cb 콜백함수를 통해 전송된 파일 이름 설정
  }
})
const upload = multer({ storage: storage });
const router = express.Router();

router.get("/",(req,res)=>{
  if(global.PROCESS){

    fs.readFile('./public/process.html',(error,data) => {
      res.writeHead(200,{"Content-Type":"text/html"})
      res.end(data,(error)=>{
        console.log(error);
      });
    })

  }else{
    fs.readFile('./public/index.html',(error,data) => {
      res.writeHead(200,{"Content-Type":"text/html"})
      res.end(data,(error)=>{
        console.log(error);
      });
    })
  }

})

function update(res){
  res.writeHead(200,{"Content-Type":"application/json"});
  var json = JSON.stringify({
    "FORCE_STOP":global.FORCE_STOP,
    "PROCESS":global.PROCESS,
    "COMPLETE":global.COMPLETE,
    "DOWNLOAD_URL":global.DOWNLOAD_URL,
    "STARTDATE":global.STARTDATE,
    "COMPLETEDATE":global.COMPLETEDATE,
    "ERROR":global.ERROR,
    "cnt":global.cnt,
    "total":global.total,
    "rest":global.rest
  });
  res.end(json);
}

router.get('/update', (req, res) => {
  update(res);
});

router.get('/stop', (req, res) => {
  global.FORCE_STOP = true;
  update(res);
});

router.get('/reset', (req, res) => {
  console.log("reset")
  global.PROCESS = false;
  global.FORCE_STOP = false;
  global.COMPLETE = false;
  global.ERROR = "";
  global.DOWNLOAD_URL = "";
  res.writeHead(302,{"Location":"index.html"})
  res.end();
});

router.post('/up', upload.single('uploadFile'), (req, res) => {
  res.writeHead(302,{"Location":"process.html"})
  res.end();
  console.log(req.file.path);
  translate({inputfilename:req.file.path,jsonfilename:req.file.filename+".json"})
});
module.exports = router;
