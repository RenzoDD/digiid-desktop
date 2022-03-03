const frmStack = [];
function FormOpen(frm) {
	if (frmStack.length - 1 >= 0)
		frmStack[frmStack.length - 1].classList.add('d-none');

	frm.classList.remove('d-none');
	frmStack.push(frm);
}
function FormClose() {
	if (frmStack.length - 1 >= 0) {
		var frm = frmStack.pop();
		frm.classList.add('d-none');
		if (frmStack.length - 1 >= 0)
			frmStack[frmStack.length - 1].classList.remove('d-none');
	}
}

const digibyte = require('digibyte-js');
const BIP39 = require('digibyte-js/lib/bip39');
const HDPrivateKey = require("digibyte-js/lib/hdprivatekey");
const DigiID = require("digibyte-js/lib/digiid");
const fs = require('fs');
const crypto = require('crypto');

if (__dirname.indexOf("app.asar") !== -1)
	global.path = __dirname.substring(0, __dirname.length - 29);
else
	global.path = __dirname.substring(0, __dirname.length - 10);

if (fs.existsSync(global.path + '/wallet.dgb')) {
	global.ledger = false;
	FormOpen(frmApp);
}
else if (fs.existsSync(global.path + '/ledger.dgb')) {
	global.ledger = true;
	gbPassword.classList.add('d-none');
	FormOpen(frmApp);
}
else
	FormOpen(frmStart);

setInterval(() => {
	if (global.ledger !== undefined) {
		if(fs.existsSync(global.path + '/uri')) {
			txtURI.value = fs.readFileSync(global.path + '/uri');
			fs.unlinkSync(global.path + '/uri');

			var digiid = null
			try { digiid = new DigiID(txtURI.value) } catch {}
			if (digiid) {
				lblCallback.innerHTML = digiid.callback;
				FormClose();
				FormOpen(frmSign);
			}
		}
	}
}, 500);