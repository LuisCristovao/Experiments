const express = require('express'); //Imports the express module
const app = express(); //Creates an instance of the express module
const PORT = 3000; //Randomly chosen port
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const util = require('util');

const new_readdir= util.promisify(fs.readdir);

var urls=[];




/*function GetFileNames(path){
    
    var real_path=__dirname+'/'+path+'/'
    const filenames =  fs.readdirSync(real_path)
    
    return filenames
}*/
async function Ola(name){
    return name
}
async function GetFileNames(path){
    
    var real_path=__dirname+'/'+path+'/'
    const filenames =  new_readdir(real_path)
    
    console.log("bla:"+filenames)
    return filenames
}



app.use(bodyParser.urlencoded({ extended: true }));
// default options
app.use(fileUpload());

app.set('view engine','ejs'); //Sets jade as the View Engine / Template Engine
app.set('views','views'); //Sets the directory where all the views (.jade files) are stored.

//Creates a Root Route
app.get('/',async function(req, res){
    urls=await GetFileNames('files')
    console.log(urls)
    for(var i =0; i<urls.length;i++){
        urls[i]='files/'+urls[i]
    }
    //urls= GetFileNames('files');
    res.render('index',{urls:urls,title:'Upload Server'}); //renders the index.jade file into html and returns as a response. The
    //render function optionally takes the data to pass to the view.
});



app.post('/upload', function(req, res) {
  if (!req.files)
    return res.status(400).send('No files were uploaded.');
 
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.sampleFile;
  //console.log(req.files)
  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv('files/'+req.files.sampleFile.name, function(err) {
    if (err)
      return res.status(500).send(err);
    
    urls.push('files/'+req.files.sampleFile.name)  
    res.render('index',{urls:urls,title:'Upload Server'});
  });
});


 //app.use(express.static(__dirname + '/files'));

app.get('/files/:filename',function(req,res){
    var path=__dirname+'/files/'+req.params.filename;
    console.log(path)
    if (fs.existsSync(path)) {
        // Do something
        res.sendFile(path)
    }
    else{
        return res.status(500).send('file does not exist');
    }
    
    
})

//Starts the Express server with a callback
app.listen(PORT, function(err) {
    if (!err) {
        console.log('Server is running at port', PORT);
        
    } else {
        console.log(JSON.stringify(err));
    }
});