from agents.recommendation_agent import recommend

reasoning = """
Business Risk:
High churn risk

Business Opportunity:
Executive engagement

Urgency:
High

Reasoning:
Customer health score is 35.
Renewal due in 15 days.
Negative sentiment.
"""

print(recommend(reasoning))