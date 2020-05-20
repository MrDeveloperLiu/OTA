function installTypesView(datas) {
    if (datas.length <= 0) {
        return;
    }
    //种类
    var liProductFragment = $(document).$create();
    for (var j = 0; j < datas.length; j++) {
        var item = datas[j];
        
        var li = $(document).$create("li")
        .setter("class")("types")
        .setter("data-idx")(j);
        
        var img = $(document).$create("img")
        .setter("class")("types")
        .setter("data-src")(item.icon);
        li.appendChild(img);
        
        var p = $(document).$create("p")
        .setter("alt")("")
        .setter("class")("types");
        p.innerText = item.title;
        li.appendChild(p);
        
        liProductFragment.appendChild(li);
    }
    $("ul-types").appendChild(liProductFragment);
    $("ul-types").clickAt("types", function(e){
        console.log(e);
    });

}
