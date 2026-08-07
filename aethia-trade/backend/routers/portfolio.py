from fastapi import APIRouter
from backend.services.orchestrator import orchestration_service

router = APIRouter(prefix="/portfolio", tags=["portfolio"])

@router.post("/positions")
def get_portfolio_positions(payload: dict):
    weights = payload.get("weights", {})
    nav_value = payload.get("navValue", 1248500.0)
    positions = orchestration_service.get_portfolio_data(weights)
    return {"positions": positions}
