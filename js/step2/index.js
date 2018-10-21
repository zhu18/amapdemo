var stepInstance2={
    destroyTime:300,
    load(){
        console.log("init2");
    },
    destroy(){
        console.log("destory2");
    }
}

setStepInstance(2,stepInstance2);