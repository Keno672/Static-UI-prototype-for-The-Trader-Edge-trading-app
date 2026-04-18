
const DEFAULT_WATCHLIST = {"updatedAt": "Morning Command", "macro": [["GOLD", "Gold Spot", "Metals", "down", ["green", "red", "yellow"], "SELL", "Aligned", "Premium"], ["NAS100", "Nasdaq 100", "Indices", "up", ["green", "green", "green"], "BUY", "Building", "Premium"], ["SPX500", "S&P 500", "Indices", "up", ["green", "green", "green"], "BUY", "Building", "Premium"], ["EURUSD", "EURUSD", "Forex", "up", ["red", "green", "green"], "BUY", "Building", "Premium"], ["WTI", "WTI Crude", "Energy", "down", ["yellow", "red", "red"], "SELL", "Aligned", "Premium"]], "crypto": [["BITCOIN", "Bitcoin", "Crypto", "up", ["green", "green", "green"], "BUY", "Building", "Premium"], ["ETHEREUM", "Ethereum", "Crypto", "down", ["yellow", "red", "yellow"], "SELL", "Watch", "Premium"], ["XRP", "XRP", "Crypto", "up", ["red", "yellow", "green"], "BUY", "Conflicted", "Premium"]]};
function nav(active){const links=[['index.html','Home'],['login.html','Login'],['dashboard.html','Command Desk'],['watchlist.html','Watchlist'],['pricing.html','Pricing'],['admin.html','Admin']];return `<div class="topnav"><div class="brand">The Trader <span>Edge</span></div><div class="navlinks">${links.map(([h,l])=>`<a href="${h}" ${active===l?'style="border-color:rgba(216,176,108,.28);background:rgba(216,176,108,.12)"':''}>${l}</a>`).join('')}</div></div>`;}
function getWatchlistData(){try{const raw=localStorage.getItem('tte_watchlist_data');if(!raw)return DEFAULT_WATCHLIST;return JSON.parse(raw)}catch(e){return DEFAULT_WATCHLIST}}
function getUploads(){try{return JSON.parse(localStorage.getItem('tte_uploads_meta')||'{}')}catch(e){return {}}}
function conv(arr){return `<div class="blocks">${arr.map(c=>`<span class="block ${c}"></span>`).join('')}</div>`}
function allRows(){const d=getWatchlistData(); return [...d.macro,...d.crypto];}
function findRow(ticker){return allRows().find(r=>r[0]===ticker) || allRows()[0];}

function renderIntelForRow(r){
  return `<div class="card intel"><div class="topline"><div class="tag">Free · Intel</div><div class="pricebox"><div class="mini">State</div><div class="price">${r[6]}</div></div></div><div style="margin-top:14px"><div class="symbol">${r[0]}</div><div class="subtitle">${r[1]} · ${r[2]}</div></div><div class="statusrow"><div class="pill ${r[5]==='BUY'?'buy':'sell'}">${r[5]}</div><div class="pill mixed">${r[7]}</div></div><div class="box"><div class="mini">Scan Intel</div><div class="scanrow"><div>Trend</div><div>${r[3]==='up'?'<span class="arrow-up">↑</span> up':'<span class="arrow-down">↓</span> down'}</div></div><div class="scanrow"><div>Convergence</div><div>${conv(r[4])}</div></div><div class="scanrow"><div>Bias</div><div>${r[5]}</div></div><div class="scanrow"><div>State</div><div>${r[6]}</div></div></div></div>`;
}

function renderBattleForRow(r){
  return `<div class="card battle"><div class="topline"><div class="tag">Premium · Battlefield</div><div class="pricebox"><div class="mini">Instrument</div><div class="price">${r[0]}</div></div></div><div style="margin-top:14px"><div class="symbol">${r[0]}</div><div class="subtitle">${r[1]} battle plan</div></div><div class="statusrow"><div class="pill ${r[5]==='BUY'?'buy':'sell'}">${r[5]==='BUY'?'BUY DEFENCE':'SELL ASSAULT'}</div><div class="pill mixed">${r[6]}</div></div><div class="chart"><div class="line stop"></div><div class="label ls">Stop</div><div class="zone"></div><div class="label lz">Entry Zone</div><div class="line live"></div><div class="label ll">Live</div><div class="line target"></div><div class="label lt">Target</div><div class="route">➜</div></div><div class="box"><div class="mini">Battlefield Note</div><div class="note">${r[5]==='BUY'?'Buy dips while structure stays supported.':'Fade rallies while the board stays weak.'}</div></div></div>`;
}

function newsModelForRow(r){
  const uploads = getUploads();
  const ticker = r[0];
  const defensive = ['GOLD','SILVER','#US$idx','WTI','BRENT'];
  const riskOn = r[5] === 'BUY' && !defensive.includes(ticker);
  const regime = riskOn ? 'Risk-On' : 'Risk-Off';
  const why = riskOn
    ? 'risk assets are being supported, the defensive trade is not dominant, and buyers are still willing to press higher'
    : 'defensive pressure is stronger, the setup is leaning into caution, and the market is not rewarding aggressive risk-taking here';
  const sources = uploads.newsName || 'Trader Noble daily commentary + FxPro Squawk';
  const bullets = riskOn
    ? ['Equities / growth supported','Dollar not dominating','Dip buyers active']
    : ['Defensive tone','Pressure trade active','Need caution on continuation'];
  return {regime, why, sources, bullets};
}

function renderNewsForRow(r){
  const meta = newsModelForRow(r);
  return `<div class="card news"><div class="topline"><div class="tag">Free · News</div><div class="pricebox"><div class="mini">Sources</div><div class="price" style="font-size:18px">Noble + FxPro</div></div></div><div style="margin-top:14px"><div class="symbol" style="font-size:38px">WAR ROOM CONTEXT</div><div class="subtitle">${r[0]} · linked news layer</div></div><div class="box"><div class="news-sub">Environment</div><div class="news-headline">${meta.regime}</div><div class="statusrow"><div class="pill ${meta.regime==='Risk-On'?'buy':'sell'}">${r[5]} bias</div><div class="pill mixed">${r[6]}</div></div></div><div class="tile-grid"><div class="tile"><div class="mini">Why</div><div class="note">${meta.why}</div></div><div class="tile"><div class="mini">Affected Instrument</div><div class="price" style="font-size:28px">${r[0]}</div></div><div class="tile"><div class="mini">Current Board</div><div>${conv(r[4])}</div></div><div class="tile"><div class="mini">Sources Used</div><div class="note">${meta.sources}</div></div></div><div class="box"><div class="mini">Key Drivers</div><div class="watchlist-pills">${meta.bullets.map(b=>`<span class="pill">${b}</span>`).join('')}</div></div><div class="box"><div class="mini">Command Use</div><div class="note">Trader Noble gives the daily frame. FxPro Squawk gives the up-to-the-minute shift in tone. This card should tell the user whether the environment is risk-on or risk-off and why that matters for the current instrument.</div></div></div>`;
}

function renderDashboard(){const r=findRow('GOLD'); const el=document.getElementById('dashboardCards'); if(el) el.innerHTML = renderIntelForRow(r)+renderBattleForRow(r)+renderNewsForRow(r);}
function renderAssetPage(){const ticker=localStorage.getItem('tte_selected_instrument')||'GOLD'; const r=findRow(ticker); const title=document.getElementById('assetTitle'); if(title) title.textContent = r[0] + ' Command Page'; const sub=document.getElementById('assetSubtitle'); if(sub) sub.textContent = r[1] + ' · ' + r[2] + ' · latest applied scan'; const el=document.getElementById('assetCards'); if(el) el.innerHTML = renderIntelForRow(r)+renderBattleForRow(r)+renderNewsForRow(r);}
