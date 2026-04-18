
function nav(active){
  const links=[['index.html','Home'],['login.html','Login'],['dashboard.html','Command Desk'],['watchlist.html','Watchlist'],['pricing.html','Pricing'],['admin.html','Admin']];
  return `<div class="topnav"><div class="brand">The Trader <span>Edge</span></div><div class="navlinks">${links.map(([h,l])=>`<a href="${h}" ${active===l?'style="border-color:rgba(216,176,108,.28);background:rgba(216,176,108,.12)"':''}>${l}</a>`).join('')}</div></div>`;
}
function conv(arr){return `<div class="blocks">${arr.map(c=>`<span class="block ${c}"></span>`).join('')}</div>`}
function renderGoldMasterTemplate(){
  const el = document.getElementById('goldMasterTemplate');
  if(!el) return;
  el.innerHTML = `
  <div class="card intel">
    <div class="topline">
      <div class="tag">Master Intel Template</div>
      <div class="pricebox"><div class="mini">Instrument</div><div class="price">GOLD</div></div>
    </div>
    <div style="margin-top:14px">
      <div class="symbol">GOLD</div>
      <div class="subtitle">Gold Spot · defensive metal · inflation / fear / dollar-sensitive</div>
    </div>
    <div class="statusrow">
      <div class="pill sell">SELL bias</div>
      <div class="pill mixed">Aligned</div>
      <div class="pill mixed">Risk-Off sensitive</div>
    </div>
    <div class="box">
      <div class="mini">Fast Read</div>
      <div class="hero-note">Defensive asset under pressure at resistance. Bias stays sell unless the zone breaks.</div>
    </div>
    <div class="box">
      <div class="mini">Instrument Profile</div>
      <div class="scanrow"><div>What it is</div><div>Global defensive metal and macro hedge.</div></div>
      <div class="scanrow"><div>Usually driven by</div><div>Dollar direction, real yields, geopolitics, inflation fear, and central bank expectations.</div></div>
      <div class="scanrow"><div>Market role</div><div>Often risk-off / defensive, but can also trade as an inflation or policy hedge.</div></div>
      <div class="scanrow"><div>When it tends to outperform</div><div>Dollar softness, falling real yields, or elevated geopolitical stress.</div></div>
    </div>
    <div class="box">
      <div class="mini">Scan Intel</div>
      <div class="scanrow"><div>Trend</div><div><span class="arrow-down">↓</span> Downtrend active</div></div>
      <div class="scanrow"><div>Convergence</div><div>${conv(['green','red','yellow'])}</div></div>
      <div class="scanrow"><div>ADX</div><div>TREND · move still has force</div></div>
      <div class="scanrow"><div>Return stack</div><div>CCI · RSI · STO mixed</div></div>
      <div class="scanrow"><div>State</div><div>Aligned sell, but still vulnerable to sharp defensive squeezes.</div></div>
    </div>
    <div class="grid2">
      <div class="mini-panel">
        <div class="mini">Trend Strength</div>
        <div class="price">53% Down</div>
        <div class="note">Pressure remains with sellers.</div>
      </div>
      <div class="mini-panel">
        <div class="mini">Reversal Risk</div>
        <div class="price">3 / 5</div>
        <div class="note">Moderate risk of snapback if the dollar weakens or yields slip.</div>
      </div>
    </div>
    <div class="box">
      <div class="mini">Plain-English Intel</div>
      <div class="note">Gold is not the cleanest trend-follow short in every environment because it can reverse quickly on headlines. But if scan, structure, and resistance all agree, it becomes a strong fade candidate rather than a random sell.</div>
    </div>
    <div class="grid2">
      <div class="mini-panel">
        <div class="mini">What strengthens the sell</div>
        <div class="note">Firm dollar, stable or rising yields, rejection from resistance, weak follow-through on bounces.</div>
      </div>
      <div class="mini-panel">
        <div class="mini">What weakens the sell</div>
        <div class="note">Risk-off panic bid, falling yields, soft dollar, sudden geopolitical escalation.</div>
      </div>
    </div>
    <div class="callout">
      <div class="mini">Master Template Rule</div>
      <div class="note">Every future Intel card should include: instrument profile, scan intel, trend strength, reversal risk, plain-English read, and what strengthens or weakens the current bias.</div>
    </div>
  </div>

  <div class="card battle">
    <div class="topline">
      <div class="tag">Master Battlefield Template</div>
      <div class="pricebox"><div class="mini">Setup Type</div><div class="price">Sell the Rally</div></div>
    </div>
    <div style="margin-top:14px">
      <div class="symbol">GOLD</div>
      <div class="subtitle">Execution card · zone, invalidation, targets, management</div>
    </div>
    <div class="statusrow">
      <div class="pill sell">SELL ASSAULT</div>
      <div class="pill mixed">Counter-bounce fade</div>
      <div class="pill mixed">Intraday / short swing</div>
    </div>
    <div class="box">
      <div class="mini">Battlefield Summary</div>
      <div class="hero-note">Sell rallies into the resistance band while the rejection structure holds.</div>
      <div class="note">This is not a blind short in the middle of nowhere. It is a resistance-based fade with a defined invalidation.</div>
    </div>
    <div class="chart">
      <div class="line stop"></div><div class="label ls">Invalidation · above spike high / resistance hold</div>
      <div class="zone"></div><div class="label lz">Entry Zone · R2–R3 resistance band</div>
      <div class="line live"></div><div class="label ll">Live / trigger area</div>
      <div class="line target1"></div><div class="label lt1">TP1 · back into R2 / mid-range</div>
      <div class="line target2"></div><div class="label lt2">TP2 · FPV / lower support if rejection expands</div>
      <div class="route">➜</div>
    </div>
    <div class="grid2">
      <div class="level-card"><div class="mini">Entry Logic</div><div class="value">Rally into resistance</div><div class="note">Prefer weakness after touch, not blind chasing.</div></div>
      <div class="level-card"><div class="mini">Invalidation</div><div class="value">Break / hold above zone</div><div class="note">If the zone is accepted above, the plan is wrong.</div></div>
      <div class="level-card"><div class="mini">Target 1</div><div class="value">Back into R2 / mid-range</div><div class="note">First reaction objective.</div></div>
      <div class="level-card"><div class="mini">Target 2</div><div class="value">FPV / lower support</div><div class="note">Only if rejection becomes real.</div></div>
    </div>
    <div class="grid2">
      <div class="mini-panel">
        <div class="mini">Need to See</div>
        <div class="note">Failure to hold above the zone, fading momentum, weaker candles under the spike high, and no fresh defensive bid.</div>
      </div>
      <div class="mini-panel">
        <div class="mini">What would cancel it</div>
        <div class="note">Sustained strength through resistance, broad dollar weakness, or a macro shock that sends traders back into defensive gold buying.</div>
      </div>
    </div>
    <div class="grid3">
      <div class="mini-panel">
        <div class="mini">Confidence</div>
        <div class="price">3.5 / 5</div>
        <div class="note">Good when structure and macro align.</div>
      </div>
      <div class="mini-panel">
        <div class="mini">Time Horizon</div>
        <div class="price">Intraday</div>
        <div class="note">Can extend if momentum confirms.</div>
      </div>
      <div class="mini-panel">
        <div class="mini">Management</div>
        <div class="price">Active</div>
        <div class="note">Protect once it reacts.</div>
      </div>
    </div>
    <div class="box">
      <div class="mini">Trade Management</div>
      <div class="note">Because gold can snap sharply on headlines, take partial profit into weakness, tighten risk after the first reaction, and avoid overstaying if the move stalls above mid-range.</div>
    </div>
    <div class="callout">
      <div class="mini">Master Template Rule</div>
      <div class="note">Every future Battlefield card should include: setup type, zone map, entry logic, invalidation, targets, need-to-see list, cancellation conditions, confidence, time horizon, and management guidance.</div>
    </div>
  </div>
  `;
}
