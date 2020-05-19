function WKWheel(datas, interval, callback) {
    var callback = callback;
    var interval = interval;
    
    var prev = -1;
    var index = 0;
    var total = datas.length;
    var timer = null;
    
    function onTimer() {
        var lastFrame = total - 1;
        prev = index;
        if (index >= lastFrame) {//ff
            index = 0;
        }else{//nf
            index ++;
        }
        setFrameByIndex();
    }
    
    function setFrameByIndex(){
        callback(index, total, prev);
    }
    
    return {
        start: function() {
            this.stop();
            timer = setInterval(onTimer, interval);
            setFrameByIndex();
        },
        
        stop: function() {
            clearInterval(timer);
            timer = null;
        },
        
        current: function() {
            return index;
        },
        
        changeAtIndex: function(idx) {
            var lastFrame = total - 1;
            if (idx < 0 || idx > lastFrame) {
                return;
            }
            prev = index;
            index = idx;
            this.start();
        }
    };
}


function installWheelView(datas) {
    //推荐
    var realDatas = [];
    for (var i = 0; i < datas.length; i++) {
        var itemId = datas[i];
        var item = BDProductInfoDict[itemId];
        realDatas.push(item);
    }

    //点点
    var liIndexFragment = $(document).$create();
    for (var j = 0; j < realDatas.length; j++) {
        var it = realDatas[j];
        //index
        var liId = "li-index-" + j;
        var liIndex = $(document).$create("li")
        .setter("class")("index")
        .setter("id")(liId)
        .setter("data-idx")(j)
        .setter("data-id")(it.id);
        liIndex.innerText = (j + 1);
        liIndexFragment.appendChild(liIndex);
    }
    //渲染
    $("ol-index").appendChild(liIndexFragment);

    //轮子
    var wheel = new WKWheel(realDatas, 8000, function(idx, total, prev){
//        console.log("idx", idx, "total", total, "prev", prev);
        var it = realDatas[idx];
        $("img-wheel").setImage(it.img);
        
        if (prev != -1) {
            //clear selected
            var prevId = "li-index-" + prev;
            $(prevId).style.background = "lightgray";
        }
        //set selected
        var currentId = "li-index-" + idx;
        $(currentId).style.background = "lightpink";
    });
    wheel.start();
    
    
    $("ol-index").clickAt("index", function(it){
        var idx = it.getter("data-idx");
        wheel.changeAtIndex(idx);
    });
    
    //点击图片跳转详情
    $("img-wheel").onclick = function(){
        var it = realDatas[wheel.current()];
        var toURL = BDURLParser.buildURL("product-detail.html", it);
        $goto(toURL);
    };
}

