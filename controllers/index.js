var f_index = async (ctx, next) =>{
    // console.log('render2');
    ctx.render('index.html',{
        title: 'hello cc!'
    });
    // ctx.response.type = 'text/html';
    // ctx.response.body = '<h1>ddd</h1>';
};

module.exports = {
    'GET /': f_index
};