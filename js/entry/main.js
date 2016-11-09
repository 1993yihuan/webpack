require ('../../css/index.css');
require ('../../css/swiper.css');
require('../../lib/base.js');
require('../part/part');
require('../../lib/swiper.jquery.js');

$(function(){
    console.log(2);
    $('.a').css('opacity',0.3);
    var swiper = new Swiper('.swiper-container',{
        autoplay : 5000
    });
})
