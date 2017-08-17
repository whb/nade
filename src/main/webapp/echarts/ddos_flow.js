function paddingTime(value) {
  return value < 10 ? '0'+value : value;
}
function randomData() {
  now = new Date(+now + interval);
  value = value + Math.random() * 21 - 10;
  return {
    value : [ now, Math.round(value) ]
  }
}

var timeValue = [];
var now = +new Date();
var interval = 200;
var value = Math.random() * 1000;
for (var i = 0; i < 1000; i++) {
  timeValue.push(randomData());
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
    areaStyle : {
      normal : {
        color : '#00FA9A'
      }
    },
    data : timeValue
  } ]
};

setInterval(function() {

  for (var i = 0; i < 5; i++) {
    timeValue.shift();
    timeValue.push(randomData());
  }

  beijingFlowChart.setOption({
    xAxis : {

    },
    series : [ {
      data : timeValue
    } ]
  });
}, 1000);