import { LLMStrategyProposal, SpecialistMetric, ShapFeature, UserProfile } from "@/types";

export const DEFAULT_SPECIALIST_METRICS: SpecialistMetric[] = [
  {
    id: "m1",
    name: "LSTM Deep Forecast (180D)",
    modelType: "LSTM",
    prediction: "+12.4% US Equities / -1.8% Long Duration Treasuries",
    confidence: 0.912,
    impactScore: 8.9,
    detail: "Neural sequence model predicts yield curve steepening and momentum continuation in Large-Cap Quality Tech."
  },
  {
    id: "m2",
    name: "FinBERT Institutional Sentiment",
    modelType: "FinBERT",
    prediction: "Bullish (0.78 Sentiment Index across 14,000 filings)",
    confidence: 0.884,
    impactScore: 7.6,
    detail: "NLP extraction of 10-K transcripts, FOMC minutes, and earnings calls indicates strong corporate balance sheet health."
  },
  {
    id: "m3",
    name: "Isolation Forest Anomaly Guard",
    modelType: "XGBoost",
    prediction: "Normal Liquidity State (Anomaly score: 0.12)",
    confidence: 0.965,
    impactScore: 9.4,
    detail: "Unsupervised tree-ensemble detects zero systemic stress markers across credit default swaps and interbank spreads."
  },
  {
    id: "m4",
    name: "Macro Factor Rotation Engine",
    modelType: "Macro",
    prediction: "Overweight High-Quality Growth / Underweight Real Estate",
    confidence: 0.850,
    impactScore: 8.1,
    detail: "Cross-asset factor models indicate soft landing macro regime with falling inflation expectations."
  }
];

export const LLM_STRATEGIES: LLMStrategyProposal[] = [
  {
    id: "strat-1",
    name: "Tactical Macro Alpha (Recommended)",
    author: "GPT-4o",
    philosophy: "Maximizes risk-adjusted total return via factor momentum, quality equity tilts, and short-duration cash buffers.",
    weights: {
      usEquities: 48,
      globalEquities: 22,
      usBonds: 15,
      commodities: 10,
      cashEquivalents: 5
    },
    expectedReturn: 14.2,
    maxDrawdown: 6.8,
    sharpeRatio: 2.18,
    consensusVoteWeight: 0.45
  },
  {
    id: "strat-2",
    name: "Defensive Risk-Parity (Ray Dalio Model)",
    author: "Claude 3.5",
    philosophy: "Balances risk contribution equally across economic growth and inflation regimes to protect capital in all cycles.",
    weights: {
      usEquities: 30,
      globalEquities: 15,
      usBonds: 35,
      commodities: 12,
      cashEquivalents: 8
    },
    expectedReturn: 10.8,
    maxDrawdown: 3.9,
    sharpeRatio: 2.45,
    consensusVoteWeight: 0.35
  },
  {
    id: "strat-3",
    name: "Conservative Growth & Dividend Yield",
    author: "Gemini 1.5",
    philosophy: "Focuses on high free cash flow dividend Aristocrats, investment grade corporate bonds, and physical gold hedges.",
    weights: {
      usEquities: 38,
      globalEquities: 12,
      usBonds: 32,
      commodities: 8,
      cashEquivalents: 10
    },
    expectedReturn: 11.9,
    maxDrawdown: 4.8,
    sharpeRatio: 2.10,
    consensusVoteWeight: 0.20
  }
];

export const SHAP_FEATURES: ShapFeature[] = [
  {
    feature: "LSTM 180-Day Momentum Signal",
    description: "Deep neural network momentum projection for S&P 500 Large-Cap",
    value: "+12.4% Momentum",
    shapValue: +2.8,
    category: "Macro"
  },
  {
    feature: "FinBERT Executive Sentiment",
    description: "NLP sentiment score extracted from corporate filings and SEC disclosures",
    value: "0.78 Bullish",
    shapValue: +1.6,
    category: "Sentiment"
  },
  {
    feature: "US 10Y Real Yield Premium",
    description: "Inflation-adjusted Treasury yield buffer",
    value: "2.10% Real Yield",
    shapValue: -0.9,
    category: "Valuation"
  },
  {
    feature: "User Loss Aversion Index",
    description: "XGBoost behavioral profile penalty metric",
    value: "Low Drawdown Intolerance",
    shapValue: +0.7,
    category: "Behavior"
  },
  {
    feature: "Isolation Forest Liquidity Filter",
    description: "Systemic credit anomaly detection metric",
    value: "0.12 (Normal)",
    shapValue: +0.4,
    category: "Behavior"
  }
];

export function computeBehavioralProfile(profile: UserProfile): UserProfile {
  // Compute behavioral metrics deterministically based on user inputs
  const risk = profile.riskTolerance || 5;
  const isPreservation = profile.investmentGoal.includes("Preservation");
  
  const anomalyScore = 0.08 + (10 - risk) * 0.01;
  const lossAversionIndex = Math.max(1, 10 - risk + (isPreservation ? 2 : 0));
  const volatilityTolerance = Math.min(35, risk * 3.5);

  let profileName = "Moderate Balanced Investor";
  if (risk >= 8) profileName = "Aggressive Alpha Growth Investor";
  else if (risk <= 3) profileName = "Institutional Capital Preservationist";
  else if (isPreservation) profileName = "Defensive Risk-Parity Investor";

  return {
    ...profile,
    anomalyScore: Number(anomalyScore.toFixed(2)),
    lossAversionIndex: Number(lossAversionIndex.toFixed(1)),
    volatilityTolerance: Number(volatilityTolerance.toFixed(1)),
    profileName
  };
}
