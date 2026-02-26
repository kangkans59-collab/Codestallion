from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI
from api.upload import router as upload_router
from api.analyze import router as analyze_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="MedExplain API")

# Register routes
app.include_router(upload_router, prefix="/api")
app.include_router(analyze_router, prefix="/api")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # dev only
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Backend is running"}