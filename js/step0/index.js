var stepInstance1={
    destroyTime:300,
    load(){
        $('#login').addClass('loaded')
        console.log('init0');
    },
    destroy(){
        $('#login').removeClass('loaded')
        console.log("destory0");
    }
}

setStepInstance(1,stepInstance1);