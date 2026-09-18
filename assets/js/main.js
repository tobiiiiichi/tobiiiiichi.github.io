/* 首页交互：主题切换、滚动出现、导航高亮、头像兜底 */
(function () {
  'use strict';

  var root = document.documentElement;

  /* ── 主题切换 ───────────────────────────────────────────── */
  var toggle = document.getElementById('themeToggle');

  function setTheme(theme) {
    root.dataset.theme = theme;
    try { localStorage.setItem('theme', theme); } catch (e) {}
  }

  if (toggle) {
    toggle.addEventListener('click', function () {
      setTheme(root.dataset.theme === 'light' ? 'dark' : 'light');
    });
  }

  /* ── 滚动时给导航加分隔线 ───────────────────────────────── */
  var nav = document.getElementById('nav');
  var lastY = -1;

  function onScroll() {
    var y = window.scrollY;
    if (y === lastY) return;
    lastY = y;
    if (nav) nav.classList.toggle('is-stuck', y > 8);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── 元素进入视口时浮现 ─────────────────────────────────── */
  var reveals = Array.prototype.slice.call(document.querySelectorAll('.reveal'));

  if (!('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px' });

    reveals.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ── 导航高亮当前所在区块 ───────────────────────────────── */
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav__links a'));
  var sections = links
    .map(function (link) { return document.querySelector(link.getAttribute('href')); })
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (link) {
          link.classList.toggle('is-active', link.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50%' });

    sections.forEach(function (section) { sectionObserver.observe(section); });
  }

  /* ── 头像加载失败就用首字母兜底 ─────────────────────────── */
  var avatar = document.getElementById('avatar');
  if (avatar) {
    avatar.addEventListener('error', function () {
      if (avatar.parentElement) avatar.parentElement.classList.add('is-fallback');
    });
  }

  /* ── 页脚年份 ───────────────────────────────────────────── */
  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
