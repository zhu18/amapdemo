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
        bounds: new AMap.Bounds([73.337662,15.879339], [139.343521,54.979123]),
        url:'img/circle.png',
        opacity:1,
        visible:true
    });
    imgLayer.setMap(map);
}