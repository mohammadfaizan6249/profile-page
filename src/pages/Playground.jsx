import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { marked } from 'marked';
import PageHero from '../components/PageHero';
import Footer from '../components/Footer';

marked.setOptions({ breaks: true, gfm: true });

const styles = `
  .playground-grid {
    display: grid;
    grid-template-columns: minmax(250px, 340px) 1fr;
    gap: 24px;
    align-items: start;
  }

  .playground-card {
    transition: border-color 0.2s ease, background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
  }

  .playground-card:hover {
    transform: translateY(-2px);
    border-color: rgba(125, 249, 255, 0.28) !important;
  }

  .playground-input,
  .playground-select {
    width: 100%;
    border-radius: 16px;
    border: 1px solid rgba(255,255,255,0.1);
    background: rgba(255,255,255,0.045);
    color: white;
    outline: none;
    font-family: 'Inter', sans-serif;
  }

  .playground-select option {
    color: #050505;
  }

  .playground-action {
    border: none;
    border-radius: 999px;
    padding: 13px 22px;
    background: #ff2424;
    color: white;
    font-weight: 800;
    cursor: pointer;
    box-shadow: 0 0 28px rgba(255,36,36,0.28);
    transition: transform 0.2s ease, opacity 0.2s ease;
  }

  .playground-action:hover:not(:disabled) {
    transform: translateY(-1px);
  }

  .playground-action:disabled {
    opacity: 0.55;
    cursor: wait;
  }

  .playground-ghost {
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 999px;
    padding: 12px 18px;
    background: rgba(255,255,255,0.04);
    color: rgba(255,255,255,0.72);
    font-weight: 700;
    cursor: pointer;
  }

  .playground-chip {
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 999px;
    padding: 8px 12px;
    background: rgba(255,255,255,0.045);
    color: rgba(255,255,255,0.66);
    cursor: pointer;
    font-size: 12px;
    text-align: left;
  }

  .playground-doc {
    color: rgba(255,255,255,0.7);
    font-size: 14.5px;
    line-height: 1.75;
    overflow-wrap: anywhere;
  }

  .playground-doc > :first-child {
    margin-top: 0;
  }

  .playground-doc > :last-child {
    margin-bottom: 0;
  }

  .playground-doc h1,
  .playground-doc h2,
  .playground-doc h3 {
    color: white;
    font-family: 'Inter', sans-serif;
    letter-spacing: -0.02em;
    line-height: 1.22;
  }

  .playground-doc h1 {
    font-size: 24px;
    margin: 0 0 16px;
  }

  .playground-doc h2 {
    font-size: 19px;
    margin: 24px 0 10px;
    padding-top: 18px;
    border-top: 1px solid rgba(255,255,255,0.08);
  }

  .playground-doc h3 {
    font-size: 16px;
    margin: 20px 0 8px;
    color: rgba(255,255,255,0.88);
  }

  .playground-doc p {
    margin: 0 0 13px;
  }

  .playground-doc strong {
    color: white;
    font-weight: 800;
  }

  .playground-doc ul,
  .playground-doc ol {
    margin: 0 0 16px;
    padding-left: 22px;
  }

  .playground-doc li {
    margin: 7px 0;
  }

  .playground-doc code {
    font-family: 'SF Mono', 'Fira Code', 'Consolas', monospace;
    font-size: 0.9em;
    background: rgba(125,249,255,0.08);
    border: 1px solid rgba(125,249,255,0.12);
    color: rgba(230,255,255,0.92);
    border-radius: 6px;
    padding: 0.16em 0.42em;
  }

  .playground-doc pre {
    margin: 16px 0;
    padding: 16px;
    overflow-x: auto;
    border-radius: 14px;
    background: rgba(0,0,0,0.48);
    border: 1px solid rgba(255,255,255,0.1);
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.03);
  }

  .playground-doc pre code {
    display: block;
    padding: 0;
    border: 0;
    background: transparent;
    color: rgba(255,255,255,0.78);
    white-space: pre;
  }

  .playground-doc table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    margin: 16px 0;
    overflow: hidden;
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 14px;
    font-size: 13.5px;
  }

  .playground-doc th {
    background: rgba(125,249,255,0.09);
    color: rgba(255,255,255,0.86);
    font-weight: 800;
    text-align: left;
  }

  .playground-doc td,
  .playground-doc th {
    padding: 11px 13px;
    border-bottom: 1px solid rgba(255,255,255,0.07);
    vertical-align: top;
  }

  .playground-doc tr:last-child td {
    border-bottom: 0;
  }

  .playground-doc blockquote {
    margin: 16px 0;
    padding: 12px 15px;
    border-left: 3px solid rgba(125,249,255,0.4);
    background: rgba(125,249,255,0.055);
    border-radius: 0 12px 12px 0;
    color: rgba(255,255,255,0.66);
  }

  .playground-doc hr {
    border: 0;
    border-top: 1px solid rgba(255,255,255,0.08);
    margin: 22px 0;
  }

  .playground-doc-card {
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 18px;
    background: linear-gradient(180deg, rgba(255,255,255,0.045), rgba(255,255,255,0.025));
    padding: 20px;
  }

  @media (max-width: 860px) {
    .playground-grid {
      grid-template-columns: 1fr;
    }

    .playground-panel {
      padding: 18px !important;
      border-radius: 18px !important;
    }

    .playground-doc table {
      display: block;
      overflow-x: auto;
    }
  }
`;

const TOOLS = [
  {
    id: 'portfolio-chatbot',
    eyebrow: '01',
    label: 'Portfolio Chatbot About Me',
    short: 'Ask questions about my background, AI/ML projects, skills, resume, and contact information.',
    badge: 'Recruiter Assistant',
    maxLength: 500,
  },
  {
    id: 'prompt-optimizer',
    eyebrow: '02',
    label: 'Prompt Optimizer',
    short: 'Paste a rough prompt and get a cleaner, more structured version for better AI responses.',
    badge: 'Prompt Lab',
    maxLength: 3000,
  },
  {
    id: 'paper-simplifier',
    eyebrow: '03',
    label: 'Research Paper Simplifier',
    short: 'Paste a paper abstract or technical paragraph and get a simple explanation of the main idea, method, and contribution.',
    badge: 'Research Helper',
    maxLength: 5000,
  },
  {
    id: 'ml-explainer',
    eyebrow: '04',
    label: 'ML Model Explainer',
    short: 'Choose an AI/ML topic and get a clear explanation of how it works, where it is used, and what risks to monitor.',
    badge: 'Systems Explainer',
    maxLength: 200,
  },
  {
    id: 'ai-project-assistant',
    eyebrow: '05',
    label: 'AI Project Assistant',
    short: 'Ask questions about my projects and see how AI explains the systems behind them.',
    badge: 'Project Guide',
    maxLength: 3000,
    placeholder: 'Ask: Explain ModelSentinel in simple terms, or compare ProvenAI and Tarnished AI.',
    actionLabel: 'Ask Assistant',
  },
  {
    id: 'startup-idea-generator',
    eyebrow: '06',
    label: 'Startup Idea Generator',
    short: 'Generate AI-powered startup ideas using prompt engineering and product thinking.',
    badge: 'Idea Lab',
    maxLength: 3000,
    placeholder: 'Describe a domain, audience, or problem. Example: AI tools for college students.',
    actionLabel: 'Generate Ideas',
  },
  {
    id: 'code-improver',
    eyebrow: '07',
    label: 'Code Improver',
    short: 'Paste code snippets and see how AI suggests improvements and optimizations.',
    badge: 'Code Review',
    maxLength: 4000,
    placeholder: 'Paste a small code snippet and ask what should be improved.',
    actionLabel: 'Improve Code',
  },
];

const SUGGESTED_QUESTIONS = [
  'Who is Mohammad Faizan?',
  'What AI/ML projects has he built?',
  'What is ProvenAI?',
  'What is ModelSentinel?',
  'Why should I hire him?',
  'How can I contact him?',
];

const PURPOSES = ['General', 'Coding', 'Research', 'Resume / Career', 'Data Analysis', 'AI Image Generation'];
const LEVELS = ['Simple', 'Student', 'Technical'];
const ML_TOPICS = ['RAG System', 'LLM Agent', 'Drift Monitoring', 'Classification Model', 'Data Pipeline', 'Explainable AI', 'MLOps', 'Custom Topic'];

const initialPrompts = {
  'prompt-optimizer': 'Write a prompt to make an AI explain my machine learning project better for recruiters.',
  'paper-simplifier': 'Retrieval-augmented generation systems combine document retrieval with language generation, but faithfulness remains difficult because generated answers may include unsupported claims even when relevant evidence is retrieved.',
  'ml-explainer': '',
  'ai-project-assistant': 'Which Faizan project best shows MLOps experience, and how should he explain it in an interview?',
  'startup-idea-generator': 'Generate startup ideas around AI agents for university students and job seekers.',
  'code-improver': `function cleanRows(rows) {
  let result = []
  for (let i = 0; i < rows.length; i++) {
    if (rows[i].name != null) result.push(rows[i])
  }
  return result
}`,
};

const RESTORED_TOOL_IDS = ['ai-project-assistant', 'startup-idea-generator', 'code-improver'];

function MarkdownDoc({ text, compact = false }) {
  const html = useMemo(() => {
    const escaped = String(text || '')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    return marked.parse(escaped);
  }, [text]);

  return (
    <div
      className="playground-doc"
      style={compact ? { fontSize: 14, lineHeight: 1.65 } : undefined}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

function SectionOutput({ output }) {
  if (!output) {
    return (
      <div style={{ color: 'rgba(255,255,255,0.34)', lineHeight: 1.7 }}>
        Results will appear here after the AI responds.
      </div>
    );
  }

  return (
    <div className="playground-doc-card">
      <MarkdownDoc text={output} />
    </div>
  );
}

function Toolbar({ loading, disabled, actionLabel, onRun, onClear, onCopy, copied }) {
  return (
    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center', marginTop: 16 }}>
      <button className="playground-action" onClick={onRun} disabled={loading || disabled}>
        {loading ? 'Thinking...' : actionLabel}
      </button>
      <button className="playground-ghost" onClick={onCopy} type="button">
        {copied ? 'Copied' : 'Copy output'}
      </button>
      <button className="playground-ghost" onClick={onClear} type="button">
        Clear
      </button>
    </div>
  );
}

function TextToolPanel({
  tool,
  value,
  output,
  loading,
  copied,
  onChange,
  onRun,
  onCopy,
  onClear,
}) {
  return (
    <div>
      <textarea
        className="playground-input"
        value={value}
        onChange={(event) => onChange(event.target.value.slice(0, tool.maxLength))}
        placeholder={tool.placeholder}
        style={{ minHeight: 170, resize: 'vertical', padding: '16px 18px', fontSize: 15, lineHeight: 1.7 }}
      />
      <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12, marginTop: 8 }}>
        {value.length} / {tool.maxLength} characters
      </div>
      <Toolbar
        loading={loading}
        disabled={!value.trim()}
        actionLabel={tool.actionLabel}
        onRun={onRun}
        onCopy={onCopy}
        onClear={onClear}
        copied={copied}
      />
      <div style={{ marginTop: 20 }}>
        <SectionOutput output={output} />
      </div>
    </div>
  );
}

export default function Playground() {
  const [searchParams] = useSearchParams();
  const requestedTool = searchParams.get('tool');
  const getValidTool = (toolId) => TOOLS.some((tool) => tool.id === toolId) ? toolId : 'portfolio-chatbot';
  const [activeToolId, setActiveToolId] = useState(() => getValidTool(requestedTool));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([]);

  const [promptInput, setPromptInput] = useState(initialPrompts['prompt-optimizer']);
  const [purpose, setPurpose] = useState('General');
  const [promptOutput, setPromptOutput] = useState('');

  const [paperInput, setPaperInput] = useState(initialPrompts['paper-simplifier']);
  const [level, setLevel] = useState('Simple');
  const [paperOutput, setPaperOutput] = useState('');

  const [topic, setTopic] = useState('RAG System');
  const [customTopic, setCustomTopic] = useState('');
  const [mlOutput, setMlOutput] = useState('');
  const [restoredInputs, setRestoredInputs] = useState({
    'ai-project-assistant': initialPrompts['ai-project-assistant'],
    'startup-idea-generator': initialPrompts['startup-idea-generator'],
    'code-improver': initialPrompts['code-improver'],
  });
  const [restoredOutputs, setRestoredOutputs] = useState({
    'ai-project-assistant': '',
    'startup-idea-generator': '',
    'code-improver': '',
  });

  const activeTool = useMemo(() => TOOLS.find((tool) => tool.id === activeToolId), [activeToolId]);

  useEffect(() => {
    const nextTool = getValidTool(requestedTool);
    if (nextTool !== activeToolId) {
      setActiveToolId(nextTool);
      setError('');
      setCopied(false);
    }
  }, [activeToolId, requestedTool]);

  const callAi = async (payload) => {
    setLoading(true);
    setError('');
    setCopied(false);

    try {
      const res = await fetch('/api/ai-playground', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) throw new Error(data.error || 'AI Playground could not respond right now.');
      return data.output;
    } catch (err) {
      setError(err.message);
      return '';
    } finally {
      setLoading(false);
    }
  };

  const sendChat = async (question = chatInput) => {
    const trimmed = question.trim();
    if (!trimmed || loading) return;

    const nextMessages = [...chatMessages, { role: 'user', content: trimmed }];
    setChatMessages(nextMessages);
    setChatInput('');

    const output = await callAi({
      tool: 'portfolio-chatbot',
      input: trimmed,
      messages: chatMessages,
    });

    if (output) {
      setChatMessages([...nextMessages, { role: 'assistant', content: output }]);
    }
  };

  const runPromptOptimizer = async () => {
    const output = await callAi({
      tool: 'prompt-optimizer',
      input: promptInput,
      option: purpose,
    });
    if (output) setPromptOutput(output);
  };

  const runPaperSimplifier = async () => {
    const output = await callAi({
      tool: 'paper-simplifier',
      input: paperInput,
      option: level,
    });
    if (output) setPaperOutput(output);
  };

  const runMlExplainer = async () => {
    const output = await callAi({
      tool: 'ml-explainer',
      input: customTopic,
      option: topic,
    });
    if (output) setMlOutput(output);
  };

  const runRestoredTool = async () => {
    const output = await callAi({
      tool: activeToolId,
      input: restoredInputs[activeToolId],
      option: '',
    });
    if (output) {
      setRestoredOutputs((current) => ({ ...current, [activeToolId]: output }));
    }
  };

  const copyText = async (text) => {
    if (!text) return;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  const clearActiveTool = () => {
    setError('');
    setCopied(false);

    if (activeToolId === 'portfolio-chatbot') {
      setChatInput('');
      setChatMessages([]);
    }
    if (activeToolId === 'prompt-optimizer') {
      setPromptInput('');
      setPromptOutput('');
      setPurpose('General');
    }
    if (activeToolId === 'paper-simplifier') {
      setPaperInput('');
      setPaperOutput('');
      setLevel('Simple');
    }
    if (activeToolId === 'ml-explainer') {
      setTopic('RAG System');
      setCustomTopic('');
      setMlOutput('');
    }
    if (RESTORED_TOOL_IDS.includes(activeToolId)) {
      setRestoredInputs((current) => ({ ...current, [activeToolId]: '' }));
      setRestoredOutputs((current) => ({ ...current, [activeToolId]: '' }));
    }
  };

  const panelTitle = (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'flex-start', marginBottom: 18 }}>
      <div>
        <div style={{ fontSize: 12, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.28)', textTransform: 'uppercase', marginBottom: 8 }}>
          {activeTool?.eyebrow} / {activeTool?.badge}
        </div>
        <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', margin: 0, letterSpacing: '-0.03em', lineHeight: 1 }}>
          {activeTool?.label}
        </h2>
      </div>
      <span style={{ fontSize: 12, color: 'rgba(125,249,255,0.72)', whiteSpace: 'nowrap', paddingTop: 5 }}>
        OpenRouter Powered
      </span>
    </div>
  );

  return (
    <main style={{ minHeight: '100vh', background: 'transparent', color: 'white', fontFamily: "'Inter', sans-serif" }}>
      <style>{styles}</style>
      <PageHero
        title="AI PLAYGROUND"
        subtitle="Experiment with intelligent systems."
        highlight="Interactive portfolio tools."
      />

      <section style={{ maxWidth: 1180, margin: '0 auto', padding: '0 28px 110px' }}>
        <div style={{ maxWidth: 780, marginBottom: 28 }}>
          <p style={{ color: 'rgba(255,255,255,0.48)', lineHeight: 1.8, fontSize: 16.5, margin: '0 0 14px' }}>
            This playground includes small AI-powered tools inspired by my work in machine learning, explainable AI, data systems, and practical AI product development. Visitors can ask about my portfolio, improve prompts, simplify research papers, and understand ML systems in a simple way.
          </p>
          <p style={{ color: 'rgba(255,255,255,0.68)', fontSize: 15.5, fontStyle: 'italic', margin: '0 0 18px' }}>
            The goal is to make this portfolio interactive, not just static.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 9 }}>
            {['OpenRouter Powered', 'No login required', 'Micro AI Tools'].map((badge) => (
              <span
                key={badge}
                style={{
                  border: '1px solid rgba(125,249,255,0.18)',
                  borderRadius: 999,
                  background: 'rgba(125,249,255,0.055)',
                  color: 'rgba(255,255,255,0.7)',
                  padding: '8px 12px',
                  fontSize: 12,
                  fontWeight: 700,
                }}
              >
                {badge}
              </span>
            ))}
          </div>
        </div>

        <div className="playground-grid">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {TOOLS.map((item) => {
              const active = item.id === activeToolId;
              return (
                <button
                  key={item.id}
                  className="playground-card"
                  onClick={() => {
                    setActiveToolId(item.id);
                    setError('');
                    setCopied(false);
                  }}
                  style={{
                    textAlign: 'left',
                    padding: '18px 20px',
                    borderRadius: 18,
                    border: active ? '1px solid rgba(125,249,255,0.45)' : '1px solid rgba(255,255,255,0.08)',
                    background: active ? 'linear-gradient(135deg, rgba(20,184,166,0.13), rgba(139,92,246,0.12))' : 'rgba(10,10,10,0.66)',
                    color: 'white',
                    cursor: 'pointer',
                    boxShadow: active ? '0 0 34px rgba(125,249,255,0.1), 0 0 42px rgba(139,92,246,0.08)' : 'none',
                  }}
                >
                  <div style={{ fontSize: 11, color: active ? 'rgba(125,249,255,0.8)' : 'rgba(255,255,255,0.35)', letterSpacing: '0.18em', marginBottom: 9 }}>
                    {item.eyebrow}
                  </div>
                  <div style={{ fontSize: 18, fontWeight: 850, letterSpacing: '-0.02em', marginBottom: 8 }}>
                    {item.label}
                  </div>
                  <div style={{ color: 'rgba(255,255,255,0.42)', fontSize: 13.5, lineHeight: 1.55 }}>
                    {item.short}
                  </div>
                </button>
              );
            })}
          </div>

          <div
            className="playground-panel"
            style={{
              minHeight: 620,
              borderRadius: 24,
              border: '1px solid rgba(255,255,255,0.08)',
              background: 'rgba(7,7,7,0.74)',
              backdropFilter: 'blur(10px)',
              padding: 24,
              boxShadow: '0 30px 80px rgba(0,0,0,0.55)',
            }}
          >
            {panelTitle}

            {activeToolId === 'portfolio-chatbot' && (
              <div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
                  {SUGGESTED_QUESTIONS.map((question) => (
                    <button key={question} className="playground-chip" onClick={() => sendChat(question)} disabled={loading}>
                      {question}
                    </button>
                  ))}
                </div>

                <div style={{
                  minHeight: 260,
                  maxHeight: 420,
                  overflowY: 'auto',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 18,
                  background: 'rgba(255,255,255,0.03)',
                  padding: 16,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                }}>
                  {!chatMessages.length && (
                    <div style={{ color: 'rgba(255,255,255,0.35)', lineHeight: 1.7 }}>
                      Ask a recruiter-style question about Faizan's background, skills, projects, or contact details.
                    </div>
                  )}
                  {chatMessages.map((message, index) => (
                    <div key={`${message.role}-${index}`} style={{ display: 'flex', justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start' }}>
                      <div style={{
                        maxWidth: '82%',
                        borderRadius: message.role === 'user' ? '16px 16px 4px 16px' : '4px 16px 16px 16px',
                        border: '1px solid rgba(255,255,255,0.08)',
                        background: message.role === 'user' ? 'rgba(255,36,36,0.16)' : 'rgba(125,249,255,0.06)',
                        color: 'rgba(255,255,255,0.76)',
                        padding: '12px 14px',
                        lineHeight: 1.65,
                        whiteSpace: 'pre-wrap',
                        fontSize: 14,
                      }}>
                        {message.role === 'assistant' ? <MarkdownDoc text={message.content} compact /> : message.content}
                      </div>
                    </div>
                  ))}
                  {loading && activeToolId === 'portfolio-chatbot' && (
                    <div style={{ color: 'rgba(125,249,255,0.7)', fontSize: 13 }}>Recruiter Assistant is typing...</div>
                  )}
                </div>

                <textarea
                  className="playground-input"
                  value={chatInput}
                  onChange={(event) => setChatInput(event.target.value.slice(0, 500))}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' && !event.shiftKey) {
                      event.preventDefault();
                      sendChat();
                    }
                  }}
                  placeholder="Ask about Faizan's projects, skills, resume, or contact."
                  style={{ minHeight: 92, resize: 'vertical', padding: '15px 16px', fontSize: 15, lineHeight: 1.65, marginTop: 16 }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center', marginTop: 10, flexWrap: 'wrap' }}>
                  <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12 }}>{chatInput.length} / 500 characters</span>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <button className="playground-ghost" onClick={clearActiveTool} type="button">Clear chat</button>
                    <button className="playground-action" onClick={() => sendChat()} disabled={loading || !chatInput.trim()}>
                      {loading ? 'Sending...' : 'Send'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeToolId === 'prompt-optimizer' && (
              <div>
                <select className="playground-select" value={purpose} onChange={(event) => setPurpose(event.target.value)} style={{ padding: '13px 15px', marginBottom: 14 }}>
                  {PURPOSES.map((item) => <option key={item}>{item}</option>)}
                </select>
                <textarea
                  className="playground-input"
                  value={promptInput}
                  onChange={(event) => setPromptInput(event.target.value.slice(0, 3000))}
                  placeholder="Paste a rough prompt here."
                  style={{ minHeight: 150, resize: 'vertical', padding: '16px 18px', fontSize: 15, lineHeight: 1.7 }}
                />
                <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12, marginTop: 8 }}>{promptInput.length} / 3000 characters</div>
                <Toolbar
                  loading={loading}
                  disabled={!promptInput.trim()}
                  actionLabel="Generate"
                  onRun={runPromptOptimizer}
                  onCopy={() => copyText(promptOutput)}
                  onClear={clearActiveTool}
                  copied={copied}
                />
                <div style={{ marginTop: 20 }}>
                  <SectionOutput output={promptOutput} />
                </div>
              </div>
            )}

            {activeToolId === 'paper-simplifier' && (
              <div>
                <select className="playground-select" value={level} onChange={(event) => setLevel(event.target.value)} style={{ padding: '13px 15px', marginBottom: 14 }}>
                  {LEVELS.map((item) => <option key={item}>{item}</option>)}
                </select>
                <textarea
                  className="playground-input"
                  value={paperInput}
                  onChange={(event) => setPaperInput(event.target.value.slice(0, 5000))}
                  placeholder="Paste a research abstract or technical paragraph."
                  style={{ minHeight: 170, resize: 'vertical', padding: '16px 18px', fontSize: 15, lineHeight: 1.7 }}
                />
                <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12, marginTop: 8 }}>{paperInput.length} / 5000 characters</div>
                <Toolbar
                  loading={loading}
                  disabled={!paperInput.trim()}
                  actionLabel="Simplify"
                  onRun={runPaperSimplifier}
                  onCopy={() => copyText(paperOutput)}
                  onClear={clearActiveTool}
                  copied={copied}
                />
                <div style={{ marginTop: 20 }}>
                  <SectionOutput output={paperOutput} />
                </div>
              </div>
            )}

            {activeToolId === 'ml-explainer' && (
              <div>
                <select className="playground-select" value={topic} onChange={(event) => setTopic(event.target.value)} style={{ padding: '13px 15px', marginBottom: 14 }}>
                  {ML_TOPICS.map((item) => <option key={item}>{item}</option>)}
                </select>
                {topic === 'Custom Topic' && (
                  <>
                    <input
                      className="playground-input"
                      value={customTopic}
                      onChange={(event) => setCustomTopic(event.target.value.slice(0, 200))}
                      placeholder="Type a custom AI/ML topic."
                      style={{ padding: '15px 16px', fontSize: 15 }}
                    />
                    <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12, marginTop: 8 }}>{customTopic.length} / 200 characters</div>
                  </>
                )}
                <Toolbar
                  loading={loading}
                  disabled={topic === 'Custom Topic' && !customTopic.trim()}
                  actionLabel="Explain"
                  onRun={runMlExplainer}
                  onCopy={() => copyText(mlOutput)}
                  onClear={clearActiveTool}
                  copied={copied}
                />
                <div style={{ marginTop: 20 }}>
                  <SectionOutput output={mlOutput} />
                </div>
              </div>
            )}

            {RESTORED_TOOL_IDS.includes(activeToolId) && (
              <TextToolPanel
                tool={activeTool}
                value={restoredInputs[activeToolId]}
                output={restoredOutputs[activeToolId]}
                loading={loading}
                copied={copied}
                onChange={(value) => {
                  setRestoredInputs((current) => ({ ...current, [activeToolId]: value }));
                }}
                onRun={runRestoredTool}
                onCopy={() => copyText(restoredOutputs[activeToolId])}
                onClear={clearActiveTool}
              />
            )}

            {error && (
              <div style={{
                border: '1px solid rgba(248,113,113,0.24)',
                borderRadius: 16,
                background: 'rgba(127,29,29,0.16)',
                color: 'rgba(254,202,202,0.95)',
                padding: 16,
                marginTop: 18,
                lineHeight: 1.6,
              }}>
                {error}
              </div>
            )}

            <p style={{ color: 'rgba(255,255,255,0.28)', fontSize: 12.5, lineHeight: 1.6, margin: '20px 0 0' }}>
              AI responses may be imperfect. This playground is for demonstration purposes.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
