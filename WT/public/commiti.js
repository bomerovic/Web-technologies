var tabela;

function dodajTabelu() {
    var brojZadataka=document.getElementById('broj');
    tabela=new CommitTabela(document.getElementById('glavni'),brojZadataka.value);
}

function dodajCommit() {
    var rbZadatka=document.getElementById('rednibrojzDodaj');
    var url=document.getElementById("urlDodaj");
    tabela.dodajCommit(rbZadatka.value, url.value);
}

function obrisiCommit() {
    var rbZadatka=document.getElementById('rednibrojzObrisi');
    var rbCommita=document.getElementById('rednibrojcObrisi');

    tabela.obrisiCommit(rbZadatka.value, rbCommita.value);
}

function editujCommit() {
    var rbZadatka=document.getElementById('rednibrojzEdit');
    var rbCommita=document.getElementById('rednibrojcEdit');
    var url=document.getElementById('urlEdit');

    tabela.editujCommit(rbZadatka.value, rbCommita.value, url.value);
}

