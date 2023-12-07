// Laget av Vegard Seim Karstang, Bamble Videregående skole
// Creative Commons - BY SA

var g, img = new Image(), inputs, selection;
window.onload = init;

function init(){
	inputs = document.getElementsByTagName('input'); // Alle inputelementer
	selection = document.getElementById("select"); // Valgboksen
	g = document.getElementById("canvas").getContext("2d"); // Objekt for å tegne på canvaset

	img.onload = function(){
		// Tegn illustrasjonen
		g.drawImage(img, 0, 0, 300, 300);
		g.font = "15px Arial";
		g.fillText("Ampere:", 40, 35);
		g.fillText("Volt:", 55, 145);
		g.fillText("Watt:", 325, 145);
	}
	img.src = "bilde.png";
	
	for (var i = 0; i < inputs.length; i++){
		if (inputs[i].className === "inputBox") {
			inputs[i].addEventListener("input", calculate);
			inputs[i].value = 0;
		} else {
			inputs[i].addEventListener("focus", function(){
				this.blur();
			});
		}
	}

	inputs[3].value = "P = U x I"; 

	selection.addEventListener('change', toggleInputs);
}

function toggleInputs(){
	if (selection.options[selection.selectedIndex].value === "Energi"){
		inputs[4].style.visibility = inputs[5].style.visibility = "Visible";
		g.fillText("kWh:", 325, 195);
		g.fillText("Antall timer:", 310, 245);
	} else {
		inputs[4].style.visibility = inputs[5].style.visibility = "Hidden";
		g.clearRect(325, 180, 35, 17);
		g.clearRect(310, 230, 80, 17);
	}
}

function calculate(){
	inputs[2].value = Math.round(inputs[0].value * inputs[1].value * 100) / 100;
	
	if (inputs[2].value === "NaN")
		inputs[3].value = "Du kan kun skrive inn tall";
	else
		inputs[3].value = inputs[0].value + " A x " + inputs[1].value + " V = " + inputs[2].value + " W";

	if (selection.options[selection.selectedIndex].value === "Energi" && inputs[2].value !== "NaN"){
		inputs[4].value = Math.round(inputs[2].value * inputs[5].value) / 1e3;
	}

	if (inputs[4].value === "NaN") 
		inputs[3].value = "Du kan kun skrive inn tall";
}