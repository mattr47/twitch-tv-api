$(document).ready(function() {

  var channelUrl = 'https://wind-bow.glitch.me/twitch-api/channels/';
  var streamUrl = 'https://wind-bow.glitch.me/twitch-api/streams/';
  var userUrl = 'https://wind-bow.glitch.me/twitch-api/users/';
  var twitchUsers = ["freecodecamp", "captain_richard", "ESL_SC2", "brunofin", "comster404"];

  $.getJSON(streamUrl + "freecodecamp", function(response1) {
    if (response1.stream===null) {
      $("#fccStatus").html("FreeCodeCamp is currently OFFLINE");
    } else {
      $("#fccStatus").html("FreeCodeCamp is currently ONLINE");
    }

  });
  for (var i = 0; i < twitchUsers.length; i++) {
    (function(i) {
      $.getJSON(userUrl + twitchUsers[i], function(response2) {
        var logo;
        var status;
        var name;
        var stream;
        if (response2.error) {
          logo = "https://dev.mattrogie.com/images/error.png";
          $("#channelInfo").prepend("<div id='" + twitchUsers[i] + "' class='row'>" + "<div class='col-md-2'>" + "<img src='" + logo + "' alt='Error' height='75'>" + "</div>" + "<div class='col-md-3'>" + twitchUsers[i] + "</div>" + "<div class='col-md-3'>" + response2.message + "</div>" + "<div class='col-md-3'>" + response2.error + "</div>");
        } else {
          $.getJSON(streamUrl + twitchUsers[i], function(response3) {
            if (response3.stream != null) {
              logo = response3.stream.channel.logo;
              status = response3.stream.channel.status;
              name = response3.stream.channel.display_name;
              stream = "ONLINE";
              $("#channelInfo").prepend("<div id='" + twitchUsers[i] + "'class='row'>" + "<div class='col-md-2'>" + "<img src='" + logo + "' alt='Logo' height='75'>" + "</div>" + "<div class='col-md-3'>" + name + "</div>" + "<div class='col-md-3'>" + status + "</div>" + "<div class='col-md-3'>" + stream + "</div>");
            } else {
              $.getJSON(channelUrl + twitchUsers[i], function(response4) {
                logo = response4.logo;
                status = response4.status;
                name = response4.display_name;
                stream = "OFFLINE";
                $("#channelInfo").prepend("<div id='" + twitchUsers[i] + "'class='row'>" + "<div class='col-md-2'>" + "<img src='" + logo + "' alt='Logo' height='75'>" + "</div>" + "<div class='col-md-3'>" + name + "</div>" + "<div class='col-md-3'>" + status + "</div>" + "<div class='col-md-3'>" + stream + "</div>");
              })
            }
          })
        }
      })
    })(i)
  }
});
