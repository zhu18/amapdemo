var flag = true;
var tasks2 = [];
function autoPlay(params) {
    flag = true;
    function _fn() {
            setTimeout(() => {
                flag ? window.location.hash = 'step=1' : ''
            }, 500);
            setTimeout(() => {
                flag ? window.location.hash = 'step=2' : ''
            }, 3000);
            setTimeout(() => {
                flag ? window.location.hash = 'step=3' : ''
            }, 6000);
            setTimeout(() => {
                flag ? navigation(map, _fn) : ''
            }, 9000);
    }
    _fn()
}
function stopPlay(params) {
    $.extend(true, tasks2, tasks);
    tasks = []
    flag = false
}
//autoPlay()

$('.header .title').click(function () {
    console.log(tasks2)
    stopPlay()
})
$('.header .title').dblclick(function () {

    autoPlay()
})