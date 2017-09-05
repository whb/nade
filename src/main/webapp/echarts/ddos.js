var initialOption = {
	geo: {
		zoom: 1,
		center: null
	}
};

var targetDefaultScatterStyle = {
  symbolSize: 6,
  itemStyle: {
        normal: {
            color: 'orange',
            borderColor: '#000'
        }
  }
}

var targetViolentScatterStyle = {
  symbolSize: 8,
  itemStyle: {
        normal: {
            color: 'red',
            borderColor: '#000'
        }
  }
}

var attackerDefaultScatterStyle = {
  symbolSize: 4,
  itemStyle: {
        normal: {
        	color: '#0D6695',
            borderColor: 'gold'
        }
  }
}

var attackerActiveScatterStyle = {
  symbolSize: 6,
  itemStyle: {
        normal: {
        	color: '#a6c84c',
            borderColor: 'gold'
        }
  }
}

function getTargetScatterStyle() {
	return (pageStatus.attackViolent) ? targetViolentScatterStyle : targetDefaultScatterStyle;
}

function getAttackerScatterStyle(attackArea) {
	return (pageStatus.attackAreas.indexOf(attackArea)>=0) ? attackerActiveScatterStyle : attackerDefaultScatterStyle;
}

var geoCoordMap = {
    '天津': [117.4219, 39.4189],
    '河北': [114.4995,38.1006],
    '山西': [112.3352,37.9413],
    '山东': [117.1582, 36.8701],
    '北京': [116.4551, 40.2539],
    '保定': [115.48,38.85],
    '廊坊': [116.7,39.53]
};


function buildAttackLines() {
  var planeLines = [];
  for (var i = 0; i < pageStatus.attackAreas.length; i++) {
    planeLines.push({ 
      coords: [geoCoordMap[pageStatus.attackAreas[i]], geoCoordMap[sourceArea]] 
    });
  }
  return planeLines;
}

function buildDefensingLines() {
  var planeLines = [];
  for (var i = 0; i < pageStatus.defensingAreas.length; i++) {
    planeLines.push({ 
      coords: [geoCoordMap[pageStatus.defensingAreas[i]], geoCoordMap[sourceArea]] 
    });
  }
  return planeLines;
}
//var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';
//var planePath = 'arrow';
var planePath = 'path://M678.54336 614.79936c4.864-32.60416 6.85056-54.03648 6.85056-54.03648C712.5504 155.24864 519.96672 56.2688 511.76448 51.2c-8.192 5.0688-200.77568 104.04864-173.62944 509.56288 0 0 2.00704 21.5552 6.90176 54.33344C142.11072 761.4976 217.06752 972.8 217.06752 972.8c45.62944-87.94112 109.0048-129.536 155.0848-149.0432L360.5504 732.2624l33.42336 83.34336c0.03072-0.01024 0.06144-0.02048 0.09216-0.03072 4.90496 12.72832 10.36288 24.9856 16.2816 36.51584 0.24576 0.47104 0.58368 0.93184 0.96256 1.3824 16.46592 30.55616 55.3472 52.02944 100.70016 52.02944 45.53728 0 84.56192-21.6576 100.90496-52.41856 0.29696-0.38912 0.5632-0.78848 0.768-1.18784 5.69344-11.50976 10.96704-23.7568 15.872-36.46464 0.02048 0.01024 0.0512 0.02048 0.07168 0.02048l33.36192-83.18976-11.13088 91.48416c46.08 19.52768 109.44512 61.11232 155.0848 149.05344C806.92224 972.8 882.00192 761.21088 678.54336 614.79936zM512 409.00608c-39.04512 0-70.69696-31.65184-70.69696-70.69696s31.65184-70.69696 70.69696-70.69696c39.04512 0 70.69696 31.65184 70.69696 70.69696S551.04512 409.00608 512 409.00608z';

var trailSerie = {
    type: 'lines',
    zlevel: 1,
    effect: {
        show: true,
        period: 0.5,
        trailLength: 0.4,
        color: '#fff',
        symbolSize: 6
    },
    lineStyle: {
        normal: {
            color: '#a6c84c',
            width: 0,
            curveness: 0.2
        }
    },
    data: buildAttackLines()
}

var planeSerie = {
    type: 'lines',
    zlevel: 2,
    effect: {
        show: true,
        period: 0.5,
        trailLength: 0,
        color: 'yellow',
        symbol: planePath,
        symbolSize: 16
    },
    lineStyle: {
        normal: {
            color: '#a6c84c',
            width: 3,
            opacity: 0.8,
            curveness: 0.2
        }
    },
    data: buildAttackLines()
}

var defensingTrailSerie = $.extend(true, {}, trailSerie, {
  effect: {
    period: 10,
    trailLength: 0.7,
  },
  data: buildDefensingLines()
});

var defensingPlaneSerie = $.extend(true, {}, planeSerie, {
  effect: {
    period: 10,
  },
  data: buildDefensingLines()
});

function buildAreaScatter() {
  var areaScatters = [];

  var scatter = {
		name: sourceArea,
		value: geoCoordMap[sourceArea],
  };
  $.extend(scatter, getTargetScatterStyle());
  areaScatters.push(scatter);
    
  for (var i = 0; i < attackAreaBases.length; i++) {
    var areaScatter = {
        name: attackAreaBases[i],
        value: geoCoordMap[attackAreaBases[i]]
    };
    $.extend(areaScatter, getAttackerScatterStyle(attackAreaBases[i]));
    areaScatters.push(areaScatter);
  }
  return areaScatters;
}

function buildDefenseMarkPoint() {
  if(!pageStatus.defensingAreas) return [];
  var areaScatters = [];
  for (var i = 0; i < pageStatus.defensingAreas.length; i++) {
    var areaScatter = {
        name: '协同',
        coord: geoCoordMap[pageStatus.defensingAreas[i]]
    };
    areaScatters.push(areaScatter);
  }
  return areaScatters;
}


function buildAttackLines() {
  var planeLines = [];
  for (var i = 0; i < pageStatus.attackAreas.length; i++) {
    planeLines.push({ 
      coords: [geoCoordMap[pageStatus.attackAreas[i]], geoCoordMap[sourceArea]] 
    });
  }
  return planeLines;
}


var scatterSerie = {
    type: 'effectScatter',
    coordinateSystem: 'geo',
    zlevel: 2,
    rippleEffect: {
        period: 8,
        scale: 6,
        brushType: 'fill'
    },
    label: {
        normal: {
            show: true,
            position: 'right',
            formatter: '{b}',
            textStyle: {
              fontSize: 16,
              fontWeight: 'bold'
            }
        }
    },
    markPoint: {
      symbol: 'circle',
      symbolSize: 70,
      itemStyle: {
        normal: {
          color: 'rgba(128, 128, 255, 0)',
          borderColor: '#1e90ff',
          borderWidth: 5
        }
      },
      label:{
          normal:{
              show: true,
              position: 'insideTop',
              formatter:function(d){return d.name}
          }
      },
      data: buildDefenseMarkPoint()
    },
    
    data: buildAreaScatter()
}


var series = [ trailSerie, planeSerie, scatterSerie, defensingTrailSerie, defensingPlaneSerie ];


var moveOption = {
    backgroundColor: '#404a59',
    title : {
        text: '网络攻防演练-DDOS攻击',
        subtext: '京、津、冀、晋、鲁五省',
        left: 'center',
        top: 50,
        textStyle : {
            color: '#e0e0e0',
            fontSize: 36,
            fontWeight: 'normal'
        }
    },
    tooltip: {
        trigger: 'item',
    },
    geo: {
        map: 'china',
        zoom: 1.25,
        label: {
            emphasis: {
                show: false
            }
        },
        roam: true,
        silent: true,
        itemStyle: {
            normal: {
                areaColor: '#323c48',
                borderColor: '#404a59'
            },
            emphasis: {
                areaColor: '#2a333d'
            }
        },
        regions: [{
            name: '北京',
            itemStyle: {
                normal: {
                    areaColor: '#2a333d',
                }
            }
        }]
    },
    
    series: series
};