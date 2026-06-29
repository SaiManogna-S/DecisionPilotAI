import json
from config.groq_config import client, MODEL


def explain(context, knowledge, reasoning, recommendations):

    prompt = f"""
You are the Explanation Agent of DecisionPilot AI.

Your job is to explain WHY the AI generated these recommendations.

Use:
- Current customer context
- Company knowledge
- Business reasoning
- Recommendations

Return ONLY valid JSON.

Format:

{{
    "summary": "",
    "key_factors": [],
    "recommendation_explanation": []
}}

Customer Context:
{json.dumps(context, indent=2)}

Knowledge:
{json.dumps(knowledge, indent=2)}

Reasoning:
{json.dumps(reasoning, indent=2)}

Recommendations:
{json.dumps(recommendations, indent=2)}
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

        print("Explanation Agent Error:", e)

        return {
            "summary": "Recommendations generated based on customer risk analysis.",
            "key_factors": [
                "Customer health",
                "Renewal timeline",
                "Sentiment",
                "Business policies"
            ],
            "recommendation_explanation": [
                "Recommendations prioritize customer retention and business value."
            ]
        }