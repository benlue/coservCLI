const  Promise = require('bluebird'),
       createCmd = require('./cmd/create'),
       serveCmd = require('./cmd/serve');

const  commands = {
    create: {
        description: 'create a new web app',
        action: createCmd.execute
    },
    service: {
        description: 'start the coserver server',
        action: serveCmd.execute
    }
};

exports.run = function(act, argv)  {
    let  cmd = commands[act],
         result;

    if (cmd)
        result = cmd.action(argv, process.stdin, process.stdout);
    else
        result = warning();

    return  result;
}


function  warning()  {
    return  new Promise( (resolve) => {
        resolve({
            code: -1,
            message: 'No such command'
        });
    })
}


function  createWebSite(argv, inStream, outStream)  {
    return  new Promise( (resolve) => {
        outStream.write('Hello\n', () => {
            resolve();
        });
    });
}