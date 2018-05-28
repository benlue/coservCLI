const  fs = require('fs'),
       path = require('path'),
       Promise = require('bluebird');

exports.showHelp= function(message, outStream)  {
    return  new Promise( resolve => {
        let  helpFile = path.join(__dirname, './usage.txt');

        fs.readFile(helpFile, (err, text) => {
            if (err)  {
                console.log( err.stack );
                text = '';
            }
            
            if (message)
                text = message + '\n' + text;

            outStream.write( text, (err) => {
                resolve();
            });
        });
    });
}