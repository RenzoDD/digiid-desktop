const Transport = require('@ledgerhq/hw-transport-node-hid').default;
const AppBtc = require("@ledgerhq/hw-app-btc").default;

function POST(url, data) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", url, false);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(JSON.stringify(data));
    console.log(xmlhttp)
    return xmlhttp.status;
}

btnSign.addEventListener('click', async () => {
    if (global.ledger == false) {
        var hdPrivateKey = null;
        var digiid = null;
        try {
            var data = fs.readFileSync(global.path + '/wallet.dgb')
            var password = crypto.createHash('sha256').update(txtPassword.value).digest()
            var decipher = crypto.createDecipheriv("aes-256-cbc", password, Buffer.alloc(16));
            var xprv = decipher.update(data, "hex", "utf-8") + decipher.final("utf8");

            hdPrivateKey = new HDPrivateKey(xprv);
            digiid = new DigiID(txtURI.value);
        } catch { }

        if (hdPrivateKey && digiid) {
            var path = digiid.path(parseInt(txtIndex.value));
            console.log(path)
            var data = digiid.sign(hdPrivateKey, parseInt(txtIndex.value));
            if (POST(digiid.callback, data) == 200)
                lblStatus.innerHTML = "<i class='bi bi-patch-check-fill'></i> Success";
            else
                lblStatus.innerHTML = "<i class='bi bi-x-octagon-fill'></i> Authentication failed";
        }
        else {
            lblStatus.innerHTML = "<i class='bi bi-x-octagon-fill'></i> Digi-ID error";
        }
    } else {
        var digiid = new DigiID(txtURI.value);
        var path = digiid.path(parseInt(txtIndex.value));

        try { var transport = await Transport.create(1000, 1000); }
        catch {
            lblStatus.innerHTML = "<i class='bi bi-x-octagon-fill'></i> Connect hardware wallet";
            gbHash.classList.add('d-none');
        }
                
        lblHash.innerHTML = crypto.createHash('sha256').update(txtURI.value).digest('hex');
        gbHash.classList.remove('d-none');

        if (transport) {
            try {
                var btc = new AppBtc(transport);

                var address = (await btc.getWalletPublicKey(path)).bitcoinAddress;
                var result = await btc.signMessageNew(path, Buffer.from(txtURI.value).toString('hex'));
            }
            catch {
                lblStatus.innerHTML = "<i class='bi bi-x-octagon-fill'></i> Open DigiByte app";
                gbHash.classList.add('d-none');
            }

            if (btc && address && result) {

                var v = result['v'] + 27 + 4;
                var signature = Buffer.from(v.toString(16) + result['r'] + result['s'], 'hex').toString('base64');

                if (POST(digiid.callback, { uri: txtURI.value, address, signature }) == 200)
                    lblStatus.innerHTML = "<i class='bi bi-patch-check-fill'></i> Success";
                else
                    lblStatus.innerHTML = "<i class='bi bi-x-octagon-fill'></i> Authentication failed";

                gbHash.classList.add('d-none');
            }
        }
    }

    txtURI.value = "";
    FormClose();
    FormOpen(frmApp);
    setTimeout(() => { lblStatus.innerHTML = "Digi-ID authentication protocol"; }, 5000);
});

btnReturn.addEventListener('click', () => {
    lblStatus.innerHTML = "<i class='bi bi-x-octagon-fill'></i> Authentication canceled";
    txtURI.value = "";
    FormClose();
    FormOpen(frmApp);
    setTimeout(() => { lblStatus.innerHTML = "Digi-ID authentication protocol"; }, 5000);
});
cbxIndex.addEventListener('change', () => {
    gbIndex.classList.remove('d-none');
    txtIndex.value = 0;
    if (!cbxIndex.checked)
        gbIndex.classList.add('d-none');
});