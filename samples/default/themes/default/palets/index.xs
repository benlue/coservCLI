exports.view = function()  {
    let  root = xs.root(css())
                  .add('h1', 'Welcome to coServ!')
                  .add('div', ['img', {src: '/img/xs.png'}]);

    return  root;
}


function  css()  {
    return  {
        '.': {
            'text-align': 'center',
            'margin': '20pt'
        },
        h1: {
            color: '#396',
            'font-family': 'Arial, Helvetica, sans-serif'
        }
    };
}