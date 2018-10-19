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
    map.panTo([116.432050, 39.935873]);
    addM();
    //addParticlesLayer();
    setp3Tips()

}

function initStatus() {
    //$(".turnover").removeClass('show')
    //$(".nums").removeClass('show')
    $(".word-container").hide();
    $(".step3-mask").hide();
    $(".echart-lcon").hide();
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

function addM() {
    // 添加 Object3DLayer 图层，用于添加 3DObject 对象
    var object3Dlayer = new AMap.Object3DLayer();
    map.add(object3Dlayer);
    // 顺时针坐标点
    var paths = [
        [116.432044, 39.936292],
        [116.43239, 39.936315],
        [116.432435, 39.935884],
        [116.43207, 39.935853]
    ];

    var paths1 = [
        [116.436042, 39.942209],
        [116.43738, 39.942234],
        [116.4374, 39.941626],
        [116.436067, 39.941619]
    ];

    var paths1 = [
        [116.436042, 39.942209],
        [116.43738, 39.942234],
        [116.4374, 39.941626],
        [116.436067, 39.941619]
    ]

    var paths2 = [
        [116.423683, 39.948919],
        [116.425007, 39.948953],
        [116.425047, 39.948446],
        [116.423808, 39.948385]
    ]

    addbuild(paths);
    addbuild(paths1);
    addbuild(paths2);

    map.on('click', function (e) {
        console.log(e.lnglat + '')
    })

    function addbuild(paths) {
        // 添加建筑物
        addMesh(paths, 0, 1000, [1, 1, 1, .5], [.86, .65, .95, .8])

        // 添加发光楼层
        // 改变paths范围，建议小于0.0001
        zoomPaths(paths, 0.0001)
        addMeshLayers(paths, 500, 5, [.8, .95, 1, .5], [.3, .7])
        // 添加灯光效果
        var mesh = addMesh(paths, 0, 100, [1, 1, 1, .3], [1, 1, 1, 0], 'back')
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
            console.log("r:" + r + ',g:' + g + ',b:' + b + ',a:' + _a)
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
        mesh.textures.push('https://a.amap.com/jsapi_demos/static/texture3d/shuilifang.png');
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



