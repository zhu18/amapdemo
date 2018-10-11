var map, util = new Util();

$(document).ready(function () {

    initMap();
    animate();
    //addMapControl();

    hashChange();
    //url变化监听器
    if (('onhashchange' in window) && ((typeof document.documentMode === 'undefined') || document.documentMode == 8)) {
        window.onhashchange = hashChange;
    }
    $("#container").addClass('loaded');
    
    $(document).mouseover(function () {
        $(".nav").addClass("nav-active");
    }).mouseout(function () {
        $(".nav").removeClass("nav-active");
    });
});


function initMap() {

    map = new AMap.Map('container', {
        resizeEnable: true,
        rotateEnable: true,
        pitchEnable: true,
        showIndoorMap: false,
        isHotspot: false,
        pitch: 0,
        rotation: 0,
        viewMode: '3D',//开启3D视图,默认为关闭
        buildingAnimation: true,//楼块出现是否带动画
        features: ['bg', 'road', 'point'],//隐藏默认楼块
        showLabel: false,
        mapStyle: 'amap://styles/a2b01ddbdbd8992c86fb350a3866f202',
        expandZoomRange: true,
        layers: [
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
}

function addMapControl() {

    // 同时引入工具条插件，比例尺插件和鹰眼插件
    AMap.plugin([
        'AMap.OverView',
        'AMap.Geolocation',
    ], function () {

        window.ovv = new AMap.OverView({isOpen: true})
        // 在图面添加鹰眼控件，在地图右下角显示地图的缩略图
        map.addControl(window.ovv);
        // 在图面添加定位控件，用来获取和展示用户主机所在的经纬度位置
        map.addControl(new AMap.Geolocation());
    });

    map.on('click', function (e) {
        console.log(e.lnglat + '')
        alert(e.lnglat);
    })
}

function setPosition(ps, callback) {
    callback = callback || function () {
        }
    var form = {v: map.getPitch()}
    return new TWEEN.Tween(form).to({v: deg}, 1000).start().onUpdate(
        function () {
            map.setPitch(this.v)
            console.log('pitch:' + this.v);
        }).onComplete(callback)
}

function setPitch(deg, callback) {
    callback = callback || function () {
        }
    var form = {v: map.getPitch()}
    return new TWEEN.Tween(form).to({v: deg}, 1000).start().onUpdate(
        function () {
            map.setPitch(this.v)
            console.log('pitch:' + this.v);
        }).onComplete(callback)
}

function setRotation(deg, callback) {
    callback = callback || function () {
        }
    var form = {v: map.setRotation()}
    return new TWEEN.Tween(form).to({v: deg}, 1000).start().onUpdate(
        function () {
            map.setRotation(this.v)
            console.log('Rotation:' + this.v);
        }).onComplete(callback)
}

function animate() {
    requestAnimationFrame(animate);
    // [...]
    TWEEN.update();
    // [...]
}


function stepOne() {
    destroyStep2();
    destroyStep3();
    step1();
}

function stepTwo() {
    destroyStep1();
    destroyStep3();
    step2()
}

function stepThree() {
    destroyStep1();
    destroyStep2();
    step3();
   
}


//监听触发操作
function hashChange() {

    var step = util.getQueryString('step')
    clearTimeout(timer)
    //统一step 样式， 如：.step1 .base-info .name,.step2 .base-info .name
    $('html')[0].className='step'+step;
    
    if (step == 1) {
        stepOne()
    } else if (step == 2) {
        stepTwo()
    } else if (step == 3) {
        stepThree()
    } else {
        stepOne()
    }
}





