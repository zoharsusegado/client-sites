(function () {
  'use strict';

  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- Scroll reveal ---- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---- Signature divider draw-in ---- */
  var river = document.getElementById('sig-river');
  var pipe = document.getElementById('sig-pipe');
  var divider = document.querySelector('.signature-divider');

  if (river && pipe && divider) {
    if (reduceMotion) {
      river.style.strokeDasharray = 'none';
      pipe.style.strokeDasharray = 'none';
    } else {
      var riverLen = river.getTotalLength();
      var pipeLen = pipe.getTotalLength();

      [river, pipe].forEach(function (path, i) {
        var len = i === 0 ? riverLen : pipeLen;
        path.style.strokeDasharray = len;
        path.style.strokeDashoffset = len;
      });

      var drawn = false;
      var drawObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && !drawn) {
            drawn = true;

            river.style.transition = 'stroke-dashoffset 1.2s ease-out';
            river.style.strokeDashoffset = '0';

            pipe.style.transition = 'stroke-dashoffset 1.2s ease-out 0.5s';
            pipe.style.strokeDashoffset = '0';

            drawObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.3 });

      drawObserver.observe(divider);
    }
  }
})();
