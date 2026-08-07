from fastapi import APIRouter
from backend.services.orchestrator import orchestration_service

router = APIRouter(prefix="/audit", tags=["audit"])

@router.post("/generate")
def generate_audit(payload: dict):
    profile = payload.get("profile", {})
    approved_strategy = payload.get("approvedStrategy", {})
    custom_weights = payload.get("customWeights")
    
    receipt = orchestration_service.verify_and_log_audit(profile, approved_strategy, custom_weights)
    return receipt
