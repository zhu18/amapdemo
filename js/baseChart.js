var chartInstance = [], intervalTime = 5000,
    baseOption = {
        title: {
            text: '标题名称',
            left: 'left',
            textStyle: {
                color: '#fff',
                fontSize: 16
            },
            top: '3px'
        },
        grid: {
            left: '8px',
            right: '8px',
            bottom: '8px',
            top: '50px',
            containLabel: true
        },
        legend: {
            show: false
        },
        xAxis: {
            splitLine: {
                show: false
            },
            axisLine:{
                lineStyle:{
                    color:'#144382'
                }
            },
            axisLabel: {
                textStyle: {
                    color: '#d5efff',
                    fontSize: 10
                }
            },
            axisTick: {
                show: false
            },
        },
        yAxis: {
            splitLine: {
                show: false,
            },
            axisLabel: {
                textStyle: {
                    color: '#d5efff',
                    fontSize: 10
                }
            },
            axisLine:{
                lineStyle:{
                    color:'#144382'
                }
            },
            axisTick: {
                show: false
            }
        }
    };

function removeEchart(){
    $('.echart-con .item').removeClass('loaded');
    $('.echart-lcon .item').removeClass('loaded');
}
function initEchart() {

    $('.echart-con .item').each((i,item)=>{

        (function(obj,i) {
            console.log('obj:',obj,'i:',i);
            setTimeout(()=>{
                $(obj).addClass('loaded');
            },500+i*300)
        })($(item),i);
    });
    pieLine();
    setTimeout(()=>{
        line1();
    },1000);
    setTimeout(()=>{
        line2();
    },1300);
    setTimeout(()=>{
        bar1();
    },1600);
    setTimeout(()=>{
        line3();
    },1900);
    setTimeout(()=>{
        bar2();
    },2500);

    window.onresize = function () {
        for (var i = 0; i < chartInstance.length; i++) {
            chartInstance[i].resize();
        }
    }
}

function line1() {
    var option = {
        title:{
            text:'成交量曲线'
        },
        tooltip: {
            show: true,
            //trigger: 'axis',
            formatter:'{c}',
            backgroundColor:'rgba(0,0,0,0.65)',
            borderColor:'rgba(0,0,0,0.65)',
            borderWidth:1,
            position:'top'
        },
        xAxis: {
            type: 'category',
            data : ['11-06','11-07','11-08','11-09']
        },
        yAxis: {
            type: 'value',
        },
        color:['#ddc02a'],
        series: [
            {
                name:'数量',
                type:'line',
                data:[50, 120, 100,150],
                smooth: true,
                symbol:'none',
                areaStyle:{
                    normal:{
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(221,192,42,.5)'
                        }, {
                            offset: .5,
                            color: 'rgba(221,192,42,0)'
                        }])

                    }
                }
            }
        ]
    };

    loadEChart("line1", option,true);
}

function line2() {
    var option = {
        title:{
            text:'代还金额曲线'
        },
        tooltip: {
            show: true,
            //trigger: 'axis',
            formatter:'{c}',
            backgroundColor:'rgba(0,0,0,0.65)',
            borderColor:'rgba(0,0,0,0.65)',
            borderWidth:1,
            position:'top'
        },
        xAxis: {
            type: 'category',
            data : ['11-06','11-07','11-08','11-09']
        },
        yAxis: {
            type: 'value',
        },
        color:['#1da3dd'],
        series: [
            {
                name:'金额',
                type:'line',
                data:[40, 90, 120,140],
                smooth: true,
                symbol:'none',
                areaStyle:{
                    normal:{
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(29,163,221,.5)'
                        }, {
                            offset: .5,
                            color: 'rgba(29,163,221,0)'
                        }])

                    }
                }
            }
        ]
    };

    loadEChart("line2", option,true);
}

function bar1() {
    var option = {
        title: {
            text: '出借人活跃度',
        },
        tooltip: {
            trigger: 'axis',
            formatter: function(param){
                var s =  param[0].name+'22';
                var s1 = param[0].seriesName+': '+param[0].value + '亿';
                var s2 = param[1].seriesName+': '+param[1].value + '亿';
                return s + '<br>'+s1 + '<br>' + s2;
            }
        },
        calculable: true,
        xAxis: {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月'],
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            name: '出借人数',
            type: 'bar',
            data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2],
            itemStyle: {
                normal: {
                    barBorderRadius: [5, 5, 0, 0],
                    color:new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: 'rgba(26,130,194,.9)'},
                            {offset: 1, color: 'rgba(26,130,194,.2)'}
                        ]
                    )
                }
            }
        },{
            name: '出借人次',
            type: 'bar',
            data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2],
            itemStyle: {
                normal: {
                    barBorderRadius: [5, 5, 0, 0],
                    color:new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: 'rgba(188,195,49,.9)'},
                            {offset: 1, color: 'rgba(188,195,49,.2)'}
                        ]
                    )
                }
            }
        }]
    };
    loadEChart("bar1", option,true);
}

function bar2() {
    var option = {
        title:{
          text:'资金流出入'
        },
        xAxis: {
            data: ['9.27','9.28','9.29','9.30','10.1','10.2','10.3','10.4'],
        },
        series: [
            {
                name: '资金流出',
                type: 'bar',
                stack: 'one',
                data: [-29,-10,-30,-18,-9,-11,-20,-10 ],
                barMaxWidth:'15px',
                itemStyle: {
                    normal: {
                        barBorderRadius: [ 0, 0,5,5],
                        color:new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                {offset: 1, color: 'rgba(31,148,177,1)'},
                                {offset: 0, color: 'rgba(31,148,177,.5)'}
                            ]
                        )
                    }
                }
            },
            {
                name: '资金流入',
                type: 'bar',
                stack: 'one',
                data: [11,22,33,35,24,33,18,24],
                itemStyle: {
                    normal: {
                        barBorderRadius: [5,5,0,0],
                        color:new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                {offset: 0, color: 'rgba(221,192,42,1)'},
                                {offset: 1, color: 'rgba(221,192,42,.5)'}
                            ]
                        )
                    }
                }
            }
        ]
    };
    loadEChart("bar2", option,true);
}

function radar() {
    var option ={
        title: {
            text: '成交量占比',
            left: 'left',
            textStyle: {
                color: '#fff',
                fontSize: 16
            },
            top: '3px'
        },
        grid: {
            left: '8px',
            right: '8px',
            bottom: '8px',
            top: '35px',
            containLabel: true
        },
        legend: {
            show: false
        },
        tooltip: {
            trigger: 'item',
            padding:10,
            formatter:function(params){
                var list = '数据展示<br>';
                var arr = option.radar.indicator;
                params.data.value.forEach(function(v,i){
                    list += '<span>'+arr[i].name+'：</span><span>'+v+'</span><br>'
                });
                return list
            }
        },
        radar: {
            name: {
                textStyle:{
                    fontsize:10,
                    color:'#d5efff'
                }
            },
            indicator: [
                {name: '1', max: 6500},
                {name: '2', max: 18000},
                {name: '3', max: 30000},
                {name: '4', max: 38000},
                {name: '5', max: 32000},
                {name: '6', max: 28000}
            ],
            splitLine:{
                lineStyle:{
                    color:'#092d5e'
                }
            },
            axisLine:{
                lineStyle:{
                    color:'#092d5e'
                }
            },
            splitArea:{
                areaStyle:{
                    color:['rgba(10,45,90,1)']
                }
            },
            startAngle: 120
        },
        series: [{
            name: '数据展示1',
            type: 'radar',
            data: [
                {
                    value: [5200, 15000, 25000, 15000, 27000, 10000],
                    name: '数据展示'
                }
            ],
            symbol:'none',
            itemStyle: {
                normal: {
                    lineStyle: {
                        color:"rgba(26,130,194,1)" // 图表中各个图区域的边框线颜色
                    }
                }
            },
            areaStyle:{
                normal:{
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0, color: 'rgba(26,130,194,.9)' // 0% 处的颜色
                        },
                            {
                                offset: 1, color: 'rgba(26,130,194,.2)' // 100% 处的颜色
                            }],
                        globalCoord: false // 缺省为 false
                    },
                    opacity:0.9
                }
            }
        },{
            name: '数据展示2',
            type: 'radar',
            data: [
                {
                    value: [3000, 8000, 20000, 32000, 20000, 24000],
                    name: '数据展示'
                }
            ],
            symbol:'none',
            itemStyle: {
                normal: {
                    lineStyle: {
                        color:"rgba(188,195,49,1)" // 图表中各个图区域的边框线颜色
                    }
                }
            },
            areaStyle:{
                normal:{
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0, color: 'rgba(188,195,49,.9)' // 0% 处的颜色
                        },
                            {
                                offset: 1, color: 'rgba(188,195,49,.2)' // 100% 处的颜色
                            }],
                        globalCoord: false // 缺省为 false
                    },
                    opacity:0.9
                }
            }
        }]
    };

    loadEChart("radar",option)
}

function line3() {

    var data = [
        {
            "value": -0.7618426259,
            "date": "2012-08-28",
            "l": -1.6017329022,
            "u": 0.1949717757
        },
        {
            "value": -0.5828247293,
            "date": "2012-08-29",
            "l": -1.3166963635,
            "u": 0.1324086347
        },
        {
            "value": -0.3790770636,
            "date": "2012-08-30",
            "l": -0.8712221305,
            "u": 0.0956413566
        },
        {
            "value": -0.2792926002,
            "date": "2012-08-31",
            "l": -0.6541832008,
            "u": 0.0717120241
        },
        {
            "value": -0.2461165469,
            "date": "2012-09-01",
            "l": -0.5222677907,
            "u": 0.0594188803
        },
        {
            "value": -0.2017354137,
            "date": "2012-09-02",
            "l": -0.4434280535,
            "u": 0.0419213465
        },
        {
            "value": -0.1457476871,
            "date": "2012-09-03",
            "l": -0.3543957712,
            "u": 0.0623761171
        },
        {
            "value": -0.002610973,
            "date": "2012-09-04",
            "l": -0.3339911495,
            "u": 0.031286929
        },
        {
            "value": -0.0080692734,
            "date": "2012-09-05",
            "l": -0.2951839941,
            "u": 0.0301762553
        },
        {
            "value": -0.0296490933,
            "date": "2012-09-06",
            "l": -0.2964395801,
            "u": -0.0029821004
        },
        {
            "value": 0.001317397,
            "date": "2012-09-07",
            "l": -0.2295443759,
            "u": 0.037903312
        },
        {
            "value": -0.0117649838,
            "date": "2012-09-08",
            "l": -0.2226376418,
            "u": 0.0239720183
        },
        {
            "value": 0.0059394263,
            "date": "2012-09-09",
            "l": -0.2020479849,
            "u": 0.0259489347
        },
        {
            "value": -0.0115565898,
            "date": "2012-09-10",
            "l": -0.2042048037,
            "u": 0.0077863806
        },
        {
            "value": 0.0041183019,
            "date": "2012-09-11",
            "l": -0.1837263172,
            "u": 0.0137898406
        },
        {
            "value": 0.0353559544,
            "date": "2012-09-12",
            "l": -0.136610008,
            "u": 0.051403828
        },
        {
            "value": 0.0070046011,
            "date": "2012-09-13",
            "l": -0.1569988647,
            "u": 0.0202266411
        },
        {
            "value": -0.0004251807,
            "date": "2012-09-14",
            "l": -0.1410340292,
            "u": 0.0273410185
        },
        {
            "value": -0.0035461023,
            "date": "2012-09-15",
            "l": -0.1438653689,
            "u": 0.0165445684
        },
        {
            "value": 0.007797889,
            "date": "2012-09-16",
            "l": -0.1291975355,
            "u": 0.0232461153
        },
        {
            "value": 0.0025402723,
            "date": "2012-09-17",
            "l": -0.133972479,
            "u": 0.0116753921
        },
        {
            "value": -0.005317381,
            "date": "2012-09-18",
            "l": -0.1269266586,
            "u": 0.0129723291
        },
        {
            "value": -0.0075841521,
            "date": "2012-09-19",
            "l": -0.1283478383,
            "u": 0.0056371616
        },
        {
            "value": -0.0391388721,
            "date": "2012-09-20",
            "l": -0.1571172198,
            "u": -0.0311678828
        },
        {
            "value": 0.0075430252,
            "date": "2012-09-21",
            "l": -0.1097354417,
            "u": 0.0141132062
        },
        {
            "value": 0.1850284663,
            "date": "2012-09-22",
            "l": 0.0333682152,
            "u": 0.2140709422
        },
        {
            "value": 0.076629596,
            "date": "2012-09-23",
            "l": -0.0068472967,
            "u": 0.1101280569
        },
        {
            "value": -0.0314292271,
            "date": "2012-09-24",
            "l": -0.1074281762,
            "u": 0.0032669363
        },
        {
            "value": -0.0232608674,
            "date": "2012-09-25",
            "l": -0.0905197842,
            "u": 0.0164250295
        },
        {
            "value": -0.01968615,
            "date": "2012-09-26",
            "l": -0.084319856,
            "u": 0.0193319465
        },
        {
            "value": -0.0310196816,
            "date": "2012-09-27",
            "l": -0.0914356781,
            "u": 0.0094436256
        },
        {
            "value": -0.0758746967,
            "date": "2012-09-28",
            "l": -0.1169814745,
            "u": -0.019659551
        }
    ];
    var option = _getLineOption(data);
    loadEChart("line3", option, true,function (_myChart) {
        /*var allData = [
            {
                "value": -1.1618426259,
                "date": "2012-08-28",
                "l": -2.6017329022,
                "u": 0.2949717757
            },
            {
                "value": -0.5828247293,
                "date": "2012-08-29",
                "l": -1.3166963635,
                "u": 0.1324086347
            },
            {
                "value": -0.3790770636,
                "date": "2012-08-30",
                "l": -0.8712221305,
                "u": 0.0956413566
            },
            {
                "value": -0.2792926002,
                "date": "2012-08-31",
                "l": -0.6541832008,
                "u": 0.0717120241
            },
            {
                "value": -0.2461165469,
                "date": "2012-09-01",
                "l": -0.5222677907,
                "u": 0.0594188803
            },
            {
                "value": -0.2017354137,
                "date": "2012-09-02",
                "l": -0.4434280535,
                "u": 0.0419213465
            },
            {
                "value": -0.1457476871,
                "date": "2012-09-03",
                "l": -0.3543957712,
                "u": 0.0623761171
            },
            {
                "value": -0.002610973,
                "date": "2012-09-04",
                "l": -0.3339911495,
                "u": 0.031286929
            },
            {
                "value": -0.0080692734,
                "date": "2012-09-05",
                "l": -0.2951839941,
                "u": 0.0301762553
            },
            {
                "value": -0.0296490933,
                "date": "2012-09-06",
                "l": -0.2964395801,
                "u": -0.0029821004
            },
            {
                "value": 0.001317397,
                "date": "2012-09-07",
                "l": -0.2295443759,
                "u": 0.037903312
            },
            {
                "value": -0.0117649838,
                "date": "2012-09-08",
                "l": -0.2226376418,
                "u": 0.0239720183
            },
            {
                "value": 0.0059394263,
                "date": "2012-09-09",
                "l": -0.2020479849,
                "u": 0.0259489347
            },
            {
                "value": -0.0115565898,
                "date": "2012-09-10",
                "l": -0.2042048037,
                "u": 0.0077863806
            },
            {
                "value": 0.0041183019,
                "date": "2012-09-11",
                "l": -0.1837263172,
                "u": 0.0137898406
            },
            {
                "value": 0.0353559544,
                "date": "2012-09-12",
                "l": -0.136610008,
                "u": 0.051403828
            },
            {
                "value": 0.0070046011,
                "date": "2012-09-13",
                "l": -0.1569988647,
                "u": 0.0202266411
            },
            {
                "value": -0.0004251807,
                "date": "2012-09-14",
                "l": -0.1410340292,
                "u": 0.0273410185
            },
            {
                "value": -0.0035461023,
                "date": "2012-09-15",
                "l": -0.1438653689,
                "u": 0.0165445684
            },
            {
                "value": 0.007797889,
                "date": "2012-09-16",
                "l": -0.1291975355,
                "u": 0.0232461153
            },
            {
                "value": 0.0025402723,
                "date": "2012-09-17",
                "l": -0.133972479,
                "u": 0.0116753921
            },
            {
                "value": -0.005317381,
                "date": "2012-09-18",
                "l": -0.1269266586,
                "u": 0.0129723291
            },
            {
                "value": -0.0075841521,
                "date": "2012-09-19",
                "l": -0.1283478383,
                "u": 0.0056371616
            },
            {
                "value": -0.0391388721,
                "date": "2012-09-20",
                "l": -0.1571172198,
                "u": -0.0311678828
            },
            {
                "value": 0.0075430252,
                "date": "2012-09-21",
                "l": -0.1097354417,
                "u": 0.0141132062
            },
            {
                "value": 0.1850284663,
                "date": "2012-09-22",
                "l": 0.0333682152,
                "u": 0.2140709422
            },
            {
                "value": 0.076629596,
                "date": "2012-09-23",
                "l": -0.0068472967,
                "u": 0.1101280569
            },
            {
                "value": -0.0314292271,
                "date": "2012-09-24",
                "l": -0.1074281762,
                "u": 0.0032669363
            },
            {
                "value": -0.0232608674,
                "date": "2012-09-25",
                "l": -0.0905197842,
                "u": 0.0164250295
            },
            {
                "value": -0.01968615,
                "date": "2012-09-26",
                "l": -0.084319856,
                "u": 0.0193319465
            },
            {
                "value": -0.0310196816,
                "date": "2012-09-27",
                "l": -0.0914356781,
                "u": 0.0094436256
            },
            {
                "value": -0.0758746967,
                "date": "2012-09-28",
                "l": -0.1169814745,
                "u": -0.019659551
            },
            {
                "value": 0.0233974572,
                "date": "2012-09-29",
                "l": -0.0356839258,
                "u": 0.0610712506
            },
            {
                "value": 0.011073579,
                "date": "2012-09-30",
                "l": -0.0558712863,
                "u": 0.0346160081
            },
            {
                "value": -0.002094822,
                "date": "2012-10-01",
                "l": -0.0707143388,
                "u": 0.0152899266
            },
            {
                "value": -0.1083707096,
                "date": "2012-10-02",
                "l": -0.1718101335,
                "u": -0.0886271057
            },
            {
                "value": -0.1098258972,
                "date": "2012-10-03",
                "l": -0.1881274065,
                "u": -0.1072157972
            },
            {
                "value": -0.0872970297,
                "date": "2012-10-04",
                "l": -0.1731903321,
                "u": -0.064381434
            },
            {
                "value": -0.0761992047,
                "date": "2012-10-05",
                "l": -0.1770373817,
                "u": 0.100085727
            },
            {
                "value": -0.0416654249,
                "date": "2012-10-06",
                "l": -0.1502479611,
                "u": 0.0751148102
            },
            {
                "value": -0.0410128962,
                "date": "2012-10-07",
                "l": -0.1618694445,
                "u": 0.0881453482
            },
            {
                "value": -0.0214289042,
                "date": "2012-10-08",
                "l": -0.1590852977,
                "u": 0.0871880288
            },
            {
                "value": 0.2430880604,
                "date": "2012-10-09",
                "l": 0.063624221,
                "u": 0.2455101587
            },
            {
                "value": 0.3472823479,
                "date": "2012-10-10",
                "l": 0.1553854927,
                "u": 0.3583991097
            },
            {
                "value": 0.3360734074,
                "date": "2012-10-11",
                "l": 0.2055952772,
                "u": 0.3812162823
            },
            {
                "value": -0.0463648355,
                "date": "2012-10-12",
                "l": -0.0626466998,
                "u": 0.0037342957
            },
            {
                "value": -0.0867009379,
                "date": "2012-10-13",
                "l": -0.0867594055,
                "u": -0.0223791074
            },
            {
                "value": -0.1288672826,
                "date": "2012-10-14",
                "l": -0.1161709129,
                "u": -0.0534789124
            },
            {
                "value": -0.1474426821,
                "date": "2012-10-15",
                "l": -0.1559759048,
                "u": -0.0646995092
            },
            {
                "value": -0.1502405066,
                "date": "2012-10-16",
                "l": -0.1604364638,
                "u": -0.0602562376
            },
            {
                "value": -0.1203765529,
                "date": "2012-10-17",
                "l": -0.1569023195,
                "u": -0.0578129637
            },
            {
                "value": -0.0649122919,
                "date": "2012-10-18",
                "l": -0.0782987564,
                "u": -0.0501999174
            },
            {
                "value": -0.015525562,
                "date": "2012-10-19",
                "l": -0.1103873808,
                "u": -0.0132131311
            },
            {
                "value": -0.006051357,
                "date": "2012-10-20",
                "l": -0.1089644497,
                "u": 0.0230384197
            },
            {
                "value": 0.0003154213,
                "date": "2012-10-21",
                "l": -0.1073849227,
                "u": 0.0017290437
            },
            {
                "value": -0.0063018298,
                "date": "2012-10-22",
                "l": -0.1120298155,
                "u": 0.0173284555
            },
            {
                "value": -0.004294834,
                "date": "2012-10-23",
                "l": -0.1076841119,
                "u": 0.0547933965
            },
            {
                "value": -0.0053400832,
                "date": "2012-10-24",
                "l": -0.1096991408,
                "u": 0.0560555803
            },
            {
                "value": 0.0070057212,
                "date": "2012-10-25",
                "l": -0.0940613813,
                "u": 0.0425517607
            },
            {
                "value": 0.0082121656,
                "date": "2012-10-26",
                "l": -0.0906810455,
                "u": 0.0396884383
            },
            {
                "value": 0.0141422884,
                "date": "2012-10-27",
                "l": -0.0841305678,
                "u": 0.0340050012
            },
            {
                "value": 0.0041613553,
                "date": "2012-10-28",
                "l": -0.0886723749,
                "u": 0.039426727
            },
            {
                "value": -0.0013614287,
                "date": "2012-10-29",
                "l": -0.0923481608,
                "u": 0.0438725574
            },
            {
                "value": -0.0052144933,
                "date": "2012-10-30",
                "l": -0.0937763043,
                "u": 0.0459998555
            },
            {
                "value": 0.0078904741,
                "date": "2012-10-31",
                "l": -0.0807028001,
                "u": 0.0334824169
            },
            {
                "value": 0.0099598702,
                "date": "2012-11-01",
                "l": -0.0740001323,
                "u": 0.0280264274
            },
            {
                "value": 0.0001146029,
                "date": "2012-11-02",
                "l": -0.0820430294,
                "u": 0.0326771125
            },
            {
                "value": 0.0047572651,
                "date": "2012-11-03",
                "l": -0.0754113825,
                "u": 0.0294912577
            },
            {
                "value": 0.006204557,
                "date": "2012-11-04",
                "l": -0.0750627059,
                "u": 0.029693607
            },
            {
                "value": 0.0115231406,
                "date": "2012-11-05",
                "l": -0.0663484142,
                "u": 0.0214084056
            },
            {
                "value": -0.0032634994,
                "date": "2012-11-06",
                "l": -0.0793170451,
                "u": 0.0355159827
            },
            {
                "value": -0.0108985452,
                "date": "2012-11-07",
                "l": -0.0846123893,
                "u": 0.0409797057
            },
            {
                "value": -0.0092766813,
                "date": "2012-11-08",
                "l": -0.0802668328,
                "u": 0.0373886301
            },
            {
                "value": 0.0095972086,
                "date": "2012-11-09",
                "l": -0.0623739694,
                "u": 0.0194918693
            },
            {
                "value": -0.0111809358,
                "date": "2012-11-10",
                "l": -0.0819555908,
                "u": 0.038335749
            },
            {
                "value": -0.0023572296,
                "date": "2012-11-11",
                "l": -0.0745443377,
                "u": 0.0306093592
            },
            {
                "value": 0.0084213775,
                "date": "2012-11-12",
                "l": -0.0657707155,
                "u": 0.0227270619
            },
            {
                "value": 0.0107446453,
                "date": "2012-11-13",
                "l": -0.0617995017,
                "u": 0.0196547867
            },
            {
                "value": 0.009457792,
                "date": "2012-11-14",
                "l": -0.0597697849,
                "u": 0.0191832343
            },
            {
                "value": 0.0031194779,
                "date": "2012-11-15",
                "l": -0.0589126783,
                "u": 0.0186409442
            },
            {
                "value": -0.0115128213,
                "date": "2012-11-16",
                "l": -0.0767105447,
                "u": 0.0370292452
            },
            {
                "value": 0.0058347339,
                "date": "2012-11-17",
                "l": -0.0592236472,
                "u": 0.0198181452
            },
            {
                "value": -0.0235630436,
                "date": "2012-11-18",
                "l": -0.083529944,
                "u": 0.046280909
            },
            {
                "value": -0.0479795964,
                "date": "2012-11-19",
                "l": -0.1086422529,
                "u": 0.0113044645
            },
            {
                "value": -0.0218184359,
                "date": "2012-11-21",
                "l": -0.0881634878,
                "u": 0.0448568265
            },
            {
                "value": -0.0071361172,
                "date": "2012-11-28",
                "l": -0.0807350229,
                "u": 0.0453599734
            },
            {
                "value": -0.0151966912,
                "date": "2012-12-05",
                "l": -0.089995793,
                "u": 0.0558329569
            },
            {
                "value": -0.0097784855,
                "date": "2012-12-12",
                "l": -0.089466481,
                "u": 0.0550191387
            },
            {
                "value": -0.0095681495,
                "date": "2012-12-19",
                "l": -0.090513354,
                "u": 0.057073314
            },
            {
                "value": -0.0034165915,
                "date": "2012-12-27",
                "l": -0.0907151292,
                "u": 0.0561479112
            },
            {
                "value": 0.3297981389,
                "date": "2012-12-31",
                "l": 0.1537781522,
                "u": 0.3499473316
            }
        ];
        setInterval(function () {
            if (data.length == allData.length)
                data.splice(40, 40);
            data.push(allData[data.length]);
            _myChart.setOption(_getLineOption(data));
        }, 1200)*/
    });
}

function pieLine() {

    $('.echart-lcon .item').each((i,item)=>{

        (function(obj,i) {
            console.log('obj:',obj,'i:',i);
            setTimeout(()=>{
                $(obj).addClass('loaded');
            },500+i*300)
        })($(item),i);
    });

    setTimeout(()=>{
        loadEChart("lpie1",getPieOption());
        loadEChart("lline1",getLineOption());
    },1200);
    setTimeout(()=>{
        loadEChart("lpie2",getPieOption());
        loadEChart("lline2",getLineOption());
    },1400);
    setTimeout(()=>{
        loadEChart("lpie3",getPieOption());
        loadEChart("lline3",getLineOption());
    },1800);
    setTimeout(()=>{
        loadEChart("lpie4",getPieOption());
        loadEChart("lline4",getLineOption());
    },2000);
    setTimeout(()=>{
        loadEChart("lpie5",getPieOption());
        loadEChart("lline5",getLineOption());
    },2200);
}
function getPieOption() {
    var optionPie = {
        legend: {show:false},
        tooltip: {
            trigger: 'axis',
            showContent: false
        },
        series: [

            {
                type: 'pie',
                radius: ['45%', '65%'],
                center: ['50%', '50%'],
                label: {
                    normal: {
                        show: false,
                    }
                },
                itemStyle: {
                    normal: {
                        borderWidth: 5,
                        borderType: 'solid',
                        shadowBlur: 20
                    }
                },
                data: [{
                    value: parseInt(Math.random()*100),
                    name: '负面舆论',
                    itemStyle: {
                        normal: {
                            color: 'rgba(15,52,91,.8)',
                            shadowColor: 'rrgba(15,52,91,.8)'
                        }
                    }
                },

                    {
                        value: parseInt(Math.random()*100),
                        name: '正面舆论',
                        itemStyle: {
                            normal: {
                                shadowColor: 'rgba(29,90,221,.5)',
                                color: {
                                    type: 'linear',
                                    x: 0.5,
                                    y: 0,
                                    colorStops: [{
                                        offset: 0, color: 'rgba(29,90,221,1)' // 0% 处的颜色
                                    }, {
                                        offset: 1, color: 'rgba(29,165,221,.9)' // 100% 处的颜色
                                    }],
                                    globalCoord: false // 缺省为 false
                                }

                            }
                        }
                    }
                ]
            }
        ]
    };

    return optionPie;
}
function getLineOption() {
    var lineDate =[];
    for(var i=0;i<50;i++){
        lineDate.push(Math.random());
    }
    var optionLine = {
        legend: {show:false},
        tooltip: {
            trigger: 'axis',
            showContent: false
        },
        xAxis: {
            type: 'category',
            splitLine: {
                show: false,
            },
            axisLabel: {
                show:false
            },
            axisLine:{
                show:false
            },
            axisTick: {
                show: false
            }},
        yAxis: {
            data:[-2,-1,0,1,2,3],
            splitLine: {
                show: false,
            },
            axisLabel: {
                show:false
            },
            axisLine:{
                show:false
            },
            axisTick: {
                show: false
            }
        },
        series: [
            {
                type: 'line',
                data:lineDate,
                symbol:'none',
                smooth: true,
                color:'rgba(26,164,202,1)',
                areaStyle:{
                    normal:{
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(26,164,202,.5)'
                        }, {
                            offset: .5,
                            color: 'rgba(26,164,202,0)'
                        }])

                    }
                }
            }
        ]
    };
    return optionLine;
}

function _getLineOption(data) {

    var base = -data.reduce(function (min, val) {
        return Math.floor(Math.min(min, val.l));
    }, Infinity);
    return option = {
        title: {
            text: '逾期率曲线'
        },
        grid: {
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                animation: false,
                label: {
                    backgroundColor: '#ccc',
                    borderColor: '#aaa',
                    borderWidth: 1,
                    shadowBlur: 0,
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                    textStyle: {
                        color: '#222'
                    }
                }
            },
            formatter: function (params) {
                return params[2].name + '<br />' + params[2].value;
            }
        },
        xAxis: {
            type: 'category',
            data: data.map(function (item) {
                return item.date;
            }),
            axisLabel: {
                show:true,
                textStyle: {
                    color: '#d5efff',
                    fontSize: 10
                },
                formatter: function (value, idx) {
                    var date = new Date(value);
                    return idx === 0 ? value : [date.getMonth() + 1, date.getDate()].join('-');
                }
            },
        },
        yAxis: {
            axisLabel: {
                show:true,
                textStyle: {
                    color: '#d5efff',
                    fontSize: 10
                },
                formatter: function (val) {
                    return (val - base) * 100 + '%';
                }
            },
            axisPointer: {
                label: {
                    formatter: function (params) {
                        return ((params.value - base) * 100).toFixed(1) + '%';
                    }
                }
            }
        },
        series: [{
            name: 'L',
            type: 'line',
            data: data.map(function (item) {
                return item.l + base;
            }),
            lineStyle: {
                normal: {
                    opacity: 0
                }
            },
            stack: 'confidence-band',
            symbol: 'none'
        }, {
            name: 'U',
            type: 'line',
            data: data.map(function (item) {
                return item.u - item.l;
            }),
            lineStyle: {
                normal: {
                    opacity: 0
                }
            },
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(29,195,221,.2)'
                    }, {
                        offset: 1,
                        color: 'rgba(29,195,221,.7)'
                    }])
                }
            },
            stack: 'confidence-band',
            symbol: 'none'
        }, {
            type: 'line',
            data: data.map(function (item) {
                return item.value + base;
            }),
            hoverAnimation: false,
            symbolSize: 6,
            itemStyle: {
                normal: {
                    color: 'rgb(28,168,215)'
                }
            },
            showSymbol: false
        }]
    };
}

function loadEChart(con, option, merger,cb) {

    if(merger)
        option = $.extend(true, {}, baseOption, option);
    var myChart = echarts.init(document.getElementById(con));
    myChart.setOption(option);
    if (cb) cb(myChart);
    chartInstance.push(myChart);
}

