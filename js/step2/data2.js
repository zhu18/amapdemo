var ring = [
    [116.651083, 41.105153],
    [116.93667, 40.810032],
    [117.435074, 40.73085],
    [117.210156, 40.575995],
    [117.338446, 40.29262],
    [117.040493, 40.111607],
    [116.781924, 40.111607],
    [116.773936, 39.962818],
    [116.93127, 39.856264],
    [116.824348, 39.686094],
    [116.597845, 39.686094],
    [116.380507, 39.534028],
    [116.232323, 39.64398],
    [115.906839, 39.655108],
    [115.755611, 39.581398],
    [115.666585, 39.671939],
    [115.487433, 39.720555],
    [115.528962, 39.868849],
    [115.462365, 40.065368],
    [115.766964, 40.218955],
    [115.960231, 40.340585],
    [115.80139, 40.621768],
    [116.390716, 40.840457],
    [116.496552, 40.902554],
    [116.507123, 41.06547]
]

const ddd = [{ coord: "115.549577,39.548351", value: 1114 }]
// const ddd = [{ coord: "115.54031,39.711105", value: 1114 }]

for (let index = 1; index < 38; index++) {
    var val = ddd[0].coord.split(',');
    var x = parseFloat(val[0]) + 0.06* index
    var y = parseFloat(val[1])
    ddd.push(
        { coord: `${x},${y}`, value: 1114 }
    )

}
const ddd2 = ddd.concat()
ddd.forEach((v, i) => {
    for (let index = 0; index < 30; index++) {
        var val = ddd[i].coord.split(',');
        var x = parseFloat(val[0])
        var y = parseFloat(val[1]) + 0.06 * index
        if (AMap.GeometryUtil.isPointInRing([x, y], ring)) {
            ddd.push(
                { coord: `${x},${y}`, value: 1114 }
            )
        }
    }
})
ddd.splice(0, 38 )


// ddd.forEach((v, i, array) => {
//     var val = v.coord.split(',');
//     var x = parseFloat(val[0])
//     var y = parseFloat(val[1])
//     console.log(!AMap.GeometryUtil.isPointInRing([x, y], ring))
   
// })
