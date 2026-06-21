// search.js — client-side search + tag filter on /posts/
(function () {
  'use strict';

  var input = document.getElementById('q');
  var list = document.getElementById('post-list');
  var count = document.getElementById('search-count');
  var empty = document.getElementById('empty-state');
  var filterButtons = document.querySelectorAll('.tag--filter');

  if (!input || !list) return;

  var rows = Array.prototype.slice.call(list.querySelectorAll('.post-row'));
  var total = rows.length;
  var activeTag = 'all';
  var query = '';
  var idx = null;
  var docMap = {};

  function urlOf(row) {
    var a = row.querySelector('a[href]');
    return a ? a.getAttribute('href') : '';
  }

  function buildIndex() {
    if (typeof lunr === 'undefined') return;
    var base = (document.querySelector('link[rel="stylesheet"]') || {}).href || '';
    var searchJsonUrl = (document.body.dataset.baseurl || '') + '/search.json';
    // Fallback: derive from current path
    if (!document.body.dataset.baseurl) {
      var parts = location.pathname.split('/');
      // posts page sits at /<base>/posts/ — search.json at /<base>/search.json
      var pathParts = parts.filter(Boolean);
      if (pathParts[pathParts.length - 1] === 'posts' || pathParts[pathParts.length - 1] === '') pathParts.pop();
      searchJsonUrl = '/' + (pathParts.length ? pathParts.join('/') + '/' : '') + 'search.json';
    }

    fetch(searchJsonUrl)
      .then(function (r) { return r.ok ? r.json() : []; })
      .then(function (docs) {
        idx = lunr(function () {
          this.ref('url');
          this.field('title', { boost: 5 });
          this.field('tags', { boost: 3 });
          this.field('description', { boost: 2 });
          this.field('body');
          docs.forEach(function (d) {
            docMap[d.url] = d;
            this.add(d);
          }, this);
        });
        if (query) apply();
      })
      .catch(function () { /* search will degrade to substring match */ });
  }

  function matchesQuery(row) {
    if (!query) return true;
    if (idx) {
      var hits = {};
      try {
        idx.search(query + '*').forEach(function (h) { hits[h.ref] = true; });
      } catch (e) {
        idx.search(query).forEach(function (h) { hits[h.ref] = true; });
      }
      return !!hits[urlOf(row)];
    }
    // Fallback: substring on the data-search attribute
    return (row.dataset.search || '').indexOf(query.toLowerCase()) !== -1;
  }

  function matchesTag(row) {
    if (activeTag === 'all') return true;
    var tags = (row.dataset.tags || '').split(/\s+/);
    return tags.indexOf(activeTag) !== -1;
  }

  function apply() {
    var visible = 0;
    rows.forEach(function (row) {
      var show = matchesQuery(row) && matchesTag(row);
      row.style.display = show ? '' : 'none';
      if (show) visible++;
    });
    if (count) {
      count.textContent = visible + ' / ' + total + ' posts';
    }
    if (empty) empty.hidden = visible !== 0;
  }

  input.addEventListener('input', function () {
    query = input.value.trim().toLowerCase();
    apply();
  });

  filterButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      activeTag = btn.dataset.tag || 'all';
      filterButtons.forEach(function (b) { b.classList.remove('tag--active'); });
      btn.classList.add('tag--active');
      apply();
    });
  });

  // Build Lunr index on idle (after page is interactive)
  if ('requestIdleCallback' in window) {
    requestIdleCallback(buildIndex);
  } else {
    setTimeout(buildIndex, 200);
  }
})();
