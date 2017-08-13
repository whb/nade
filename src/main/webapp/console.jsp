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
  <script src="/js/jquery-3.2.1.min.js"></script> 
</head>

<body>
  <h1>网络攻防演练控制台</h1>
  <div class="container">
  <div class="row">
    <div class="col-md-2">
      <ul class="nav nav-pills nav-stacked nav-pills-stacked-example">
        <li role="presentation" class="active"><a href="#">DDoS攻击</a></li>
        <li role="presentation"><a href="#">域名劫持</a></li>
        <li role="presentation"><a href="#">网页篡改</a></li>
        <li role="presentation"><a href="#">网络病毒爆发</a></li>
        <li role="presentation"><a href="#">大规模用户信息泄露</a></li>
      </ul>
    </div>
    <div class="col-md-10">
      <div class="row">
        <div class="col-md-10"><img src="/images/workflow.png" /></div>
        <div class="col-md-2">当前演练：DDOS攻击 <br>参演区域：山东、山西、天津、北京</div>
      </div>
      <div class="row">
        <div class="col-md-8">
          <div class="row">
            <button name="天津" type="button" class="attack btn btn-primary">天津攻击</button>
            <button name="河北" type="button" class="attack btn btn-primary">河北攻击</button>
            <button name="山西" type="button" class="attack btn btn-primary">山西攻击</button>
            <button name="山东" type="button" class="attack btn btn-primary">山东攻击</button>
          </div>
          <div class="row">
            <button type="button" class="btn btn-info">天津协同</button>
            <button type="button" class="btn btn-info">河北协同</button>
            <button type="button" class="btn btn-info">山西协同</button>
            <button type="button" class="btn btn-info">山东协同</button>
          </div>
         </div>
        <div class="col-md-4"></div>
      </div>
    </div>
  </div>
  
  </div>

<script type="text/javascript">
$(".attack").click(function() {
  $.post( "console", { activeAttackArea: $(this).attr("name") } );
});


</script>
</body>
</html>
