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
function loadPage(subject) {
	switch(subject)	{
  	case 'ddos':
  	  $("#dashboard").load( "/dashboard/ddos.html" );
  	  break;
  	case 'dns':
  	  $("#dashboard").load( "/dashboard/dns.html" );
  	  break;
  	case 'webpage':
  	  $("#dashboard").load( "/dashboard/webpage.html" );
  	  break;
  	case 'virus':
  	  $("#dashboard").load( "/dashboard/virus.html" );
  	  break;
  	case 'leak':
  	  $("#dashboard").load( "/dashboard/leak.html" );
  	  break;
  	default:
  	  break;
	}
}

var currentSubject = 'ddos';
loadPage(currentSubject);

var subjectApi = "/api/subject.json";
function getSubjectJson() {
	$.getJSON(subjectApi, function( subject ) {
		if(currentSubject == subject) return;
		
		currentSubject = subject;
		loadPage(subject);
	});
}

setInterval(getSubjectJson, 1000);
</script>
</html>
