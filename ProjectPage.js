var dir = 1;


$(document).ready(function ()
{
    $(".sliding-panel__outer-page").on('click', function ()
    {
        toggleOpen($(this), false);
    });

    $(window).on('resize', function ()
    {
        toggleOpen($(".sliding-panel--open").children(".sliding-panel__outer-page"), false, true);
    });
});

function toggleOpen(selector, bounce = false, forceOpen = false)
{
    if (selector.length == 0) return;

    var direction;
    var openFraction;
    var animTime = forceOpen ? 0 : 700;
    var bounceTime = 140;
    var hangDistance = 20;
    var bounceDistance = 10;
    var easing = bounce ? "linear" : "swing";

    toggleOpen($(".sliding-panel--open").children(".sliding-panel__outer-page").not(selector));

    if (selector.parent().hasClass("sliding-panel--open") && !forceOpen)
    {
        selector.parent().removeClass("sliding-panel--open");
        selector.parent().addClass("sliding-panel--closed");
        direction = 0;
    }
    else if (selector.parent().hasClass("sliding-panel--closed"))
    {
        selector.parent().removeClass("sliding-panel--closed");
        selector.parent().addClass("sliding-panel--open");
        direction = 1;
    }
    else
    {
        direction = 1;
    }
    selector.stop(true);
    openFraction = selector.position().left / (selector.innerWidth() - hangDistance);
    animTime = (animTime * (direction ? 1 - openFraction : openFraction));
    selector.animate({ left: direction * (selector.innerWidth()) - direction * hangDistance }, { duration: animTime, easing: easing });
    if (bounce) {
        selector.animate({ left: (direction * (selector.innerWidth() - hangDistance)) + ((direction ? -1 : 1) * bounceDistance) }, { duration: bounceTime, easing: "linear" });
        selector.animate({ left: direction * (selector.innerWidth() - hangDistance) }, bounceTime);
    }
}