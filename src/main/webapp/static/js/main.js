/*
 * Replace all SVG images with inline SVG
 */
jQuery('img.svg').each(function() {
  var $img = jQuery(this);
  var imgID = $img.attr('id');
  var imgClass = $img.attr('class');
  var imgURL = $img.attr('src');

  jQuery.get(imgURL, function(data) {
    // Get the SVG tag, ignore the rest
    var $svg = jQuery(data).find('svg');

    // Add replaced image's ID to the new SVG
    if (typeof imgID !== 'undefined') {
      $svg = $svg.attr('id', imgID);
    }
    // Add replaced image's classes to the new SVG
    if (typeof imgClass !== 'undefined') {
      $svg = $svg.attr('class', imgClass + ' replaced-svg');
    }

    // Remove any invalid XML tags as per http://validator.w3.org
    $svg = $svg.removeAttr('xmlns:a');

    // Replace image with new SVG
    $img.replaceWith($svg);

  }, 'xml');
});


function queue(start) {
  var rest = [].splice.call(arguments, 1),
      promise = $.Deferred();

  if (start) {
      $.when(start()).then(function () {
          queue.apply(window, rest);
      });
  } else {
      promise.resolve();
  }
  return promise;
}

$.fn.extend({
  animateCss: function (animationName) {
      var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
      this.addClass('animated ' + animationName).one(animationEnd, function() {
          $(this).removeClass('animated ' + animationName);
      });
      return this;
  }
});


var TextWidget = {
  createNew: function(parentDiv){
      var widget = {};
      widget.parent = parentDiv;
      widget.type = parentDiv.attr('id');
      widget.listTimeoutId = [];

      (function(){ 
        widget.title = $('<h2 id="'+widget.type+'_title"></h2>').appendTo(widget.parent);
        widget.text = $('<h3 id="'+widget.type+'_text"></h3>').appendTo(widget.parent);
        widget.list = $('<ul id="'+widget.type+'_list"></ul>').appendTo(widget.parent);
      })();
      
      widget.pageStatus = {};
      
      widget.getTitleIcon = function() {
          switch (widget.pageStatus.status) {
          case 'attack':
            return '<i class="fa fa-rocket"></i>';
          case 'alarm':
            return '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" t="1504312598649" class="svg replaced-svg" style="" viewBox="0 0 1024 1024" version="1.1" p-id="7807" width="48" height="48" id="alarm-light"><defs><style type="text/css"></style></defs><path d="M508.402 322.048c-124.401 0-225.258 100.835-225.258 225.236v276.754h453.721V547.284c0-124.402-100.834-225.236-225.236-225.236h-3.227z m-261.506 134.9c4-19.862-8.886-39.202-28.748-43.202l-106.22-21.316c-19.862-3.977-39.225 8.908-43.202 28.77a37.06 37.06 0 0 0-0.317 12.75c2.25 14.817 13.522 27.317 29.066 30.452l106.22 21.316c19.884 3.978 39.224-8.885 43.201-28.77z m-24.34-246.098l67.656 84.608c12.657 15.817 35.747 18.386 51.587 5.728 15.817-12.659 18.385-35.749 5.727-51.588l-67.677-84.587c-12.635-15.816-35.725-18.385-51.565-5.749-10.636 8.5-15.272 21.681-13.363 34.225a36.306 36.306 0 0 0 7.636 17.363z m292.05 31.999c20.271 0.477 37.066-15.568 37.542-35.816l-0.25-108.312c0.478-20.249-15.567-37.066-35.815-37.543-20.272-0.477-37.089 15.568-37.567 35.816l0.25 108.31c-0.045 2.183 0.091 4.342 0.41 6.433 2.636 17.27 17.363 30.702 35.43 31.112z m169.875 66.404c15.205 13.386 38.407 11.91 51.793-3.295l71.564-81.335c13.386-15.227 11.908-38.407-3.295-51.793-15.227-13.386-38.407-11.908-51.793 3.295l-71.585 81.337c-7.455 8.476-10.296 19.43-8.727 29.792 1.248 8.227 5.316 16.068 12.043 22z m267.12 132.72c-3.046-20.045-21.77-33.817-41.793-30.75l-107.106 16.295c-20.045 3.045-33.816 21.748-30.772 41.793 3.046 20.043 21.772 33.815 41.816 30.77l107.084-16.316c20.044-3.045 33.815-21.75 30.77-41.793zM816.994 908.008c0 28.884-23.407 52.27-52.293 52.27H243.806c-28.886 0-52.293-23.386-52.293-52.27 0-28.884 23.407-52.27 52.293-52.27h520.896c28.886 0 52.293 23.386 52.293 52.27z" fill="#d81e06" p-id="7808"></path></svg>';
          case 'analyze':
            return '<i class="fa fa-search"></i>';
          case 'repair':
            return '<i class="fa fa-wrench"></i>';
          case 'defense':
            return '<i class="fa fa-shield"></i>';
          case 'confirm':
            return '<i class="fa fa-check"></i>';
          default:
            return '';
          }
        };
      
      widget.displayTitle = function(){ 
        widget.text.hide();
        widget.list.hide();
        widget.title.html(widget.getTitleIcon() + ' ' + widget.pageStatus.title);
        widget.title.show();
          return widget.pageStatus.status == 'alarm' ? widget.title.animateCss('tada') : widget.title.animateCss('fadeIn');
      };
      
      widget.displayText = function(){ 
        widget.text.hide();
        widget.text.html(widget.pageStatus.text);
          return widget.text.fadeIn(2000);
      };
      
      widget.displayList = function(listCallback){ 
        widget.list.empty();
        widget.list.show();
        widget.listTimeoutId.forEach(function(item) { 
          clearTimeout(item);
        });
        widget.listTimeoutId = [];
        
        
        widget.pageStatus.text.forEach(function(text, index) {
            var timeoutId = setTimeout(function() { 
                $('<li>'+text+'</li>').appendTo(widget.list).animateCss('flipInX'); 
                
                if(listCallback)
                  listCallback(text, index);
            }, index*3000);
            
            widget.listTimeoutId.push(timeoutId);
          });
      };
      
      widget.setPageStatus = function(pageStatus){ 
        widget.pageStatus = $.extend(true, {}, pageStatus);
        switch (widget.type) {
            case 'alarm':
              widget.pageStatus.title = pageStatus.alarm_title;
              widget.pageStatus.text = pageStatus.alarm_text;
              break;
            case 'defense':
              widget.pageStatus.title = pageStatus.defense_title;
              widget.pageStatus.text = pageStatus.defense_text;
              break;
            default:
              widget.pageStatus.title = '';
              widget.pageStatus.text = '';
              break;
            }
      };
      
      widget.display = function(pageStatus, listCallback){ 
        if(widget.type == 'attack' && pageStatus.status != 'alarm') return;
          
        widget.setPageStatus(pageStatus);
        queue(function () {
            return widget.displayTitle().delay(1000);
          }, function () {
            if( Object.prototype.toString.call( widget.pageStatus.text ) === '[object Array]' ) {
              return widget.displayList(listCallback);
            } else {
              return widget.displayText();
            }
          });
      };
      
      widget.hide = function() { 
        widget.title.hide();
        widget.text.hide();
        widget.list.hide();
      }
      
      return widget;
    }
};

var TerminalSimulator = {
  createNew: function(parentDiv){
      var widget = {};
      widget.parent = parentDiv;

      (function(){ 
        widget.typewriter = $('<span id="typewriter" class="typewriter"></span>').appendTo(widget.parent);
        widget.cursor = $('<span id="cursor" class="cursor"></span>').appendTo(widget.parent);
      })();
      
      
      widget.display = function(pageStatus){ 
        widget.cursor.html('&nbsp;');
        var typewriter = require('typewriter');
        var twSpan = document.getElementById('typewriter');
        var tw = typewriter(twSpan).withAccuracy(98)
                                   .withMinimumSpeed(5)
                                   .withMaximumSpeed(17)
                                   .build();
        pageStatus.terminal_simulator.forEach(function(cmdResult) {
          tw.put('$ ').waitRange(500, 1000);
          tw.type(cmdResult.command).put('<br/>');
          tw.waitRange(1000, 1500);
          cmdResult.result.forEach(function(r) {
            tw.put(r + '<br/>');
          });
          tw.put('<br/>');
          tw.waitRange(2000, 2500);
        });

        return tw;
      };
      
      widget.hide = function() { 
        widget.typewriter.empty();
        widget.cursor.empty();
      }
      
      return widget;
    }
};


var TextGenerator = {
  createNew: function(){
      var generator = {};
      generator.userInfos = ['用户名', '身份证号码', '手机号码', '工作单位', '密码', '13651180933', 'dirzytp', 
                               'abc123456', 'username', '10010198903050638', 'zhangsan@gmail.com', 'lisi@163.com', '601233198903050638',
                               '123456', 'admin', '45010198903050638', 'zhangsan@qq.com', 'lisi@263.com', '100233198903050638',
                               '13651190833', 'root', '朝阳区光辉小区24号', 'QQ号吗', '收入10万', '支付宝账号',
                               '工商银行账号','建设银行信用卡号','淘宝账号','京东账号','通信地址'];
      
      generator.infoArray = [];
      generator.startArray = [];
      
      (function(){ 
        for(var i=0; i<100; i++) {
          generator.infos = generator.userInfos.join(",");
          generator.infoArray[i]=generator.infos;
          generator.startArray[i]=parseInt(Math.random()*10);
        }
      })();
      
      
      generator.ch = function(i){
        generator.startArray[i] += 1;
        if(generator.startArray[i] >= generator.infos.length) 
          generator.startArray[i] = parseInt(Math.random()*200);
        return generator.infoArray[i].charAt(generator.startArray[i]);
      };
      
      return generator;
    }
}

var Matrix = {
    createNew: function(parentDiv){
        var widget = {};
        widget.parent = parentDiv;
        widget.width = parentDiv.width() * 0.9;
        widget.height = 800;
        widget.textGenerator = TextGenerator.createNew();

        (function(){ 
          
        })();
        
        widget.yPositions = Array(100).join(0).split('');
        widget.draw = function(){ 
          widget.ctx.fillStyle = 'rgba(0,0,0,0.05)'; //#2a333d rgba(42,51,61,.05) #404a59 rgba(64,74,89,.05)
          widget.ctx.fillRect(0, 0, widget.width, widget.height);
          widget.ctx.fillStyle = '#0F0';
          widget.ctx.font = '10.5pt 宋体';
          
          
          widget.yPositions.map(function(y, index){
            //text = String.fromCharCode(1e2+Math.random()*33);
            x = (index * 15)+15;
            q.getContext('2d').fillText(widget.textGenerator.ch(index), x, y);
            
            if(y > 100 + Math.random()*1e4) {
              widget.yPositions[index] = 0;
            } else {
              widget.yPositions[index] = y + 15;
            }
          });
        };
        
        widget.hide = function() { 
          if(typeof Game_Interval != "undefined") clearInterval(Game_Interval);
          widget.parent.empty();
        };
        
        widget.display = function() { 
          widget.canvas = $('<canvas id="q" width="'+widget.width+'" height="'+widget.height+'">Sorry Browser do not Support</canvas>').appendTo(widget.parent);
          widget.ctx=q.getContext('2d');
          if(typeof Game_Interval != "undefined") clearInterval(Game_Interval);
            Game_Interval = setInterval(widget.draw, 33);
        };
        return widget;
      }
  };