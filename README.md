# 🚀 DecisionPilot AI

## Agentic Decision Intelligence Platform for Customer Success

DecisionPilot AI is an AI-powered **Agentic Decision Intelligence Platform** that transforms customer interactions and enterprise knowledge into actionable business recommendations.

Unlike traditional chatbots, DecisionPilot AI employs multiple specialized AI agents that collaboratively analyze customer context, retrieve enterprise knowledge, perform business reasoning, and recommend the next best actions with explainable insights and confidence scores.

---

# 📌 Problem Statement

Customer Success Managers receive customer information from multiple disconnected sources such as:

- Meeting Transcripts
- CRM Records
- Customer Emails
- Enterprise Knowledge Base

Analyzing these sources manually is time-consuming and often results in delayed or inconsistent business decisions.

Organizations require an intelligent platform capable of understanding customer context, retrieving enterprise knowledge, performing business reasoning, and recommending the next best actions while keeping human decision-makers in control.

---

# 💡 Our Solution

DecisionPilot AI addresses this challenge through a reusable **Multi-Agent AI Platform**.

The platform:

- Understands customer interactions
- Retrieves relevant organizational knowledge
- Compares previous customer interactions
- Performs intelligent business reasoning
- Generates explainable recommendations
- Provides confidence scores
- Enables Human-in-the-Loop approval before execution

This enables faster, transparent, and enterprise-ready decision making.

---

# ✨ Key Features

- 🤖 Multi-Agent AI Architecture
- 📄 Meeting Transcript Analysis (PDF/TXT)
- 🗂 CRM Record Analysis (JSON/TXT)
- 📧 Customer Email Analysis (TXT)
- 🧠 Context Understanding using LLMs
- 💾 Customer Memory Comparison
- 📚 Enterprise Knowledge Retrieval using RAG + FAISS
- 📊 Customer Health Score Prediction
- 😊 Customer Sentiment Analysis
- ⚠ Business Risk Assessment
- 🎯 AI Generated Next Best Actions
- 💡 Explainable AI Recommendations
- 📈 Enterprise Confidence Score
- 👨‍💼 Human-in-the-Loop Approval (Approve / Reject)
- 📊 Interactive Analytics Dashboard

---

# 🛠 Tech Stack

## Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- Framer Motion

## Backend

- FastAPI
- Python

## AI & Agent Framework

- LangGraph
- Groq LLM
- Agentic AI Architecture

## Retrieval-Augmented Generation (RAG)

- FAISS Vector Database
- Sentence Transformers

## Document Processing

- PyPDF
- JSON
- TXT

---

# 🤖 Multi-Agent Workflow

DecisionPilot AI follows a Planner-Agent based architecture.

### 1️⃣ Planner Agent

- Orchestrates the complete AI workflow.
- Coordinates communication between all specialized agents.

### 2️⃣ Context Agent

- Extracts customer health score
- Detects sentiment
- Identifies opportunities
- Finds customer problems
- Generates action items

### 3️⃣ Memory Agent

- Retrieves previous customer interactions
- Compares historical and current customer context
- Detects customer trends

### 4️⃣ Knowledge Agent

- Retrieves enterprise policies
- Searches organizational knowledge using RAG
- Finds relevant business information

### 5️⃣ Reasoning Agent

- Combines customer context, memory and enterprise knowledge
- Assesses business risk
- Calculates confidence
- Identifies business opportunities

### 6️⃣ Recommendation Agent

- Generates Top 5 Next Best Actions
- Prioritizes recommendations
- Assigns AI confidence scores

### 7️⃣ Explanation Agent

- Explains why every recommendation was generated
- Improves AI transparency and trust

---

# 🏗️ System Architecture

![Architecture](architecture.png)

---

# 📂 Project Structure

```text
DecisionPilotAI
│
├── backend
│   ├── agents
│   ├── config
│   ├── knowledge_base
│   ├── memory
│   ├── rag
│   ├── utils
│   ├── models
│   ├── main.py
│   └── requirements.txt
│
├── frontend
│   └── decision-pilot-ai-dashboard
│       ├── app
│       ├── components
│       ├── lib
│       ├── public
│       ├── package.json
│       └── tsconfig.json
│
├── sample_data
│
├── README.md
│
└── architecture.png
```

---

# ⚙️ Installation & Setup

---

## Backend Setup

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

uvicorn main:app --reload
```

Backend runs at:

```
http://localhost:8000
```

---

## Frontend Setup

```bash
cd frontend/decision-pilot-ai-dashboard

npm install

npm run dev
```

Frontend runs at:

```
http://localhost:3000
```

---

# 📂 Sample Inputs

The repository contains sample input files inside the `sample_data/` folder.

| File | Description |
|------|-------------|
| Positive_Customer_Transcript.pdf | Happy customer with expansion opportunity |
| Negative_Customer_Transcript.pdf | Customer showing churn risk |
| Positive_CRM_Record.json | Healthy customer CRM data |
| Negative_CRM_Record.json | At-risk customer CRM data |
| positive_email.txt | Positive follow-up email |
| negative_email.txt | Complaint email from customer |

These files can be directly uploaded into DecisionPilot AI for testing.
---

# 🎯 Business Use Case

DecisionPilot AI assists Customer Success Managers in making informed business decisions by:

- Predicting customer health
- Identifying churn risks
- Detecting expansion opportunities
- Recommending next best actions
- Providing explainable AI insights
- Supporting Human-in-the-Loop decision making

---
# 📜 License

This project was developed as part of the **XLVentures.AI Agentic AI Hackathon 2026**.

For academic and demonstration purposes only.
