const  copy = require('recursive-copy'),
       fs = require('fs'),
       path = require('path'),
       Promise = require('bluebird');

exports.execute = function(argv, inStream, outStream)  {
    if (argv.length)  {
        let  appName = argv[0];
        return  copySamples( appName );
    }
    else
        return  {
            code: 1,
            message: 'The app name is missing.'
        };
}


function  copySamples(appName)  {
    let  src = path.join(__dirname, '../../samples/default'),
         dest = path.join(process.cwd(), './www/' + appName);

    // make sure the destination directory exist!
    makeDirStructure( dest );

    return  new Promise( resolve => {
        copy(src, dest, () => {
            // rename the major theme to the user given name
            let  themePath = path.join(dest, './themes/');
            if (!fs.existsSync(themePath + appName))
                fs.renameSync( themePath + 'default', themePath + appName);

            let  siteFile = path.join(process.cwd(), './www/sites.json');
            fs.writeFile(siteFile, makeSiteInfo(appName), (err) => {
                resolve({code: 0});
            });
        });
    });
}


function  makeDirStructure(fpath) {
    let  ps = fpath.split(path.sep);
    ps.forEach( (dir, index) => {
        if (index > 1) {
            let fullPath = path.join(ps.slice(0, index).join('/'), dir);

            if  (!fs.existsSync(fullPath))
                fs.mkdirSync(fullPath);
        }
    });
}


function  makeSiteInfo(appName)  {
    let  sites = {
            "127.0.0.1": {
                appCode: appName,
                title: 'coServ powered web application',
                sitePath: './' + appName
            }
         };

    return  JSON.stringify(sites, null, 4);
}