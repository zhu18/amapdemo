function step1() {

    tasks = [];
    //map.setCenter([116.306412, 39.919372])
    map.setCenter([110.515396, 35.498597])
    map.setZoom(4)
    setPitch(0)
    setRotation(0)
    removeEchart()

    addImageLayer();
}

function addImageLayer() {
    var imgLayer = new AMap.ImageLayer({
        bounds: new AMap.Bounds([54.616959,-3.812636], [164.083755,62.376933]),
        url:'../../img/circle.png',
        opacity:1,
        visible:true,
        rejectMapMask:true
    });
    imgLayer.setMap(map);
}