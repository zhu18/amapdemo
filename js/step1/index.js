var stepInstance1={
    destroyTime:300,
    load(){
        console.log('init1');
    },
    destroy(){
        console.log("destory1");
    }
}

setStepInstance(1,stepInstance1);