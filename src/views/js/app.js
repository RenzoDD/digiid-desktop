const DigiByte = require('digibyte-js');
const fs = require('fs');

const forms = document.getElementsByClassName('frm');

function FormOpen(frm) {
	for (var form of forms)
		form.classList.add('d-none');

	frm.classList.remove('d-none');
}

if (__dirname.indexOf("app.asar") !== -1)
	global.path = __dirname.substring(0, __dirname.length - 29);
else
	global.path = __dirname.substring(0, __dirname.length - 10);

if (fs.existsSync(global.path + '/wallet.dgb')) {
	global.wallet = "software";
	FormOpen(frmApp);
}
else if (fs.existsSync(global.path + '/ledger.dgb')) {
	global.wallet = "ledger";
	gbPassword.classList.add('d-none');
	FormOpen(frmApp);
}
else {
	FormOpen(frmStart);
}

setInterval(() => {
	if (global.wallet !== undefined) {
		if(fs.existsSync(global.path + '/uri')) {
			txtURI.value = fs.readFileSync(global.path + '/uri');
			fs.unlinkSync(global.path + '/uri');
			console.log(txtURI.value)
			
			var digiid = null;
			try { digiid = new DigiByte.DigiID(txtURI.value) }
			catch {}

			if (digiid) {
				lblCallback.innerHTML = digiid.callback;
				FormOpen(frmSign);
			}
		}
	}
}, 500);