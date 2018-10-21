function setp3Tips() {




    var object3Dlayer = new AMap.Object3DLayer({ zIndex: 110, opacity: 1 });
    map.add(object3Dlayer);
    function lnglatToG20(lnglat) {
        lnglat = map.lngLatToGeodeticCoord(lnglat);
        lnglat.x = AMap.Util.format(lnglat.x, 3);
        lnglat.y = AMap.Util.format(lnglat.y, 3);
        return lnglat;
    }

    var lines = new AMap.Object3D.Line();
    var lineGeo = lines.geometry;


    var points3D = new AMap.Object3D.RoundPoints();
    points3D.transparent = true;
    var pointsGeo = points3D.geometry;
    var center = lnglatToG20([116.454763,39.91552]);
    var height = -1100
    // points3D.textures.push('https://a.amap.com/jsapi_demos/static/demo-center/3d_texture_tiananmen_256.png');
    //points3D.textures.push('http://127.0.0.1:5500/img/pointer4-icon.png');

    // 连线
    // lineGeo.vertices.push(center.x, center.y, 0);
    // lineGeo.vertexColors.push(0, 0, 0, 0);
    // lineGeo.vertices.push(center.x, center.y, height);
    // lineGeo.vertexColors.push(0, 1, 1, 1);
    pointsGeo.vertices.push(center.x, center.y, height); // 空中点
    pointsGeo.vertexColors.push(1 * 0.29, 1 * 0.8, 1 * 0.9, 0.8);
    pointsGeo.pointAreas.push(0, 0, 1, 1);
    pointsGeo.pointSizes.push(32);
    pointsGeo.vertexUVs.push(0, 0, 1, 1);
    // 每个元素描述一个顶点的纹理索引信息，多纹理时使用，取值范围[0-7]。单纹理或者无纹理时不需要设值。
    pointsGeo.textureIndices.push(1);
    object3Dlayer.add(lines);
    object3Dlayer.add(points3D);
    // prism 拾取
    map.on('mousemove', function (ev,e) {
        var pixel = ev.pixel;
        var px = new AMap.Pixel(pixel.x, pixel.y);
        var obj = map.getObject3DByContainerPos(px, [object3Dlayer], false) || "";
        if (obj) {
            console.log(e)
            console.log(obj)
            creatInfo(pixel)
            // infoWindow3.open(map, [116.436865, 39.941948], true)
        }else{
            $(".info3").remove()
        }

    });
}




//信息图层
//构建自定义信息窗体
function creatInfo(p){
    if (!$('.info3').length) {
        var left = parseInt(p.x + 20)
        var top = parseInt(p.y-100)
        $("body").append("<div class='info3' style='position: absolute;left:" + left + "px;top:" + top + "px'>" +
            "<div class='info3-line'></div>" +
            "<div class='info3-content'>"+
                "<div class='text'>天地大厅有限公司</div>"+
                "<span></span>"+
                "<span></span>"+
            "</div>" +
            "</div>") 
    }else{
        $('.info3').show()
    }
   
}

function createInfoWindow3(content) {
    var info = document.createElement("div");
    info.className = "info-window2";
    info.id = "aaaa";
    for (let index = 0; index < content.length; index++) {
        var p = document.createElement("p");
        p.style.animationDelay = index + 's';
        p.innerText = content[index]
        info.appendChild(p);
    }
    return info;
}
var content = ['天地大厅有限公司', '就啊圣诞节街道', '咖色卡森那是的'];


var infoWindow3 = new AMap.InfoWindow({
    isCustom: true,  //使用自定义窗体
    content: createInfoWindow3(content),
    offset: new AMap.Pixel(8, -20)
});