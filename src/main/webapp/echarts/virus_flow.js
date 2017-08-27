function paddingTime(value) {
  return value < 10 ? '0'+value : value;
}

var now = +new Date();
var totalNumData = [];
var initialData = function() {
  for (var i = 0; i < 50; i++) {
    now = new Date(+now + 6000);
    totalNumData.push([now, 0]);
  }
  return totalNumData;
};

var totalNumFlowOption = {
  title : {
    left : 'center',
    text : '全国感染病毒主机数量',
    textStyle : {
      color : '#e0e0e0'
    }
  },
  tooltip : {
    trigger : 'axis',
    formatter : function(params) {
      params = params[0];
      return params.data[1];
    },
    axisPointer : {
      animation : false
    }
  },
  xAxis : {
    type : 'value',
    axisLabel : {
      formatter : (function(value) {
        let t = new Date(value);
        return paddingTime(t.getHours()) + ":" + paddingTime(t.getMinutes()) + ":" + paddingTime(t.getSeconds());
      })
    },
    splitLine : {
      show : false
    },
    min: 'dataMin',
    max: 'dataMax',
  },
  yAxis : {
    type : 'value',
    boundaryGap : [ 0, '100%' ],
    splitLine : {
      show : true
    },
    min: 0,
  },
  visualMap: {
    type: 'piecewise',
    show: false,
    pieces: [{
        lte: 10000,
        color: 'green'
    }, {
        gt: 10000,
        lte: 50000,
        color: 'blue'
    }, {
        gt: 50000,
        lte: 100000,
        color: 'yellow'
    }, {
        gt: 100000,
        color: 'red'
    }]
  },
  series : [ {
    name : '主机数量',
    type : 'line',
    showSymbol : true,
    hoverAnimation : false,
    lineStyle: {
        normal: {
            color: 'white',
            width: 1,
            opacity: 0.4,
            curveness: 0.2
        }
    },
    areaStyle : {
      normal : {
        color : 'white'
      }
    },
    data : initialData()
  } ]
};
