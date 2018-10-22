var stepInstance2 = {
    destroyTime: 300,
    load() {
            // map.setStatus({
            //     dragEnable: true,
            //     doubleClickZoom: true
            // })
            $('#container').removeClass('loaded')
            $('#container2').addClass('loaded')
            setLayer2()
            navigation2(map2)

    },
    destroy() {
        destroyStep2()
    }
}

setStepInstance(2, stepInstance2);

var map3, layer2, topLine, bottomLine, layer4, layer5,marks=[],tasks=[],
    bgLayer = new AMap.ImageLayer({
        //bounds: new AMap.Bounds([114.9699, 39.083568], [117.87000, 41.41325]),
        bounds: new AMap.Bounds(new AMap.LngLat(115.3000, 39.164537),
            new AMap.LngLat(117.35728, 41.09606)),
        // bounds: new AMap.Bounds([115.3000, 39.164537], [117.35728, 41.09606]),
        //url: '../../img/step2_F.png',
        url: '../../img/step2_F2.png?'+Math.random(),
        opacity: 1,
        map: map2,
        height: 70000,
        visible: false,
        rejectMapMask: true
    })

function setLayer2() {
    // 可视化图
    map3 = new Loca(map2)
    map3.on('mapload',()=>{
        // 带有高度的北京地图(面)
        layer2 = Loca.visualLayer({
            eventSupport: false,
            fitView: false,
            container: map3,
            type: 'polygon',
            shape: 'polygon'
        });

        layer2.setData(dd, {
            lnglat: 'coordinates'
        });

        layer2.setOptions({
            style: {
                height: 1,
                lineWidth: 1,
                stroke: '#eceff1',
                fill: function (res) {
                    // return 'rgba(0,0,0,1)';
                    return 'rgba(0,0,0,0)';
                    // return colors[index % colors.length];
                },
                fillOpacity: 0.5
            },
            selectStyle: {
                color: '#ffffff',
                fill: function (res) {
                    return '#ff9900';
                },
                lineWidth: 2,
                fillOpacity: 0.6,
            }
        });
        layer2.render()
        setImgLayer(map2)
    })
   

    
    // bgLayer.setMap(map2)
}
//固定地图 禁止拖拽 旋转等
function setImgLayer(map){
    bgLayer = new AMap.ImageLayer({
        //bounds: new AMap.Bounds([114.9699, 39.083568], [117.87000, 41.41325]),
        bounds: new AMap.Bounds([115.3000, 39.164537], [117.34728, 41.31606]),
        //url: '../../img/step2_F.png',
        url: '../../img/step2_F2.png',
        opacity: 1,
        height: 70000,
        visible: true,
        zooms:[8-10]
    })
    bgLayer.setMap(map)
    bgLayer.show()
} 
//出场
function destroyStep2() {
        tasks=[]
        marks.forEach((v,i)=>{
            setTimeout(() => {
                map2.remove(v);
            }, 200 * i);
        })
        setTimeout(() => {
            pitch(0)
        }, 800);
    setTimeout(() => {
        bgLayer.hide()
        map2.remove(bgLayer);
        $('.ring').removeClass('showBox')
    }, 1200);
   
    setTimeout(() => {
        map2.setMapStyle('amap://styles/a2b01ddbdbd8992c86fb350a3866f202')
    }, 1500);


    // $('#container2').removeClass('loaded')
    // $('#container').addClass('loaded')
    // bgLayer ? map.remove(bgLayer) : ''



}




//入场动画
function navigation2(map, scallback) {
    tasks2 = [f1, f2, f3, f4, f5, f6]
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
        // map2.setCenter([116.397428, 39.90929])
        map.setZoomAndCenter(5, [116.397428, 39.90929])
        map2.setZoomAndCenter(5, [116.397428, 39.90929])
        bgLayer.hide()
        next()
        // setTimeout(() => {
        //     next()
        // }, 300);
    }
    function f2() {
        setZoom(6, 0.09).then(_ => {
            setZoom(7, 0.09).then(_ => {
                setZoom(8, 0.09).then(_ => {
                    setZoom(9, 0.09).then(_ => {
                            map2.setMapStyle('amap://styles/e0b13c8a53234cd891ba01913302b9fc')
                            next()
                    })
                })
            })
        })
    }
    function f3() {
        setTimeout(next, 800)
    }
    function f4() {
        $('.ring').addClass('showBox')
        setTimeout(() => {
            next()
        }, 300);
    }
    function f5() {
        setImgLayer(map2)
        pitch(58);
        setTimeout(() => {
            next()
        }, 500);

    }
    function f6() {
        setPoniters()
    }
}
//设置点
function setPoniters() {
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
    lnglat.forEach((v, i) => {
        var content = '';
        v.name == "CC" ? content = "<div class= 'pointer-icon2'></div>" : content = "<div class= 'pointer-icon'>1</div>"
        var marker = new AMap.Marker({
            position: v.location,
            bubble: true,
            animation: "AMAP_ANIMATION_DROP",
            label: { content: content },
            icon: '../img/pointer0-iocn.png',
        });
        marks.push(marker)
        marker.on('mouseover', function (ev) {
            console.log('in')
            v.name == "CC" ? infoWindow.open(map2, v.location, true) : infoWindow2.open(map2, v.location, true)

        });
        marker.on('mouseout', function (ev) {
            console.log('out')
            v.name == "CC" ? infoWindow.close() : infoWindow2.close()
        });
        setTimeout(() => {
            marker.setMap(map2);
        }, 1000 + i * 100);
    })
}

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
