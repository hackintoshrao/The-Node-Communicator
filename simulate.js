window.onload = init;
function init() {
var button = document.getElementById("addButton");

button.onclick = handleButtonClick;
}


function handleButtonClick() {
var textInput = document.getElementById("sicInput");
var Instruction = textInput.value;
if (Instruction == "") {
alert("Please enter a Instruction");
} else {

	alert("Simulating " + Instruction);
	var li = document.createElement("li");
	li.innerHTML = Instruction;
	var ul = document.getElementById("Instructions");
	ul.appendChild(li);

	}

}


