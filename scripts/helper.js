
function addListenerAndCallback(elem, event, callback, bind = false) {
	if(bind) {
		elem.addEventListener(event, callback.bind(null, elem));
	} else {
		elem.addEventListener(event, callback);		
	}
}

function *validateData(name, phone) {
	if(name == '' && name.length > 30) return false;
	let phoneReg = /[0-9]{11,14}/;
	if(!phoneReg.test(phone)) return false

	return true;
}

function generateId() { 
	let num = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
	let alpha = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];
	let id = '';
	for(let i = 0; i < 3; i++) {
		if(i % 2 == 0) {
			id += num[Math.floor(Math.random() * 9)];
		} else {
			id += alpha[Math.floor(Math.random() * 9)];
		}
	}
	return id;
}


export { addListenerAndCallback, validateData, generateId };