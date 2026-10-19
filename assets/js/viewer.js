/* Photo viewer.
   Any <img data-zoom> on a page opens here. Arrows, ← → keys and swipes move through
   every zoomable image on the page, in order. Optional attributes on the <img>:
     data-title  – shown under the photo (falls back to the figure caption, then alt text)
     data-date   – shown next to the title
     data-post   – link to the post the photo belongs to
     data-full   – a larger file to show in the viewer than the one in the grid       */
(function () {
  var viewer = document.querySelector('.viewer');
  if (!viewer) return;
  var stageImg = viewer.querySelector('.v-img');
  var titleEl = viewer.querySelector('.v-title');
  var dateEl = viewer.querySelector('.v-date');
  var postEl = viewer.querySelector('.v-post');
  var countEl = viewer.querySelector('.v-count');
  var prevBtn = viewer.querySelector('.v-prev');
  var nextBtn = viewer.querySelector('.v-next');
  var closeBtn = viewer.querySelector('.v-close');
  var list = [], idx = 0, lastFocus = null;

  function zoomables() { return Array.prototype.slice.call(document.querySelectorAll('img[data-zoom]')); }

  function captionFor(img) {
    if (img.dataset.title) return img.dataset.title;
    var fig = img.closest('figure');
    var cap = fig && fig.querySelector(':scope > figcaption');
    if (cap) return cap.textContent.trim();
    return img.alt || '';
  }

  function srcFor(img) { return img.dataset.full || img.currentSrc || img.src; }

  function show() {
    var img = list[idx];
    stageImg.src = srcFor(img);
    stageImg.alt = img.alt || captionFor(img);
    var title = captionFor(img);
    titleEl.textContent = title;
    titleEl.hidden = !title;
    dateEl.textContent = img.dataset.date || '';
    dateEl.hidden = !img.dataset.date;
    var post = img.dataset.post;
    var here = post && new URL(post, location.href).pathname === location.pathname;
    postEl.hidden = !post || here;
    if (post) postEl.href = post;
    countEl.textContent = (idx + 1) + ' / ' + list.length;
    var single = list.length < 2;
    prevBtn.hidden = nextBtn.hidden = countEl.hidden = single;
    [idx - 1, idx + 1].forEach(function (j) {          // warm up neighbours
      var n = list[(j + list.length) % list.length];
      if (n) { var p = new Image(); p.src = srcFor(n); }
    });
  }

  function open(img) {
    list = zoomables();
    idx = Math.max(0, list.indexOf(img));
    lastFocus = document.activeElement;
    show();
    viewer.hidden = false;
    document.documentElement.classList.add('viewer-open');
    closeBtn.focus();
  }
  function close() {
    viewer.hidden = true;
    stageImg.removeAttribute('src');
    document.documentElement.classList.remove('viewer-open');
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  function step(d) { if (list.length > 1) { idx = (idx + d + list.length) % list.length; show(); } }

  // Make zoomable images reachable by keyboard
  zoomables().forEach(function (img) {
    if (img.closest('[data-open-photo]')) return;      // the row itself is the button
    img.setAttribute('tabindex', '0');
    img.setAttribute('role', 'button');
    if (!img.getAttribute('aria-label')) img.setAttribute('aria-label', 'Open photo' + (captionFor(img) ? ': ' + captionFor(img) : ''));
  });

  document.addEventListener('click', function (e) {
    var t = e.target;
    var row = t.closest && t.closest('[data-open-photo]');
    if (row) { e.preventDefault(); open(row.querySelector('img[data-zoom]')); return; }
    if (t.matches && t.matches('img[data-zoom]')) { e.preventDefault(); open(t); }
  });
  document.addEventListener('keydown', function (e) {
    if (viewer.hidden) {
      if ((e.key === 'Enter' || e.key === ' ') && e.target.matches && e.target.matches('img[data-zoom]')) { e.preventDefault(); open(e.target); }
      return;
    }
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') step(-1);
    else if (e.key === 'ArrowRight') step(1);
    else if (e.key === 'Tab') {                         // keep focus inside the viewer
      var f = Array.prototype.filter.call(viewer.querySelectorAll('button, a[href]'), function (el) { return !el.hidden; });
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  prevBtn.addEventListener('click', function () { step(-1); });
  nextBtn.addEventListener('click', function () { step(1); });
  closeBtn.addEventListener('click', close);
  viewer.addEventListener('click', function (e) {     // click the white space to close
    if (e.target === viewer || e.target.classList.contains('v-stage')) close();
  });

  // Swipe on phones
  var x0 = null, y0 = null;
  viewer.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive: true });
  viewer.addEventListener('touchend', function (e) {
    if (x0 === null) return;
    var dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) step(dx < 0 ? 1 : -1);
    x0 = y0 = null;
  });

  // Respect 'reduce motion': stop looping video teasers
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('video[data-loop]').forEach(function (v) { v.removeAttribute('autoplay'); v.pause(); });
  }
})();
