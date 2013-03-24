
function upURL() {
    var s = document.URL;
 /* "file:///home/rachael/Dev/inBloom/Gradey/assesment.html#user=linda.kim#section=foo.bar#assessment=homework3" */
    var tokens = s.split('/');
 /* ["file:", "", "", "home", "rachael", "Dev", "inBloom", "Gradey", "assesment.html#user=linda.kim#section=foo.bar#assessment=homework3"] */
    var path = tokens[tokens.length-1];
 /* "assesment.html#user=linda.kim#section=foo.bar#assessment=homework3" */

    var pathArray = path.split("#");
 /* ["assesment.html", "user=linda.kim", "section=foo.bar", "assessment=homework3"] */

    var newPath = pathArray.slice(0,pathArray.length-1).join("#");
    
    return newPath;

}

$(document).ready(function () {
    $("#upAction").attr("href", upURL());
});
