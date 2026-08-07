import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.routers import profile, consensus, audit, portfolio

app = FastAPI(
    title="Aethia Trade API",
    description="Institutional AI Consensus Gateways & Blockchain Auditing",
    version="1.0.0"
)

# Configure CORS to permit local frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permits wildcards for local hackathon simplicity
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register endpoints
app.include_router(profile.router, prefix="/api")
app.include_router(consensus.router, prefix="/api")
app.include_router(audit.router, prefix="/api")
app.include_router(portfolio.router, prefix="/api")

@app.get("/")
def health_check():
    return {
        "status": "healthy",
        "service": "Aethia Trade API gateway",
        "version": "1.0.0"
    }

if __name__ == "__main__":
    uvicorn.run("backend.main:app", host="127.0.0.1", port=8000, reload=True)
