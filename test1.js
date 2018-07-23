var relatedTitles = new Array,
  relatedTitlesNum = 0,
  relatedUrls = new Array,
  thumburl = new Array;
  var label = '<data:label.name/>';
  
$.ajax({
  url: '/feeds/posts/default/-/' + label,
  type: 'get',
  dataType: 'jsonp',
  data: {
    'max-results': '9999',
    alt: 'json-in-script'
  },
  success: function(e) {
    for (var t = 0; t < e.feed.entry.length; t++) {
      var l = e.feed.entry[t];
      relatedTitles[relatedTitlesNum] = l.title.$t;
      try {
        thumburl[relatedTitlesNum] = l.gform_foot.url
      } catch (e) {
        s = l.content.$t, a = s.indexOf("<img"), b = s.indexOf('src="', a), c = s.indexOf('"', b + 5), d = s.substr(b + 5, c - b - 5), -1 != a && -1 != b && -1 != c && "" != d ? thumburl[relatedTitlesNum] = d : thumburl[relatedTitlesNum] = "http://2.bp.blogspot.com/-ex3V86fj4dQ/UrCQQa4cLsI/AAAAAAAAFdA/j2FCTmGOrog/s1600/no-thumbnail.png"
      }
      relatedTitles[relatedTitlesNum].length > 35 && (relatedTitles[relatedTitlesNum] = relatedTitles[relatedTitlesNum].substring(0, 100) + "");
      for (var r = 0; r < l.link.length; r++) "alternate" == l.link[r].rel && (relatedUrls[relatedTitlesNum] = l.link[r].href, relatedTitlesNum++)
    }
  }
  function removeRelatedDuplicates_thumbs() {
    for (var e = new Array(0), t = new Array(0), l = new Array(0), r = 0; r < relatedUrls.length; r++) contains_thumbs(e, relatedUrls[r]) || (e.length += 1, e[e.length - 1] = relatedUrls[r], t.length += 1, l.length += 1, t[t.length - 1] = relatedTitles[r], l[l.length - 1] = thumburl[r]);
    relatedTitles = t, relatedUrls = e, thumburl = l
  }

  function contains_thumbs(e, t) {
    for (var l = 0; l < e.length; l++)
      if (e[l] == t) return !0;
    return !1
  }

  function printRelatedLabels_thumbs() {
    for (var e = 0; e < relatedUrls.length; e++) relatedUrls[e] != currentposturl && relatedTitles[e] || (relatedUrls.splice(e, 1), relatedTitles.splice(e, 1), thumburl.splice(e, 1), e--);
    var t = Math.floor((relatedTitles.length - 1) * Math.random());
    e = 0;
    for (relatedTitles.length, document.write('<ul class="box_category">'); e < relatedTitles.length && e < 20 && e < maxresults;) document.write('<li class="item">'), document.write(""), document.write('<div class="related_img"><a title="' + relatedTitles[t] + '" href="' + relatedUrls[t] + '"><img alt="' + relatedTitles[t] + '" src="' + thumburl[t] + '"/></a></div><h4 class="related_title"><a title="' + relatedTitles[t] + '" href="' + relatedUrls[t] + '">' + relatedTitles[t] + "</a></h4></li>"), t < relatedTitles.length - 1 ? t++ : t = 0, e++;
    document.write("</ul>"), relatedUrls.splice(0, relatedUrls.length), thumburl.splice(0, thumburl.length), relatedTitles.splice(0, relatedTitles.length)
  }
});
