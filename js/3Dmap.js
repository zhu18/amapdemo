let util = new Util();


var bjcolors = {};
var getColorByAdcode = function(adcode){
    if(!bjcolors[adcode]){
        var gb = Math.random()*155+50;
        bjcolors[adcode] = '#0092ffaa';
        //rgba('+ gb +','+ gb +',255,.8)
    }
    return bjcolors[adcode]
}
var disProvince = new AMap.DistrictLayer.Province({
    zIndex:12,
    adcode:['110000'],
    depth:2,
    styles:{
        'fill':function(properties){
            //properties为可用于做样式映射的字段，包含
            //NAME_CHN:中文名称
            //adcode_pro
            //adcode_cit
            //adcode
            var adcode = properties.adcode;
            return getColorByAdcode(adcode);
        },
        'province-stroke':'cornflowerblue',
        'city-stroke': '#003890',//中国地级市边界
        'county-stroke': '#001e60'//中国区县边界
    }
})



var map = new AMap.Map('container', {
    resizeEnable: true,
    rotateEnable: true,
    pitchEnable: true,
    showIndoorMap:false,
    isHotspot:false,
    pitch: 0,
    rotation: 0,
    viewMode: '3D',//开启3D视图,默认为关闭
    buildingAnimation: true,//楼块出现是否带动画
    features: ['bg', 'road', 'point'],//隐藏默认楼块
    showLabel: false,
    mapStyle: 'amap://styles/2b5b5a7bf7d342735986be35a82f241f',
    expandZoomRange: true,
    layers: [
        disProvince,
        new AMap.TileLayer({
            zooms: [3, 18],    //可见级别
            visible: true,    //是否可见
            opacity: 1,       //透明度
            zIndex: 0         //叠加层级
        }),
        new AMap.Buildings({
            zooms: [5, 18],
            zIndex: 10,
            heightFactor: 2//2倍于默认高度，3D下有效
        })//楼块图层
    ],
    zoom: 4,
    center: [116.372169, 40.041315]
});
let map2 = new Loca(map)
var layer = Loca.visualLayer({
    container: map2,
    type: 'point',
    shape: 'circle'
});

function addMarker() {
    marker = new AMap.Marker({
        icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
        position: [116.412467, 39.897761]
    });
    marker.setMap(map);
}
// 构造矢量圆形
var circle = new AMap.Circle({
    center: new AMap.LngLat("116.403322", "39.920255"), // 圆心位置
    radius: 1000,  //半径
    strokeColor: "#F33",  //线颜色
    strokeOpacity: 1,  //线透明度
    strokeWeight: 3,  //线粗细度
    fillColor: "#ee2200",  //填充颜色
    fillOpacity: 0.35 //填充透明度
});

// 将以上覆盖物添加到地图上
// 单独将点标记添加到地图上
// map.add(marker);
// add方法可以传入一个覆盖物数组，将点标记和矢量圆同时添加到地图上

addMarker();
map.add([circle]);
map.setFitView();

// 获取 canvas 实例
// var canvas = document.createElement('canvas');
//
// // 将 canvas 宽高设置为地图实例的宽高
// canvas.width = map.getSize().width;
// canvas.height = map.getSize().height;
// var ctx = canvas.getContext("2d");
// ctx.fillStyle = "rgb(200,0,0)";
// //绘制矩形
// ctx.fillRect (10, 10, 55, 50);
//
// ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
// ctx.fillRect (30, 30, 55, 50);
var canvas = document.createElement('div');
canvas.className='clayer'
canvas.id='clayer'
// 创建一个自定义图层
var customLayer = new AMap.CustomLayer(canvas, {
    zIndex: 12,
    zooms: [3, 18] // 设置可见级别，[最小级别，最大级别]
});

map.add(customLayer);

// 同时引入工具条插件，比例尺插件和鹰眼插件
AMap.plugin([
    'AMap.OverView',
    'AMap.Geolocation',
], function(){
    window.ovv=new AMap.OverView({isOpen:true})
    // 在图面添加鹰眼控件，在地图右下角显示地图的缩略图
    map.addControl(window.ovv);



    // 在图面添加定位控件，用来获取和展示用户主机所在的经纬度位置
    map.addControl(new AMap.Geolocation());
});
map.on('click',function(e){
    console.log(e.lnglat+'')
})






let haloCitys = util.restructureData(citys, {type:'halo'})
let solidCitys = util.restructureData(citys, {type:'solid'},true)
let newCitys = haloCitys.concat(solidCitys)
//newCitys = util.resizeData(newCitys,3)
layer.setData(newCitys, {
    lnglat: 'lnglat'
});
let colors={
    orange:['#FFE7CB','#FF8850','#FF5005'],
    green:['#E9FFE3','#59FF5B','#07FF23'],
    sky:['#D9FFF7','#62FFFF','#00FFFF'],
    blue:['#D7D5FF','#7355FF','#4100FF'],

}
layer.setOptions({
    style: {
        // 默认半径单位为像素
        radius: function (obj) {
            // 城市类型，0：省会直辖市，1：地级市，2：区县
            var style = obj.value.style;
            var isHalo = obj.value.type==='halo';
            var r;

            if (style == 0) {
                r = isHalo?10:3;
            } else if (style == 1) {
                r = isHalo?8:2;
            } else {
                r = isHalo?5:1;
            }

            return r;
        },
        fill: function (obj) {
            var style = obj.value.style;
            var color;
            var cls=colors['blue'];
            if (style == 0) {
                color = cls[0];
            } else if (style == 1) {
                color = cls[1];
            } else {
                color = cls[2];
            }

            return color;
        },
        lineWidth: 0,
        stroke: '#ffffff',
        opacity: function(obj){
            var type = obj.value.type;
            var opacity;
            if (type == 'solid') {
                opacity = .6;
            } else if (type == 'halo') {
                opacity = .3;
            }

            return opacity
        }
    }
});


setTimeout(() => {
    $("#container").addClass('loaded')
}, 1000);

window.onload=function(){
    hashChange()
}
function stepOne() {
    tasks = [];
    (function _a() {
        let zIndex = map.getZoom()
            map.setZoom(zIndex - 0.1)
        if (zIndex >5) {
            requestAnimationFrame(_a)
        }else{
            map.setPitch(0)
            map.setRotation(0)
            removeEchart()
        }
    })()
   
}
function stepTwo() {
    tasks=[];
    (function _a() {
        let zIndex = map.getZoom()
        if (zIndex<10) {
            map.setZoom(zIndex + 0.1)
        }else if(zIndex>10){
            map.setZoom(zIndex - 0.1)
        }
        if (zIndex !=10) {
            requestAnimationFrame(_a)
        }else{
            map.setPitch(0)
            map.setRotation(0)
            removeEchart()
        }
    })()
}
function stepThree() {
   // navigation(map)
    initEchart()

}


//监听触发操作
function hashChange() {
    let step = util.getQueryString('step')
    clearTimeout(timer)
    if (step == 1) {
        stepOne()
        setTimeout(() => {
            layer.render();
        }, 100);
    } else if (step == 2) {
        stepTwo()
    } else if (step == 3) {
            stepThree()
           
    }else{
        stepOne()
        setTimeout(() => {
            layer.render();
        }, 100);
    }
}

//url变化监听器
if (('onhashchange' in window) && ((typeof document.documentMode === 'undefined') || document.documentMode == 8)) {
    
    window.onhashchange = hashChange;  
}









