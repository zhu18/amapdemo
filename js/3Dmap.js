var map,map2,lastStep,currStep=0, lastMove,util = new Util();

var stepInstance = new Array(4);

$(document).ready(function () {

    initMap();
    animate();
    //addMapControl();

    hashChange();
    //url变化监听器
    if (('onhashchange' in window) && ((typeof document.documentMode === 'undefined') || document.documentMode == 8)) {
        window.onhashchange = hashChange;
    }
    setTimeout(function () {
        $("#container").addClass('loaded');
    },1000)

    setWeather();
    mouseEvent();

});

function setStepInstance(index,instance) {

    stepInstance[index] = instance;
}

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
        features: ['bg', 'road','point'],//隐藏默认楼块
        showLabel: true,
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

    // map2 = new AMap.Map('container2', {
    //     resizeEnable: true,
    //     rotateEnable: true,
    //     pitchEnable: true,
    //     showIndoorMap: false,
    //     isHotspot: false,
    //     pitch: 0,
    //     rotation: 0,
    //     viewMode: '3D',//开启3D视图,默认为关闭
    //     buildingAnimation: true,//楼块出现是否带动画
    //     features: ['bg', 'road', 'point'],//隐藏默认楼块
    //     showLabel: true,
    //     mapStyle: 'amap://styles/a2b01ddbdbd8992c86fb350a3866f202',
    //     // mapStyle: 'amap://styles/e0b13c8a53234cd891ba01913302b9fc',
    //     expandZoomRange: false,
    //     jogEnable:false,
    //     zoom: 4,
    //     center: [116.372169, 40.041315]
    // });

}

function addMapControl() {

    // 同时引入工具条插件，比例尺插件和鹰眼插件
    AMap.plugin([
        'AMap.OverView',
        'AMap.Geolocation',
    ], function () {

        window.ovv = new AMap.OverView({ isOpen: true })
        // 在图面添加鹰眼控件，在地图右下角显示地图的缩略图
        map.addControl(window.ovv);
        // 在图面添加定位控件，用来获取和展示用户主机所在的经纬度位置
        map.addControl(new AMap.Geolocation());
    });

    map.on('click', function (e) {
        // console.log(e.lnglat + '')
        // alert(e.lnglat);
    })
}


function setPosition(ps, time, callback) {
    time=time||1000;
    callback = callback || function () {
    }
    var form = { v: map.getPitch() }
    return new TWEEN.Tween(form).to({ v: deg }, time).start().onUpdate(
        function () {
            map.setPitch(this.v)
            // console.log('pitch:' + this.v);
        }).onComplete(callback)
}

function setPitch(deg, time, callback) {
    time=time||1000;
    callback = callback || function () {
    }
    var form = { v: map.getPitch() }
    return new TWEEN.Tween(form).to({ v: deg }, time).start().onUpdate(
        function () {
            map.setPitch(this.v)
            // map2.setPitch(this.v)
            // console.log('pitch:' + this.v);
        }).onComplete(callback)
}

function setRotation(deg, time, callback) {
    time=time||1000;
    callback = callback || function () {
    }
    var form = { v: map.setRotation() }
    return new TWEEN.Tween(form).to({ v: deg }, time).start().onUpdate(
        function () {
            map.setRotation(this.v)
            // map.setRotation(this.v)
            // console.log('Rotation:' + this.v);
        }).onComplete(callback)
}
function setZooms(deg, time, callback) {
    time = time || 1000;
    callback = callback || function () {
    }
    var form = { v: map.setRotation() }
    return new TWEEN.Tween(form).to({ v: deg }, time).start().onUpdate(
        function () {
            map.setZoom(this.v)
            // map2.setZoom(this.v)
            // console.log('Rotation:' + this.v);
        }).onComplete(callback)
}
function animate() {
    requestAnimationFrame(animate);
    // [...]
    TWEEN.update();
    // [...]
}


function playAnimation(domNode) {
    if($(domNode).hasClass('start')){
        $(domNode).removeClass('start').addClass("stop").attr("title","停止播放");
        autoPlay();
    }else{
        $(domNode).removeClass('stop').addClass("start").attr("title","播放动画");
        stopPlay();
    }
}

var isLogin=true;
//监听触发操作
function hashChange() {

    var step = util.getQueryString('step')||0
    currStep = step;
    clearTimeout(timer)
    if(!isLogin&&step!=0) {
        lastStep=step;
        location.hash = 'step=0';
        return
    }

    //统一step 样式， 如：.step1 .base-info .name,.step2 .base-info .name
    $('html')[0].className = 'step' + step;
    setWeather();

    // 销毁上一步骤
    if(lastStep != undefined)
        stepInstance[lastStep].destroy();

    // 加载当前步骤，上一步骤所需销毁时间通过参数告知当前步骤，当前步骤可以选择行通过setTimeout()延迟加载
    // 列如：step1销毁时间1000， step2 可以选择 setTimeout(step2Load, 800) 进行部分动画重叠
    stepInstance[step].load(stepInstance[step].destroyTime);

    lastStep = step;
}


function setWeather(){

    if(currStep == 1) {
        $('.weather').hide();
        return;
    }
    AMap.plugin('AMap.Weather', function() {
        //创建天气查询实例
        var weather = new AMap.Weather();

        var code = currStep==2?110000:110105;
        //执行实时天气信息查询
        weather.getLive(code, function(err, data) {

            var icon='icon-fine_icon';
            var weather =data.weather;
            if(weather.indexOf('晴') !=-1)icon="icon-fine_icon";
            else if(weather.indexOf('阴') !=-1)icon="icon-yintian";
            else if(weather.indexOf('云') !=-1)icon="icon-duoyun";
            else if(weather.indexOf('雨') !=-1)icon="icon-yu1";
            else if(weather.indexOf('雪') !=-1)icon="icon-xue";
            else if(weather.indexOf('雾') !=-1)icon="icon-icon-test6";
            else if(weather.indexOf('霾') !=-1)icon="icon-mai";
            else if(weather.indexOf('风') !=-1)icon="icon-dafeng";
            $("#iconWeather").removeClass().addClass('iconfont '+icon).attr("title",weather)
            $('#temperature').html(data.temperature);
            $('.weather').show();
        });
    });
}

function mouseEvent() {

    $(window).mousemove(function () {
        lastMove = new Date().getTime();
        $(".nav").addClass("nav-active");
    }).mouseout(function () {
        $(".nav").removeClass("nav-active");
    });

    window.setInterval(function() {
        var now = new Date().getTime();
        if(lastMove && now - lastMove > 5000) {
            $(".nav").removeClass("nav-active");
        }
    }, 1000)
}


