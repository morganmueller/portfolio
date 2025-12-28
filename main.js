const projData = [
  {
    title: "Respiratory Illness Data Pages",
    url: "https://www.nyc.gov/assets/doh/respiratory-illness-data/index.html#/",
    org: "NYC Department of Health",
    role: "Lead Developer / Product Lead",
    focus: "Trends and highlights of respiratory viruses that can impact all New Yorkers",
    stack: ["React", "Vega-Lite", "D3", "Azure"],
    img: "respiratory-tracker.png"
  },

  {
    title: "HealthyNYC Data & Indicators Site",
    url: "https://www.nyc.gov/site/doh/about/about-doh/healthynyc.page",
    org: "NYC Department of Health",
    role: "Data Visualization Engineer",
    focus: "New York City's Campaign for Healthier, Longer Lives",
    stack: ["Interactive dashboards", "Data modeling", "UX systems"],
    img: "healthynyc.png"
  },

  {
    title: "COVID-19 Data Archive",
    url: "https://www.nyc.gov/site/doh/covid/covid-19-data-archive.page",
    org: "NYC Department of Health",
    role: "Technical Lead, Data Products",
    focus: "Historical preservation of pandemic-era datasets",
    stack: ["Data pipelines", "Public-facing documentation"],
    img: "covid-archive.png"
  },

  {
    title: "Vital Statistics Data Portal",
    url: "https://www.nyc.gov/site/doh/data/data-sets/vital-statistics-data-provisional.page",
    org: "NYC Department of Health",
    role: "Lead Developer",
    focus: "Birth and death records for researchers and policymakers",
    stack: ["Data governance", "Statistical reporting", "UX"],
    img: "vital-stats.png"
  },

  {
    title: "NYC Environmental Health Data Portal",
    url: "https://a816-dohbesp.nyc.gov/IndicatorPublic/",
    org: "NYC Department of Health",
    role: "Visualization Engineer / Product Partner",
    focus: "Neighborhood-level environmental health indicators",
    stack: ["Mapping", "Indicator frameworks", "Public data access"],
    img: "environmental-health.png"
  }
];

const projects = d3.select('#code-projects')
  .selectAll('.portfolio-item')
  .data(projData)
  .join('div')
  .attr('class', 'portfolio-item');

const links = projects
  .append('a')
  .attr('href', d => d.url)
  .attr('target', '_blank');

const divs = links
  .append('div')
  .attr('class', 'portfolio-item__img');

divs.append('img')
  .attr('src', d => `assets/${d.img}`)
  .attr('alt', d => d.title);

divs.append('h3')
  .attr('class', 'portfolio-item__title')
  .text(d => d.title);

divs.append('p')
  .attr('class', 'portfolio-item__org')
  .append('span')
  .text(d => d.org);

divs.append('p')
  .attr('class', 'portfolio-item__meta')
  .text(d => `${d.role} • ${d.focus}`);
