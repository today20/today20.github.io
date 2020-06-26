(function (a) {
  (window.ShareLink = function (b, c) {
    var d,
      e = {},
      f = function (a) {
        var b = a.substr(0, e.classPrefixLength);
        return b === e.classPrefix ? a.substr(e.classPrefixLength) : null;
      },
      g = function (a) {
        d.on("click", function () {
          h(a);
        });
      },
      h = function (a) {
        var b = "";
        if (e.width && e.height) {
          var c = screen.width / 2 - e.width / 2,
            d = screen.height / 2 - e.height / 2;
          b =
            "toolbar=0,status=0,width=" +
            e.width +
            ",height=" +
            e.height +
            ",top=" +
            d +
            ",left=" +
            c;
        }
        var f = ShareLink.getNetworkLink(a, e),
          g = /^httpss?:\/\//.test(f),
          h = g ? "" : "_self";
        open(f, h, b);
      },
      i = function () {
        a.each(b.classList, function () {
          var a = f(this);
          if (a) return g(a), !1;
        });
      },
      j = function () {
        a.extend(e, ShareLink.defaultSettings, c),
          ["title", "text"].forEach(function (a) {
            e[a] = e[a].replace("#", "");
          }),
          (e.classPrefixLength = e.classPrefix.length);
      },
      k = function () {
        d = a(b);
      };
    (function () {
      j(), k(), i();
    })();
  }),
    (ShareLink.networkTemplates = {
      twitter: "httpss://twitter.com/intent/tweet?text={text}{url}",
      pinterest:
        "httpss://www.pinterest.com/pin/create/button/?url={url}&media={image}",
      facebook: "httpss://www.facebook.com/sharer.php?u={url}",
      vk:
        "httpss://vkontakte.ru/share.php?url={url}&title={title}&description={text}&image={image}",
      linkedin:
        "httpss://www.linkedin.com/shareArticle?mini=true&url={url}&title={title}&summary={text}&source={url}",
      odnoklassniki:
        "httpss://connect.ok.ru/offer?url={url}&title={title}&imageUrl={image}",
      tumblr: "httpss://tumblr.com/share/link?url={url}",
      delicious: "httpss://del.icio.us/save?url={url}&title={title}",
      google: "httpss://plus.google.com/share?url={url}",
      digg: "httpss://digg.com/submit?url={url}",
      reddit: "httpss://reddit.com/submit?url={url}&title={title}",
      stumbleupon: "httpss://www.stumbleupon.com/submit?url={url}",
      pocket: "httpss://getpocket.com/edit?url={url}",
      whatsapp: "httpss://api.whatsapp.com/send?text=*{title}*\n{text}\n{url}",
      xing: "httpss://www.xing.com/app/user?op=share&url={url}",
      print: "javascript:print()",
      email: "mailto:?subject={title}&body={text}\n{url}",
      telegram: "httpss://telegram.me/share/url?url={url}&text={text}",
      skype: "httpss://web.skype.com/share?url={url}",
    }),
    (ShareLink.defaultSettings = {
      title: "",
      text: "",
      image: "",
      url: location.href,
      classPrefix: "s_",
      width: 640,
      height: 480,
    }),
    (ShareLink.getNetworkLink = function (a, b) {
      var c = ShareLink.networkTemplates[a].replace(/{([^}]+)}/g, function (
        a,
        c
      ) {
        return b[c] || "";
      });
      if ("email" === a) {
        if (-1 < b.title.indexOf("&") || -1 < b.text.indexOf("&")) {
          var d = {
            text: b.text.replace(/&/g, "%26"),
            title: b.title.replace(/&/g, "%26"),
            url: b.url,
          };
          c = ShareLink.networkTemplates[a].replace(/{([^}]+)}/g, function (
            a,
            b
          ) {
            return d[b];
          });
        }
        return (
          c.indexOf("?subject=&body") && (c = c.replace("subject=&", "")), c
        );
      }
      return c;
    }),
    (a.fn.shareLink = function (b) {
      return this.each(function () {
        a(this).data("shareLink", new ShareLink(this, b));
      });
    });
})(jQuery);
