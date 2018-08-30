class Animate {
    constructor(map) {
        this.center = map.getCenter()
        this.flag = true
        this.map = map
        this.tasks = []
    }
    playing(options, speed = 500) {
        this.stop()
        if (Array.isArray(options)) {
            for (const item of options) {
                for (const key in item) {
                    if (item.hasOwnProperty(key)) {
                        const value = item[key];
                        this.switchFn(key, value, speed)

                    }
                }
            }
            this.next()
        } else if (options instanceof Object) {

            for (const key in options) {

                const value = options[key];
                this.switchFn(key, value, speed)
            }
            this.next()
        }
    }
    switchFn(key, value, speed) {
        let that = this
        function delayed() {
            that.delayed(speed).then(_ => {
                that.next()
            })
        }
        switch (key) {
            case 'zoom':
                function fnzoom(params) {
                    that.setZoom(value).then(_ => {
                        that.next()
                    })
                }
                this.tasks.push(delayed, fnzoom)
                // that.next()
                break;
            case 'pitch':

                function fnPitch(params) {
                    that.pitch(value).then(_ => {
                        that.next()
                    })
                }
                that.tasks.push(delayed, fnPitch)
                // that.next()
                break;
            case 'center':
                if (Array.isArray(value) && Array.isArray(value[0])) {
                    let num = 0
                    let fn = 'fn' + num
                    value.forEach((v, i) => {
                        if (num % 2 === 0) {
                            fn = function () {
                                that.animation(v).then(_ => {
                                    that.next();
                                })
                            }
                            that.tasks.push(fn)
                        } else {
                            fn = function () {
                                that.delayed(speed).then(_ => {
                                    that.next();
                                })
                            }
                            that.tasks.push(fn)
                        }
                        num++

                    })
                    // that.next();
                } else {
                    function fnCenter(params) {
                        that.animation(value).then(_ => {
                            that.next()
                        })
                    }
                    that.tasks.push(delayed, fnCenter)
                }
                break;
            case 'rotation':
                function fnRotation(params) {
                    that.rotation(value).then(_ => {
                        that.next()
                    })
                }
                that.tasks.push(delayed, fnRotation)
                break;
            case 'callBack':
                function callBack(params) {
                    value()
                    that.next()

                }
                that.tasks.push(delayed, callBack)
                break;
            default:
                break;
        }
    }
    delayed(speed = 500) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve('ok')
            }, speed);
        })
    }
    next() {
        if (this.tasks.length > 0) {
            this.tasks.shift()();
        } else {
            return;
        }
    }
    setCenter(lnglat) {
       this.map.setCenter(lnglat)
        this.center = this.map.getCenter()
    }
    stop() {
        this.tasks = []
        // this.setCenter(map.getCenter())
        // map.setStatus({
        //     resizeEnable: false,
        //     rotateEnable: false,
        //     pitchEnable: false,
        // })
    }
    start() {
        this.map.setStatus({
            resizeEnable: true,
            rotateEnable: true,
            pitchEnable: true,
        })
    }
    setZoom(index) {
        this.map.setZoom(index)
        let map=this.map
        return new Promise((resolve, reject) => {
            (function _setZoom() {
                map.setZoom(map.getZoom() + .1)
                if (map.getZoom() >= index) {
                    map.setZoom(index)
                    resolve('ok')
                    return
                }
                requestAnimationFrame(_setZoom)
            })()
            // _setZoom(this)
        })
    }
    pitch(deg) {
        let map = this.map
        return new Promise((resolve, reject) => {
            (function _pitch() {
                if (map.getPitch() > deg) {
                    map.setPitch(map.getPitch() - 1)
                    if (map.getPitch() <= deg) {
                        map.setPitch(deg)
                        resolve('ok')
                        return
                    }
                } else {
                    map.setPitch(map.getPitch() + 1)
                    if (map.getPitch() >= deg) {
                        map.setPitch(deg)
                        resolve('ok')
                        return
                    }
                }
                requestAnimationFrame(_pitch)
            })()
        })
    }
    autoRotation() {
        let map = this.map
        (function _rotation() {
            map.setRotation(map.getRotation() + 0.1)
            requestAnimationFrame(_rotation)
        })()
    }
    rotation(deg) {
        let map = this.map
        return new Promise((resolve, reject) => {
            (function _rotation() {
                map.setRotation(map.getRotation() + 1)
                if (map.getRotation() >= deg) {
                    map.setRotation(deg)
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
        let map = this.map
        return new Promise((resolve, reject) => {
            let x = this.center.lng
            let y = this.center.lat
            let x1 = x - to[0]
            let y1 = y - to[1]
            let speed2 = (x1 * speed) / y1

            const aa = () => {
                if (x1 >= 0 && y1 <= 0) {
                    y = y + speed
                    x = x + speed2
                    map.panTo([x, y])
                    if (map.getCenter().lng > to[0] && map.getCenter().lng > to[1]) {
                        requestAnimationFrame(aa)
                    } else {
                        this.center = map.getCenter()
                        resolve('ok')
                    }
                } else if (x1 >= 0 && y1 >= 0) {
                    y = y - speed
                    x = x - speed2
                    map.panTo([x, y])
                    if (map.getCenter().lng > to[0] && map.getCenter().lng > to[1]) {
                        requestAnimationFrame(aa)
                    } else {
                        this.center = map.getCenter()
                        resolve('ok')
                    }
                } else if (x1 <= 0 && y1 >= 0) {
                    y = y - speed
                    x = x - speed2
                    map.panTo([x, y])
                    if (map.getCenter().lng < to[0] && map.getCenter().lng > to[1]) {
                        requestAnimationFrame(aa)
                    } else {
                        this.center = map.getCenter()
                        resolve('ok')
                    }
                } else if (x1 <= 0 && y1 <= 0) {
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

export { Animate };
