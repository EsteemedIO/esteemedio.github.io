$(document).ready(function() {
    $('.fadeinAfterLoad').delay(1000).animate({'opacity':'1'},1000);
    $(window).scroll( function(){
        $('.fadein').each( function(i){
            var bottom_of_element = $(this).offset().top + ($(this).outerHeight()/4);
            var bottom_of_window = $(window).scrollTop() + $(window).height();
            if( bottom_of_window > bottom_of_element ){
                $(this).animate({'opacity':'1'},1000);
            }
        });
    });
});
