const options = {
    beforeAction() {
        console.log('step1 is before')
    },
    options: {
        zoom: 4.2,
        pitch: 0,
        rotation: 0,
    },
    callBack: () => {
        console.log('step1 is done')
    }
}

export default options;