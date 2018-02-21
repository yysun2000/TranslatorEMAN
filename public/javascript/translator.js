function TranslatorManager(){
  this.FORCE_STOP = false;
  this.PROCESS = false;
  this.COMPLETE = false;
  this.cnt = 0;
  this.total = 0;
  this.rest = 0;
  this.ERROR = "";
  this.update();
}

TranslatorManager.prototype.update = function(){
  function update(dat){
    var data = JSON.parse(dat);
    this.FORCE_STOP = data.FORCE_STOP;
    this.PROCESS = data.PROCESS;
    this.COMPLETE = data.COMPLETE;
    this.cnt = data.cnt;
    this.total = data.total;
    this.rest = data.rest;
    this.ERROR = data.ERROR;
  }
  ys.ajax("/update",update.bind(this))
}
