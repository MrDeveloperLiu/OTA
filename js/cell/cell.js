// prorducts

function createInnerProrductsListView(item, itemId, callback) {
    var innerView = document.createElement("li");
    innerView.setAttribute("class", "li-items");
    innerView.setAttribute("data-id", itemId);
    innerView.setAttribute("onclick", "onclickTheListView(this)");
    innerView.callback = callback;
    return innerView;
    
    
    var imageView = document.createElement("img");
    imageView.setAttribute("class", "cls-lazy-img");
    imageView.setAttribute("data-src", item.img);
    innerView.appendChild(imageView);
    
    var infoDiv = document.createElement("div");
    infoDiv.setAttribute("class", "cell-div");
    innerView.appendChild(infoDiv);
    
    var infoTitle = document.createElement("p");
    infoTitle.innerText = item.name;
    infoTitle.setAttribute("class", "cell-p-name");
    infoDiv.appendChild(infoTitle);

    var infoUnit = document.createElement("p");
    infoUnit.setAttribute("class", "cell-p");
    infoUnit.innerText = item.unit;
    infoDiv.appendChild(infoUnit);

    var infoPrice = document.createElement("p");

    if (item.discount >= 100) {
        infoPrice.setAttribute("class", "cell-p-price");
    }else{
        infoPrice.setAttribute("class", "cell-p-discount");

        var infoDiscount = document.createElement("p");
        infoDiscount.setAttribute("class", "cell-p-price");
        infoDiscount.innerText = ut_formatPriceWithDiscount(item.price, item.discount);
        infoDiv.appendChild(infoDiscount);
    }

    infoPrice.innerText = ut_formatPrice(item.price);
    infoDiv.appendChild(infoPrice);
    
    if (item.hasOwnProperty("tag")) {
        var infoTag = document.createElement("p");
        infoTag.setAttribute("class", "cell-p-price");
        infoTag.innerText = item.tag;
        infoDiv.appendChild(infoTag);
    }
    
    return innerView;
}

function onclickTheListView(v) {
    var itemId = v.getAttribute("data-id");
    var item = BDProductInfoDict[itemId];
    v.callback(item);
    console.log(itemId);
}

function buildProductLists(ulView, buffer, callback) {

    var fragment = document.createDocumentFragment();
    
    for (var i = 0; i < buffer.length; i++) {
        var list = buffer[i];
        var itemHeader = document.createElement("p");
        itemHeader.setAttribute("class", "p-header");
        itemHeader.innerText = list.name;
        fragment.appendChild(itemHeader);

        for (var j = 0; j < list.items.length; j++) {
            var itemId = list.items[j];
            var item = BDProductInfoDict[itemId];
            var innerView = createInnerProrductsListView(item, itemId, callback);
            fragment.appendChild(innerView);
        }
    }
    
    ulView.appendChild(fragment);
}

// activity

function createInnerActivityListView(item, idx) {
    var innerView = document.createElement("li");
    innerView.setAttribute("class", "li-activity");
    innerView.setAttribute("idx", idx);
    
    return innerView;
    
    var infoTitle = document.createElement("p");
    infoTitle.innerText = item.title;
    infoTitle.setAttribute("class", "cell-activity-title");
    innerView.appendChild(infoTitle);
    
    var infoView = document.createElement("p");
    infoView.setAttribute("class", "cell-activity-info");
    infoView.innerText = item.info;
    innerView.appendChild(infoView);

    return innerView;
}


function buildActivityLists(ulView, buffer) {
    var actCnt = buffer.items.length;
    if (actCnt <= 0) {
        return;
    }
    var fragment = document.createDocumentFragment();
    
    var itemHeader = document.createElement("p");
    itemHeader.setAttribute("class", "p-header");
    itemHeader.innerText = buffer.name;
    fragment.appendChild(itemHeader);

    for (var i = 0; i < actCnt; i++) {
        var item = buffer.items[i];
        var innerView = createInnerActivityListView(item, i);
        fragment.appendChild(innerView);
    }
    
    ulView.appendChild(fragment);
}

//new products

function buildNewProductLists(ulView, buffer, callback) {
    var actCnt = buffer.items.length;
    if (actCnt <= 0) {
        return;
    }
    var fragment = document.createDocumentFragment();
    
    var itemHeader = document.createElement("p");
    itemHeader.setAttribute("class", "p-header");
    itemHeader.innerText = buffer.name;
    fragment.appendChild(itemHeader);

    for (var i = 0; i < actCnt; i++) {
        var itemId = buffer.items[i];
        var item = BDProductInfoDict[itemId];
        var innerView = createInnerProrductsListView(item, itemId, callback);
        fragment.appendChild(innerView);
    }
    
    ulView.appendChild(fragment);
}


//links
function createInnerLinkListView(item, itemId, callback) {
    var innerView = document.createElement("li");
    innerView.setAttribute("data-id", itemId);
    innerView.setAttribute("onclick", "onclickTheLinkListView(this)");
    innerView.setAttribute("class", "li-info");
    innerView.callback = callback;
    
    var infoTitle = document.createElement("p");
    infoTitle.innerText = item.name;
    infoTitle.setAttribute("class", "p-li-info");
    innerView.appendChild(infoTitle);
    
    var infoView = document.createElement("p");
    infoView.setAttribute("class", "p-li-arrow");
    infoView.innerText = ">";
    innerView.appendChild(infoView);
    
    return innerView;
}

function onclickTheLinkListView(v){
    var itemURL = v.getAttribute("data-id");
    v.callback(itemURL);
    console.log(itemURL);
}

function buildProductLinkLists(ulView, buffer, callback) {
    var count = buffer.length;
    if (count <= 0) {
        return;
    }
    var fragment = document.createDocumentFragment();

    var itemHeader = document.createElement("p");
    itemHeader.setAttribute("class", "p-header");
    itemHeader.innerText = "产品详情";
    fragment.appendChild(itemHeader);

    for (var i = 0; i < count; i++) {
        var item = buffer[i];
        var itemId = item.url;
        var innerView = createInnerLinkListView(item, itemId, callback);
        fragment.appendChild(innerView);
    }
    
    ulView.appendChild(fragment);
}

//links
function createInnerBirthdayListView(item) {
    var innerView = document.createElement("li");
    innerView.setAttribute("class", "li-cake");
    
    var imageView = document.createElement("img");
    imageView.setAttribute("class", "cls-lazy-img");
    imageView.setAttribute("data-fit", "natural");
    imageView.setAttribute("data-src", item.img);
    innerView.appendChild(imageView);
    
    return innerView;
}

function buildProductBirthdayCakeLists(ulView, buffer) {
    var count = buffer.length;
    if (count <= 0) {
        return;
    }
    var fragment = document.createDocumentFragment();
    
    for (var i = 0; i < count; i++) {
        var item = buffer[i];
        var innerView = createInnerBirthdayListView(item);
        fragment.appendChild(innerView);
    }
    
    ulView.appendChild(fragment);
}


function bindULEventListener(ulView, callback) {
    ulView.addEventListener('click', function(e) {
        var target = e.target;
        if(target.nodeName === 'LI') {
            let item = e.target;
            console.log(item);
        }
    });
}
