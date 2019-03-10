function addStudentValidacija() {
    var mojDiv=document.getElementById("mojDivPoruke");
    var ime = document.getElementById("namee");
    var index= document.getElementById("brindexa"); 
    var validacija = new Validacija(mojDiv);
    validacija.ime(ime);
    validacija.index(index);
}

var bitbucket;
var niz;
var godina;

function ucitaj() {
    var ajaxGodine1=new SelectGodina(document.getElementById("combobox1"));
}

function bitbucket() {
    bitbucket=new BitBucket(document.getElementById("namee").value, document.getElementById("brindexa").value);
    godina();
    console.log(godina);
    bitbucket.ucitaj(godina.nazivRepSpi, godina.nazivRepVje, ispisi);
    document.getElementById("b1").disabled=false;
}

function godina() {
    var ajax=new XMLHttpRequest();
    ajax.onreadystatechange=function() {
        if(ajax.readyState==4 && ajax.status==200) {
            godina=JSON.parse(ajax.responseText);
        }
    }
    ajax.open("GET", "http://localhost:8080/jednaGodina?id="+document.getElementById("combobox1").value, false);
    ajax.setRequestHeader("Content-Type", "application/json");
    ajax.send();
}

function ispisi(greska,x) {
    if(greska==null) {
        console.log(JSON.stringify(x));
        niz=x;
    }
    else {
        alert(greska);
    }
}

function zahtjev() {
    var ajax=new XMLHttpRequest();
    ajax.onreadystatechange = function() {
        if(ajax.readyState==4 && ajax.status==200) {
            alert(JSON.parse(ajax.responseText).message);
        }
    }
    ajax.open("POST", "http://localhost:8080/student", true);
    ajax.setRequestHeader("Content-Type", "application/json");
    ajax.send(JSON.stringify({godina: godina.id, studenti: niz}));
}