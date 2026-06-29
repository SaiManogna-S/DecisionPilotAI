from agents.planner_agent import execute_pipeline

meeting = """
Customer has a health score of 35.

Renewal is due in 15 days.

Customer complained about support delays.

Customer is evaluating Salesforce.
"""

result = execute_pipeline(meeting)

print()

print("=" * 80)

print(result["recommendations"])