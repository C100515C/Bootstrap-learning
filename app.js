const Koa = require('koa');
const router = require('koa-router')();
const koaBoadyParser = require('koa-bodyparser');
const controller = require('./controller');
const env = require('./Env');

const isProduct = process.env.NODE_ENV === 'production';

const app = new Koa();

app.use(async (ctx, next)=>{
    // console.log('render00');
    var time = new Date().getTime();
    var end;
    await next();
    end = new Date().getTime() - time;
    ctx.response.set('X-Response-Time', `${end}ms`);

});

if (!isProduct) {
    let staticFiles = require('./stitic-files');
    app.use(staticFiles('/static/', __dirname + '/static'));
}

app.use(koaBoadyParser());

app.use(env('views',{
    noCache:!isProduct,
    watch:!isProduct
}));

app.use(controller());

app.listen(8080);
console.log('listen port 8080');