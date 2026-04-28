import React, { useMemo, useState } from "react";
import "./FinanceCalculator.css";

const TERM_OPTIONS = [
  { value: 12, label: "12 months (1 year)" },
  { value: 24, label: "24 months (2 years)" },
  { value: 36, label: "36 months (3 years)" },
  { value: 48, label: "48 months (4 years)" },
  { value: 60, label: "60 months (5 years)" },
  { value: 120, label: "120 months (10 years)" },
  { value: 180, label: "180 months (15 years)" },
];

const INTEREST_FREE_APR = 0;
const INTEREST_BEARING_APR = 9.9;
const ONE_YEAR_TERM = 12;
const APR_TERM_MAP = {
  [INTEREST_FREE_APR]: [12],
  [INTEREST_BEARING_APR]: [24, 36, 48, 60, 120, 180],
};

const formatGBP = (value) =>
  new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number.isFinite(value) ? value : 0);

const parseAmount = (rawValue) => {
  const parsed = Number(rawValue);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
};

const calculateMonthlyPayment = (principal, apr, termMonths) => {
  if (principal <= 0 || termMonths <= 0) return 0;
  const monthlyRate = apr / 100 / 12;

  if (monthlyRate === 0) {
    return principal / termMonths;
  }

  const factor = Math.pow(1 + monthlyRate, termMonths);
  return (principal * monthlyRate * factor) / (factor - 1);
};

const APR_OPTIONS = [INTEREST_FREE_APR, INTEREST_BEARING_APR];

const FinanceCalculator = () => {
  const [selectedApr, setSelectedApr] = useState(INTEREST_FREE_APR);
  const [purchasePriceInput, setPurchasePriceInput] = useState("");
  const [depositInput, setDepositInput] = useState("");
  const [termMonthsInput, setTermMonthsInput] = useState(String(ONE_YEAR_TERM));

  const availableTermOptions =
    TERM_OPTIONS.filter((option) => APR_TERM_MAP[selectedApr]?.includes(option.value));

  const calculations = useMemo(() => {
    const purchasePrice = parseAmount(purchasePriceInput);
    const deposit = parseAmount(depositInput);
    const termMonths = Number(termMonthsInput) || 0;
    const principal = Math.max(purchasePrice - deposit, 0);
    const apr = selectedApr;
    const monthlyPayment = calculateMonthlyPayment(principal, apr, termMonths);
    const totalRepayable = monthlyPayment * termMonths;
    const interestPaid = Math.max(totalRepayable - principal, 0);
    const financeMode = apr === 0 ? "Interest Free" : "Interest Bearing";

    return {
      purchasePrice,
      deposit,
      termMonths,
      principal,
      apr,
      monthlyPayment,
      totalRepayable,
      interestPaid,
      financeMode,
    };
  }, [depositInput, purchasePriceInput, selectedApr, termMonthsInput]);

  return (
    <section className="finance-page section">
      <div className="container">
        <div className="finance-card">
          <div className="finance-header">
            <h1>Finance Calculator</h1>
            <p>
              Estimate monthly repayments for your installation. Figures are a
              guide only and final terms are confirmed during application.
            </p>
          </div>

          <div className="apr-bar" role="group" aria-label="APR selection">
            {APR_OPTIONS.map((aprOption) => (
              <button
                key={aprOption}
                type="button"
                className={`apr-segment apr-toggle-btn ${
                  selectedApr === aprOption
                    ? aprOption === INTEREST_FREE_APR
                      ? "apr-active-light"
                      : "apr-active-dark"
                    : ""
                }`}
                onClick={() => {
                  setSelectedApr(aprOption);
                  const nextTerms = APR_TERM_MAP[aprOption] || [];
                  const nextValue = Number(termMonthsInput);
                  setTermMonthsInput(
                    nextTerms.includes(nextValue) ? String(nextValue) : String(nextTerms[0] || "")
                  );
                }}
              >
                {aprOption.toFixed(2)}% APR
              </button>
            ))}
          </div>

          <div className="finance-fields">
            <label className="finance-label">
              Total system cost (GBP)
              <input
                type="number"
                min="0"
                step="100"
                value={purchasePriceInput}
                onChange={(e) => setPurchasePriceInput(e.target.value)}
                placeholder="Enter total system cost"
              />
            </label>

            <label className="finance-label">
              Deposit (GBP)
              <input
                type="number"
                min="0"
                step="100"
                value={depositInput}
                onChange={(e) => setDepositInput(e.target.value)}
                placeholder="Enter deposit amount"
              />
            </label>

            <label className="finance-label">
              Select Loan Term
              <select
                value={termMonthsInput}
                onChange={(e) => setTermMonthsInput(e.target.value)}
              >
                <option value="">Select Loan Term</option>
                {availableTermOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="finance-mode">{calculations.financeMode}</div>

          <div className="finance-results">
            <div className="finance-row">
              <span>Amount of credit</span>
              <strong>{formatGBP(calculations.principal)}</strong>
            </div>
            <div className="finance-row">
              <span>Monthly</span>
              <strong>{formatGBP(calculations.monthlyPayment)}</strong>
            </div>
            <div className="finance-row">
              <span>Total repayable</span>
              <strong>{formatGBP(calculations.totalRepayable)}</strong>
            </div>
            <div className="finance-row">
              <span>Interest paid</span>
              <strong>{formatGBP(calculations.interestPaid)}</strong>
            </div>
            <div className="finance-row finance-row-apr">
              <span>APR</span>
              <strong>{calculations.apr.toFixed(2)}% APR</strong>
            </div>
          </div>

          <div className="finance-disclaimer">
            <p>
              <strong>Margav Renewables Ltd</strong> is an Introducer Appointed
              Representative of Ideal Sales Solutions Ltd, t/a Ideal4Finance.
              Ideal Sales Solutions Ltd is a credit broker and not a lender
              (FRN 703401). Finance available subject to status. The rate
              offered is always provisional and will depend upon your personal
              circumstances, the loan amount and the term.
            </p>
            <p>
              Representative example: <strong>{calculations.apr.toFixed(2)}% APR</strong>{" "}
              based on a loan of <strong>{formatGBP(calculations.principal)}</strong>{" "}
              repayable over <strong>{calculations.termMonths || 0}</strong> months at an interest
              rate of <strong>{calculations.apr.toFixed(2)}% APR</strong> pa
              (fixed), with monthly repayment of{" "}
              <strong>{formatGBP(calculations.monthlyPayment)}</strong> and total
              amount payable <strong>{formatGBP(calculations.totalRepayable)}</strong>.
            </p>
            <p>
              Please note: the finance calculator provides only a guide and the
              exact amounts will be confirmed during the application process.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinanceCalculator;
