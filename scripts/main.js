
//This is for the navigation bar
var site_label =  $('#s-bar-label');
site_label.on("animationend", function() {
  $(this).addClass('animated-siteCom');
});
$(document).ready(function(){
  const elements = document.querySelectorAll("[data-main]");
  const  char_elm = document.querySelectorAll("[data-char]");
  let obsOptions = {
    rootMargin : '0px',
    threshold :  [0, 0.10, 0.20, 0.30, 0.40, 0.50, 0.60, 0.70, 0.80, 0.90, 1 ]
  }

  const observer = new IntersectionObserver(intCallback, obsOptions);
  elements.forEach(el =>{ //every data-main elements
    observer.observe(el);
  })
  char_elm.forEach(ch =>{ //every data-char elements
    observer.observe(ch);
    console.log(ch);
  })

})

function intCallback(entries, observer) {
  entries.forEach(entry =>{
    let ele_data = entry.target.dataset;
    if ('main' in ele_data ){//for data-main
      window[ele_data.main](entry);
    }else if ('char' in ele_data) {//for data-char
      if (entry.intersectionRatio >= 0.5) {
        entry.target.classList.add("anim-top");
        observer.unobserve(entry.target);
      }
    }
  })
}

function skewVideo(entry){
  const main_page_element = $(".main-page");
  if (entry.intersectionRatio <= 0.5){
    main_page_element.css("height", 200);
    entry.target.querySelectorAll(".top-img-layout").forEach(element => {
      element.classList.remove("show");
    });
  }else {
    entry.target.querySelectorAll(".top-img-layout").forEach(element => {
      main_page_element.css("height", 500);
      element.classList.add("show");
    });
  }
 
}

hasPoped = false;
function transformMiddleSite(entry){
  if (!hasPoped){
    popUpIcon();
    hasPoped = true;
  }
  if (entry.isIntersecting){
    hasPoped = true;
  }else {
    hasPoped = false;
  }

  if (entry.intersectionRatio >= 0.5){
    entry.target.classList.add("show");
    
  }else{
    entry.target.classList.remove("show");
  }
  const piw_element = document.querySelectorAll(".personal-info-wrapper");
  piw_element.forEach( (e)=>{
    e.classList.toggle("anim-top", entry.isIntersecting);
  })

 
}

function trnfTerti(entry){
  const img = entry.target.querySelector('img').classList;
  img.toggle("anim-right", entry.isIntersecting);
  
}

function popUpIcon(){
  let imgObj = document.querySelectorAll("#icon-wrapper");
    imgObj.forEach(function (Obj) { 
    const obj = Obj.querySelectorAll('img');
    obj.forEach(function(o) {
      o.style.display = 'none';
      requestAnimationFrame(function(){
        o.style.display = 'block';
      });
    })
  })
}
