function ut_loadImage(src, callback) {
    var image = new Image();
    image.onload = function() {
        callback(image);
    };
    image.src = src;
}

function ut_imageFitSizeAccordingNatural(image, edge) {
    var ratio = (image.naturalHeight) / (image.naturalWidth);
    var width = screen.width - (edge * 2);
    var height = ratio * width;
    return {
        width : width,
        height : height
    };
}

function ut_imageFitSizeAccordingScreen(image, edge) {
    var ratio = (image.height) / (image.width);
    var width = screen.width - (edge * 2);
    var height = ratio * width;
    return {
        width : width,
        height : height
    };
}

function ut_loadImageFitScreen(src, edge, callback) {
    var image = new Image();
    image.onload = function() {
        var size = ut_imageFitSizeAccordingScreen(image, edge);
        callback(image, size.width, size.height);
    };
    image.src = src;
}

function ut_price(p) {
    return p / 100;
}

function ut_formatPrice(p){
    return ut_price(p) + "元";
}

function ut_formatPriceWithDiscount(p, d){
    var price = (p * d) / 10000;
    var priceInt = Math.floor(price);
    return priceInt + "元";
}

function ut_listenDomComplete(callback) {
    document.addEventListener("readystatechange", function (e) {
       if (e.target.readyState === 'complete') {
           callback();
       }
    });
}
