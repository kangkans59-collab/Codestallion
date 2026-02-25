from fastapi import APIRouter, UploadFile, File, HTTPException
import os
import uuid
import shutil

router = APIRouter()

UPLOAD_DIR = "uploads"
MAX_SIZE = 5 * 1024 * 1024  # 5 MB

ALLOWED_TYPES = [
    "application/pdf",
    "image/jpeg",
    "image/png",
    "image/webp"
]

# Make sure upload folder exists
os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("/upload")
async def upload_report(file: UploadFile = File(...)):

    # 1. Validate file type
    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(
            status_code=400,
            detail="Only PDF, JPG, PNG files allowed"
        )

    # 2. Generate safe filename
    file_id = str(uuid.uuid4())
    safe_name = f"{file_id}_{file.filename}"

    file_path = os.path.join(UPLOAD_DIR, safe_name)

    # 3. Save file
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # 4. Validate size
    size = os.path.getsize(file_path)

    if size > MAX_SIZE:
        os.remove(file_path)
        raise HTTPException(
            status_code=400,
            detail="File too large (max 5MB)"
        )

    # 5. Return metadata
    return {
        "file_id": file_id,
        "filename": file.filename,
        "size": size
    }