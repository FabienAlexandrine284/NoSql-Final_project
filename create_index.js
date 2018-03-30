var client = require('./connection.js');

function create_index()
{
	client.indices.create({  
	  index: 'ottawa'},function(err,resp,status) {
	  if(err) {
	    console.log(err);
	  }
	  else {
	    console.log("create",resp);
	  }
	});
}

create_index();

module.exports = create_index;