const global = require("./../global.js")
const DataManager = require("./../util/datamanager.js");
const xlsxj = require("xlsx-to-json");
const json2xls = require('json2xls');
const translate = require('google-translate-api');
const fs = require('fs');
const sleep = require('sleep');

console.log("start");

function clone(obj) {
  if (obj === null || typeof(obj) !== 'object')
  return obj;
  var copy = obj.constructor();
  for (var attr in obj) {
    if (obj.hasOwnProperty(attr)) {
      copy[attr] = obj[attr];
    }
  }
  return copy;
}

module.exports = function(option){
  xlsxj({
    input: option.inputfilename,
    output: "./files/"+option.jsonfilename,
    sheet: "sheet1"
  }, async function(err, result) {
    if(global.PROCESS == false){
      global.FORCE_STOP = false;
      global.PROCESS = true;
      var ret = [];
      var tresult = "";
      var resultArray = [];

      if(err) {
        console.error(err);
      }else {
        var test = "";
        var total = clone(result);

        var all = total.length;
        var cnt = 0; //
        var gcnt = 0; // 번역된 수

        var currentPos = 0;
        var div = 50; // 번역하는 수
        var cutCnt = 1000; // 파일 자르는수
        var test = ""
        var fileNo = 1;
        var fileName = function(){
          var test = new DataManager().text;
          return './files/'+option.inputfilename+"_"+test+"_"+fileNo+'.xlsx';
        }
        while(global.FORCE_STOP == false && total.length > 0){
          console.log(global.FORCE_STOP);
          /*
          ** 기본로직

          1) test에 50개까지 쌓는다.
          2) 쌓이면 50개를 번역후 다시 50개를 쌓는다.

          */
          var flag = "";
          var target = total.shift();
          var tran = target["판매상품명"];

          var regex = /\//gi
          test += target["판매상품코드"]+ "\n" +tran.replace(regex,"|")+"\n\n";
          //console.log(result[i]["판매상품명"] + " // "+result[i]["판매상품코드"])


          if(currentPos >= div){
            currentPos = 0;
            console.log(ret.length);
            await translate(test, {to: 'en'}).then(res => {
                //tresult += (res.text);
                var part = res.text.split("\n\n");
                for(i=0;i<part.length;i++){
                  if(( gcnt % cutCnt ) == 0 && gcnt > 0){
                    var xls = json2xls(ret);
                    fs.writeFileSync(fileName(), xls, 'binary');
                      console.log("Print file. " + fileNo);
                    (fileNo++);
                    ret = [];
                  }

                  var ele = part[i].split("\n");
                  //console.log(i + " : " + ele[0]);
                  ret.push({"판매상품코드":ele[0],"원본명":result[gcnt]["판매상품명"],"판매상품명":ele[1]});
                  gcnt++;
                }

                //=> I speak English
                test = "";
                console.log("번역!");
                //=> nl
            }).catch(err => {
                global.FORCE_STOP=true;
                console.error(err);
            });
            flag = "put";
          }

          console.log(`${cnt}/${all} :: ${total.length} :: ${currentPos} >>>> ${flag}`);
          global.cnt = cnt;
          global.total = all;
          global.rest = total.length;
          currentPos++;
          await cnt++;
        }
        if(test !== ""){
          /*
          test에 남아있는 경우 번역후에 파일로 만든다.
          */
          await translate(test, {to: 'en'}).then(res => {
            console.log("짬처리");
              var part = res.text.split("\n\n");
              for(i=0;i<part.length;i++){
                /*
                if(i==part.length-1 && gcnt > 0){
                  var xls = json2xls(ret);
                  fs.writeFileSync(fileName(), xls, 'binary');
                    console.log("Print file. " + fileNo);
                  (fileNo++);
                  ret = [];
                }*/

                var ele = part[i].split("\n");
                //console.log(i + " : " + ele[0]);
                ret.push({"판매상품코드":ele[0],"원본명":result[gcnt]["판매상품명"],"판매상품명":ele[1]});
                gcnt++;
              }

              test = "";
              //=> nl
          }).catch(err => {
              global.FORCE_STOP=true;
              console.error(err);
          });
        }
        if(ret.length > 0){
          var xls = json2xls(ret);
          fs.writeFileSync(fileName(), xls, 'binary');
          console.log("Print file. " + fileNo);
          (fileNo++);
        }
      }
      exports.COMPLETE = true;
    }

  });

}
