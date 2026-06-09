from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

app = FastAPI(title="ThrowLab Backend", version="0.1.0")

# Allow any origin for simplicity; adjust in production
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
def health() -> dict[str, str]:
    """Health check endpoint"""
    return {"status": "ok"}

@app.post("/api/videos/upload")
async def upload_video(file: UploadFile = File(...)) -> JSONResponse:
    """Placeholder upload endpoint that accepts a video and returns a static response."""
    if not file.filename:
        raise HTTPException(status_code=400, detail="Missing file name.")
    if not file.content_type or not file.content_type.startswith("video/"):
        raise HTTPException(status_code=400, detail="Please upload a valid video file.")
    # Placeholder processing: In a real application, you would transcode the file,
    # extract frames, compute metrics, and return a detailed response.
    return JSONResponse({
        "message": "Video received. Processing is not implemented in this stub.",
        "file_name": file.filename,
    })
