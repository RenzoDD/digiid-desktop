var Transport = require('@ledgerhq/hw-transport-node-hid').default;
var AppBtc = require("@ledgerhq/hw-app-btc").default;

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
            var data = fs.readFileSync(__dirname + '/wallet.dgb')
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
                lblStatus.innerHTML = "Success";
            else
                lblStatus.innerHTML = "Authentication failed";
        }
        else {
            lblStatus.innerHTML = "Digi-ID error";
        }
    } else {
        var digiid = null;
        try {
            digiid = new DigiID(txtURI.value);
        }
        catch { }

        if (digiid) {
            var path = digiid.path(parseInt(txtIndex.value));
            console.log(path);

            lblHash.innerHTML = crypto.createHash('sha256').update(txtURI.value).digest('hex');
            gbHash.classList.remove('d-none');

            console.log(path)

            var transport = await Transport.create();
            var btc = new AppBtc(transport, 'DGB');

            var uri = txtURI.value;
            var address = (await btc.getWalletPublicKey(path)).bitcoinAddress;
            var result =  await btc.signMessageNew(path, Buffer.from(txtURI.value).toString('hex'));
            var v = result['v'] + 27 + 4;
            var signature = Buffer.from(v.toString(16) + result['r'] + result['s'], 'hex').toString('base64');
            
            if (POST(digiid.callback, { uri, address, signature }) == 200)
                lblStatus.innerHTML = "Success";
            else
                lblStatus.innerHTML = "Authentication failed";
            
            gbHash.classList.add('d-none');
        }
    }
//  m/986140529'/510485489'/1652168490'/2049895461'
// m/1720888436'/4211399968'/2524762138'/1430202709'
// m/2855946259'/93618896'/400264154'/2523239147'

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

// m/1720888436'/2063916320'/377278490'/1430202709'
// m/1720888436'/2063916320'/377278490'/1430202709'
