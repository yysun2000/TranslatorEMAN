function TranslatorManager(){
  this.FORCE_STOP = false;
  this.PROCESS = false;
  this.COMPLETE = false;
  this.DOWNLOAD_URL = "";
  this.cnt = 0;
  this.total = 0;
  this.rest = 0;
  this.ERROR = "";
  this.update();
}

function update(dat){
  var data = JSON.parse(dat);
  this.FORCE_STOP = data.FORCE_STOP;
  this.PROCESS = data.PROCESS;
  this.COMPLETE = data.COMPLETE;
  this.DOWNLOAD_URL = data.DOWNLOAD_URL;
  this.STARTDATE = data.STARTDATE;
  this.COMPLETEDATE = data.COMPLETEDATE;
  this.ERROR = data.ERROR;
  this.cnt = data.cnt;
  this.total = data.total;
  this.rest = data.rest;
}

TranslatorManager.prototype.update = function(){
  ys.ajax("/update",update.bind(this))
}

TranslatorManager.prototype.stop = function(){
  if(confirm("번역 진행 또는 완료된 파일이 삭제됩니다.\n정말 취소 하시겠습니까?")==true){
    ys.ajax("/stop",update.bind(this));
  }
}
TranslatorManager.prototype.reset = function(){
  if(confirm("번역 진행 또는 완료된 파일이 삭제됩니다.\n정말 취소 하시겠습니까?")==true){
    ys.ajax("/reset",function(){location.href="/"});
  }
}
