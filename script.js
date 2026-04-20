// ════════════════════════════════════════════════════════
//  DATA — loaded from projects.json
// ════════════════════════════════════════════════════════
let categories = [];
let projects = {};

async function loadData() {
  try {
    const res = await fetch('projects.json');
    const data = await res.json();
    categories = data.categories;
    projects = data.projects;
  } catch (e) {
    console.error('Gagal memuat projects.json:', e);
  }
}

// ════════════════════════════════════════════════════════
//  ISSUE TREE RENDERER (SVG)
// ════════════════════════════════════════════════════════
function renderIssueTree(tree) {
  if (!tree) return '';

  const bCount = tree.branches.length;
  const minColW = 160;
  const colW = Math.max(minColW, Math.floor(660 / bCount));
  const hPad = 20;
  const totalW = colW * bCount + hPad * 2;

  // === FIX: add inner padding so text never touches box edges ===
  const rootH = 56, branchH = 52, leafH = 48;
  const innerPadX = 14;  // horizontal inner padding inside each box
  const innerPadY = 8;   // vertical inner padding inside each box

  const rootY = 20;
  const branchY = rootY + rootH + 52;
  const leafY = branchY + branchH + 44;

  const svgH = leafY + leafH + 28;
  const rootX = totalW / 2;

  const svgLines = [];
  const svgBoxes = [];

  // ── Root box ──
  const rootBoxW = Math.min(totalW - 40, bCount <= 2 ? 320 : totalW - 60);
  svgBoxes.push(`
    <rect x="${rootX - rootBoxW/2}" y="${rootY}" width="${rootBoxW}" height="${rootH}" rx="10"
      fill="rgba(201,169,110,0.15)" stroke="#c9a96e" stroke-width="1.5"/>
    <foreignObject x="${rootX - rootBoxW/2 + innerPadX}" y="${rootY + innerPadY}" width="${rootBoxW - innerPadX*2}" height="${rootH - innerPadY*2}">
      <div xmlns="http://www.w3.org/1999/xhtml" style="font-size:11px;color:#f0ece4;text-align:center;line-height:1.4;font-family:'DM Sans',sans-serif;">${tree.root}</div>
    </foreignObject>
  `);

  // ── Horizontal connector line across all branch tops ──
  if (bCount > 1) {
    const firstBx = hPad + colW * 0 + colW / 2;
    const lastBx  = hPad + colW * (bCount - 1) + colW / 2;
    svgLines.push(`<line x1="${firstBx}" y1="${branchY}" x2="${lastBx}" y2="${branchY}" stroke="rgba(201,169,110,0.25)" stroke-width="1.2"/>`);
    svgLines.push(`<line x1="${rootX}" y1="${rootY + rootH}" x2="${rootX}" y2="${branchY}" stroke="rgba(201,169,110,0.4)" stroke-width="1.5" stroke-dasharray="4,3"/>`);
  }

  tree.branches.forEach((branch, bi) => {
    const bx = hPad + colW * bi + colW / 2;
    const bBoxW = colW - 16;

    if (bCount === 1) {
      svgLines.push(`<line x1="${rootX}" y1="${rootY + rootH}" x2="${bx}" y2="${branchY}" stroke="rgba(201,169,110,0.4)" stroke-width="1.5" stroke-dasharray="4,3"/>`);
    } else {
      svgLines.push(`<line x1="${bx}" y1="${branchY}" x2="${bx}" y2="${branchY}" stroke="rgba(201,169,110,0.4)" stroke-width="1.2"/>`);
    }

    // Branch box — FIX: increased inner padding
    svgBoxes.push(`
      <rect x="${bx - bBoxW/2}" y="${branchY}" width="${bBoxW}" height="${branchH}" rx="8"
        fill="rgba(30,20,8,0.6)" stroke="${branch.color}" stroke-width="1.4"/>
      <foreignObject x="${bx - bBoxW/2 + innerPadX}" y="${branchY + innerPadY}" width="${bBoxW - innerPadX*2}" height="${branchH - innerPadY*2}">
        <div xmlns="http://www.w3.org/1999/xhtml" style="font-size:${bCount >= 4 ? 9.5 : 10.5}px;color:#e8d5b0;text-align:center;font-weight:500;line-height:1.3;font-family:'DM Sans',sans-serif;">${branch.label}</div>
      </foreignObject>
    `);

    // Leaf nodes
    const leafCount = branch.children.length;
    const leafSlotW = bBoxW / leafCount;
    branch.children.forEach((leaf, li) => {
      const lx = (bx - bBoxW/2) + leafSlotW * li + leafSlotW / 2;
      const lBoxW = leafSlotW - 6;

      svgLines.push(`<line x1="${bx}" y1="${branchY + branchH}" x2="${lx}" y2="${leafY}" stroke="rgba(139,105,20,0.5)" stroke-width="1" stroke-dasharray="3,3"/>`);

      // Leaf box — FIX: increased inner padding
      svgBoxes.push(`
        <rect x="${lx - lBoxW/2}" y="${leafY}" width="${lBoxW}" height="${leafH}" rx="6"
          fill="rgba(100,80,20,0.18)" stroke="rgba(201,169,110,0.2)" stroke-width="1"/>
        <foreignObject x="${lx - lBoxW/2 + innerPadX}" y="${leafY + innerPadY}" width="${lBoxW - innerPadX*2}" height="${leafH - innerPadY*2}">
          <div xmlns="http://www.w3.org/1999/xhtml" style="font-size:${bCount >= 4 ? 9 : 10}px;color:#999;text-align:center;line-height:1.35;font-family:'DM Sans',sans-serif;">${leaf}</div>
        </foreignObject>
      `);
    });
  });

  return `
    <div class="issue-tree-wrap">
      <svg viewBox="0 0 ${totalW} ${svgH}" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;display:block;">
        ${svgLines.join('')}
        ${svgBoxes.join('')}
      </svg>
    </div>`;
}

// ════════════════════════════════════════════════════════
//  CHART RENDERER
// ════════════════════════════════════════════════════════
const chartInstances = {};

function destroyChart(id) {
  if (chartInstances[id]) { chartInstances[id].destroy(); delete chartInstances[id]; }
}

const CD = {
  gridColor: 'rgba(255,255,255,0.06)',
  textColor: '#777',
  font: { family: "'DM Sans', sans-serif", size: 11 }
};

function axisDefaults(label) {
  return {
    ticks: { color: CD.textColor, font: CD.font },
    grid: { color: CD.gridColor },
    title: label ? { display: true, text: label, color: '#999', font: { ...CD.font, size: 10.5 } } : { display: false }
  };
}

function legendDefaults() {
  return { labels: { color: CD.textColor, font: CD.font, boxWidth: 11, padding: 14 } };
}

function titlePlugin(text) {
  return {
    display: !!text,
    text: text || '',
    color: '#c9a96e',
    font: { family: "'DM Sans', sans-serif", size: 12, weight: '500' },
    padding: { bottom: 8 }
  };
}

// FIX: kill ALL Chart.js animation globally (v4) — the only reliable method.
// Per-chart options alone don't stop the resize/responsive re-draw loop in v4.
function disableChartAnimationsGlobally() {
  if (typeof Chart === 'undefined') return;
  Chart.defaults.animation = false;
  Chart.defaults.animations.colors = false;
  Chart.defaults.animations.x = false;
  Chart.defaults.animations.y = false;
  Chart.defaults.transitions.active.animation.duration = 0;
  Chart.defaults.transitions.resize = { animation: { duration: 0 } };
  Chart.defaults.responsiveAnimationDuration = 0;
}

const NO_ANIMATION = {
  animation: false,
  animations: { colors: false, x: false, y: false },
  transitions: {
    active: { animation: { duration: 0 } },
    resize: { animation: { duration: 0 } }
  }
};

function renderChart(canvasId, cd) {
  destroyChart(canvasId);
  const canvas = document.getElementById(canvasId);
  if (!canvas || !cd) return;

  // Confusion matrix → HTML table, not chart
  if (cd.type === 'confusionMatrix') {
    canvas.style.display = 'none';
    const wrap = canvas.parentElement;
    // Guard: don't double-render
    if (wrap.querySelector('.cm-table-wrap')) return;
    const { labels, matrix, title } = cd;
    const maxVal = Math.max(...matrix.flat());
    let html = `<div class="cm-table-wrap"><p style="font-size:.7rem;color:#c9a96e;text-transform:uppercase;letter-spacing:.1em;margin-bottom:.8rem;font-weight:500;">${title}</p>`;
    html += `<div style="overflow-x:auto;"><table style="border-collapse:separate;border-spacing:4px;font-size:.75rem;min-width:280px;">`;
    html += `<thead><tr><th style="color:var(--muted);padding:.3rem .5rem;font-weight:400;text-align:left;">True \\ Pred</th>`;
    labels.forEach(l => html += `<th style="color:var(--accent);text-align:center;padding:.3rem .6rem;font-weight:500;">${l}</th>`);
    html += `</tr></thead><tbody>`;
    matrix.forEach((row, i) => {
      html += `<tr><td style="color:var(--accent);padding:.3rem .6rem;font-weight:500;white-space:nowrap;">${labels[i]}</td>`;
      row.forEach((val, j) => {
        const a = Math.round((val / maxVal) * 200).toString(16).padStart(2,'0');
        const bg = i === j ? `#c9a96e${a}` : `#5b8dd9${a}`;
        const fw = i === j ? '600' : '300';
        html += `<td style="text-align:center;padding:.55rem .6rem;background:${bg};border-radius:6px;color:var(--text);font-weight:${fw};">${val}</td>`;
      });
      html += `</tr>`;
    });
    html += `</tbody></table></div>`;
    html += `<p style="font-size:.68rem;color:var(--muted);margin-top:.6rem;">🟡 Diagonal = Correct &nbsp;·&nbsp; 🔵 Off-diagonal = Misclassified</p></div>`;
    const div = document.createElement('div');
    div.innerHTML = html;
    wrap.appendChild(div);
    return;
  }

  const ctx = canvas.getContext('2d');
  let config;

  if (cd.type === 'line') {
    config = {
      type: 'line',
      data: {
        labels: cd.labels,
        datasets: cd.datasets.map(ds => ({
          label: ds.label, data: ds.data,
          borderColor: ds.color, backgroundColor: 'transparent',
          tension: 0.35,
          pointRadius: cd.labels.length > 20 ? 2 : 4,
          pointBackgroundColor: ds.color,
          borderDash: ds.dashed ? [5,4] : [],
          borderWidth: ds.dashed ? 1.5 : 2
        }))
      },
      options: {
        ...NO_ANIMATION,
        responsive: true, maintainAspectRatio: false,
        plugins: { title: titlePlugin(cd.title), legend: { display: true, position: 'bottom', ...legendDefaults() } },
        scales: { x: { ...axisDefaults(cd.xTitle) }, y: { ...axisDefaults(cd.yTitle) } }
      }
    };

  } else if (cd.type === 'quarterly') {
    config = {
      type: 'bar',
      data: {
        labels: cd.labels,
        datasets: cd.datasets.map((ds, i) => ({
          label: ds.label, data: ds.data,
          backgroundColor: ds.color + (i === 0 ? 'cc' : '88'),
          borderColor: ds.color, borderWidth: 1, borderRadius: 6,
          yAxisID: i === 0 ? 'y' : 'y1'
        }))
      },
      options: {
        ...NO_ANIMATION,
        responsive: true, maintainAspectRatio: false,
        plugins: { title: titlePlugin(cd.title), legend: { display: true, position: 'bottom', ...legendDefaults() } },
        scales: {
          x: { ...axisDefaults(cd.xTitle) },
          y: { ...axisDefaults(cd.yTitle), position: 'left' },
          y1: { ...axisDefaults(cd.y1Title), position: 'right', grid: { display: false } }
        }
      }
    };

  } else if (cd.type === 'bar') {
    config = {
      type: 'bar',
      data: {
        labels: cd.labels,
        datasets: [{
          label: cd.title || '',
          data: cd.values,
          backgroundColor: cd.colors || cd.values.map(() => '#c9a96ecc'),
          borderColor: (cd.colors || []).map(c => c.replace('cc','').replace('88','')) || '#c9a96e',
          borderWidth: 1, borderRadius: 6
        }]
      },
      options: {
        ...NO_ANIMATION,
        responsive: true, maintainAspectRatio: false,
        plugins: { title: titlePlugin(cd.title), legend: { display: false } },
        scales: {
          x: { ...axisDefaults(cd.xTitle) },
          y: (() => {
            // FIX: zoom y-axis for tightly packed small values (e.g. CPA ~0.35, ROI ~2.7)
            const vals = (cd.values || []).filter(v => typeof v === 'number');
            const min = Math.min(...vals), max = Math.max(...vals), range = max - min;
            const tight = vals.length > 1 && range < max * 0.25;
            const smartMin = tight ? Math.max(0, min - range * 3) : 0;
            return { ...axisDefaults(cd.yTitle), beginAtZero: !tight, ...(tight ? { min: smartMin } : {}) };
          })()
        }
      }
    };

  } else if (cd.type === 'barH') {
    config = {
      type: 'bar',
      data: {
        labels: cd.labels,
        datasets: [{ data: cd.values, backgroundColor: cd.colors || cd.values.map(() => '#c9a96ecc'), borderRadius: 5, borderWidth: 0 }]
      },
      options: {
        ...NO_ANIMATION,
        responsive: true, maintainAspectRatio: false, indexAxis: 'y',
        plugins: { title: titlePlugin(cd.title), legend: { display: false } },
        scales: {
          x: { ...axisDefaults(cd.xTitle), beginAtZero: true },
          y: { ...axisDefaults(cd.yTitle), grid: { display: false } }
        }
      }
    };

  } else if (cd.type === 'classificationBar') {
    config = {
      type: 'bar',
      data: {
        labels: cd.labels,
        datasets: cd.datasets.map(ds => ({
          label: ds.label, data: ds.data,
          backgroundColor: ds.color + 'bb', borderColor: ds.color,
          borderWidth: 1, borderRadius: 5
        }))
      },
      options: {
        ...NO_ANIMATION,
        responsive: true, maintainAspectRatio: false,
        plugins: { title: titlePlugin(cd.title), legend: { display: true, position: 'bottom', ...legendDefaults() } },
        scales: {
          x: { ...axisDefaults(cd.xTitle) },
          y: { ...axisDefaults(cd.yTitle), beginAtZero: true, max: 1 }
        }
      }
    };

  } else if (cd.type === 'barChromosome') {
    config = {
      type: 'bar',
      data: {
        labels: cd.labels,
        datasets: [
          { label: 'Total Kalori', data: cd.values, backgroundColor: '#c9a96e99', borderColor: '#c9a96e', borderWidth: 1, borderRadius: 6 },
          {
            label: `Rata-rata (${cd.targetLine.toLocaleString('id-ID')} kkal)`,
            data: cd.labels.map(() => cd.targetLine),
            type: 'line', borderColor: '#e05252', borderDash: [5,4],
            borderWidth: 1.5, pointRadius: 0, fill: false
          }
        ]
      },
      options: {
        ...NO_ANIMATION,
        responsive: true, maintainAspectRatio: false,
        plugins: { title: titlePlugin(cd.title), legend: { display: true, position: 'bottom', ...legendDefaults() } },
        scales: {
          x: { ...axisDefaults(cd.xTitle) },
          y: { ...axisDefaults(cd.yTitle), beginAtZero: false }
        }
      }
    };
  }

  if (config) chartInstances[canvasId] = new Chart(ctx, config);
}

// ════════════════════════════════════════════════════════
//  MODAL — SMART LINK DETECTION
// ════════════════════════════════════════════════════════

/**
 * Detect what kind of link a URL is, return null if placeholder '#'
 * Returns { label, icon } or null
 */
function detectLink(url) {
  if (!url || url === '#' || url.trim() === '') return null;
  const u = url.toLowerCase();
  if (u.includes('lookerstudio') || u.includes('datastudio')) return { label: 'Looker Studio', icon: '📊' };
  if (u.includes('tableau'))   return { label: 'Tableau Dashboard', icon: '📈' };
  if (u.includes('powerbi') || u.includes('power.bi')) return { label: 'Power BI', icon: '📊' };
  if (u.includes('sheets.google') || u.includes('spreadsheet')) return { label: 'Google Sheets', icon: '📋' };
  if (u.includes('colab') || u.includes('colab.research')) return { label: 'Google Colab', icon: '🔬' };
  if (u.includes('github'))    return { label: 'GitHub', icon: '💻' };
  if (u.includes('kaggle'))    return { label: 'Kaggle', icon: '🏅' };
  // Generic valid URL
  try { new URL(url); return { label: 'Lihat Project', icon: '↗' }; } catch { return null; }
}

function renderModalActions(p) {
  const dashboard = detectLink(p.dashboardLink);
  const colab     = detectLink(p.colabLink);

  if (!dashboard && !colab) return '';

  let html = '<div class="modal-actions">';
  if (dashboard) {
    html += `<a class="modal-link" href="${p.dashboardLink}" target="_blank" rel="noopener">${dashboard.icon} ${dashboard.label} ↗</a>`;
  }
  if (colab) {
    const isColab = (p.colabLink||'').toLowerCase().includes('colab');
    html += `<a class="modal-link-ghost" href="${p.colabLink}" target="_blank" rel="noopener">${colab.icon} ${colab.label} ↗</a>`;
  }
  html += '</div>';
  return html;
}

// ════════════════════════════════════════════════════════
//  RICH MODAL HELPERS (Tira Beauty style)
// ════════════════════════════════════════════════════════
function renderStatRow(stats) {
  const colors = ['accent','teal','amber','purple'];
  const colorMap = {
    accent: { bg:'rgba(201,169,110,0.1)', border:'#c9a96e', text:'#c9a96e' },
    teal:   { bg:'rgba(29,158,117,0.1)',  border:'#1D9E75', text:'#1D9E75' },
    amber:  { bg:'rgba(186,117,23,0.1)',  border:'#BA7517', text:'#BA7517' },
    purple: { bg:'rgba(83,74,183,0.1)',   border:'#534AB7', text:'#534AB7' }
  };
  return `<div class="rm-stat-row">${stats.map((s,i)=>{
    const c = colorMap[colors[i % 4]];
    return `<div class="rm-stat" style="background:${c.bg};border-top:3px solid ${c.border}">
      <div class="rm-stat-num" style="color:${c.text}">${s.num}</div>
      <div class="rm-stat-lbl">${s.label}</div>
    </div>`;
  }).join('')}</div>`;
}

function renderFunnel(steps) {
  const widths = [100, 85, 34, 19];
  const bgs = ['#72243E','#D4537E','rgba(212,83,126,0.35)','rgba(212,83,126,0.15)'];
  const textColors = ['#fff','#fff','#f6e9ed','#f7eef1'];
  return `<div class="rm-funnel">${steps.map((s,i)=>
    `<div class="rm-funnel-step">
      <div class="rm-funnel-label">${s.label}</div>
      <div class="rm-funnel-bg">
        <div class="rm-funnel-fill" style="width:${widths[i]}%;background:${bgs[i]};color:${textColors[i]};${i>=2?'border:1px solid #D4537E':''}">
          ${s.value}
        </div>
      </div>
      <div class="rm-funnel-badge">${s.badge ? `<span class="rm-badge ${s.badgeOk?'ok':''}">${s.badge}</span>` : ''}</div>
    </div>`
  ).join('')}</div>`;
}

function renderFindingCards(cols) {
  const typeStyle = {
    good:    { bg:'rgba(29,158,117,0.12)', border:'#1D9E75', text:'#6ecfa9' },
    bad:     { bg:'rgba(224,82,82,0.12)',  border:'#e05252', text:'#f08080' },
    neutral: { bg:'rgba(186,117,23,0.12)', border:'#BA7517', text:'#c9a96e' },
    info:    { bg:'rgba(83,74,183,0.12)',  border:'#534AB7', text:'#a5a0ee' }
  };
  return `<div class="rm-finding-grid">${cols.map(col =>
    `<div class="rm-finding-col">${col.map(f => {
      const s = typeStyle[f.type] || typeStyle.neutral;
      return `<div class="rm-finding" style="background:${s.bg};border-left:3px solid ${s.border}">
        <div class="rm-finding-head" style="color:${s.text}">${f.head}</div>
        <div class="rm-finding-body">${f.body}</div>
      </div>`;
    }).join('')}</div>`
  ).join('')}</div>`;
}

function renderCorrStrip(r, text) {
  return `<div class="rm-corr-strip">
    <div class="rm-corr-num">r = ${r}</div>
    <div class="rm-corr-text">${text}</div>
  </div>`;
}

function renderDQBox(items) {
  return `<div class="rm-dq-box">
    <div class="rm-dq-title">⚠ Catatan Kualitas Data</div>
    <div class="rm-dq-items">${items.map(it=>`<div class="rm-dq-item"><strong>${it.title}:</strong> ${it.body}</div>`).join('')}</div>
  </div>`;
}

function renderRecCards(recs) {
  const accents = ['#1D9E75','#D4537E','#534AB7','#BA7517','#c9a96e','#e05252'];
  const impactStyle = { high:'rgba(29,158,117,0.15)', med:'rgba(186,117,23,0.15)' };
  return `<div class="rm-rec-grid">${recs.map((r,i)=>
    `<div class="rm-rec-card" style="border-top:3px solid ${accents[i%6]}">
      <div class="rm-rec-num">${r.priority}</div>
      <div class="rm-rec-title">${r.title}</div>
      <div class="rm-rec-body">${r.body}</div>
      <span class="rm-rec-impact" style="background:${impactStyle[r.impactLevel]||impactStyle.med}">${r.impact}</span>
    </div>`
  ).join('')}</div>`;
}

// ════════════════════════════════════════════════════════
//  MODAL RENDERERS
// ════════════════════════════════════════════════════════
function renderRichModal(p, id) {
  document.getElementById('mType').textContent = p.type;
  document.getElementById('mTitle').textContent = p.title;

  const issueTreeSection = p.issueTree ? `
    <div class="modal-section">
      <div class="modal-section-label">Issue Tree Analysis</div>
      ${renderIssueTree(p.issueTree)}
    </div>` : '';

  const chartsSection = p.charts && p.charts.length ? `
    <div class="modal-section">
      <div class="modal-section-label">Visualisasi & Grafik</div>
      <div class="charts-row">
        ${p.charts.map(c => `
          <div class="chart-col">
            <div class="chart-wrap"><canvas id="${c.id}_${id}"></canvas></div>
            ${c.note ? `<p class="chart-note">${c.note}</p>` : ''}
          </div>`).join('')}
      </div>
    </div>` : '';

  const body = `
    <div class="modal-section">
      <div class="modal-section-label">Gambaran Bisnis</div>
      <p class="modal-text">${p.overview}</p>
      ${p.richStats ? renderStatRow(p.richStats) : ''}
    </div>
    <div class="modal-section">
      <div class="modal-section-label">Situasi Bisnis & Funnel</div>
      <p class="modal-text" style="margin-bottom:.9rem">${p.situasi}</p>
      ${p.funnel ? renderFunnel(p.funnel) : ''}
      <p class="modal-text" style="margin-top:.9rem">${p.situasiDetail}</p>
    </div>
    <div class="modal-section">
      <div class="modal-section-label">Problem Statement</div>
      <div class="insight-box"><p>"${p.problemStatement}"</p></div>
      ${p.problemSubs ? `<div class="rm-prob-subs">${p.problemSubs.map(s=>`<div class="rm-prob-sub">${s}</div>`).join('')}</div>` : ''}
    </div>
    ${issueTreeSection}
    <div class="modal-section">
      <div class="modal-section-label">Metodologi</div>
      <ul class="modal-bullets">${p.methodology.map(m=>`<li>${m}</li>`).join('')}</ul>
    </div>
    <div class="modal-section">
      <div class="modal-section-label">Key Findings</div>
      ${p.richFindings ? renderFindingCards(p.richFindings) : ''}
      ${p.corrStrip ? renderCorrStrip(p.corrStrip.r, p.corrStrip.text) : ''}
    </div>
    ${chartsSection}
    <div class="modal-section">
      <div class="modal-section-label">Hasil & Metrik Kunci</div>
      <div class="modal-results">
        ${p.results.map(r=>`
          <div class="modal-result-card">
            <span class="modal-result-num">${r.num}</span>
            <div class="modal-result-label">${r.label}</div>
          </div>`).join('')}
      </div>
    </div>
    ${p.dataQuality ? `<div class="modal-section">${renderDQBox(p.dataQuality)}</div>` : ''}
    <div class="modal-section">
      <div class="modal-section-label">Rekomendasi Strategis</div>
      <p class="modal-text" style="margin-bottom:.8rem">Berdasarkan issue tree dan temuan data, berikut 6 rekomendasi prioritas yang actionable dan terukur:</p>
      ${p.richRecs ? renderRecCards(p.richRecs) : ''}
    </div>
    ${p.closing ? `<div class="modal-section"><div class="rm-closing">${p.closing}</div></div>` : ''}
    <div class="modal-section">
      <div class="modal-section-label">Tools & Teknologi</div>
      <div class="modal-tags">${p.tags.map(t=>`<span class="modal-tag">${t}</span>`).join('')}</div>
    </div>
    ${renderModalActions(p)}`;

  document.getElementById('mBody').innerHTML = body;
  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
  requestAnimationFrame(() => {
    setTimeout(() => {
      if (p.charts) p.charts.forEach(c => renderChart(`${c.id}_${id}`, c));
    }, 100);
  });
}

function openModal(id) {
  const p = projects[id];
  if (!p) return;

  if (p.richStats) return renderRichModal(p, id);

  document.getElementById('mType').textContent = p.type;
  document.getElementById('mTitle').textContent = p.title;

  const issueTreeSection = p.issueTree ? `
    <div class="modal-section">
      <div class="modal-section-label">Issue Tree Analysis</div>
      ${renderIssueTree(p.issueTree)}
    </div>` : '';

  const chartsSection = p.charts && p.charts.length ? `
    <div class="modal-section">
      <div class="modal-section-label">Visualisasi & Grafik</div>
      <div class="charts-row">
        ${p.charts.map(c => `
          <div class="chart-col">
            <div class="chart-wrap">
              <canvas id="${c.id}_${id}"></canvas>
            </div>
            ${c.note ? `<p class="chart-note">${c.note}</p>` : ''}
          </div>`).join('')}
      </div>
    </div>` : '';

  const body = `
    <div class="modal-section">
      <div class="modal-section-label">Overview</div>
      <p class="modal-text">${p.overview}</p>
    </div>
    <div class="modal-section">
      <div class="modal-section-label">Latar Belakang & Konteks</div>
      <ul class="modal-bullets">${p.background.map(b => `<li>${b}</li>`).join('')}</ul>
    </div>
    <div class="modal-section">
      <div class="modal-section-label">Problem Statement</div>
      <div class="insight-box"><p>"${p.problemStatement}"</p></div>
    </div>
    ${issueTreeSection}
    <div class="modal-section">
      <div class="modal-section-label">Metodologi</div>
      <ul class="modal-bullets">${p.methodology.map(m => `<li>${m}</li>`).join('')}</ul>
    </div>
    <div class="modal-section">
      <div class="modal-section-label">Key Findings</div>
      <ul class="modal-bullets">${p.findings.map(f => `<li>${f}</li>`).join('')}</ul>
    </div>
    ${chartsSection}
    <div class="modal-section">
      <div class="modal-section-label">Hasil & Metrik Kunci</div>
      <div class="modal-results">
        ${p.results.map(r => `
          <div class="modal-result-card">
            <span class="modal-result-num">${r.num}</span>
            <div class="modal-result-label">${r.label}</div>
          </div>`).join('')}
      </div>
    </div>
    <div class="modal-section">
      <div class="modal-section-label">Kesimpulan & Rekomendasi</div>
      <ul class="modal-bullets">${p.recommendations.map(r => `<li>${r}</li>`).join('')}</ul>
    </div>
    <div class="modal-section">
      <div class="modal-section-label">Tools & Teknologi</div>
      <div class="modal-tags">${p.tags.map(t => `<span class="modal-tag">${t}</span>`).join('')}</div>
    </div>
    ${renderModalActions(p)}`;

  document.getElementById('mBody').innerHTML = body;
  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';

  requestAnimationFrame(() => {
    setTimeout(() => {
      if (p.charts) p.charts.forEach(c => renderChart(`${c.id}_${id}`, c));
    }, 100);
  });
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow = '';
  Object.keys(chartInstances).forEach(k => destroyChart(k));
}

function handleOverlayClick(e) {
  if (e.target === document.getElementById('modalOverlay')) closeModal();
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// ════════════════════════════════════════════════════════
//  RENDER CATEGORIES (auto-generate project cards)
// ════════════════════════════════════════════════════════
function renderCard(p, id) {
  return `
    <div class="project-card" onclick="openModal('${id}')">
      <div class="p-num">${p.num}</div>
      <div class="p-type">${p.type}</div>
      <div class="p-title">${p.title}</div>
      <p class="p-desc">${p.shortDesc}</p>
      <div class="p-tags">${p.tags.map(t => `<span class="p-tag">${t}</span>`).join('')}</div>
      <div class="arrow-hint">↗</div>
    </div>`;
}

function renderCategories() {
  const root = document.getElementById('categoriesRoot');
  if (!root) return;
  root.innerHTML = categories.map(cat => {
    const catProjects = cat.projects.map(id => projects[id]).filter(Boolean);
    const countLabel = cat.comingSoon ? 'Coming Soon' : `${catProjects.length} project${catProjects.length !== 1 ? 's' : ''}`;
    const countClass = cat.comingSoon ? 'cat-count soon' : 'cat-count';
    const dimClass = cat.comingSoon ? ' category-folder--dim' : '';
    const bodyContent = cat.comingSoon
      ? `<div class="coming-soon-box"><div class="cs-icon">🚧</div><div class="cs-title">Sedang dalam pengerjaan</div><div class="cs-desc">Project kategori ini akan segera hadir. Stay tuned!</div></div>`
      : `<div class="projects-grid">${catProjects.map((p, i) => renderCard(p, cat.projects[i])).join('')}</div>`;
    return `
      <div class="category-folder${dimClass}" id="${cat.id}">
        <div class="category-header" onclick="toggleCategory('${cat.id}')">
          <div class="cat-header-left">
            <div class="folder-icon-wrap"><span class="ico-closed">📁</span><span class="ico-open">📂</span></div>
            <div><div class="cat-title">${cat.icon} ${cat.title}</div><div class="cat-subtitle">${cat.subtitle}</div></div>
          </div>
          <div class="cat-header-right">
            <span class="${countClass}">${countLabel}</span>
            <span class="cat-chevron">›</span>
          </div>
        </div>
        <div class="category-body">${bodyContent}</div>
      </div>`;
  }).join('');
}

function toggleCategory(id) {
  document.getElementById(id).classList.toggle('open');
}

// ════════════════════════════════════════════════════════
//  SCROLL + NAV
// ════════════════════════════════════════════════════════
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (href === '#') return;
    e.preventDefault();
    const t = document.querySelector(href);
    if (t) t.scrollIntoView({ behavior: 'smooth' });
  });
});

// ════════════════════════════════════════════════════════
//  INIT
// ════════════════════════════════════════════════════════
loadData().then(() => {
  renderCategories();
});