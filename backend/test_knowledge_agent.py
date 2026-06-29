from agents.knowledge_agent import search_knowledge

question = """
Customer health score is 35.

Renewal is due in 15 days.

What should we do?
"""

answer = search_knowledge(question)

print(answer)