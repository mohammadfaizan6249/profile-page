/* global process */

const PORTFOLIO_KNOWLEDGE = `
Name: Mohammad Faizan
Role: AI/ML Engineer & Data Scientist
Location: Tucson, Arizona
Education: Master's student in Information Science at the University of Arizona, graduating in 2026.
Focus areas: Machine Learning, Data Science, MLOps, Explainable AI, LLM systems, RAG, AI agents, data pipelines, and analytics dashboards.
Projects:
- ProvenAI: Explainable AI system for retrieval-grounded multi-hop question answering. It focuses on citation faithfulness, evidence influence, source attribution, and auditable AI responses.
- ModelSentinel: Production-style ML monitoring system for drift detection, root-cause analysis, alerting, retraining workflow, and recovery validation.
- Urban Park Rangers Analysis: Python data analysis project involving messy CSV cleaning, trend analysis, rescue/call-source summaries, and reporting.
Skills: Python, Pandas, NumPy, Scikit-learn, SQL, FastAPI, React, FAISS, Hugging Face, Streamlit, MLOps, data visualization, model monitoring, explainable AI.
Contact: email.mdfaizan@gmail.com
`;

const TOOL_CONFIG = {
    'portfolio-chatbot': {
        label: 'Portfolio Chatbot About Me',
        maxLength: 500,
        system: `You are "Recruiter Assistant" for Mohammad Faizan's portfolio.
Answer questions about Mohammad Faizan using only this knowledge base:
${PORTFOLIO_KNOWLEDGE}

Tone: simple, confident, recruiter-friendly, and professional.
Rule: If the portfolio knowledge base does not include an answer, say the portfolio does not include that detail. Do not invent facts.
Keep answers concise and useful for recruiters.`,
        buildUserPrompt: ({ input }) => input,
    },
    'prompt-optimizer': {
        label: 'Prompt Optimizer',
        maxLength: 3000,
        system: `You improve rough prompts into stronger prompts for AI tools.
Add role, context, task, constraints, and output format when useful.
Keep the improved prompt practical, clear, and not too long.
Return exactly these sections:
## Improved Prompt
## Why This Is Better
## Optional Tips`,
        buildUserPrompt: ({ input, option }) => `Purpose: ${option || 'General'}

Rough prompt:
${input}`,
    },
    'paper-simplifier': {
        label: 'Research Paper Simplifier',
        maxLength: 5000,
        system: `You simplify research abstracts or technical paragraphs in simple human language.
Do not overclaim. If the provided text does not include enough information for a section, write: "Not clearly stated in the provided text."
Return exactly these sections:
## Simple Summary
## Problem
## Method
## Key Contribution
## Limitations
## Why It Matters`,
        buildUserPrompt: ({ input, option }) => `Explanation level: ${option || 'Simple'}

Research text:
${input}`,
    },
    'ml-explainer': {
        label: 'ML Model Explainer',
        maxLength: 200,
        system: `You explain AI/ML concepts clearly and practically for recruiters, students, and technical visitors.
Avoid overly academic language unless needed.
Return exactly these sections:
## What It Is
## How It Works
## Where It Is Used
## Risks / Limitations
## How To Monitor It
## Example Project Idea`,
        buildUserPrompt: ({ input, option }) => `Topic: ${option === 'Custom Topic' ? input : option || input}`,
    },
    'ai-project-assistant': {
        label: 'AI Project Assistant',
        maxLength: 3000,
        system: `You are Mohammad Faizan's AI project assistant.
Answer questions about his portfolio projects using this project context. Be concise, practical, and technical enough for recruiters.

Project context:
- Tarnished AI: resume-aware AI interview coach with resume/job-description context, live mock interviews, transcripts, and DOCX coaching reports. React, FastAPI, Qwen/MLX.
- ModelSentinel: production-style MLOps dashboard for drift detection, PSI/KS monitoring, model-health alerts, root-cause analysis, retraining workflow, and recovery validation. React, FastAPI, Chart.js.
- ProvenAI: explainable AI system for retrieval-grounded multi-hop question answering with citation faithfulness, evidence influence, source attribution, FAISS retrieval, and auditable responses.
- YouTube Data Extraction: Python API extraction for video statistics and engagement analytics.
- Job Market Analysis: data-role market trend and skills-demand analysis with PDF report.
- TMDB Web Scraper: BeautifulSoup pipeline for movie data, pandas cleaning, and CSV exports.
- Urban Park Rangers Analysis: messy CSV cleaning, trend analysis, rescue/call-source summaries, and reporting.

If a detail is not in this context, say the portfolio does not include that detail.`,
        buildUserPrompt: ({ input }) => input,
    },
    'startup-idea-generator': {
        label: 'Startup Idea Generator',
        maxLength: 3000,
        system: `Generate AI-powered startup ideas for builders interested in machine learning, data systems, agents, and practical AI products.
Return 3 ideas. For each include:
## Idea Name
## User Problem
## AI Angle
## MVP Feature
## Why It Is Realistic
Keep ideas grounded, buildable, and useful. Avoid hype.`,
        buildUserPrompt: ({ input }) => `Generate startup ideas around this direction:
${input}`,
    },
    'code-improver': {
        label: 'Code Improver',
        maxLength: 4000,
        system: `You are a senior engineer reviewing a code snippet.
Explain the main improvement opportunities, then provide a cleaner version if useful.
Focus on correctness, readability, performance, security, and maintainability.
Do not invent missing dependencies.
Return practical advice and code that is easy to understand.`,
        buildUserPrompt: ({ input }) => input,
    },
};

const ML_TOPICS = new Set([
    'RAG System',
    'LLM Agent',
    'Drift Monitoring',
    'Classification Model',
    'Data Pipeline',
    'Explainable AI',
    'MLOps',
    'Custom Topic',
]);

function sendJson(res, status, payload) {
    return res.status(status).json(payload);
}

function friendlyError(res, status, error) {
    return sendJson(res, status, {
        success: false,
        error,
    });
}

function extractAnswer(data) {
    const choice = data?.choices?.[0];
    const message = choice?.message;
    const content = message?.content;

    if (typeof content === 'string' && content.trim()) return content.trim();
    if (Array.isArray(content)) {
        const text = content
            .map((part) => {
                if (typeof part === 'string') return part;
                return part?.text || part?.content || '';
            })
            .join('\n')
            .trim();
        if (text) return text;
    }

    if (typeof message?.reasoning === 'string' && message.reasoning.trim()) {
        return message.reasoning.trim();
    }
    if (typeof choice?.text === 'string' && choice.text.trim()) return choice.text.trim();
    return '';
}

function parseBody(req) {
    if (typeof req.body === 'string') return JSON.parse(req.body);
    return req.body || {};
}

function sanitizeMessages(messages = []) {
    if (!Array.isArray(messages)) return [];

    return messages
        .filter((message) => message && ['user', 'assistant'].includes(message.role))
        .slice(-8)
        .map((message) => ({
            role: message.role,
            content: String(message.content || '').slice(0, 900),
        }))
        .filter((message) => message.content.trim());
}

function validateInput({ tool, input, option, config }) {
    if (tool === 'ml-explainer') {
        if (!ML_TOPICS.has(option)) return 'Choose a valid ML topic.';
        if (option === 'Custom Topic' && !input) return 'Type a custom topic first.';
        if (option === 'Custom Topic' && input.length > config.maxLength) {
            return `Custom topic must be ${config.maxLength} characters or less.`;
        }
        return '';
    }

    if (!input) return 'Please enter something first.';
    if (input.length > config.maxLength) {
        return `Input is too long. Keep it under ${config.maxLength} characters.`;
    }
    return '';
}

async function callOpenRouter({ apiKey, origin, model, config, input, option, tool, messages, retry = false }) {
    const userPrompt = config.buildUserPrompt({ input, option });
    const chatMessages = [
        { role: 'system', content: config.system },
        ...(tool === 'portfolio-chatbot' ? sanitizeMessages(messages) : []),
        {
            role: 'user',
            content: retry
                ? `${userPrompt}\n\nReturn a complete visible answer. Do not return an empty response.`
                : userPrompt,
        },
    ];

    const upstream = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': origin,
            'X-Title': 'Mohammad Faizan AI Playground',
        },
        body: JSON.stringify({
            model,
            messages: chatMessages,
            temperature: tool === 'portfolio-chatbot' ? 0.35 : tool === 'code-improver' || retry ? 0.25 : 0.55,
            max_tokens: tool === 'portfolio-chatbot' ? 550 : 950,
        }),
    });

    const data = await upstream.json();
    return { upstream, data };
}

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return friendlyError(res, 405, 'This endpoint only supports POST requests.');

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
        return friendlyError(res, 500, 'OPENROUTER_API_KEY is not configured yet.');
    }

    try {
        const body = parseBody(req);
        const tool = String(body?.tool || '').trim();
        const input = String(body?.input || '').trim();
        const option = String(body?.option || '').trim();
        const messages = Array.isArray(body?.messages) ? body.messages : [];
        const config = TOOL_CONFIG[tool];

        if (!config) return friendlyError(res, 400, 'Choose a valid AI Playground tool.');

        const validationError = validateInput({ tool, input, option, config });
        if (validationError) return friendlyError(res, 400, validationError);

        const model = process.env.OPENROUTER_MODEL || 'openrouter/free';
        const origin = req.headers.origin || process.env.SITE_URL || 'http://localhost:5173';

        let { upstream, data } = await callOpenRouter({ apiKey, origin, model, config, input, option, tool, messages });

        if (!upstream.ok) {
            return friendlyError(res, upstream.status, data?.error?.message || 'OpenRouter could not answer right now.');
        }

        let output = extractAnswer(data);

        if (!output) {
            ({ upstream, data } = await callOpenRouter({ apiKey, origin, model, config, input, option, tool, messages, retry: true }));

            if (!upstream.ok) {
                return friendlyError(res, upstream.status, data?.error?.message || 'The free model retry failed. Please try again.');
            }

            output = extractAnswer(data);
        }

        if (!output) {
            return friendlyError(res, 502, 'The free model returned an empty response. Please run it again in a few seconds.');
        }

        return sendJson(res, 200, {
            success: true,
            output,
        });
    } catch (err) {
        return friendlyError(res, 500, err.message || 'AI Playground failed. Please try again.');
    }
}
