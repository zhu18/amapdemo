/**
 * step3 北京朝阳区
 */
var particlesLayer, polygonizrLayer;

/**
 * step3 北京朝阳区进入
 */
function step3() {

    initEchart()
    map.setRotation(90)
    map.setZoom(17)
    setPitch(40)
    setRotation(0)
    initStatus();
    map.panTo([116.454925, 39.914705]);
    addM();
    addLine();
    addPolygonizrLayer();
}

function initStatus() {
    //$(".turnover").removeClass('show')
    //$(".nums").removeClass('show')
    $(".word-container").hide();
    //$(".step3-mask").hide();
    //$(".echart-lcon").hide();
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
    // 北京东方联合投资管理有限公司	网信	北京市朝阳区霄云路28号院2号楼7层701 1300:5
    var paths0 = [
        [116.465814, 39.958505],
        [116.465626, 39.958271],
        [116.466133, 39.957890],
        [116.466401, 39.958146]
    ];


    //北京瓴岳信息技术有限公司	洋钱罐	北京市朝阳区东三环北路19号中青大厦19层 1500:15
    var paths1 = [
        [116.460435, 39.93005],
        [116.460928, 39.930035],
        [116.460837, 39.928958],
        [116.460274, 39.928936],
    ];

    // 北京乐融多源信息技术有限公司	积木盒子	北京市朝阳区金桐西路10号远洋光华国际AB座5层A501-505 2200:5
    var paths2 = [
        [116.453805, 39.916099],
        [116.454626, 39.916099],
        [116.455347, 39.915438],
        [116.455393, 39.914607],
        [116.454868, 39.9146],
        [116.454831, 39.915158],
        [116.454262, 39.91552],
        [116.454246, 39.915616],
        [116.45381, 39.915628],
    ]

    // 贝壳金科控股有限公司	贝壳金科	北京市朝阳区朝外大街乙12号13层O-1612B 1300:13
    var paths3 = [
        [116.441719, 39.922859],
        [116.442633, 39.922885],
        [116.44265, 39.922674],
        [116.441727, 39.922636],
    ]

    // 北京钱得乐科技有限公司	金蛋理财	北京市朝阳区北辰世纪中心B座17层 1700:17
    var paths4 = [
        [116.387691, 39.999278],
        [116.388151, 39.999297],
        [116.388387, 39.99915],
        [116.388388, 39.998969],
        [116.387929, 39.998934],
        [116.387695, 39.999056],
    ]
    // 北京玖富普惠信息技术有限公司	玖富	北京市朝阳区阜通东大街1号院5号楼1单元310-306 2400
    var paths5 = [
        [116.479965, 39.996479],
        [116.480392, 39.996611],
        [116.48094, 39.996381],
        [116.481308, 39.996069],
        [116.481523, 39.995759],
        [116.481325, 39.995609],
        [116.481157, 39.995589],
        [116.480529, 39.996036],
    ]
    var floorHeight = 100
    buildPaths.forEach((item) => {
        addbuild(item.ps, item.totalFloor * floorHeight);
    })


    map.on('click', function (e) {
        console.log(e.lnglat + '')
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
    var canvas = document.createElement('div');
    canvas.id = 'ccc01'
    canvas.className = 'ccc01'
    canvas.style.width = '1000px';
    canvas.style.height = '1000px';
    var zr = zrender.init(canvas, { renderer: 'canvas' });

    var line1 = new zrender.Line({
        position: [0, 0],
        scale: [1, 1],
        shape: {
            x1: 320,
            y1: 150,
            x2: 320,
            y2: 600,
        },
        style: {
            lineDash: [100, 400],
            stroke: 'rgba(255,60,50,.8)',
            shadowBlur: 1,
            shadowColor: 'rgba(255,150,50,1)',
            lineWidth: .3,
            blend: 'lighter'
        }
    })
    var line2 = new zrender.Line({
        position: [0, 0],
        scale: [1, 1],
        shape: {
            x1: 340,
            y1: 150,
            x2: 340,
            y2: 600,
        },
        style: {
            lineDash: [100, 400],
            stroke: 'rgba(255,255,255,.8)',
            shadowBlur: 1,
            shadowColor: 'rgba(255,150,50,1)',
            lineWidth: .3,
            blend: 'lighter'
        }
    })

    zr.add(line1);
    zr.add(line2);

    var linePath3 = [];

    var line3 = new zrender.Polyline({
        position: [0, 0],
        scale: [1, 1],
        shape: {
            points: linePath3,
            smooth: 0.5
        },
        style: {
            lineDash: [100, 400],
            stroke: 'rgba(255,255,255,.8)',
            shadowBlur: 1,
            shadowColor: 'rgba(255,150,50,1)',
            lineWidth: .1,
            blend: 'lighter'
        }
    })
    zr.add(line3);
    line3.animate('style', true)
        .when(2000, {
            lineDashOffset: 500
        }).start();
    // var count = 80;
    // $.get('./js/step3/roadPoints.csv', function (data) {

    //     var LF = String.fromCharCode(10);
    //     var lineText = data.split(LF);
    //     lineText.slice(1)
    //     lineText.forEach((item) => {
    //         var c = item.split(',')
    //         if(c[2]=='50052')
    //         {
    //             count--
    //             if (count > 0) {
                    
    //                 linePath3.push(coordConvert([c[0], c[1]]))
    //             }
    //         }
    //     })
    //     console.log(linePath3)

    //     var line3 = new zrender.Polyline({
    //         position: [0, 0],
    //         scale: [1, 1],
    //         shape: {
    //             points: linePath3,
    //             smooth: 0.5
    //         },
    //         style: {
    //             lineDash: [100, 400],
    //             stroke: 'rgba(255,255,255,.8)',
    //             shadowBlur: 1,
    //             shadowColor: 'rgba(255,150,50,1)',
    //             lineWidth: .1,
    //             blend: 'lighter'
    //         }
    //     })
    //     zr.add(line3);
    //     line3.animate('style', true)
    //         .when(2000, {
    //             lineDashOffset: 500
    //         }).start();
    // })



    line1.animate('style', true)
        .when(1000, {
            lineDashOffset: 500
        }).start();
    line2.animate('style', true)
        .when(2000, {
            lineDashOffset: 500
        }).start();

    zr.configLayer(0, {
        // clearColor: 'rgba(255, 255, 255, 0.1)',
        motionBlur: true,
        lastFrameAlpha: 0.8
    });

    var mincrood = [116.097159, 39.698386]//+0.54
    var coordSize = 0.54
    var maxcrood = [mincrood[0] + coordSize, mincrood[1] + coordSize]
    var canvasSize = 1000
    var rate = canvasSize / (maxcrood[0] - mincrood[0])

    // 坐标转成canvas内部位置
    function coordConvert(coord) {
        return [(coord[0] - mincrood[0]) * rate, (coord[1] - mincrood[1]) * rate]

    }

    setTimeout(function () {
        var canvas = zr.dom.getElementsByTagName('canvas')[0];
        var CanvasLayer = new AMap.CanvasLayer({
            map: map,
            canvas: canvas,
            bounds: new AMap.Bounds(
                mincrood,
                maxcrood
            ),
            zooms: [3, 18],
        });
        function draw() {
            CanvasLayer.reFresh()//2D视图时可以省略
            AMap.Util.requestAnimFrame(draw)
        }
        draw()


    }, 3000)


}

function addPoints(){
    var colors = [
        '#fff',
        '#008aeb',
        '#04d',
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