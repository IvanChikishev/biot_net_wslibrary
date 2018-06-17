async function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}


async function helloWorld() {
    await delay(1000);
    return "Hello, World!";
}


function getVersion() {
    return "0.0.1 beta_v_1 net_callback";
}

async function MathExampleData(a, b, stringData) {
    let c = a + b;
    await delay(2000);
    return [c, stringData];
}


module.exports = {
  helloWorld: helloWorld,
  getVersion: getVersion,
  MathExampleData: MathExampleData
};