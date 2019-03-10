var express = require('express');
var fs = require('fs');
var bp = require('body-parser');
var m = require('multer');
var db = require('./db.js');

db.sequelize.sync();

var app = express();
var upload = m({dest:__dirname+'/zadaci/'});

app.use(bp.urlencoded({extended:true}));
app.use(bp.json());

app.use(express.static('public'));

app.get('/zadatak', function(req, res) {
    db.zadatak.findOne({where:{naziv:req.param('naziv')}
    }).then(function(zadatak) {
        res.sendFile(__dirname+'/zadaci/'+zadatak.naziv+'/'+zadatak.naziv+'.pdf');
    }).catch(function(err) {
        res.send(err);
    });
});

app.post('/addGodina', function(req, res) {
    db.godina.create({
        nazivGod: req.body.nazivGod,
        nazivRepVje: req.body.nazivRepVje,
        nazivRepSpi: req.body.nazivRepSpi
    }).then(function(godina) {
        res.sendFile(__dirname+"/public/addGodina.html");
    }).catch(function(err) {
        res.send(err);
    })
});

app.get('/godine', function(req, res) {
    db.godina.findAll().then(function(vjezbe) {
        var niz = [];
        for(var i=0; i<vjezbe.length; i++) {
            var o = {id: vjezbe[i].id, nazivGod:vjezbe[i].nazivGod, nazivRepVje:vjezbe[i].nazivRepVje, nazivRepSpi:vjezbe[i].nazivRepSpi};
            niz.push(o);
        }
        res.writeHead(200, {'Content-Type':'application/json'});
        res.end(JSON.stringify(niz));
    });
});

app.post('/addZadatak', upload.single('postavka'),function(req, res) {
    var direktorij = __dirname+'/zadaci/'+req.body.naziv;
    if(fs.existsSync(direktorij) || req.file.mimetype!='application/pdf') {
        fs.unlink(__dirname+'/zadaci/'+req.file.filename, function(err) {
            if(err) throw err;
        });
        res.sendFile(__dirname+'/public/greska.html');
        return;
    }

    fs.mkdirSync(direktorij);

    fs.rename(__dirname+'/zadaci/'+req.file.filename, direktorij+'/'+req.body.naziv+'.pdf', function(err){
        if(err) throw err;
    });

    var s = '{"naziv":'+req.body.naziv+',"postavka":"http://localhost:8080/zadaci/'+req.body.naziv+'/'+req.body.naziv+'.pdf"}';

    db.zadatak.create({
        naziv: req.body.naziv,
        postavka: "http://localhost:8080/zadaci/"+req.body.naziv+"/"+req.body.naziv+".pdf"
    }).then(function(zadatak) {
        res.send(s);
    }).catch(function(err) {
        res.send(err);
    });
});

app.get('/zadaci', function(req,res) {

    db.zadatak.findAll().then(function(niz) {
        if(req.accepts('application/json')) {
            var ispis = [];
            for(var i=0; i<niz.length; i++) {
                var o = {id: niz[i].id, naziv:niz[i].naziv, postavka:niz[i].postavka};
                ispis.push(o);
            }
            res.writeHead(200, {'Content-Type':'application/json'});
            res.end(JSON.stringify(ispis));
        }
        else if(req.accepts('application/xml')) {
            res.writeHead(200, {'Content-Type':'application/xml'});
            res.write('<?xml version="1.0" encoding="UTF-8"?>\n');
            res.write('<zadaci>\n');
            for(var i=0; i<niz.length; i++) {
                res.write('\t<zadatak>\n\t\t<naziv> '+niz[i].naziv+' </naziv>\n\t\t<postavka>'+niz[i].postavka+'</postavka>\n\t</zadatak>\n');
            }
            res.end('</zadaci>');
        }
        else if(req.accepts('text/csv')) {
            res.writeHead(200, {'Content-Type':'text/csv'});
            for(var i=0; i<niz.length; i++) {
                res.write(niz[i].naziv+','+niz[i].postavka+'\n');
            }
            res.end();
        }
    });
});

app.get('/vjezbe', function(req,res) {
    db.vjezba.findAll().then(function(vjezbe) {
        var niz = [];
        for(var i=0; i<vjezbe.length; i++) {
            var o = {id: vjezbe[i].id, naziv:vjezbe[i].naziv, spirala:vjezbe[i].spirala};
            niz.push(o);
        }
        res.writeHead(200, {'Content-Type':'application/json'});
        res.end(JSON.stringify(niz));
    });
});

app.post('/addVjezba', function(req,res) {
    if(req.param('naziv')) {
        var spirala=false;
        if(req.param('spirala')) spirala=true;

        db.vjezba.create({
            naziv: req.body.naziv,
            spirala: spirala
        }).then(function(vjezba) {
            db.godina.findOne({where:{id:req.body.sGodine}
            }).then(function(godina) {
                godina.addVjezbe([vjezba.id]);
                vjezba.addGodine([godina.id]);
                res.sendFile(__dirname+"/public/addVjezba.html");
            }).catch(function(err) {
                res.send(err);
            });
        }).catch(function(err) {
            res.send(err);
        });
    }
    else {
        db.vjezba.findOne({where: {id:req.body.sVjezbe}
        }).then(function(vjezba) {
            db.godina.findOne({where:{id:req.body.sGodine}
            }).then(function(godina) {
                godina.addVjezbe([vjezba.id]);
                vjezba.addGodine([godina.id]);
                res.sendFile(__dirname+"/public/addVjezba.html");
            }).catch(function(err) {
                res.send(err);
            });
        }).catch(function(err) {
            res.send(err);
        });
    }
});

app.post('/vjezba/:idVjezbe/zadatak', function(req,res) {
    db.zadatak.findOne({
        where: {id: req.body.sZadatak}
    }).then(function(zadatak) {
        db.vjezba.findOne({
            where: {id: req.param('idVjezbe')}
        }).then(function(vjezba) {
            zadatak.addVjezbe([vjezba.id]);
            vjezba.addZadaci([zadatak.id]);
            res.redirect("/addVjezba.html");
        }).catch(function(err) {
            res.send(err);
        });
    }).catch(function(err) {
        res.send(err);
    });
});

app.post('/zadaciKojiNisuPovezaniNaVjezbu', function(req,res) {
    db.zadatak.findAll().then(function(niz) {
        db.vjezba.findOne({
            where: {id: req.body.id}
        }).then(function(vjezba) {
            vjezba.getZadaci().then(function(vjezbaZadaci) {
                for(var i=0;i<vjezbaZadaci.length;i++) {
                    for(var j=0;j<niz.length;j++) {
                        if(niz[j].id==vjezbaZadaci[i].id) niz.splice(j,1);
                    }
                }
                var zadaci=[];
                for(var i=0;i<niz.length;i++) {
                    var o={id:niz[i].id,naziv:niz[i].naziv,postavka:niz[i].postavka};
                    zadaci.push(o);
                }
                res.writeHead(200, {'Content-Type':'application/json'});
                res.end(JSON.stringify(zadaci));
            })
        }).catch(function(err) {
            res.send(err);
        })
    }).catch(function(err) {
        res.send(err);
    })
});

app.get('/jednaGodina', function(req,res) {
    db.godina.findOne({
        where: {id: req.param('id')}
    }).then(function(godina) {
        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify(godina));
    }).catch(function(err) {
        res.send(err);
    })
});

app.post('/student', function(req,res) {
    var M=0;
    var N=0;
    db.student.findAll().then((niz) => {
        for(var i=0;i<req.body.studenti.length;i++) {
            var t=false;
            for(var j=0;j<niz.length;j++) {
                if(req.body.studenti[i].index==niz[j].index) {
                    t=true;
                }
            }
            if(!t) {
                db.student.create({
                    imePrezime: req.body.studenti[i].imePrezime,
                    index: req.body.studenti[i].index,
                    studentGod: req.body.godina
                });
                N++;
            }
            else {
                db.student.findOne({
                    where:{index:req.body.studenti[i].index}
                }).then((student) => {
                    student.update({
                        studentGod: req.body.godina
                    });
                });
                M++;
            }
        }
        db.godina.findOne({
            where:{id:req.body.godina}
        }).then((godina) => {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({message:"Dodano je "+N+" novih studenata i upisano "+M+" na godinu "+godina.nazivGod}));
        }).catch((err) => {
            res.send(err);
        });
    }).catch((err) => {
        res.send(err);
    });
});

app.listen(8080);

