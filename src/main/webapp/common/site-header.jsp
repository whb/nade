<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>

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
        <a class="navbar-brand" href="/"><img src="static/images/neteye_small.png" alt="NetEye" style="width: 160px;height: 34px;"></a>
      </div>

      <!-- Collect the nav links, forms, and other content for toggling -->
      <div class="collapse navbar-collapse" id="j-site-navbar-collapse">
	  
	  
        <form class="navbar-form navbar-left search-form j-search-form hidden" role="search" action="search" method="get">
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
          
        </ul>

        <ul class="nav navbar-nav navbar-right">
              
              <li><a href="/neteye.bm/login.html" target="view_window">登录</a></li>
              
        </ul>
      </div>
      <!-- /.navbar-collapse -->
    </div>
    <!-- /.container-fluid -->
  </nav>
</header>