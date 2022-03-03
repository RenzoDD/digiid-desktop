btnCreateWallet.addEventListener('click', () => {
    FormClose();
    FormOpen(frmCreate);
});
btnRestoreWallet.addEventListener('click', () => {
    FormClose();
    FormOpen(frmRestore);
});
btnHardwareWallet.addEventListener('click', () => {
    fs.writeFileSync(global.path + '/ledger.dgb', "Nothing here, hardware wallet!");
	gbPassword.classList.add('d-none');
    global.ledger = true;
    FormClose();
    FormOpen(frmApp);
})