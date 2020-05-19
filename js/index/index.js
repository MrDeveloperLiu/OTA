//main
function onLoadComplete() {
    var lazyLoad = new imageLazyLoader("product");
    lazyLoad.start();
    //轮子
    installWheelView(BDNewProductList.items);

    /*
    //成品
    var liProductFragment = $(document).$create();
    for (var j = 0; j < BDMenuList.length; j++) {
        var product = BDMenuList[j];        
        //title
        var p = $(document).$create("p");
        p.setter("class")("product");
        p.innerText = product.name;
        liProductFragment.appendChild(p);
        
        //items
        for (var k = 0; k < product.items.length; k++) {
            var itemId = product.items[k];
            var item = BDProductInfoDict[itemId];
            
            var li = $(document).$create("li")
            .setter("class")("product")
            .setter("data-idx")(k)
            .setter("data-id")(item.id)
            .setter("data-type")("product");
            
            var img = $(document).$create("img")
            .setter("class")("product")
            .setter("data-src")(item.img);
            
            li.appendChild(img);
            liProductFragment.appendChild(li);
        }
    }
    $("ul-product").appendChild(liProductFragment);
    $("ul-product").clickAt("product", function(e){
        var item = BDProductInfoDict[e.getter("data-id")];
        var toURL = BDURLParser.buildURL("product-detail.html", item);
        $goto(toURL);
    });
     */
    
    //qr
    $("img-qrcode").style.display = "none";
//    $("img-qrcode").setImage("img/qrcode/IMG_1222.JPG");
}

onLoadComplete();

