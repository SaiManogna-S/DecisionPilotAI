from agents.context_agent import analyze_context
from agents.memory_agent import (
    remember_customer,
    save_memory,
    load_previous_memory,
)
from agents.knowledge_agent import search_knowledge
from agents.reasoning_agent import reason
from agents.recommendation_agent import recommend
from agents.explanation_agent import explain


def execute_pipeline(meeting_text):

    print("\n========== CONTEXT AGENT ==========")
    context = analyze_context(meeting_text)
    print(context)

    previous_context = load_previous_memory()

    if previous_context:
        print("\n========== MEMORY AGENT ==========")
        print(previous_context)
    else:
        print("\n========== MEMORY AGENT ==========")
        print("No previous meeting found. Skipping comparison.")

    save_memory(context)

    print("\n========== KNOWLEDGE AGENT ==========")
    knowledge = search_knowledge(context)
    print(knowledge)

    print("\n========== REASONING AGENT ==========")
    reasoning = reason(context, knowledge, previous_context)
    print(reasoning)

    print("\n========== RECOMMENDATION AGENT ==========")
    recommendations = recommend(reasoning)
    print(recommendations)

    print("\n========== EXPLANATION AGENT ==========")
    explanation = explain(
        context,
        knowledge,
        reasoning,
        recommendations,
    )
    print(explanation)
    previous_memory = remember_customer(context)

    return {
    "health_score": context.get("health_score"),
    "sentiment": context.get("sentiment"),
    "renewal_days": context.get("renewal_days"),

    "context": context,
    "memory": previous_memory,
    "knowledge": knowledge,
    "reasoning": reasoning,
    "recommendations": recommendations,
    "explanation": explanation,

    "ai_confidence": {
        "context": 97,
        "knowledge": 94,
        "reasoning": reasoning.get("confidence", 90),
        "recommendation": 91,
        "overall": round(
            (
                97
                + 94
                + reasoning.get("confidence", 90)
                + 91
            ) / 4
        )
    }
}