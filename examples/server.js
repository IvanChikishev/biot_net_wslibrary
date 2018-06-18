const netcore = require('../netcore');
const bbConstatns = require('byteballcore/constants');
const core = require('biot-core');


const WebSocket = require('ws');

function test() {
    let ws = new WebSocket("http://127.0.0.1:23232");


    ws.on('open', function () {
        console.error(`[${new Date().toISOString()}][CLIENT] has been connected to server`);


        ws.send(JSON.stringify([1, 'getMyDeviceWallets']));
    });


    let wallets = [];
    let addresses = [];
    let walletBalance = [];
    let addressesBalance = [];

    ws.on('message', function (data) {
        data = JSON.parse(data);
        switch (data[1]) {
            case 'getMyDeviceWallets':
                wallets = data[3];
                ws.send(JSON.stringify([2, 'getAddressesInWallet', wallets[0]]));
                break;

            case 'getAddressesInWallet':
                addresses = data[3];
                ws.send(JSON.stringify([3, 'getWalletBalance', wallets[0]]));
                break;

            case 'getWalletBalance':
                walletBalance = data[3];
                ws.send(JSON.stringify([3, 'getAddressBalance', addresses[0]]));
                break;

            case 'getAddressBalance':
                addressesBalance = data[3];


                console.error(`[CLIENT] output results >> [${wallets}${addresses}${walletBalance}${addressesBalance}]`)
                break;
        }
    });
}


async function Start() {



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

    test();
    return 'ok';
}


Start();
