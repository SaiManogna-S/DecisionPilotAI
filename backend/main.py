from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pypdf import PdfReader
import io

from agents.planner_agent import execute_pipeline

app = FastAPI(
    title="DecisionPilot AI",
    version="1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "message": "DecisionPilot AI Backend Running"
    }


async def extract_file_text(file: UploadFile | None):

    if file is None:
        return ""

    filename = file.filename.lower()

    if filename.endswith(".pdf"):

        pdf_bytes = await file.read()

        pdf = PdfReader(io.BytesIO(pdf_bytes))

        text = ""

        for page in pdf.pages:
            page_text = page.extract_text()

            if page_text:
                text += page_text + "\n"

        return text

    elif filename.endswith(".txt"):
        return (await file.read()).decode("utf-8")

    elif filename.endswith(".json"):
        return (await file.read()).decode("utf-8")

    return ""


@app.post("/analyze")
async def analyze(
    meeting: UploadFile | None = File(None),
    crm: UploadFile | None = File(None),
    email: UploadFile | None = File(None)
):

    if meeting is None and crm is None and email is None:
        return {
            "error": "Please upload at least one document."
        }

    print("\n========== FILES RECEIVED ==========")
    print("Meeting :", meeting.filename if meeting else "None")
    print("CRM     :", crm.filename if crm else "None")
    print("Email   :", email.filename if email else "None")
    print("====================================\n")

    meeting_text = await extract_file_text(meeting)
    crm_text = await extract_file_text(crm)
    email_text = await extract_file_text(email)

    combined_context = f"""
========================
CUSTOMER MEETING
========================

{meeting_text}

========================
CRM DATA
========================

{crm_text}

========================
CUSTOMER EMAIL
========================

{email_text}
"""

    print("\n========= COMBINED CONTEXT =========\n")
    print(combined_context)
    print("\n====================================\n")

    result = execute_pipeline(combined_context)

    return result