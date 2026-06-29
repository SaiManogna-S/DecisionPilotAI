import json
from config.groq_config import client, MODEL


def analyze_context(customer_text: str):

    prompt = f"""
You are the Context Agent of DecisionPilot AI.

The input may contain ANY combination of:
- Customer Meeting Transcript
- CRM Data
- Customer Email

Analyze ALL available information together.

IMPORTANT RULES:
- Return ONLY valid JSON.
- Do NOT use markdown.
- Do NOT explain anything.
- If some sections are missing, ignore them.
- Infer customer health score (0-100).
- Infer customer sentiment.
- Infer renewal days if mentioned, otherwise estimate reasonably.
- Summarize the overall customer context.
- Identify customer problems.
- Identify business opportunities.
- Generate action items.

Return exactly this JSON:

{{
  "health_score": 0,
  "sentiment": "",
  "renewal_days": 0,
  "summary": "",
  "problems": [],
  "opportunities": [],
  "action_items": []
}}

Customer Context:

{customer_text}
"""

    try:

        print("Calling Groq...")

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

        print("Groq responded.")

        text = response.choices[0].message.content.strip()

        text = text.replace("```json", "")
        text = text.replace("```", "")
        text = text.strip()

        print("\nGroq Response:\n")
        print(text)

        return json.loads(text)

    except Exception:

        import traceback
        traceback.print_exc()

        return {
            "health_score": 50,
            "sentiment": "neutral",
            "renewal_days": 90,
            "summary": "Unable to analyze customer context.",
            "problems": [],
            "opportunities": [],
            "action_items": []
        }