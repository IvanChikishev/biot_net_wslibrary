

# biot-wsocket
## Websocket server for [biot-core](https://github.com/BIoTws/biot-core) library, initializes the network bridge, supports async / await.

</br></br>

## How to install
</br>

#### downloads project files
```
> git clone https://github.com/remmelgas/biot-wsocket
```

#### install dependencies
```
> npm install
> ./testnetify.sh
```

#### run server
```
> node server
```
</br>


## Example client

> For an example on nodejs, we will use the [biot-wsclient](https://github.com/remmelgas/biot-wsclient) library

</br>

```
> npm --save -i https://github.com/remmelgas/biot-wsclient.git
```

</br></br>

```javascript
const wsclient = require('biot-wsclient');
const ws = require('ws');


function Start() {
    let client = new ws('ws://127.0.0.1:3303');

    client.on('open', async () => {
        let stream = wsclient(client);


        let result = await stream.send({
            name: 'getMyDeviceWallets', args: []
        });


        console.log(result[1]);
    });

}

Start();
```
#### terminal
```
> node examples/example1
```