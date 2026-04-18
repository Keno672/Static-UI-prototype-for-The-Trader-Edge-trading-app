
const DEFAULT_WATCHLIST = {"updatedAt": "Morning Command", "macro": [["NAS100", "Nasdaq 100", "Indices", "up", ["green", "green", "green"], "BUY", "Building", "Premium"], ["SPX500", "S&P 500", "Indices", "up", ["green", "green", "green"], "BUY", "Building", "Premium"], ["GOLD", "Gold Spot", "Metals", "down", ["green", "red", "yellow"], "SELL", "Aligned", "Premium"], ["SILVER", "Silver Spot", "Metals", "up", ["yellow", "yellow", "yellow"], "BUY", "Mixed", "Premium"], ["US30", "Dow 30", "Indices", "up", ["green", "green", "green"], "BUY", "Building", "Premium"], ["UK100", "FTSE 100", "Indices", "down", ["yellow", "red", "red"], "SELL", "Conflicted", "Free"], ["#US$idx", "US Dollar Index", "Forex Proxy", "down", ["red", "red", "red"], "SELL", "Aligned", "Premium"], ["USDJPY", "USDJPY", "Forex", "up", ["green", "red", "yellow"], "BUY", "Watch", "Premium"], ["WTI", "WTI Crude", "Energy", "down", ["yellow", "red", "red"], "SELL", "Aligned", "Premium"], ["EURUSD", "EURUSD", "Forex", "up", ["red", "green", "green"], "BUY", "Building", "Premium"]], "crypto": [["BITCOIN", "Bitcoin", "Crypto", "up", ["green", "green", "green"], "BUY", "Building", "Premium"], ["ETHEREUM", "Ethereum", "Crypto", "down", ["yellow", "red", "yellow"], "SELL", "Watch", "Premium"], ["SOLANA", "Solana", "Crypto", "down", ["yellow", "red", "yellow"], "SELL", "Watch", "Premium"], ["XRP", "XRP", "Crypto", "up", ["red", "yellow", "green"], "BUY", "Conflicted", "Premium"]]};

function nav(active){
  const links=[['index.html','Home'],['login.html','Login'],['dashboard.html','Command Desk'],['watchlist.html','Watchlist'],['pricing.html','Pricing'],['admin.html','Admin']];
  return `<div class="topnav"><div class="brand">The Trader <span>Edge</span></div><div class="navlinks">${links.map(([h,l])=>`<a href="${h}" ${active===l?'style="border-color:rgba(216,176,108,.34);background:rgba(216,176,108,.10)"':''}>${l}</a>`).join('')}</div></div>`;
}
function getWatchlistData(){try{return JSON.parse(localStorage.getItem('tte_watchlist_data')||JSON.stringify(DEFAULT_WATCHLIST))}catch(e){return DEFAULT_WATCHLIST}}
function setWatchlistData(d){localStorage.setItem('tte_watchlist_data',JSON.stringify(d))}
function getUploads(){try{return JSON.parse(localStorage.getItem('tte_uploads_meta')||'{}')}catch(e){return {}}}
function setUploads(d){localStorage.setItem('tte_uploads_meta',JSON.stringify(d))}
function setSelectedInstrument(t){localStorage.setItem('tte_selected_instrument',t)}
function getSelectedInstrument(){return localStorage.getItem('tte_selected_instrument')||'GOLD'}
function conv(arr){return `<div class="blocks">${arr.map(c=>`<span class="block ${c}"></span>`).join('')}</div>`}
function allRows(){const d=getWatchlistData(); return [...d.macro,...d.crypto];}
function findRow(t){return allRows().find(r=>r[0]===t) || allRows()[0];}

function newsModel(r){
  const defensive=['GOLD','SILVER','#US$idx','WTI'];
  const riskOn=r[5]==='BUY' && !defensive.includes(r[0]);
  return {
    regime:riskOn?'Risk-On':'Risk-Off',
    why:riskOn?'risk assets are being supported, defensive flows are not dominant, and dip buyers are active':'defensive pressure is stronger, caution matters more, and the market is not rewarding aggressive risk-taking here',
    sources:'Trader Noble daily commentary + FxPro Squawk',
    bullets:riskOn?['Equities supported','Dollar not dominating','Dip buyers active']:['Defensive tone','Pressure trade active','Need caution on continuation']
  };
}

function intelCard(r){
  const profile = {
    'GOLD':'Defensive metal · yield and dollar sensitive',
    'EURUSD':'Major FX pair · dollar and rates sensitive',
    'NAS100':'Growth index · sentiment and yields sensitive',
    'SPX500':'Broad U.S. equity index · macro sentiment barometer',
    'BITCOIN':'High-beta crypto leader · liquidity and risk appetite driven'
  }[r[0]] || (r[2] + ' instrument');
  return `<div class="card intel">
    <div class="topline"><div class="tag">Free · Intel</div><div class="pricebox"><div class="mini">State</div><div class="price">${r[6]}</div></div></div>
    <div style="margin-top:14px"><div class="symbol">${r[0]}</div><div class="subtitle">${r[1]} · ${profile}</div></div>
    <div class="statusrow"><div class="pill ${r[5]==='BUY'?'buy':'sell'}">${r[5]} bias</div><div class="pill mixed">${r[7]}</div></div>
    <div class="box"><div class="mini">Fast Read</div><div class="hero-note">${r[5]==='BUY'?'Buy-side pressure still in control.':'Sellers have the better ground while resistance holds.'}</div></div>
    <div class="box">
      <div class="mini">Scan Intel</div>
      <div class="scanrow"><div>Trend</div><div>${r[3]==='up'?'<span class="arrow-up">↑</span> up':'<span class="arrow-down">↓</span> down'}</div></div>
      <div class="scanrow"><div>Convergence</div><div>${conv(r[4])}</div></div>
      <div class="scanrow"><div>Bias</div><div>${r[5]}</div></div>
      <div class="scanrow"><div>State</div><div>${r[6]}</div></div>
    </div>
    <div class="stats2">
      <div class="mini-panel"><div class="mini">Trend Strength</div><div class="price">${r[3]==='up'?'61% Up':'53% Down'}</div></div>
      <div class="mini-panel"><div class="mini">Reversal Risk</div><div class="price">${r[4].includes('red')?'3 / 5':'2 / 5'}</div></div>
    </div>
    <div class="box"><div class="mini">Plain-English Intel</div><div class="note">${r[5]==='BUY'?'The board still favours buyers, but you want entry at a tactical zone rather than chasing.':'This is a structured fade while the market stays weak into resistance, not a random short.'}</div></div>
  </div>`
}

function battleCard(r){
  return `<div class="card battle">
    <div class="topline"><div class="tag">Premium · Battlefield</div><div class="pricebox"><div class="mini">Setup Type</div><div class="price">${r[5]==='BUY'?'Buy the Dip':'Sell the Rally'}</div></div></div>
    <div style="margin-top:14px"><div class="symbol">${r[0]}</div><div class="subtitle">${r[1]} battle plan</div></div>
    <div class="statusrow"><div class="pill ${r[5]==='BUY'?'buy':'sell'}">${r[5]==='BUY'?'BUY DEFENCE':'SELL ASSAULT'}</div><div class="pill mixed">${r[6]}</div><div class="pill mixed">Intraday</div></div>
    <div class="box"><div class="mini">Battlefield Summary</div><div class="hero-note">${r[5]==='BUY'?'Use weakness into support, then press if price responds.':'Sell rallies into the resistance band while the rejection structure holds.'}</div></div>
    <div class="chart">
      <div class="line stop"></div><div class="label ls">Invalidation</div>
      <div class="zone"></div><div class="label lz">Entry Zone</div>
      <div class="line live"></div><div class="label ll">Live</div>
      <div class="line fpv"></div><div class="label lf">FPV</div>
      <div class="line target"></div><div class="label lt">Target</div>
      <div class="route">➜</div>
    </div>
    <div class="battle-levels">
      <div class="level-card"><div class="mini">Entry Logic</div><div class="price" style="font-size:24px">${r[5]==='BUY'?'Buy support reaction':'Fade resistance reaction'}</div></div>
      <div class="level-card"><div class="mini">Invalidation</div><div class="price" style="font-size:24px">${r[5]==='BUY'?'Break below support':'Hold above resistance'}</div></div>
      <div class="level-card"><div class="mini">Target 1</div><div class="price" style="font-size:24px">${r[5]==='BUY'?'Mid-range reclaim':'Back into mid-range'}</div></div>
      <div class="level-card"><div class="mini">Target 2</div><div class="price" style="font-size:24px">${r[5]==='BUY'?'Resistance / FPV':'FPV / lower support'}</div></div>
    </div>
    <div class="box"><div class="mini">Management</div><div class="note">${r[5]==='BUY'?'Protect once it bounces. If it stalls under resistance, reduce exposure.':'Take partial profit into weakness and avoid overstaying if price refuses to break lower.'}</div></div>
  </div>`
}

function newsCard(r){
  const m=newsModel(r);
  return `<div class="card news">
    <div class="topline"><div class="tag">Free · News</div><div class="pricebox"><div class="mini">Sources</div><div class="price" style="font-size:18px">Noble + FxPro</div></div></div>
    <div style="margin-top:14px"><div class="symbol" style="font-size:42px">WAR ROOM CONTEXT</div><div class="subtitle">${r[0]} · risk environment and why</div></div>
    <div class="box"><div class="news-sub">Environment</div><div class="news-headline">${m.regime}</div><div class="statusrow"><div class="pill ${m.regime==='Risk-On'?'buy':'sell'}">${r[5]} bias</div><div class="pill mixed">${r[6]}</div></div></div>
    <div class="tile-grid">
      <div class="tile"><div class="mini">Why</div><div class="note">${m.why}</div></div>
      <div class="tile"><div class="mini">Affected Instrument</div><div class="price">${r[0]}</div></div>
      <div class="tile"><div class="mini">Current Board</div><div>${conv(r[4])}</div></div>
      <div class="tile"><div class="mini">Sources Used</div><div class="note">${m.sources}</div></div>
    </div>
    <div class="box"><div class="mini">Key Drivers</div><div class="watchlist-pills">${m.bullets.map(b=>`<span class="pill">${b}</span>`).join('')}</div></div>
  </div>`
}

function plusCardForEURUSD(){
  return `<div class="card plus">
    <div class="topline"><div class="tag pluspill">Premium Plus · €6</div><div class="pricebox"><div class="mini">Depth</div><div class="price">In-depth read</div></div></div>
    <div style="margin-top:14px"><div class="symbol">Premium Plus Desk</div><div class="subtitle">Detailed reasoning for any live setup</div></div>
    <div class="statusrow"><div class="pill buy">Bias: bullish overall</div><div class="pill sell">Setup: reaction short</div></div>
    <div class="box"><div class="mini">Plain-English decision</div><div class="hero-note" style="font-size:34px">Yes, but only as a reaction short.</div><div class="note">You can take the sell, but it is a reaction short, not a high-conviction bearish reversal.</div></div>
    <div class="tile-grid">
      <div class="tile"><div class="mini">Valid only if</div><div class="note">Price fails to hold above resistance, momentum fades, and the recent spike high stays intact.</div></div>
      <div class="tile"><div class="mini">Not ideal because</div><div class="note">Broader structure is still up and you are selling into strength, not with the main flow.</div></div>
      <div class="tile"><div class="mini">Need to see</div><div class="note">Rejection and loss of the upper zone.</div></div>
      <div class="tile"><div class="mini">Management</div><div class="note">Take profit quicker and protect it once it reacts.</div></div>
    </div>
  </div>`
}

function renderDashboard(){
  const r=findRow('GOLD');
  const el=document.getElementById('dashboardCards');
  if(el) el.innerHTML = intelCard(r)+battleCard(r)+newsCard(r);
}
function renderWatchlist(){
  const d=getWatchlistData();
  const u=document.getElementById('updatedSession');
  if(u) u.textContent=d.updatedAt||'Latest';
  const row = r => `<div class="wrow clickable" onclick="openAsset('${r[0]}')"><div><div class="symbol" style="font-size:20px">${r[0]}</div><div class="subtitle">${r[1]}</div></div><div>${r[2]}</div><div>${r[3]==='up'?'<span class="arrow-up">↑</span>':'<span class="arrow-down">↓</span>'}</div><div>${conv(r[4])}</div><div><span class="pill ${r[5]==='BUY'?'buy':'sell'}">${r[5]}</span></div><div>${r[6]}</div><div>${r[7]}</div></div>`;
  document.getElementById('macro').innerHTML=d.macro.map(row).join('');
  document.getElementById('crypto').innerHTML=d.crypto.map(row).join('');
}
function openAsset(t){setSelectedInstrument(t);window.location.href='asset.html';}
function renderAssetPage(){
  const r=findRow(getSelectedInstrument());
  document.getElementById('assetTitle').textContent=r[0]+' Command Page';
  document.getElementById('assetSubtitle').textContent=r[1]+' · '+r[2]+' · command view';
  const content = r[0]==='EURUSD' ? intelCard(r)+battleCard(r)+plusCardForEURUSD() : intelCard(r)+battleCard(r)+newsCard(r);
  document.getElementById('assetCards').innerHTML=content;
}
function previewUpload(input,type){
  const f=input.files&&input.files[0]; if(!f) return;
  const u=getUploads(); u[type+'Name']=f.name; setUploads(u);
  const lab=document.getElementById(type+'FileLabel'); if(lab) lab.textContent=f.name;
  if(type==='scan'){
    const reader=new FileReader();
    reader.onload=e=>{const img=document.getElementById('scanPreview'); if(img){img.src=e.target.result; img.style.display='block';}};
    reader.readAsDataURL(f);
  }
  updateUploadSummary();
}
function updateUploadSummary(){
  const u=getUploads();
  const el=document.getElementById('uploadSummary');
  if(el) el.innerHTML = `<div class="last-file"><strong>Scan:</strong> ${u.scanName||'None'}</div><div class="last-file"><strong>Chart:</strong> ${u.chartName||'None'}</div><div class="last-file"><strong>News:</strong> ${u.newsName||'None'}</div>`;
}
function optionList(sel,arr){return arr.map(v=>`<option value="${v}" ${sel===v?'selected':''}>${v}</option>`).join('')}
function rowEditor(section,idx,row){
  return `<div class="admin-row"><input data-section="${section}" data-idx="${idx}" data-field="ticker" value="${row[0]}"><input data-section="${section}" data-idx="${idx}" data-field="name" value="${row[1]}"><input data-section="${section}" data-idx="${idx}" data-field="category" value="${row[2]}"><select data-section="${section}" data-idx="${idx}" data-field="trend">${optionList(row[3],['up','down'])}</select><select data-section="${section}" data-idx="${idx}" data-field="conv0">${optionList(row[4][0],['green','yellow','red'])}</select><select data-section="${section}" data-idx="${idx}" data-field="conv1">${optionList(row[4][1],['green','yellow','red'])}</select><select data-section="${section}" data-idx="${idx}" data-field="conv2">${optionList(row[4][2],['green','yellow','red'])}</select><select data-section="${section}" data-idx="${idx}" data-field="bias">${optionList(row[5],['BUY','SELL'])}</select><input data-section="${section}" data-idx="${idx}" data-field="state" value="${row[6]}"><select data-section="${section}" data-idx="${idx}" data-field="access">${optionList(row[7],['Free','Premium'])}</select><div class="row-tools"><button class="icon-btn" onclick="removeRow('${section}',${idx})">✕</button></div></div>`;
}
let adminData=null;
function loadDataToAdmin(d){
  adminData=JSON.parse(JSON.stringify(d));
  const s=document.getElementById('sessionName'); if(s) s.value=adminData.updatedAt||'Update';
  document.getElementById('macroTable').innerHTML=adminData.macro.map((r,i)=>rowEditor('macro',i,r)).join('');
  document.getElementById('cryptoTable').innerHTML=adminData.crypto.map((r,i)=>rowEditor('crypto',i,r)).join('');
  bindEditors(); updateUploadSummary();
}
function bindEditors(){document.querySelectorAll('[data-field]').forEach(el=>{el.oninput=()=>applyEdit(el); el.onchange=()=>applyEdit(el);})}
function applyEdit(el){
  const s=el.dataset.section, i=Number(el.dataset.idx), f=el.dataset.field, r=adminData[s][i], v=el.value;
  if(f==='ticker')r[0]=v; else if(f==='name')r[1]=v; else if(f==='category')r[2]=v; else if(f==='trend')r[3]=v;
  else if(f==='conv0')r[4][0]=v; else if(f==='conv1')r[4][1]=v; else if(f==='conv2')r[4][2]=v;
  else if(f==='bias')r[5]=v; else if(f==='state')r[6]=v; else if(f==='access')r[7]=v;
}
function removeRow(s,i){adminData[s].splice(i,1); loadDataToAdmin(adminData)}
function addRow(s){adminData[s].push(['NEW','New Instrument','Category','up',['green','green','green'],'BUY','Watch','Premium']); loadDataToAdmin(adminData)}
function loadDefaultsIntoAdmin(){loadDataToAdmin(DEFAULT_WATCHLIST)}
function loadSavedIntoAdmin(){loadDataToAdmin(getWatchlistData())}
function toggleAdvanced(){document.getElementById('advancedEditor').classList.toggle('hidden')}
function applyThisScan(){
  adminData.updatedAt=document.getElementById('sessionName').value||'Update';
  setWatchlistData(adminData);
  const st=document.getElementById('status');
  if(st){st.className='status good'; st.textContent='Update published. Watchlist and asset pages now use this board.';}
}
