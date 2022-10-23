document.addEventListener('DOMContentLoaded', function(){ 
	
	screen_type_arr			= ["","Monitor","Laptop","Tablet","Smartphone"];
	screen_type_radio_arr	= ["","radio_monitor","radio_laptop","radio_tablet","radio_smartphone"];
	screen_dist_arr			= ["",50,40,40,30];
		
	/* Bildschirm laden */
	html="<option value='-1'>Select screen …</option>";
	for (screen_type in screens) {
		html+='<optgroup label="'+screen_type_arr[screen_type]+'">';
		
		for (monitor in screens[screen_type]) {
			html+='<option value="'+screen_type+'" data-b="'+screens[screen_type][monitor].b+'" data-h="'+screens[screen_type][monitor].h+'" data-d="'+screens[screen_type][monitor].d+'">'+monitor+' ('+screens[screen_type][monitor].b+' x '+screens[screen_type][monitor].h+')</option>';
		}
		
		html+='</optgroup>';
	}
	document.getElementById("sel_bildschirm").innerHTML=html;
	
	/* Bildschirm speichern */
	document.getElementById("save_bildschirm").addEventListener("click",function(){		

		screen_name		= document.getElementById("bildschirm_name").value;
		screen_height	= document.getElementById("bildschirm_aufloesung_height").value.replace(",",".");
		screen_width	= document.getElementById("bildschirm_aufloesung_width").value.replace(",",".");
		screen_diag		= document.getElementById("bildschirm_bildschirmdiagonale").value.replace(",",".");
		
		/* Add Attributes */
		myobj = {};
		myobj.b=screen_width;
		myobj.h=screen_height;
		myobj.d=screen_diag;
				
		document.getElementById("save_bildschirm_json").value = ",'"+screen_name+" "+screen_diag+'"\':'+JSON.stringify(myobj)+"";
		document.getElementById("save_bildschirm_json").style.display = "block";
		
		document.getElementById("save_bildschirm_json").select();
	});
	
	
	/* Bildschirm ausgewählt */
	document.getElementById("sel_bildschirm").addEventListener("change",function(){
		selobj 			= document.getElementById("sel_bildschirm");
		screen_type	= selobj.options[selobj.selectedIndex].value;
		
		if(screen_type!=-1){
			screen_height	= selobj.options[selobj.selectedIndex].getAttribute('data-h');
			screen_width	= selobj.options[selobj.selectedIndex].getAttribute('data-b');
			screen_diag		= selobj.options[selobj.selectedIndex].getAttribute('data-d');
			
			document.getElementById("aufloesung_height").value		= screen_height.replace(",",".");
			document.getElementById("aufloesung_width").value			= screen_width.replace(",",".");
			document.getElementById("bildschirmdiagonale").value	= screen_diag.replace(",",".");
			document.getElementById("entfernung").value						= screen_dist_arr[screen_type];
			document.getElementById(screen_type_radio_arr[screen_type]).checked = true;
			
			/* Zeichenhöhe berechnen */
			calc_char_height();
		}
	});
},false);