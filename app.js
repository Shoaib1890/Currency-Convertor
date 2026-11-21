/**
 * Currenzo — Institutional FX & Currency Engine
 * Robust rate fetching with multiple CDN & direct API fallbacks,
 * instant calculation, searchable currency modal, and sleek UX micro-interactions.
 */

// Application State
const state = {
  fromCurr: "USD",
  toCurr: "INR",
  amount: 1000,
  rate: 1,
  matrixDirection: "direct", // "direct" (from -> to) or "inverse" (to -> from)
  ratesCache: {}, // { "usd": { inr: 84.35, eur: 0.92, ... } }
  activePickerTarget: "from", // "from" or "to"
  isLoading: false
};

// DOM References
const elements = {
  themeToggle: document.getElementById("themeToggle"),
  amountInput: document.getElementById("amountInput"),
  amountCurrencyTag: document.getElementById("amountCurrencyTag"),
  fromSymbolPrefix: document.getElementById("fromSymbolPrefix"),
  clearAmountBtn: document.getElementById("clearAmountBtn"),
  fromTile: document.getElementById("fromTile"),
  toTile: document.getElementById("toTile"),
  fromFlag: document.getElementById("fromFlag"),
  toFlag: document.getElementById("toFlag"),
  fromCode: document.getElementById("fromCode"),
  toCode: document.getElementById("toCode"),
  fromName: document.getElementById("fromName"),
  toName: document.getElementById("toName"),
  swapBtn: document.getElementById("swapBtn"),
  resultValue: document.getElementById("resultValue"),
  resultUnit: document.getElementById("resultUnit"),
  conversionSummary: document.getElementById("conversionSummary"),
  directRateText: document.getElementById("directRateText"),
  inverseRateText: document.getElementById("inverseRateText"),
  lastUpdatedText: document.getElementById("lastUpdatedText"),
  copyBtn: document.getElementById("copyBtn"),
  refreshBtn: document.getElementById("refreshBtn"),
  matrixGrid: document.getElementById("matrixGrid"),
  matrixSub: document.getElementById("matrixSub"),
  tabDirect: document.getElementById("tabDirect"),
  tabInverse: document.getElementById("tabInverse"),
  intelInverseRate: document.getElementById("intelInverseRate"),
  intelTargetSymbol: document.getElementById("intelTargetSymbol"),
  currencyModal: document.getElementById("currencyModal"),
  closeModalBtn: document.getElementById("closeModalBtn"),
  currencySearchInput: document.getElementById("currencySearchInput"),
  clearSearchBtn: document.getElementById("clearSearchBtn"),
  modalPopularChips: document.getElementById("modalPopularChips"),
  currencyListContainer: document.getElementById("currencyListContainer"),
  modalTitle: document.getElementById("modalTitle"),
  modalSub: document.getElementById("modalSub"),
  toast: document.getElementById("toast"),
  quickPairsContainer: document.getElementById("quickPairsContainer")
};

// Utilities: Formatting Numbers
function formatNumber(num, maxDecimals = 4) {
  if (isNaN(num) || num === null) return "--";
  if (num === 0) return "0.00";
  
  if (num >= 1000) {
    return num.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  } else if (num >= 1) {
    return num.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: maxDecimals
    });
  } else {
    // Small fractions like 0.00012
    return num.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: Math.max(4, maxDecimals)
    });
  }
}

function parseCleanAmount(str) {
  if (!str) return 0;
  const cleaned = str.toString().replace(/,/g, "").trim();
  const val = parseFloat(cleaned);
  return isNaN(val) ? 0 : Math.max(0, val);
}

// Show Toast
let toastTimeout;
function showToast(message, icon = "fa-solid fa-circle-check") {
  clearTimeout(toastTimeout);
  elements.toast.innerHTML = `<i class="${icon}"></i> <span>${message}</span>`;
  elements.toast.classList.add("active");
  toastTimeout = setTimeout(() => {
    elements.toast.classList.remove("active");
  }, 2400);
}

// Fetch Rates with Cascading Fallbacks
async function fetchExchangeRates(baseCurrency) {
  const base = baseCurrency.toLowerCase();
  
  // Return cached rates if fresh (10 mins)
  if (state.ratesCache[base] && (Date.now() - state.ratesCache[base].timestamp < 1000 * 60 * 10)) {
    return state.ratesCache[base].data;
  }

  const endpoints = [
    `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${base}.json`,
    `https://latest.currency-api.pages.dev/v1/currencies/${base}.json`,
    `https://open.er-api.com/v6/latest/${base.toUpperCase()}`
  ];

  for (const url of endpoints) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);
      const res = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (!res.ok) continue;
      const json = await res.json();

      let rates = null;
      if (json[base]) {
        rates = json[base];
      } else if (json.rates) {
        rates = {};
        for (const [k, v] of Object.entries(json.rates)) {
          rates[k.toLowerCase()] = v;
        }
      }

      if (rates && Object.keys(rates).length > 0) {
        state.ratesCache[base] = {
          data: rates,
          timestamp: Date.now()
        };
        return rates;
      }
    } catch (err) {
      console.warn(`Fallback fetch failed for ${url}:`, err.message);
    }
  }

  throw new Error("Unable to fetch live rates from all servers.");
}

// Update App View
async function updateConversion(forceRefresh = false) {
  if (forceRefresh) {
    delete state.ratesCache[state.fromCurr.toLowerCase()];
    elements.refreshBtn.classList.add("spin-anim");
    setTimeout(() => elements.refreshBtn.classList.remove("spin-anim"), 900);
  }

  elements.lastUpdatedText.textContent = "Fetching live mid-market rates...";

  try {
    const rates = await fetchExchangeRates(state.fromCurr);
    const targetKey = state.toCurr.toLowerCase();
    const rate = rates[targetKey];

    if (!rate) {
      elements.resultValue.textContent = "N/A";
      elements.lastUpdatedText.textContent = "Rate unavailable for this pair";
      return;
    }

    state.rate = rate;
    const finalAmount = state.amount * rate;
    const inverseRate = rate > 0 ? (1 / rate) : 0;

    // Converted Output
    elements.resultValue.textContent = formatNumber(finalAmount, 2);
    elements.resultUnit.textContent = state.toCurr;

    // Calculation summary
    elements.conversionSummary.textContent = `${formatNumber(state.amount, 2)} ${state.fromCurr} =`;

    // Direct & Inverse Rates
    elements.directRateText.textContent = `1 ${state.fromCurr} = ${formatNumber(rate, 4)} ${state.toCurr}`;
    elements.inverseRateText.textContent = `1 ${state.toCurr} = ${formatNumber(inverseRate, 5)} ${state.fromCurr}`;

    // Timestamp
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    elements.lastUpdatedText.textContent = `Live mid-market rate · Updated today at ${timeStr}`;

    // Update Matrix Breakdown & Intelligence
    renderConversionMatrix(rate, state.fromCurr, state.toCurr);
    updateMarketIntelligence(rate, inverseRate);

    // Update Quick Pair chip active state
    updateActivePairChip();

  } catch (err) {
    console.error("Conversion error:", err);
    elements.lastUpdatedText.textContent = "Offline / Market data temporarily unavailable";
    showToast("Network error: Could not refresh rates", "fa-solid fa-triangle-exclamation");
  }
}

// Update Active Pair Chip UI
function updateActivePairChip() {
  const chips = elements.quickPairsContainer.querySelectorAll(".pair-chip");
  chips.forEach(chip => {
    const from = chip.getAttribute("data-from");
    const to = chip.getAttribute("data-to");
    if (from === state.fromCurr && to === state.toCurr) {
      chip.classList.add("active");
    } else {
      chip.classList.remove("active");
    }
  });
}

// Update Market Intelligence
function updateMarketIntelligence(rate, inverseRate) {
  const toMeta = getCurrencyMeta(state.toCurr);
  elements.intelInverseRate.textContent = `1 ${state.toCurr} = ${formatNumber(inverseRate, 5)} ${state.fromCurr}`;
  elements.intelTargetSymbol.textContent = `${toMeta.symbol || ""} (${toMeta.code})`;
}

// Render Conversion Reference Matrix
function renderConversionMatrix(rate, from, to) {
  // Update Tab Labels
  elements.tabDirect.textContent = `${from} → ${to}`;
  elements.tabInverse.textContent = `${to} → ${from}`;

  const isDirect = state.matrixDirection === "direct";
  elements.tabDirect.classList.toggle("active", isDirect);
  elements.tabInverse.classList.toggle("active", !isDirect);

  const activeRate = isDirect ? rate : (rate > 0 ? 1 / rate : 0);
  const baseCurr = isDirect ? from : to;
  const targetCurr = isDirect ? to : from;

  const units = [1, 5, 10, 25, 50, 100, 500, 1000];
  let html = "";
  units.forEach(unit => {
    const converted = unit * activeRate;
    html += `
      <div class="matrix-row">
        <span class="left">${unit.toLocaleString()} <span class="curr-code">${baseCurr}</span></span>
        <span class="right">${formatNumber(converted, 2)} <span class="curr-code">${targetCurr}</span></span>
      </div>
    `;
  });
  elements.matrixGrid.innerHTML = html;
  elements.matrixSub.textContent = `1 ${baseCurr} = ${formatNumber(activeRate, 4)} ${targetCurr}`;
}

// Matrix Tab Switchers
elements.tabDirect.addEventListener("click", () => {
  if (state.matrixDirection !== "direct") {
    state.matrixDirection = "direct";
    renderConversionMatrix(state.rate, state.fromCurr, state.toCurr);
  }
});

elements.tabInverse.addEventListener("click", () => {
  if (state.matrixDirection !== "inverse") {
    state.matrixDirection = "inverse";
    renderConversionMatrix(state.rate, state.fromCurr, state.toCurr);
  }
});

// Update Currency Selector Tiles
function renderSelectedCurrencies() {
  const fromMeta = getCurrencyMeta(state.fromCurr);
  const toMeta = getCurrencyMeta(state.toCurr);

  elements.fromCode.textContent = fromMeta.code;
  elements.fromName.textContent = fromMeta.name;
  elements.fromFlag.src = getFlagUrl(fromMeta.country);
  elements.fromSymbolPrefix.textContent = fromMeta.symbol || "$";
  elements.amountCurrencyTag.textContent = fromMeta.code;

  elements.toCode.textContent = toMeta.code;
  elements.toName.textContent = toMeta.name;
  elements.toFlag.src = getFlagUrl(toMeta.country);
  elements.resultUnit.textContent = toMeta.code;
}

// Swap Currencies
function swapCurrencies() {
  const temp = state.fromCurr;
  state.fromCurr = state.toCurr;
  state.toCurr = temp;

  renderSelectedCurrencies();
  updateConversion();
}

// Amount Input Handling
let debounceTimer;
elements.amountInput.addEventListener("input", (e) => {
  const val = e.target.value;
  elements.clearAmountBtn.classList.toggle("visible", val.length > 0);

  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    state.amount = parseCleanAmount(val);
    updateConversion();
  }, 250);
});

elements.clearAmountBtn.addEventListener("click", () => {
  elements.amountInput.value = "";
  state.amount = 0;
  elements.clearAmountBtn.classList.remove("visible");
  elements.amountInput.focus();
  updateConversion();
});

// Preset Amount Buttons
document.querySelectorAll(".preset-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const val = parseFloat(btn.getAttribute("data-val"));
    state.amount = val;
    elements.amountInput.value = val.toLocaleString("en-US");
    elements.clearAmountBtn.classList.add("visible");

    document.querySelectorAll(".preset-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    updateConversion();
  });
});

// Quick Pair Chips
elements.quickPairsContainer.addEventListener("click", (e) => {
  const chip = e.target.closest(".pair-chip");
  if (!chip) return;
  const from = chip.getAttribute("data-from");
  const to = chip.getAttribute("data-to");
  if (from && to) {
    state.fromCurr = from;
    state.toCurr = to;
    renderSelectedCurrencies();
    updateConversion();
  }
});

// Copy to Clipboard
elements.copyBtn.addEventListener("click", async () => {
  const text = `${elements.amountInput.value || 0} ${state.fromCurr} = ${elements.resultValue.textContent} ${state.toCurr}`;
  try {
    await navigator.clipboard.writeText(text);
    showToast("Conversion copied to clipboard!");
  } catch (err) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    showToast("Conversion copied to clipboard!");
  }
});

// Refresh Button
elements.refreshBtn.addEventListener("click", () => {
  updateConversion(true);
});

// Swap Button
elements.swapBtn.addEventListener("click", () => {
  swapCurrencies();
});

// ==========================================================================
// Searchable Currency Picker Modal
// ==========================================================================

function openCurrencyModal(target) {
  state.activePickerTarget = target;
  const isFrom = target === "from";
  elements.modalTitle.textContent = isFrom ? "Select Base Currency" : "Select Target Currency";
  elements.modalSub.textContent = isFrom ? "Currency you are converting from" : "Currency you want to receive";

  elements.currencySearchInput.value = "";
  elements.clearSearchBtn.style.display = "none";
  renderModalPopularChips();
  renderCurrencyList();

  elements.currencyModal.classList.add("active");
  elements.currencyModal.setAttribute("aria-hidden", "false");
  setTimeout(() => elements.currencySearchInput.focus(), 100);
}

function closeCurrencyModal() {
  elements.currencyModal.classList.remove("active");
  elements.currencyModal.setAttribute("aria-hidden", "true");
}

function renderModalPopularChips() {
  const currentSelected = state.activePickerTarget === "from" ? state.fromCurr : state.toCurr;
  let html = "";
  popularCurrencies.forEach(code => {
    const isSel = code === currentSelected ? "selected" : "";
    html += `<button type="button" class="modal-chip ${isSel}" data-code="${code}">${code}</button>`;
  });
  elements.modalPopularChips.innerHTML = html;
}

elements.modalPopularChips.addEventListener("click", (e) => {
  const chip = e.target.closest(".modal-chip");
  if (!chip) return;
  const code = chip.getAttribute("data-code");
  selectCurrency(code);
});

function renderCurrencyList(filterQuery = "") {
  const query = filterQuery.trim().toLowerCase();
  const currentSelected = state.activePickerTarget === "from" ? state.fromCurr : state.toCurr;

  const allCodes = Object.keys(countryList);
  allCodes.sort((a, b) => {
    const aPop = popularCurrencies.indexOf(a);
    const bPop = popularCurrencies.indexOf(b);
    if (aPop !== -1 && bPop !== -1) return aPop - bPop;
    if (aPop !== -1) return -1;
    if (bPop !== -1) return 1;
    return a.localeCompare(b);
  });

  let matching = allCodes.filter(code => {
    const meta = getCurrencyMeta(code);
    if (!query) return true;
    return (
      code.toLowerCase().includes(query) ||
      meta.name.toLowerCase().includes(query) ||
      meta.country.toLowerCase().includes(query)
    );
  });

  if (matching.length === 0) {
    elements.currencyListContainer.innerHTML = `
      <div class="no-results">
        <i class="fa-solid fa-magnifying-glass" style="font-size: 1.5rem; margin-bottom: 0.5rem; display: block; opacity: 0.5;"></i>
        No currency matching "${filterQuery}"
      </div>
    `;
    return;
  }

  let html = "";
  matching.forEach(code => {
    const meta = getCurrencyMeta(code);
    const isSelected = code === currentSelected;
    html += `
      <div class="currency-option-row ${isSelected ? "selected" : ""}" data-code="${code}" role="button" tabindex="0">
        <div class="option-left">
          <img src="${getFlagUrl(meta.country)}" alt="${meta.country}" class="option-flag" onerror="this.src='https://placehold.co/40?text=FX'">
          <div class="option-info">
            <span class="option-code">${meta.code}</span>
            <span class="option-name">${meta.name}</span>
          </div>
        </div>
        <div class="option-right">
          <span class="option-symbol">${meta.symbol || meta.code}</span>
          <i class="fa-solid fa-check option-check"></i>
        </div>
      </div>
    `;
  });

  elements.currencyListContainer.innerHTML = html;
}

function selectCurrency(code) {
  if (state.activePickerTarget === "from") {
    if (code === state.toCurr) {
      state.toCurr = state.fromCurr;
    }
    state.fromCurr = code;
  } else {
    if (code === state.fromCurr) {
      state.fromCurr = state.toCurr;
    }
    state.toCurr = code;
  }

  renderSelectedCurrencies();
  updateConversion();
  closeCurrencyModal();
}

// Modal Event Listeners
elements.fromTile.addEventListener("click", () => openCurrencyModal("from"));
elements.fromTile.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") openCurrencyModal("from"); });

elements.toTile.addEventListener("click", () => openCurrencyModal("to"));
elements.toTile.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") openCurrencyModal("to"); });

elements.closeModalBtn.addEventListener("click", closeCurrencyModal);

elements.currencyModal.addEventListener("click", (e) => {
  if (e.target === elements.currencyModal) {
    closeCurrencyModal();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && elements.currencyModal.classList.contains("active")) {
    closeCurrencyModal();
  }
});

elements.currencySearchInput.addEventListener("input", (e) => {
  const val = e.target.value;
  elements.clearSearchBtn.style.display = val ? "block" : "none";
  renderCurrencyList(val);
});

elements.clearSearchBtn.addEventListener("click", () => {
  elements.currencySearchInput.value = "";
  elements.clearSearchBtn.style.display = "none";
  renderCurrencyList("");
  elements.currencySearchInput.focus();
});

elements.currencyListContainer.addEventListener("click", (e) => {
  const row = e.target.closest(".currency-option-row");
  if (!row) return;
  const code = row.getAttribute("data-code");
  selectCurrency(code);
});

// ==========================================================================
// Theme Management (Dark / Light Mode)
// ==========================================================================

function initTheme() {
  const savedTheme = localStorage.getItem("currenzo_theme");
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initialTheme = savedTheme || (prefersDark ? "dark" : "light");

  document.documentElement.setAttribute("data-theme", initialTheme);
}

elements.themeToggle.addEventListener("click", () => {
  const currentTheme = document.documentElement.getAttribute("data-theme") || "dark";
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("currenzo_theme", newTheme);
});

// ==========================================================================
// Initialization
// ==========================================================================

window.addEventListener("DOMContentLoaded", () => {
  initTheme();
  renderSelectedCurrencies();
  updateConversion();
});
