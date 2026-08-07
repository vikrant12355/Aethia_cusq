def get_shap_features(profile: dict) -> list:
    loss_aversion = profile.get("lossAversionIndex", 6.8)
    anomaly_score = profile.get("anomalyScore", 0.12)
    risk_tolerance = profile.get("riskTolerance", 6)
    
    # Adapt feature values based on profile
    loss_aversion_label = "Low Drawdown Intolerance" if loss_aversion < 4 else "Moderate Risk Mitigation" if loss_aversion < 7 else "High Drawdown Intolerance"
    anomaly_label = f"{anomaly_score} (Normal)" if anomaly_score < 0.35 else f"{anomaly_score} (Elevated Stress)"

    # Base values
    features = [
        {
            "feature": "LSTM 180-Day Momentum Signal",
            "description": "Deep neural network momentum projection for S&P 500 Large-Cap",
            "value": "+12.4% Momentum",
            "shapValue": +2.8,
            "category": "Macro"
        },
        {
            "feature": "FinBERT Executive Sentiment",
            "description": "NLP sentiment score extracted from corporate filings and SEC disclosures",
            "value": "0.78 Bullish",
            "shapValue": +1.6,
            "category": "Sentiment"
        },
        {
            "feature": "US 10Y Real Yield Premium",
            "description": "Inflation-adjusted Treasury yield buffer",
            "value": "2.10% Real Yield",
            "shapValue": -0.9,
            "category": "Valuation"
        },
        {
            "feature": "User Loss Aversion Index",
            "description": "XGBoost behavioral profile penalty metric",
            "value": loss_aversion_label,
            "shapValue": round(0.1 * (10 - loss_aversion), 1),
            "category": "Behavior"
        },
        {
            "feature": "Isolation Forest Liquidity Filter",
            "description": "Systemic credit anomaly detection metric",
            "value": anomaly_label,
            "shapValue": round(0.5 - anomaly_score, 1),
            "category": "Behavior"
        }
    ]
    return features

def get_consensus_rationale(profile: dict, agreement: float) -> str:
    risk_tolerance = profile.get("riskTolerance", 6)
    return f"The committee voted {agreement}% in favor of over-weighting Large-Cap Equities based on strong 180-day momentum signals (+2.8% SHAP) and bullish FinBERT corporate sentiment (+1.6% SHAP). High real yields (-0.9% SHAP) are hedged with custom allocations based on a user risk tolerance score of {risk_tolerance}/10."
