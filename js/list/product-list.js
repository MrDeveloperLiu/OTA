//main
function onLoadComplete() {
    
    var json = BDURLParser.parse(self.location.search);
    
    var items = BDMenuIdMap[json.id];
    if (items.length <= 0) {
        return;
    }
    
    //title
    var head = document.getElementsByTagName("head")[0];
    var title = head.getElementsByTagName("title")[0];
    title.innerText = json.title;
    
    var lazyLoad = new imageLazyLoader("product");
    lazyLoad.start();
    
    var liProductFragment = $(document).$create();
    for (var k = 0; k < items.length; k++) {
        var itemId = items[k];
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

    $("ul-product").appendChild(liProductFragment);
    $("ul-product").clickAt("product", function(e){
        var item = BDProductInfoDict[e.getter("data-id")];
        var toURL = BDURLParser.buildURL("product-detail.html", item);
        $goto(toURL);
    });

}

onLoadComplete();

