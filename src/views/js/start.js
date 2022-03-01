btnCreateWallet.addEventListener('click', () => {
    FormClose();
    FormOpen(frmCreate);
});
btnRestoreWallet.addEventListener('click', () => {
    FormClose();
    FormOpen(frmRestore);
});
btnHardwareWallet.addEventListener('click', () => {
    console.log(__dirname);
})