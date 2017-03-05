const handlebars = Handlebars;

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