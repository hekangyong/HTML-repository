$(function(){
    /** Top Search**/
    $(document).on('click', '#top-search', function(e){
        // console.log("aa");
        e.preventDefault();
        $('#header').addClass('search-toggled');
        $('#top-search-wrap input').focus();
        $('#top-search-wrap input').on('click', function(e){e.stopPropagation();});
        $('body').one('click', function(){
            $('#header').removeClass('search-toggled');
            e.preventDefault();
        });
    });
    $(document).on('click', '#top-search-close', function(e){
        e.preventDefault();
        $('#header').removeClass('search-toggled');
    });

    /** Profile Menu **/
    $('body').on('click', '.profile-menu > a', function(e){
        e.preventDefault();
        $(this).parent().toggleClass('toggled');
        $(this).next().slideToggle(200);
    });

    // top chat
    $(document).on('click', '#chat_btn', function(e){
        e = e||event;
        $('#chat').toggleClass('toggled');
        $('#chat').on('click', function(e){e.stopPropagation();});
        $('body').one('click', function(e){
            $('#chat').removeClass('toggled');
            e.preventDefault();
        });
    });

    // top-menu background
    $(document).on('click', '#top-menu .mdl-navigation__link', function(e){
        e = e||event;
        $(this).toggleClass('open');
        e.stopPropagation();
        $('.dropdown-menu-lg').on('click', function(e){e.stopPropagation();});
        $('body').one('click', function(e){
            $('#top-menu .mdl-navigation__link').removeClass('open');
            $('.wrapper .mdl-menu__container').removeClass('is-visible');
            e.stopPropagation();
        });
    });

    /** Listview Search*/
    if ($('.lvh-search-trigger')[0]) {
        $('body').on('click', '.lvh-search-trigger', function(e){
            e.preventDefault();
            x = $(this).closest('.lv-header-alt').find('.lvh-search');
            x.fadeIn(300);
            x.find('.lvhs-input').focus();
        });
        //Close Search
        $('body').on('click', '.lvh-search-close', function(){
            x.fadeOut(300);
            setTimeout(function(){
                x.find('.lvhs-input').val('');
            }, 350);
        })
    }

    // 显示/隐藏
    var e = e||event;
    $(document).on('click', ".drop-up", function(){$(".drop-down").hide();})
    $(document).on('click', ".drop-open", function(){$(".drop-down").slideDown();})  

    $(document).on('click', ".pv-cancel", function(){$(".form-group").hide(300);})
    $(document).on('click', ".pv-follow-btn", function(){$(".form-group").slideDown();})

    // 评论切换
    $(document).on("click", ".Jinput", function() {
      $(this).hide().next(".Jcommentform").fadeIn("fast");
    $(".textarea[name='content']").focus();
    $(this).closest(".commentBox").find("[name='confirm']").val("");//加载后将变量重置
    $(this).closest(".commentBox").find("[name='content']").val("");//加载后将变量重置
    });

    // 加载评论 ok
    $(document).on("click","[name=LoadComments]",function(){
        var init_JCommentUl = $(this).closest(".comment").find($("*[name='JCommentUl']")).prop("outerHTML");
        var JCommentUl = $(this).closest(".comment").find("[name='comment_load_box']");
        if($(this).hasClass("active")){//已添加过
            //JCommentUl.load("/info/"+$(this).closest(".comment").find(".info_id").text()+"/comments" + "/1");
            JCommentUl.empty();
            //JCommentUl.append(init_JCommentUl);
        }else{
            JCommentUl.load("/info/"+$(this).closest(".comment").find(".info_id").last().text()+"/comments" + "/1");
        }
        $(this).toggleClass("active");$(this).children("i").toggleClass("top");
    $("[name=arrow-icon]").toggleClass("active");
    });

    // 隐藏评论表单
    $(document).on("click", ".Jformhide", function() {
        $(this).parents(".Jcommentform").hide().prev(".Jinput").show();
    });

    // 点击阅读全文显示全部内容
    $(document).on("click", "[name='infobody']", function() {
        $(this).toggleClass("none");
    });
    
    // 删除按钮
    $(document).on("click", "[data-delete]", function(event) {
    	console.log(11);
         event.preventDefault();
          $.post($(this).data("delete"), function(returndata){
        	  if(typeof(returndata.result == "success")) {
        		  location.reload(true);
        	  }
          });
    }); 
    // 删除按钮 end
    
    // 日期
    function date2str(x, y) {
        var z = {
            y: x.getFullYear(),
            M: x.getMonth() + 1,
            d: x.getDate()
        };
        return y.replace(/(y+|M+|d+|h+|m+|s+)/g, function(v) {
            return ((v.length > 1 ? "0" : "") + eval('z.' + v.slice(-1))).slice(-(v.length > 2 ? v.length : 2))
        });
    }
    // 日期 end
    
    // 发布评论
    $("*[name='btn_comment_pub']").on("click", function(){
        var commentul = $(this).parents(".comment").find("[name='JCommentUl']");
        var com = $(this).parent().parent().find(".textarea").val();
        $.post($(this).find(".comment_a").attr("href"),{"scope" : "public","markdown" : "markdown","status" : "home","like" : "0","cmcount" : "0","sharecount" : "0","readcount" : "0","ctime" : "2015-08-24 18:11:58","content" : $(this).parent().parent().find(".textarea").val(),"title" : $('*[name=title]').val()},
                function(data,status){
                    commentul.prepend("<li><a target=\"_blank\" href=\"/user/null\" title=\"网信\"><img width=\"28px\" height=\"28px\" class=\"userimage\" src=\"\"></a> <div class=\"userdiv\"> <div class=\"user-info\"><div class=\"name\"> <a target=\"_blank\" href=\"/u/null\" title=\"网信\"></a> </div><div class=\"time\">"+ date2str(new Date(), "yyyy-MM-d") +"</div> </div> </div> <div class=\"text\">"+com+"</div></li>");
             
                    $("[name='btn_comment_pub']").parent().parent().find(".textarea").val("");//清空
        });
    });
    // 发布评论 end
    
    // 修改按钮
    $("[name='btn_update']").on("click",function(event){
        event.preventDefault();
        // 获取文本内容
        var content = $(this).closest("*[name='full-card']").find(".Jtext").text();   
        $("[name='update_full']").slideDown();
        $("[name=update_submit]").closest("[name='update_full']").find("*[name='content']").val(content);
        $("*[name='update_submit']").attr('href','info/' + $(this).find("a").attr("id"));
        });
    
    //修改提交事件按钮
    $(document).on("click", "[name='btn_info_edit_close']", function(event) {
        event.preventDefault();
        $.post($(this).attr("href"),{"scope" : $('.mdl-selectfield__select').find("option:selected").val(),"markdown" : $(this).closest("*[name='update_full']").find("*[name='content']").val(),"status" : "home","like" : "0","cmcount" : "0","sharecount" : "0","readcount" : "0","ctime" : "2015-08-24 18:11:58","content" : $(this).closest("*[name='update_full']").find("*[name='content']").val()},
            function(json){
            if(json != ""){
                $.each(json, function(field, message) {
                    var name = "[data-error='"+field+"']";
                        $(name).html(message);
                });
            }else{
                window.location.href = "/";
            }
        });
    });
    // 修改按钮 end
    //点击×或取消
    $(document).on("click", "[name='btn_info_edit_close']", function(event) {
    	event.preventDefault();
        $("[name='simple']").slideUp();
        $("[name='full']").slideUp();
        $("[name='photos']").slideUp();
        $("[name='update_full']").slideUp();
      })
    
    var $config = {
            url                 : '', // 网址，默认使用 window.location.href
            source              : '', // 来源（QQ空间会用到）, 默认读取head标签：<meta name="site" content="http://overtrue" />
            title               : '', // 标题，默认读取 document.title 或者 <meta name="title" content="share.js" />
            description         : '', // 描述, 默认读取head标签：<meta name="description" content="PHP弱类型的实现原理分析" />
            image               : '', // 图片, 默认取网页中第一个img标签
            sites               : ['qzone', 'qq', 'weibo'], // 启用的站点
            disabled            : ['google', 'facebook', 'twitter'], // 禁用的站点
    };


    $("*[name='Jshare']").click(function(){
        $(".shareBg").slideDown($config);
        $(this).parents(".actionBlock").find(".shareBg").share($config);
    });

    $(document).on("click", "[name='toggle_big']", function(){
      $("[name='biglc']").show(300);
      $("[name='smlc']").hide(300);
      // $("[name='smlc']").css("opacity", "0");
    })
    $(document).on("click", "[name='toggle_sm']", function(){
      $("[name='smlc']").show(300);
      $("[name='biglc']").hide(300);
      // $("[name='biglc']").css("opacity", "0");
    })
});