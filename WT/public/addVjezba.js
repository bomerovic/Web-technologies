function addVjezbaValidacija() {
    var mojDiv=document.getElementById("mojDivPoruke");
    var naziv = document.getElementById("nazivV");
    var validacija = new Validacija(mojDiv);
    validacija.naziv(naziv);
}

function ucitaj() {
    var ajaxGodine1=new SelectGodina(document.getElementById("combobox1"));
    var ajaxGodine2=new SelectGodina(document.getElementById("combobox3"));
    var ajaxVjezbe1=new SelectVjezba(document.getElementById("combobox2"));  
    var ajaxVjezbe2=new SelectVjezba(document.getElementById("combobox4"));
    var ajaxZadaci=new SelectZadatak();
    ajaxZadaci.zadaciZaVjezbu(document.getElementById("combobox4"), document.getElementById("combobox5"));
}

function zadaci() {
    ajaxZadaci.zadaciZaVjezbu(document.getElementById("combobox4"), document.getElementById("combobox5"));
}

function zahtjev() {
    var forma=document.getElementById("treca");
    forma.action="http://localhost:8080/vjezba/"+document.getElementById("combobox4").value+"/zadatak";
}
