var dir = 1;


$(document).ready(function ()
{
    $(".window-pane__outer-page").on('click', function ()
    {
        toggleOpen($(this));
    });
});

function toggleOpen(selector)
{
    var direction;
    var openFraction;
    var animTime = 1000;
    var hangDistance = 20;
    if (selector.parent().hasClass("window-pane--open"))
    {
        selector.parent().removeClass("window-pane--open");
        selector.parent().addClass("window-pane--closed");
        direction = 0;
    }
    else if (selector.parent().hasClass("window-pane--closed"))
    {
        selector.parent().removeClass("window-pane--closed");
        selector.parent().addClass("window-pane--open");
        direction = 1;
    }
    else
    {
        return;
    }
    selector.stop();
    openFraction = selector.position().left / (selector.innerWidth() - hangDistance);
    animTime = (animTime * (direction ? 1 - openFraction : openFraction));
    selector.animate({ left: direction * (selector.innerWidth()-hangDistance) }, animTime);
}