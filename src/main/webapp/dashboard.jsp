<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html lang="zh-cn">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <title>网络攻防演练控制台</title>
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1,user-scalable=no">
  <link rel="shortcut icon" href="/static/images/favicon.ico">
  <!--[if lte IE 8]><meta http-equiv="refresh" content="0;url=/ie" /><![endif]-->
  
  <link rel="stylesheet" href="/css/bootstrap.min.css">
  <script src="/js/echarts.min.js"></script>
  <script src="/js/map/china.js"></script> 
  
</head>

<body class="container">
  <h1>网络攻防演练-DDOS攻击</h1>
  <div class="row">
    <div class="col-md-10">
      <div class="row">
        <div class="col-md-2"></div>
        <div class="col-md-10" id="main" style="height:600px;">
        </div>
      </div>
      <div class="row">
                  时序图
      </div>
    </div>
    <div class="col-md-2">
      <h3>抗DDOS系统简介：</h3>
      <ul>
        <li>建设时间：</li>
        <li>投入：</li>
        <li>覆盖规模</li>
        <li>使用效果等</li>
      </ul>
    </div>
  </div>


<script src="/echarts/ddos.js"></script> 
<script type="text/javascript">
  var myChart = echarts.init(document.getElementById('main'));
  myChart.setOption(option);  
</script>  
</body>
</html>
