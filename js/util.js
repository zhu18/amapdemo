let timer=0;
class Util {
    constructor() {
        this.chartInstance = []
        this.tasks = []
    }
    restructureData(array, opt, isNewData) {
        let newArray = []
        let item
        array.forEach(v => {
            item = Object.assign({
                lnglat: isNewData ? this.randomLnglat(v.lnglat) : v.lnglat,
                name: v.name,
                style: isNewData ? Math.ceil(Math.random() * 3) : v.style
            }, opt)
            newArray.push(item)
        })
        return newArray
    }
    restructureData2(array, opt, isNewData) {
        let newArray = []
        let item
        array.forEach(v => {
            var obj = v.xy.split(',');
            if(obj.length== 2 && obj[0] && obj[1]) {
                item = {
                    lnglat: obj,
                    name: v.name,
                    style: 4
                };
                newArray.push(item)
            }
        })
        return newArray
    }
    resizeData(array, multiples) {
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
        lnglat[0] = lnglat[0]*1 + (Math.random() * (9 - 1) + 1) * 0.01;
        lnglat[1] = lnglat[1] - (Math.random() * (9 - 1) + 1) * 0.01;
        return lnglat;
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
    getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.hash.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
}









// class Animate {
    // constructor(map) {
    //     const c = map.getCenter()
    //     this.center = c
    //     this.flag = true
    //     this.map = map
    // }
    function setCenter(lnglat) {
        map.setCenter(lnglat)
    }
    function stop() {
        map.setCenter(map.getCenter())
        map.setStatus({
            resizeEnable: false,
            rotateEnable: false,
            pitchEnable: false,
        })
    }
    function start() {
        map.setStatus({
            resizeEnable: true,
            rotateEnable: true,
            pitchEnable: true,
        })
    }
function setZoom(index, step = .09) {
        console.log(map.getZoom())
        return new Promise((resolve, reject) => {
            (function _setZoom() {
                map.setZoom(map.getZoom() + step)
                map2.setZoom(map2.getZoom() + step)
                if (step>0) {
                    if (map.getZoom() >= index) {
                        resolve('ok')
                        return
                    } 
                }else{
                    if (map.getZoom() <= index) {
                        resolve('ok')
                        return
                    } 
                }
                
                requestAnimationFrame(_setZoom)
            })()
            // _setZoom(this)
        })
    }
    function pitch(deg) {
        return new Promise((resolve, reject) => {
            (function _pitch() {
                console.log(map.getPitch())

                if (map2.getPitch() > deg) {
                    map.setPitch(map.getPitch() - 4)
                    map2.setPitch(map2.getPitch()-4)
                    if (map2.getPitch() <= deg) {
                        resolve('ok')
                        return
                    }
                } else {
                    map.setPitch(map.getPitch() + 4)
                    map2.setPitch(map2.getPitch()+4)
                    if (map2.getPitch() >= deg) {
                        resolve('ok')
                        return
                    }
                }
                requestAnimationFrame(_pitch)
            })()
        })
    }
    function autoRotation() {
        (function _rotation() {
            map.setRotation(map.getRotation() + 0.1)
            requestAnimationFrame(_rotation)
        })()
    }
    function rotation(deg) {
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
function animation(to ,speed) {
        return _animation(to, speed)
    }
    function _animation(to, speed = 0.00001) {
        return new Promise((resolve, reject) => {
            let x = map.getCenter().lng
            let y = map.getCenter().lat
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
                        resolve('ok')
                    }
                } else if (x1 < 0 && y1 > 0) {
                    y = y - speed
                    x = x - speed2
                    map.panTo([x, y])
                    if (map.getCenter().lng < to[0] && map.getCenter().lng > to[1]) {
                        requestAnimationFrame(aa)
                    } else {
                        resolve('ok')
                    }
                } else if (x1 < 0 && y1 < 0) {
                    y = y + speed2
                    x = x + speed
                    map.panTo([x, y])
                    if (map.getCenter().lng < to[0] && map.getCenter().lng > to[1]) {
                        requestAnimationFrame(aa)
                    } else {
                        resolve('ok')
                    }
                }

            }
            aa()
        })
    }

// }
var tasks = []

function navigation(map,scallback) {
    // tasks.length > 0 ? tasks = (tasks.push(scallback)) : tasks = [f1, f2, f3, f4, f5, f6, f7, scallback]
    tasks = [f1, f2, f3, f4, f5, scallback]
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
        // animate.setCenter([116.372169, 40.041315])
        setPitch(60)
        setZoom(16).then(_ => {
            setRotation(70)
            next()
        })
    }
    function f2() {
        map.panTo([116.442161, 39.922941])
        setTimeout(() => {
            next()
        }, 500);
        // animation([116.442161, 39.922941]).then(_ => {
        //     next()
        // })
        
    }
    function f3() {
        rotation(320).then(_ => {
            next()
        })
    }
    function f4() {
        map.panTo([116.460762, 39.929612])
        setPitch(76)
        // setTimeout(() => {
            
        // }, 500);
        rotation(360).then(_ => {
            next()
        })
    }
    function f5() {
        setPitch(46)
        setZooms(14.5)
      setTimeout(() => {
          next()
      }, 2000);
        
    }
    // function f6() {
    //     animation([116.465255, 39.957569], 0.00009).then(_ => {
    //         next()
    //     })
    // }
    // function f7() {
    //     pitch(80).then(_ => {
    //         next()
    //     })

    // }
    
    map.on('mousedown', (e) => {
        clearTimeout(timer)
        stop()
        tasks = []
        timer = setTimeout(() => {
            map.setStatus({
                resizeEnable: true,
                rotateEnable: true,
                pitchEnable: true
            })
            autoRotation()
        }, 10000);
    })
    document.onkeydown = function (event) {
        if (event.ctrlKey) {
            start()
        }

    };
}



