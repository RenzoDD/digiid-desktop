const frmStack = [ ];
function FormOpen(frm) {
	if (frmStack.length - 1 >= 0)
		frmStack[frmStack.length - 1].classList.add('d-none');

	frm.classList.remove('d-none');
	frmStack.push(frm);
}
function FormClose() {
	if (frmStack.length - 1 >= 0)
	{
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

if (fs.existsSync(__dirname + '/wallet.dgb')) {
	global.ledger = false;
	FormOpen(frmApp);
}
else if (fs.existsSync(__dirname + '/ledger.dgb')) {
	global.ledger = true;
	gbPassword.classList.add('d-none');


	FormOpen(frmApp);
}
else
	FormOpen(frmStart);