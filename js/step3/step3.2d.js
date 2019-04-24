// 2D 地表平面效果功能包, zhu18@vip.qq.com at 2018.10.26
var lineStartTime = null
var lineCanvasLayer, minlineCanvasLayer, scanCanvasLayer;

var ppp = [];
var step3PointsLayer, step3Loca;
var centerCanvasSize = 100//越大越高清，性能越低
var minLineCanvasSize = 1500
var scanCanvasSize = 1000

function init2D() {
    initPoints();
   // initLine();
    initMinLine();
    setTimeout(function () {
     //     initScan();
    }, 5000)
}

function initMatrix(zr, count, spc, fill, stroke) {
    return;
    var list = [];
    var rect;
    var zr_w = zr.getWidth();
    var zr_h = zr.getHeight();
    var rect_width = zr_w / count;
    var rect_height = zr_h / count;

    for (var i = 0; i < count; i++) {
        for (var j = 0; j < count; j++) {
            rect = new zrender.Rect({
                shape: {
                    x: i * rect_width,
                    y: j * rect_height,
                    width: rect_width * spc,
                    height: rect_height * spc
                }
            })
            list.push(rect)
        }

    }
  var ms = zrender.path.mergePath(list, {
        style: {
            stroke: stroke,
            fill: fill,
        }
    })
    zr.add(ms);
    
    // ms.animate('style.fill',true)
    // .when(1000, {
    //     x:0,
    //     y:0,
    //     x2:0,
    //     y2:1,
    // }).when(2000, {
    //     x:0,
    //     y:1,
    //     x2:1,
    //     y2:1,
    // }).when(3000, {
    //     x:1,
    //     y:1,
    //     x2:1,
    //     y2:0,
    // }).when(4000, {
    //     x:1,
    //     y:1,
    //     x2:0,
    //     y2:0,
    // })

    // .start();
}

function initMinLine() {
    var mincoord = [116.433811, 39.905537]//+0.54
    var coordSize = 0.04
    var maxcoord = [mincoord[0] + coordSize, mincoord[1] + coordSize]
    var canvasSize = minLineCanvasSize
    var rate = canvasSize / coordSize

    var canvas = document.createElement('div');
    canvas.id = 'cbg1'
    canvas.style.width = canvasSize + 'px';
    canvas.style.height = canvasSize + 'px';
    var zr = zrender.init(canvas, { renderer: 'canvas', devicePixelRatio: 2 });

   
    // 背景矩阵
    var lg=new zrender.LinearGradient(0, 0, 1, 1)
       lg.addColorStop(0, 'rgba(255,230,80,.8)');
       lg.addColorStop(0.7, 'rgba(60,230,255,.8)');
       lg.addColorStop(1, 'rgba(233,80,255,.8)');

       initMatrix(zr,100,.3,lg,'#fff')
    
 var bg = new zrender.Rect({
        position: [0, 0],
        scale: [1, 1],
        style: {
            stroke: 'red',
            fill: 'rgba(4, 177, 243, 0)'
        },
        shape: {
            x: 0,
            y: 0,
            width: canvasSize,
            height: canvasSize
        }
    })
    //  zr.add(bg)
    
    var lineColors = ['rgba(255,0,0,1)', 'rgba(255,255,255,1)', 'rgba(255,60,30,.8)', 'rgba(230,100,10,.8)']
    var lineDashs = [[100, 200], [100, 500], [50, 200], [200, 600], [30, 50]]
    var lineRunTime = []

    // //动画线
    minRoadPaths.forEach((line) => {
        var lineDash = lineDashs[rangeRandom(lineDashs.length, 0, true)]
        var color = lineColors[rangeRandom(lineColors.length, 0, true)]
        var lineWidth = 1//Math.random()

        var line4 = new zrender.Polyline({
            position: [0, 0],
            scale: [1, 1],
            shape: {
                points: line.map(coordConvert),
                smooth: 0.2
            },
            style: {
                lineDash: lineDash,
                stroke: '#fff',//color,
                shadowBlur: 5,
                shadowColor: 'rgba(255,150,50,.8)',
                lineWidth: lineWidth,
                blend: 'lighter'
            }
        })

        zr.add(line4);

        line4.animate('style', true)
            .when(2000, {
                lineDashOffset: -(lineDash[0] + lineDash[1])
            }).start();
    })
    zr.configLayer(0, {
        motionBlur: true,
        lastFrameAlpha: 0.8
    });


    function pointsConvert(ps) {
        ps.map((p) => {
            return coordConvert(p)
        })
        return ps;
    }
    // 坐标转成canvas内部位置
    function coordConvert(coord) {
        return [(coord[0] - mincoord[0]) * rate, canvasSize - ((coord[1] - mincoord[1]) * rate)]

    }

    var minlineStartTime = setTimeout(function () {
        var canvas = zr.dom.getElementsByTagName('canvas')[0];
        minlineCanvasLayer = new AMap.CanvasLayer({
            map: map,
            canvas: canvas,
            bounds: new AMap.Bounds(
                mincoord,
                maxcoord
            ),
            zooms: [3, 18],
            zIndex: 8
        });

        //addPolygonizrLayer(canvas.parentNode)
        function draw() {
            minlineCanvasLayer.reFresh()//2D视图时可以省略
            AMap.Util.requestAnimFrame(draw)
        }
        draw()
    }, 2000)
}
/**
 * 初始化道路流光线
 */
function initLine() {
    if (lineCanvasLayer) {
        map.add(lineCanvasLayer);
        return
    }

    var mincoord = [116.097159, 39.698386]//+0.54
    var coordSize = 0.54
    var maxcoord = [mincoord[0] + coordSize, mincoord[1] + coordSize]
    var canvasSize = centerCanvasSize
    var rate = canvasSize / coordSize

    var canvas = document.createElement('div');
    canvas.style.width = canvasSize + 'px';
    canvas.style.height = canvasSize + 'px';
    var zr = zrender.init(canvas, { renderer: 'canvas', devicePixelRatio: 2 });

    //initScan(zr);
    var bg = new zrender.Rect({
        position: [0, 0],
        scale: [1, 1],
        style: {
            fill: '#3ef'
        },
        shape: {
            x: canvasSize * .5,
            y: canvasSize * .5,
            width: canvasSize * .333,
            height: canvasSize * .333
        }
    })
    // zr.add(bg);
    // map.on('click', function () {
    //     var bgcolor = 'rgba(' + parseInt(Math.random() * 254) + ',' + parseInt(Math.random() * 254) + ',' + parseInt(Math.random() * 254) + ',.5)'
    //     bg.attr({
    //         style: {
    //             fill: bgcolor
    //         }
    //     });
    //     console.log('bgColor:' + bgcolor)
    // });

    // random colors
    var lineColors = ['rgba(255,240,220,.8)', 'rgba(255,255,255,.8)', 'rgba(255,220,30,.8)', 'rgba(230,100,10,.8)']
    var lineDashs = [[100, 200], [100, 500], [50, 200], [200, 600], [30, 50]]
    var lineRunTime = []
    //光效线
    roadPaths.forEach((line) => {
        var lineDash = lineDashs[rangeRandom(lineDashs.length, 0, true)]
        var color = lineColors[rangeRandom(lineColors.length, 0, true)]
        var lineWidth = .2//Math.random()

        var staticLine = new zrender.Polyline({
            position: [0, 0],
            scale: [1, 1],
            shape: {
                points: line.map(coordConvert),
                smooth: 0.1
            },
            style: {
                //lineDash: [2000,200],
                stroke: 'rgba(255,240,220,1)',
                shadowBlur: .5,
                shadowColor: 'rgba(255,220,10,1)',
                lineWidth: lineWidth,
                blend: 'lighter'
            }
        })

        zr.add(staticLine);
    })
    // // //动画线
    // roadPaths.forEach((line) => {
    //     var lineDash = lineDashs[rangeRandom(lineDashs.length, 0, true)]
    //     var color = lineColors[rangeRandom(lineColors.length, 0, true)]
    //     var lineWidth = .1//Math.random()

    //     var line4 = new zrender.Polyline({
    //         position: [0, 0],
    //         scale: [1, 1],
    //         shape: {
    //             points: line.map(coordConvert),
    //             smooth: 0.1
    //         },
    //         style: {
    //             lineDash: lineDash,
    //             stroke: color,
    //             shadowBlur: 1,
    //             shadowColor: 'rgba(255,150,50,1)',
    //             lineWidth: lineWidth,
    //             blend: 'lighter'
    //         }
    //     })

    //     zr.add(line4);

    //     line4.animate('style', true)
    //         .when(2000, {
    //             lineDashOffset: -(lineDash[0] + lineDash[1])
    //         }).start();
    // })

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
    }
    // 坐标转成canvas内部位置
    function coordConvert(coord) {
        return [(coord[0] - mincoord[0]) * rate, canvasSize - ((coord[1] - mincoord[1]) * rate)]

    }

    lineStartTime = setTimeout(function () {
        var canvas = zr.dom.getElementsByTagName('canvas')[0];
        lineCanvasLayer = new AMap.CanvasLayer({
            map: map,
            canvas: canvas,
            bounds: new AMap.Bounds(
                mincoord,
                maxcoord
            ),
            zooms: [3, 18],
            zIndex: 7
        });

        function draw() {
            lineCanvasLayer.reFresh()//2D视图时可以省略
            AMap.Util.requestAnimFrame(draw)
        }
        draw()
    }, 2000)
}

/**
 * 高光扫描效果
 * @param {zrender示例} zr 
 */
function initScan(zr) {
    var mincoord = [116.418933, 39.892603]
    var coordSize = 0.09
    var maxcoord = [mincoord[0] + coordSize, mincoord[1] + coordSize]
    var canvasSize = scanCanvasSize
    var rate = canvasSize / coordSize

    var canvas = document.createElement('div');
    canvas.style.width = canvasSize + 'px';
    canvas.style.height = canvasSize + 'px';
    var zr = zrender.init(canvas, { renderer: 'canvas', devicePixelRatio: 2 });

    var linearColor = new zrender.LinearGradient(0, 0, 0, 1, [
        {
            offset: 0,
            color: 'rgba(255,255,255,0)'
        },
        {
            offset: 1,
            color: 'rgba(255,255,255,.8)'
        }
    ]);

    var lineW = new zrender.Rect({
        position: [0, 0],
        scale: [1, 1],
        style: {
            fill: linearColor
        },
        shape: {
            x: 0,
            y: 0,
            width: canvasSize,
            height: canvasSize * .15,
            shadowBlur: canvasSize * .15,
            shadowColor: 'rgba(255,255,255,.5)',
            blend: 'lighter'
        }

    })
    zr.add(lineW)
    // var lineW = new zrender.Polyline({
    //     position: [5, centerCanvasSize * .333],
    //     scale: [1, 1],
    //     shape: {
    //         points: [[5, 5], [centerCanvasSize, 5]],
    //         smooth: 0.1
    //     },
    //     style: {
    //         //lineDash: lineDash,
    //         stroke: 'rgba(255,255,255,1)',
    //         shadowBlur: 150,
    //         shadowColor: 'rgba(55,230,255,1)',
    //         lineWidth: 2,
    //         blend: 'lighter'
    //     }
    // })

    // zr.add(lineW);

    lineW.animate('', true)
        .when(10000, {
            position: [0, canvasSize]
        }).start();
    // zr.configLayer(0, {
    //     motionBlur: true,
    //     lastFrameAlpha: 0.8
    // });
    setTimeout(function () {
        var canvas = zr.dom.getElementsByTagName('canvas')[0];
        scanCanvasLayer = new AMap.CanvasLayer({
            map: map,
            canvas: canvas,
            bounds: new AMap.Bounds(
                mincoord,
                maxcoord
            ),
            zooms: [3, 18],
            zIndex: 9
        });
        function draw() {
            scanCanvasLayer.reFresh()//2D视图时可以省略
            AMap.Util.requestAnimFrame(draw)
        }
        draw()
    }, 2000)
}

/**
 * 道路灯光点，11W数据
 */
function initPoints() {
    if (step3Loca) {
        step3Loca.destroy();
    }
    if (step3PointsLayer) {
        step3PointsLayer.destroy();
    }
    var colors = [
        '#f93',
        '#ff0',
        '#ffbb44',
        '#fff',
        '#fe0'
    ];


    $.get('./js/step3/roadPoints.csv', function (csv) {
        step3Loca = new Loca(map)
        step3PointsLayer = Loca.visualLayer({
            container: step3Loca,
            type: 'point',
            shape: 'circle'
        });
        //step3PointsLayer.addTo(step3Loca)

        step3PointsLayer.setData(csv, {
            lnglat: function (obj) {
                var value = obj.value;
                return [value['lng'], value['lat']];
            },
            type: 'csv'
        });

        step3PointsLayer.setOptions({
            style: {
                radius: function (obj) {
                    var value = obj.value;
                    switch (parseInt(value.type)) {
                        case 3:
                            return 1;
                        case 4:
                            return 1;
                        case 41:
                            return 2;
                        case 5:
                            return 3;
                        default:
                            return 1;
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
                opacity: 0.5
            }
        });

        // setTimeout(function(){
        step3PointsLayer.render();
        //},3000)

    });
}

