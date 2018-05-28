exports.make = function()  {
    let  css = {
            h1: {
                color: '#369',
                'font-family': 'Arial, Helvetica, sans-serif'
            }
         };

    let  n = xs.uic('h1', null, 'Welcome to coServ!', css);
    return  n;
}