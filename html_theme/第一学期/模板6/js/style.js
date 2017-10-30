window.onload = function(){
     //canvas initialization
     var canvas = document.getElementById("canvas");
     var ctx = canvas.getContext("2d");
     //dimensions
     var W = canvas.width;
     var H = canvas.height;
     //Variables
     var degrees = 0;
     var new_degrees = 0;
     var difference = 0;
     var color = "#2b2b2b"; //绿色看起来更好
     var bgcolor = "#E8E8E8";
     var text;
     var animation_loop, redraw_loop;
     
     function init()
     {
         //每次绘制图表时清除画布
         ctx.clearRect(0, 0, W, H);
         
         //背景360度弧
         ctx.beginPath();
         ctx.strokeStyle = bgcolor;
         ctx.lineWidth = 8;    //预填充环的宽度
         ctx.arc(W/2, H/2, 70, 0, Math.PI*4, false); //你现在可以看到弧
         ctx.stroke();
         
         //计量将是一个简单的弧
         //以弧度表示的角度=以度表示的角度* PI / 180
         var radians = degrees * Math.PI / 180;
         ctx.beginPath();
         ctx.strokeStyle = color;
        ctx.lineWidth = 8;    //填充环的宽度
         //弧从最右端开始。 如果我们从角度中扣除90度
         //电弧将从最顶端开始
         ctx.arc(W/2, H/2, 70, 0 - 90*Math.PI/180, radians - 90*Math.PI/180, false); 
         //you can see the arc now
         ctx.stroke();
         
         //让我们添加文本
         ctx.fillStyle = color;
         ctx.font = "30px bebas";
         text = Math.floor(degrees/360*100) + "%";
         //让文本居中
         //从位置x减去文本宽度的一半
         text_width = ctx.measureText(text).width;
         //为位置y添加手动值，因为文本的高度不能
         //容易测量。 有黑客，但我们将保持手册现在。
         ctx.fillText(text, W/2 - text_width/2, H/2 + 10);
     }
     
     function draw()
     {
         //如果请求新图表，请取消任何运动动画
         if(typeof animation_loop != undefined) clearInterval(animation_loop);
         new_degrees=new_degrees+1;
         difference = new_degrees - degrees;
         animate_to();
     }
     
     //功能使图表移动到新的程度
     function animate_to()
     {
         //如果度数达到new_degrees，则清除动画循环
         if(degrees == new_degrees) 
             clearInterval(animation_loop);
         
         if(degrees==280)//如果加载到了360度，就停止
             return;
         
         if(degrees < new_degrees){
         	degrees++;
         } 
         else{
         	degrees--;
         }  
         init();
     }
     
     //调用各个函数，实现动态效果
     draw();
     redraw_loop = setInterval(draw, 10); //每2秒绘制一个新图表
 }  