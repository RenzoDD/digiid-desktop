const BIP39 = require('digibyte-js/lib/bip39');
const HDPrivateKey = require("digibyte-js/lib/hdprivatekey");
const DigiID = require("digibyte-js/lib/digiid");
const crypto = require('crypto');

function SHA256(data) {
    return crypto.createHash('sha256').update(data).digest();
}
function EncryptAES256(data, password) {
    var data = Buffer.from(data);
    var password = SHA256(Buffer.from(password));
    var cipher = crypto.createCipheriv("aes-256-cbc", password, Buffer.alloc(16));
    var encryptedData = cipher.update(data, "utf-8", "hex") + cipher.final("hex");
    return Buffer.from(encryptedData, 'hex');
}
function DecryptAES256(data, password) {
    var data = Buffer.from(data);
    var password = SHA256(Buffer.from(password));
    var decipher = crypto.createDecipheriv("aes-256-cbc", password, Buffer.alloc(16));
    const decryptedData = decipher.update(data, "hex", "utf-8") + decipher.final("utf8");

    return decryptedData;
}
function POST(url, data) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", url, false);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(JSON.stringify(data));
    console.log(xmlhttp)
    return xmlhttp.status;
}

/*
   __                 _____ _             _   
  / _|               / ____| |           | |  
 | |_ _ __ _ __ ___ | (___ | |_ __ _ _ __| |_ 
 |  _| '__| '_ ` _ \ \___ \| __/ _` | '__| __|
 | | | |  | | | | | |____) | || (_| | |  | |_ 
 |_| |_|  |_| |_| |_|_____/ \__\__,_|_|   \__|
*/

btnCreateWallet.addEventListener('click', () => {
    FormOpen(frmCreate);
});
btnRestoreWallet.addEventListener('click', () => {
    FormOpen(frmRestore);
});
btnHardwareWallet.addEventListener('click', () => {
    FormOpen(frmHardware);
})




/*
   __                 _____                _       
  / _|               / ____|              | |      
 | |_ _ __ _ __ ___ | |     _ __ ___  __ _| |_ ___ 
 |  _| '__| '_ ` _ \| |    | '__/ _ \/ _` | __/ _ \
 | | | |  | | | | | | |____| | |  __/ (_| | ||  __/
 |_| |_|  |_| |_| |_|\_____|_|  \___|\__,_|\__\___|
*/

btnGenerateMnemonic.addEventListener('click', () => {
    lblMnemonicGenerated.innerHTML = BIP39.CreateMnemonic(parseInt(cbxWordCount.value));
    btnContinueCreate.disabled = false;
});
btnContinueCreate.addEventListener('click', () => {
    FormOpen(frmSetPassword);
});
btnReturnCreate.addEventListener('click', () => {
    btnContinueCreate.disabled = true;
    lblMnemonicGenerated.innerHTML = "";
    FormOpen(frmStart);
})




/*
   __                _____           _                 
  / _|              |  __ \         | |                
 | |_ _ __ _ __ ___ | |__) |___  ___| |_ ___  _ __ ___ 
 |  _| '__| '_ ` _ \|  _  // _ \/ __| __/ _ \| '__/ _ \
 | | | |  | | | | | | | \ \  __/\__ \ || (_) | | |  __/
 |_| |_|  |_| |_| |_|_|  \_\___||___/\__\___/|_|  \___|
*/

const words = BIP39.words;

btnAcceptSuggestion.addEventListener('click', () => {
    var suggestion = words.find(x => x.startsWith(lblWord.innerHTML.toLowerCase()));
    if (suggestion && txtSuggestion.value != "") {
        lblMnemonicPhrase.innerHTML += suggestion + ' ';
        lblWord.innerHTML = '';
        txtSuggestion.value = '';
    }
});
btnBackSpace.addEventListener('click', () => {
    lblWord.innerHTML = lblWord.innerHTML.substring(0, lblWord.innerHTML.length - 1);
    if (lblWord.innerHTML != '')
        txtSuggestion.value = words.find(x => x.startsWith(lblWord.innerHTML.toLowerCase())) || "Not in BIP39"
    else
        txtSuggestion.value = '';
});
btnContinueRestore.addEventListener('click', () => {
    if (BIP39.CheckMnemonic(lblMnemonicPhrase.innerHTML.trim()))
        FormOpen(frmSetPassword);
    else {
        lblMessage.innerHTML = 'Invalid Mnemonic';
        setTimeout(() => {
            lblMessage.innerHTML = '';
        }, 5000);
    }
})
function keyboardClick(button) {
    lblWord.innerHTML += button.innerHTML;
    txtSuggestion.value = words.find(x => x.startsWith(lblWord.innerHTML.toLowerCase())) || "Not in BIP39"
}
btnClearRestore.addEventListener('click', () => {
    lblMnemonicPhrase.innerHTML = "";
});
btnReturnRestore.addEventListener('click', () => {
    lblMnemonicPhrase.innerHTML = "";
    FormOpen(frmStart);
});




/*
   __                _    _               _                     __          __   _ _      _   
  / _|              | |  | |             | |                    \ \        / /  | | |    | |  
 | |_ _ __ _ __ ___ | |__| | __ _ _ __ __| |_      ____ _ _ __ __\ \  /\  / /_ _| | | ___| |_ 
 |  _| '__| '_ ` _ \|  __  |/ _` | '__/ _` \ \ /\ / / _` | '__/ _ \ \/  \/ / _` | | |/ _ \ __|
 | | | |  | | | | | | |  | | (_| | | | (_| |\ V  V / (_| | | |  __/\  /\  / (_| | | |  __/ |_ 
 |_| |_|  |_| |_| |_|_|  |_|\__,_|_|  \__,_| \_/\_/ \__,_|_|  \___| \/  \/ \__,_|_|_|\___|\__|
*/

btnLedgerWallet.addEventListener('click', () => {
    fs.writeFileSync(global.path + '/ledger.dgb', "Nothing here, hardware wallet!");
    gbPassword.classList.add('d-none');
    global.wallet = "ledger";
    FormOpen(frmApp);
});
btnReturnHardware.addEventListener('click', () => {
    FormOpen(frmStart);
});




/*
   __                 _____      _   _____                                    _ 
  / _|               / ____|    | | |  __ \                                  | |
 | |_ _ __ _ __ ___ | (___   ___| |_| |__) |_ _ ___ _____      _____  _ __ __| |
 |  _| '__| '_ ` _ \ \___ \ / _ \ __|  ___/ _` / __/ __\ \ /\ / / _ \| '__/ _` |
 | | | |  | | | | | |____) |  __/ |_| |  | (_| \__ \__ \\ V  V / (_) | | | (_| |
 |_| |_|  |_| |_| |_|_____/ \___|\__|_|   \__,_|___/___/ \_/\_/ \___/|_|  \__,_|
*/

btnSaveWallet.addEventListener('click', () => {
    if (txtCreatePassword.value == txtRepeatPassword.value) {
        var seed = BIP39.MnemonicToSeed((lblMnemonicGenerated.innerHTML + lblMnemonicPhrase.innerHTML).trim());
        var data = Buffer.from(HDPrivateKey.fromSeed(seed).toString());

        var encrypted = EncryptAES256(data, txtCreatePassword.value);

        fs.writeFileSync(global.path + '/wallet.dgb', encrypted);
        global.wallet = "software";

        FormOpen(frmApp);
    } else {
        lblPasswordAlert.classList.remove("d-none")
        setTimeout(() => { lblPasswordAlert.classList.add("d-none") }, 5000)
    }
});




/*
   __                                     
  / _|                  /\                
 | |_ _ __ _ __ ___    /  \   _ __  _ __  
 |  _| '__| '_ ` _ \  / /\ \ | '_ \| '_ \ 
 | | | |  | | | | | |/ ____ \| |_) | |_) |
 |_| |_|  |_| |_| |_/_/    \_\ .__/| .__/ 
                             | |   | |    
                             |_|   |_|    
*/

btnCheckSign.addEventListener('click', () => {
    var digiid = null;

    try { digiid = new DigiID(txtURI.value) }
    catch { }

    if (digiid) {
        lblCallback.innerHTML = digiid.callback;
        FormOpen(frmSign);
    }
});
btnDigiByte.addEventListener('click', () => {
    require('electron').shell.openExternal("https://www.digi-id.io/");
});
btnSettings.addEventListener('click', () => {
    FormOpen(frmSettings);
});
btnAbout.addEventListener('click', () => {
    //FormOpen(frmAbout);
});




/*
   __                 _____ _             
  / _|               / ____(_)            
 | |_ _ __ _ __ ___ | (___  _  __ _ _ __  
 |  _| '__| '_ ` _ \ \___ \| |/ _` | '_ \ 
 | | | |  | | | | | |____) | | (_| | | | |
 |_| |_|  |_| |_| |_|_____/|_|\__, |_| |_|
                               __/ |      
                              |___/       
*/

const Transport = require('@ledgerhq/hw-transport-node-hid').default;
const AppBtc = require("@ledgerhq/hw-app-btc").default;

btnSign.addEventListener('click', async () => {
    if (global.wallet == "software") {
        var hdPrivateKey = null;
        var digiid = null;
        try {
            var data = fs.readFileSync(global.path + '/wallet.dgb')
            var xprv = DecryptAES256(data, txtPassword.value);
            txtPassword.value = "";

            hdPrivateKey = new HDPrivateKey(xprv);
            delete xprv;

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
    } else if (global.wallet == "ledger") {
        var digiid = new DigiID(txtURI.value);
        var path = digiid.path(parseInt(txtIndex.value));

        try { var transport = await Transport.create(1000, 1000); }
        catch {
            lblStatus.innerHTML = "<i class='bi bi-x-octagon-fill'></i> Connect hardware wallet";
            gbHash.classList.add('d-none');
            lblHash.innerHTML = "";
        }

        lblHash.innerHTML = SHA256(txtURI.value).toString('hex');
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
                lblHash.innerHTML = "";
            }

            if (btc && address && result) {

                var v = result['v'] + 27 + 4;
                var signature = Buffer.from(v.toString(16) + result['r'] + result['s'], 'hex').toString('base64');

                if (POST(digiid.callback, { uri: txtURI.value, address, signature }) == 200)
                    lblStatus.innerHTML = "<i class='bi bi-patch-check-fill'></i> Success";
                else
                    lblStatus.innerHTML = "<i class='bi bi-x-octagon-fill'></i> Authentication failed";

                gbHash.classList.add('d-none');
                lblHash.innerHTML = "";
            }
        }
    }

    txtURI.value = "";

    FormOpen(frmApp);
    setTimeout(() => { lblStatus.innerHTML = "Digi-ID authentication protocol"; }, 5000);
});
btnReturn.addEventListener('click', () => {
    lblStatus.innerHTML = "<i class='bi bi-x-octagon-fill'></i> Authentication canceled";
    txtURI.value = "";

    FormOpen(frmApp);
    setTimeout(() => { lblStatus.innerHTML = "Digi-ID authentication protocol"; }, 5000);
});
cbxIndex.addEventListener('change', () => {
    gbIndex.classList.remove('d-none');
    txtIndex.value = 0;
    if (!cbxIndex.checked)
        gbIndex.classList.add('d-none');
});




/*
   __                 _____      _   _   _                 
  / _|               / ____|    | | | | (_)                
 | |_ _ __ _ __ ___ | (___   ___| |_| |_ _ _ __   __ _ ___ 
 |  _| '__| '_ ` _ \ \___ \ / _ \ __| __| | '_ \ / _` / __|
 | | | |  | | | | | |____) |  __/ |_| |_| | | | | (_| \__ \
 |_| |_|  |_| |_| |_|_____/ \___|\__|\__|_|_| |_|\__, |___/
                                                  __/ |    
                                                 |___/     
*/

btnReturnSettings.addEventListener('click', () => {
    FormOpen(frmApp)
});
btnRestartSettings.addEventListener('click', () => {
    FormOpen(frmRestart);
});
btnPasswordSettings.addEventListener('click', () => {
    FormOpen(frmChangePassword);
});




/*
   __                         _                 _   
  / _|                  /\   | |               | |  
 | |_ _ __ _ __ ___    /  \  | |__   ___  _   _| |_ 
 |  _| '__| '_ ` _ \  / /\ \ | '_ \ / _ \| | | | __|
 | | | |  | | | | | |/ ____ \| |_) | (_) | |_| | |_ 
 |_| |_|  |_| |_| |_/_/    \_\_.__/ \___/ \__,_|\__|
*/

btnReturnAbout.addEventListener('click', () => {
    FormOpen(frmApp)
});




/*
   __                _____           _             _   
  / _|              |  __ \         | |           | |  
 | |_ _ __ _ __ ___ | |__) |___  ___| |_ __ _ _ __| |_ 
 |  _| '__| '_ ` _ \|  _  // _ \/ __| __/ _` | '__| __|
 | | | |  | | | | | | | \ \  __/\__ \ || (_| | |  | |_ 
 |_| |_|  |_| |_| |_|_|  \_\___||___/\__\__,_|_|   \__|
*/

btnRestart.addEventListener('click', () => {
    if (txtRestart.value == 'restart') {
        if (fs.existsSync(global.path + '/wallet.dgb'))
            fs.unlinkSync(global.path + '/wallet.dgb');
        if (fs.existsSync(global.path + '/ledger.dgb'))
            fs.unlinkSync(global.path + '/ledger.dgb');

        gbPassword.classList.remove('d-none');
        delete global.wallet;

        txtRestart.value = '';
        FormOpen(frmStart);
    }
});
btnReturnRestart.addEventListener('click', () => {
    FormOpen(frmSettings);
});





/*
   __                 _____ _                            _____                                    _ 
  / _|               / ____| |                          |  __ \                                  | |
 | |_ _ __ _ __ ___ | |    | |__   __ _ _ __   __ _  ___| |__) |_ _ ___ _____      _____  _ __ __| |
 |  _| '__| '_ ` _ \| |    | '_ \ / _` | '_ \ / _` |/ _ \  ___/ _` / __/ __\ \ /\ / / _ \| '__/ _` |
 | | | |  | | | | | | |____| | | | (_| | | | | (_| |  __/ |  | (_| \__ \__ \\ V  V / (_) | | | (_| |
 |_| |_|  |_| |_| |_|\_____|_| |_|\__,_|_| |_|\__, |\___|_|   \__,_|___/___/ \_/\_/ \___/|_|  \__,_|
                                               __/ |                                                
                                              |___/                                                 
*/

btnChangePassword.addEventListener('click', () => {
    if (txtNewPassword.value == txtNewRepeatPassword.value) {
        try {
            var data = fs.readFileSync(global.path + '/wallet.dgb')
            var xprv = DecryptAES256(data, txtOldPassword.value);
            txtPassword.value = "";
        }
        catch {
            lblChangePasswordMessage.innerHTML = 'Wrong password';
            setTimeout(() => {
                lblChangePasswordMessage.innerHTML = '';
            }, 5000);
        }

        var encrypted = EncryptAES256(xprv, txtNewPassword.value);
        fs.writeFileSync(global.path + '/wallet.dgb', encrypted);

        lblStatus.innerHTML = 'Password changed';
        setTimeout(() => { lblStatus.innerHTML = "Digi-ID authentication protocol"; }, 5000);
        FormOpen(frmApp);
    } else {
        lblChangePasswordMessage.innerHTML = "The passwords doesn't match";
        setTimeout(() => {
            lblChangePasswordMessage.innerHTML = '';
        }, 5000);
    }
});
btnReturnChange.addEventListener('click', () => {
    FormOpen(frmSettings);
});