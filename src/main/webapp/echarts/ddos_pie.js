var pieColors = [ 'lightgreen', 'lightskyblue', 'orange', '#ee4444' ];

function buildPieData() {
  var data = [];

  attackAreaBases.forEach(function(area, index) {
    var isActive = (pageStatus.attackAreas.indexOf(area) >= 0);

    if (isActive) {
      var sum = attactFlowDatas[area].lastValues.reduce(function(a, b) {
        return a + b;
      }, 0);

      data.push({ value : sum / 5, name : area });
    }
  });
  return data.sort(function (a, b) { return a.value - b.value; });
}

pieOption = {
  tooltip : {
    trigger : 'item',
    formatter : "{a} <br/>{b} : {c} ({d}%)"
  },
  visualMap: {
    show: false,
    min: 20,
    max: 35,
    inRange: {
      //colorLightness: [0.5, 1],
      color: ['lightgreen', 'lightskyblue', 'gold','#ee4444']
    }
  },
  stillShowZeroSum: true,
  roseType: 'radius',
  series : [ {
    name : '攻击来源',
    type : 'pie',
    radius : '85%',
    center : [ '60%', '50%' ],
    data : buildPieData(),
    label : {
      normal : {
        position : 'inside',
        textStyle : {
          color : '#fff',
          fontSize : 14,
          fontWeight : 'bold'
        }
      }
    },
    itemStyle : {
      emphasis : {
        shadowBlur : 10,
        shadowOffsetX : 0,
        shadowColor : 'rgba(0, 0, 0, 0.5)'
      }
    }
  } ]
};

setInterval(function() {
  pieChart.setOption({
    series : [ {
      data : buildPieData(),
    } ]
  });
}, 2000);