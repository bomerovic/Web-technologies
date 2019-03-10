var SelectZadatak=(function() {
    var konstruktor = function() {

        return {
            sviZadaci: function(select) {
                var ajax=new XMLHttpRequest();

                ajax.onreadystatechange = function() {
                    if(ajax.status==200 && ajax.readyState==4) {
                        var niz=JSON.parse(ajax.responseText);

                        select.innerHTML="";
                        for(var i=0;i<niz.length;i++) {
                            select.innerHTML+="<option value="+niz[i].id+">"+niz[i].naziv+"</option>";
                        }
                    }
                }

                ajax.open("GET", "http://localhost:8080/zadaci", true);
                ajax.setRequestHeader('Content-Type', 'application/json');
                ajax.send();
            },
            zadaciZaVjezbu: function(select1, select2) {
                var ajax=new XMLHttpRequest();

                ajax.onreadystatechange = function() {
                    if(ajax.status==200 && ajax.readyState==4) {
                        var niz=JSON.parse(ajax.responseText);

                        select2.innerHTML="";
                        for(var i=0;i<niz.length;i++) {
                            select2.innerHTML+="<option value="+niz[i].id+">"+niz[i].naziv+"</option>";
                        }
                    }
                }

                ajax.open("POST", "http://localhost:8080/zadaciKojiNisuPovezaniNaVjezbu", true);
                ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                ajax.send("id="+select1.value);
            }
        };
    }
    return konstruktor;
}());