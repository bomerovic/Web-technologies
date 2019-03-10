var GodineAjax = (function(){
    var konstruktor = function(divSadrzaj){
        var ajax = new XMLHttpRequest();
        var niz2 = [];
        ajax.onreadystatechange = function() {
            if(ajax.readyState==4 && ajax.status==200) {
                var niz = JSON.parse(ajax.responseText);
                for(var i=0; i<niz.length; i++) {
                    niz2.push(niz[i].nazivGod);
                    divSadrzaj.innerHTML+='<div class="godina"> <p>Naziv godine: '+
                    niz[i].nazivGod+'</p> <p> Naziv repozitorija vjezbe: '+
                    niz[i].nazivRepVje+'</p> <p> Naziv repozitorija spirale: '+
                    niz[i].nazivRepSpi+'</p> </div>';
                }
            }
        }

        ajax.open('GET', 'http://localhost:8080/godine', true);
        ajax.setRequestHeader('Content-Type', 'application/json');
        ajax.send();
        return {
            osvjezi:function(){
                var ajax = new XMLHttpRequest();

                ajax.onreadystatechange = function() {
                    if(ajax.readyState==4 && ajax.status==200) {
                        var niz = JSON.parse(ajax.responseText);
                        for(var i=0; i<niz.length; i++) {
                            var bool = false;
                            for(var j=0; j<niz2.length; j++) {
                                if(niz2[j] == niz[i].nazivGod) {
                                    bool = true;
                                }
                            }
                            if(bool) continue;
                            divSadrzaj.innerHTML+='<div class="godina"> <p>Naziv godine: '+
                            niz[i].nazivGod+'</p> <p> Naziv repozitorija vjezbe: '+
                            niz[i].nazivRepVje+'</p> <p> Naziv repozitorija spirale: '+
                            niz[i].nazivRepSpi+'</p> </div>';
                        }
                    }
                }       

                ajax.open('GET', 'http://localhost:8080/godine', true);
                ajax.setRequestHeader('Content-Type', 'application/json');
                ajax.send();
            }
        }
    }
    return konstruktor;
}());