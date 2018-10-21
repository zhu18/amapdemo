var stepInstance1={
    destoryTime:300,
    load(){
        console.log('init1');
    },
    destory(){
        console.log("destory1");
    }
}

setStepInstance(1,stepInstance1);