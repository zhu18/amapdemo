/**
 * step3 北京朝阳区
 */
var particlesLayer, polygonizrLayer;

/**
 * step3 北京朝阳区进入
 */
function step3() {

    // initEchart()
    map.setRotation(90)
    map.setZoom(13)
    setPitch(40)
    setRotation(0)
    initStatus();
    map.panTo([116.454925, 39.914705]);
    addM();
    addLine();
    addPoints();
    addPolygonizrLayer();
}

function initStatus() {
    //$(".turnover").removeClass('show')
    //$(".nums").removeClass('show')
    $(".word-container").hide();
    $(".step3-mask").hide();
    $(".echart-lcon").hide();
    $(".con-statis").hide();
    $(".echart-con").hide();

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
                console.log('forEachNode2:', forEachNode);
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
    polygonizrLayer ? polygonizrLayer.hide() : null;
}

function addM() {
    // 添加 Object3DLayer 图层，用于添加 3DObject 对象
    var object3Dlayer = new AMap.Object3DLayer();
    map.add(object3Dlayer);
    // 顺时针坐标点
    var floorHeight = 100
    buildPaths.forEach((item) => {
        addbuild(item.ps, item.totalFloor * floorHeight);
    })


    function addbuild(paths, height) {
        height = height || 1000
        // 添加建筑物
        addMesh(paths, 0, height, [1, 1, 1, .5], [.86, .65, .95, .8])

        // 添加发光楼层
        // 改变paths范围，建议小于0.0001
        zoomPaths(paths, 0.0001)
        addMeshLayers(paths, 500, 5, [.8, .95, 1, .5], [.3, .7])
        // 添加灯光效果
        var mesh = addMesh(paths, 0, 10000, [1, 1, 1, .3], [1, 1, 1, 0], 'front')
    }


    /**
     * 发光层
     * @param {array} paths 图像平面paths
     * @param {number} height 高度
     * @param {number} count 分层数
     * @param {array} color 颜色，会逐渐变淡
     * @param {array} thickAndPadding 单层厚度与间距总和为1，如：[.5,.5]
     */
    function addMeshLayers(paths, height, count, color, thickAndPadding) {
        var thickAndPadding = thickAndPadding || [.5, .5] // 厚度和间距比例，总和为1
        var layerHeight = height / count; // 楼层总高度
        var layerThick = layerHeight * thickAndPadding[0] // 楼层厚度
        var layerPadding = layerHeight * thickAndPadding[1] // 楼层间距

        var [r, g, b, a] = color

        for (var i = 0; i < count; i++) {
            var _a = (a / count) * (count - i)
            addMesh(paths, layerHeight * i, layerHeight * i + layerThick, [r, g, b, _a])
        }
    }

    /**
     * 对矩形path进行缩放
     * @param {array} paths 平面paths 
     * @param {number} offset 转换大小，[0.0001到-0.0001] 
     */
    function zoomPaths(paths, offset) {
        paths[0] = [paths[0][0] - offset, paths[0][1] + offset];
        paths[1] = [paths[1][0] + offset, paths[1][1] + offset];
        paths[2] = [paths[2][0] + offset, paths[2][1] - offset];
        paths[3] = [paths[3][0] - offset, paths[3][1] - offset];
    }

    /**
     * 添加并返回一个图形
     * @param {array} paths 平面paths
     * @param {number} beginHeight 开始高度
     * @param {number} endHeight 完成高度
     * @param {array} bottomColors 底部颜色
     * @param {array} topColors 顶部颜色
     * @param {string} backOrFront 面显示模式 'back'、'front'、'both'
     */
    function addMesh(paths, beginHeight, endHeight, bottomColors, topColors, backOrFront) {
        var ags = {
            paths,
            beginHeight,
            endHeight,
            bottomColors,
            topColors,
            backOrFront
        }
        return addMeshBase(ags)
    }

    function addMeshBase(opt) {
        var paths = opt.paths || [];
        var beginHeight = opt.beginHeight || 0;
        var endHeight = opt.endHeight || 1000;
        var backOrFront = opt.backOrFront || 'both';//'back'、'front'、'both'
        var bottomColors = opt.bottomColors || [1, 1, 1, 1];
        var topColors = opt.topColors || bottomColors;

        var bounds = paths.map(function (path) {
            return new AMap.LngLat(path[0], path[1]);
        });

        // 创建 Object3D.Mesh 对象
        var mesh = new AMap.Object3D.Mesh();
        var geometry = mesh.geometry;
        var vertices = geometry.vertices;
        var vertexColors = geometry.vertexColors;
        var faces = geometry.faces;
        var vertexLength = bounds.length * 2;

        var verArr = [];

        // 设置侧面
        bounds.forEach(function (lngLat, index) {
            var g20 = map.lngLatToGeodeticCoord(lngLat);
            verArr.push([g20.x, g20.y]);
            // 构建顶点-底面顶点
            vertices.push(g20.x, g20.y, -beginHeight);
            // 构建顶点-顶面顶点
            vertices.push(g20.x, g20.y, -endHeight);

            // 设置底面顶点颜色
            vertexColors.push.apply(vertexColors, bottomColors);
            // 设置顶面顶点颜色
            vertexColors.push.apply(vertexColors, topColors);

            // 设置三角形面
            var bottomIndex = index * 2;
            var topIndex = bottomIndex + 1;
            var nextBottomIndex = (bottomIndex + 2) % vertexLength;
            var nextTopIndex = (bottomIndex + 3) % vertexLength;

            //侧面三角形1
            faces.push(bottomIndex, topIndex, nextTopIndex);
            //侧面三角形2
            faces.push(bottomIndex, nextTopIndex, nextBottomIndex);
        });

        // 设置顶面，根据顶点拆分三角形
        var triangles = AMap.GeometryUtil.triangulateShape(verArr);
        for (var v = 0; v < triangles.length; v += 3) {
            var a = triangles[v];
            var b = triangles[v + 2];
            var c = triangles[v + 1];
            faces.push(a * 2 + 1, b * 2 + 1, c * 2 + 1);
        }

        // 开启透明度支持
        mesh.transparent = true;
        mesh.backOrFront = backOrFront;
        //mesh.needUpdate=true;
        // 添加至 3D 图层
        object3Dlayer.add(mesh);
        return mesh;
    }

    //116.432273,39.936081

}

function addLine() {
    var mincoord = [116.097159, 39.698386]//+0.54
    var coordSize = 0.54
    var maxcoord = [mincoord[0] + coordSize, mincoord[1] + coordSize]
    var canvasSize = 1000 //越大越高清，性能越低
    var rate = canvasSize / coordSize

    var canvas = document.createElement('div');
    canvas.id = 'ccc01'
    canvas.className = 'ccc01'
    canvas.style.width = canvasSize + 'px';
    canvas.style.height = canvasSize + 'px';
    var zr = zrender.init(canvas, { renderer: 'canvas', devicePixelRatio: 2 });








    //可视区范围
    var line3 = new zrender.Polyline({
        position: [0, 0],
        scale: [1, 1],
        shape: {
            points: [[5, 5], [995, 5], [995, 995], [5, 995], [5, 5]],
            smooth: 0
        },
        style: {
            lineDash: [10, 50],
            stroke: 'rgba(255,255,255,.8)',
            shadowBlur: 1,
            shadowColor: 'rgba(255,150,50,1)',
            lineWidth: 1,
            blend: 'lighter'
        }
    })

    zr.add(line3);

    line3.animate('style', true)
        .when(2000, {
            lineDashOffset: -60
        }).start();

    // random colors
    var lineColors = ['rgba(255,40,20,.8)','rgba(255,255,255,.8)','rgba(255,60,30,.8)','rgba(230,100,10,.8)']
    var lineDashs = [[100,200],[100,500],[50,200],[200,600],[30,50]]
    var lineRunTime = []
  
    roadPaths.forEach((line) => {
        var lineDash = lineDashs[rangeRandom(lineDashs.length,0,true)]
        var color =  lineColors[rangeRandom(lineColors.length,0,true)]
        var lineWidth = .2//Math.random()
        console.log(lineDash)
        console.log(color)
        console.log(lineWidth)
        var line4 = new zrender.Polyline({
            position: [0, 0],
            scale: [1, 1],
            shape: {
                points: line.map(coordConvert),
                smooth: 0.1
            },
            style: {
                lineDash: lineDash,
                stroke: color,
                shadowBlur: 1,
                shadowColor: 'rgba(255,150,50,1)',
                lineWidth: lineWidth,
                blend: 'lighter'
            }
        })

        zr.add(line4);

        line4.animate('style', true)
            .when(2000, {
                lineDashOffset: -(lineDash[0]+lineDash[1])
            }).start();

    })




    map.on('click', function (e) {
        ppp.push([e.lnglat.lng, e.lnglat.lat])
        console.log(e.lnglat + '')
        console.log(coordConvert([e.lnglat.lng, e.lnglat.lat]))
    })





    zr.configLayer(0, {
        // clearColor: 'rgba(255, 255, 255, 0.1)',
        motionBlur: true,
        lastFrameAlpha: 0.8
    });



    function pointsConvert(ps) {
        ps.map((p) => {
            return coordConvert(p)
        })
        return ps;
        console.log(ps)
    }
    // 坐标转成canvas内部位置
    function coordConvert(coord) {
        return [(coord[0] - mincoord[0]) * rate, canvasSize - ((coord[1] - mincoord[1]) * rate)]

    }

    setTimeout(function () {
        var canvas = zr.dom.getElementsByTagName('canvas')[0];
        var CanvasLayer = new AMap.CanvasLayer({
            map: map,
            canvas: canvas,
            bounds: new AMap.Bounds(
                mincoord,
                maxcoord
            ),
            zooms: [3, 18],
        });
        function draw() {
            CanvasLayer.reFresh()//2D视图时可以省略
            AMap.Util.requestAnimFrame(draw)
        }
        draw()


    }, 2000)


}

var ppp = [];

function addPoints() {
    var colors = [
        '#fff',
        '#eb008a',
        '#fd3',
        '#9bf',
        '#28f'
    ];

    $.get('./js/step3/roadPoints.csv', function (csv) {
        var step1Loca = new Loca(map)
        var layer = Loca.visualLayer({
            container: step1Loca,
            type: 'point',
            shape: 'circle'
        });

        layer.setData(csv, {
            lnglat: function (obj) {
                var value = obj.value;
                return [value['lng'], value['lat']];
            },
            type: 'csv'
        });

        layer.setOptions({
            style: {
                radius: function (obj) {
                    var value = obj.value;
                    switch (parseInt(value.type)) {
                        case 3:
                            return 2;
                        case 4:
                            return 3;
                        case 41:
                            return 5;
                        case 5:
                            return 4;
                        default:
                            return 2;
                    }
                },
                color: function (obj) {
                    var value = obj.value;
                    switch (parseInt(value.type)) {
                        case 3:
                            return colors[0];
                        case 4:
                            return colors[1];
                        case 41:
                            return colors[2];
                        case 5:
                            return colors[3];
                        default:
                            return colors[4];
                    }
                },
                opacity: 0.3
            }
        });

        layer.render();
    });
}

function rangeRandom(max, min, isInt) {
    min = min || 0;
    var rdm = Math.random() * (max - min) + min
    return isInt?Math.floor(rdm):rdm;
}