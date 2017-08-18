function paddingTime(value) {
  return value < 10 ? '0'+value : value;
}

function randomData() {
  now = new Date(+now + interval);
  value = Math.abs(value + Math.random() * 2.01 - 1);
  return {
    value : [ now, Math.round(value) ] 
  }
}

function zeroData(i) {
  startTimes[i] = new Date(+startTimes[i] + interval);
  return {
    value : [ startTimes[i], 0 ] 
  }
}

function attackRandomData(i) {
  startTimes[i] = new Date(+startTimes[i] + interval);
  attackValues[i] = Math.abs(attackValues[i] + Math.random() * 2.01 - 1);
  return {
    value : [ startTimes[i], attackValues[i] ] 
  }
}


var now = +new Date();
var interval = 200;
var value = 5 + Math.random();
var targetFlowData = [];
for (var i = 0; i < 1000; i++) {
  targetFlowData.push(randomData());
}


var startTimes = [];
var attackValues = [];
var attactFlowDatas = [];
for(var i = 0; i < 4; i++) {
  startTimes[i] = +new Date();
  attackValues[i] = 5 + Math.random();
  
  let flowData = [];
  for (var j = 0; j < 1000; j++) {
    flowData.push(zeroData(i));
  }
  attactFlowDatas.push(flowData);
}

beijingFlowOption = {
  title : {
    left : 'center',
    text : '北京流量',
    textStyle : {
      color : '#e0e0e0'
    }
  },
  grid : {
    left : 40,
    right : 20
  },
  tooltip : {
    trigger : 'axis',
    formatter : function(params) {
      params = params[0];
      var date = new Date(params.name);
      return params.value[1];
    },
    axisPointer : {
      animation : false
    }
  },
  xAxis : {
    type : 'time',
    axisLabel : {
      formatter : (function(value) {
        let t = new Date(value);
        return paddingTime(t.getMinutes()) + ":" + paddingTime(t.getSeconds());
      })
    },
    splitLine : {
      show : false
    },
    min: 'dataMin'
  },
  yAxis : {
    type : 'value',
    boundaryGap : [ 0, '100%' ],
    splitLine : {
      show : true
    }
  },
  series : [ {
    name : '模拟数据',
    type : 'line',
    showSymbol : false,
    hoverAnimation : false,
    lineStyle: {
        normal: {
            color: '#DC143C',
            width: 1,
            opacity: 0.4,
            curveness: 0.2
        }
    },
    areaStyle : {
      normal : {
        color : '#00FA9A'
      }
    },
    data : targetFlowData
  } ]
};

var attackAreaFlowOptions = [];
for(var i = 0; i < 4; i++) {
  let attackOption = $.extend(true, {}, beijingFlowOption);
  attackOption.title.text = attackAreaBases[i];
  attackOption.series[0].data = attactFlowDatas[i];
  attackAreaFlowOptions.push(attackOption);
}


setInterval(function() {
  for (var i = 0; i < 5; i++) {
    targetFlowData.shift();
    targetFlowData.push(randomData());
  }
  
  beijingFlowChart.setOption({
    series : [ {
      data : targetFlowData
    } ]
  });

  
  
  for(var i = 0; i < 4; i++) {
    var flowData = attactFlowDatas[i];
    for (var j = 0; j < 5; j++) {
      flowData.shift();
      flowData.push(attackRandomData(i));
    }
    attactFlowDatas[i] = flowData;
  }
  
  attackFlowCharts.forEach(function(flowChart, index, charts) {
    flowChart.setOption({
      series : [ {
        data : attactFlowDatas[index]
      } ]
    });
  });

}, 1000);