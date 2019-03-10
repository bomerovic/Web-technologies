var ZadaciAjax = (function(){
    var konstruktor = function(callbackFn){
        var a=false,b=false,c=false;
        return {
            dajXML:function(){
                if(a || b || c) callbackFn('{greska:"Već ste uputili zahtjev"}')
                
                a=true;
                var x = new XMLHttpRequest();
                var time = new Date().getTime();
                x.onreadystatechange = function() {
                    if(x.readyState!=4 && new Date().getTime()-time>=2000) {
                        a=false;
                        x.abort();
                        
                    }
                    if(x.readyState == 4 && x.status == 200) {
                        a=false;
                        callbackFn(x.responseText);
                    }
                }
                x.open('GET', 'http://localhost:8080/zadaci', true);
                x.setRequestHeader('Accept', 'application/xml');
                x.send();
            },
            dajCSV:function(){
                if(a || b || c) callbackFn('{greska:"Već ste uputili zahtjev"}')
                
                b=true;
                var x = new XMLHttpRequest();
                var time = new Date().getTime();
                x.onreadystatechange = function() {
                    if(x.readyState!=4 && new Date().getTime()-time>=2000) {
                        b=false;
                        x.abort();
                    }
                    if(x.readyState == 4 && x.status == 200) {
                        b=false;
                        callbackFn(x.responseText);
                    }
                }
                x.open('GET', 'http://localhost:8080/zadaci', true);
                x.setRequestHeader('Accept', 'text/csv');
                x.send();
            },
            dajJSON:function(){
                if(a || b || c) callbackFn('{greska:"Već ste uputili zahtjev"}')
                
                c=true;
                var x = new XMLHttpRequest();
                var time = new Date().getTime();
                x.onreadystatechange = function() {
                    if(x.readyState!=4 && new Date().getTime()-time>=2000) {
                        c=false;
                        x.abort();
                    }
                    if(x.readyState == 4 && x.status == 200) {
                        c=false;
                        callbackFn(x.responseText);
                    }
                }
                x.open('GET', 'http://localhost:8080/zadaci', true);
                x.setRequestHeader('Accept', 'application/json');
                x.send();
            }
        }
    }
    return konstruktor;
    }());