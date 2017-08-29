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
	return (['attack', 'alarm', 'repair'].includes(pageStatus.status)) ? targetViolentScatterStyle : targetDefaultScatterStyle;
}

function getAttackerScatterStyle(attackArea) {
	return (['attack', 'alarm', 'repair'].includes(pageStatus.status)) ? attackerActiveScatterStyle : attackerDefaultScatterStyle;
}

var geoCoordMap = {
    '天津': [117.4219, 39.4189],
    '河北': [114.4995,38.1006],
    '山西': [112.3352,37.9413],
    '山东': [117.1582, 36.8701],
    '北京': [116.4551, 40.2539]
};


function buildAttackLines() {
  if(['attack', 'alarm', 'repair'].includes(pageStatus.status))
    return [];
  
  var planeLines = [];
  planeLines.push({ 
    coords: [geoCoordMap[pageStatus.attackArea], geoCoordMap[pageStatus.targetArea]] 
  });
  return planeLines;
}

//var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';
var planePath = 'arrow';

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
        color: 'maroon',
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


function buildAreaScatter() {
  var areaScatters = [];

  var scatter = {
		name: pageStatus.targetArea,
		value: geoCoordMap[pageStatus.targetArea],
  };
  $.extend(scatter, getTargetScatterStyle());
  areaScatters.push(scatter);
    
  var areaScatter = {
      name: pageStatus.attackArea,
      value: geoCoordMap[pageStatus.attackArea]
  };
  $.extend(areaScatter, getAttackerScatterStyle(pageStatus.attackArea));
  areaScatters.push(areaScatter);

  return areaScatters;
}



function buildAttackLines() {
  var planeLines = [];
  planeLines.push({ 
    coords: [geoCoordMap[pageStatus.attackArea], geoCoordMap[pageStatus.targetArea]] 
  });
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
            formatter: '{b}'
        }
    },
    
    data: buildAreaScatter()
}


var series = [ trailSerie, planeSerie, scatterSerie];


var moveOption = {
    backgroundColor: '#404a59',
    title : {
        text: '网络攻防演练-网页篡改',
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
            name: '天津',
            itemStyle: {
                normal: {
                    areaColor: '#2a333d',
                }
            }
        }]
    },
    
    series: series
};