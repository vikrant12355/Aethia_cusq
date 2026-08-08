from fastapi import APIRouter
from backend.services.blockchain_service import blockchain_service

router = APIRouter(prefix="/blockchain", tags=["blockchain"])

@router.get("/status")
def get_blockchain_status():
    """Returns current status and metrics of the C++20 InvestmentBlockchain 3 engine."""
    return blockchain_service.get_node_status()

@router.get("/benchmark")
def run_blockchain_benchmark(count: int = 500):
    """Runs a multi-threaded parallel verification benchmark on candidate blocks."""
    return blockchain_service.run_benchmark(count)

@router.post("/audit-mine")
def submit_and_mine_audit_record(payload: dict):
    """Submits and mines an institutional trade audit receipt into the C++ ledger block."""
    sender = payload.get("sender", "0x71F8E92a3C89B72149b10C5D8849E93C3C488E92")
    receiver = payload.get("receiver", "AETHIA_EXECUTION_AUDIT_LEDGER")
    strategy_id = payload.get("strategyId", "TACTICAL-MACRO-ALPHA")
    amount = payload.get("amount", 500000)
    metadata = payload.get("metadata", {})
    
    result = blockchain_service.submit_and_mine_audit(sender, receiver, strategy_id, amount, metadata)
    return result
