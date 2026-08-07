def compute_behavioral_profile(profile: dict) -> dict:
    risk = profile.get("riskTolerance", 5)
    goal = profile.get("investmentGoal", "")
    is_preservation = "Preservation" in goal

    anomaly_score = 0.08 + (10 - risk) * 0.01
    loss_aversion_index = max(1.0, float(10 - risk + (2 if is_preservation else 0)))
    volatility_tolerance = min(35.0, float(risk * 3.5))

    profile_name = "Moderate Balanced Investor"
    if risk >= 8:
        profile_name = "Aggressive Alpha Growth Investor"
    elif risk <= 3:
        profile_name = "Institutional Capital Preservationist"
    elif is_preservation:
        profile_name = "Defensive Risk-Parity Investor"

    # Retain existing keys and overwrite computed values
    updated_profile = dict(profile)
    updated_profile.update({
        "anomalyScore": round(anomaly_score, 2),
        "lossAversionIndex": round(loss_aversion_index, 1),
        "volatilityTolerance": round(volatility_tolerance, 1),
        "profileName": profile_name
    })
    return updated_profile
