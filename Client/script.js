const API_URL = "http://localhost:9292/api/search";
const json = '{  "args": {    "test": { "key" : "value", "key2" : "value2"}, "ugh" : "okay"  },   "headers": {    "Accept": "*/*",     "Accept-Encoding": "gzip, deflate, br",     "Accept-Language": "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7",     "Connection": "close",     "Host": "httpbin.org", "Origin": "https://resttesttest.com",    "Referer": "https://resttesttest.com/",    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36"},"origin": "92.170.34.228", "url": "https://httpbin.org/get?test=okay"}';

const PORT = 9292;

const TESTING = false;

var nbOfRows = 1;

$( document ).ready(function() {
	$("#submit").click(submitListener);
	$("#addRow").click(addRow);
	hljs.initHighlightingOnLoad();
	hljs.configure({useBR: true});
});

function submitListener(){

	var data = FetchParams();
	//console.log(data)

	$.ajax({
            url: API_URL + FetchParams(),
            dataType: "json",
            headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
            type: "GET",
            success: SuccessHandler,
            error: ErrorHandler
        });
}

function FetchParams(){
  var query = "?";

  for(var i = 1; i <= nbOfRows; i++){

    var nameSelector = "#name"+i;
    var modeSelector = "#mode"+i;
    var valueSelector = "#value"+i;


    var name = $(nameSelector).val();
    var mode = $(modeSelector).val();
    var value = $(valueSelector).val();

    if(name != "" && mode != "" && value != ""){
      var paramsAsString = "&" + name + "=" + value + "&"+name+"Mode=" + mode;
      query += paramsAsString;     
    }
  }

  console.log(API_URL + query);
  return query;
}

function SuccessHandler(xhr, textStatus){
  var data = "";

  if(TESTING){
    var data = JSON.parse(json);    
  } else {
    console.log(xhr);
    var data = xhr;
    
  }
  
  var stringify = JSON.stringify(data, undefined, 4);
  var prettify = hljs.highlightAuto(stringify).value;
  prettify = hljs.fixMarkup(prettify);
  $("#results").html(prettify);
}

function ErrorHandler(error){
  if(!TESTING){
    $("#results").html("Error while retrieving data");
  } else {
    var data = JSON.parse(json);
    var stringify = JSON.stringify(data, undefined, 4);
    console.log(stringify);
    var prettify = hljs.highlightAuto(stringify).value;
    prettify = hljs.fixMarkup(prettify);
    $("#results").html(prettify);
  }
}

function addRow(){
	nbOfRows++;
	var html = '<div class="form-group row" id="row'+ nbOfRows +'">'+
              		'<label for="filter" class="col-md-2 col-form-label">FILTER '+ nbOfRows +'</label>'+
              		'<div class="col-md-3">'+
	                	'<select class="form-control" id="name'+nbOfRows+'">'+
						          '<option value="address">address</option>'+
                      '<option value="location">location</option>'+
                      '<option value="accuracy">accuracy</option>'+
                      '<option value="suffix">suffix</option>'+
                      '<option value="APPL_TYPE">APPL_TYPE</option>'+
                      '<option value="BLG_TYPE">BLG_TYPE</option>'+
                      '<option value="filename">filename</option>'+
                      '<option value="ISSUED_DATE">ISSUED_DATE</option>'+
                      '<option value="VALUE_unit">VALUE_unit</option>'+
                      '<option value="FT2">FT2</option>'+
                      '<option value="TOTAL_unit">TOTAL_unit</option>'+
                      '<option value="PC">PC</option>'+
                      '<option value="location">location</option>'+
                      '<option value="PERMIT">PERMIT</option>'+
                      '<option value="direction">direction</option>'+
                      '<option value="housenumber">housenumber</option>'+
                      '<option value="street">street</option>'+
                      '<option value="location">location</option>'+
                      '<option value="road">road</option>'+
                      '<option value="municipality">municipality</option>'+
                      '<option value="city">city</option>'+
                      '<option value="month">month</option>'+
                      '<option value="year">year</option>'+
                      '<option value="type">type</option>'+
		                '</select>'+
		              '</div>'+
                  '<div class="col-md-3">'+
                    '<select class="form-control" id="mode'+nbOfRows+'">'+
                      '<option value="1">MATCHES</option>'+
                      '<option value="0">DIFFERS</option>'+
                    '</select>'+
                  '</div>'+
	              	'<div class="col-md-3">'+
	                	'<input type="text" class="form-control" id="value'+nbOfRows+'" placeholder="value">'+
	              	'</div>'+
	            '</div>';
	$("#matches").append(html);
}

