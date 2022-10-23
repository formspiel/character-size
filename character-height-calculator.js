document.addEventListener('DOMContentLoaded', function(){
	
	/* Calculate character height */
	document.getElementById("calc_char_height").addEventListener("click",function(){
		calc_char_height();
	});
	
	/* Clear radio screen type */
	document.getElementById("entfernung").addEventListener("keydown",function(){
		var ele = document.getElementsByName("radio_screen_type");
		for(var i=0;i<ele.length;i++){
			ele[i].checked = false;
		}
	});

	var radios = document.getElementsByName("radio_screen_type");
	for(var i = 0, max = radios.length; i < max; i++) {
		radios[i].onclick = function() {
			document.getElementById("entfernung").value = this.value;
		}
	}

},false);

function calc_char_height(){
	
		zoll_in_mm = 25.4;
		
		
		screen_height	= document.getElementById("aufloesung_height").value.replace(",",".");
		screen_width	= document.getElementById("aufloesung_width").value.replace(",",".");
		screen_diag		= document.getElementById("bildschirmdiagonale").value.replace(",",".");
		screen_dist		= document.getElementById("entfernung").value.replace(",",".")*10;
		
		sdg_mm = Math.sqrt(Math.pow(screen_height,2)+Math.pow(screen_width,2));
		
		sh_mm = screen_height*screen_diag/sdg_mm*zoll_in_mm;
		sb_mm = screen_width*screen_diag/sdg_mm*zoll_in_mm;
		
		h_px_mm = sh_mm/screen_height;
		b_px_mm = sb_mm/screen_width;
			
		/* Mindesthöhe berechnen und ausgeben */	
		i = 1;
		h_h_buchstabe16_px = -1;
		b_h_buchstabe16_px = -1;
		h_h_buchstabe20_px = -1;
		b_h_buchstabe20_px = -1;
		h_h_buchstabe22_px = -1;
		b_h_buchstabe22_px = -1;
		
		do {
			h_h_buchstabe_mm = i*h_px_mm;
			b_h_buchstabe_mm = i*b_px_mm;
			
		 h_bogenminuten = (2*Math.atan((h_h_buchstabe_mm/2)/(screen_dist))*180/Math.PI)*60;
		 b_bogenminuten = (2*Math.atan((b_h_buchstabe_mm/2)/(screen_dist))*180/Math.PI)*60;
		 
		 if(h_bogenminuten>16 && h_h_buchstabe16_px==-1){
			 h_h_buchstabe16_px = i;
		 }
		 if(b_bogenminuten>16 && b_h_buchstabe16_px==-1){
			 b_h_buchstabe16_px = i;
		 }
		 if(h_bogenminuten>20 && h_h_buchstabe20_px==-1){
			 h_h_buchstabe20_px = i;
		 }
		 if(b_bogenminuten>20 && b_h_buchstabe20_px==-1){
			 b_h_buchstabe20_px = i;
		 }
		 if(h_bogenminuten>22 && h_h_buchstabe22_px==-1){
			 h_h_buchstabe22_px = i;
		 }
		 if(b_bogenminuten>22 && b_h_buchstabe22_px==-1){
			 b_h_buchstabe22_px = i;
		 }
		 
		 i++;
		 }while (i < 100);
		 
		 document.getElementById("res_min_height_hochformat16").value=h_h_buchstabe16_px;
		 document.getElementById("res_min_height_hochformat20").value=h_h_buchstabe20_px;
		 document.getElementById("res_min_height_hochformat22").value=h_h_buchstabe22_px;
		 //document.getElementById("res_min_height_querformat").value=b_h_buchstabe_px;
}