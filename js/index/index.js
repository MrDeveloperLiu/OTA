//main
function onLoadComplete() {
    var lazyLoad = new imageLazyLoader("product");
    lazyLoad.start();
    
    var array = [10045,10051,10034];
    //轮子
    installWheelView(array);
    //种类
    installTypesView(BDMenuList);
    //活动推广
    installActivityView(array);
    //产品列表
    installProductView(BDNewProductList);
    //二维码
    $("img-qrcode").setImage("img/qrcode/IMG_1222.JPG");
    //链接
    installLinksView(BDProductLinkList);
}

onLoadComplete();

