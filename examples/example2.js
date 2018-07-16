const ws = require('ws');


function Start() {
    let client = new ws('ws://127.0.0.1:3303');

    client.on('open', function() {
        let auth = false;

        client.send(JSON.stringify({
            id: 1, name: 'auth', args:[123]
        }));


        client.send(JSON.stringify({
            id: 2, name: 'getMyDeviceWallets', args: []
        }));


        client.on('message', function(stateData) {
            stateData = JSON.parse(stateData);

            if(!auth) {
                if(stateData.name == 'auth' && stateData.status === 1)
                {
                    console.log("Your auth!");

                }

                else {
                    console.log(stateData.source);
                    client.close();
                }


                return;
            }

            console.log(stateData);

        });
    });
}

Start();