const {
  Server
} = require('ws');

exports.createServer = function(state, configure = {}, passid) {
  let server = new Server(configure);
  let seqeunceState = {};

  for (let stateActionId in state) {
    let action = state[stateActionId];
    seqeunceState[action.name] = action;
  }

  server.on('connection', function(socket) {
    let pinedState = false;

    socket.on('message', async function(stateData) {
      stateData = JSON.parse(stateData);

      if(passid && !pinedState) {
        if(stateData.name === 'auth' && stateData.args[0] == passid) {
          pinedState = true;
          socket.send(JSON.stringify({id: stateData.id, name:'auth', status: 1, source:'super'}));
          return;
        }
        else
        {
          socket.send(JSON.stringify({id: stateData.id, name:'auth', status: 0, source:'incorrect password'}));
          await new Promise(resolve => setTimeout(resolve(), 1000));
          return socket.close();
        }
      }



      try {
        let argumentsStateData = stateData.args;
        if (seqeunceState.hasOwnProperty(stateData.name)) {
          try {
            let resultState = await seqeunceState[stateData.name](...argumentsStateData);
            socket.send(JSON.stringify({
              id: stateData.id,
              name: stateData.name,
              status: 1,
              source: resultState
            }))
          } catch (errorState) {
            socket.send(JSON.stringify({
              id: stateData.id,
              name: stateData.name,
              status: 2,
              source: errorState
            }));
          }

          return;
        }

        socket.send(JSON.stringify({
          id: stateData.id,
          name: stateData.name,
          status: 0,
          source: 'Command not found'
        }));
      } catch (errorState) {
        socket.send(JSON.stringify({
          id: -1,
          name: -1,
          status: 2,
          source: 'When working with the package, an error occurred, try again'
        }));
      }
    });
  });


  return server;
};
