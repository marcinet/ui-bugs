(() => {
  const SEVERITY_LABEL = { high: "High", medium: "Medium", low: "Low" };

  function renderBugCard(bug) {
    const card = document.createElement("article");
    card.className = `bug-card severity-${bug.severity}`;

    card.innerHTML = `
      <div class="bug-card__header">
        <span class="bug-card__category">${escapeHtml(bug.category)}</span>
        <span class="bug-card__severity severity-badge severity-badge--${bug.severity}">${SEVERITY_LABEL[bug.severity]}</span>
      </div>
      <h2 class="bug-card__title">${escapeHtml(bug.title)}</h2>
      <p class="bug-card__description">${escapeHtml(bug.description)}</p>
      <time class="bug-card__date" datetime="${escapeHtml(bug.date)}">${formatDate(bug.date)}</time>
    `;

    return card;
  }

  function formatDate(dateStr) {
    const d = new Date(dateStr + "T00:00:00");
    return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function filterBugs(list, { search, severity, category }) {
    return list.filter((bug) => {
      const matchSearch =
        !search ||
        bug.title.toLowerCase().includes(search) ||
        bug.description.toLowerCase().includes(search);
      const matchSeverity = !severity || bug.severity === severity;
      const matchCategory = !category || bug.category === category;
      return matchSearch && matchSeverity && matchCategory;
    });
  }

  function render() {
    const grid = document.getElementById("bug-grid");
    const emptyState = document.getElementById("empty-state");
    const search = document.getElementById("search").value.trim().toLowerCase();
    const severity = document.getElementById("filter-severity").value;
    const category = document.getElementById("filter-category").value;

    const filtered = filterBugs(bugs, { search, severity, category });

    grid.innerHTML = "";

    if (filtered.length === 0) {
      emptyState.hidden = false;
    } else {
      emptyState.hidden = true;
      filtered.forEach((bug) => grid.appendChild(renderBugCard(bug)));
    }

    document.getElementById("bug-count").textContent =
      filtered.length === bugs.length
        ? `${bugs.length} bug${bugs.length !== 1 ? "s" : ""}`
        : `${filtered.length} of ${bugs.length} bug${bugs.length !== 1 ? "s" : ""}`;
  }

  function populateCategoryFilter() {
    const select = document.getElementById("filter-category");
    const categories = [...new Set(bugs.map((b) => b.category))].sort();
    categories.forEach((cat) => {
      const opt = document.createElement("option");
      opt.value = cat;
      opt.textContent = cat;
      select.appendChild(opt);
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    populateCategoryFilter();
    render();

    document.getElementById("search").addEventListener("input", render);
    document.getElementById("filter-severity").addEventListener("change", render);
    document.getElementById("filter-category").addEventListener("change", render);
  });
})();
