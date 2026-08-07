from fastapi import APIRouter
from backend.services.orchestrator import orchestration_service

router = APIRouter(prefix="/consensus", tags=["consensus"])

@router.post("/run")
def run_consensus_flow(profile: dict):
    # Runs the agent orchestration committee through the planner agent
    consensus_data = orchestration_service.run_agent_consensus(profile)
    return consensus_data
