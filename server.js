const netcore = require('./netcore');
const testcode = require('./examples/test');


const WebSocket = require('ws');

function test() {
    let ws = new WebSocket("http://127.0.0.1:27715");


    ws.on('open', function () {
        console.log(`[${new Date().toISOString()}][CLIENT] has been connected to server`);


        ws.send(JSON.stringify([100, 'getVersion']));
        ws.send(JSON.stringify([100, 'helloWorld']));
        ws.send(JSON.stringify([100, 'helloWorld2']));
        ws.send(JSON.stringify([100, 'MathExampleData', 10, 10, "testString"]));
    });


    ws.on('message', function (data) {
        console.log(data.toString());
    });
}


function Start() {
    let bind = netcore.bind([
        testcode.getVersion,
        testcode.helloWorld,
        testcode.MathExampleData
    ]);

    netcore.init(bind, {host: '127.0.0.1', port: 27715});


    test();

    return "Server is running";
}


Start().then(console.log).catch(console.error);

