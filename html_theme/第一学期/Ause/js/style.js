(function(){
  pos = 0;
  ticking = false;
  var header = document.querySelector(".hello");
  window.addEventListener("scroll", function(aaaa){
    pos = window.scrollY;
    if(pos > 1&&!ticking){
      header.classList.add("scrolledDown");
      ticking = true;
    }
    if(pos < 1 && ticking){
      header.classList.remove("scrolledDown");
      ticking = false;
    }
  });
})();