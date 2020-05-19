function URLParser() {
    
    function build(paramters) {
        if (paramters.length <= 0) return "";
        var res = [];
        for (var pairs in paramters) {
            var key = pairs;
            var value = encodeURI(paramters[pairs]);
            var pairString = key + "=" + value;
            res.push(pairString);
        }
        return res.join("&");
    }
    
    function parse(url) {
        var url = url.split("?")[1];
        var paramters = url.split("&");
        var res = {};
        paramters.forEach(function(it){
            var keyValues = it.split("=");
            var key = keyValues[0];
            var value = decodeURI(keyValues[1]);
            res[key] = value;
        });
        return res;
    }
    
    function buildURL(baseURL, paramters) {
        var query = build(paramters);
        var idx = baseURL.indexOf("?");
        if (idx == -1) {
            return baseURL + "?" + query;
        }
        if (idx == baseURL.length - 1) {
            return baseURL + query;
        }
        return baseURL + "&" + query;
    }

    return {
        parse : parse,
        build : build,
        buildURL : buildURL,
    }
}

var BDURLParser = new URLParser();
