import PyPDF2
from io import BytesIO

async def extract_text(upload_file):
    contents = await upload_file.read() 
    pdf = PyPDF2.PdfReader(BytesIO(contents))

    text = ""
    for page in pdf.pages:
        page_text = page.extract_text()
        if page_text:
            text += page_text

    return text