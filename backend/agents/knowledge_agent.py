import os
import json
from config.groq_config import client, MODEL

KNOWLEDGE_FOLDER = "knowledge_base"


def load_knowledge():

    documents = []

    if not os.path.exists(KNOWLEDGE_FOLDER):
        return ""

    for file in os.listdir(KNOWLEDGE_FOLDER):

        if file.endswith(".md"):

            path = os.path.join(KNOWLEDGE_FOLDER, file)

            with open(path, "r", encoding="utf-8") as f:

                documents.append(
                    f"\n\n===== {file} =====\n"
                    + f.read()
                )

    return "\n".join(documents)


def search_knowledge(context):

    enterprise_knowledge = load_knowledge()

    prompt = f"""
You are the Knowledge Agent of DecisionPilot AI.

You have access to the company's internal knowledge base.

Your task is to map the customer meeting context to company policies.

Use ONLY the enterprise knowledge provided below.

Do NOT invent policies.

Return ONLY valid JSON.

Return exactly:

{{
    "account_type":"",
    "risk":"",
    "executive_escalation":false,
    "recommended_team":[],
    "policies":[],
    "next_steps":[]
}}

=========================
Enterprise Knowledge
=========================

{enterprise_knowledge}

=========================
Customer Context
=========================

{json.dumps(context, indent=2)}
"""

    try:

        response = client.chat.completions.create(
            model=MODEL,
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature=0.2
        )

        text = response.choices[0].message.content.strip()

        text = text.replace("```json", "")
        text = text.replace("```", "")
        text = text.strip()

        return json.loads(text)

    except Exception as e:

        print("Knowledge Agent Error:", e)

        return {
            "account_type": "Unknown",
            "risk": "Unknown",
            "executive_escalation": False,
            "recommended_team": [],
            "policies": [],
            "next_steps": []
        }