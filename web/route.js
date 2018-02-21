const global = require("./../global.js")
const express = require('express');
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


router.get('/update', (req, res) => {
  res.writeHead(200,{"Content-Type":"application/json"});
  var json = JSON.stringify({
    "FORCE_STOP":global.FORCE_STOP,
    "PROCESS":global.PROCESS,
    "COMPLETE":global.COMPLETE,
    "ERROR":global.ERROR,
    "cnt":global.cnt,
    "total":global.total,
    "rest":global.rest
  });
  res.end(json);
});

router.post('/up', upload.single('uploadFile'), (req, res) => {
  res.writeHead(302,{"Location":"process.html"})
  res.end();
});
module.exports = router;
