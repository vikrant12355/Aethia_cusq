from fastapi import APIRouter
from backend.services.orchestrator import orchestration_service

router = APIRouter(prefix="/profile", tags=["profile"])

@router.post("/behavioral")
def create_behavioral_profile(profile: dict):
    # Process behavioral inputs using risk agent inside the service
    updated_profile = orchestration_service.process_behavioral_profile(profile)
    return updated_profile
