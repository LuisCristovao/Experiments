const express = require('express')
const crypto = require('crypto')
const app = express()
const port = 80

//read posts
var bodyParser = require('body-parser')
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json());



function encrypt(text,pass){
  var cipher = crypto.createCipher('aes-256-ctr',pass)
  var crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
}
 
function decrypt(text,pass){
  var decipher = crypto.createDecipher('aes-256-ctr',pass)
  var dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8');
  return dec;
}








app.get('/', (req, res) => res.sendFile(__dirname+'/index.html'))

/*app.post('/encrypt',function(req,res) {
    console.log(req.body);
    res.set('Access-Control-Allow-Origin', 'http://localhost');
    res.send("Ola")
    
    
    
    
})*/
app.post('/encrypt/:text/:pass',function(req,res) {
    console.log(req.params);
    //console.log(req.body);
    res.set('Access-Control-Allow-Origin', '*');
    out=encrypt(req.params.text,req.params.pass);
    console.log(out);
    res.send(out)
})


app.post('/decrypt/:text/:pass',function(req,res) {
    console.log(req.params);
    //console.log(req.body);
    res.set('Access-Control-Allow-Origin', '*');
    out=decrypt(req.params.text,req.params.pass);
    console.log(out);
    res.send(out)
})


app.listen(port, () => console.log('Example app listening on port '+port+'!'))