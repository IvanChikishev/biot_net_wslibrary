const socket = require('../socket');
const cliget = require('biot-wsclient');
const websocket = require('ws');

function exampleData(id) {
  console.log(`${id}>>worked`);

  return [id, 123, 321];
}
async function Start() {
  let server = socket.createServer([exampleData], {
    port: 3303
  });

  let client = new websocket("ws://127.0.0.1:3303");

  client.on('open', async function() {
    let stream = cliget(client);

    console.log(await stream.send({
      name: 'getBalance',
      args: []
    }));
    console.log(await stream.send({
      name: 'exampleData',
      args: [5534]
    }));
    console.log(await stream.send({
      name: '',
      args: [-1]
    }));
  });

  return 'ok';
}


Start().then(console.log).catch(console.error);
