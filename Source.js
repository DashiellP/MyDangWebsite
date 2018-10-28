function setBannerMargin() {
    var img = document.getElementById("bannerImg");
    var header = document.getElementById("headerContainer");
    console.log(img.clientHeight);
    console.log(header.clientHeight);
    header.style.marginTop = img.clientHeight - header.clientHeight;
}

window.onresize = function () {
    setBannerMargin();
}