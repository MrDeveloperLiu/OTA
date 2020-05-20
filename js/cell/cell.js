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
