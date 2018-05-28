#!/usr/bin/env node

const  help = require('../help/help'),
       Promise = require('bluebird'),
       resolve = require('resolve');

process.title = 'xs';

let  argv = process.argv;
if (argv.length < 3)
    ending({code: 1});
else  {
    resolve('@coserv/cli', {basedir: process.cwd()}, (err, cmdPath) => {
        let  cli;
    
        if (err)
            // fall back to the default path
            cli = require('../lib/cli');
        else
            cli = require(cmdPath);
    
        Promise.resolve(cli.run( argv[2], argv.slice(3) )).then( (result) => {
            ending( result );
        });
    });
}

function  ending(result)  {
    let  message,
         exitCode = 0,
         outStream = process.stdout;

    if (result)  {
        if (result.message)
            message = result.message;
        exitCode = result.code || 0;
    }

    if (exitCode > 0)
        help.showHelp(message, outStream).then( () => {
            process.exit( exitCode );
        });
    else  if (message)
        outStream.write( message + '\n\n', (err) => {
            process.exit( exitCode );
        });
    else
        process.exit( exitCode );
}