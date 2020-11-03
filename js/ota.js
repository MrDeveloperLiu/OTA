var manifestURL = "https://raw.githubusercontent.com/MrDeveloperLiu/OTA/master/ios/manifest.plist"

document.addEventListener("readystatechange", function (e) {
    if (e.target.readyState === 'complete') {
        
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", manifestURL, false);
        xhttp.send(null);
        loadAppInfo(xhttp.responseText);
    }
})

function loadAppInfo(resp) {
    var domParser = new DOMParser()
    var xmlDoc = domParser.parseFromString(resp, 'text/xml')

    var x2js = new X2JS();
    var jsonObj = x2js.xml2json(xmlDoc);
    
    var assetsRoot = jsonObj.plist.dict.array.dict;
    var assets = assetsRoot.array
    var meta = assetsRoot.dict
    
    var assetVars = {}
    for (var i in assets.dict) {
        var kindVal = assets.dict[i].string[0]
        var urlVal = assets.dict[i].string[1]
        assetVars[kindVal] = urlVal
    }
    for (var j in meta.key) {
        var metaKey = meta.key[j]
        var metaVal = meta.string[j]
        assetVars[metaKey] = metaVal
    }
    
    var userAgent = navigator.userAgent
    
    document.getElementById("icon").src = assetVars["display-image"]
    document.getElementById("title").innerText = assetVars["title"]
    document.getElementById("info").innerText = "版本:" + assetVars["bundle-version"] + "  " + "bundle-id:" + assetVars["bundle-identifier"]
    document.getElementById("agent").innerText = userAgent
}

function install() {
    document.getElementById("install").style.display = "none"
    var showClosure = function() {
        document.getElementById("install").style.display = "block"
    };
    setTimeout(showClosure, 3000)
            
    var appURL = "itms-services://?action=download-manifest&url=" + manifestURL
    window.location.href = appURL
}

