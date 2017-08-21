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
  series : [ {
    name : '主机数量',
    type : 'line',
    showSymbol : true,
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
    data : initialData()
  } ]
};
