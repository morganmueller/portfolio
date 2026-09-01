const projData = [
  {
    title: "Respiratory Illness Data Pages",
    url: "https://www.nyc.gov/assets/doh/respiratory-illness-data/index.html#/",
    org: "NYC Department of Health",
    role: "Product Lead & Lead Engineer",
    focus: "Owned discovery, design, and build of a public respiratory-virus tracker used citywide",
    stack: ["React", "Vega-Lite", "D3", "Azure"],
    img: "respiratory-tracker.png"
  },

  {
    title: "HealthyNYC Data & Indicators Site",
    url: "https://www.nyc.gov/site/doh/about/about-doh/healthynyc.page",
    org: "NYC Department of Health",
    role: "Product Designer & Engineer",
    focus: "Designed the indicator UX and component system behind NYC's healthy-longevity campaign",
    stack: ["Design system", "Interactive dashboards", "Data modeling"],
    img: "healthynyc.png"
  },

  {
    title: "COVID-19 Data Archive",
    url: "https://www.nyc.gov/site/doh/covid/covid-19-data-archive.page",
    org: "NYC Department of Health",
    role: "Product Lead",
    focus: "Defined and shipped a durable public archive of pandemic-era datasets",
    stack: ["Product strategy", "Data pipelines", "Public documentation"],
    img: "covid-archive.png"
  },

  {
    title: "Vital Statistics Data Portal",
    url: "https://www.nyc.gov/site/doh/data/data-sets/vital-statistics-data-provisional.page",
    org: "NYC Department of Health",
    role: "Product Lead & Developer",
    focus: "Led design and build of a birth/death records portal for researchers and policymakers",
    stack: ["Data governance", "Statistical reporting", "UX"],
    img: "vital-stats.png"
  }
];

const cards = d3.select('#code-projects')
  .selectAll('.card')
  .data(projData)
  .join('a')
  .attr('class', 'card')
  .attr('href', d => d.url)
  .attr('target', '_blank')
  .attr('rel', 'noopener');

cards.append('div')
  .attr('class', 'card__thumb')
  .append('img')
  .attr('src', d => `assets/${d.img}`)
  .attr('alt', d => d.title)
  .attr('loading', 'lazy');

const body = cards.append('div')
  .attr('class', 'card__body');

body.append('h3')
  .attr('class', 'card__title')
  .text(d => d.title);

body.append('p')
  .attr('class', 'card__org')
  .text(d => d.org);

body.append('p')
  .attr('class', 'card__meta')
  .html(d => `<span class="card__role">${d.role}</span> &mdash; ${d.focus}`);
