import os
import pdfplumber
import pytesseract
from PIL import Image


def extract_text(file_path: str) -> str:
    """
    Decide extraction method based on file type
    """

    ext = os.path.splitext(file_path)[1].lower()

    if ext == ".pdf":
        return _extract_pdf(file_path)

    elif ext in [".jpg", ".jpeg", ".png", ".webp"]:
        return _extract_image(file_path)

    else:
        raise ValueError("Unsupported file format")


def _extract_pdf(path: str) -> str:
    """
    Extract from digital PDFs
    """

    text = ""

    with pdfplumber.open(path) as pdf:
        for page in pdf.pages:
            page_text = page.extract_text()

            if page_text:
                text += page_text + "\n"

    return text.strip()


def _extract_image(path: str) -> str:
    """
    OCR for images
    """

    img = Image.open(path)

    text = pytesseract.image_to_string(img)

    return text.strip()