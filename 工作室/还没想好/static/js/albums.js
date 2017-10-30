/**
 * 
 */
$(function(){
	
    $(document).on('click', ".close-upload", function(){
      $("#album_operate").hide();
    })
	
	 $(document).on('click', ".del-pic", function(){
      $("#album_operate").show();
    })
	
	 $(document).on('click', ".top-back", function(){
      $("#album_operate").hide();
    })
	
    $("[name='reset_name']").on('click', function(){
        $(this).parents(".img-boxs").find(".albumName").hide();
        $(this).parents(".img-boxs").find("[name='reset_form']").show();
        $(this).parents(".img-boxs").find("[name='name']").select();
      });
      
      //删除相册
      $("[name='delete_album']").on('click',function(){
      	var img_box = $(this).parents(".img-boxs");
      	 $.post("/album/"+$(this).data("id")+"/delete",function(data){
      		 img_box.remove();
      	 });
      });
     
      $(".albums_update").on('click',function(){
  		var img_box = $(this).parents(".img-boxs");
  		var form = $(this).parents("form");
  		var parm = form.serialize();
  		var url = form.attr("action");
  		$.post(url,parm,function(data){
  			img_box.find($(".origin_name")).text(img_box.find($(".sample1")).val());
  			img_box.find(".albumName").show();
  			img_box.find("[name='reset_form']").hide();
  		});
  	  });
      
      $("[name='album_create']").on("click", function(){
    	  window.location.href="/";
      });
})