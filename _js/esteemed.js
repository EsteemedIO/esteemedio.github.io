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
// Add multi-MC forms to one page.
$('.main-form').submit(function (e) {
  var $this = $(this);
  jQuery.ajax({
    type: 'GET',
    url: 'https://esteemed.us10.list-manage.com/subscribe/post-json?c=?',
    data: $this.serialize(),
    dataType: 'json',
    contentType: 'application/json; charset=utf-8',
    error: function (err) {
      $('#mce-error-response-main').text('Could not connect to the server.').show();
    },
    success: function (data) {
      var $required = $('.main-form-required');
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
  return false;
});

$('#lead_submission').on('submit', function(e) {
  e.preventDefault();
  $('#lead_submission input[name="submit"]').fadeOut(2000, function() {
    $.post('https://esteemed-api-97dnt.ondigitalocean.app/register-deal', $('#lead_submission').serialize())
      .done(function(data) {
        $('#success-response').html('Thank you for your submission!').show();
      })
      .fail(function(data) {
        $('#success-response').html('There was an issue submitting your lead').show();
      });
  });
});

$('#join_esteemed').on('submit', function(e) {
  e.preventDefault();
  $('#join_esteemed input[name="submit"]').fadeOut(2000, function() {
    $.post('https://esteemed-api-97dnt.ondigitalocean.app/join', $('#join_esteemed').serialize())
      .done(function(data) {
        $('#success-response').html('Thank you for joining!').show();

        // Redirect user to Slack.
        window.location.href = data.url;
      })
      .fail(function(data) {
        $('#success-response').html('There was an issue joining').show();
      });
  });
});

$(document).ready(function() {
  // Use this for the first sections that should display on load page.
  $('.fadeinAfterLoad').delay(1000).animate({ 'opacity': '1' }, 1000);
  $('.fadeinHero').delay(200).animate({'opacity':'1'},500);
  $(window).scroll( function(){
    $('.component-offscreen').each( function(i){
      var bottom_of_element = $(this).offset().top + ($(this).outerHeight()/4);
      var bottom_of_window = $(window).scrollTop() + $(window).height();
      if( bottom_of_window > bottom_of_element ){
        $(this).removeClass('component-offscreen').addClass('component-is-showing');
      }
    });
    $('.fadein').each( function(i){
      var bottom_of_element = $(this).offset().top + ($(this).outerHeight()/4);
      var bottom_of_window = $(window).scrollTop() + $(window).height();
      if( bottom_of_window > bottom_of_element ){
        $(this).animate({'opacity':'1'},1000);
      }
    });
  });
});

// Mega menu.
$(window).ready(function() {
  $('.close').click(function(e) {
    $('.mega-menu-active').removeClass('mega-menu-active');
    $('.close').hide();
    $('.menu-icon').show();
    $('.title-bar').show();
    $('.w-logo img').attr('src', '/img/esteemed-bw-logo.svg');
    $('.mega-menu-parent').css("color", "black");
    $('.dropdown').css("background", "white");
    $('.hero-menu').removeClass('nav-active');
    $('.mega-menu-parent').removeClass('mega-menu-parent-active');
    $('.hero-menu').css("background", "white");
  });
  $('.mega-menu-parent').click(function() {
    $('.hero-menu').addClass('nav-active');
    $('.mega-menu-active').removeClass('mega-menu-active');
    $('.mega-menu').css('transform', '');
    $('.mega-menu').css('display', 'none');
    $('.mega-menu-parent').removeClass('mega-menu-parent-active');
    $(this).addClass('mega-menu-parent-active');
    $(this).next().css('display', 'flex');
    $(this).next().addClass('mega-menu-active');
    $('.menu-icon').hide();
    $('.title-bar').hide();
    $('.close').show();
    $('.w-logo img').attr('src', '/img/esteemed-wg-logo.svg');
    $('.hero-menu').css("background", "black");
    $('.mega-menu-parent').css("color", "white");
    $('.dropdown').css("background", "black");
  });
});
