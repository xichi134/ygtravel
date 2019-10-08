 $(document).ready(function () {
    var toTop = $("#go_top");
    if ($(window).scrollTop() < 400) {
        toTop.hide();
    }
    $(window).scroll(function () {
        if ($(window).scrollTop() < 400) {
            toTop.fadeOut("fast");
        } else {
            toTop.fadeIn("fast");
        }
    });
    toTop.click(function () {
        $("html,body").animate({
            scrollTop: 0
        }, 500);
        return false
    });
});