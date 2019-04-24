
// 3D 空间效果功能包, zhu18@vip.qq.com at 2018.10.26

var buildObject3Dlayer;


/**
 * 初始化建筑物
 */
function initBuild() {
    if (buildObject3Dlayer) {
        map.add(buildObject3Dlayer);
        return;
    }
    // 添加 Object3DLayer 图层，用于添加 3DObject 对象
    buildObject3Dlayer = new AMap.Object3DLayer();
    map.add(buildObject3Dlayer);

    // 顺时针坐标点
    var floorHeight = 100
    buildPaths.forEach((item) => {
        addbuild(item.ps, item.totalFloor * floorHeight, item.currentfloor);
    })

    // 加载AMap.GltfLoader插件
    AMap.plugin(["AMap.GltfLoader"], function () {
        // 创建AMap.GltfLoader插件实例
        var gltf = new AMap.GltfLoader();

        // 调用load方法，加载 glTF 模型资源
        var urlDuck = 'd4.gltf';  // 模型资源文件路径，远程/本地文件均可
        gltf.load(urlDuck, function (gltfCity) {
            // gltfCity 为解析后的gltf对象

            var option = {
                position: new AMap.LngLat(116.452925, 39.916705),  // 必须, 设置gltf模型位置
                scale: 600,  // 非必须，设置模型缩放倍数
                height: 100,  // 非必须，设置模型高度
                scene: 0, // 非必须，设置当前场景序号
                opacity: .3
            }
            window.gltf = gltfCity
            gltfCity.setOption(option);
            gltfCity.rotateY(90);
            buildObject3Dlayer.add(gltfCity);
        });
    })
    //修改光源
    changeLinght();


    /**
     * 添加发光建筑物
     * @param {array} paths 
     * @param {int} height 大楼高度 默认层数*100
     * @param {int} currentfloor 当前楼层
     */
    function addbuild(paths, height, currentfloor) {
        height = height || 1000
        var bottomColor = [1,1,1,1]
        var topColor = [1,1,1,0]
        // 添加建筑物
        //addMesh(paths, 0, height, bottomColor, topColor)
        addMeshLayers(paths, height, height/100, [.8, .95, 1, .8], [.95, .05],true,currentfloor,[1,.6,.1,.8])
        // 脚底圆环
        // addCircles(paths[0])
        // 添加发光楼层
        // 改变paths范围，建议小于0.0001
        // zoomPaths(paths, 0.0001)
        // addMeshLayers(paths, 500, 5, [.8, .95, 1, .5], [.3, .7])
        
        // 垂直线条
        addVerticalLines(paths,bottomColor,topColor,height*1.5)
        // 顶部线条
        addLine(paths,[1,1,1,0.5],[1,1,1,0.5],height)
        // 地部线条
        addLine(paths,[1,1,1,1],[1,1,1,1],0)



         // 添加灯光效果
        addMesh(paths, 0, height*2, [1, 1, 1, .3], [1, 1, 1, 0], 'front');
        // 外墙 数据格式和paths不一样
        // var wall = new AMap.Object3D.Wall({
        //     path: paths,
        //     height: height,
        //     color:'rgba(255,200,33,.6)'
        // });
        // wall.backOrFront = 'both';
        // wall.transparent = true;

       
        // buildObject3Dlayer.add(wall);
       


    }


    /**
     * 发光层
     * @param {array} paths 图像平面paths
     * @param {number} height 高度
     * @param {number} count 分层数
     * @param {array} color 颜色，会逐渐变淡
     * @param {array} thickAndPadding 单层厚度与间距总和为1，如：[.5,.5]
     * @param {number} lingtLayer 高亮楼层
     * @param {color} lingtColor 高亮颜色
     */
    function addMeshLayers(paths, height, count, color, thickAndPadding, isOpacity=true,lingtLayer,lingtColor=[90,200,255,1]) {
        var thickAndPadding = thickAndPadding || [.5, .5] // 厚度和间距比例，总和为1
        var layerHeight = height / count; // 楼层总高度
        var layerThick = layerHeight * thickAndPadding[0] // 楼层厚度
        var layerPadding = layerHeight * thickAndPadding[1] // 楼层间距
        

        var [r, g, b, a] = color

        for (var i = 0; i < count; i++) {
            var _a = isOpacity?(a / count) * (count - i):a;
            if(lingtLayer!=undefined&&i+1===lingtLayer){
                addMesh(paths, layerHeight * i, layerHeight * i + layerThick, lingtColor)
            }
            else{
                addMesh(paths, layerHeight * i, layerHeight * i + layerThick, [r, g, b, _a])
            }
            
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
        buildObject3Dlayer.add(mesh);
        return mesh;
    }

    // 画垂直线
    function addLine(paths,beginColor,endColor,beginHeight,endHeight=beginHeight){
        
        var lines = new AMap.Object3D.Line();
        var lineGeo = lines.geometry;
        var begin,end;
       
        lines.transparent = true;
        for(var i=0;i<paths.length;i++){
            begin = lnglatToG20(paths[i])
            lineGeo.vertices.push(begin.x, begin.y, -beginHeight);
            lineGeo.vertexColors.push(...beginColor);

            end = (i+1>=paths.length)?lnglatToG20(paths[0]):lnglatToG20(paths[i+1])
            lineGeo.vertices.push(end.x, end.y, -endHeight);
            lineGeo.vertexColors.push(...endColor);
        }
        buildObject3Dlayer.add(lines);   
    }
    // 画垂直线
    function addVerticalLines(paths,bottomColor,topColor,height){
        var lines = new AMap.Object3D.Line();
        var lineGeo = lines.geometry;
        var center;
        lines.transparent = true;
        paths.forEach(function (lngLat, index) {
            center = lnglatToG20(lngLat)
            lineGeo.vertices.push(center.x, center.y, 0);
            lineGeo.vertexColors.push(...bottomColor);
            lineGeo.vertices.push(center.x, center.y, -height);
            lineGeo.vertexColors.push(...topColor);
        })
        buildObject3Dlayer.add(lines);
        
    }
}

// 通过中心点，边数，半径添加物体（接受光照）
var addRegularPrism = function (center, segment, height, radius, color) {

    var cylinder = new AMap.Object3D.MeshAcceptLights();
    var geometry = cylinder.geometry;
    var verticesLength = segment * 2;
    var path = [];
    for (var i = 0; i < segment; i += 1) {
        var angle = 2 * Math.PI * i / segment;
        var x = center.x + Math.cos(angle) * radius;
        var y = center.y + Math.sin(angle) * radius;
        path.push([x, y]);
        geometry.vertices.push(x, y, 0); // 底部顶点
        geometry.vertices.push(x, y, -height); // 顶部顶点

        geometry.vertexColors.push.apply(geometry.vertexColors, color); // 底部颜色
        geometry.vertexColors.push.apply(geometry.vertexColors, color); // 顶部颜色

        var nX = Math.cos(angle);
        var nY = Math.sin(angle);
        // 为了支持光照，计算侧面顶点法向量
        geometry.vertexNormals.push(nX, nY, 0);
        geometry.vertexNormals.push(nX, nY, 0);

        var bottomIndex = i * 2;
        var topIndex = bottomIndex + 1;
        var nextBottomIndex = (bottomIndex + 2) % verticesLength;
        var nextTopIndex = (bottomIndex + 3) % verticesLength;

        geometry.faces.push(bottomIndex, topIndex, nextTopIndex); // 侧面三角形1
        geometry.faces.push(bottomIndex, nextTopIndex, nextBottomIndex); // 侧面三角形2
    }

    // 构建顶面三角形,一样的颜色,但是法向量不一样，所以需要独立的顶点
    for (var i = 0; i < segment; i += 1) {
        geometry.vertices.push.apply(geometry.vertices, geometry.vertices.slice(i * 6 + 3, i * 6 + 6)); // 底部顶点
        geometry.vertexColors.push.apply(geometry.vertexColors, color);
        // 为了支持光照，计算顶面顶点法向量
        geometry.vertexNormals.push(0, 0, -1);
    }

    var triangles = AMap.GeometryUtil.triangulateShape(path);
    var offset = segment * 2;
    for (var v = 0; v < triangles.length; v += 3) {
        geometry.faces.push(triangles[v] + offset, triangles[v + 2] + offset, triangles[v + 1] + offset)
    }

    cylinder.transparent = true;//如果使用了透明颜色，请设置true
    buildObject3Dlayer.add(cylinder);
};


function rangeRandom(max, min, isInt) {
    min = min || 0;
    var rdm = Math.random() * (max - min) + min
    return isInt ? Math.floor(rdm) : rdm;
}

 // 修改光源
function changeLinght() {
   
    map.AmbientLight = new AMap.Lights.AmbientLight([1, 1, 1], .3);
    map.DirectionLight = new AMap.Lights.DirectionLight([0, -1, 2], [1, 1, 1], .9);

    var isStop = false;
    var angle = 90;
    function changeLightDirection() {
        if (!isStop) {
            angle += 3;
            var dir = [
                Math.cos(angle / 180 * Math.PI),
                -Math.sin(angle / 180 * Math.PI),
                2
            ];
            //console.log(dir)
           
            map.DirectionLight.setDirection(dir);
            map.render();
        }
        AMap.Util.requestAnimFrame(changeLightDirection);
    }

    map.on('click', function () {
        isStop = !isStop
        console.log("isStop:" + isStop)
    })
    changeLightDirection();
}
var points3D;
/**
 * 3d精灵点
 */
function add3DPoints(){
    //var provinces = result.districtList[0].districtList;
    var provinces = [];
    for(var i=0;i<100;i++)
    {
        provinces.push([rangeRandom(116.484925,116.414925), rangeRandom(39.944705,39.874705)]);
    }
    
    points3D = new AMap.Object3D.Points();
    points3D.transparent = true;
    //points3D.textures.push(colorize(particle,p * 0.029, p * 0.015, p * 0.01, 0.5));
   // points3D.textures.push('/img/points1.png');
    var geometry = points3D.geometry;
    for (var p = 0; p < provinces.length; p += 1) {
        // points 类型的顶点坐标需要使用 G20 坐标
        var center = lnglatToG20(provinces[p]);
        // 随机高度。Z 轴正方向指向地下，因此这里设置高度要添加负号指向反方向
        geometry.vertices.push(center.x, center.y, -Math.random() * 2000);
        geometry.pointSizes.push(Math.round(Math.random() * 10));
        geometry.vertexColors.push(p * 0.009, p * 0.015, p * 0.02, 0.5);
        geometry.pointAreas.push(0, 0, 1, 1);
        // 每两个元素描述一个顶点的纹理坐标信息，纹理坐标以图片左上角为原点。分别是左上角和右下角。
        geometry.vertexUVs.push(0, 0, 1, 1);
        
        // geometry.pointAreas.push(0.3,0,0.7,0.5);
    }
    //points3D.borderColor = [0.6, 0.8, 1, 1];
    //points3D.borderWeight = 3;
    buildObject3Dlayer.add(points3D);

}

var particle = new Image();
particle.src = "data:image/png;base64,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";

var tempFileCanvas;
    function colorize(img, r, g, b, a) {
        if (!img)
            return img;

        if (!tempFileCanvas)
            tempFileCanvas = document.createElement("canvas");

        if (tempFileCanvas.width != img.width)
            tempFileCanvas.width = img.width;

        if (tempFileCanvas.height != img.height)
            tempFileCanvas.height = img.height;

        var imgCtx = tempFileCanvas.getContext("2d"),
            imgData, i;
        imgCtx.drawImage(img, 0, 0);

        imgData = imgCtx.getImageData(0, 0, img.width, img.height);

        i = imgData.data.length;
        while ((i -= 4) > -1) {
            imgData.data[i + 3] = imgData.data[i] * a;
            if (imgData.data[i + 3]) {
                imgData.data[i] = r;
                imgData.data[i + 1] = g;
                imgData.data[i + 2] = b;
            }
        }
console.log('tempFileCanvas:w:'+tempFileCanvas.width+',h:'+tempFileCanvas.height)
        imgCtx.putImageData(imgData, 0, 0);
        return tempFileCanvas;
    }

// 添加水波圆环
function addCircles(lnglat,maxSize=300,count=3,fillColor='#fff',strokeColor='#fff'){

    for(var i=0;i<count;i++){
        new AMap.Circle({
            center:lnglat,
            map:map,
            radius:maxSize/count*(i+1),
            fillColor:fillColor,
            strokeWeight:1,
            strokeColor:strokeColor,
            fillOpacity:0.05
        })
    }
}

function lnglatToG20(lnglat) {

    lnglat = map.lngLatToGeodeticCoord(lnglat);
    lnglat.x = AMap.Util.format(lnglat.x, 3);
    lnglat.y = AMap.Util.format(lnglat.y, 3);
    return lnglat;
}