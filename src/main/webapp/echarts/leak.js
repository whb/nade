var activeStatus = ['attack', 'attacked', 'alarm', 'analyze'];
var attackingStatus = ['attack'];
var stealDataStatus = ['attacked', 'alarm', 'analyze'];

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
  if(!attackingStatus.includes(WebPage.pageStatus.status))
    return [];
  
  var planeLines = [];
  planeLines.push({ 
    coords: [geoCoordMap[WebPage.pageStatus.attackArea], geoCoordMap[WebPage.pageStatus.targetArea]] 
  });
  return planeLines;
}

function buildDataLines() {
  if(!stealDataStatus.includes(WebPage.pageStatus.status))
    return [];
  
  var planeLines = [];
  planeLines.push({ 
    coords: [geoCoordMap[WebPage.pageStatus.targetArea], geoCoordMap[WebPage.pageStatus.attackArea]] 
  });
  return planeLines;
}

function buildDefensingLines() {
  if(WebPage.pageStatus.status != 'repair')
    return [];
  
  var planeLines = [];
  planeLines.push({ 
    coords: [geoCoordMap[WebPage.pageStatus.targetArea], geoCoordMap[WebPage.pageStatus.attackArea]] 
  });
  return planeLines;
}

function buildDefenseMarkPoint() {
  if(WebPage.pageStatus.status != 'repair' && WebPage.pageStatus.status != 'defense') 
    return [];

  if(WebPage.pageStatus.status == 'repair') 
    return [{ name: '停止接入', coord: geoCoordMap[WebPage.pageStatus.targetArea] }];
  if(WebPage.pageStatus.status == 'defense') 
    return [{ name: '封堵', coord: geoCoordMap[WebPage.pageStatus.attackArea] }];
}

//var planePath = 'arrow';
var planePath = 'path://M678.54336 614.79936c4.864-32.60416 6.85056-54.03648 6.85056-54.03648C712.5504 155.24864 519.96672 56.2688 511.76448 51.2c-8.192 5.0688-200.77568 104.04864-173.62944 509.56288 0 0 2.00704 21.5552 6.90176 54.33344C142.11072 761.4976 217.06752 972.8 217.06752 972.8c45.62944-87.94112 109.0048-129.536 155.0848-149.0432L360.5504 732.2624l33.42336 83.34336c0.03072-0.01024 0.06144-0.02048 0.09216-0.03072 4.90496 12.72832 10.36288 24.9856 16.2816 36.51584 0.24576 0.47104 0.58368 0.93184 0.96256 1.3824 16.46592 30.55616 55.3472 52.02944 100.70016 52.02944 45.53728 0 84.56192-21.6576 100.90496-52.41856 0.29696-0.38912 0.5632-0.78848 0.768-1.18784 5.69344-11.50976 10.96704-23.7568 15.872-36.46464 0.02048 0.01024 0.0512 0.02048 0.07168 0.02048l33.36192-83.18976-11.13088 91.48416c46.08 19.52768 109.44512 61.11232 155.0848 149.05344C806.92224 972.8 882.00192 761.21088 678.54336 614.79936zM512 409.00608c-39.04512 0-70.69696-31.65184-70.69696-70.69696s31.65184-70.69696 70.69696-70.69696c39.04512 0 70.69696 31.65184 70.69696 70.69696S551.04512 409.00608 512 409.00608z';

var trailSerie = {
    type: 'lines',
    zlevel: 1,
    effect: {
        show: true,
        period: 1.5,
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
        period: 1.5,
        trailLength: 0,
        color: 'yellow',
        symbol: planePath,
        symbolSize: 16
    },
    lineStyle: {
        normal: {
            color: '#a6c84c',
            width: 1,
            opacity: 0.8,
            curveness: 0.2
        }
    },
    data: buildAttackLines()
}



var dataTrailSerie = {
    type: 'lines',
    zlevel: 1,
    effect: {
        show: true,
        period: 2.7,
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
    data: buildDataLines()
}

var dataPath = 'path://M921.338739 0.357134l-818.678502 0c-56.515424 0-102.334813 45.819558-102.334813 102.33062l0 818.645982c0 56.511062 45.819389 102.33062 102.334813 102.33062l818.678502 0c56.515424 0 102.334813-45.819558 102.334813-102.33062L1023.673552 102.687754C1023.673552 46.177716 977.85314 0.357134 921.338739 0.357134zM921.338739 870.167403c0 28.28009-22.934255 51.166333-51.16843 51.166333l-716.343689 0c-28.232128 0-51.167406-22.886243-51.167406-51.166333l0-716.314339c0-28.256554 22.935278-51.16531 51.167406-51.16531l716.343689 0c28.234175 0 51.16843 22.908756 51.16843 51.16531L921.338739 870.167403zM204.994027 205.018374l204.669625 0 0 51.16531-204.669625 0L204.994027 205.018374zM204.994027 409.679613l255.837032 0 0 51.16531-255.837032 0L204.994027 409.679613zM563.165871 409.679613l255.838055 0 0 51.16531L563.165871 460.844923 563.165871 409.679613zM563.165871 205.018374l255.838055 0 0 51.16531L563.165871 256.183683 563.165871 205.018374zM307.32884 256.18266l102.334813 0 0 204.66124-102.334813 0L307.32884 256.18266zM716.669114 256.18266l102.334813 0 0 204.66124-102.334813 0L716.669114 256.18266zM563.165871 256.18266l51.16843 0 0 204.66124-51.16843 0L563.165871 256.18266zM204.994027 563.17452l255.837032 0 0 51.16531-255.837032 0L204.994027 563.17452zM358.496246 614.33983l102.334813 0 0 102.33062-102.334813 0L358.496246 614.33983zM204.994027 665.50514l255.837032 0 0 51.16531-255.837032 0L204.994027 665.50514zM563.165871 563.17452l51.16843 0 0 102.33062-51.16843 0L563.165871 563.17452zM563.165871 665.50514l255.838055 0 0 51.16531L563.165871 716.670449 563.165871 665.50514zM204.994027 716.670449l102.334813 0 0 102.332666-102.334813 0L204.994027 716.670449zM716.669114 563.17452l102.334813 0 0 255.828596-102.334813 0L716.669114 563.17452zM204.994027 767.835759l255.837032 0 0 51.167357-255.837032 0L204.994027 767.835759z';
var dataPlaneSerie = {
    type: 'lines',
    zlevel: 2,
    effect: {
        show: true,
        period: 8.7,
        trailLength: 0,
        color: '#1296db',
        symbol: dataPath,
        symbolSize: 18
    },
    lineStyle: {
        normal: {
            color: '#a6c84c',
            width: 1,
            opacity: 0.8,
            curveness: 0.2
        }
    },
    data: buildDataLines()
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

var defensingTrailSerie = $.extend(true, {}, dataTrailSerie, {
  effect: {
    period: 10,
    trailLength: 0.7,
  },
  data: buildDefensingLines()
});

var defensingPlaneSerie = $.extend(true, {}, dataPlaneSerie, {
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



var series = [ trailSerie, planeSerie, scatterSerie, defensingTrailSerie, defensingPlaneSerie, dataTrailSerie, dataPlaneSerie];

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

refreshChartOption = function() {
  moveOption.series[0].data = buildAttackLines();
  moveOption.series[1].data = buildAttackLines();
  moveOption.series[2].data = buildAreaScatter();
  moveOption.series[2].markPoint.data = buildDefenseMarkPoint();
  moveOption.series[3].data = buildDefensingLines();
  moveOption.series[4].data = buildDefensingLines();
  moveOption.series[5].data = buildDataLines();
  moveOption.series[6].data = buildDataLines();
  moveOption.geo = buildZoomCenter();
};