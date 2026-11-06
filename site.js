(function () {
  "use strict";
  var REL = "https://github.com/kanthurijaswanth/opendesk/releases/download/v1.3.0/";
  var WIN = { href: REL + "OpenDesk-Remote-1.3.0-Setup.exe", label: "Download for Windows", meta: "Windows 10 and 11 · 79 MB" };
  var DEB = { href: REL + "OpenDesk-Remote-1.3.0.deb", label: "Download for Ubuntu", meta: "Ubuntu / Debian · 104 MB" };

  // Main button matches the visitor's computer; the second button offers the other one.
  var ua = (navigator.userAgentData && navigator.userAgentData.platform) || navigator.platform || navigator.userAgent || "";
  var linux = /linux|ubuntu|x11/i.test(ua) && !/android/i.test(navigator.userAgent);
  var main = linux ? DEB : WIN, alt = linux ? WIN : DEB;
  var $ = function (id) { return document.getElementById(id); };
  if ($("dlMain")) {
    $("dlMain").href = main.href; $("dlMainLabel").textContent = main.label; $("dlMeta").textContent = main.meta;
    $("dlAlt").href = alt.href; $("dlAltLabel").textContent = linux ? "Windows (.exe)" : "Ubuntu (.deb)";
  }

  // Screen tour tabs
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.tabs [role="tab"]'));
  var img = $("tourImg"), cap = $("tourCap"), panel = $("p-tour");
  // Warm the cache so switching is instant.
  tabs.forEach(function (t) { var i = new Image(); i.src = "assets/shots/" + t.dataset.shot + ".png"; });
  function select(t, focus) {
    tabs.forEach(function (x) { var on = x === t; x.setAttribute("aria-selected", on); x.tabIndex = on ? 0 : -1; });
    panel.setAttribute("aria-labelledby", t.id);
    img.classList.add("fading");
    setTimeout(function () {
      img.src = "assets/shots/" + t.dataset.shot + ".png";
      img.alt = t.dataset.cap;
      cap.textContent = t.dataset.cap;
      img.classList.remove("fading");
    }, 120);
    if (focus) t.focus();
  }
  tabs.forEach(function (t, i) {
    t.tabIndex = i === 0 ? 0 : -1;
    t.addEventListener("click", function () { select(t); });
    t.addEventListener("keydown", function (e) {
      var k = e.key, n = tabs.length, j = -1;
      if (k === "ArrowRight") j = (i + 1) % n; else if (k === "ArrowLeft") j = (i - 1 + n) % n; else if (k === "Home") j = 0; else if (k === "End") j = n - 1;
      if (j >= 0) { e.preventDefault(); select(tabs[j], true); }
    });
  });
  if (img && tabs[0]) img.alt = tabs[0].dataset.cap;
})();
