function loginValidacija() {
    var mojDiv=document.getElementById("mojDivPoruke");
    var ime=document.getElementById("username");
    var password = document.getElementById("pass");
    var validacija = new Validacija(mojDiv);
    validacija.ime(ime);
    validacija.password(password);
}