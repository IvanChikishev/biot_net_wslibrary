const WebSocket = require('ws');

const compress = function(stateData) {
  return JSON.stringify(stateData || {});
}

const uncompress = function(stateData) {
  return JSON.parse(stateData || {});
};

const createServer = function(state, configure) {
  let server = new WebSocket.Server(configure);
  let seqeunceState = new Array();

  for (let stateActionId in state) {
    let action = state[stateActionId];
    seqeunceState[action.name] = action;
  }

  server.on('connection', function connect(socket) {
    socket.on('message', async function message(stateData) {
      stateData = uncompress(stateData);
      try {
        let argumentsStateData = stateData.args;
        if (seqeunceState.hasOwnProperty(stateData.name)) {
          try {
            let resultState = await seqeunceState[stateData.name](...argumentsStateData);
            socket.send(compress({
              id: stateData.id,
              name: stateData.name,
              status: 1,
              source: resultState
            }))
          } catch (errorState) {
            socket.send(compress({
              id: stateData.id,
              name: stateData.name,
              status: 2,
              source: errorState
            }));
          }

          return;
        }

        socket.send(compress({
          id: stateData.id,
          name: stateData.name,
          status: 0,
          source: 'Command not found'
        }));
      } catch (errorState) {
        socket.send(compress({
          id: -1,
          name: -1,
          status: 2,
          source: 'When working with the package, an error occurred, try again'
        }));
      }
    });
  });


  return server;
}


module.exports.createServer = createServer;
