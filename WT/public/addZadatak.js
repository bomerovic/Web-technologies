function addZadatakValidacija() {
    var mojDiv=document.getElementById("mojDivPoruke");
    var naziv=document.getElementById("nazivz");
    var validacija = new Validacija(mojDiv);
    validacija.naziv(naziv);
}