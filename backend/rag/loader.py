from pypdf import PdfReader
import os

KNOWLEDGE_FOLDER = "knowledge_base"


def load_documents():

    documents = []

    for filename in os.listdir(KNOWLEDGE_FOLDER):

        if filename.endswith(".pdf"):

            filepath = os.path.join(KNOWLEDGE_FOLDER, filename)

            reader = PdfReader(filepath)

            text = ""

            for page in reader.pages:

                page_text = page.extract_text()

                if page_text:

                    text += page_text + "\n"

            documents.append(
                {
                    "source": filename,
                    "content": text
                }
            )

    return documents