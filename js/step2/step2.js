//固定地图 禁止拖拽 旋转等
function fixedMap(params) {
    map.setStatus({
        animateEnable: false,
        rotateEnable: false,
        dragEnable: false,
        zoomEnable: false,
        pitchEnable: false,
    })
}
var map3, layer2, topLine, bottomLine, layer4, layer5;
function step2(params) {
    tasks = [];
    map.setCenter([114.149726, 40.211949])
    map.setZoom(9.6)
    setPitch(55)
    setRotation(0)
    


    
    // 可视化图
    map3 = new Loca(map)
    // 带有高度的北京地图(面)
    layer2 = Loca.visualLayer({
        eventSupport: true,
        fitView: true,
        container: map3,
        type: 'polygon',
        shape: 'polygon'
    });
    layer2.setData(dd, {
        lnglat: 'coordinates'
    });
    var colors = ['rgba(0,152,254,0.5)', 'rgba(0,152,254,0.6)', 'rgba(0,152,254,0.9)', 'rgba(0,152,254,0.3)']
    // layer2.setOptions({
    //     style: {
    //         height: 70000,
    //         opacity: 0.6,
    //         // fill: 'rgba(0,152,254,1)'
    //         fill: function (res) {
    //             var index = res.index;
    //             return color[index % colors.length];
    //         },
    //     }
    // });
    layer2.setOptions({
        style: {
            height:70000,
            lineWidth: 1,
            stroke: '#eceff1',
            opacity: 0.7,
            fill: function (res) {
                var index = res.index;
                return colors[index % colors.length];
            },
            fillOpacity: 0.5
        },
        selectStyle: {
            fill: function (res) {
                var index = res.index;
                return colors[index % colors.length];
            },
            lineWidth: 2,
            fillOpacity: 0.6,
        }
    });
  
    layer2.on('mouseenter',function(e){
        layer2.setOptions({
            style: {
                // height: function (res) {
                //     if (res.value.name === e.rawData.name) {
                //         return '130000';
                //     } else {
                       
                //         return '70000'
                //     }
                // },
                fill: function (res) {
                    if (res.value.name===e.rawData.name) {
                        return '#ffff33';
                    }else{
                        var index = res.index;
                        return colors[index % colors.length];
                    }
                },
                fillOpacity: 0.7,
            },
        });
        layer2.render()
    })
    // 带有高度的北京地图(线)
    topLine = Loca.visualLayer({
        container: map3,
        type: 'line',
        shape: 'line'
    });
    topLine.setData(dd, {
        lnglat: 'coordinates'
    });
    topLine.setOptions({
        style: {
            height: 70001,
            opacity: 0.8,
            stroke: 'rgba(255,255,255,.8)',
            lineWidth: 0
        }
    });
    bottomLine = Loca.visualLayer({
        container: map3,
        type: 'line',
        shape: 'line'
    });
    bottomLine.setData(dd, {
        lnglat: 'coordinates'
    });
    bottomLine.setOptions({
        style: {
            height: 0,
            opacity: 0.4,
            stroke: 'rgba(25,215,255,.8)',
            lineWidth: 0
        }
    });


    // 定位点图层
    layer4 = Loca.visualLayer({
        container: map3,
        type: 'point',
        shape: 'image',
        eventSupport: true,
        zIndex: 200000
    });
    layer4.setData([
        {
            location: '115.88131,39.845281',
            name: 'A'
        },
    ], {
            lnglat: 'location'
        });
    layer4.setOptions({
        source: '../img/pointer_icon.png',
        style: {
            size: 60,
            opacity: 1
        },
        selectStyle: {
            size: 190,
            opacity: .4,
            color: '#fcff19',
        }
    });
    // 网格涂层
   layer5 = Loca.visualLayer({
        container: map3,
        type: 'point',
        shape: 'circle'
    });
    layer5.setData(ddd, {
        lnglat: 'coord'
    });

    layer5.setOptions({
        // 单位米
        unit: 'meter',
        style: {
            // 正多边形半径
            radius: 2.5,
            // 高度为 0 即可贴地面
            height: 0.2,
            fill: '#0eb1db',
            lineWidth: 2,
            stroke: 'rgba(255,255,255,.4)',
            opacity: 0.4,
        }
        
    });
    //信息图层
    //构建自定义信息窗体
    function createInfoWindow(title, content) {
        var info = document.createElement("div");
        info.className = "info-window";
        //可以通过下面的方式修改自定义窗体的宽高
        info.style.height = "60px";
        info.style.minWidth = "100px";
        // 定义顶部标题
        var content = document.createElement("div");
        var contentInner = document.createElement("div");
        content.innerHTML = 'xxx 公司'
        var line = document.createElement("div");
        content.className = "info-content";
        line.className = "line";
        content.appendChild(contentInner);
        info.appendChild(content);
        info.appendChild(line);
        return info;
    }
    var title = '',
        content = [];

    var infoWindow = new AMap.InfoWindow({
        isCustom: true,  //使用自定义窗体
        content: createInfoWindow(title, content.join("<br/>")),
        offset: new AMap.Pixel(-57, 0)
    });


    layer4.on('mouseenter', function (ev) {
        infoWindow.open(map, (new AMap.LngLat(ev.lnglat[0]._lng, ev.lnglat[0]._lat, true)))
    });
    layer4.on('mouseleave', function (ev) {
        infoWindow.close()
    });






    layer2.render();
    topLine.render();
    bottomLine.render();
    layer4.render();
    layer5.render();






}

function destroyStep2() {
    map3?map3.destroy():()=>{}
}






