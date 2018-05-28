exports.make = function()  {
    let  css = {
            '.': {
                'text-align': 'center',
                'margin': '20pt'
            },
            h1: {
                color: '#396',
                'font-family': 'Arial, Helvetica, sans-serif'
            }
         };

    let  n = xs.uic('div', null, null, css)
               .add('h1', 'Welcome to coServ!');
    n.nest('div')
     .add('image', {src: '/img/xs.png'});

    return  n;
}