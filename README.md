

### Initialize server side
##### server-side example


```ecmascript 6
   let bind = netcore.bind([
        core.createNewWallet,
        core.getWallets,
        core.getMyDeviceWallets,
        core.getAddressesInWallet,
        core.createNewAddress,
        core.getWalletBalance,
        core.getAddressBalance,
        core.sendTextMessageToDevice,
        core.sendTechMessageToDevice,
        core.sendPaymentFromWallet,
        core.sendPaymentFromWalletUseUnstableUnits,
        core.getListTransactionsForAddress,
        core.getListTransactionsForWallet,
        core.myAddressInfo,
        core.signDevicePrivateKey,
        core.signWithAddress,
        core.verifySign,
        core.addCorrespondent,
        core.removeCorrespondent,
        core.listCorrespondents

    ]);

    await core.init('test');
    let server = netcore.init(bind, {host: '127.0.0.1', port: 23232});

```
