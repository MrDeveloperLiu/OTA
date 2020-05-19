function imageLazyLoader(cls) {
    
    function _start() {
        console.log("lazy-image-load");
        window.addEventListener("scroll", _windowOnScroll);
        window.addEventListener("pageshow", _forcePageReload);
        window.addEventListener("onbeforeload", _forcePageRefresh);
        _windowOnScroll();
    }
    
    function _stop() {
        console.log("lazy-image-unload");
        window.removeEventListener("scroll", _windowOnScroll);
        window.removeEventListener("pageshow", _forcePageReload);
        window.removeEventListener("onbeforeload", _forcePageRefresh);
    }

    function _forcePageReload(event) {
        if (event.persisted) {
            _reloadImages();
            console.log("imageLazyLoader will load cache");
        }
    }

    function _forcePageRefresh(event) {
        _reloadImages();
        console.log("imageLazyLoader will refresh");
    }

    function _reloadImages() {
        _resetToUnload();
        _windowOnScroll();
    }

    function _resetToUnload() {
        var lazyImgElements = document.getElementsByClassName(lazyLoad_cls);
        for (var i = 0; i < lazyImgElements.length; i++){
            var img = lazyImgElements[i];
            img.setAttribute("data-loaded", "0");
        }
    }
    
    function _windowOnScroll() {
        if (lazyLoad_timer) {
            clearTimeout(lazyLoad_timer);
        }
        lazyLoad_timer = setTimeout(_windowDidEndScroll, timer_interval);
    }

    function _windowDidEndScroll() {
        var lazyImgElements = document.getElementsByClassName(lazyLoad_cls);
        for (var i = 0; i < lazyImgElements.length; i++){
            var img = lazyImgElements[i];
            if (img.getAttribute("data-loaded") === "1") {
                continue;
            }
            if (!_imageIsOnScreen(img)) {
                continue;
            }
            _loadImage(img);
        }
        lazyLoad_timer = null;
    }

    function _loadImage(img){
        var src = img.getAttribute("data-src");
        img.setAttribute("data-loaded", "1");
        img.onload = function(){
            if (img.getAttribute("data-fit") === "natural") {
                var size = ut_imageFitSizeAccordingNatural(img, 0);
                img.height = size.height;
            }
        };
        img.onerror = function() {
            img.setAttribute("data-loaded", "2");
        };
        img.onabort = function() {
            img.setAttribute("data-loaded", "3");
        }
        img.src = src;
//        console.log("loading", img);
    }

    function _imageIsOnScreen(img) {
        _imageDefaultSize(img);
        var imgHeight = img.height;
        var imgTop = img.offsetTop;
        var topCondition = window.pageYOffset - imgHeight;
        var bottomCondition = (window.innerHeight + window.pageYOffset);
        return (imgTop >= topCondition) && (imgTop <= bottomCondition);
    }

    function _imageDefaultSize(img) {
        if (img.width <= 0) {
            img.width = screen.width;
        }
        if (img.height <= 0) {
            img.height = img.width;
        }
    }

    var lazyLoad_timer = null;
    var timer_interval = 200;
    var lazyLoad_cls = cls;
    
    return {
        start : _start,
        stop : _stop,
    };
}

