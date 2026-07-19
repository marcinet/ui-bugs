/* app.js — rendering & category-filter logic.
   Data is defined in bugs.js (loaded before this file). */

(function () {
  "use strict";

  /* ── helpers ─────────────────────────────────────────────────── */

  function escapeHtml(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  /** Collect every unique category that appears in BUGS, sorted A-Z. */
  function allCategories(bugs) {
    const set = new Set();
    bugs.forEach(function (bug) {
      bug.categories.forEach(function (c) { set.add(c); });
    });
    return Array.from(set).sort();
  }

  /* ── render filters ──────────────────────────────────────────── */

  function renderFilters(categories, activeFilter, onSelect) {
    var container = document.getElementById("filters");
    container.innerHTML = "";

    var allBtn = document.createElement("button");
    allBtn.className = "filter-btn" + (activeFilter === null ? " active" : "");
    allBtn.textContent = "All";
    allBtn.addEventListener("click", function () { onSelect(null); });
    container.appendChild(allBtn);

    categories.forEach(function (cat) {
      var btn = document.createElement("button");
      btn.className = "filter-btn" + (activeFilter === cat ? " active" : "");
      btn.textContent = cat;
      btn.addEventListener("click", function () { onSelect(cat); });
      container.appendChild(btn);
    });
  }

  /* ── render gallery ──────────────────────────────────────────── */

  function renderGallery(bugs, activeFilter) {
    var container = document.getElementById("gallery");
    container.innerHTML = "";

    var visible = activeFilter
      ? bugs.filter(function (b) { return b.categories.indexOf(activeFilter) !== -1; })
      : bugs;

    if (visible.length === 0) {
      var empty = document.createElement("p");
      empty.className = "empty-message";
      empty.textContent = "No bugs found for the selected category.";
      container.appendChild(empty);
      return;
    }

    visible.forEach(function (bug) {
      var card = document.createElement("article");
      card.className = "bug-card";

      /* image */
      var imgWrap = document.createElement("div");
      imgWrap.className = "bug-card__img-wrap";
      var img = document.createElement("img");
      img.src = bug.image;
      img.alt = escapeHtml(bug.title);
      img.loading = "lazy";
      img.onerror = function () {
        imgWrap.classList.add("bug-card__img-wrap--missing");
        img.remove();
        var placeholder = document.createElement("span");
        placeholder.className = "bug-card__img-placeholder";
        placeholder.textContent = "Image not found";
        imgWrap.appendChild(placeholder);
      };
      imgWrap.appendChild(img);
      card.appendChild(imgWrap);

      /* body */
      var body = document.createElement("div");
      body.className = "bug-card__body";

      var title = document.createElement("h2");
      title.className = "bug-card__title";
      title.textContent = bug.title;
      body.appendChild(title);

      var desc = document.createElement("p");
      desc.className = "bug-card__description";
      desc.textContent = bug.description;
      body.appendChild(desc);

      /* categories */
      var tagList = document.createElement("ul");
      tagList.className = "bug-card__tags";
      bug.categories.forEach(function (cat) {
        var tag = document.createElement("li");
        tag.className = "bug-card__tag";
        tag.textContent = cat;
        tagList.appendChild(tag);
      });
      body.appendChild(tagList);

      card.appendChild(body);
      container.appendChild(card);
    });
  }

  /* ── bootstrap ───────────────────────────────────────────────── */

  function init() {
    if (typeof BUGS === "undefined" || !Array.isArray(BUGS)) {
      document.getElementById("gallery").innerHTML =
        '<p class="empty-message">Error: bugs.js not loaded or BUGS is not defined.</p>';
      return;
    }

    var categories = allCategories(BUGS);
    var activeFilter = null;

    function refresh() {
      renderFilters(categories, activeFilter, function (cat) {
        activeFilter = cat;
        refresh();
      });
      renderGallery(BUGS, activeFilter);
    }

    refresh();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
