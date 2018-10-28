// 2D 地表平面效果功能包, zhu18@vip.qq.com at 2018.10.26
var lineStartTime = null
var lineCanvasLayer;

var ppp = [];
var step3PointsLayer, step3Loca;
var centerCanvasSize = 100//越大越高清，性能越低
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

    //可视区范围
    // var line3 = new zrender.Polyline({
    //     position: [0, 0],
    //     scale: [1, 1],
    //     shape: {
    //         points: [[5, 5], [995, 5], [995, 995], [5, 995], [5, 5]],
    //         smooth: 0
    //     },
    //     style: {
    //         //lineDash: [10, 50],
    //         stroke: 'rgba(255,255,255,1)',
    //         shadowBlur: 1,
    //         shadowColor: 'rgba(255,150,50,1)',
    //         lineWidth: 1,
    //         blend: 'lighter'
    //     }
    // })
    // zr.add(line3);
    initScan(zr);
//     var bg = new zrender.Rect({
//         position:[0,0],
//         scale:[1,1],
//         style:{
//             fill:'#3ef'
//         },
//         shape:{
//             x:canvasSize*.5,
//             y:canvasSize*.5,
//             width:canvasSize*.333,
//             height:canvasSize*.333
//         }
//     })
//     zr.add(bg);
//    map.on('click', function () {
//     var bgcolor='rgba('+parseInt(Math.random()*254)+','+parseInt(Math.random()*254)+','+parseInt(Math.random()*254)+',.5)'
//     bg.attr({
//         style: {
//             fill:'rgba(50,45,33,.2)'//bgcolor
//         }
//     });
//     console.log('bgColor:'+bgcolor)
// });

    // random colors
    var lineColors = ['rgba(255,40,20,.8)', 'rgba(255,255,255,.8)', 'rgba(255,60,30,.8)', 'rgba(230,100,10,.8)']
    var lineDashs = [[100, 200], [100, 500], [50, 200], [200, 600], [30, 50]]
    var lineRunTime = []

    roadPaths.forEach((line) => {
        var lineDash = lineDashs[rangeRandom(lineDashs.length, 0, true)]
        var color = lineColors[rangeRandom(lineColors.length, 0, true)]
        var lineWidth = .1//Math.random()

        var line4 = new zrender.Polyline({
            position: [0, 0],
            scale: [1, 1],
            shape: {
                points: line.map(coordConvert),
                smooth: 0.1
            },
            style: {
                lineDash: [20000,200],
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
                lineDashOffset: -(lineDash[0] + lineDash[1])
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
function initScan(zr){
    var lineW = new zrender.Polyline({
        position: [5, centerCanvasSize*.333],
        scale: [1, 1],
        shape: {
            points: [[5, 5], [centerCanvasSize, 5]],
            smooth: 0.1
        },
        style: {
            //lineDash: lineDash,
            stroke: 'rgba(255,255,255,1)',
            shadowBlur: 150,
            shadowColor: 'rgba(55,230,255,1)',
            lineWidth: 2,
            blend: 'lighter'
        }
    })

    zr.add(lineW);

    lineW.animate('', true)
        .when(5000, {
            position: [5, 200]
        }).start();
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
                            return 2;
                        case 4:
                            return 3;
                        case 41:
                            return 5;
                        case 5:
                            return 8;
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

