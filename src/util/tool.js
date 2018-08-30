const restructureData=(array, opt, isNewData)=>{
    let newArray = []
    let item
    array.forEach(v => {
        item = Object.assign({
            lnglat: isNewData ? _randomLnglat(v.lnglat) : v.lnglat,
            name: v.name,
            style: isNewData ? Math.ceil(Math.random() * 3) : v.style
        }, opt)
        newArray.push(item)
    })
    return newArray
}
const _randomLnglat=(lnglat)=>{
    lnglat[0] = lnglat[0] + (Math.random() * (9 - 1) + 1) * 0.01;
    lnglat[1] = lnglat[1] - (Math.random() * (9 - 1) + 1) * 0.01;
    return lnglat
}
export { restructureData }