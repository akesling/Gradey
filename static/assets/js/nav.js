
function upURL() {
    var s = document.URL;
    var tokens = s.split('/');
    var path = tokens[tokens.length-1];
    var pathArray = path.split("#");
    var newPath = pathArray.slice(0,pathArray.length-1).join("#");
    
    return newPath;

}

$(document).ready(function () {
    $("#upAction").attr("href", upURL());
});
