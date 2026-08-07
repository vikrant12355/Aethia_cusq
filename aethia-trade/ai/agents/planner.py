from ai.agents.risk import compute_behavioral_profile
from ai.agents.consensus import run_consensus
from ai.agents.explainability import get_shap_features, get_consensus_rationale
from ai.agents.memory import save_to_memory

def orchestrate_consensus_flow(profile: dict) -> dict:
    # 1. Update behavioral fingerprint using Risk Agent
    evaluated_profile = compute_behavioral_profile(profile)
    save_to_memory("current_profile", evaluated_profile)
    
    # 2. Run multi-agent committee consensus
    consensus_results = run_consensus(evaluated_profile)
    agreement = consensus_results["agreementPercent"]
    
    # 3. Retrieve XAI attribution vectors using Explainability Agent
    shap_features = get_shap_features(evaluated_profile)
    rationale = get_consensus_rationale(evaluated_profile, agreement)
    
    return {
        "profile": evaluated_profile,
        "agreementPercent": agreement,
        "strategies": consensus_results["strategies"],
        "specialistMetrics": consensus_results["specialistMetrics"],
        "shapFeatures": shap_features,
        "consensusRationale": rationale
    }
