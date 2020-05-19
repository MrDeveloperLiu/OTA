//public
function $isString(v) {
    return (v instanceof String) || (typeof v).toLowerCase() == 'string';
}
function $isNumber(v) {
    return (v instanceof Number) || (typeof v).toLowerCase() == 'number';
}
function $(flag) {
    if ($isString(flag)){
        var retVal = null;
        if (flag.indexOf(":") != -1) {//name (name=)
            retVal = document.getElementsByTagName(flag.split(":")[1]);
        }else if (flag.indexOf("#") != -1) {//tags <t>
            retVal = document.getElementsByName(flag.split("#")[1]);
        }else if (flag.indexOf(".") != -1) {//id (class=)
            retVal = document.getElementById(flag.split(".")[1]);
        }else{
            retVal = document.getElementById(flag);
        }
        if (!retVal) {
            console.log("[Error] $(" + flag + ")" + "is null");
        }
        return retVal;
    }
    return flag; //himself
}
function $goto(url) {
    window.location.href = url;
}
//HTMLDocument
HTMLDocument.prototype.$create = function(flag){
    if ($isString(flag)){
        return this.createElement(flag);
    }
    return this.createDocumentFragment();
}
HTMLDocument.prototype.on = function(name, callback) {
    this.addEventListener(name, callback);
}
//HTMLElement
HTMLElement.prototype.getter = function(name) {
    return this.getAttribute(name);
}
HTMLElement.prototype.setter = function(name) {
    var element = this;
    return (value) => {
        this.setAttribute(name, value);
        return this;
    }
}
HTMLElement.prototype.bind = function(name, callback) {
    this.addEventListener(name, callback);
}
//HTMLImageElement
HTMLImageElement.prototype.setImage = function(url, callback) {
    this.onload = function () {
        if (callback) callback(0, url);
    };
    this.onerror = function () {
        if (callback) callback(-1, url);
    };
    this.onabort = function () {
        if (callback) callback(-2, url);
    };
    this.src = url;
}
//HTMLUListElement
HTMLUListElement.prototype.clickAt = function (cls, callback) {
    var ul = this;
    ul.addEventListener("click", function (e) {
        if (!cls || !callback) return;
        
        var target = e.target;
        while (target && target.parentNode != ul) {
            target = target.parentNode;
        }
        if (cls === target.getter("class")) {
            callback(target);
        }
    });
}
//HTMLOListElement
HTMLOListElement.prototype.clickAt = HTMLUListElement.prototype.clickAt;

