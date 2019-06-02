const  forever = require('forever-monitor'),
       fs = require('fs'),
       path = require('path'),
       resolve = require('resolve'),
       terminate = require('terminate');

let  config = {
        server: {
            wwwPath: "",
            port: 4040
            //maxSockets: 200
        },
        rpc: {
            port: 3000
        },
        apiEngine: {
            host: 'coimapi.net',
            port: 80,
            method: 'POST',
            version: 'v2'
        }
     };

exports.execute = function(argv, inStream, outStream)  {
    if (argv.length)  {
        let  result;

        switch (argv[0])  {
            case  'stop':
                result = stopServer();
                break;

            case  'restart':
                result = restartServer();
                break;
        }

        if (!result)
            result = {
                code: 1,
                message: 'Unknown server action: ' + argv[0]
            };

        return  result;
    }
    else
        return  startServer();
}


function  startServer()  {
    let wwwPath = path.join(process.cwd(), './www');
    config.server.wwwPath = wwwPath;

    let  configFile = process.cwd() + '/config.json';
    if (!fs.existsSync(configFile))
        fs.writeFileSync(configFile, JSON.stringify(config, null, 4));

    let  pidFile = process.cwd() + '/xs.pid';
    // check if coServ is already running
    if (fs.existsSync(pidFile))
        return  {
            code: -2,
            message: 'There is already an coServ instance running.'
        };

    return  new Promise( done => {
        resolve('coserv', {basedir: __dirname}, (err, res) => {
            let  cmd = path.join(res, '../../../coServ.js'),
                 option = {
                     silent: false,
                     args: ['-c', configFile]
                 };

            let  child = new (forever.Monitor)(cmd, option);
            child.start();

            pid = child.child.pid;
            fs.writeFile(pidFile, pid, (err) => {
                let  result;

                if (err)  {
                    console.log( err.stack );
                    result = {
                        code: -2,
                        message: "Failed to create the xs.pid file. You won't be able to stop/restart coServ using 'xs serve stop/restart'"
                    };
                }
                else
                    result = {
                        code: 0,
                        message: 'coServ started...'
                    };

                done(result);
            });
        });
    });
}


function  stopServer()  {
    let  pidFile = process.cwd() + '/xs.pid';
    return  new Promise( done => {
        fs.readFile(pidFile, (err, pid) => {
            if (err)
                done({
                    code: -2,
                    message: 'There is no running coServ to stop.'
                });
            else  {
                //console.log('pid: ' + pid);
                terminate(pid, (err) => {
                    if (err)
                        console.log(err);

                    fs.unlink( pidFile, () => {
                        done({
                            code: 0,
                            message: 'Server stopped.'
                        });
                    });
                });
            }
        });
    });
}


function  restartServer()  {
    return  Promise.resolve( stopServer() ).then( res => {
        if (res.code)
            return  res;

        return  startServer();
    });
}