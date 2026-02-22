import os
import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from resume_parser import extract_text
from ai_engine import analyze_resume

# Configuration
load_dotenv()

ALLOWED_ORIGINS = os.getenv(
    "ALLOWED_ORIGINS",
    "http://localhost:5173"
).split(",")

MAX_FILE_SIZE_MB = int(os.getenv("MAX_FILE_SIZE_MB", "5"))
DEBUG = os.getenv("DEBUG", "false").lower() == "true"

# Logging
logging.basicConfig(
    level=logging.DEBUG if DEBUG else logging.INFO,
    format="%(asctime)s | %(levelname)-8s | %(message)s",
)
logger = logging.getLogger(__name__)

# App Lifespan 
@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("🚀 AI Resume Analyzer starting up")
    logger.info("   Allowed origins: %s", ALLOWED_ORIGINS)
    yield
    logger.info("🛑 AI Resume Analyzer shutting down")

# FastAPI App 
app = FastAPI(
    title="AI Resume Analyzer",
    version="1.0.0",
    docs_url="/docs" if DEBUG else None,
    redoc_url="/redoc" if DEBUG else None,
    lifespan=lifespan,
)

# CORS 
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

#  Routes 
@app.get("/")
def home():
    return {"status": "ok", "message": "AI Resume Analyzer Backend Running"}


@app.get("/health")
def health_check():
    """Lightweight health-check for deployment platforms."""
    return {"status": "healthy"}


@app.post("/analyze/")
async def analyze(
    file: UploadFile = File(...),
    role: str = Form(...)
):
    # Validate file type
    if file.content_type not in ("application/pdf",):
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are supported."
        )

    # Validate file size
    contents = await file.read()
    size_mb = len(contents) / (1024 * 1024)
    if size_mb > MAX_FILE_SIZE_MB:
        raise HTTPException(
            status_code=413,
            detail=f"File too large ({size_mb:.1f} MB). Max is {MAX_FILE_SIZE_MB} MB."
        )

    # Reset file stream so the parser can re-read
    await file.seek(0)

    try:
        text = await extract_text(file)
        if not text or not text.strip():
            raise HTTPException(
                status_code=422,
                detail="Could not extract any text from the PDF."
            )

        result = analyze_resume(text, role)
        return {"analysis": result}

    except HTTPException:
        raise
    except Exception as e:
        logger.exception("Unhandled error during resume analysis")
        raise HTTPException(status_code=500, detail="Internal server error.")


# Production entry point
if __name__ == "__main__":
    import uvicorn

    port = int(os.getenv("PORT", "8000"))
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=port,
        workers=int(os.getenv("WEB_CONCURRENCY", "1")),
        log_level="debug" if DEBUG else "info",
    )