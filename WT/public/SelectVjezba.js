var SelectVjezba=(function() {
    var konstruktor = function(select) {
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

        ajax.open("GET", "http://localhost:8080/vjezbe", false);
        ajax.setRequestHeader('Content-Type', 'application/json');
        ajax.send();

        return {};
    }
    return konstruktor;
}());