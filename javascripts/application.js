$(document).ready(function() {
  $('.header__menu > li > a').click(function(event) {
    event.preventDefault();
    var active_menu = $('.header__menu > li.active > a').attr('href');
    var actived_navigation = $('.header__menu > li.active');
    actived_navigation.removeClass('active');
    $(this).parents('li').addClass('active');
    $(active_menu).removeClass('active');
    $(active_menu).addClass('hide');
    var tab_selector = $(this).attr('href');
    $(tab_selector).removeClass('hide');
    $(tab_selector).addClass('active');
  });
});