var activeStatus = ['attack', 'alarm', 'repair'];

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
	return (activeStatus.includes(WebPage.pageStatus.status)) ? targetViolentScatterStyle : targetDefaultScatterStyle;
}

function getAttackerScatterStyle(attackArea) {
	return (activeStatus.includes(WebPage.pageStatus.status)) ? attackerActiveScatterStyle : attackerDefaultScatterStyle;
}

var geoCoordMap = {
    '企业B': [116.5071, 39.7888], //数码庄园
    '企业A': [116.3267, 40.0389] //清华
    // http://www.gpsspg.com/maps.htm 经纬度查询
};


function buildAttackLines() {
  if(!activeStatus.includes(WebPage.pageStatus.status))
    return [];
  
  var planeLines = [];
  planeLines.push({ 
    coords: [geoCoordMap[WebPage.pageStatus.attackArea], geoCoordMap[WebPage.pageStatus.targetArea]] 
  });
  return planeLines;
}

function buildDefensingLines() {
  if(WebPage.pageStatus.status != 'defense')
    return [];
  
  var planeLines = [];
  planeLines.push({ 
    coords: [geoCoordMap[WebPage.pageStatus.attackArea], geoCoordMap[WebPage.pageStatus.targetArea]] 
  });
  return planeLines;
}

function buildDefenseMarkPoint() {
  if(WebPage.pageStatus.status != 'defense') 
    return [];

  return [{ name: '协同', coord: geoCoordMap[WebPage.pageStatus.attackArea] }];
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
		name: WebPage.pageStatus.targetArea,
		value: geoCoordMap[WebPage.pageStatus.targetArea],
  };
  $.extend(scatter, getTargetScatterStyle());
  areaScatters.push(scatter);
    
  var areaScatter = {
      name: WebPage.pageStatus.attackArea,
      value: geoCoordMap[WebPage.pageStatus.attackArea]
  };
  $.extend(areaScatter, getAttackerScatterStyle(WebPage.pageStatus.attackArea));
  areaScatters.push(areaScatter);

  return areaScatters;
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
};

var mapSerie = {
    name: '',
    type: 'map',
    map: 'beijing',
    zoom: 1.25,
    roam: true,
    silent: true,
    itemStyle:{
        normal:{label:{show:true}},
        emphasis:{label:{show:true}}
    },
};

var series = [ trailSerie, planeSerie, scatterSerie, defensingTrailSerie, defensingPlaneSerie];

var initialGeo = {
    map: 'beijing',
    zoom: 1.25,
    center: null,
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
        name: '海淀区',
        itemStyle: {
            normal: {
                areaColor: '#2a333d',
            }
        }
    }]
};

function buildZoomCenter() {
  return $.extend(true, {}, initialGeo, WebPage.activeGeo);
}

var moveOption = {
    backgroundColor: '#404a59',
    title : {
        text: '网络攻防演练-大规模用户信息泄露',
        subtext: '北京',
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
    geo: buildZoomCenter(),
    
    series: series
};