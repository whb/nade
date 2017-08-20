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
          <li role="presentation" class="active"><a href="#ddos">DDoS攻击</a></li>
          <li role="presentation"><a href="#virus">网络病毒爆发</a></li>
          <li role="presentation"><a href="#dns">域名劫持</a></li>
          <li role="presentation"><a href="#webpage">网页篡改</a></li>
          <li role="presentation"><a href="#leak">大规模用户信息泄露</a></li>
        </ul>
      </div>
      
<div class="col-md-10 console">
<div class="tab-content">
        <div role="tabpanel" class="tab-pane active" id="ddos">
              <div class="row">
                <div class="col-md-8">
                  <img src="/static/images/workflow.png" />
                  <hr>
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
        
        
        <div role="tabpanel" class="tab-pane" id="dns">域名劫持</div>
        <div role="tabpanel" class="tab-pane" id="webpage">网页篡改</div>
        <div role="tabpanel" class="tab-pane" id="leak">大规模用户信息泄露</div>
</div>
</div>
      
    </div>

  </div>

  <script type="text/javascript">
      $("#reset-button").click(function() {
        $.post("console", {
          reset : "true"
        });
      });

      $('#consoleTabs a').click(function (e) {
        e.preventDefault();
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
          inactiveAttackArea : $(this).attr("name")
        });
      });
      
      $("#virus .btn").click(function() {
        $.post("console", {
          action : $(this).attr("name")
        });
      });


    </script>
</body>
</html>
