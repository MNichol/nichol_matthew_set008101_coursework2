//Required Modules
const express = require('express');
const app = express();
const path = require('path');
const BodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const http = require('http');
const bcrypt = require('bcrypt');

//Set up global variables being used
var authenticated = false;
var port = process.env.PORT || 5000;

//Connection to Databases
var db = new sqlite3.Database('./databases/users.db');
var msgdb = new sqlite3.Database('./databases/inbox.db');

//Creates Inbox Database 
msgdb.serialize( function(){
    msgdb.run('create table if not exists '
    + 'inbox ('
    + 'recipiant text,'
    + 'body text,'
    + 'cipher text,'
    + 'shift numeric,'
    + 'plaint text)');
});

//Creates User Database
db.serialize( function(){
    db.run('create table if not exists '
        + 'profiles ('
        + 'u_name text,'
        + 'hashed text)');
});


//BodyParser creation 
app.use(BodyParser.urlencoded({extended: false}));

//View Engine Creation
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'pug');


//Set static path for fetching cs,js
app.use('/static', express.static(__dirname + '/public'));




    /*
        APP GET ROUTES 
                            */


//GET request for homepage 
app.get('/', function(req,res) {
    res.render('index',{
        title: 'Homepage',
    });
});


//GET request for messaging webpage
app.get('/messaging', function(req,res){
    res.render('messaging',{
        title: 'Messaging',
    });
});

//GET request for inbox 
app.get('/inbox', function(req,res,next){
    res.render('inbox',{
        title: 'Inbox Login'
    });


});
   

app.get('/inbox/:userid',function(req,res){

    var u_name = req.params.userid
    var messageobject = [];
    
    msgdb.all('SELECT * FROM inbox WHERE recipiant=$name',{
        $name: u_name
    }, function(err,row){
        if(err){
            console.log(err)
        };
        var messagecount = row.length;
        for(i = 0; i < row.length; ++i){
            var currentmsg = row[i];

            var msginfo = {
                body:currentmsg.body,
                plain:currentmsg.plaint,
                cipher:currentmsg.cipher,
                shift:currentmsg.shift,
                id: i   

            }

            messageobject.push(msginfo);


        }
        
        res.render('userinbox',{
            title: 'Welcome to your inbox ' + u_name,
            usermessages:messageobject,
            username: u_name,
        })
    }
);
    



    
});

    /*
        APP POST ROUTES 
                            */

app.post('/users', function(req,res){
    //Converting plain text to hashed password

    var plaint = req.body.new_password

    let hashed = bcrypt.hashSync(plaint, 10);
    console.log(hashed);

    var newuser = {
        u_name: req.body.new_username,
        hashed
    }

    console.log(newuser)

    table_creation_profiles(newuser);
    
    res.redirect('/');

})

app.post('/inbox', function(req,res){

        var letter = {
        recipiant: req.body.recipiant,
        body: req.body.body,
        cipher: req.body.cipher,
        shift: req.body.shift,
        plain: req.body.plain
    }

    table_creation_inbox(letter)

    res.redirect('/messaging');
})

app.post('/accounts',function(req,res){

    var login = {
        u_name: req.body.user_name,
        u_pass: req.body.user_pass
    }

    login_authentication(login);

    if(authenticated = true){
        res.redirect('inbox/'+login.u_name);
    } else {
        window.alert('Username/Password combination incorrect')
    }


});


function table_creation_profiles(data) {

    db.serialize( function(){
        var stmt = db.prepare('insert into profiles values (?,?)');

        stmt.run([data.u_name, data.hashed]);

        stmt.finalize();
    });
};


function table_creation_inbox(data){
    msgdb.serialize( function(){

        var stmt = msgdb.prepare('insert into inbox values (?,?,?,?,?)');    
		stmt.run([data.recipiant, data.body, data.cipher, data.shift, data.plain]);

        stmt.finalize();
    });
};


function login_authentication(data) {
    db.all('SELECT * FROM profiles WHERE u_name=$name',{
        $name: data.u_name,
    }, function(err,row){
        if (err){
            console.log(err);
        }
        var useraccount = row[0];
        bcrypt.compare(data.u_pass, useraccount.hashed, function(err, res) {
            if (res){
                console.log('True');
                authenticated = true;
                return authenticated
            }
            else {
                console.log('False');
                authenticated = false;
                return authenticated
            }
        })
    });
}


//Create the server on port 5000
app.listen(5000, function(){
    console.log('Server started: Use address http://localhost:' + port + '/ to connect');
});
