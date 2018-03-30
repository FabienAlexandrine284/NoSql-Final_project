var client = require('./connection.js');
var fs = require('fs');

function Fill_Index(){

	//GET JSON FILE
	console.log("//////////////////DEBUT////////////////////");
	var obj = JSON.parse(fs.readFileSync('permits_ottawa.json'));
	console.log("///////////////FIN//////////////////////");

	var compteur = 0;
	obj.data.forEach(function(row){
		
		if(compteur<1000){
			var id = row._id.$oid;
			
			delete row._id;

			client.index({  
				index: "ottawa",
				id: id,
				type: 'ottawa_permits',
				body: row
			},function(err,resp,status) {
				console.log(resp);
			});
			compteur++;
		}
		
	})
	console.log("Compteur : ");
	console.log(compteur);
}

Fill_Index();