var BitBucket = (function() {
    var konstruktor=function(key, secret) {
        var token=new Promise((resolve,reject) => {
            var ajax = new XMLHttpRequest();
            ajax.onreadystatechange = function() {
                if(ajax.readyState == 4) {
                    if(ajax.status==200) {
                        resolve(ajax.responseText);
                    }
                    else {
                        reject(ajax.responseText);
                    }
                }
            }
            ajax.open("POST", "https://bitbucket.org/site/oauth2/access_token", true);
            ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            ajax.setRequestHeader("Authorization", 'Basic ' + btoa(key+':'+secret));
            ajax.send("grant_type="+encodeURIComponent("client_credentials"));
        });

        return {
            ucitaj: function(nazivRepSpi, nazivRepVje, callback) {
                token.then((accesstoken) => {
                    var ajax=new XMLHttpRequest();
                    console.log(accesstoken)
                    var niz=[];
                    ajax.onreadystatechange = function() {
                        if(ajax.readyState==4) {
                            if(ajax.status==200) {
                                var repozitoriji=JSON.parse(ajax.responseText);
                                for(var i=0; i<repozitoriji.values.length;i++) {
                                    var t=false;

                                    for(var j=0;j<niz.length;j++) {
                                        if(niz[j].index==repozitoriji.values[i].name.substring(repozitoriji.values[i].name.length-5)) {
                                            t=true;
                                            break;
                                        }
                                    }
                                    if(!t) {
                                        niz.push({imePrezime:repozitoriji.values[i].owner.display_name,index:repozitoriji.values[i].name.substring(repozitoriji.values[i].name.length-5)});
                                    }
                                }
                                callback(null,niz);
                            }
                            else {
                                callback(JSON.parse(ajax.responseText).error_description,null);
                            }
                        }
                    }

                    ajax.open("GET", "https://api.bitbucket.org/2.0/repositories/?role=member&q=name+%7E+%22"+nazivRepSpi+"%22+OR+name+%7E+%22"+nazivRepVje+"%22",false);
                    ajax.setRequestHeader("Authorization", 'Bearer '+JSON.parse(accesstoken).access_token);
                    ajax.send();
                }).catch((err) => {
                    callback(JSON.parse(err).error_description,null);
                }); 
            }
        };
    }
    return konstruktor;
}());