/**
 * step3 北京朝阳区
 */
var polygonizrLayer;

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

    addPolygonizrLayer();

}

function initStatus()
{
    $(".turnover").removeClass('show')
    $(".nums").removeClass('show')
}

function addPolygonizrLayer() {

    if(polygonizrLayer){ polygonizrLayer.show();return;}
    var canvas = document.createElement('div');
    canvas.className = 'clayer'
    canvas.id = 'clayer'


// 创建一个自定义图层
    polygonizrLayer = new AMap.CustomLayer(canvas, {
        zIndex: 11,
        zooms: [1, 18] // 设置可见级别，[最小级别，最大级别]
    });
    polygonizrLayer.setMap(map);
    setTimeout(function(){
    $(function () {
        $('#clayer').polygonizr();
    })},2000);
}

/**
 * 销毁事件
 */
function destroyStep3(){
    removeEchart();
    polygonizrLayer?polygonizrLayer.hide():null;
}