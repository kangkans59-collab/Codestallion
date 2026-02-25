from fastapi import APIRouter, HTTPException
import os

from extract.text_extractor import extract_text
from parse.medical_parser import parse_report
from explain.llm_engine import generate_explanation
from safety.filter import apply_safety_filter

router = APIRouter()

UPLOAD_DIR = "uploads"


@router.get("/analyze/{file_id}")
def analyze_report(file_id: str):

    files = os.listdir(UPLOAD_DIR)

    target = None

    for f in files:
        if f.startswith(file_id):
            target = os.path.join(UPLOAD_DIR, f)
            break

    if not target:
        raise HTTPException(404, "File not found")

    try:
        raw_text = extract_text(target)
        parsed_data = parse_report(raw_text)
        raw_explanation = generate_explanation(parsed_data)
        explanation = apply_safety_filter(raw_explanation)
    except Exception as e:
        raise HTTPException(500, str(e))

    return {
        "file_id": file_id,
        "parsed_data": parsed_data,
        "explanation": explanation
    }