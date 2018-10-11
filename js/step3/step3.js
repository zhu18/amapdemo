/**
 * step3 北京朝阳区
 */
var particlesLayer;

/**
 * step3 北京朝阳区进入
 */
function step3() {

    //initEchart()
    map.setRotation(90)
    map.setZoom(15)
    setPitch(80)
    setRotation(0)
    initStatus();
    map.panTo([116.589811, 39.914282]);

    addParticlesLayer();
}

function initStatus() {
    $(".turnover").removeClass('show')
    $(".nums").removeClass('show')
    $(".word-container").hide();
}

function addParticlesLayer() {

    if (particlesLayer) {
        particlesLayer.show();
        return;
    }
    var canvas = document.createElement('div');
    canvas.className = 'particles'
    canvas.id = 'particles'

// 创建一个自定义图层
    particlesLayer = new AMap.CustomLayer(canvas, {
        zIndex: 11,
        zooms: [3, 18] // 设置可见级别，[最小级别，最大级别]
    });
    particlesLayer.setMap(map);

    setTimeout(function () {
        particlesJS('particles',
            {
                "particles": {
                    "number": {
                        "value": 80,   //数量
                        "density": {
                            "enable": true,
                            "value_area": 1000   //区域散布密度大小
                        }
                    },
                    "color": {
                        "value": "#082d5d"
                    },
                    "shape": {
                        "type": "circle",
                        "stroke": {
                            "width": 0,    //原理的宽度
                            "color": "#80a9ff"//"#06213f"
                        },
                        "polygon": {
                            "nb_sides": 5    // 原子的多边形边数
                        },
                    },
                    "opacity": {
                        "value": .3,
                        "random": false,   //随机不透明度
                        "anim": {
                            "enable": true,   // 渐变动画
                            "speed": 1,   //渐变动画速度
                            "opacity_min": .1,
                            "sync": false
                        }
                    },
                    "size": {
                        "value": 5,    //原子大小
                        "random": true,
                        "anim": {
                            "enable": false,   //原子渐变
                            "speed": 40,    //原子渐变速度
                            "size_min": 0.1,
                            "sync": false
                        }
                    },
                    "line_linked": {
                        "enable": true,    //连接线
                        "distance": 150,
                        "color": "#80a9ff",
                        "opacity": 1,
                        "width": 1
                    },
                    "move": {   //  原子移动速度
                        "enable": true,
                        "speed": 2,
                        "direction": "none",
                        "random": false,
                        "straight": false,
                        "out_mode": "out",
                        "attract": {
                            "enable": false,
                            "rotateX": 600,
                            "rotateY": 1200
                        }
                    }
                },
                "interactivity": {
                    "detect_on": "canvas",   //原子之间互动检测
                    "events": {
                        "onhover": {
                            "enable": false,
                        },
                        "onclick": {
                            "enable": false,
                        },
                        "resize": false
                    },
                },
                "retina_detect": true
            }
        );
    }, 1000);
}

function addPolygonizrLayer() {

    if (polygonizrLayer) {
        polygonizrLayer.show();
        return;
    }
    var canvas = document.createElement('div');
    canvas.className = 'clayer'
    canvas.id = 'clayer'


// 创建一个自定义图层
    var polygonizrLayer = new AMap.CustomLayer(canvas, {
        zIndex: 11,
        zooms: [1, 18] // 设置可见级别，[最小级别，最大级别]
    });
    polygonizrLayer.setMap(map);
    setTimeout(function () {
        $(function () {
            $('#clayer').polygonizr();
        })
    }, 2000);
}

/**
 * 销毁事件
 */
function destroyStep3() {
    removeEchart();
    $(".word-container").show();
    particlesLayer ? particlesLayer.hide() : null;
}