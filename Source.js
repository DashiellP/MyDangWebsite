var aspectRatio = 1;

function setBannerMargin()
{
    var img = document.getElementById("bannerImg");
    var header = document.getElementById("headerContainer");
    header.style.marginTop = img.clientHeight - header.clientHeight;
}

function setItemBoxWidths()
{
    var boxContainers = document.getElementsByClassName("item-box-container");
    for (var i = 0; i < boxContainers.length; ++i)
    {
        var boxes = boxContainers[i].getElementsByClassName("item-box");
        var rowLength = parseInt(boxContainers[i].getAttribute("itemsPerRow"));
        var numberOfRows = 0;
        if (boxContainers[i].getElementsByClassName("item-box-row").length > 0)
        {
            for (var j = 0; j < boxes.length; ++j)
            {
                
            }
        }
        for (var j = 0; j < boxes.length; ++j)
        {
            var containerStyle = window.getComputedStyle(boxContainers[i]);
            var boxStyle = window.getComputedStyle(boxes[j]);
            var boxMargin = boxStyle.marginRight + boxStyle.marginLeft;
            if (j % rowLength == 0)
            {
                var parent = boxContainers[i];
                var row = document.createElement("div");
                row.setAttribute("class", "item-box-row");
                parent.replaceChild(row, boxes[j]);
                for (var k = 0; k < rowLength && j + k < boxes.length; ++k)
                {
                    row.appendChild(boxes[j + k]);
                }
            }
            boxes[j].style.width = (parseFloat(containerStyle.width) - 10) / rowLength - parseFloat(boxMargin);
        }
    }
}

function handleResize()
{
    var viewport = document.getElementById("viewport");
    setBannerMargin();
    //setItemBoxWidths();
}

window.onresize = function ()
{
    handleResize();
}

window.onload = function ()
{
    handleResize();
}