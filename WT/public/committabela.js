var CommitTabela=(function(){

var konstruktor=function(divElement,brojZadataka){
    var tabelaString="<table id=commiti>";
    for(var i=0;i<=brojZadataka;i++) {
        if(i==0) tabelaString+="<tr><th>Zadaci</th><th>Commiti</th></tr>";
        else tabelaString+="<tr><td>Zadatak "+i+"</td><td></td></tr>";
    }
    tabelaString+="</table>";
    divElement.innerHTML+=tabelaString;
    return{
        dodajCommit:function(rbZadatka,url){
            var tabela = document.getElementById("commiti");
            rbZadatka++;
            var maxc=0;
            for(var i=1; i<=brojZadataka; i++) {
                if(tabela.rows[i].cells.length>maxc) maxc=tabela.rows[i].cells.length;
            }
            for(var i = 1; i<=brojZadataka; i++) {
                if(i==rbZadatka) {
                    for(var j=0; j<tabela.rows[i].cells.length; j++) {
                        if(tabela.rows[i].cells[j].innerHTML==='') {     
                            if(tabela.rows[i].cells[j].colSpan==1) {  
                                var el = document.createElement("a");
                                el.href=url;
                                var tekst = document.createTextNode(j);
                                el.appendChild(tekst);
                                tabela.rows[i].cells[j].appendChild(el);
                                return;
                            }
                            else {
                                var el = document.createElement("a");
                                el.href=url;
                                var tekst = document.createTextNode(j);
                                el.appendChild(tekst);
                                tabela.rows[i].cells[j].appendChild(el);
                                tabela.rows[i].cells[j].colSpan=1;
                                tabela.rows[i].insertCell();
                                tabela.rows[i].cells[j+1].colSpan=maxc-j-1;
                                return;
                            }
                        }
                    }
                    for(var j=0; j<=brojZadataka; j++) {
                        if(j!=i) tabela.rows[j].cells[tabela.rows[j].cells.length-1].colSpan++;
                    }
                    tabela.rows[i].insertCell();
                    for(var j=0; j<tabela.rows[i].cells.length; j++) {
                        if(tabela.rows[i].cells[j].innerHTML==='') {
                            var el = document.createElement("a");
                            el.href=url;
                            var tekst = document.createTextNode(j);
                            el.appendChild(tekst);
                            tabela.rows[i].cells[j].appendChild(el);
                        }
                    }
                }
            }
            for(var i=1;i<=brojZadataka;i++) {
                for(var j=1;j<tabela.rows[i].cells.length;j++) {
                    if(tabela.rows[i].cells[j].colSpan>1 && tabela.rows[i].cells[j].innerHTML!='') {
                        tabela.rows[i].cells[j].colSpan=1;
                        if(j<maxc) {
                            tabela.rows[i].insertCell();
                            tabela.rows[i].cells[j+1].colSpan=maxc-(j+1);
                        }
                    }
                }
            }
        },
        editujCommit:function(rbZadatka,rbCommita,url){
            var tabela = document.getElementById("commiti");
            rbZadatka++;
            rbCommita++;
            if(rbZadatka<0 || rbZadatka>tabela.rows.length-1 || rbCommita<0 || rbCommita>tabela.rows[rbZadatka].cells.length-1) return -1;
            tabela.rows[rbZadatka].deleteCell(rbCommita);
            tabela.rows[rbZadatka].insertCell(rbCommita);
            var el = document.createElement("a");
            el.href=url;
            var tekst = document.createTextNode(rbCommita);
            el.appendChild(tekst);
            tabela.rows[rbZadatka].cells[rbCommita].appendChild(el);
        },
        obrisiCommit:function(rbZadatka,rbCommita){
            var tabela = document.getElementById("commiti");
            rbCommita++;
            rbZadatka++;
            if(rbZadatka<0 || rbZadatka>tabela.rows.length || rbCommita<0 || rbCommita>tabela.rows[rbZadatka].cells.length-1) return -1;
            var maxc=0;
            for(var i=1; i<=brojZadataka; i++) {
                if(tabela.rows[i].cells.length>maxc) maxc=tabela.rows[i].cells.length;
            }
            if(tabela.rows[rbZadatka].cells.length==maxc && tabela.rows[rbZadatka].cells[tabela.rows[rbZadatka].cells.length-1].innerHTML!='') {
                var b=0;
                for(var i=1; i<=brojZadataka; i++) {
                    if(tabela.rows[i].cells.length===maxc && tabela.rows[i].cells[tabela.rows[i].cells.length-1].hasChildNodes()) b++;
                }
                tabela.rows[rbZadatka].cells[rbCommita].innerHTML=null;
                tabela.rows[rbZadatka].deleteCell(rbCommita);
                if(b==1) {
                    for(var i=0; i<=brojZadataka; i++) {
                        tabela.rows[i].cells[tabela.rows[i].cells.length-1].colSpan--;
                        if(tabela.rows[i].cells.length===maxc) {
                            tabela.rows[i].cells[tabela.rows[i].cells.length-1].innerHTML=null;
                            tabela.rows[i].deleteCell(tabela.rows[i].cells.length-1);
                        }
                    }
                    maxc--;
                }
                else {
                    tabela.rows[rbZadatka].insertCell();
                }
            }
            else {
                if(tabela.rows[rbZadatka].cells[rbCommita].innerHTML!='') {
                    tabela.rows[rbZadatka].cells[rbCommita].innerHTML=null;
                    tabela.rows[rbZadatka].deleteCell(rbCommita);
                    tabela.rows[rbZadatka].cells[tabela.rows[rbZadatka].cells.length-1].colSpan++;
                }
            }
        }
    }
}
return konstruktor;
}());

