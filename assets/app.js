
function nav(active) {
  const links=[['index.html','Home'],['login.html','Login'],['dashboard.html','Command Desk'],['watchlist.html','Watchlist'],['pricing.html','Pricing'],['admin.html','Admin']];
  return `<div class="topnav"><div class="brand">The Trader <span>Edge</span></div><div class="navlinks">${links.map(([h,l])=>`<a href="${h}" ${active===l?'style="border-color:rgba(216,176,108,.28);background:rgba(216,176,108,.12)"':''}>${l}</a>`).join('')}</div></div>`;
}
const DEFAULT_WATCHLIST = {"updatedAt": "Morning Command", "macro": [["NAS100", "Nasdaq 100", "Indices", "up", ["green", "green", "green"], "BUY", "Building", "Premium"], ["SPX500", "S&P 500", "Indices", "up", ["green", "green", "green"], "BUY", "Building", "Premium"], ["GOLD", "Gold Spot", "Metals", "down", ["green", "red", "yellow"], "SELL", "Aligned", "Premium"], ["SILVER", "Silver Spot", "Metals", "up", ["yellow", "yellow", "yellow"], "BUY", "Mixed", "Premium"], ["US30", "Dow 30", "Indices", "up", ["green", "green", "green"], "BUY", "Building", "Premium"], ["US2000", "Russell 2000", "Indices", "up", ["green", "green", "green"], "BUY", "Building", "Premium"], ["UK100", "FTSE 100", "Indices", "down", ["yellow", "red", "red"], "SELL", "Conflicted", "Free"], ["#US$idx", "US Dollar Index", "Forex Proxy", "down", ["red", "red", "red"], "SELL", "Aligned", "Premium"], ["USDJPY", "USDJPY", "Forex", "up", ["green", "red", "yellow"], "BUY", "Watch", "Premium"], ["WTI", "WTI Crude", "Energy", "down", ["yellow", "red", "red"], "SELL", "Aligned", "Premium"], ["BRENT", "Brent Crude", "Energy", "down", ["yellow", "red", "yellow"], "SELL", "Watch", "Premium"], ["GERMANY40", "Germany 40", "Indices", "up", ["red", "yellow", "green"], "BUY", "Conflicted", "Premium"], ["BP.L", "BP Plc", "Equity", "up", ["red", "yellow", "green"], "BUY", "Conflicted", "Premium"]], "crypto": [["AAVE", "Aave", "Crypto", "up", ["green", "green", "green"], "BUY", "Building", "Premium"], ["ALGORAND", "Algorand", "Crypto", "up", ["green", "green", "green"], "BUY", "Building", "Premium"], ["APTOS", "Aptos", "Crypto", "down", ["green", "red", "yellow"], "SELL", "Watch", "Premium"], ["AVALANCHE", "Avalanche", "Crypto", "up", ["yellow", "yellow", "yellow"], "BUY", "Mixed", "Premium"], ["BITCOIN", "Bitcoin", "Crypto", "up", ["green", "green", "green"], "BUY", "Building", "Premium"], ["CARDANO", "Cardano", "Crypto", "down", ["yellow", "red", "red"], "SELL", "Aligned", "Premium"], ["CHAINLINK", "Chainlink", "Crypto", "down", ["yellow", "red", "red"], "SELL", "Aligned", "Premium"], ["DOGECOIN", "Dogecoin", "Crypto", "down", ["yellow", "red", "yellow"], "SELL", "Watch", "Premium"], ["ETHEREUM", "Ethereum", "Crypto", "down", ["yellow", "red", "yellow"], "SELL", "Watch", "Premium"], ["LITECOIN", "Litecoin", "Crypto", "down", ["yellow", "red", "yellow"], "SELL", "Watch", "Premium"], ["NEAR", "NEAR", "Crypto", "down", ["yellow", "red", "red"], "SELL", "Aligned", "Premium"], ["POLKADOT", "Polkadot", "Crypto", "down", ["yellow", "red", "yellow"], "SELL", "Watch", "Premium"], ["SOLANA", "Solana", "Crypto", "down", ["yellow", "red", "yellow"], "SELL", "Watch", "Premium"], ["THETA", "Theta", "Crypto", "up", ["red", "yellow", "green"], "BUY", "Conflicted", "Premium"], ["XRP", "XRP", "Crypto", "up", ["red", "yellow", "green"], "BUY", "Conflicted", "Premium"]]};
function getWatchlistData() {
  try {
    const raw = localStorage.getItem('tte_watchlist_data');
    if (!raw) return DEFAULT_WATCHLIST;
    return JSON.parse(raw);
  } catch (e) {
    return DEFAULT_WATCHLIST;
  }
}
function setWatchlistData(data) {
  localStorage.setItem('tte_watchlist_data', JSON.stringify(data));
}
function conv(arr) {
  return `<div class="blocks">${arr.map(c=>`<span class="block ${c}"></span>`).join('')}</div>`;
}
function watchRow(r) {
  return `<div class="wrow"><div><div class="sym">${r[0]}</div><div class="name">${r[1]}</div></div><div>${r[2]}</div><div>${r[3]==='up'?'<span class="arrow-up">↑</span>':'<span class="arrow-down">↓</span>'}</div><div>${conv(r[4])}</div><div><span class="pill ${r[5]==='BUY'?'buy':'sell'}">${r[5]}</span></div><div>${r[6]}</div><div>${r[7]}</div></div>`;
}
function renderWatchlist() {
  const data = getWatchlistData();
  document.getElementById('updatedSession').textContent = data.updatedAt || 'Latest';
  document.getElementById('macro').innerHTML = data.macro.map(watchRow).join('');
  document.getElementById('crypto').innerHTML = data.crypto.map(watchRow).join('');
}
function previewScanImage(input) {
  const file = input.files && input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    const img = document.getElementById('scanPreview');
    img.src = e.target.result;
    img.style.display = 'block';
  };
  reader.readAsDataURL(file);
}
function optionList(selected, arr) {
  return arr.map(v => `<option value="${v}" ${selected===v?'selected':''}>${v}</option>`).join('');
}
function rowEditor(section, idx, row) {
  return `<div class="admin-row">
    <input data-section="${section}" data-idx="${idx}" data-field="ticker" value="${row[0]}">
    <input data-section="${section}" data-idx="${idx}" data-field="name" value="${row[1]}">
    <input data-section="${section}" data-idx="${idx}" data-field="category" value="${row[2]}">
    <select data-section="${section}" data-idx="${idx}" data-field="trend">${optionList(row[3], ['up','down'])}</select>
    <select data-section="${section}" data-idx="${idx}" data-field="conv0">${optionList(row[4][0], ['green','yellow','red'])}</select>
    <select data-section="${section}" data-idx="${idx}" data-field="conv1">${optionList(row[4][1], ['green','yellow','red'])}</select>
    <select data-section="${section}" data-idx="${idx}" data-field="conv2">${optionList(row[4][2], ['green','yellow','red'])}</select>
    <select data-section="${section}" data-idx="${idx}" data-field="bias">${optionList(row[5], ['BUY','SELL'])}</select>
    <input data-section="${section}" data-idx="${idx}" data-field="state" value="${row[6]}">
    <select data-section="${section}" data-idx="${idx}" data-field="access">${optionList(row[7], ['Free','Premium'])}</select>
    <div class="row-tools"><button class="icon-btn" onclick="removeRow('${section}',${idx})">✕</button></div>
  </div>`;
}
let adminData = null;
function loadDataToAdmin(data) {
  adminData = JSON.parse(JSON.stringify(data));
  document.getElementById('sessionName').value = adminData.updatedAt || 'Update';
  document.getElementById('macroTable').innerHTML = adminData.macro.map((r,i)=>rowEditor('macro', i, r)).join('');
  document.getElementById('cryptoTable').innerHTML = adminData.crypto.map((r,i)=>rowEditor('crypto', i, r)).join('');
  bindEditors();
}
function bindEditors() {
  document.querySelectorAll('[data-field]').forEach(el => {
    el.oninput = () => applyEdit(el);
    el.onchange = () => applyEdit(el);
  });
}
function applyEdit(el) {
  const section = el.dataset.section;
  const idx = Number(el.dataset.idx);
  const field = el.dataset.field;
  const row = adminData[section][idx];
  const val = el.value;
  if (field === 'ticker') row[0] = val;
  else if (field === 'name') row[1] = val;
  else if (field === 'category') row[2] = val;
  else if (field === 'trend') row[3] = val;
  else if (field === 'conv0') row[4][0] = val;
  else if (field === 'conv1') row[4][1] = val;
  else if (field === 'conv2') row[4][2] = val;
  else if (field === 'bias') row[5] = val;
  else if (field === 'state') row[6] = val;
  else if (field === 'access') row[7] = val;
}
function removeRow(section, idx) {
  adminData[section].splice(idx,1);
  loadDataToAdmin(adminData);
}
function addRow(section) {
  adminData[section].push(['NEW','New Instrument','Category','up',['green','green','green'],'BUY','Watch','Premium']);
  loadDataToAdmin(adminData);
}
function loadDefaultsIntoAdmin() { loadDataToAdmin(DEFAULT_WATCHLIST); }
function loadSavedIntoAdmin() { loadDataToAdmin(getWatchlistData()); }
function saveAdminToWatchlist() {
  adminData.updatedAt = document.getElementById('sessionName').value || 'Update';
  setWatchlistData(adminData);
  document.getElementById('status').textContent = 'Watchlist updated locally. Refresh Watchlist page.';
}
