const projData = [
  {
    title: "Respiratory Illness Data Pages",
    url: "https://www.nyc.gov/assets/doh/respiratory-illness-data/index.html#/",
    org: "NYC Department of Health",
    role: "Product Lead & Data Visualization Engineer",
    focus: "Led design and build of a public respiratory-virus tracker: chart architecture, interaction design, and a modular React front-end over cross-agency data.",
    impact: "The city's public reference for respiratory-virus trends through every illness season.",
    stack: ["React", "Vega-Lite", "D3", "Azure"],
    img: "respiratory-tracker.png"
  },

  {
    title: "HealthyNYC Data & Indicators Site",
    url: "https://www.nyc.gov/site/doh/about/about-doh/healthynyc.page",
    org: "NYC Department of Health",
    role: "Data Visualization Designer & Engineer",
    focus: "Designed the indicator visualizations and a reusable chart component system behind NYC's healthy-longevity campaign.",
    impact: "The indicator system tracking progress toward the city's healthy-longevity goals.",
    stack: ["Design system", "D3", "Data modeling"],
    img: "healthynyc.png"
  },

  {
    title: "NYC Environmental Health Data Portal",
    url: "https://a816-dohbesp.nyc.gov/IndicatorPublic/",
    org: "NYC Department of Health",
    role: "Data Visualization Engineer",
    focus: "Built neighborhood-level choropleth maps and indicator charts for hundreds of environmental health measures across the city.",
    impact: "The public's window into environmental health conditions, block by block.",
    stack: ["Mapping", "D3", "Indicator frameworks"],
    img: "environmental-health.png"
  },

  {
    title: "COVID-19 Data Archive",
    url: "https://www.nyc.gov/site/doh/covid/covid-19-data-archive.page",
    org: "NYC Department of Health",
    role: "Product Lead",
    focus: "Defined and shipped a durable public archive of pandemic-era datasets, visualizations, and documentation.",
    impact: "A permanent, citable public record of NYC's pandemic-era data.",
    stack: ["Product strategy", "Data pipelines", "Documentation"],
    img: "covid-archive.png"
  },

  {
    title: "Vital Statistics Data Portal",
    url: "https://www.nyc.gov/site/doh/data/data-sets/vital-statistics-data-provisional.page",
    org: "NYC Department of Health",
    role: "Product Lead & Developer",
    focus: "Led design and build of a birth and death records portal, turning statistical tables into usable public data.",
    impact: "The working source of NYC birth and death data for researchers and policymakers.",
    stack: ["Data governance", "Statistical reporting", "UX"],
    img: "vital-stats.png"
  }
];

const num = i => String(i + 1).padStart(2, "0");

/* ---------- Public project cards ---------- */
const root = d3.select("#code-projects");

const cards = root
  .selectAll(".card")
  .data(projData)
  .join("a")
  .attr("class", "card")
  .attr("href", d => d.url)
  .attr("target", "_blank")
  .attr("rel", "noopener");

cards
  .append("div")
  .attr("class", "card__thumb")
  .append("img")
  .attr("src", d => `assets/${d.img}`)
  .attr("alt", d => d.title)
  .attr("loading", "lazy");

const body = cards.append("div").attr("class", "card__body");

body.append("p")
  .attr("class", "card__index")
  .text((d, i) => num(i));

body.append("h3")
  .attr("class", "card__title")
  .text(d => d.title);

body.append("p")
  .attr("class", "card__org")
  .text(d => d.org);

body.append("p")
  .attr("class", "card__meta")
  .html(d => `<span class="card__role">${d.role}.</span> ${d.focus}`);

body.append("p")
  .attr("class", "card__impact")
  .html(d => `<span class="card__impact-label">Impact</span> ${d.impact}`);

body.append("ul")
  .attr("class", "card__stack")
  .selectAll("li")
  .data(d => d.stack)
  .join("li")
  .text(s => s);

/* ---------- Private, password-locked project ---------- */
const LOCK_INDEX = num(projData.length);
const SS_KEY = "mm_private_project";

const lockThumb = state => `
  <div class="card__thumb card__thumb--lock" aria-hidden="true">
    <svg viewBox="0 0 24 24" width="34" height="34" fill="none"
         stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="10.5" width="16" height="10" rx="2"></rect>
      <path d="${state === "open"
        ? "M8 10.5V7a4 4 0 0 1 7.5-1.9"
        : "M8 10.5V7a4 4 0 0 1 8 0v3.5"}"></path>
    </svg>
  </div>`;

function lockedMarkup() {
  return `
    ${lockThumb("closed")}
    <div class="card__body">
      <p class="card__index">${LOCK_INDEX}</p>
      <h3 class="card__title">Unreleased project</h3>
      <p class="card__org">Private &middot; password required</p>
      <p class="card__meta">A current client project that isn&rsquo;t public yet. Enter the password to view the write-up and prototype link.</p>
      <form class="lock-form" novalidate>
        <input class="lock-form__input" type="password" name="pw" autocomplete="off"
               spellcheck="false" placeholder="Password" aria-label="Project password" required>
        <button class="btn btn--primary lock-form__btn" type="submit">Unlock</button>
      </form>
      <p class="lock-form__msg" role="alert" hidden></p>
    </div>`;
}

function unlockedMarkup(p) {
  const stack = (p.stack || []).map(s => `<li>${s}</li>`).join("");
  return `
    ${lockThumb("open")}
    <div class="card__body">
      <p class="card__index">${LOCK_INDEX}</p>
      <h3 class="card__title">${p.title}</h3>
      <p class="card__org">${p.org}</p>
      <p class="card__meta"><span class="card__role">${p.role}.</span> ${p.focus}</p>
      <p class="card__impact"><span class="card__impact-label">Impact</span> ${p.impact}</p>
      <ul class="card__stack">${stack}</ul>
      <p class="card__note">
        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor"
             stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <rect x="4" y="10.5" width="16" height="10" rx="2"></rect><path d="M8 10.5V7a4 4 0 0 1 8 0v3.5"></path>
        </svg>
        ${p.note}
      </p>
      <a class="btn btn--ghost lock-visit" href="${p.url}" target="_blank" rel="noopener">Visit prototype &#8599;</a>
    </div>`;
}

const lockCard = root
  .append("div")
  .attr("class", "card card--locked")
  .node();
lockCard.innerHTML = lockedMarkup();

function reveal(p, { animate = true } = {}) {
  lockCard.classList.remove("card--locked");
  lockCard.classList.add("card--unlocked");
  lockCard.innerHTML = unlockedMarkup(p);
  if (animate) {
    lockCard.classList.add("is-revealing");
    setTimeout(() => lockCard.classList.remove("is-revealing"), 600);
  }
}

async function decryptPayload(password) {
  const subtle = window.crypto && window.crypto.subtle;
  if (!subtle) throw new Error("unsupported");

  const res = await fetch("assets/locked-project.json", { cache: "no-store" });
  if (!res.ok) throw new Error("missing");
  const blob = await res.json();

  const b64 = s => Uint8Array.from(atob(s), c => c.charCodeAt(0));
  const enc = new TextEncoder();

  const baseKey = await subtle.importKey(
    "raw", enc.encode(password), "PBKDF2", false, ["deriveKey"]);
  const key = await subtle.deriveKey(
    { name: "PBKDF2", salt: b64(blob.salt), iterations: blob.iterations || 210000, hash: "SHA-256" },
    baseKey, { name: "AES-GCM", length: 256 }, false, ["decrypt"]);
  const plain = await subtle.decrypt(
    { name: "AES-GCM", iv: b64(blob.iv) }, key, b64(blob.ct));

  return JSON.parse(new TextDecoder().decode(plain));
}

lockCard.addEventListener("submit", async e => {
  if (!e.target.classList.contains("lock-form")) return;
  e.preventDefault();

  const form = e.target;
  const input = form.querySelector(".lock-form__input");
  const btn = form.querySelector(".lock-form__btn");
  const msg = lockCard.querySelector(".lock-form__msg");
  const pw = input.value.trim();
  if (!pw) return;

  btn.disabled = true;
  btn.textContent = "Unlocking…";
  msg.hidden = true;

  try {
    const payload = await decryptPayload(pw);
    try { sessionStorage.setItem(SS_KEY, JSON.stringify(payload)); } catch (_) {}
    reveal(payload);
  } catch (err) {
    btn.disabled = false;
    btn.textContent = "Unlock";
    input.value = "";
    input.focus();
    msg.textContent = err.message === "unsupported"
      ? "This browser can’t unlock the project. Try a current version of Chrome, Safari, or Firefox."
      : "That password didn’t work.";
    msg.hidden = false;
    lockCard.classList.remove("shake");
    void lockCard.offsetWidth;
    lockCard.classList.add("shake");
  }
});

try {
  const cached = sessionStorage.getItem(SS_KEY);
  if (cached) reveal(JSON.parse(cached), { animate: false });
} catch (_) {}
