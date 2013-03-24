$(document).ready(function () {
    var headers = {
        "Content-Type": "application/vnd.slc+json",
        "Accept": "application/vnd.slc+json",
        "Authorization": "bearer t-4bab26c4-a2f7-49d6-85d2-cc179637385d",
        /*
        "Access-Control-Allow-Origin": "https://api.sandbox.inbloom.org",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "x-requested-with"
        */
    };
    var endpoint = "http://api.sandbox.inbloom.org/api/rest/v1.1/teachers/3abf2b1743a55952f4b558fbdd758d128b8850da_id/teacherSectionAssociations/sections";

/*
    var request = new XMLHttpRequest();
    request.open('GET', endpoint);
    request.onreadystatechange = function() {if (request.readyState==4) alert("It worked!");};
    request.setRequestHeader("Access-Control-Allow-Headers", "x-requested-with")
    for (key in headers) {
        request.setRequestHeader(key, headers[key]);
    }
    request.send();
    */
    $.ajax({
        url: endpoint,
        headers: headers,
        crossDomain: true,
        contentType: "application/vnd.slc+json",
        success: function (data) {
            alert(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {alert("failure");}
    });
});
