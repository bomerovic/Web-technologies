function addGodinaValidacija() {
    var mojDiv=document.getElementById("mojDivPoruke");
    var naziv = document.getElementById("n1");
    var nazivvjezbe= document.getElementById("n2");
    var nazivspirale = document.getElementById("n3");
    var validacija = new Validacija(mojDiv);
    validacija.naziv(naziv);
    validacija.naziv(nazivvjezbe);
    validacija.naziv(nazivspirale);
}

function addGodinaAjax() {
    var ajax = new GodineAjax(document.getElementById('glavniSadrzaj'));
    ajax.osvjezi();
}