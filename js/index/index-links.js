function installLinksView(datas) {
    if (datas.length <= 0) {
        return;
    }
    var liIndexFragment = $(document).$create();
    for (var j = 0; j < datas.length; j++) {
        var it = datas[j];

        var liIndex = $(document).$create("li")
        .setter("class")("links")
        .setter("data-idx")(j)
        .setter("data-url")(it.url);
        liIndex.innerText = it.title;
        liIndexFragment.appendChild(liIndex);
    }
    //渲染
    $("ul-links").appendChild(liIndexFragment);
    $("ul-links").clickAt("links", function(e){
        $goto(e.getter("data-url"));
    });
}


