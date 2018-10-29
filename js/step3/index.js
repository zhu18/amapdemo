var stepInstance3={
    destroyTime:3000,
    load(t){
        setTimeout(step3,t-100);
    },
    destroy() {
        destroyStep3();
    }
}

setStepInstance(3, stepInstance3);




/**
 * step3 北京朝阳区
 */
var particlesLayer, polygonizrLayer;

/**
 * step3 北京朝阳区进入
 */
function step3() {
    initPoints();
    // 
    map.setZoomAndCenter(15,[116.454925, 39.914705])
   // map.setZoom(1);

    // setZoom(11, 0.1).then(_ => {
    //     setZoom(12, 0.1).then(_ => {
    //         setZoom(13, 0.1).then(_ => {
    //             setZoom(14, 0.1).then(_ => {
    //                 setZoom(15, 0.1).then(_ => {
    //                     setTimeout(() => {
    //                         // map.setMapStyle('amap://styles/e0b13c8a53234cd891ba01913302b9fc')
    //                         // $('.ring').addClass('showBox')


    //                     }, 300);
    //                 })
    //             })
    //         })
    //     })
    // })
   // setZoom(15, 04);
    
   setTimeout(()=>{
    setPitch(80, 2000)
    setRotation(360, 2000)
   },500)

    //setRotation(0)
    initStatus();

    //setp3Tips()

    map.panTo([116.454925, 39.914705]);
    setTimeout(function () {
        initPoints();
    }, 2000)
    setTimeout(function () {
        $('.echart-con').addClass('loaded');
        $('.echart-lcon').addClass('loaded');
        $('.overview').addClass('loaded');
        initEchart();
        initBuild();
        initLine();
        // initPoints();
        add3DPoints();
        addPolygonizrLayer();
    }, 30);
    initBackground();
    // addParticlesLayer();
}

function initStatus() {
    //$(".turnover").removeClass('show')
    //$(".nums").removeClass('show')
    $(".word-container").hide();
    $(".step3-mask").hide();
    $(".echart-lcon").hide();
    $(".con-statis").hide();
    $(".echart-con").hide();
    $(".overview").hide();

}

function initBackground() {
    bgLayer = new AMap.ImageLayer({
        //bounds: new AMap.Bounds([114.9699, 39.083568], [117.87000, 41.41325]),
        bounds: new AMap.Bounds(new AMap.LngLat(115.3000, 39.164537),
            new AMap.LngLat(117.35728, 41.09606)),
        // bounds: new AMap.Bounds([115.3000, 39.164537], [117.35728, 41.09606]),
        //url: '../../img/step2_F.png',
        url: '../../img/step2_F.png?' + Date(),
        opacity: 1,
        map: map,
        height: 7000,
        visible: true,
        rejectMapMask: true
    })
}

function mapPanto(index) {

    var ent = buildPaths[index];
    var lnglat = ent.ps[0];

    map.setCenter(lnglat);
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
    polygonizrLayer = new AMap.CustomLayer(canvas, {
        zIndex: 11,
        zooms: [1, 18] // 设置可见级别，[最小级别，最大级别]
    });
    polygonizrLayer.setMap(map);
    setTimeout(function () {
        $('#clayer').polygonizr({
            // How long to pause in between new node-movements.
            restNodeMovements: 1,
            // When the cluster up<a href="https://www.jqueryscript.net/time-clock/">date</a>s, this sets speed of nodes.
            duration: 3,
            // Define the maximum distance to move nodes.
            nodeMovementDistance: 20,
            // The number of node nodes to print out.
            numberOfNodes: 70,
            // Define the maximume size of each node dot.
            nodeDotSize: 2,
            // Sets the ease mode of the movement: linear, easeIn, easeOut, easeInOut, accelerateDecelerate.
            nodeEase: "easeOut",
            // If true, the nodes will descend into place on load.
            nodeFancyEntrance: false,
            // Makes the cluster forms an ellipse inspired formation, random if true.
            randomizePolygonMeshNetworkFormation: true,
            // Define a formula for how to initialize each node dot's position.
            specifyPolygonMeshNetworkFormation: function (i) {
                var forEachNode = {
                    // Half a circle and randomized
                    x: this.canvasWidth - ((this.canvasWidth / 2) + (this.canvasHeight / 2) * Math.cos(i * (2 * Math.PI / this.numberOfNodes))) * Math.random(),
                    y: this.canvasHeight - (this.canvasHeight * (i / this.numberOfNodes))
                };
                console.log('forEachNode2:', forEachNode);
                return forEachNode;
            },
            // Number of relations between nodes.
            nodeRelations: 2,
            // The FPS for the whole canvas.
            animationFps: 50,
            // Sets the color of the node dots in the network (RGB).
            nodeDotColor: "8, 33, 87",
            // Sets the color of the node lines in the network (RGB).
            nodeLineColor: "8, 33, 87",
            // Sets the color of the filled triangles in the network (RGB).
            nodeFillColor: "8, 33, 87",
            // If valid RGB color adds a linear gradient stroke (set null to remove).
            nodeFillGradientColor: "0,0,0",
            // Sets the alpha level for the colors (1-0).
            nodeFillAlpha: .3,
            // Sets the alpha level for the lines (1-0).
            nodeLineAlpha: .5,
            // Sets the alpha level for the dots (1-0).
            nodeDotAlpha: .6,
            // Defines if the triangles in the network should be shown.
            nodeFillSapce: true,
            // Define if the active animation should glow or not (not CPU friendly).
            nodeGlowing: false
        })
    }, 2000);
}

/**
 * 销毁事件
 */
function destroyStep3(cb) {

    $('.echart-con').removeClass('loaded');
    $('.echart-lcon').removeClass('loaded');
    $('.overview').removeClass('loaded');
    removeEchart();
    $(".word-container").show();
    //particlesLayer ? particlesLayer.hide() : null;
    polygonizrLayer ? polygonizrLayer.hide() : null;
    buildObject3Dlayer && map.remove(buildObject3Dlayer);
    lineCanvasLayer && map.remove(lineCanvasLayer);
    step3Loca && step3Loca.destroy();
    step3PointsLayer && step3PointsLayer.destroy();
    setTimeout(function () {
        if (cb) cb();
    })
}

