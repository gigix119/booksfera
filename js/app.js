/**
 * Booksfera — subtle scroll reveals + newsletter stub
 */
(function () {
  "use strict";

  var prefersReduced =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function initReveal() {
    var nodes = document.querySelectorAll("[data-reveal]");
    if (prefersReduced) {
      nodes.forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }

    if (!nodes.length || !("IntersectionObserver" in window)) {
      nodes.forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    nodes.forEach(function (el) {
      io.observe(el);
    });
  }

  function initNewsletter(form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var input = form.querySelector('input[type="email"]');
      if (input && input.value.trim()) {
        form.reset();
        var btn = form.querySelector('button[type="submit"]');
        var original = btn ? btn.textContent : "";
        if (btn) {
          btn.textContent = "Thank you";
          btn.disabled = true;
          window.setTimeout(function () {
            btn.textContent = original;
            btn.disabled = false;
          }, 2400);
        }
      }
    });
  }

  function initBookSectionNav() {
    var nav = document.querySelector("[data-book-nav]");
    if (!nav) return;

    var links = nav.querySelectorAll("a[data-section-id]");
    var sections = document.querySelectorAll("[data-book-section]");
    if (!links.length || !sections.length) return;

    function setActive(id) {
      links.forEach(function (link) {
        var sid = link.getAttribute("data-section-id");
        var on = sid === id;
        link.classList.toggle("is-active", on);
        if (on) {
          link.setAttribute("aria-current", "true");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    }

    links.forEach(function (link) {
      link.addEventListener("click", function () {
        var id = link.getAttribute("data-section-id");
        if (id) setActive(id);
      });
    });

    if (prefersReduced || !("IntersectionObserver" in window)) {
      return;
    }

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && entry.target.id) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-42% 0px -48% 0px", threshold: 0 }
    );

    sections.forEach(function (sec) {
      io.observe(sec);
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initReveal();
    initBookSectionNav();
    var form = document.querySelector("[data-newsletter-form]");
    if (form) initNewsletter(form);
  });
})();
