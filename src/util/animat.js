class Animate {
    constructor(map) {
        this.center = map.getCenter()
        this.map = map
        this.tasks = []
    }
    /*
        * @description 执行动画
        * @params options 动画执行参数
        * @params speed 动画间隔
    */
    playing(obj, speed = 500) {
        const that=this
        if (obj.hasOwnProperty('beforeAction')) {
            obj.beforeAction.apply(this.map);
        }
        this.stop()
        if (Array.isArray(obj.options)) {
            for (const item of obj.options) {
                for (const key in item) {
                    if (item.hasOwnProperty(key)) {
                        const value = item[key];
                        that.switchFn(key, value, speed, obj.callBack)
                    }
                }
            }
            this.next()
        } else if (obj.options instanceof Object) {

            for (const key in obj.options) {

                const value = obj.options[key];

                this.switchFn(key, value, speed, obj.callBack)
            }
            function callBack(params) {
                obj.callBack()
                that.next()
            }
            that.tasks.push(callBack)
            this.next()
        }
    }
    /*
        * @description 动画分类
    */
    switchFn(key, value, speed,scallback) {
        let that = this
        function delayed() {
            that.delayed(speed).then(_ => {
                that.next()
            })
        }
        switch (key) {
            // zoom动画
            case 'zoom':
                function fnzoom(params) {
                    that.setZoom(value).then(_ => {
                        that.next()
                    })
                }
                this.tasks.push(delayed, fnzoom)
                break;
            // 仰角动画
            case 'pitch':
                function fnPitch(params) {
                    that.pitch(value).then(_ => {
                        that.next()
                    })
                }
                that.tasks.push(delayed, fnPitch)
                // that.next()
                break;
            // 中心点动画
            case 'center':
                //多点运动
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
                } else {
                    //单点运动
                    function fnCenter(params) {
                        that.animation(value).then(_ => {
                            that.next()
                        })
                    }
                    that.tasks.push(delayed, fnCenter)
                }
                break;
            // 旋转动画
            case 'rotation':
                function fnRotation(params) {
                    that.rotation(value).then(_ => {
                        that.next()
                    })
                }
                that.tasks.push(delayed, fnRotation)
                break;
            // 回掉函数
            case 'callBack':
                break;
            default:
               
                break;
        }
       
    }
    /*
        * @description  延迟动画,用于两个动画间隙
        * @params speed 间隔时长
    */
    delayed(speed = 500) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve('ok')
            }, speed);
        })
    }
    /*
        * @description  执行动画队列中下一个动画
    */
    next() {
        if (this.tasks.length > 0) {
            this.tasks.shift()();
        } else {
            return;
        }
    }
    /*
        *  @description  设置地图当前中心点
        *  @params lnglat 地图经纬度
    */
    setCenter(lnglat) {
        this.map.setCenter(lnglat)
        this.center = this.map.getCenter()
    }
    /*
       **  停止动画
   */
    stop() {
        /*
        ** 清空当前动画队列,
        */
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
    /*
        * @description  设置地图显示的缩放级别
        * @params index 可设范围：[3,18]/[3,19](移动端)
     */
    setZoom(index) {
        this.map.setZoom(index)
        let map = this.map
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
        })
    }
    /*
        * @description  设置俯仰角,3D视图有效
        * @params index 可设范围：[3,18]/[3,19](移动端)
     */
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
    /*
        * @description  自动旋转
     */
    autoRotation() {
        let map = this.map
            (function _rotation() {
                map.setRotation(map.getRotation() + 0.1)
                requestAnimationFrame(_rotation)
            })()
    }
    /*
       * @description  设置地图顺时针旋转角度，旋转原点为地图容器中心点，
       * @params deg 取值范围 [0-360]
    */
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

    /*
       * @description  地图中心点平移至指定点位置
       * @params to 目标点经纬度
       * @params speed 运动速度
    */
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
