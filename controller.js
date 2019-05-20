const fs = require('fs');

function addControllers(router, dir){
    var files = fs.readdirSync(__dirname + '/' + dir);
    var js = files.filter((f)=>{
        return f.endsWith('.js');
    });

    for (const f of js){
        let mapping = require(__dirname + `/${dir}/` + f);
        // console.log(__dirname + `/${dir}/` + f);
        addmapping(router,mapping);
    }
}

function addmapping(router, mapping){
    for (const url in mapping){
        if (url.startsWith('GET ')) {
            var path = url.substring(4);
            // console.log(path + ":" + mapping[url]);
            router.get(path, mapping[url]);
        } else if (url.startsWith('POST ')) {
            var path = url.substring(5);
            // console.log(path + mapping[url]);
            router.post(path,mapping[url]);
        }else{
            console.log(`无效url ${url}`);
        }
    }
}

module.exports = function (dir){
    let controller_dir = dir ||'controllers';
    let router = require('koa-router')();
    addControllers(router,controller_dir);
    return router.routes();
};