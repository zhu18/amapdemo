

setStepInstance(0, {
    destroyTime: 1000,//当前步骤销动画时长
    load(t) {
        setTimeout(function () {
            step0();
        }, t - 200)// 等待上一步骤销毁
        console.log('init0');
    },
    destroy() {
        $('#login').removeClass('loaded')
        console.log("destory0");
    }
});

function step0() {
    $('#login').removeClass('ok').addClass('loaded')
    $('#btn-login').on("click", function () {
        login()
    })
    $(document).keyup(function (event) {
        var step = util.getQueryString('step') || 0
        if (event.keyCode == 13 && step == 0) {
            login()
        }
    });
    initBackground();
}
function login() {
    isLogin = true;
    $('#login').addClass('ok')
    location.hash = 'step=1'
}

function initBackground() {
    particlesJS('login',
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
    )
}