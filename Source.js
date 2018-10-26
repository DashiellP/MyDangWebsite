function what(id) {
	document.getElementById(id).innerText = "what";
}

function setColor(id, color, value) {
	document.getElementById(id).style.color[0] = value;
}

function testObj(x) {
	this.innerText = x;
}