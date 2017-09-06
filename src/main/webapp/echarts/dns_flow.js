function paddingTime(value) {
  return value < 10 ? '0' + value : value;
}

function FlowDataGenerator() {
  this.interval = 200;
  this.tick = +new Date();
  this.value = 10 + Math.random() * 5;
  this.data = [];
  this.lastValues = [];

  this.zeroData = function() {
    this.tick = new Date(+this.tick + this.interval);
    return {
      value : [ this.tick, 0 ]
    };
  };

  this.randomHighData = function() {
    this.tick = new Date(+this.tick + this.interval);
    if (this.value > 40) {
      this.value = Math.abs(this.value - Math.random() * 2);
    } else if (this.value < 30) {
      this.value = Math.abs(this.value + Math.random() * 2.01 - 0.5);
    } else {
      this.value = Math.abs(this.value + Math.random() * 2.01 - 1);
    }
    return {
      value : [ this.tick, Math.round(this.value) ]
    };
  };
  
  this.randomLowData = function() {
    this.tick = new Date(+this.tick + this.interval);
    if (this.value > 5) {
      this.value = Math.abs(this.value - Math.random() * 2);
    } else {
      this.value = Math.abs(this.value + Math.random() * 2.01 - 1);
    }
    return {
      value : [ this.tick, Math.round(this.value) ]
    };
  };

  this.initialData = function() {
    for (var i = 0; i < 1000; i++) {
      this.data.push(this.zeroData());
    }
    return this.data;
  };

  this.requestData = function(intensity) {
    for (var i = 0; i < 5; i++) {
      switch (intensity) {
      case 'high':
        var rd = this.randomHighData();
        this.lastValues[i] = rd['value'][1];
        this.data.shift();
        this.data.push(rd);
        break;
      case 'low':
        var rd = this.randomLowData();
        this.lastValues[i] = rd['value'][1];
        this.data.shift();
        this.data.push(rd);
        break;
      default:
        this.lastValues[i] = 0;
        this.data.push(this.zeroData());
        break;
      }
    }
    return this.data;
  };
}

var areaStyleColor = [ 'lightgreen', 'lightskyblue', 'yellow', 'orange', 'red' ];

var flowOption = {
  title : {
    left : 35,
    top : 28,
    textStyle : {
      color : '#e0e0e0'
    }
  },
  grid : {
    left : 30,
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
        var t = new Date(value);
        return paddingTime(t.getMinutes()) + ":" + paddingTime(t.getSeconds());
      })
    },
    splitLine : {
      show : false
    },
    min : 'dataMin'
  },
  yAxis : {
    type : 'value',
    boundaryGap : [ 0, '100%' ],
    splitLine : {
      show : true
    },
    min : 0,
    max : 50
  },
  series : [ {
    name : '模拟数据',
    type : 'line',
    showSymbol : false,
    hoverAnimation : false,
    lineStyle : {
      normal : {
        color : '#DC143C',
        width : 1,
        opacity : 0.4,
        curveness : 0.2
      }
    },
    areaStyle : {
      normal : {
        color : 'lightskyblue'
      }
    },
  } ]
};

var shanxiDataGenerator = new FlowDataGenerator();
var shanxiOption = $.extend(true, {}, flowOption);
shanxiOption.title.text = '山西';
shanxiOption.series[0].data = shanxiDataGenerator.initialData();

var shandongDataGenerator = new FlowDataGenerator();
var shandongOption = $.extend(true, {}, flowOption);
shandongOption.title.text = '山东';
shandongOption.series[0].areaStyle.normal.color = 'orange';
shandongOption.series[0].data = shandongDataGenerator.initialData();
