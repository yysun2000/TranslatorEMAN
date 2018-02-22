module.exports = function(){

    var d;
    this.date = new Date();
    d = this.date;

    this.year = d.getFullYear();
    this.month = convertOnecharToTwochar(d.getMonth() + 1);
    this.day = convertOnecharToTwochar(d.getDate());
    this.h = convertOnecharToTwochar(d.getHours());
    this.m = convertOnecharToTwochar(d.getMinutes());
    this.s = convertOnecharToTwochar(d.getSeconds());


    this.datetime = (this.year+ "-" +this.month+"-"+this.day+" "+this.h+":"+this.m+":"+this.s);
    this.text = (this.year + this.month + this.day + this.h + this.m + this.s);
}


function convertOnecharToTwochar(data){
  if(data.toString().length == 1){
    return "0"+data;
  }else{
    return data;
  }
}
