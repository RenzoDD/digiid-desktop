btnGenerateMnemonic.addEventListener('click', () => {
    lblMnemonicGenerated.innerHTML = BIP39.CreateMnemonic(parseInt(cbxWordCount.value));
    btnContinueCreate.disabled = false;
});

btnContinueCreate.addEventListener('click', () => {
    FormClose();
    FormOpen(frmSetPassword);
});

btnReturnCreate.addEventListener('click', () => {
    btnContinueCreate.disabled = true;
    lblMnemonicGenerated.innerHTML = "";
    FormClose();
    FormOpen(frmStart);
})