var tab = function(x) {
    $("#content").children().hide();
    $("#" + x).show();
}

var isDark = false;
var toggleDark = function() {
    isDark = !isDark;

    if (isDark) {
        $("body").css("background-color", "black");
        $(".genHr").css("border-color", "white");
        $("body, button, h1, h2, h3, h4, h5, h6").css("color", "white");
    }
    else {
        $("body").css("background-color", "white");
        $(".genHr").css("border-color", "black");
        $("body, button, h1, h2, h3, h4, h5, h6").css("color", "black");
    }
}
var isGlow = false;
var toggleGlow = function() {
    isGlow = !isGlow

    if (isGlow) {
        $("body, button, h1, h2, h3, h4, h5, h6").css("text-shadow", "0 0 20px");
    }
    else {
        $("body, button, h1, h2, h3, h4, h5, h6").css("text-shadow", "0 0 20px rgba(0,0,0,0)");
    }
}