$(document).ready( function() {

    $('#head-input').each(function(index, value) {
        $( value ).focusin(function() {
            var elem = $( this ).parent().children("label");
            elem.toggleClass( "anim-top");
            elem.css("opacity", 1);
        });
        
        $( value ).focusout(function(){
            var elem = $( this ).parent().children("label");
            elem.css("opacity", 0);
        });
      });
    let degVal = 180;
    const platOption = ['Physical', '', 'Online'];
    const colWave = ['green', 'black', 'red'];
    let i = 1;
    $('.head-element span').on("click", function() {
        if (degVal == 270) {
            degVal = 90;
            i = 0;
        }else {
            degVal += 90
            i+=1;
        }
        th.platOpt = platOption[i];
        $(this).css('background-color', colWave[i]);
        $(this).css('transform', `rotateZ(${degVal}deg)`);
    });
   
    
})

