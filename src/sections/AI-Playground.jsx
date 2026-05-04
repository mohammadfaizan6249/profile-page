import { useRef } from 'react';
import { motion } from 'framer-motion';

/* ─── Injected styles ─────────────────────────────────────────── */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap');

  @keyframes aiCursor {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0; }
  }
  .ai-blink { animation: aiCursor 1.1s step-end infinite; }

  @keyframes aiBobble {
    0%, 100% { transform: translateY(0px);   }
    50%       { transform: translateY(-8px);  }
  }
  .ai-bobble { animation: aiBobble 5s ease-in-out infinite; }

  .ai-preview-link {
    display: block;
    color: inherit;
    text-decoration: none;
    cursor: pointer;
    border-radius: 22px;
    outline: none;
  }

  .ai-preview-link:focus-visible {
    box-shadow: 0 0 0 3px rgba(99,102,241,0.42);
  }

  .ai-preview-link:hover .ai-bobble {
    transform: translateY(-4px);
    box-shadow: 0 44px 110px rgba(0,0,0,0.76), 0 0 0 1px rgba(99,102,241,0.26);
  }

  .ai-feat-row {
    display: flex;
    align-items: flex-start;
    gap: 14px;
    padding: 14px 0;
    border-bottom: 1px solid rgba(255,255,255,0.055);
    transition: padding-left 0.2s;
    cursor: default;
  }
  .ai-feat-row:last-child { border-bottom: none; }
  .ai-feat-row:hover { padding-left: 6px; }

  .ai-cta-btn {
    display: inline-flex;
    align-items: center;
    gap: 11px;
    padding: 15px 32px;
    border-radius: 999px;
    background: white;
    color: #000;
    font-size: 15px;
    font-weight: 600;
    letter-spacing: -0.01em;
    text-decoration: none;
    border: none;
    cursor: pointer;
    transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
    font-family: 'Inter', sans-serif;
  }
  .ai-cta-btn:hover {
    background: #e8e8e8;
    transform: translateY(-2px);
    box-shadow: 0 12px 36px rgba(255,255,255,0.12);
  }

  @media (max-width: 900px) {
    .ai-grid { grid-template-columns: 1fr !important; }
    .ai-preview { display: none; }
  }
`;

/* ─── Features list ───────────────────────────────────────────── */
const FEATURES = [
    {
        num: '01',
        title: 'Portfolio Chatbot About Me',
        desc: 'Ask questions about my background, AI/ML projects, skills, resume, and contact information.',
    },
    {
        num: '02',
        title: 'Prompt Optimizer',
        desc: 'Paste a rough prompt and get a cleaner, more structured version for better AI responses.',
    },
    {
        num: '03',
        title: 'Research Paper Simplifier',
        desc: 'Paste a paper abstract or technical paragraph and get the main idea, method, and contribution.',
    },
    {
        num: '04',
        title: 'ML Model Explainer',
        desc: 'Choose an AI/ML topic and get a clear explanation of how it works and what risks to monitor.',
    },
    {
        num: '05',
        title: 'AI Project Assistant',
        desc: 'Ask questions about my projects and see how AI explains the systems behind them.',
    },
    {
        num: '06',
        title: 'Startup Idea Generator',
        desc: 'Generate AI-powered startup ideas using prompt engineering and product thinking.',
    },
    {
        num: '07',
        title: 'Code Improver',
        desc: 'Paste code snippets and see how AI suggests improvements and optimizations.',
    },
];

/* ─── Static AI Chat Preview ─────────────────────────────────── */
function ChatPreview() {
    return (
        <a
            href="/playground?tool=portfolio-chatbot"
            className="ai-preview-link"
            aria-label="Open Portfolio Chatbot About Me in AI Playground"
        >
        <div
            className="ai-bobble"
            style={{
                background: '#0a0a0a',
                border: '1px solid rgba(255,255,255,0.09)',
                borderRadius: 22,
                overflow: 'hidden',
                fontFamily: "'JetBrains Mono', monospace",
                boxShadow: '0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04)',
            }}
        >
            {/* Window chrome */}
            <div style={{
                background: '#111',
                padding: '11px 18px',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                borderBottom: '1px solid rgba(255,255,255,0.07)',
            }}>
                <div style={{ display: 'flex', gap: 5 }}>
                    {['#ff5f57', '#febc2e', '#28c840'].map((c, i) => (
                        <div key={i} style={{ width: 9, height: 9, borderRadius: '50%', background: c }} />
                    ))}
                </div>
                <div style={{
                    flex: 1,
                    height: 20,
                    background: 'rgba(255,255,255,0.04)',
                    borderRadius: 5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginLeft: 4,
                }}>
                    <span style={{ fontSize: 10.2, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.06em' }}>
                        faizan.dev/playground
                    </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, flexShrink: 0 }}>
                    <motion.div
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 6px #4ade80' }}
                    />
                    <span style={{ fontSize: 9.8, color: '#4ade80', letterSpacing: '0.12em', fontWeight: 600 }}>LIVE</span>
                </div>
            </div>

            {/* Chat body */}
            <div style={{ padding: '21px 21px 17px', display: 'flex', flexDirection: 'column', gap: 16 }}>

                {/* Session label */}
                <div style={{
                    fontSize: 10.3,
                    color: 'rgba(255,255,255,0.18)',
                    textAlign: 'center',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    paddingBottom: 14,
                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                }}>
                        Session active · OpenRouter free
                </div>

                {/* User message */}
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <div style={{
                        background: 'rgba(255,255,255,0.08)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '14px 14px 4px 14px',
                        padding: '10px 16px',
                        maxWidth: '78%',
                        fontSize: 13,
                        color: 'rgba(255,255,255,0.82)',
                        lineHeight: 1.5,
                    }}>
                        What is ProvenAI?
                    </div>
                </div>

                {/* AI response */}
                <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    {/* AI avatar */}
                    <div style={{
                        width: 30, height: 30, borderRadius: '50%',
                        background: 'linear-gradient(135deg,#6366f1,#a855f7)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 12, flexShrink: 0, marginTop: 1,
                        boxShadow: '0 0 14px rgba(99,102,241,0.45)',
                    }}>
                        <span style={{ color: 'white' }}>✦</span>
                    </div>
                    <div style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.07)',
                        borderRadius: '4px 14px 14px 14px',
                        padding: '12px 16px',
                        flex: 1,
                    }}>
                        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.68)', lineHeight: 1.7, margin: '0 0 11px 0' }}>
                            ProvenAI explains retrieval-grounded answers with citation faithfulness, evidence influence, and auditable source attribution.
                        </p>
                        {/* Typing dots */}
                        <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                            {[0, 1, 2].map(i => (
                                <motion.div
                                    key={i}
                                    animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
                                    transition={{ duration: 0.85, repeat: Infinity, delay: i * 0.16, ease: 'easeInOut' }}
                                    style={{ width: 3, height: 3, borderRadius: '50%', background: 'rgba(99,102,241,0.8)' }}
                                />
                            ))}
                            <span style={{ fontSize: 10.8, color: 'rgba(255,255,255,0.18)', marginLeft: 4 }}>
                                generating...
                            </span>
                        </div>
                    </div>
                </div>

                {/* Input bar */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 9,
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.09)',
                    borderRadius: 10,
                    padding: '10px 14px',
                    marginTop: 2,
                }}>
                    <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.18)', flex: 1 }}>
                        Ask about Faizan...
                    </span>
                    <span
                        className="ai-blink"
                        style={{ width: 1.5, height: 15, background: '#6366f1', display: 'inline-block', borderRadius: 1 }}
                    />
                    <div style={{
                        width: 30, height: 30, borderRadius: 8, flexShrink: 0,
                        background: '#1a1a2e',
                        border: '1px solid rgba(99,102,241,0.4)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="rgba(99,102,241,1)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="22" y1="2" x2="11" y2="13" />
                            <polygon points="22 2 15 22 11 13 2 9 22 2" fill="rgba(99,102,241,0.4)" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
        </a>
    );
}

/* ─── Main Section ────────────────────────────────────────────── */
export default function AIPlayground() {
    const ref = useRef(null);

    const fadeUp = (delay = 0) => ({
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
    });

    return (
        <>
            <style>{styles}</style>

            <section
                ref={ref}
                id="ai-playground"
                style={{
                    background: 'rgba(0,0,0,0.18)',
                    width: '100%',
                    padding: '112px 32px',
                    boxSizing: 'border-box',
                    fontFamily: "'Inter', sans-serif",
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                {/* Subtle background radial */}
                <div style={{
                    position: 'absolute',
                    top: '-20%', right: '-10%',
                    width: 700, height: 700,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(99,102,241,0.05) 0%, transparent 65%)',
                    pointerEvents: 'none',
                }} />

                <div
                    className="ai-grid"
                    style={{
                        maxWidth: 1260,
                        margin: '0 auto',
                        display: 'grid',
                        gridTemplateColumns: '1fr 450px',
                        gap: 90,
                        alignItems: 'center',
                        position: 'relative',
                        zIndex: 1,
                    }}
                >
                    {/* ══════════════
              LEFT COLUMN
          ══════════════ */}
                    <div>
                        {/* Label */}
                        <motion.p
                            {...fadeUp(0)}
                            style={{
                                fontSize: 12,
                                letterSpacing: '0.26em',
                                textTransform: 'uppercase',
                                color: 'rgba(255,255,255,0.3)',
                                fontWeight: 600,
                                margin: '0 0 20px 0',
                            }}
                        >
                            AI Playground
                        </motion.p>

                        {/* Headline */}
                        <motion.h2
                            {...fadeUp(0.08)}
                            style={{
                                fontSize: 'clamp(40px, 5.9vw, 78px)',
                                fontWeight: 900,
                                letterSpacing: '-0.03em',
                                lineHeight: 1.05,
                                color: 'white',
                                margin: '0 0 6px 0',
                            }}
                        >
                            Experiment with
                        </motion.h2>
                        <motion.h2
                            {...fadeUp(0.14)}
                            style={{
                                fontSize: 'clamp(40px, 5.9vw, 78px)',
                                fontWeight: 900,
                                letterSpacing: '-0.03em',
                                lineHeight: 1.05,
                                margin: '0 0 32px 0',
                                fontStyle: 'italic',
                                fontFamily: "'Playfair Display', serif",
                                background: 'linear-gradient(90deg,#ff2f92,#ff7a18)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}
                        >
                            intelligent systems.
                        </motion.h2>

                        {/* Description */}
                        <motion.p
                            {...fadeUp(0.22)}
                            style={{
                                fontSize: 16.2,
                                color: 'rgba(255,255,255,0.4)',
                                lineHeight: 1.85,
                                maxWidth: 560,
                                margin: '0 0 10px 0',
                            }}
                        >
                            This playground includes small AI-powered tools inspired by my work in machine learning,
                            explainable AI, data systems, and practical AI product development. Visitors can ask about
                            my portfolio, improve prompts, simplify research papers, and understand ML systems in a simple way.
                        </motion.p>
                        <motion.p
                            {...fadeUp(0.28)}
                            style={{
                                fontSize: 16.2,
                                color: 'rgba(255,255,255,0.55)',
                                lineHeight: 1.85,
                                maxWidth: 560,
                                margin: '0 0 44px 0',
                                fontStyle: 'italic',
                            }}
                        >
                            The goal is to make this portfolio interactive, not just static.
                        </motion.p>

                        {/* Feature list */}
                        <motion.div {...fadeUp(0.34)} style={{ marginBottom: 44 }}>
                            {FEATURES.map((f) => (
                                <div key={f.num} className="ai-feat-row">
                                    <span style={{
                                        fontSize: 11,
                                        fontWeight: 700,
                                        color: 'rgba(255,255,255,0.2)',
                                        letterSpacing: '0.1em',
                                        marginTop: 3,
                                        flexShrink: 0,
                                        fontFamily: "'JetBrains Mono', monospace",
                                    }}>
                                        {f.num}
                                    </span>
                                    <div>
                                        <p style={{ fontSize: 15, fontWeight: 600, color: 'white', margin: '0 0 5px 0', letterSpacing: '-0.01em' }}>
                                            {f.title}
                                        </p>
                                        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.33)', margin: 0, lineHeight: 1.6 }}>
                                            {f.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </motion.div>

                        {/* CTA row */}
                        <motion.div
                            {...fadeUp(0.44)}
                            style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}
                        >
                            <a href="/playground" className="ai-cta-btn">
                                Open AI Playground
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="5" y1="12" x2="19" y2="12" />
                                    <polyline points="12 5 19 12 12 19" />
                                </svg>
                            </a>

                            <span style={{
                                fontSize: 13,
                                color: 'rgba(255,255,255,0.22)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 7,
                            }}>
                                <span style={{
                                    width: 5, height: 5, borderRadius: '50%',
                                    background: '#4ade80',
                                    display: 'inline-block',
                                    boxShadow: '0 0 6px #4ade80',
                                }} />
                                No login required
                            </span>
                        </motion.div>
                    </div>

                    {/* ══════════════
              RIGHT COLUMN
          ══════════════ */}
                    <motion.div
                        className="ai-preview"
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <ChatPreview />
                        <p style={{
                            textAlign: 'center',
                            fontSize: 12,
                            color: 'rgba(255,255,255,0.15)',
                            marginTop: 12,
                            letterSpacing: '0.04em',
                        }}>
                            Static preview · Try the real thing →
                        </p>
                    </motion.div>
                </div>
            </section>
        </>
    );
}
