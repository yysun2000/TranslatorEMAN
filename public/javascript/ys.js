var ys = {
  one : function(select,doc){
    return doc.querySelector(select)
  },
  all : function(select,doc){
    return doc.querySelectorAll(select)
  },
  ajax : function(url,callback){
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
           if (xmlhttp.status == 200) {
               callback(xmlhttp.responseText);
           }
           else if (xmlhttp.status == 400) {
              alert('There was an error 400');
           }
           else {
               //alert('something else other than 200 was returned');
           }
        }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
  },
  on : function(sel,doc){
    var elements = doc.querySelectorAll(sel);
    return function(evt,callback){
      for(i=0;i<elements.length;i++){
        elements[i].addEventListener(evt,callback);
      }
    }
  }
}
