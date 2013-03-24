$(document).ready(function () {
    $.ajax({
        url: "/foo",
        contentType: "application/vnd.slc+json",
        success: function (data) {
            sections = JSON.parse(data).map(function(d) {
                return '<div class="row"><div class="span1"></div><div class="span9"><div class="well"><a href="class.html#user=userID#section=sectionID"><h3>'+d.uniqueSectionCode+'</h3></a>'+'<p>Class size: '+Math.floor(100*Math.random())+'</p><p>Class avg: '+Math.floor(100*Math.random())+'</p></div> </div></div>';
            });
            $("#sections").html(sections.join("\n"))
        },
        error: function(jqXHR, textStatus, errorThrown) {alert("failure");}
    });
});
