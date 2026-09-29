let colleges = [];

async function init() {
  const res = await fetch("colleges.json");   // needs a local server, see README
  colleges = await res.json();
  fillSelect("branch", [...new Set(colleges.map(c => c.branch))]);
  fillSelect("city", [...new Set(colleges.map(c => c.city))]);
  document.getElementById("go").addEventListener("click", predict);
}

function fillSelect(id, values) {
  const sel = document.getElementById(id);
  values.sort().forEach(v => sel.add(new Option(v, v)));
}

// Safe: you are 3+ above cutoff. Target: within 3 of it (above). Reach: up to 5 below.
function classify(percentile, cutoff) {
  const diff = percentile - cutoff;
  if (diff >= 3) return "safe";
  if (diff >= 0) return "target";
  if (diff >= -5) return "reach";
  return null;
}

function predict() {
  const p = parseFloat(document.getElementById("percentile").value);
  const branch = document.getElementById("branch").value;
  const city = document.getElementById("city").value;
  if (isNaN(p) || p < 0 || p > 100) { alert("Enter a percentile between 0 and 100"); return; }

  const order = { safe: 0, target: 1, reach: 2 };
  const matches = colleges
    .filter(c => (!branch || c.branch === branch) && (!city || c.city === city))
    .map(c => ({ ...c, chance: classify(p, c.cutoff) }))
    .filter(c => c.chance)
    .sort((a, b) => order[a.chance] - order[b.chance] || b.cutoff - a.cutoff);

  document.getElementById("summary").textContent = `${matches.length} college(s) found`;
  document.getElementById("results").innerHTML = matches.map(c => `
    <div class="card">
      <div><strong>${c.name}</strong><br><small>${c.branch} • ${c.city} • Cutoff ${c.cutoff}</small></div>
      <span class="tag ${c.chance}">${c.chance.toUpperCase()}</span>
    </div>`).join("");
}

init();
