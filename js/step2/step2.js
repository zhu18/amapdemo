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
var map3, layer2, topLine, bottomLine, layer4, layer5, bgLayer;
function step2(params) {
    map.setStatus({
        dragEnable: true,
        doubleClickZoom: true
    })

    // setTimeout(() => {
    //     map.setMapStyle('amap://styles/e0b13c8a53234cd891ba01913302b9fc')
    // }, 5000);
    navigation2(map)

    // 可视化图
    map3 = new Loca(map)
    map.on('click', function (e) {
        console.log(`${e.lnglat.lng},${e.lnglat.lat}`)
    })
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

    layer2.setOptions({
        style: {
            height: 70000,
            lineWidth: 1,
            stroke: '#eceff1',
            fill: function (res) {
                var index = res.index;
                // return 'rgba(0,0,0,1)';
                return 'rgba(0,0,0,0)';
                // return colors[index % colors.length];
            },
            fillOpacity: 0.5
        },
        selectStyle: {
            color: '#ffffff',
            fill: function (res) {
                var index = res.index;
                return '#ff9900';
            },
            lineWidth: 2,
            fillOpacity: 0.6,
        }
    });









    //信息图层
    //构建自定义信息窗体
    function createInfoWindow(contentText) {
        var info = document.createElement("div");
        info.className = "info-window";
        //可以通过下面的方式修改自定义窗体的宽高
        info.style.height = "60px";
        info.style.minWidth = "100px";
        // 定义顶部标题
        var content = document.createElement("div");
        var contentInner = document.createElement("div");
        var icon = document.createElement("span");
        var icon2 = document.createElement("span");
        content.style.left = -contentText.length * 14 + 'px'
        var line = document.createElement("div");
        var p = document.createElement("p");
        p.innerHTML = contentText
        content.className = "info-content";
        line.className = "line";
        contentInner.appendChild(p);
        contentInner.appendChild(icon);
        contentInner.appendChild(icon2);
        content.appendChild(contentInner);
        info.appendChild(content);
        info.appendChild(line);
        return info;
    }
    function createInfoWindow2(content) {
        var info = document.createElement("div");
        info.className = "info-window2";
        for (let index = 0; index < content.length; index++) {
            var p = document.createElement("p");
            p.style.animationDelay = index + 's';
            p.innerText = content[index]
            info.appendChild(p);
        }
        return info;
    }
    var content = ['天地大厅有限公司', '就啊圣诞节街道', '咖色卡森那是的'];

    var infoWindow = new AMap.InfoWindow({
        isCustom: true,  //使用自定义窗体
        content: createInfoWindow('天地大厅有限公司'),
        offset: new AMap.Pixel(-50, -15)
    });
    var infoWindow2 = new AMap.InfoWindow({
        isCustom: true,  //使用自定义窗体
        content: createInfoWindow2(content),
        offset: new AMap.Pixel(8, -20)
    });









    // layer2.render();
    // topLine.render();
    // bottomLine.render();
    // layer5.render();

    // pointer.render();
    // layer4.render();
    setTimeout(() => {
        // fixedMap()

    }, 3000);







}

function destroyStep2() {
    map.setMapStyle('amap://styles/a2b01ddbdbd8992c86fb350a3866f202')
    $('.ring').removeClass('showBox')
    // bgLayer ? bgLayer.hide() : ''
    bgLayer ? map.remove(bgLayer) : ''
    map.clearMap()
    map3 ? map3.destroy() : () => { }

}





var tasks2 = []
function navigation2(map, scallback) {
    tasks2 = [f1, f2, f3, f4, f5, f6, f7]
    next()
    function next() {
        if (tasks2.length > 0) {
            tasks2.shift()();
        } else {
            return;
        }
    }

    function addTask(task) {
        tasks2.push(task);
    }
    function f1() {
        map.setCenter([114.149726, 40.211949])
        setTimeout(() => {
            next()
        }, 300);
    }
    function f2() {
        setZoom(9.6, 1.1).then(_ => {
            next()
        })
    }
    function f3() {
        map.setPitch(60)
        setTimeout(() => {
            next()
        }, 300);
    }
    function f4() {
        map.setRotation(0)
        setTimeout(() => {
            next()
        }, 300);
    }
    function f5() {
        map.setMapStyle('amap://styles/e0b13c8a53234cd891ba01913302b9fc')
        $('.ring').addClass('showBox')
        setTimeout(() => {
            next()
        }, 500);

    }
    function f6() {
        layer2.render();
        bgLayer = new AMap.ImageLayer({
            //bounds: new AMap.Bounds([114.9699, 39.083568], [117.87000, 41.41325]),
            bounds: new AMap.Bounds([115.3000, 39.164537], [117.35728, 41.09606]),
            //url: '../../img/step2_F.png',
            url: '../../img/step2_F2.png',
            opacity: 1,
            height: 70000,
            map: map,
            visible: true,
            rejectMapMask: true
        })
        setTimeout(() => {
            next()
        }, 500);

    }
    function f7(){
        setPoniters()
    }
}

function setPoniters(params) {
    // 定位点图层
    pointer = Loca.visualLayer({
        container: map3,
        type: 'point',
        shape: 'image',
        eventSupport: true
    });

    pointer.setData([
        {
            location: '116.88131,40.215281',
            name: 'BB'
        },

        {
            location: '116.18131,40.415281',
            name: 'AA'
        },

        {
            location: '116.38131,40.215281',
            name: 'CC'
        }
    ], {
            lnglat: 'location'
        });

    let lnglat = [{
        location: [116.88131, 40.215281],
        name: 'BB'
    },

    {
        location: [116.18131, 40.415281],
        name: 'AA'
    },

    {
        location: [116.38131, 40.215281],
        name: 'CC'
    }
    ]
    pointer.setOptions({
        source: function (res) {
            console.log(res)
            if (res.value.name == 'CC') {
                return '../img/pointer2-icon.png'
            } else {
                return '../img/pointer_icon.png'
            }
        },
        style: {
            size: 60,
            opacity: 1
        }
    });
    lnglat.forEach(v => {
        var content = '';
        v.name == "CC" ? content = "<div class= 'pointer-icon2'></div>" : content = "<div class= 'pointer-icon'>1</div>"
        var marker = new AMap.Marker({
            position: v.location,
            bubble: true,
            animation: "AMAP_ANIMATION_DROP",
            label: { content: content },
            icon: '../img/pointer0-iocn.png',
        });

        marker.on('mouseover', function (ev) {
            console.log(ev)
            v.name == "CC" ? infoWindow.open(map, v.location, true) : infoWindow2.open(map, v.location, true)

        });
        marker.on('mouseout', function (ev) {
            // v.name == "CC" ? infoWindow.close() : infoWindow2.close()
        });
        marker.setMap(map);
    })
}