var Validacija=(function(){

var konstruktor=function(divElementPoruke){
    var error=divElementPoruke;
    error.innerHTML="";

    var imevalidacija=true;
    var nazivvalidacija=true;
    var godinavalidacija=true;
    var repozvalidacija=true;
    var indexvalidacija=true;
    var passwordvalidacija=true;
    var urlvalidacija=true;
    return{
        ime:function(inputElement){
            var ime=/^([A-Z][a-zA-Z]*[']?[A-Za-z]*[\s-]?){0,3}([A-Z][a-zA-Z]*[']?[A-Za-z]+){1}$/;
            var rezultat=ime.test(inputElement.value); 
            if(!rezultat) {
                inputElement.style.backgroundColor="orangered";
                imevalidacija=false;
                error.innerHTML="Sljedeća polja nisu validna:ime";
                if(!nazivvalidacija) error.innerHTML+=",naziv";
                if(!godinavalidacija) error.innerHTML+=",godina";
                if(!repozvalidacija) error.innerHTML+=",repozitorij";
                if(!indexvalidacija) error.innerHTML+=",index";
                if(!passwordvalidacija) error.innerHTML+=",password";
                if(!urlvalidacija) error.innerHTML+=",url";
                error.innerHTML+="!";
            }
            else {
                inputElement.style.backgroundColor="white";
                imevalidacija=true;
                error.innerHTML="Sljedeća polja nisu validna:";
                if(!nazivvalidacija) error.innerHTML+=",naziv";
                if(!godinavalidacija) error.innerHTML+=",godina";
                if(!repozvalidacija) error.innerHTML+=",repozitorij";
                if(!indexvalidacija) error.innerHTML+=",index";
                if(!passwordvalidacija) error.innerHTML+=",password";
                if(!urlvalidacija) error.innerHTML+=",url";
                error.innerHTML+="!";
                var i=error.innerHTML.indexOf(":");
                if(error.innerHTML.charAt(i+1)=="!") error.innerHTML="";
                else {
                    i++;
                    error.innerHTML=error.innerHTML.substring(0,i)+error.innerHTML.substring(i+1,error.innerHTML.length);
                }
            }
        },
        godina:function(inputElement){
            var string = String(inputElement.value);
            var a= string.substring(2,4), b =string.substring(7,9);
            if(string.length==9 && string[4]=='/' && string[0]=='2' && string[1]=='0' && string[5]=='2' && string[6]=='0' && (parseInt(a)+1 == parseInt(b))) {
                inputElement.style.backgroundColor="white";
                godinavalidacija=true;
                error.innerHTML="Sljedeća polja nisu validna:";
                if(!nazivvalidacija) error.innerHTML+=",naziv";
                if(!imevalidacija) error.innerHTML+=",ime";
                if(!repozvalidacija) error.innerHTML+=",repozitorij";
                if(!indexvalidacija) error.innerHTML+=",index";
                if(!passwordvalidacija) error.innerHTML+=",password";
                if(!urlvalidacija) error.innerHTML+=",url";
                error.innerHTML+="!";
                var i=error.innerHTML.indexOf(":");
                if(error.innerHTML.charAt(i+1)=="!") error.innerHTML="";
                else {
                    i++;
                    error.innerHTML=error.innerHTML.substring(0,i)+error.innerHTML.substring(i+1,error.innerHTML.length);
                }
            }
            else {
                inputElement.style.backgroundColor="orangered";
                godinavalidacija=false;
                error.innerHTML="Sljedeća polja nisu validna:godina";
                if(!nazivvalidacija) error.innerHTML+=",naziv";
                if(!imevalidacija) error.innerHTML+=",ime";
                if(!repozvalidacija) error.innerHTML+=",repozitorij";
                if(!indexvalidacija) error.innerHTML+=",index";
                if(!passwordvalidacija) error.innerHTML+=",password";
                if(!urlvalidacija) error.innerHTML+=",url";
                error.innerHTML+="!";
            }

        },
        repozitorij:function(inputElement,regex){
            var rezultat = regex.test(inputElement.value);
            if(!rezultat) {
                inputElement.style.backgroundColor="orangered";
                repozvalidacija=false;
                error.innerHTML="Sljedeća polja nisu validna:repozitorij";
                if(!nazivvalidacija) error.innerHTML+=",naziv";
                if(!godinavalidacija) error.innerHTML+=",godina";
                if(!imevalidacija) error.innerHTML+=",ime";
                if(!indexvalidacija) error.innerHTML+=",index";
                if(!passwordvalidacija) error.innerHTML+=",password";
                if(!urlvalidacija) error.innerHTML+=",url";
                error.innerHTML+="!";
            }
            else {
                inputElement.style.backgroundColor="white";
                repozvalidacija=true;
                error.innerHTML="Sljedeća polja nisu validna:";
                if(!nazivvalidacija) error.innerHTML+=",naziv";
                if(!godinavalidacija) error.innerHTML+=",godina";
                if(!imevalidacija) error.innerHTML+=",ime";
                if(!indexvalidacija) error.innerHTML+=",index";
                if(!passwordvalidacija) error.innerHTML+=",password";
                if(!urlvalidacija) error.innerHTML+=",url";
                error.innerHTML+="!";
                var i=error.innerHTML.indexOf(":");
                if(error.innerHTML.charAt(i+1)=="!") error.innerHTML="";
                else {
                    i++;
                    error.innerHTML=error.innerHTML.substring(0,i)+error.innerHTML.substring(i+1,error.innerHTML.length);
                }
            }

        },
        index:function(inputElement){
            var string = String(inputElement.value);
            var a = string.substring(0,2);

            if(string.length==5 && (parseInt(a)>=14 && parseInt(a)<=20)) {
                inputElement.style.backgroundColor="white";
                indexvalidacija=true;
                error.innerHTML="Sljedeća polja nisu validna:";
                if(!nazivvalidacija) error.innerHTML+=",naziv";
                if(!imevalidacija) error.innerHTML+=",ime";
                if(!repozvalidacija) error.innerHTML+=",repozitorij";
                if(!godinavalidacija) error.innerHTML+=",godina";
                if(!passwordvalidacija) error.innerHTML+=",password";
                if(!urlvalidacija) error.innerHTML+=",url";
                error.innerHTML+="!";
                var i=error.innerHTML.indexOf(":");
                if(error.innerHTML.charAt(i+1)=="!") error.innerHTML="";
                else {
                    i++;
                    error.innerHTML=error.innerHTML.substring(0,i)+error.innerHTML.substring(i+1,error.innerHTML.length);
                }
            }
            else {
                inputElement.style.backgroundColor="orangered";
                indexvalidacija=false;
                error.innerHTML="Sljedeća polja nisu validna:index";
                if(!nazivvalidacija) error.innerHTML+=",naziv";
                if(!imevalidacija) error.innerHTML+=",ime";
                if(!repozvalidacija) error.innerHTML+=",repozitorij";
                if(!godinavalidacija) error.innerHTML+=",godina";
                if(!passwordvalidacija) error.innerHTML+=",password";
                if(!urlvalidacija) error.innerHTML+=",url";
                error.innerHTML+="!";
            }


        },
        naziv:function(inputElement){
            var string = String(inputElement.value);
            var brojSlova=0, ne=0;
            if(!(string[0]>='A' && string[0]<='Z') && !(string[0]>='a' && string[0]<='z') && !(string[string.length-1]>='0' && string[string.length-1]<='9') && !(string[string.length-1]>='a' && string[string.length-1]<='z')) ne=1;
            for(var i=0; i<string.length; i++) {
                if((string[i]>='A' && string[i]<='Z') || (string[i]>='a' && string[i]<='z')) brojSlova++;
                else if(!(string[i]>='A' && string[i]<='Z') && !(string[i]>='a' && string[i]<='z') && !(string[i]>='0' && string[i]<='9') && string[i]!='/' && string[i]!='-' && string[i]!='"' && string[i]!='!' && string[i]!='?' && string[i]!=';' && string[i]!=':' && string[i]!=',' && string[i]!=92 && string[i]!=39) ne=1;
            }
    
            if(brojSlova<3 || ne==1) {
                inputElement.style.backgroundColor="orangered";
                nazivvalidacija=false;
                error.innerHTML="Sljedeća polja nisu validna:naziv";
                if(!passwordvalidacija) error.innerHTML+=",password";
                if(!godinavalidacija) error.innerHTML+=",godina";
                if(!repozvalidacija) error.innerHTML+=",repozitorij";
                if(!indexvalidacija) error.innerHTML+=",index";
                if(!imevalidacija) error.innerHTML+=",ime";
                if(!urlvalidacija) error.innerHTML+=",url";
                error.innerHTML+="!";
            }
            else {
                inputElement.style.backgroundColor="white";
                nazivvalidacija=true;
                error.innerHTML="Sljedeća polja nisu validna:";
                if(!passwordvalidacija) error.innerHTML+=",password";
                if(!godinavalidacija) error.innerHTML+=",godina";
                if(!repozvalidacija) error.innerHTML+=",repozitorij";
                if(!indexvalidacija) error.innerHTML+=",index";
                if(!imevalidacija) error.innerHTML+=",ime";
                if(!urlvalidacija) error.innerHTML+=",url";
                error.innerHTML+="!";
                var i=error.innerHTML.indexOf(":");
                if(error.innerHTML.charAt(i+1)=="!") error.innerHTML="";
                else {
                    i++;
                    error.innerHTML=error.innerHTML.substring(0,i)+error.innerHTML.substring(i+1,error.innerHTML.length);
                }
            }
            
            
        },
        password:function(inputElement){
            var string = String(inputElement.value);
            var veliko=0, malo=0, broj=0, ne=0;
            if(string.length<8) ne=1;
            for(var i = 0; i<string.length; i++) {
                if(!(string[i]>='A' && string[i]<='Z') && !(string[i]>='a' && string[i]<='z') && !(string[i]>='0' && string[i]<='9')) ne=1;
                else if(string[i]>='A' && string[i]<='Z') veliko=1;
                else if(string[i]>='a' && string[i]<='z') malo=1;
                else if(string[i]>='0' && string[i]<='9') broj=1;
            }
            if(ne==1 || (!(veliko==0 && malo==1 && broj==1) && !(veliko==1 && malo==1 && broj==0) && !(veliko==1 && malo==0 && broj==1) && !(veliko==1 && malo==1 && broj==1))) {
                inputElement.style.backgroundColor="orangered";
                passwordvalidacija=false;
                error.innerHTML="Sljedeća polja nisu validna:password";
                if(!nazivvalidacija) error.innerHTML+=",naziv";
                if(!godinavalidacija) error.innerHTML+=",godina";
                if(!repozvalidacija) error.innerHTML+=",repozitorij";
                if(!indexvalidacija) error.innerHTML+=",index";
                if(!imevalidacija) error.innerHTML+=",ime";
                if(!urlvalidacija) error.innerHTML+=",url";
                error.innerHTML+="!";
            }
            else {
                inputElement.style.backgroundColor="white";
                passwordvalidacija=true;
                error.innerHTML="Sljedeća polja nisu validna:";
                if(!nazivvalidacija) error.innerHTML+=",naziv";
                if(!godinavalidacija) error.innerHTML+=",godina";
                if(!repozvalidacija) error.innerHTML+=",repozitorij";
                if(!indexvalidacija) error.innerHTML+=",index";
                if(!imevalidacija) error.innerHTML+=",ime";
                if(!urlvalidacija) error.innerHTML+=",url";
                error.innerHTML+="!";
                var i=error.innerHTML.indexOf(":");
                if(error.innerHTML.charAt(i+1)=="!") error.innerHTML="";
                else {
                    i++;
                    error.innerHTML=error.innerHTML.substring(0,i)+error.innerHTML.substring(i+1,error.innerHTML.length);
                }
            }
        },
        url:function(inputElement){
            var re = /^(https|ftp|http|ssh)\:\/\/([a-z0-9]+([-]*[a-z0-9]+)*(\.[a-z0-9]+([-]*[a-z0-9]+)*)*)+(\/[a-z0-9]+([-]*[a-z0-9]+)*)*(\?([a-z0-9]+([-]*[a-z0-9]+)*\=[a-z0-9]+([-]*[a-z0-9]+)(\&[a-z0-9]+([-]*[a-z0-9]+)*\=[a-z0-9]+([-]*[a-z0-9]+)*)*)+)*$/;
            var rezultat = re.test(inputElement.value);
            if(!rezultat) {
                inputElement.style.backgroundColor="orangered";
                urlvalidacija=false;
                error.innerHTML="Sljedeća polja nisu validna:url";
                if(!nazivvalidacija) error.innerHTML+=",naziv";
                if(!godinavalidacija) error.innerHTML+=",godina";
                if(!imevalidacija) error.innerHTML+=",ime";
                if(!indexvalidacija) error.innerHTML+=",index";
                if(!passwordvalidacija) error.innerHTML+=",password";
                if(!repozvalidacija) error.innerHTML+=",repozitorij";
                error.innerHTML+="!";
            }
            else {
                inputElement.style.backgroundColor="white";
                urlvalidacija=true;
                error.innerHTML="Sljedeća polja nisu validna:";
                if(!nazivvalidacija) error.innerHTML+=",naziv";
                if(!godinavalidacija) error.innerHTML+=",godina";
                if(!imevalidacija) error.innerHTML+=",ime";
                if(!indexvalidacija) error.innerHTML+=",index";
                if(!passwordvalidacija) error.innerHTML+=",password";
                if(!repozvalidacija) error.innerHTML+=",repozitorij";
                error.innerHTML+="!";
                var i=error.innerHTML.indexOf(":");
                if(error.innerHTML.charAt(i+1)=="!") error.innerHTML="";
                else {
                    i++;
                    error.innerHTML=error.innerHTML.substring(0,i)+error.innerHTML.substring(i+1,error.innerHTML.length);
                }
            }
        }
    }
}
return konstruktor;
}());


