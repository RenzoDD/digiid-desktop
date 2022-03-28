# Digi-ID Testing Sheet

## For Windows

Download the instaler `digiid-win32.exe` and execute it on your computer. If a warning pops out click on continue.

## For Linux

Download the package acording your distribution `digiid-desktop-0.5.0.x86_64.rpm` or `digiid-desktop_0.5.0_amd64.deb` and install it using:

```
sudo apt install {package-name}
```

For `Digi-ID-0.5.0.AppImage` convert it in exacutable with:
```
chmod +x Digi-ID-*.AppImage
```

If you have a Ledger Nano X or S run this command to enable the usb access
```
wget -q -O - https://raw.githubusercontent.com/LedgerHQ/udev-rules/master/add_udev_rules.sh | sudo bash
```

## Tests

Infers the steps to follow for each of the tasks according to the information displayed in the application

1. Create a new wallet generating a 12-word mnemonic phrase and write it here.
- Mnemonic phrase:

2. Login into `digiassetx.com` and write your user id (dax1...).
- UserID: 

3. Login into `digiassets.info` and write your login address here.
- Address: 

4. Restart the wallet to use a diferent mnemonic phrase

5. Restore a wallet and enter this mnemonic phrase `ask ask ask`

6. Login into `digiassetx.com` and write your user id (dax1...).
- UserID: 

7. Login into `digiassets.info` and write your login address here.
- Address: 

If you have a Ledger hardware wallet continue (Your private keys will not be exposed to the internet).

- Connect your Ledger Nano X or S via USB and install the DigiByte app from Ledger Live.
- Open the DigiByte App in your device and start the Digi-ID application on your computer.
- If needed, restart your Digi-ID app and create a hardware wallet instance.

Infers the steps to follow for each of the tasks according to the information displayed in the application

9. Try to login into `digiassets.info`. (If any error occurs report it at the end of the document)

IT IS NOT MANDATORY TO CONTINUE THE TEST AFTER THIS POINT.

CONTINUE ONLY IF YOU HAVE A BACKUP OF YOUR ORIGINAL MNEMONIC PHRASE

PLEASE CONTINUE ONLY IF YOU KNOW HOW TO MANIPULATE YOUR LEDGER DEVICE OR YOU WILL LOSE YOUR FUNDS

- Restart your hardware wallet and restore it using the mnemonic phrase generate on the step 1.
- Install the DigiByte App and open it in your device

10. Try to Login into `digiassetx.com` and write your user id (dax1...).
- UserID: 

11. Try to login into `digiassets.info` and write your login address.
- Address:

## Reports

-

-

-