
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
  const macro = document.getElementById('macro');
  const crypto = document.getElementById('crypto');
  const updated = document.getElementById('updatedSession');
  if (updated) updated.textContent = data.updatedAt || 'Latest';
  if (macro) macro.innerHTML = data.macro.map(watchRow).join('');
  if (crypto) crypto.innerHTML = data.crypto.map(watchRow).join('');
}
function loadDefaultsIntoAdmin() {
  const data = DEFAULT_WATCHLIST;
  document.getElementById('sessionName').value = data.updatedAt || 'Morning Command';
  document.getElementById('macroJson').value = JSON.stringify(data.macro, null, 2);
  document.getElementById('cryptoJson').value = JSON.stringify(data.crypto, null, 2);
}
function loadSavedIntoAdmin() {
  const data = getWatchlistData();
  document.getElementById('sessionName').value = data.updatedAt || 'Morning Command';
  document.getElementById('macroJson').value = JSON.stringify(data.macro, null, 2);
  document.getElementById('cryptoJson').value = JSON.stringify(data.crypto, null, 2);
}
function saveAdminToWatchlist() {
  try {
    const updatedAt = document.getElementById('sessionName').value || 'Update';
    const macro = JSON.parse(document.getElementById('macroJson').value);
    const crypto = JSON.parse(document.getElementById('cryptoJson').value);
    setWatchlistData({updatedAt, macro, crypto});
    document.getElementById('status').textContent = 'Watchlist updated locally. Refresh Watchlist page.';
  } catch (e) {
    document.getElementById('status').textContent = 'JSON format error. Check commas, brackets, and quotes.';
  }
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
