$(document).foundation();

var site_nav = $('.w-nav');

// Add shrink class to header when scrolling down.
$(window)
  .ready(function() {
    if ($(window).scrollTop() >= site_nav.height()) {
      site_nav.addClass('shrink');
    }
  })
  .scroll(function() {
    if ($(window).scrollTop() >= site_nav.height()) {
      site_nav.addClass('shrink');
    }
    else {
      site_nav.removeClass('shrink');
    }
  });

// Smooth scroll for anchor links.
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Hide navbar on mobile on mobile_hidden_navbar layout and show it only on scroll down.
if ($(".page__mobile-nav-hidden").length) {
  $(".w-nav").addClass('not-visible');

  var lastScrollTop = 0;
  $(window).scroll(function(event) {
    var ScrollTop = $(this).scrollTop();

    if (ScrollTop > lastScrollTop){
      $(".w-nav").removeClass('not-visible');
    } else {
      $(".w-nav").addClass('not-visible');
    }

    lastScrollTop = ScrollTop;
  });
}
// Mobile menu for job page.
$(window).ready(function() {
  $('.job-content-wrap').on( "click", function() {
    $('#main-navigation').toggle();
  });
});

$(document).ready(function() {
  $('.fadeinAfterLoad').delay(1000).animate({ 'opacity': '1' }, 1000);
  $('.fadeinHero').delay(200).animate({'opacity':'1'},500);
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

function submitMainForm(token) {
  const $form = $('.schedule-demo-form');
  submitForm($form);
}
function submitForm($form) {
  const $formData = $form.serialize();
  const $required = $('.main-form-required');
  $.post('https://esteemed-api-97dnt.ondigitalocean.app/check-human', $formData)
      .done(function(data) {
        if (data === 'human') {
          jQuery.ajax({
            type: 'GET',
            url: 'https://esteemed.us10.list-manage.com/subscribe/post-json?c=?',
            data: $formData,
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            error: function (err) {
              $('#mce-error-response-main').text('Could not connect to the server.').show();
            },
            success: function (data) {
              if (data.result !== 'success') {
                if ($required.val().length === 0) {
                  $required.addClass('mce_inline_error');
                  $required.after('<div class="mce_inline_error" id="mce_required_error">This field is required.</div>');
                }
              }
              else {
                $required.removeClass('mce_inline_error');
                $('#mce_required_error').hide();
                $('#mce-success-response-main').text('Thank you for applying!').show();
              }
            }
          });
        }
        else {
          return;
        }
      })
      .fail(function(data) {
        console.log('fail: ', data)
      });
}
