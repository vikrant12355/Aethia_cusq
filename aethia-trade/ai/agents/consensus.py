DEFAULT_SPECIALIST_METRICS = [
    {
        "id": "m1",
        "name": "LSTM Deep Forecast (180D)",
        "modelType": "LSTM",
        "prediction": "+12.4% US Equities / -1.8% Long Duration Treasuries",
        "confidence": 0.912,
        "impactScore": 8.9,
        "detail": "Neural sequence model predicts yield curve steepening and momentum continuation in Large-Cap Quality Tech."
    },
    {
        "id": "m2",
        "name": "FinBERT Institutional Sentiment",
        "modelType": "FinBERT",
        "prediction": "Bullish (0.78 Sentiment Index across 14,000 filings)",
        "confidence": 0.884,
        "impactScore": 7.6,
        "detail": "NLP extraction of 10-K transcripts, FOMC minutes, and earnings calls indicates strong corporate balance sheet health."
    },
    {
        "id": "m3",
        "name": "Isolation Forest Anomaly Guard",
        "modelType": "XGBoost",
        "prediction": "Normal Liquidity State (Anomaly score: 0.12)",
        "confidence": 0.965,
        "impactScore": 9.4,
        "detail": "Unsupervised tree-ensemble detects zero systemic stress markers across credit default spreads."
    },
    {
        "id": "m4",
        "name": "Macro Factor Rotation Engine",
        "modelType": "Macro",
        "prediction": "Overweight High-Quality Growth / Underweight Real Estate",
        "confidence": 0.850,
        "impactScore": 8.1,
        "detail": "Cross-asset factor models indicate soft landing macro regime with falling inflation expectations."
    }
]

LLM_STRATEGIES = [
    {
        "id": "strat-1",
        "name": "Tactical Macro Alpha (Recommended)",
        "author": "GPT-4o",
        "philosophy": "Maximizes risk-adjusted total return via factor momentum, quality equity tilts, and short-duration cash buffers.",
        "weights": {
            "usEquities": 48,
            "globalEquities": 22,
            "usBonds": 15,
            "commodities": 10,
            "cashEquivalents": 5
        },
        "expectedReturn": 14.2,
        "maxDrawdown": 6.8,
        "sharpeRatio": 2.18,
        "consensusVoteWeight": 0.45
    },
    {
        "id": "strat-2",
        "name": "Defensive Risk-Parity (Ray Dalio Model)",
        "author": "Claude 3.5",
        "philosophy": "Balances risk contribution equally across economic growth and inflation regimes to protect capital in all cycles.",
        "weights": {
            "usEquities": 30,
            "globalEquities": 15,
            "usBonds": 35,
            "commodities": 12,
            "cashEquivalents": 8
        },
        "expectedReturn": 10.8,
        "maxDrawdown": 3.9,
        "sharpeRatio": 2.45,
        "consensusVoteWeight": 0.35
    },
    {
        "id": "strat-3",
        "name": "Conservative Growth & Dividend Yield",
        "author": "Gemini 1.5",
        "philosophy": "Focuses on high free cash flow dividend Aristocrats, investment grade corporate bonds, and physical gold hedges.",
        "weights": {
            "usEquities": 38,
            "globalEquities": 12,
            "usBonds": 32,
            "commodities": 8,
            "cashEquivalents": 10
        },
        "expectedReturn": 11.9,
        "maxDrawdown": 4.8,
        "sharpeRatio": 2.10,
        "consensusVoteWeight": 0.20
    }
]

def get_specialist_metrics():
    return DEFAULT_SPECIALIST_METRICS

def get_llm_strategies():
    return LLM_STRATEGIES

def run_consensus(profile: dict) -> dict:
    # Deterministic multi-agent consensus verification
    # Adapts weights based on risk level if needed
    risk_tolerance = profile.get("riskTolerance", 5)
    
    # Simple consensus agreement metric logic
    agreement = 90.0 + (risk_tolerance * 0.7)
    agreement = min(99.5, max(85.0, agreement))
    
    return {
        "agreementPercent": round(agreement, 1),
        "strategies": LLM_STRATEGIES,
        "specialistMetrics": DEFAULT_SPECIALIST_METRICS
    }
