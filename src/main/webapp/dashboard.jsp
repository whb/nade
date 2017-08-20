<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html lang="zh-cn">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <title>网络攻防演监控屏幕</title>
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1,user-scalable=no">
  <link rel="shortcut icon" href="/static/images/favicon.ico">
  <!--[if lte IE 8]><meta http-equiv="refresh" content="0;url=/ie" /><![endif]-->
  <link rel="stylesheet" href="/static/css/bootstrap.min.css">
  <link rel="stylesheet" href="/static/css/main.css">
  <script src="/static/js/jquery-3.2.1.min.js"></script>
</head>

<body id="dashboard" class="container-fluid">
</body>

<script type="text/javascript">
$(function() {
  function loadPage(subject) {
  	var url;
  	switch(subject)	{
    	case 'ddos':
    	  url = "/dashboard/ddos.html";
    	  break;
    	case 'dns':
    	  url = "/dashboard/dns.html";
    	  break;
    	case 'webpage':
    	  url = "/dashboard/webpage.html";
    	  break;
    	case 'virus':
    	  url = "/dashboard/virus.html";
    	  break;
    	case 'leak':
    	  url = "/dashboard/leak.html";
    	  break;
    	default:
    	  url = "";
    	  break;
  	}
  	$("#dashboard").load(url);
  }

  var currentSubject;
  var subjectApi = "/api/subject.json";
  function refreshPage() {
  	$.getJSON(subjectApi, function( subject ) {
  		if(currentSubject == subject) return;
  		
  		window.location.reload();
  	});
  }
  function loadSubjectPageOnRefresh() {
  	$.getJSON(subjectApi, function( subject ) {
  		if(currentSubject == subject) return;
  		
  		currentSubject = subject;
  		loadPage(subject);
  	});
  }
  loadSubjectPageOnRefresh();
  setInterval(refreshPage, 1000);
});

</script>
</html>
