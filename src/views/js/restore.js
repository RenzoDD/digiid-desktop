const words = BIP39.words;

function EncryptAES256(data, password) {
    var data = Buffer.from(data);
    var password = this.SHA256(Buffer.from(password));
    var cipher = crypto.createCipheriv("aes-256-cbc", password, Buffer.alloc(16));
    var encryptedData = cipher.update(data, "utf-8", "hex") + cipher.final("hex");
    return Buffer.from(encryptedData, 'hex');
}

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
    if (lblWord.innerHTML != '') {
        txtSuggestion.value = words.find(x => x.startsWith(lblWord.innerHTML.toLowerCase())) || "Not in BIP39"
    } else {
        txtSuggestion.value = '';
    }
});
btnContinueRestore.addEventListener('click', () => {
    if (BIP39.CheckMnemonic(lblMnemonicPhrase.innerHTML.trim())){
        FormClose();
        FormOpen(frmSetPassword);
    }
    else
        alert('Invalid Mnemonic')
})

function keyboardClick(button) {
    lblWord.innerHTML += button.innerHTML;
    txtSuggestion.value = words.find(x => x.startsWith(lblWord.innerHTML.toLowerCase())) || "Not in BIP39"
}


btnReturnRestore.addEventListener('click', () => {
    lblMnemonicPhrase.innerHTML = "";
    FormClose();
    FormOpen(frmStart);
});