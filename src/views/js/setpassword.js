btnSaveWallet.addEventListener('click', () => {
    if (txtCreatePassword.value == txtRepeatPassword.value) {
        var seed = BIP39.MnemonicToSeed((lblMnemonicGenerated.innerHTML + lblMnemonicPhrase.innerHTML).trim());
        var xpriv = HDPrivateKey.fromSeed(seed).toString();
        data = Buffer.from(xpriv);
        var password = crypto.createHash('sha256').update(txtCreatePassword.value).digest();
        var cipher = crypto.createCipheriv("aes-256-cbc", password, Buffer.alloc(16));
        var encryptedData = cipher.update(data, "utf-8", "hex") + cipher.final("hex");

        fs.writeFileSync(global.path + '/wallet.dgb', Buffer.from(encryptedData, 'hex'));
	    global.ledger = false;

        FormClose();
        FormOpen(frmApp);
    } else {
        lblPasswordAlert.classList.remove("d-none")
        setTimeout(() => { lblPasswordAlert.classList.add("d-none") }, 5000)
    }
});