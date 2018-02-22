const global = require("./global.js")
const translate = require("./translate");
const web = require("./web")

web.listen(2424,(req,res)=>{
  /*
  translate({inputfilename:"./test/한글.xlsx",jsonfilename:"./한글_result.json"})*/
  console.log("DONE!");
})
