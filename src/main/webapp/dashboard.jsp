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
  <script src="/static/js/jquery-3.2.1.min.js"></script> 
</head>

<body id="dashboard" class="container-fluid">
</body>

<script type="text/javascript">
function loadDdosPage() {
	$("#dashboard").load( "/dashboard/ddos.html" );
}

loadDdosPage();
</script>
</html>
