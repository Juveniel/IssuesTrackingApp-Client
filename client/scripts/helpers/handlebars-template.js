const handlebars = Handlebars;

Handlebars.registerHelper('ifCond', function(v1, v2, options) {
    if(v1 === v2) {
        return options.fn(this);
    }
    return options.inverse(this);
});

Handlebars.registerHelper('inArray', function(collection, id, options) {
    var collectionLength = collection.length;

    for (var i = 0; i < collectionLength; i++) {
        if (collection[i]._id == id) {
            return options.fn(this);
        }
    }

    return options.inverse(this);
});

Handlebars.registerHelper('countStatusInArray', function(collection, id) {
    var collectionLength = collection.length,
        count = 0;

    for (var i = 0; i < collectionLength; i++) {
        if (collection[i].status == id) {
            count += 1;
        }
    }

    return count;
});

Handlebars.registerHelper('option', function(value, label, selectedValue) {
    var selectedProperty = value == selectedValue ? 'selected="selected"' : '';
    return new Handlebars.SafeString('<option value="' + value + '"' +  selectedProperty + '>' + label + "</option>");
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