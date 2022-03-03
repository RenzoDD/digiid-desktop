btnCheckSign.addEventListener('click', () => {
    var digiid = null
    try { digiid = new DigiID(txtURI.value) } catch {}

    if (digiid) {
        lblCallback.innerHTML = digiid.callback;
        FormClose();
        FormOpen(frmSign);
    }
});

btnDigiByte.addEventListener('click', () => {
    require('electron').shell.openExternal("https://www.digi-id.io/");
})