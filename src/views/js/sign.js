function POST(url, data) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", url, false);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(JSON.stringify(data));
    return xmlhttp.status;
}

btnSign.addEventListener('click', async () => {
    if (global.ledger == false) {
        var hdPrivateKey = null;
        var digiid = null;
        try {
            var data = fs.readFileSync(__dirname + '/wallet.dgb')
            var password = crypto.createHash('sha256').update(txtPassword.value).digest()
            var decipher = crypto.createDecipheriv("aes-256-cbc", password, Buffer.alloc(16));
            var xprv = decipher.update(data, "hex", "utf-8") + decipher.final("utf8");

            hdPrivateKey = new HDPrivateKey(xprv);
            digiid = new DigiID(txtURI.value);
        } catch { }

        if (hdPrivateKey && digiid) {
            var data = digiid.sign(hdPrivateKey, parseInt(txtIndex.value));
            if (POST(digiid.callback, data) == 200)
                lblStatus.innerHTML = "Success";
            else
                lblStatus.innerHTML = "Authentication failed";
        }
        else {
            lblStatus.innerHTML = "Digi-ID error";
        }
    } 

    txtURI.value = "";
    FormClose();
    FormOpen(frmApp);
    setTimeout(() => { lblStatus.innerHTML = "Click on any Digi-ID QR to sign it or paste the URI here!"; }, 3000);
});

btnReturn.addEventListener('click', () => {
    lblStatus.innerHTML = "Authentication canceled";
    txtURI.value = "";
    FormClose();
    FormOpen(frmApp);
    setTimeout(() => { lblStatus.innerHTML = "Click on any Digi-ID QR to sign it or paste the URI here!"; }, 3000);
});
cbxIndex.addEventListener('change', () => {
    gbIndex.classList.remove('d-none');
    txtIndex.value = 0;
    if (!cbxIndex.checked)
        gbIndex.classList.add('d-none');
});