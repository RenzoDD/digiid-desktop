btnSaveWallet.addEventListener('click', () => {
    if (txtCreatePassword.value == txtCreatePassword.value) {
        var seed = BIP39.MnemonicToSeed((lblMnemonicGenerated.innerHTML + lblMnemonicPhrase.innerHTML).trim());
        var xpriv = HDPrivateKey.fromSeed(seed).toString();
        alert(xpriv);
        data = Buffer.from(xpriv);
        var password = crypto.createHash('sha256').update(txtCreatePassword.value).digest();
        var cipher = crypto.createCipheriv("aes-256-cbc", password, Buffer.alloc(16));
        var encryptedData = cipher.update(data, "utf-8", "hex") + cipher.final("hex");

        fs.writeFileSync(__dirname + '/wallet.dgb', Buffer.from(encryptedData, 'hex'));
        
        FormClose();
        FormOpen(frmApp);
    } else
        alert("Passwords doesn't match");
});