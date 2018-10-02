/**
 * step3 北京朝阳区
 */


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
    map.panTo([116.589811, 39.914282])
}

function initStatus()
{
    $(".turnover").removeClass('show')
    $(".nums").removeClass('show')
}
/**
 * 销毁事件
 */
function destroyStep3(){
    removeEchart();
}