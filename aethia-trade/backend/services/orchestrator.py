from ai.agents.planner import orchestrate_consensus_flow
from ai.agents.risk import compute_behavioral_profile
from ai.agents.portfolio import generate_portfolio_positions
from blockchain.utils.audit_logging import generate_audit_receipt
from backend.database.mock_db import db_instance

class OrchestrationService:
    @staticmethod
    def process_behavioral_profile(profile_data: dict) -> dict:
        updated_profile = compute_behavioral_profile(profile_data)
        wallet = updated_profile.get("walletAddress") or "default_wallet"
        db_instance.save_profile(wallet, updated_profile)
        return updated_profile

    @staticmethod
    def run_agent_consensus(profile_data: dict) -> dict:
        # Run consensus and explainability via the Planner Agent
        flow_output = orchestrate_consensus_flow(profile_data)
        return flow_output

    @staticmethod
    def verify_and_log_audit(profile: dict, approved_strategy: dict, custom_weights: dict = None) -> dict:
        receipt = generate_audit_receipt(profile, approved_strategy, custom_weights)
        db_instance.save_receipt(receipt["receiptId"], receipt)
        return receipt

    @staticmethod
    def get_portfolio_data(weights: dict) -> list:
        return generate_portfolio_positions(weights)

orchestration_service = OrchestrationService()
