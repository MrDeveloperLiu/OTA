function installProductView(datas) {
    if (datas.length <= 0) {
        return;
    }
    //成品
    var liProductFragment = $(document).$create();
    for (var j = 0; j < datas.length; j++) {
        var product = datas[j];
                
        //title
        var p = $(document).$create("p");
        p.setter("class")("product");
        p.innerText = product.title;
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
            .setter("data-src")(item.thumb);
            li.appendChild(img);

            var title = $(document).$create("p")
            .setter("class")("product-title");
            li.appendChild(title);
            
            var price = $(document).$create("p")
            .setter("class")("product-price");
            li.appendChild(price);            
            
            var discount = $(document).$create("p")
            .setter("class")("product-discount");
            li.appendChild(discount);

            
            title.innerText = item.name;
            if (item.discount < 100) {
                discount.innerHTML = ut_formatPrice(item.price);
                price.innerHTML = ut_formatPriceWithDiscount(item.price, item.discount);
            }else{
                price.innerHTML = ut_formatPrice(item.price);
            }
            
            liProductFragment.appendChild(li);
        }
    }
    $("ul-product").appendChild(liProductFragment);
    $("ul-product").clickAt("product", function(e){
        var item = BDProductInfoDict[e.getter("data-id")];
        var toURL = BDURLParser.buildURL("product-detail.html", item);
        $goto(toURL);
    });
    
}
