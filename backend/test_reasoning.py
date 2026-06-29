from agents.reasoning_agent import reason

customer_context = """
Customer Summary:
Health Score: 35
Renewal: 15 days
Support Tickets: 5
Sentiment: Negative
"""

company_knowledge = """
Health Score below 40 requires Executive Escalation.

Enterprise customers require VP approval.

Premium Support may be offered.
"""

result = reason(customer_context, company_knowledge)

print(result)