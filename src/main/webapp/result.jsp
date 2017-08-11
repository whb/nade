<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE html>

<html lang="zh-cn">
<head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  
  <title> 网络空间搜索引擎</title>
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1,user-scalable=no">
  <meta name="keywords" content="cyberspace,device,zoomeye,fingerprint,security,search engine,ipv4,nmap,scan,web">
  <link rel="shortcut icon" href="/static/images/favicon.ico">

  <!--[if lte IE 8]><meta http-equiv="refresh" content="0;url=/ie" /><![endif]-->

  <link href="/static/css/v4.dist.v0_1_7.css" rel="stylesheet" type="text/css" media="screen">
  <meta name="description" content="是XXXXX推出的一款网络空间搜索引擎，带领您探索互联网设备和网站节点，感受网络空间的心跳。">



</head>

<body class="home">
<header class="site-header">
  <nav class="navbar site-navbar">
    <div class="container-fluid">
      <!-- Brand and toggle get grouped for better mobile display -->
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#j-site-navbar-collapse" aria-expanded="false">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="/"><img src="/static/images/zoomeye.svg" alt="ZoomEye" style="width: 114px;height: 24px;"></a>
      </div>

      <!-- Collect the nav links, forms, and other content for toggling -->
      <div class="collapse navbar-collapse" id="j-site-navbar-collapse">
	  
	  
        <form class="navbar-form navbar-left search-form j-search-form hidden" role="search" action="/search" method="get">
          <div class="form-group">
            <div class="btn-group">
              <button type="button" class="btn dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <span class="current">网站</span>
                  <span class="caret"></span></button>
              <ul class="dropdown-menu">
                <li data-type="web"><a href="/#">网站</a></li>
                <li data-type="host"><a href="/#">主机</a></li>
              </ul>
            </div>
              <input type="hidden" name="t">
            <input type="text" class="form-control" placeholder="Search" name="q">
            <i class="glyphicon glyphicon-search"></i>
          </div>
        </form>
		
        <ul class="nav navbar-nav">
          <li data-nav="search" class="active"><a href="/">搜索 <span class="sr-only">(current)</span></a></li>
          <li data-nav="vision"><a href="/vision/">视角</a></li>

          <li data-nav="pirate"><a href="/pirate">海盗榜</a></li>
          <li data-nav="api"><a href="/api">API</a></li>

          
          <li data-nav="more"><a href="/more">更多</a></li>
        </ul>

        <ul class="nav navbar-nav navbar-right">
              
              <li><a href="/accounts/register?next=/">注册账号</a></li>
              <li class="hidden-xs hidden-sm"><span class="divider">|</span></li>
              <li><a href="/accounts/login/?next=/">登录</a></li>
              
        </ul>
      </div>
      <!-- /.navbar-collapse -->
    </div>
    <!-- /.container-fluid -->
  </nav>
</header>

<style>
  .home{
    padding-top: 53px;
  }
  .home .site-header{
    position: fixed;
    z-index: 10;
    width: 100%;
    top:0px;
    left: 0px;
  }

  .index-search-form .twitter-typeahead {
    float: left;
  }

  @media (max-width: 414px) {
    .index-search-form .twitter-typeahead {
      width: 150px;
    }
  }
</style>

<section class="index-hero">
  <h1>RESULT</h1>
</section>

</body>
