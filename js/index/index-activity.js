function installActivityView(datas) {
    if (datas.length <= 0) {
        return;
    }
    
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

        var liIndex = $(document).$create("li")
        .setter("class")("activity")
        .setter("data-idx")(j)
        .setter("data-id")(it.id);
        liIndexFragment.appendChild(liIndex);
    }
    //渲染
    $("ul-activity").appendChild(liIndexFragment);
}

