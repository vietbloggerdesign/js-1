function newvideo(e) {
  for (var a = 0; a < e.feed.entry.length; a++) {
    for (var t = 0; t < e.feed.entry[a].link.length; t++)
      if ("alternate" == e.feed.entry[a].link[t].rel) {
        var s = e.feed.entry[a].link[t].href;
        break
      }
    for (var i = 0; i < e.feed.entry[a].category.length; i++) var l = e.feed.entry[a].category[i].term,
      r = "/search/label/" + l;
    var o = e.feed.entry[a].author[0].name.$t,
      n = e.feed.entry[a].published.$t,
      c = n.substring(8, 10) + "/" + n.substring(5, 7) + "/" + n.substring(0, 4) + " " + n.substring(11, 16),
      d = e.feed.entry[a].title.$t,
      p = e.feed.entry[a].summary.$t.substring(0, 200),
      u = e.feed.entry[a].media$thumbnail.url.replace("https://img.youtube.com/vi/", "").replace("/default.jpg", ""),
      f = "https://www.youtube.com/embed/" + u + "?loop=1&controls=1&rel=0&fs=1&showinfo=0&cc_load_policy=1&iv_load_policy=3&modestbranding=1&enablejsapi=1";
    $.ajax({
      url: "https://www.googleapis.com/youtube/v3/videos?id=" + u + "&key=AIzaSyDlhyGM9OIP0ahzlV1JIAFuURW9ksxud1Q&part=statistics",
      type: "get",
      dataType: "json",
      success: function(e) {
        var a, t = e.items[0].statistics.viewCount;
        $(".view-count").html((a = t) >= 1e9 ? (a / 1e9).toFixed(1).replace(/\.0$/, "") + " T" : a >= 1e6 ? (a / 1e6).toFixed(1).replace(/\.0$/, "") + " TR" : a >= 1e3 ? (a / 1e3).toFixed(1).replace(/\.0$/, "") + " N" : a)
      }
    });
    var h = '<div class="video-player"><div class="video-container"><iframe id="player" frameborder="0" allowfullscreen="1" allow="autoplay; encrypted-media" src=' + f + '></iframe></div></div><div class="video-info"><p class="video-label"><a href="' + r + '" title="' + l + '">' + l + '</a></p><h2 class="video-title">' + d + '</h2><p class="video-meta"><span class="publish">' + c + '</span><span class="view-count"></span></p><p class="video-summary">' + p + '...</p><p class="video-author">' + o + '</p><ul class="shareSocial"><li><a class="social-wrapper" data-href=' + ("https://plus.google.com/share?url=" + s) + ' title="Chia sẻ với Google+"><span class="google-plus-icon social-icon"></span></a></li><li><a class="social-wrapper" data-href=' + ("http://twitter.com/share?text=" + d + "&amp;url=" + s + "&amp;via=blogger") + ' title="Chia sẻ với Twitter"><span class="twitter-icon social-icon"></a></span></li><li><a class="social-wrapper" data-href=' + ("https://www.facebook.com/sharer.php?u=" + s) + ' title="Chia sẻ với Facebook"><span class="facebook-icon social-icon"></span></a></li></ul></div>';
    document.write(h)
  }
}

function category(e) {
  document.write("<ul>");
  for (var a = 0; a < e.feed.entry.length; a++) {
    for (var t = 0; t < e.feed.entry[a].link.length; t++)
      if ("alternate" == e.feed.entry[a].link[t].rel) {
        var s = e.feed.entry[a].link[t].href;
        break
      }
    var i, l = e.feed.entry[a].published.$t,
      r = l.substring(8, 10) + "/" + l.substring(5, 7) + "/" + l.substring(0, 4),
      o = e.feed.entry[a].title.$t,
      n = e.feed.entry[a].author[0].name.$t,
      c = e.feed.entry[a].media$thumbnail.url;
    try {
      i = c.replace("default", "mqdefault")
    } catch (e) {
      i = "https://4.bp.blogspot.com/-00O66C-eBQs/W0IcokXSnOI/AAAAAAAAL_k/g4KtDm7SkQsoe7_G0vZ_C_nU0Gf_-kyVQCLcBGAs/s1600/safe_image.png"
    }
    var d = '<li><div class="video_thumb"><a href=' + s + ' title="' + o + '"><img alt="' + o + '" src=' + i + '></img><span class="duration_video" title="Play"><span class="play_ico"><i class="fa fa-play" aria-hidden="true"></i></span></span></a></div><h2 class="video_title"><a href=' + s + ' title="' + o + '">' + o + '</a></h2><div class="video_meta"><span class="publish">' + r + '</span><span class="video_author">' + n + "</span></div></li>";
    document.write(d)
  }
  document.write("</ul>")
}
