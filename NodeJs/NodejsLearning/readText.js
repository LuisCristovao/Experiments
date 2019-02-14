/*var fs = require('fs');

fs.open('info.txt', 'r', (err, handle) => {
	var buf = new Buffer(100000);

	fs.read(handle, buf, 0, 100000, null, (err, length) => {
		 console.log(buf.toString('utf8', 0, length));*/
		 //fs.close(handle, () => { /* Don't care */ });
	/*});
	
});*/


var fs = require('fs');

function FileObject () {
	
	this.filename = '';

	/*this.file_exists = function (callback) {
		 var bla = this;
		 console.log("About to open: " + this.filename);
		 
		 fs.open(this.filename, 'r', function (err, handle) {
		 if (err) {
			 console.log("Can't open: " + bla.filename);
			 callback(err);
			 return;
		 }
		 fs.close(handle, function () { });
			callback(null, true);
		 });
	};*/
	this.file_exists = function (callback) {
		 
		console.log("About to open: " + this.filename);
		
		fs.open(this.filename, 'r', (err, handle) => {
			if (err) {
				console.log("Can't open: " + this.filename);
				callback(err);
				return;
			}
			fs.close(handle, () => { });
			callback(null, true);
		});
	};
	
	this.Print= function(callback){
		fs.read(handle, buf, 0, 100000, null, (err, length) => {
			if(err){
				console.log("ERROR: " + err.code + " (" + err.message ")");
			}
			else{
				
			 console.log(buf.toString('utf8', 0, length));*/
			 fs.close(handle, () => { /* Don't care */ });
			}
		});
		
	}
	
}




var fo = new FileObject();

fo.filename = "A.txt";
fo.file_exists((err, results) => {
	 if (err) {
		console.log("\nError opening file: " + JSON.stringify(err));
		return;
	 }
	 console.log("file exists!!!");
});