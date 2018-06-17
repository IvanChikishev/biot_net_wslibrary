const WebSocket = require('ws');


module.exports.bind = function (state) {
    let _m_array = {};

    for (let _callbackID in state) {
        let _callback = state[_callbackID];

        _m_array[_callback.name] = _callback;
    }


    return _m_array;
};

module.exports.init = function (bind, state) {

    let server = new WebSocket.Server(state);


    server.on('connection', function (socket) {
        socket.on('message', async (message) => {

            try {
                message = JSON.parse(message);

                let args_array = message.slice(2, message.length);
                let _callbackID = message[1];

                if (bind.hasOwnProperty(_callbackID)) {
                    let _callbackReturn = await bind[_callbackID](...args_array);
                    socket.send(JSON.stringify([message[0], message[1], 1, _callbackReturn]));
                }
                else {
                    socket.send(JSON.stringify([message[0], _callbackID, 0, "Command not found"]));
                }
            }

            catch (e) {
                socket.send(JSON.stringify([message[0], message[1], -1, e]));
            }

        });


        socket.on('error', () => {
        });
        socket.on('close', () => {
            socket.close();
        });
    });


    return server;
};
