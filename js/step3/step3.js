/**
 * step3 北京朝阳区
 */
var particlesLayer,polygonizrLayer;

/**
 * step3 北京朝阳区进入
 */
function step3() {

    initEchart()
    map.setRotation(90)
    map.setZoom(15)
    setPitch(80)
    setRotation(0)
    initStatus();
    map.panTo([116.589811, 39.914282]);

    //addParticlesLayer();
    addPolygonizrLayer();
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
    polygonizrLayer = new AMap.CustomLayer(canvas, {
        zIndex: 11,
        zooms: [1, 18] // 设置可见级别，[最小级别，最大级别]
    });
    polygonizrLayer.setMap(map);
    setTimeout(function () {
        $('#clayer').polygonizr({
            // How long to pause in between new node-movements.
            restNodeMovements:1,
            // When the cluster up<a href="https://www.jqueryscript.net/time-clock/">date</a>s, this sets speed of nodes.
            duration:3,
            // Define the maximum distance to move nodes.
            nodeMovementDistance: 50,
            // The number of node nodes to print out.
            numberOfNodes: 25,
            // Define the maximume size of each node dot.
            nodeDotSize: 1,
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
                console.log('forEachNode2:',forEachNode);
                return forEachNode;
            },
            // Number of relations between nodes.
            nodeRelations: 2,
            // The FPS for the whole canvas.
            animationFps: 50,
            // Sets the color of the node dots in the network (RGB).
            nodeDotColor: "6, 31, 64",
            // Sets the color of the node lines in the network (RGB).
            nodeLineColor: "6, 31, 64",
            // Sets the color of the filled triangles in the network (RGB).
            nodeFillColor: "240, 255, 250",
            // If valid RGB color adds a linear gradient stroke (set null to remove).
            nodeFillGradientColor: "7, 34, 73",
            // Sets the alpha level for the colors (1-0).
            nodeFillAlpha: .1,
            // Sets the alpha level for the lines (1-0).
            nodeLineAlpha: .1,
            // Sets the alpha level for the dots (1-0).
            nodeDotAlpha: .1,
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
function destroyStep3() {
    removeEchart();
    $(".word-container").show();
    particlesLayer ? particlesLayer.hide() : null;
    polygonizrLayer? polygonizrLayer.hide() :null;
}