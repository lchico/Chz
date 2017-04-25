window.onload = loop;

var data_received = 0;

function loop1(){
setTimeout(alertFunc(), 2000);
}

function alertFunc (){
alert("hola");
}

function loop() {
	if( !data_received )
		makeRequest("ajax.shtml");
	setTimeout("loop()",1000);
	var d = new Date();
	var n = d.getSeconds(); 
	signal_ctrl(n%6);
	if ( (n % 2) == 1 ) {
		contacts_update("ON", n%4)
	}else {
		contacts_update("OFF", n%4)
	}
	battery_state(n%6);

}

function makeRequest(url){
  var http_request = false;
  data_received = 1;

  if (window.XMLHttpRequest){
    http_request = new XMLHttpRequest();
    if (http_request.overrideMimeType){
      http_request.overrideMimeType('text/xml');
    }
  }

  if(!http_request){
    alert('Giving up :( Cannot create an XMLHTTP instance');
    return false;
  }
  http_request.onreadystatechange = function() { alertContents(http_request); };
  http_request.open('GET', url, true);
  http_request.send(null);
}

function alertContents(http_request){

  if (http_request.readyState == 4){
    if (http_request.status == 200){
//      parse_vars(http_request.responseText);
      //document.getElementById("sensor1").innerHTML = http_request.responseText;
      data_received = 0;
    }
    else{
      alert("There was a problem with the AJAX request.\n\r \
           Request status = " + http_request.status );
    }
  }
}


function parse_vars( data ){

  var parsed = data.split('\n');

  document.getElementById("state1").innerHTML = parsed[0];

  if ( parsed[0] == "<!--#act1-->ENCENDIDO" ) {
    document.getElementById("actuador1").value = "DETENER";
    document.getElementById("state1").className = "actuadorVerde";
  }
  else {
    document.getElementById("actuador1").value = "INICIAR";
    document.getElementById("state1").className = "actuadorRojo";
  }

  document.getElementById("state2").innerHTML = parsed[1];

  if ( parsed[1] == "<!--#act2-->ENCENDIDO" ) {
    document.getElementById("actuador2").value = "DETENER";
    document.getElementById("state2").className = "actuadorVerde";
  }
  else {
    document.getElementById("actuador2").value = "INICIAR";
    document.getElementById("state2").className = "actuadorRojo";
  }

}

function strCompare(str1,str2) {

	var n = str1.localeCompare(str2);
	return n;
}



function changeBottonText(elem)
{
   /* if (elem.value == "INICIAR")
	elem.value = "DETENER";

    else if (elem.value == "DETENER")
	elem.value = "INICIAR";
*/
}

function testAJAX()
{
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            document.getElementById("sensor1").innerHTML = xhttp.responseText;
        }
    };
    xhttp.open("GET", "ajax.txt", true);
    xhttp.send();

}

function changebuttonClasses(elem) {
  if ( elem.className.match(/(?:^|\s)active(?!\S)/) )
    return;
  else {
    document.getElementById("menu1").className = document.getElementById("menu1").className.replace ( /(?:^|\s)active(?!\S)/g , '' );
    document.getElementById("menu2").className = document.getElementById("menu2").className.replace ( /(?:^|\s)active(?!\S)/g , '' );
    document.getElementById("menu3").className = document.getElementById("menu3").className.replace ( /(?:^|\s)active(?!\S)/g , '' );
    elem.className = "active";
  }
}

function signal_ctrl(signal){
	switch(signal){
case 1:
	document.getElementById("sig1_gprs").style.visibility='visible'
	document.getElementById("sig2_gprs").style.visibility='hidden'
	document.getElementById("sig3_gprs").style.visibility='hidden'
	document.getElementById("sig4_gprs").style.visibility='hidden'
	break;
case 2:
	document.getElementById("sig1_gprs").style.visibility='visible'
	document.getElementById("sig2_gprs").style.visibility='visible'
	document.getElementById("sig3_gprs").style.visibility='hidden'
	document.getElementById("sig4_gprs").style.visibility='hidden'
	break;
case 3:
	document.getElementById("sig1_gprs").style.visibility='visible'
	document.getElementById("sig2_gprs").style.visibility='visible'
	document.getElementById("sig3_gprs").style.visibility='visible'
	document.getElementById("sig4_gprs").style.visibility='hidden'
	break;
case 4:
	document.getElementById("sig1_gprs").style.visibility='visible'
	document.getElementById("sig2_gprs").style.visibility='visible'
	document.getElementById("sig3_gprs").style.visibility='visible'
	document.getElementById("sig4_gprs").style.visibility='visible'
	break;
default:
	document.getElementById("sig1_gprs").style.visibility='hidden'
	document.getElementById("sig2_gprs").style.visibility='hidden'
	document.getElementById("sig3_gprs").style.visibility='hidden'
	document.getElementById("sig4_gprs").style.visibility='hidden'
	break;
	}
}



function contacts_update(state,actuador){
	if ( state == "ON" ) {
		document.getElementById("act"+actuador).style.fill='green'
  		document.getElementById("act_text"+actuador).innerHTML = "ON";
	}else {
		document.getElementById("act"+actuador).style.fill='red'
  		document.getElementById("act_text"+actuador).innerHTML = "OFF";
	}
}



function battery_state(level){
	switch(level){
case 0:
	document.getElementById("batt0").style.visibility='hidden'
	document.getElementById("batt1").style.visibility='hidden'
	document.getElementById("batt2").style.visibility='hidden'
	document.getElementById("batt3").style.visibility='hidden'
	document.getElementById("batt4").style.visibility='hidden'
	document.getElementById("ray").style.visibility='visible'
	break;
case 1:
	document.getElementById("batt0").style.visibility='visible'
	document.getElementById("batt1").style.visibility='hidden'
	document.getElementById("batt2").style.visibility='hidden'
	document.getElementById("batt3").style.visibility='hidden'
	document.getElementById("batt4").style.visibility='hidden'
	document.getElementById("ray").style.visibility='hidden'
	break;
case 2:
	document.getElementById("batt0").style.visibility='visible'
	document.getElementById("batt1").style.visibility='visible'
	document.getElementById("batt2").style.visibility='hidden'
	document.getElementById("batt3").style.visibility='hidden'
	document.getElementById("batt4").style.visibility='hidden'
	document.getElementById("ray").style.visibility='hidden'
	break;
case 3:
	document.getElementById("batt0").style.visibility='visible'
	document.getElementById("batt1").style.visibility='visible'
	document.getElementById("batt2").style.visibility='visible'
	document.getElementById("batt3").style.visibility='hidden'
	document.getElementById("batt4").style.visibility='hidden'
	document.getElementById("ray").style.visibility='hidden'
	break;
case 4:
	document.getElementById("batt0").style.visibility='visible'
	document.getElementById("batt1").style.visibility='visible'
	document.getElementById("batt2").style.visibility='visible'
	document.getElementById("batt3").style.visibility='visible'
	document.getElementById("batt4").style.visibility='hidden'
	document.getElementById("ray").style.visibility='hidden'
	break;
case 5:
	document.getElementById("batt0").style.visibility='visible'
	document.getElementById("batt1").style.visibility='visible'
	document.getElementById("batt2").style.visibility='visible'
	document.getElementById("batt3").style.visibility='visible'
	document.getElementById("batt4").style.visibility='visible'
	document.getElementById("ray").style.visibility='hidden'
	break;
default:
	document.getElementById("batt0").style.visibility='hidden'
	document.getElementById("batt1").style.visibility='hidden'
	document.getElementById("batt2").style.visibility='hidden'
	document.getElementById("batt3").style.visibility='hidden'
	document.getElementById("batt4").style.visibility='hidden'
	document.getElementById("ray").style.visibility='hidden'
	break;
	}
}

function tem_arrow(temp){
  var transform = _element.transform.baseVal.getItem(0);   
  var mat = transform.matrix;   
  mat = mat.translate( _x, _y );  
  transform.setMatrix( mat );

}

