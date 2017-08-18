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

var now = +new Date();
var interval = 200;
var value = 5 + Math.random();
var targetFlowData = [];
for (var i = 0; i < 1000; i++) {
  targetFlowData.push(randomData());
}



function FlowDataGenerator() {
  this.interval = 200;
  this.tick = +new Date();
  this.value = 5 + Math.random();
  this.data = [];
  
  this.zeroData = function() {
    this.tick = new Date(+this.tick + this.interval);
    return { value : [ this.tick, 0 ] };
  };
  
  this.randomData = function() {
    this.tick = new Date(+this.tick + this.interval);
    this.value = Math.abs(this.value + Math.random() * 2.01 - 1);
    return { value : [ this.tick, Math.round(this.value) ] };
  };
  
  this.initialData = function() {
    for (var i = 0; i < 200; i++) {
      this.data.push(this.zeroData());
    }
    return this.data;
  };
  
  this.requestData = function() {
    for (var i = 0; i < 5; i++) {
      this.data.shift();
      this.data.push(this.randomData());
    }
    return this.data;
  };
}

var attactFlowDatas = {};
attackAreaBases.forEach(function(area) {
  attactFlowDatas[area] = new FlowDataGenerator();
});




var beijingFlowOption = {
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
  attackOption.series[0].data = attactFlowDatas[attackAreaBases[i]].initialData();
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

  attackFlowCharts.forEach(function(flowChart) {
    flowChart.setOption({
      series : [ {
        data : attactFlowDatas[flowChart.getOption().title[0].text].requestData()
      } ]
    });
  });

}, 1000);