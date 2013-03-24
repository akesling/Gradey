$(document).ready(function () {
    $.ajax({
        url: "/foo",
        contentType: "application/vnd.slc+json",
        success: function (data) {
            alert(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {alert("failure");}
    });
});
