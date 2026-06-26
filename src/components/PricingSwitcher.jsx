import React, { useEffect, useRef } from 'react';
import { ChevronDownIcon } from './Icons';

const TARIFFS = {
  USD: { rate: 1.0, symbol: '$', name: 'USD ($)' },
  INR: { rate: 83.5, symbol: '₹', name: 'INR (₹)' },
  EUR: { rate: 0.92, symbol: '€', name: 'EUR (€)' }
};

const BASE_RATES = {
  starter: 29,
  pro: 79,
  enterprise: 199
};

const ANNUAL_MULTIPLIER = 0.80;

export default function PricingSwitcher() {
  const billingRef = useRef('monthly');
  const currencyRef = useRef('USD');
  const debounceTimer = useRef(null);

  // Direct DOM mutation logic for pricing updates and switcher UI classes
  const updatePrices = () => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    // Debounce at 50ms to prevent thrashing
    debounceTimer.current = setTimeout(() => {
      const billing = billingRef.current;
      const currency = currencyRef.current;
      const tariff = TARIFFS[currency].rate;
      const symbol = TARIFFS[currency].symbol;
      const isAnnual = billing === 'annual';

      const tiers = ['starter', 'pro', 'enterprise'];

      // 1. Update text nodes inside the cards
      tiers.forEach((tier) => {
        const priceEl = document.getElementById(`price-${tier}`);
        const saveEl = document.getElementById(`save-${tier}`);
        const periodEl = document.getElementById(`period-${tier}`);

        if (priceEl) {
          const base = parseFloat(priceEl.getAttribute('data-base-price') || BASE_RATES[tier]);
          const calculatedPrice = base * (isAnnual ? ANNUAL_MULTIPLIER : 1) * tariff;
          priceEl.textContent = `${symbol}${Math.round(calculatedPrice)}`;
        }

        if (saveEl) {
          if (isAnnual) {
            const savings = BASE_RATES[tier] * 12 * 0.20 * tariff;
            saveEl.textContent = `You save ${symbol}${Math.round(savings)}/yr`;
            saveEl.style.opacity = '1';
            saveEl.style.transform = 'translateY(0)';
          } else {
            // Invisible placeholder to prevent layout shifts
            saveEl.textContent = '\u00A0';
            saveEl.style.opacity = '0';
            saveEl.style.transform = 'translateY(4px)';
          }
        }

        if (periodEl) {
          periodEl.textContent = isAnnual ? '/mo (billed annually)' : '/mo';
        }
      });

      // 2. Direct DOM class updates for billing switcher buttons
      const btnMonthly = document.getElementById('btn-monthly');
      const btnAnnual = document.getElementById('btn-annual');
      const badgeAnnual = document.getElementById('badge-annual');

      if (btnMonthly && btnAnnual && badgeAnnual) {
        if (isAnnual) {
          btnAnnual.className = "flex-1 text-center py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-150 ease-out bg-nexus-accent text-nexus-surface shadow-md";
          btnMonthly.className = "flex-1 text-center py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-150 ease-out text-nexus-muted hover:text-nexus-text";
          badgeAnnual.className = "text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded-full font-bold transition-all duration-150 ease-out bg-nexus-surface text-nexus-accent border border-nexus-accent";
        } else {
          btnMonthly.className = "flex-1 text-center py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-150 ease-out bg-nexus-accent text-nexus-surface shadow-md";
          btnAnnual.className = "flex-1 text-center py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-150 ease-out text-nexus-muted hover:text-nexus-text";
          badgeAnnual.className = "text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded-full font-bold transition-all duration-150 ease-out bg-nexus-accent text-nexus-surface";
        }
      }

      // 3. Direct DOM update for dropdown button labels
      const dropdownLabel = document.getElementById('dropdown-current-text');
      if (dropdownLabel) {
        dropdownLabel.textContent = TARIFFS[currency].name;
      }

      // 4. Update highlights in dropdown list items
      Object.keys(TARIFFS).forEach((currKey) => {
        const optionEl = document.getElementById(`option-${currKey}`);
        if (optionEl) {
          if (currKey === currency) {
            optionEl.className = "w-full text-left px-5 py-2.5 text-xs transition-colors duration-150 ease-out hover:bg-nexus-bg hover:text-nexus-accent text-nexus-accent font-semibold bg-nexus-bg/30";
          } else {
            optionEl.className = "w-full text-left px-5 py-2.5 text-xs transition-colors duration-150 ease-out hover:bg-nexus-bg hover:text-nexus-accent text-nexus-text";
          }
        }
      });
    }, 50);
  };

  // Perform initial updates and setup event listeners on mount
  useEffect(() => {
    updatePrices();

    const handleOutsideClick = (e) => {
      const dropdownList = document.getElementById('dropdown-list');
      const dropdownChevron = document.getElementById('dropdown-chevron');
      if (dropdownList && !e.target.closest('.currency-dropdown-container')) {
        dropdownList.classList.add('hidden');
        if (dropdownChevron) dropdownChevron.classList.remove('rotate-180');
      }
    };

    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  const handleBillingToggle = (newBilling) => {
    billingRef.current = newBilling;
    updatePrices();
  };

  const toggleDropdown = () => {
    const dropdownList = document.getElementById('dropdown-list');
    const dropdownChevron = document.getElementById('dropdown-chevron');
    if (dropdownList) {
      const isHidden = dropdownList.classList.contains('hidden');
      if (isHidden) {
        dropdownList.classList.remove('hidden');
        if (dropdownChevron) dropdownChevron.classList.add('rotate-180');
      } else {
        dropdownList.classList.add('hidden');
        if (dropdownChevron) dropdownChevron.classList.remove('rotate-180');
      }
    }
  };

  const handleCurrencyChange = (newCurrency) => {
    currencyRef.current = newCurrency;
    updatePrices();

    // Close dropdown in DOM
    const dropdownList = document.getElementById('dropdown-list');
    const dropdownChevron = document.getElementById('dropdown-chevron');
    if (dropdownList) dropdownList.classList.add('hidden');
    if (dropdownChevron) dropdownChevron.classList.remove('rotate-180');
  };

  return (
    <div className="flex flex-col items-stretch gap-4 animate-fade-in-up delay-200 w-full max-w-[280px] lg:max-w-none">
      {/* Billing Switcher (Pill Style) */}
      <div className="bg-nexus-surface border border-nexus-bg p-1 rounded-full flex items-center relative shadow-lg w-full justify-between">
        <button
          id="btn-monthly"
          onClick={() => handleBillingToggle('monthly')}
          className="flex-1 text-center py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-150 ease-out bg-nexus-accent text-nexus-surface shadow-md"
          aria-label="Select monthly billing"
        >
          Monthly
        </button>
        <button
          id="btn-annual"
          onClick={() => handleBillingToggle('annual')}
          className="flex-1 text-center py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-150 ease-out text-nexus-muted hover:text-nexus-text flex items-center justify-center gap-1.5"
          aria-label="Select annual billing with twenty percent discount"
        >
          <span>Annual</span>
          <span 
            id="badge-annual"
            className="text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded-full font-bold transition-all duration-150 ease-out bg-nexus-accent text-nexus-surface"
          >
            Save 20%
          </span>
        </button>
      </div>

      {/* Currency Dropdown */}
      <div className="relative currency-dropdown-container w-full">
        <button
          onClick={toggleDropdown}
          className="flex items-center justify-between gap-3 px-5 py-3 rounded-full bg-nexus-surface border border-nexus-bg text-nexus-text text-xs font-semibold tracking-wide hover:border-nexus-accent transition-all duration-150 ease-out shadow-lg w-full"
          aria-haspopup="listbox"
          aria-label="Select currency"
        >
          <span id="dropdown-current-text">USD ($)</span>
          <ChevronDownIcon 
            id="dropdown-chevron"
            className="w-4 h-4 text-nexus-muted transition-transform duration-150 ease-out" 
          />
        </button>

        {/* Dropdown Options List (Controlled via DOM class mutations) */}
        <ul 
          id="dropdown-list"
          className="hidden absolute left-0 right-0 mt-2 bg-nexus-surface border border-nexus-bg rounded-2xl shadow-2xl py-2 z-50 overflow-hidden transform origin-top animate-fade-in-up duration-150 ease-out"
          role="listbox"
        >
          {Object.keys(TARIFFS).map((currKey) => (
            <li key={currKey}>
              <button
                id={`option-${currKey}`}
                onClick={() => handleCurrencyChange(currKey)}
                className={`w-full text-left px-5 py-2.5 text-xs transition-colors duration-150 ease-out hover:bg-nexus-bg hover:text-nexus-accent ${
                  currKey === 'USD' 
                    ? 'text-nexus-accent font-semibold bg-nexus-bg/30' 
                    : 'text-nexus-text'
                }`}
                role="option"
              >
                {TARIFFS[currKey].name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
