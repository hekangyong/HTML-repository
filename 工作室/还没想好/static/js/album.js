/**
 * 
 */
$(function(){
		$("[name='reset_name']").on('click', function(){
		  $(this).parents(".img-box").find(".albumName").hide();
		  $(this).parents(".img-box").find("[name='reset_form']").show();
		  $(this).parents(".img-box").find("[name='name']").select();
		});

		
		$(".album_update").on('click',function(){
			var img_box = $(this).parents(".img-box");
			var form = $(this).parents("form");
			var parm = form.serialize();
			var url = form.attr("action");
			$.post(url,parm,function(data){
				img_box.find($(".origin_name")).text(img_box.find($(".sample1")).val());
				img_box.find(".albumName").show();
				img_box.find("[name='reset_form']").hide();
			});
		});
		
		//删除相册中的选中图片
	    $("[name='delete_album_file']").on('click',function(){
	    	var img_box = $(this).parents(".img-box");
	      	 $.post("/media/"+$(this).data("id")+"/delete",function(data){
	      		 img_box.remove();
	      	 });
	    });
	    
	    //照片设为封面
	    $("[name='update_album_cover']").on('click',function(){
	    	var album_id = $(this).parents(".photos-body").data("id");
	    	var file_id = $(this).next('li').data("id");
	      	 $.post("/album/"+album_id+"/update/"+file_id,function(data){
	      		window.location.href="/albums";
	      	 });
	    });
})