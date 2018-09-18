const options = {
    beforeAction() {
        console.log('step2')
    },
    options: {
        cneter: [116.369793, 40.041126],
        zoom: 10,
        pitch: 0,
        rotation: 0
    },
    callBack: () => {
        console.log('step2 is done')
    }
}
export default options;