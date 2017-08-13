<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>

var geoCoordMap = {
    '山东': [117.1582, 36.8701],
    '天津': [117.4219, 39.4189],
    '河北': [114.4995,38.1006],
    '山西': [112.3352,37.9413],
    '北京': [116.4551, 40.2539]
};

var data = [{
    name: '山东',
    value: 50
}, {
    name: '天津',
    value: 86
}, {
    name: '河北',
    value: 86
}, {
    name: '山西',
    value: 86
}];

var attackAreas = [];
var sourceArea = '北京';

function buildAttackLines() {
  var planeLines = [];
  for (var i = 0; i < attackAreas.length; i++) {
    planeLines.push({ 
      coords: [geoCoordMap[attackAreas[i]], geoCoordMap[sourceArea]] 
    });
  }
  return planeLines;
}

function buildAreaScatter() {
  var areaScatters = [];
  areaScatters.push({
      name: sourceArea,
      value: geoCoordMap[sourceArea],
      symbolSize: 8,
      itemStyle: {
          normal: {
              color: 'red',
              borderColor: '#000'
          }
      }
  });
    
  for (var i = 0; i < attackAreas.length; i++) {
    areaScatters.push({
        name: attackAreas[i],
        value: geoCoordMap[attackAreas[i]]
    });
  }
  return areaScatters;
}




//var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';
var planePath = 'arrow';

var planeSerie = {
    type: 'lines',
    zlevel: 2,
    effect: {
        show: true,
        period: 6,
        trailLength: 0.1,
        color: 'maroon',
        symbol: planePath,
        symbolSize: 8
    },
    lineStyle: {
        normal: {
            color: '#a6c84c',
            width: 1,
            opacity: 0.4,
            curveness: 0.2
        }
    },
    data: buildAttackLines()
}

var scatterSerie = {
    type: 'effectScatter',
    coordinateSystem: 'geo',
    zlevel: 2,
    rippleEffect: {
        period: 8,
        scale: 6,
        brushType: 'stroke'
    },
    label: {
        normal: {
            show: true,
            position: 'right',
            formatter: '{b}'
        }
    },
    symbolSize: 5,
    itemStyle: {
        normal: {
            color: '#0D6695',
            borderColor: 'gold'
        }
    },

    data: buildAreaScatter()
} 

var series = [ planeSerie, scatterSerie ];


option = {
    backgroundColor: '#404a59',
    title : {
        text: 'DDOS攻击',
        left: 'center',
        textStyle : {
            color: '#fff'
        }
    },
    tooltip: {
        trigger: 'item',
    },
    geo: {
        map: 'china',
        zoom: 3,
        center: [116.4551, 40.2539],
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