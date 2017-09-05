<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html lang="zh-cn">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <title>网络攻防演练</title>
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1,user-scalable=no">
  <link rel="shortcut icon" href="/static/images/favicon-32x32.png">
  <!--[if lte IE 8]><meta http-equiv="refresh" content="0;url=/ie" /><![endif]-->
  <link rel="stylesheet" href="/static/css/bootstrap.min.css">
  <link rel="stylesheet" href="/static/css/main.css">
  
  <script src="/static/js/jquery-3.2.1.min.js"></script> 
</head>

<body>
<main class="bs-docs-masthead" id="content" tabindex="-1">
  <div class="container">
    <p class="lead"><h1>网络攻防演练系统</h1></p>
    <p class="lead">
    <form class="form-horizontal">
      <a href="/dashboard" class="btn btn-outline-inverse btn-lg">显示监控屏幕</a>
      <a href="/console" class="btn btn-outline-inverse btn-lg">进入控制台</a> 
      
      <div class="form-group has-success has-feedback">
      <div class="col-sm-4 col-sm-offset-4">
          <div class="input-group">
            <span class="input-group-addon"><span class="glyphicon glyphicon-lock "></span></span>
            <input type="password" class="form-control input-lg" id="password" name="password" placeholder="Password">
          </div>
          <span class="glyphicon glyphicon-ok form-control-feedback icon-lg"></span>
      </div>
      </div>
    </form>
    </p>
  </div>
</main>
</body>
</html>
