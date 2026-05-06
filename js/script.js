const API_KEY = "93fbde2a685d45cea6a36af991b6da2e";

// ─── Dynamic Date Helpers ───────────────────────────────────────────────────
function today() {
  return new Date().toISOString().split("T")[0];
}

function daysFromNow(n) {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d.toISOString().split("T")[0];
}

function startOf(unit) {
  const d = new Date();
  if (unit === "week") {
    d.setDate(d.getDate() - d.getDay());
  } else if (unit === "month") {
    d.setDate(1);
  } else if (unit === "year") {
    d.setMonth(0, 1);
  }
  return d.toISOString().split("T")[0];
}

// ─── Core Fetch ─────────────────────────────────────────────────────────────
async function fetchGames(params = {}) {
  const base = "https://api.rawg.io/api/games";
  const query = new URLSearchParams({
    key: API_KEY,
    page_size: 20,
    ordering: "-rating",
    ...params,
  });
  const response = await fetch(`${base}?${query}`);
  if (!response.ok) throw new Error(`API error: ${response.status}`);
  const data = await response.json();
  return data.results || [];
}

// ─── Render ─────────────────────────────────────────────────────────────────
function renderGames(games, container, emptyMsg = "No games found.") {
  container.innerHTML = "";

  if (!games.length) {
    container.innerHTML = `<p class="empty-msg">${emptyMsg}</p>`;
    return;
  }

  const grid = document.createElement("div");
  grid.className = "game-grid";

  games.forEach((game) => {
    const card = document.createElement("div");
    card.className = "game-card";
    card.innerHTML = `
      <div class="card-img-wrap">
        <img src="${game.background_image || "https://placehold.co/400x200/1a1a2e/7c3aed?text=No+Image"}" 
             alt="${game.name}" loading="lazy">
        <div class="card-rating">${game.rating ? "⭐ " + game.rating.toFixed(1) : "—"}</div>
      </div>
      <div class="card-body">
        <h3 class="card-title">${game.name}</h3>
        <div class="card-meta">
          <span>📅 ${game.released || "TBA"}</span>
          <span>🎮 ${
            game.platforms
              ? game.platforms
                  .slice(0, 3)
                  .map((p) => p.platform.name)
                  .join(", ")
              : "N/A"
          }</span>
          <span>🏷️ ${
            game.genres
              ? game.genres
                  .slice(0, 2)
                  .map((g) => g.name)
                  .join(", ")
              : "N/A"
          }</span>
        </div>
      </div>
    `;
    card.addEventListener("click", () => openGameModal(game));
    grid.appendChild(card);
  });

  container.appendChild(grid);
}

// ─── Game Detail Modal ───────────────────────────────────────────────────────
function openGameModal(game) {
  const modal = document.getElementById("gameDetailModal");
  const body = document.getElementById("gameDetailBody");

  body.innerHTML = `
    <img src="${game.background_image || ""}" alt="${game.name}" class="detail-hero">
    <div class="detail-content">
      <h2>${game.name}</h2>
      <div class="detail-stats">
        <div class="stat"><span class="stat-label">Rating</span><span class="stat-value">${game.rating ? "⭐ " + game.rating.toFixed(1) + " / 5" : "N/A"}</span></div>
        <div class="stat"><span class="stat-label">Released</span><span class="stat-value">${game.released || "TBA"}</span></div>
        <div class="stat"><span class="stat-label">Metacritic</span><span class="stat-value">${game.metacritic ? "🏆 " + game.metacritic : "N/A"}</span></div>
        <div class="stat"><span class="stat-label">Playtime</span><span class="stat-value">${game.playtime ? game.playtime + "h avg" : "N/A"}</span></div>
      </div>
      <p><strong>Platforms:</strong> ${game.platforms ? game.platforms.map((p) => p.platform.name).join(", ") : "N/A"}</p>
      <p><strong>Genres:</strong> ${game.genres ? game.genres.map((g) => g.name).join(", ") : "N/A"}</p>
      <p><strong>Tags:</strong> ${
        game.tags
          ? game.tags
              .slice(0, 6)
              .map((t) => `<span class="tag">${t.name}</span>`)
              .join("")
          : "N/A"
      }</p>
      ${game.website ? `<a href="${game.website}" target="_blank" class="visit-btn">🌐 Official Site</a>` : ""}
    </div>
  `;

  modal.classList.add("open");
}

// ─── Search ──────────────────────────────────────────────────────────────────
async function searchGames(query) {
  const container = document.getElementById("game-results");
  container.innerHTML = `<div class="loading-state"><div class="spinner"></div><p>Searching for "${query}"...</p></div>`;

  try {
    // Use search_exact for better results, fall back to fuzzy
    const games = await fetchGames({ search: query, search_exact: true });
    const results = games.length ? games : await fetchGames({ search: query });

    renderGames(results, container, `No games found for "${query}".`);

    if (results.length) saveSearchedGame(results[0]);
  } catch (err) {
    container.innerHTML = `<p class="error-msg">⚠️ Failed to load results. Check your connection and try again.</p>`;
    console.error(err);
  }
}

// ─── Filter Fetchers (all dynamic dates) ─────────────────────────────────────
const FILTER_MAP = {
  // Genres
  action: () => fetchGames({ genres: "action" }),
  adventure: () => fetchGames({ genres: "adventure" }),
  rpg: () => fetchGames({ genres: "role-playing-games-rpg" }),
  shooter: () => fetchGames({ genres: "shooter" }),
  strategy: () => fetchGames({ genres: "strategy" }),
  sports: () => fetchGames({ genres: "sports" }),
  puzzle: () => fetchGames({ genres: "puzzle" }),
  racing: () => fetchGames({ genres: "racing" }),

  // Platforms (RAWG platform IDs)
  playstation: () => fetchGames({ platforms: "187,18,16" }), // PS5, PS4, PS3
  xbox: () => fetchGames({ platforms: "186,1,14" }), // Xbox Series, One, 360
  pc: () => fetchGames({ platforms: "4" }),
  nintendo: () => fetchGames({ platforms: "7,83" }), // Switch, Switch Lite
  mobile: () => fetchGames({ platforms: "21,3" }), // Android, iOS

  // Releases — all dynamically computed
  "this-year": () =>
    fetchGames({ dates: `${startOf("year")},${today()}`, ordering: "-added" }),
  "this-month": () =>
    fetchGames({ dates: `${startOf("month")},${today()}`, ordering: "-added" }),
  "this-week": () =>
    fetchGames({ dates: `${startOf("week")},${today()}`, ordering: "-added" }),
  "last-30": () =>
    fetchGames({ dates: `${daysFromNow(-30)},${today()}`, ordering: "-added" }),
  "next-30": () =>
    fetchGames({
      dates: `${today()},${daysFromNow(30)}`,
      ordering: "-released",
    }),

  // Developers
  developers: () => displayDevelopers(),
};

async function handleFilter(id) {
  const container = document.getElementById("game-results");

  if (id === "developers") {
    await displayDevelopers();
    return;
  }

  const fetcher = FILTER_MAP[id];
  if (!fetcher) return;

  container.innerHTML = `<div class="loading-state"><div class="spinner"></div><p>Loading...</p></div>`;

  try {
    const games = await fetcher();
    renderGames(games, container);
  } catch (err) {
    container.innerHTML = `<p class="error-msg">⚠️ Failed to load. Try again.</p>`;
    console.error(err);
  }
}

// ─── Developers ──────────────────────────────────────────────────────────────
async function displayDevelopers() {
  const container = document.getElementById("game-results");
  container.innerHTML = `<div class="loading-state"><div class="spinner"></div><p>Loading developers...</p></div>`;

  try {
    const url = `https://api.rawg.io/api/developers?key=${API_KEY}&page_size=20`;
    const res = await fetch(url);
    const data = await res.json();
    const devs = data.results || [];

    container.innerHTML = "";
    const grid = document.createElement("div");
    grid.className = "dev-grid";

    devs.forEach((dev) => {
      const card = document.createElement("div");
      card.className = "dev-card";
      card.innerHTML = `
        <img src="${dev.image_background || "https://placehold.co/300x150/1a1a2e/7c3aed?text=" + encodeURIComponent(dev.name)}" alt="${dev.name}">
        <div class="dev-info">
          <h4>${dev.name}</h4>
          <p>${dev.games_count || 0} games</p>
        </div>
      `;
      card.addEventListener("click", async () => {
        const games = await fetchGames({ developers: dev.id });
        renderGames(games, container, `No games found for ${dev.name}.`);
      });
      grid.appendChild(card);
    });

    container.appendChild(grid);
  } catch (err) {
    container.innerHTML = `<p class="error-msg">⚠️ Failed to load developers.</p>`;
  }
}

// ─── Previously Searched ─────────────────────────────────────────────────────
function saveSearchedGame(game) {
  const prev = JSON.parse(localStorage.getItem("previousSearches")) || [];
  const filtered = prev.filter((g) => g.id !== game.id);
  filtered.unshift(game);
  const trimmed = filtered.slice(0, 3);
  localStorage.setItem("previousSearches", JSON.stringify(trimmed));
  renderPreviousSearches();
}

function renderPreviousSearches() {
  const container = document.getElementById("previous-searches");
  const prev = JSON.parse(localStorage.getItem("previousSearches")) || [];

  container.innerHTML = `<h3 class="sidebar-title">🕹️ Recent Searches</h3>`;

  if (!prev.length) {
    container.innerHTML += `<p class="sidebar-empty">No searches yet.</p>`;
    return;
  }

  prev.forEach((game) => {
    const item = document.createElement("div");
    item.className = "sidebar-item";
    item.innerHTML = `
      <img src="${game.background_image || ""}" alt="${game.name}">
      <div>
        <strong>${game.name}</strong>
        <span>${game.released || "TBA"}</span>
      </div>
    `;
    item.addEventListener("click", () => searchGames(game.name));
    container.appendChild(item);
  });

  const clearBtn = document.createElement("button");
  clearBtn.className = "sidebar-clear";
  clearBtn.textContent = "Clear History";
  clearBtn.addEventListener("click", () => {
    localStorage.removeItem("previousSearches");
    renderPreviousSearches();
  });
  container.appendChild(clearBtn);
}

// ─── Event Listeners ──────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  renderPreviousSearches();

  // Search form
  document
    .getElementById("game-search-form")
    ?.addEventListener("submit", (e) => {
      e.preventDefault();
      const query = document.getElementById("search-input").value.trim();
      if (query) searchGames(query);
    });

  // All filter buttons
  Object.keys(FILTER_MAP).forEach((id) => {
    document
      .getElementById(id)
      ?.addEventListener("click", () => handleFilter(id));
  });

  // Game detail modal close
  document.getElementById("closeGameDetail")?.addEventListener("click", () => {
    document.getElementById("gameDetailModal")?.classList.remove("open");
  });
  document.getElementById("gameDetailModal")?.addEventListener("click", (e) => {
    if (e.target === e.currentTarget) e.currentTarget.classList.remove("open");
  });

  // Compare modal
  document.getElementById("openCompareModal")?.addEventListener("click", () => {
    document.getElementById("compareModal")?.classList.add("open");
  });
  document
    .getElementById("closeCompareModal")
    ?.addEventListener("click", () => {
      document.getElementById("compareModal")?.classList.remove("open");
    });
});
