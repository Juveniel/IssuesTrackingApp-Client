const handlebars = Handlebars;

Handlebars.registerHelper('ifCond', function(v1, v2, options) {
    if(v1 === v2) {
        return options.fn(this);
    }
    return options.inverse(this);
});

class HandlebarsTemplate {
    constructor(){
        this.cache = {};
    }

    getTemplate(name){
        var cache = this.cache;
        var _this = this;
        return new Promise(function(resolve, reject){
            if(cache[name]){
                resolve(cache[name]);
            } else {
                $.get(`./scripts/views/${name}.handlebars`, function(templateHtml){
                    var template = handlebars.compile(templateHtml);
                    cache[name] = template;
                    resolve(template);
                });
                _this.cache = cache;
            }
        });
    }
}