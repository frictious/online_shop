$(document).ready(function() {
    $('.slider-img').slick({
        infinite: true,
        arrows: false,
        speed: 1000,
        autoplay: true,
        slidein: true,
        cssEase: 'linear'
    });
});

$('.autoplay').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false
});