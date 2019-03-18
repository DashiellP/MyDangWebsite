var dir = 1;


$(document).ready(function ()
{
    $(".window-pane").on('click', function ()
    {
        toggleOpen($(this));
    });
});

function toggleOpen(selector)
{
    var direction;
    var openFraction;
    var topPage = selector.children(".window-pane__outer-page");
    var animTime = 1500;
    if (selector.hasClass("window-pane--open"))
    {
        selector.removeClass("window-pane--open");
        selector.addClass("window-pane--closed");
        direction = 0;
    }
    else if (selector.hasClass("window-pane--closed"))
    {
        selector.removeClass("window-pane--closed");
        selector.addClass("window-pane--open");
        direction = 1;
    }
    else
    {
        return;
    }
    topPage.stop();
    openFraction = topPage.position().left / topPage.innerWidth();
    animTime = (animTime * (direction ? 1 - openFraction : openFraction));
    topPage.animate({ left: direction * topPage.innerWidth() }, animTime);
}