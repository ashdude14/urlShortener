document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("shortenBtn").addEventListener("click", function() {
        var longUrl = document.getElementById("longUrl").value;
        var request = new XMLHttpRequest();
        request.open("POST", "https://url-shortener-wnom.vercel.app/url", true);
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        request.onload = function() {
            if (request.status >= 200 && request.status < 400) {
                var response = JSON.parse(request.responseText);
                var shortenedUrl = response.shortUrl;
                document.getElementById("shortenedUrl").innerHTML = "<label>Shortened URL:</label><a href='" + shortenedUrl + "' target='_blank'>" + shortenedUrl + "</a>";
            } else {
                console.error("Failed to shorten URL");
            }
        };
        request.onerror = function() {
            console.error("Error occurred while making the request");
        };
        request.send(JSON.stringify({ url: longUrl }));
    });
});
