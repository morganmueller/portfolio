const projData = [
  {
    title: "Respiratory Illness Data Pages",
    url: "https://nyc-respiratory-illness.netlify.app/",
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

// the locked card is inserted at position 2, so public cards are 01, 03, 04, 05, 06
body.append("p")
  .attr("class", "card__index")
  .text((d, i) => num(i === 0 ? 0 : i + 1));

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

/* ---------- Private, password-locked project (shown 2nd, next to Respiratory) ---------- */
const LOCK_INDEX = num(1);
const SS_KEY = "mm_private_project";

const LOCK_META = {
  title: "Community Health Profiles Redesign",
  org: "NYC Department of Health · Prototype",
  img: "chp-redesign.png"
};

const lockIcon = (open, size = 13) => `
  <svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor"
       stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <rect x="4" y="10.5" width="16" height="10" rx="2"></rect>
    <path d="${open ? "M8 10.5V7a4 4 0 0 1 7.5-1.9" : "M8 10.5V7a4 4 0 0 1 8 0v3.5"}"></path>
  </svg>`;

const lockThumb = open => `
  <div class="card__thumb">
    <img src="assets/${LOCK_META.img}" alt="${LOCK_META.title}" loading="lazy">
    <span class="card__lockbadge">${lockIcon(open, 12)}${open ? "Unlocked" : "Locked"}</span>
  </div>`;

function lockedMarkup() {
  return `
    ${lockThumb(false)}
    <div class="card__body">
      <p class="card__index">${LOCK_INDEX}</p>
      <h3 class="card__title">${LOCK_META.title}</h3>
      <p class="card__org">${LOCK_META.org}</p>
      <p class="card__meta">A redesign of the city&rsquo;s neighborhood health profiles, in progress. Enter the password for the write-up and the live prototype link.</p>
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
    ${lockThumb(true)}
    <div class="card__body">
      <p class="card__index">${LOCK_INDEX}</p>
      <h3 class="card__title">${LOCK_META.title}</h3>
      <p class="card__org">${p.org || LOCK_META.org}</p>
      <p class="card__meta"><span class="card__role">${p.role}.</span> ${p.focus}</p>
      <p class="card__impact"><span class="card__impact-label">Impact</span> ${p.impact}</p>
      <ul class="card__stack">${stack}</ul>
      <p class="card__note">${lockIcon(false, 13)} ${p.note}</p>
      <a class="btn btn--ghost lock-visit" href="${p.url}" target="_blank" rel="noopener">Visit prototype &#8599;</a>
    </div>`;
}

const lockCard = root
  .append("div")
  .attr("class", "card card--locked")
  .node();
lockCard.innerHTML = lockedMarkup();

// move it into the 2nd grid slot, right after Respiratory
const gridEl = root.node();
gridEl.insertBefore(lockCard, gridEl.children[1]);

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
