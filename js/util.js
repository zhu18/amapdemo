
class Util {
    constructor() {
        this.chartInstance = []
        this.tasks = []
    }
    restructureData(array, opt, isNewData){
        let newArray =[]
        let item
        array.forEach(v =>{
            item = Object.assign({
                lnglat: isNewData?this.randomLnglat(v.lnglat):v.lnglat,
                name: v.name,
                style: isNewData?Math.ceil(Math.random() * 3):v.style
            },opt)
            newArray.push(item)
        })
        return newArray
    }
    resizeData(array, multiples){
        let newArray = []
        for (let index = 0; index < multiples; index++) {
            array.forEach(v => {
                newArray.push({
                    lnglat: this.randomLnglat(v.lnglat),
                    name: v.name,
                    style: Math.ceil(Math.random() * 3)
                })
            })
        }
        return newArray
    }
    randomLnglat(lnglat) {
        lnglat[0] = lnglat[0] + (Math.random() * (9 - 1) + 1) * 0.01;
        lnglat[1] = lnglat[1] - (Math.random() * (9 - 1) + 1) * 0.01;
        return lnglat
    }
    addTask(task) {
        this.tasks.push(task)
    }
    next() {
        if (this.tasks.length > 0) {
            this.tasks.shift()();
        } else {
            return;
        }
    }
}

class Animate {
    constructor(map) {
        const c = map.getCenter()
        this.center = c
        this.flag = true
        this.map = map
    }
    setCenter(lnglat) {
        map.setCenter(lnglat)
        this.center = map.getCenter()
    }
    stop() {
        this.setCenter(map.getCenter())
        map.setStatus({
            resizeEnable: false,
            rotateEnable: false,
            pitchEnable: false,
        })
    }
    start() {
        map.setStatus({
            resizeEnable: true,
            rotateEnable: true,
            pitchEnable: true,
        })
    }
    setZoom(index) {
        return new Promise((resolve, reject) => {
            (function _setZoom() {
                map.setZoom(map.getZoom() + .09)
                if (map.getZoom() >= index) {
                    resolve('ok')
                    return
                }
                requestAnimationFrame(_setZoom)
            })()
            // _setZoom(this)
        })
    }
    pitch(deg) {
        return new Promise((resolve, reject) => {
            (function _pitch() {
                if (map.getPitch() > deg) {
                    map.setPitch(map.getPitch() - 1)
                    if (map.getPitch() <= deg) {
                        resolve('ok')
                        return
                    }
                } else {
                    map.setPitch(map.getPitch() + 1)
                    if (map.getPitch() >= deg) {
                        resolve('ok')
                        return
                    }
                }
                requestAnimationFrame(_pitch)
            })()
        })
    }
    autoRotation() {
        (function _rotation() {
            map.setRotation(map.getRotation() + 0.1)
            requestAnimationFrame(_rotation)
        })()
    }
    rotation(deg) {
        return new Promise((resolve, reject) => {
            (function _rotation() {
                map.setRotation(map.getRotation() + 1)
                if (map.getRotation() >= deg) {
                    resolve('ok')
                    return
                }
                requestAnimationFrame(_rotation)
            })()
        })
    }
    animation(to) {
        return this._animation(to)
    }
    _animation(to, speed = 0.00009) {
        return new Promise((resolve, reject) => {
            let x = this.center.lng
            let y = this.center.lat
            let z = this.rotation
            let pitch = this.pitch
            let aaa = new AMap.LngLat(this.center.lng, this.center.lat)
            let x1 = x - to[0]
            let y1 = y - to[1]
            let speed2 = (x1 * speed) / y1
            const aa = () => {
                if (x1 > 0 && y1 < 0) {
                    y = y + speed
                    x = x + speed2
                    map.panTo([x, y])
                    if (map.getCenter().lng > to[0] && map.getCenter().lng > to[1]) {
                        requestAnimationFrame(aa)

                    } else {
                        this.center = map.getCenter()
                        resolve('ok')
                    }
                } else if (x1 > 0 && y1 > 0) {
                    y = y - speed
                    x = x - speed2
                    map.panTo([x, y])
                    if (map.getCenter().lng > to[0] && map.getCenter().lng > to[1]) {
                        requestAnimationFrame(aa)
                    } else {
                        this.center = map.getCenter()
                        resolve('ok')
                    }
                } else if (x1 < 0 && y1 > 0) {
                    y = y - speed
                    x = x - speed2
                    map.panTo([x, y])
                    if (map.getCenter().lng < to[0] && map.getCenter().lng > to[1]) {
                        requestAnimationFrame(aa)
                    } else {
                        this.center = map.getCenter()
                        resolve('ok')
                    }
                } else if (x1 < 0 && y1 < 0) {
                    y = y + speed2
                    x = x + speed
                    map.panTo([x, y])
                    if (map.getCenter().lng < to[0] && map.getCenter().lng > to[1]) {
                        requestAnimationFrame(aa)
                    } else {
                        this.center = map.getCenter()
                        resolve('ok')
                    }
                }

            }
            aa()
        })
    }

}
var tasks=[]
function navigation(map){
    let animate = new Animate(map);
    tasks=[f1,f2,f3,f4,f5,f6,f7]
    next()
    function next() {
        if (tasks.length > 0) {
            tasks.shift()();
        } else {
            return;
        }
    }

    function addTask(task) {
        tasks.push(task);
    }
    function f1() {
        animate.setCenter([116.372169, 40.041315])
        animate.setZoom(18).then(_ => {
            next()
        })
    }
    function f2() {
        //map.setMapStyle('amap://styles/2b5b5a7bf7d342735986be35a82f241f')
        return animate.pitch(60).then(_ => {
            next()
        })
    }
    function f3() {
        animate.rotation(110).then(_ => {
            next()
        })
    }
    function f4() {
        animate.animation([116.35469, 40.036877]).then(_ => {
            next()
        })
    }
    function f5() {
        animate.rotation(200).then(_ => {
            next()
        })
    }
    function f6() {
        animate.animation([116.357872, 40.030425]).then(_ => {
            next()
        })
    }
    function f7() {

        animate.pitch(80).then(_ => {

            next()
        })

    }
    let timer;
    map.on('mousedown', (e) => {
        clearTimeout(timer)
        animate.stop()
        tasks = []
        timer = setTimeout(() => {
            map.setStatus({
                resizeEnable: true,
                rotateEnable: true,
                pitchEnable: true
            })
            animate.autoRotation()
        }, 10000);
    })
    document.onkeydown = function (event) {
        if (event.ctrlKey) {
            animate.start()
        }

    };
}



