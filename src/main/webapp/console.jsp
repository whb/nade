<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html lang="zh-cn">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>网络攻防演练控制台</title>
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1,user-scalable=no">
<link rel="shortcut icon" href="/static/images/favicon-32x32.png">
<!--[if lte IE 8]><meta http-equiv="refresh" content="0;url=/ie" /><![endif]-->

<link rel="stylesheet" href="/static/css/bootstrap.min.css">
<link rel="stylesheet" href="/static/css/font-awesome.min.css">
<link rel="stylesheet" href="/static/css/main.css">
<script src="/static/js/jquery-3.2.1.min.js"></script>
<script src="/static/js/bootstrap.min.js"></script>
</head>

<body>
  <h1 class="title">网络攻防演练控制台</h1>
  <div class="container">
    <div class="row">
      <div class="col-md-2">
        <ul id="consoleTabs" class="nav nav-pills nav-stacked" role="tablist">
          <li role="presentation"><a href="#ddos">DDoS攻击</a></li>
          <li role="presentation"><a href="#virus">网络病毒爆发</a></li>
          <li role="presentation"><a href="#webpage">网页篡改</a></li>
          <li role="presentation"><a href="#dns">域名劫持</a></li>
          <li role="presentation"><a href="#leak">大规模用户信息泄露</a></li>
        </ul>
        
        <div style="text-align:center;">
           重新<button id="reset-button"  type="button" class="btn btn-circle btn-outline"><i class="fa fa-refresh"></i></button>开始
        </div>
      </div>
      
<div class="col-md-10 console">
<div class="tab-content">
        <div role="tabpanel" class="tab-pane" id="ddos">
              <div class="row">
                <div class="col-md-8">
                  <div class="row">
                    <button name="天津" type="button" class="attack btn btn-outline">
                      <i class="fa fa-rocket fa-lg"></i> 天津攻击
                    </button>
                    <button name="河北" type="button" class="attack btn btn-outline">
                      <i class="fa fa-rocket fa-lg"></i> 河北攻击
                    </button>
                    <button name="山西" type="button" class="attack btn btn-outline">
                      <i class="fa fa-rocket fa-lg"></i> 山西攻击
                    </button>
                    <button name="山东" type="button" class="attack btn btn-outline">
                      <i class="fa fa-rocket fa-lg"></i> 山东攻击
                    </button>
                  </div>
                  <hr>
                  <div class="row">
                    <button type="button" class="alarm-button btn btn-outline">
                      <i class="fa fa-exclamation-triangle fa-lg"></i> 发出警报
                    </button>
                  </div>
                  <hr>
                  <div class="row">
                    <button name="天津" type="button" class="defense btn btn-outline">
                      <i class="fa fa-shield fa-lg"></i> 天津协同
                    </button>
                    <button name="河北" type="button" class="defense btn btn-outline">
                      <i class="fa fa-shield fa-lg"></i> 河北协同
                    </button>
                    <button name="山西" type="button" class="defense btn btn-outline">
                      <i class="fa fa-shield fa-lg"></i> 山西协同
                    </button>
                    <button name="山东" type="button" class="defense btn btn-outline">
                      <i class="fa fa-shield fa-lg"></i> 山东协同
                    </button>
                  </div>
                </div>
                
                <div class="col-md-4">
                  <table class="table table-bordered">
                    <tbody>
                      <tr>
                        <th>当前演练</th>
                        <td>DDOS攻击</td>
                      </tr>
                      <tr>
                        <th>参演区域</th>
                        <td>山东、山西、河北、天津、北京</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
        </div>
        
        
        <div role="tabpanel" class="tab-pane" id="virus">
            <div class="row">
                <div class="col-md-8">
                  <button name="spread" type="button" class="attack btn btn-outline">
                    <i class="fa fa-rocket fa-lg"></i> 启动传播
                  </button>
                  <button type="button" class="alarm-button btn btn-outline">
                    <i class="fa fa-exclamation-triangle fa-lg"></i> 发出警报
                  </button>
                  <button name="block" type="button" class="defense btn btn-outline">
                    <i class="fa fa-shield fa-lg"></i> 发起封堵
                  </button>
                </div>
                
                <div class="col-md-4">
                  <table class="table table-bordered">
                    <tbody>
                      <tr>
                        <th>当前演练</th>
                        <td>网络病毒爆发</td>
                      </tr>
                      <tr>
                        <th>参演区域</th>
                        <td>山东、山西、河北、天津、北京</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
        </div>
        
        <div role="tabpanel" class="tab-pane" id="webpage">
            <div class="row">
                <div class="col-md-8">
                  <div class="row">
                      <button name="attack" type="button" class="attack btn btn-outline">
                        <i class="fa fa-rocket fa-lg"></i> 演练启动
                      </button>
                      <button name="alarm" type="button" class="alarm btn btn-outline">
                        <i class="fa fa-exclamation-triangle fa-lg"></i> 发出警报
                      </button>
                      <button name="analyze" type="button" class="repair btn btn-outline">
                        <i class="fa fa-search fa-lg"></i> 事件研判
                      </button>
                      <button name="repair" type="button" class="repair btn btn-outline">
                        <i class="fa fa-wrench fa-lg"></i> 应急处置
                      </button>
                      <button name="defense" type="button" class="defense btn btn-outline">
                        <i class="fa fa-shield fa-lg"></i> 协同处理
                      </button>
                      <button name="confirm" type="button" class="confirm btn btn-outline">
                        <i class="fa fa-check fa-lg"></i> 结果验证
                      </button>
                  </div>

                </div>
                
                <div class="col-md-4">
                  <table class="table table-bordered">
                    <tbody>
                      <tr>
                        <th>当前演练</th>
                        <td>网页篡改</td>
                      </tr>
                      <tr>
                        <th>参演区域</th>
                        <td>河北、天津</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
        </div>
        
        <div role="tabpanel" class="tab-pane" id="dns">
            <div class="row">
                <div class="col-md-8">
                  <div class="row">
                      <button name="attack" type="button" class="attack btn btn-outline">
                        <i class="fa fa-rocket fa-lg"></i> 演练启动
                      </button>
                      <button name="alarm" type="button" class="alarm btn btn-outline">
                        <i class="fa fa-exclamation-triangle fa-lg"></i> 发出警报
                      </button>
                      <button name="analyze" type="button" class="repair btn btn-outline">
                        <i class="fa fa-search fa-lg"></i> 事件研判
                      </button>
                      <button name="repair" type="button" class="repair btn btn-outline">
                        <i class="fa fa-wrench fa-lg"></i> 应急处置
                      </button>
                      <button name="defense" type="button" class="defense btn btn-outline">
                        <i class="fa fa-shield fa-lg"></i> 协同处理
                      </button>
                      <button name="confirm" type="button" class="confirm btn btn-outline">
                        <i class="fa fa-check fa-lg"></i> 结果验证
                      </button>
                  </div>

                </div>
                
                <div class="col-md-4">
                  <table class="table table-bordered">
                    <tbody>
                      <tr>
                        <th>当前演练</th>
                        <td>域名劫持</td>
                      </tr>
                      <tr>
                        <th>参演区域</th>
                        <td>山西、山东</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
        </div>
        
        
        
        
        
        <div role="tabpanel" class="tab-pane" id="leak">大规模用户信息泄露</div>
</div>
</div>
      
    </div>

  </div>
</body>

<script type="text/javascript">
$("#reset-button").click(function() {
  $.post("console", {
    reset : "true"
  });
});

$(".alarm-button").click(function() {
  $.post("console", {
    alarm : "true"
  });
});

$('#consoleTabs a').click(function (e) {
  //e.preventDefault();
  $(this).tab('show');
  var subject = $(this).attr("href").substring(1);
  $.post("console", {
    subject : subject
  });
})

$("#ddos .attack").click(function() {
  $.post("console", {
    activeAttackArea : $(this).attr("name")
  });
});

$("#ddos .defense").click(function() {
  $.post("console", {
    defensingArea : $(this).attr("name")
  });
});

$("#virus .btn").click(function() {
  $.post("console", {
    action : $(this).attr("name")
  });
});

$("#webpage .btn").click(function() {
  $.post("console", {
    action : $(this).attr("name")
  });
});

$("#dns .btn").click(function() {
  $.post("console", {
    action : $(this).attr("name")
  });
});

$(function() {
  $("#consoleTabs a[href$='${applicationScope['subject']}']").tab('show');
});

</script>
</html>
