function paddingTime(value) {
  return value < 10 ? '0'+value : value;
}

function FlowDataGenerator() {
  this.interval = 200;
  this.tick = +new Date();
  this.value = 20 + Math.random() * 5;
  this.data = [];
  this.lastValues = [];
  
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
    for (var i = 0; i < 1000; i++) {
      this.data.push(this.zeroData());
    }
    return this.data;
  };
  
  this.requestData = function(isActive) {
    for (var i = 0; i < 5; i++) {
      if(isActive) {
        let rd = this.randomData();
        this.lastValues[i] = rd['value'][1];
        this.data.shift();
        this.data.push(rd);
      } else {
        this.lastValues[i] = 0;
        this.data.push(this.zeroData());
      }
    }
    return this.data;
  };
}

function TargetFlowDataGenerator() {}
TargetFlowDataGenerator.prototype = new FlowDataGenerator();
TargetFlowDataGenerator.prototype.value = 5 + Math.random();
TargetFlowDataGenerator.prototype.initialData = function() {
  for (var i = 0; i < 1000; i++) {
    this.data.push(this.randomData());
  }
  return this.data;
};
TargetFlowDataGenerator.prototype.setAttactFlowDatas = function(flowDatas) {
  this.attactFlowDatas = flowDatas;
};
TargetFlowDataGenerator.prototype.attackLastDataSum = function() {
  let lastDataSum = [];
  for(var key in this.attactFlowDatas) {
    let i = 0;
    this.attactFlowDatas[key].lastValues.forEach(function(value) {
      
      if(lastDataSum[i] == null) lastDataSum[i] = 0;
      lastDataSum[i++] += value;
    });
  }
  return lastDataSum;
};
TargetFlowDataGenerator.prototype.requestData = function() {
  for (var i = 0; i < 5; i++) {
    this.data.shift();
    let rd = this.randomData();
    rd['value'][1] += this.attackLastDataSum()[i];
    this.data.push(rd);
  }
  return this.data;
};

var attactFlowDatas = {};
attackAreaBases.forEach(function(area) {
  attactFlowDatas[area] = new FlowDataGenerator();
});

var targetFlowDataGenerator = new TargetFlowDataGenerator();
targetFlowDataGenerator.setAttactFlowDatas(attactFlowDatas);


var areaStyleColor = ['lightgreen', 'lightskyblue', 'yellow', 'darkorange','#ee4444'];

var beijingFlowOption = {
  title : {
    left : 35,
    top : 28,
    text : '北京',
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
    },
    min: 0,
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
        color : areaStyleColor[0]
      }
    },
    data : targetFlowDataGenerator.initialData()
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
  attackFlowCharts.forEach(function(flowChart) {
    var attackArea = flowChart.getOption().title[0].text;
    var isActive = (pageStatus.attackAreas.indexOf(attackArea)>=0);
    flowChart.setOption({
      series : [ {
        data : attactFlowDatas[attackArea].requestData(isActive)
      } ]
    });
  });
  
  console.log(areaStyleColor[pageStatus.attackAreas.length]);
  beijingFlowChart.setOption({
    series : [ {
      areaStyle : {
        normal : {
          color : areaStyleColor[pageStatus.attackAreas.length]
        }
      },
      data : targetFlowDataGenerator.requestData()
    } ]
  });

}, 1000);