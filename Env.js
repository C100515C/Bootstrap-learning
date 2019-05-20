const nunjucks = require('nunjucks');

function createEnv(path, opts){
    var autoescape = opts.autoescape === undefined ? false : opts.autoescape,
        nocache = opts.nocache === undefined ? false : opts.nocache,
        watch = opts.watch === undefined ? false : opts.watch,
        throwOnUndefined = opts.throwOnUndefined === undefined ? false : opts.throwOnUndefined;
    var env = new nunjucks.Environment(new nunjucks.FileSystemLoader(path ||'views',{
        noCache:nocache,
        watch:watch
    }),{
        autoescape:autoescape,
        throwOnUndefined:throwOnUndefined
    });

    if (opts.filters){
        for (var f in opts.filters){
            env.addFilter(f, opts.filters[f]);
        }
    }
    return env;
}

function templating(path, opts){
    var env = createEnv(path,opts);

    return async (ctx,next)=>{
        ctx.render = async (view,model) =>{
            // console.log('render1');
            ctx.response.type = 'text/html';
            ctx.response.body = env.render(view, Object.assign({},ctx.state||{}, model||{}));
        };
        await next();
    };
}

module.exports = templating;