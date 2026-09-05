/* SHINE MY CAR — interactions */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var hasGSAP = typeof window.gsap !== "undefined";
  if (hasGSAP && window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

  document.addEventListener("DOMContentLoaded", function () {
    initHeader();
    initMobileNav();
    initHeroGlow();
    initPhotoShine();
    initReveals();
    initCounters();
    initViewer3D();
    initFAQ();
    initYear();
  });

  /* ---------- Sticky header ---------- */
  function initHeader() {
    var header = document.querySelector(".site-header");
    if (!header) return;
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 30);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Mobile nav drawer ---------- */
  function initMobileNav() {
    var toggle = document.querySelector(".nav-toggle");
    var drawer = document.querySelector(".mobile-nav");
    if (!toggle || !drawer) return;
    var close = drawer.querySelector(".close-btn");
    var links = drawer.querySelectorAll("a");
    var open = function () {
      drawer.classList.add("is-open");
      document.body.classList.add("nav-open");
      document.body.style.overflow = "hidden";
    };
    var shut = function () {
      drawer.classList.remove("is-open");
      document.body.classList.remove("nav-open");
      document.body.style.overflow = "";
    };
    toggle.addEventListener("click", open);
    if (close) close.addEventListener("click", shut);
    links.forEach(function (a) { a.addEventListener("click", shut); });
  }

  /* ---------- Hero mouse-follow glow ---------- */
  function initHeroGlow() {
    var hero = document.querySelector(".hero");
    var glow = document.querySelector(".hero-glow");
    if (!hero || !glow || reduceMotion) return;
    hero.addEventListener("pointermove", function (e) {
      var r = hero.getBoundingClientRect();
      var x = ((e.clientX - r.left) / r.width) * 100;
      var y = ((e.clientY - r.top) / r.height) * 100;
      glow.style.setProperty("--mx", x + "%");
      glow.style.setProperty("--my", y + "%");
    });
  }

  /* ---------- Hero photo shine sweep ---------- */
  function initPhotoShine() {
    var shine = document.querySelector(".photo-shine");
    if (!shine || reduceMotion) return;

    if (hasGSAP) {
      gsap.fromTo(
        shine,
        { x: "-140%" },
        { x: "260%", duration: 2.2, ease: "power1.inOut", repeat: -1, repeatDelay: 3.4, delay: 0.6 }
      );
    } else {
      shine.style.transition = "transform 2.2s ease-in-out";
      shine.style.transform = "translateX(260%)";
    }
  }

  /* ---------- Scroll reveals ---------- */
  function initReveals() {
    var items = document.querySelectorAll(".reveal");
    if (!items.length) return;

    if (hasGSAP && window.ScrollTrigger && !reduceMotion) {
      items.forEach(function (el, i) {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          delay: (i % 3) * 0.08,
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });
    } else {
      items.forEach(function (el) {
        el.style.opacity = 1;
        el.style.transform = "none";
      });
    }
  }

  /* ---------- Animated counters ---------- */
  function initCounters() {
    var counters = document.querySelectorAll("[data-count]");
    if (!counters.length) return;

    var animate = function (el) {
      var target = parseFloat(el.getAttribute("data-count"));
      var suffix = el.getAttribute("data-suffix") || "";
      var decimals = el.getAttribute("data-decimals") ? parseInt(el.getAttribute("data-decimals"), 10) : 0;
      var obj = { val: 0 };
      if (hasGSAP && !reduceMotion) {
        gsap.to(obj, {
          val: target,
          duration: 1.8,
          ease: "power2.out",
          onUpdate: function () {
            el.textContent = obj.val.toFixed(decimals) + suffix;
          },
        });
      } else {
        el.textContent = target.toFixed(decimals) + suffix;
      }
    };

    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              animate(entry.target);
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.6 }
      );
      counters.forEach(function (c) { io.observe(c); });
    } else {
      counters.forEach(animate);
    }
  }

  /* ---------- 3D viewer: gated load, condition slider, camera presets ---------- */
  function initViewer3D() {
    var gate = document.getElementById("viewer3dGate");
    var startBtn = document.getElementById("viewer3dStart");
    var mv = document.getElementById("viewer3dEl");
    var controls = document.getElementById("viewer3dControls");
    var slider = document.getElementById("viewer3dSlider");
    var camBtns = document.querySelectorAll(".btn-cam");
    if (!gate || !startBtn || !mv || !controls || !slider) return;

    // [dirty, clean] pairs per material name: baseColorFactor, roughnessFactor, metallicFactor
    var STATES = {
      CarPaintWhite:      { base: [[0.16,0.155,0.15,1], [0.012,0.012,0.014,1]], rough: [0.75, 0.02], metal: [0.0, 0.0] },
      CarPaintBlack:      { base: [[0.14,0.135,0.13,1], [0.006,0.006,0.007,1]], rough: [0.7, 0.04], metal: [0.0, 0.0] },
      Rims:               { base: [[0.24,0.22,0.19,1], [0.86,0.87,0.89,1]], rough: [0.75, 0.06], metal: [0.4, 1.0] },
      ChromeRims:         { base: [[0.27,0.25,0.22,1], [0.92,0.93,0.95,1]], rough: [0.65, 0.04], metal: [0.4, 1.0] },
      ChromeLogos:        { base: [[0.35,0.34,0.32,1], [0.9,0.91,0.92,1]],  rough: [0.6, 0.1], metal: [0.3, 0.9] },
      Pneumatic:          { base: [[0.32,0.32,0.32,1], [0.4872179357247357,0.4872179357247357,0.4872179357247357,1]], rough: [1.0, 1.0], metal: [0.0, 0.0] },
      WhiteClothCouches:  { base: [[0.45,0.42,0.36,1], [1,1,1,1]],   rough: [1.0, 1.0], metal: [0.0, 0.0] },
      GrayClothCouches:   { base: [[0.5,0.48,0.44,1], [0.9,0.9,0.9,1]], rough: [1.0, 1.0], metal: [0.0, 0.0] },
      InteriorWood:       { base: [[0.4,0.36,0.3,1], [1,1,1,1]],     rough: [1.0, 1.0], metal: [0.0, 0.0] },
      DashPatternPlastic: { base: [[0.35,0.33,0.3,1], [0.009615739678686761,0.009615739678686761,0.009615739678686761,1]], rough: [0.9, 0.5], metal: [0.0, 0.0] },
      SteeringWheel:      { base: [[0.55,0.5,0.46,1], [1,1,1,1]],    rough: [0.8, 0.3], metal: [0.0, 0.0] },
      Plastic45:          { base: [[0.4,0.38,0.35,1], [0.14,0.14,0.15,1]], rough: [0.95, 0.4], metal: [0.0, 0.0] },
      Plastic25:          { base: [[0.4,0.38,0.35,1], [0.14,0.14,0.15,1]], rough: [0.95, 0.4], metal: [0.0, 0.0] },
      WhitePlastic:       { base: [[0.45,0.43,0.4,1], [0.75,0.76,0.77,1]], rough: [0.9, 0.45], metal: [0.0, 0.0] },
      BlackNoSplecular:   { base: [[0.35,0.33,0.31,1], [0.11,0.11,0.12,1]], rough: [0.85, 0.55], metal: [0.0, 0.0] },
      CarUnderBlack:      { base: [[0.3,0.29,0.27,1], [0.12,0.12,0.13,1]], rough: [0.95, 0.75], metal: [0.0, 0.0] },
      RoofCloth:          { base: [[0.55,0.5,0.42,1], [1,1,1,1]],   rough: [1.0, 0.95], metal: [0.0, 0.0] },
      CarpetSpecial:      { base: [[0.5,0.46,0.4,1], [0.16,0.16,0.17,1]], rough: [1.0, 0.9], metal: [0.0, 0.0] },
      InteriorFloor:      { base: [[0.65,0.62,0.56,1], [0.5418421816066745,0.5418421816066745,0.5418421816066745,1]], rough: [1.0, 0.85], metal: [0.0, 0.0] },
      "Buttons-Detailtext": { base: [[0.55,0.52,0.47,1], [1,1,1,1]], rough: [0.85, 0.4], metal: [0.0, 0.0] },
      SeatBelt:           { base: [[0.55,0.52,0.48,1], [1,1,1,1]],  rough: [0.9, 0.55], metal: [0.0, 0.0] },
    };

    var CAMS = {
      exterior: { orbit: "5deg 78deg 90%", target: "auto" },
      interior: { orbit: "5deg 80deg 26%", target: "133.16m 125m 1.31m" },
      wheel:    { orbit: "33.2deg 116deg 59%", target: "auto" },
    };

    function lerp(a, b, t) { return a + (b - a) * t; }
    function lerpArr(a, b, t) { return a.map(function (v, i) { return lerp(v, b[i], t); }); }

    function applyState(t) {
      var materials = mv.model && mv.model.materials;
      if (!materials) return;
      materials.forEach(function (mat) {
        var cfg = STATES[mat.name];
        if (!cfg) return;
        mat.pbrMetallicRoughness.setBaseColorFactor(lerpArr(cfg.base[0], cfg.base[1], t));
        mat.pbrMetallicRoughness.setRoughnessFactor(lerp(cfg.rough[0], cfg.rough[1], t));
        mat.pbrMetallicRoughness.setMetallicFactor(lerp(cfg.metal[0], cfg.metal[1], t));
      });
    }

    startBtn.addEventListener("click", function () {
      gate.style.display = "none";
      mv.hidden = false;
      mv.src = "assets/3d-optimized/honda-e.glb";
      mv.addEventListener("load", function onLoad() {
        mv.removeEventListener("load", onLoad);
        applyState(parseFloat(slider.value) / 100);
        controls.hidden = false;
        // hide baked ground decals (model's "Honda e" floor text + artist watermark) —
        // model-viewer's own dynamic contact shadow (shadow-intensity) already grounds the car
        ["SombraSuelo", "Xlay3d"].forEach(function (name) {
          var mat = mv.model && mv.model.materials.find(function (m) { return m.name === name; });
          if (mat) mat.pbrMetallicRoughness.setBaseColorFactor([0, 0, 0, 0]);
        });
      });
    }, { once: true });

    slider.addEventListener("input", function () {
      applyState(parseFloat(slider.value) / 100);
    });

    camBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        camBtns.forEach(function (b) { b.classList.remove("is-active"); });
        btn.classList.add("is-active");
        var cfg = CAMS[btn.getAttribute("data-cam")];
        if (!cfg) return;
        mv.cameraOrbit = cfg.orbit;
        mv.cameraTarget = cfg.target;
      });
    });
  }

  /* ---------- FAQ accordion ---------- */
  function initFAQ() {
    var items = document.querySelectorAll(".faq-item");
    items.forEach(function (item) {
      var btn = item.querySelector(".faq-q");
      var panel = item.querySelector(".faq-a");
      if (!btn || !panel) return;
      btn.addEventListener("click", function () {
        var isOpen = item.classList.contains("is-open");
        items.forEach(function (other) {
          other.classList.remove("is-open");
          other.querySelector(".faq-a").style.maxHeight = null;
        });
        if (!isOpen) {
          item.classList.add("is-open");
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      });
    });
  }

  function initYear() {
    var el = document.getElementById("year");
    if (el) el.textContent = new Date().getFullYear();
  }
})();
