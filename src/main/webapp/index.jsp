<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html lang="zh-cn">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>网络攻防演练</title>
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1,user-scalable=no">
<link rel="shortcut icon" href="static/images/favicon-32x32.png">
<!--[if lte IE 8]><meta http-equiv="refresh" content="0;url=/ie" /><![endif]-->
<link rel="stylesheet" href="static/css/bootstrap.min.css">
<link rel="stylesheet" href="static/css/main.css">
<script src="static/js/jquery-3.2.1.min.js"></script>
</head>

<body id='loginBody'>
  <div class="bs-docs-masthead" id="content" tabindex="-1">
    <div class="container">
      <div class="lead">
        <h1>网络攻防演练系统</h1>
      </div>

      <div class="lead">
        <button id="dashboard" class="btn btn-outline-inverse btn-lg" ${LOGIN_OPREATE == 'dashboard' ? '': 'disabled'}>显示监控屏幕</button>
        <button id="console" class="btn btn-outline-inverse btn-lg" ${LOGIN_OPREATE == 'console' ? '': 'disabled'}>进入控制台</button>
      </div>
    
      <form class="form-horizontal ${USER_LOGIN? 'hidden': ''}">
        <div class="form-group  has-feedback">
          <div class="col-sm-4 col-sm-offset-4">
            <div class="input-group">
              <span class="input-group-addon"><span class="glyphicon glyphicon-lock "></span></span> <input type="password"
                class="form-control input-lg" id="password" placeholder="Password" tabindex="1">
            </div>
            <span id="ok" class=""></span>
          </div>
        </div>
        <p id="msg"></p>
      </form>
    </div>
  </div>
</body>

<script type="text/javascript">
  $('.btn').click(function() {
    window.location = "" + $(this).attr('id');
  });

  $("#password").keyup(function() {
    $.ajax({
      type : "POST",
      url : "login",
      data : "password=" + $("#password").val(),
      success : function(msg) {
        if (msg == "dashboard") {
          $("#msg").text("监控屏幕密码正确");
          $(this).parents('.form-group').addClass('has-success');
          $('#ok').addClass('glyphicon glyphicon-ok form-control-feedback lg-ok-icon-lg');
          $('#dashboard').prop("disabled", false);
          $('form').fadeOut(2000);
        } else if (msg == "console") {
          $("#msg").text("控制台密码正确");
          $(this).parents('.form-group').addClass('has-success');
          $('#ok').addClass('glyphicon glyphicon-ok form-control-feedback lg-ok-icon-lg');
          $('#console').prop("disabled", false);
          $('form').fadeOut(2000);
        }
      }
    });
  });
</script>
</html>
