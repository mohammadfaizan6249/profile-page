import { useEffect } from 'react';
import { motion } from 'framer-motion';
import PageHero from '../components/PageHero';
import Footer from '../components/Footer';

const METRICS = [
    { value: '7,405', label: 'HotpotQA validation examples' },
    { value: '509,300', label: 'canonical retrieval passages' },
    { value: '53.53%', label: 'answer accuracy' },
    { value: '71.55%', label: 'mean citation fidelity' },
];

const PIPELINE = [
    'Normalize HotpotQA records',
    'Build FAISS retrieval index',
    'Generate citation-aware answers',
    'Audit citation fidelity',
    'Estimate document influence',
    'Run aggregate evaluation',
    'Inspect results in Streamlit',
];

const CONTRIBUTIONS = [
    {
        title: 'Three transparency layers',
        body: 'ProvenAI separates answer correctness, citation fidelity, and document influence instead of compressing trust into one score.',
    },
    {
        title: 'Citation-influence gap',
        body: 'The paper shows that a cited source is not always influential, and uncited sources can still change the answer.',
    },
    {
        title: 'Ablation-based influence',
        body: 'Each retrieved document can be removed and the regenerated answer compared to estimate how strongly that document shaped the output.',
    },
    {
        title: 'Provenance-native direction',
        body: 'The work connects RAG auditing with causal mediation, database provenance, MCP traces, and future cryptographic provenance systems.',
    },
];

const TECH_STACK = [
    'Python',
    'FAISS',
    'HotpotQA',
    'Qwen2.5-3B-Instruct',
    'all-MiniLM-L6-v2',
    'Streamlit',
    'SQLite',
    'Model Context Protocol',
];

const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    visible: (delay = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
    }),
};

function MetricCard({ metric, index }) {
    return (
        <motion.div
            custom={index * 0.07}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            style={{
                background: 'rgba(10,10,10,0.72)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 18,
                padding: '22px 20px',
                minHeight: 132,
                boxShadow: '0 20px 70px rgba(0,0,0,0.24)',
                backdropFilter: 'blur(18px)',
                WebkitBackdropFilter: 'blur(18px)',
            }}
        >
            <p style={{
                margin: '0 0 10px',
                color: '#67e8f9',
                fontSize: 'clamp(26px, 4vw, 42px)',
                lineHeight: 1,
                letterSpacing: '-0.045em',
                fontWeight: 900,
            }}>
                {metric.value}
            </p>
            <p style={{
                margin: 0,
                color: 'rgba(255,255,255,0.54)',
                fontSize: 13,
                lineHeight: 1.5,
                letterSpacing: '0.01em',
            }}>
                {metric.label}
            </p>
        </motion.div>
    );
}

function ContributionCard({ item, index }) {
    return (
        <motion.article
            custom={index * 0.08}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            style={{
                background: 'rgba(255,255,255,0.045)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 16,
                padding: '22px',
                minHeight: 178,
            }}
        >
            <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 28,
                height: 28,
                borderRadius: '50%',
                background: 'rgba(103,232,249,0.12)',
                border: '1px solid rgba(103,232,249,0.24)',
                color: '#67e8f9',
                fontSize: 12,
                fontWeight: 800,
                marginBottom: 18,
            }}>
                {String(index + 1).padStart(2, '0')}
            </span>
            <h3 style={{
                margin: '0 0 10px',
                color: '#fff',
                fontSize: 20,
                lineHeight: 1.18,
                letterSpacing: '-0.025em',
                fontWeight: 850,
            }}>
                {item.title}
            </h3>
            <p style={{
                margin: 0,
                color: 'rgba(255,255,255,0.56)',
                fontSize: 14,
                lineHeight: 1.7,
            }}>
                {item.body}
            </p>
        </motion.article>
    );
}

export default function Research() {
    useEffect(() => {
        document.title = 'Research | Mohammad Faizan';
    }, []);

    return (
        <main style={{ background: 'transparent', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
            <PageHero
                title="RESEARCH"
                subtitle="One paper, one question"
                highlight="Can AI show its evidence?"
            />

            <section style={{ maxWidth: 1180, margin: '0 auto', padding: '0 24px 120px' }}>
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    style={{
                        position: 'relative',
                        overflow: 'hidden',
                        background: 'linear-gradient(135deg, rgba(8,13,22,0.92), rgba(12,10,18,0.82)), rgba(0,0,0,0.74)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: 26,
                        padding: 'clamp(28px, 5vw, 58px)',
                        boxShadow: '0 34px 120px rgba(0,0,0,0.42)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                    }}
                >
                    <div
                        aria-hidden="true"
                        style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'radial-gradient(circle at 18% 18%, rgba(6,182,212,0.22), transparent 32%), radial-gradient(circle at 88% 0%, rgba(168,85,247,0.18), transparent 30%), radial-gradient(circle at 60% 100%, rgba(244,63,94,0.11), transparent 34%)',
                            pointerEvents: 'none',
                        }}
                    />

                    <div className="research-hero-grid" style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 320px', gap: 34, alignItems: 'center' }}>
                        <div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 22 }}>
                                {['Preprint', 'University of Arizona', 'Explainable AI'].map((badge) => (
                                    <span
                                        key={badge}
                                        style={{
                                            color: 'rgba(255,255,255,0.72)',
                                            background: 'rgba(255,255,255,0.06)',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            borderRadius: 999,
                                            padding: '7px 11px',
                                            fontSize: 11,
                                            letterSpacing: '0.08em',
                                            textTransform: 'uppercase',
                                            fontWeight: 800,
                                        }}
                                    >
                                        {badge}
                                    </span>
                                ))}
                            </div>

                            <p style={{
                                margin: '0 0 10px',
                                color: '#67e8f9',
                                fontSize: 12,
                                letterSpacing: '0.22em',
                                textTransform: 'uppercase',
                                fontWeight: 850,
                            }}>
                                Current Research
                            </p>

                            <h1 style={{
                                margin: '0 0 18px',
                                color: '#fff',
                                fontSize: 'clamp(34px, 5vw, 64px)',
                                lineHeight: 1,
                                letterSpacing: '-0.055em',
                                fontWeight: 950,
                            }}>
                                ProvenAI: Provenance-Native Traces of Evidence in Generated Answers
                            </h1>

                            <p style={{
                                margin: '0 0 26px',
                                color: 'rgba(255,255,255,0.64)',
                                fontSize: 'clamp(15.5px, 1.8vw, 18px)',
                                lineHeight: 1.75,
                                maxWidth: 790,
                            }}>
                                ProvenAI is my research framework for auditing retrieval-grounded AI answers. It asks a practical question: when a model cites a source, did that source actually shape the answer, or was it only mentioned after generation?
                            </p>

                            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12 }}>
                                <a
                                    href="/provenai-paper.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        minHeight: 44,
                                        padding: '0 18px',
                                        borderRadius: 999,
                                        background: '#fff',
                                        color: '#070707',
                                        textDecoration: 'none',
                                        fontSize: 13,
                                        fontWeight: 850,
                                        letterSpacing: '0.06em',
                                        textTransform: 'uppercase',
                                    }}
                                >
                                    Read PDF
                                </a>
                                <a
                                    href="https://doi.org/10.48550/arXiv.2606.26449"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        minHeight: 44,
                                        padding: '0 18px',
                                        borderRadius: 999,
                                        background: 'rgba(103,232,249,0.12)',
                                        border: '1px solid rgba(103,232,249,0.28)',
                                        color: '#a5f3fc',
                                        textDecoration: 'none',
                                        fontSize: 13,
                                        fontWeight: 850,
                                        letterSpacing: '0.06em',
                                        textTransform: 'uppercase',
                                    }}
                                >
                                    arXiv DOI
                                </a>
                                <a
                                    href="/work#projects"
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        minHeight: 44,
                                        padding: '0 18px',
                                        borderRadius: 999,
                                        background: 'rgba(255,255,255,0.06)',
                                        border: '1px solid rgba(255,255,255,0.12)',
                                        color: 'rgba(255,255,255,0.82)',
                                        textDecoration: 'none',
                                        fontSize: 13,
                                        fontWeight: 850,
                                        letterSpacing: '0.06em',
                                        textTransform: 'uppercase',
                                    }}
                                >
                                    View project
                                </a>
                            </div>
                        </div>

                        <aside style={{
                            border: '1px solid rgba(255,255,255,0.1)',
                            background: 'rgba(255,255,255,0.055)',
                            borderRadius: 22,
                            padding: 22,
                        }}>
                            <p style={{ margin: '0 0 16px', color: 'rgba(255,255,255,0.38)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 800 }}>
                                Paper Details
                            </p>
                            <div style={{ display: 'grid', gap: 14 }}>
                                {[
                                    ['Authors', 'Mohammad Faizan, Dalal Alharthi'],
                                    ['Area', 'Explainable AI, RAG, provenance'],
                                    ['Benchmark', 'HotpotQA distractor'],
                                    ['Pipeline', '7 auditable stages'],
                                ].map(([label, value]) => (
                                    <div key={label}>
                                        <p style={{ margin: '0 0 4px', color: '#fff', fontSize: 13, fontWeight: 800 }}>{label}</p>
                                        <p style={{ margin: 0, color: 'rgba(255,255,255,0.55)', fontSize: 13.5, lineHeight: 1.5 }}>{value}</p>
                                    </div>
                                ))}
                            </div>
                        </aside>
                    </div>
                </motion.div>

                <div className="research-metrics-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 14, margin: '22px 0 64px' }}>
                    {METRICS.map((metric, index) => (
                        <MetricCard key={metric.label} metric={metric} index={index} />
                    ))}
                </div>

                <motion.section
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                    className="research-two-column"
                    style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 0.7fr) minmax(0, 1fr)', gap: 34, alignItems: 'start', marginBottom: 72 }}
                >
                    <div>
                        <p style={{ margin: '0 0 12px', color: 'rgba(255,255,255,0.34)', fontSize: 12, letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 800 }}>
                            Core Idea
                        </p>
                        <h2 style={{ margin: '0 0 18px', color: '#fff', fontSize: 'clamp(30px, 4.2vw, 52px)', lineHeight: 1.02, letterSpacing: '-0.045em', fontWeight: 950 }}>
                            A citation is not the same thing as evidence influence.
                        </h2>
                        <p style={{ margin: 0, color: 'rgba(255,255,255,0.58)', fontSize: 15, lineHeight: 1.8 }}>
                            Many RAG systems display citations beside generated answers. ProvenAI shows why that is not enough. A source can be cited without strongly influencing the final answer, and an uncited source can still change what the model says.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 14 }} className="research-contribution-grid">
                        {CONTRIBUTIONS.map((item, index) => (
                            <ContributionCard key={item.title} item={item} index={index} />
                        ))}
                    </div>
                </motion.section>

                <motion.section
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                    className="research-two-column research-pipeline-section"
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'minmax(0, 0.9fr) minmax(0, 1fr)',
                        gap: 28,
                        marginBottom: 72,
                        background: 'rgba(10,10,10,0.58)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: 24,
                        padding: 'clamp(24px, 4vw, 40px)',
                    }}
                >
                    <div>
                        <p style={{ margin: '0 0 12px', color: '#a78bfa', fontSize: 12, letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 850 }}>
                            Seven-Stage Pipeline
                        </p>
                        <h2 style={{ margin: '0 0 16px', color: '#fff', fontSize: 'clamp(28px, 3.8vw, 44px)', lineHeight: 1.05, letterSpacing: '-0.04em', fontWeight: 950 }}>
                            From question to auditable report.
                        </h2>
                        <p style={{ margin: 0, color: 'rgba(255,255,255,0.56)', fontSize: 15, lineHeight: 1.75 }}>
                            The system is built as a modular workflow so each phase can be inspected, rerun, or replaced. Every stage saves structured artifacts that make the final answer easier to trace.
                        </p>
                    </div>

                    <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: 10 }}>
                        {PIPELINE.map((step, index) => (
                            <li
                                key={step}
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: '40px minmax(0, 1fr)',
                                    gap: 12,
                                    alignItems: 'center',
                                    background: 'rgba(255,255,255,0.045)',
                                    border: '1px solid rgba(255,255,255,0.08)',
                                    borderRadius: 14,
                                    padding: '12px 14px',
                                }}
                            >
                                <span style={{ color: '#67e8f9', fontSize: 12, fontWeight: 900, letterSpacing: '0.1em' }}>
                                    {String(index + 1).padStart(2, '0')}
                                </span>
                                <span style={{ color: 'rgba(255,255,255,0.72)', fontSize: 14, lineHeight: 1.45 }}>
                                    {step}
                                </span>
                            </li>
                        ))}
                    </ol>
                </motion.section>

                <motion.section
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                    className="research-insight-grid"
                    style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(280px, 0.54fr)', gap: 20, marginBottom: 72 }}
                >
                    <div style={{
                        background: 'linear-gradient(145deg, rgba(244,63,94,0.12), rgba(6,182,212,0.08)), rgba(10,10,10,0.64)',
                        border: '1px solid rgba(255,255,255,0.09)',
                        borderRadius: 22,
                        padding: 'clamp(24px, 4vw, 38px)',
                    }}>
                        <p style={{ margin: '0 0 12px', color: '#fb7185', fontSize: 12, letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 850 }}>
                            Key Finding
                        </p>
                        <h2 style={{ margin: '0 0 16px', color: '#fff', fontSize: 'clamp(26px, 3.6vw, 42px)', lineHeight: 1.05, letterSpacing: '-0.04em', fontWeight: 950 }}>
                            Clean citations can still hide messy influence.
                        </h2>
                        <p style={{ margin: 0, color: 'rgba(255,255,255,0.6)', fontSize: 15, lineHeight: 1.8 }}>
                            In the case study, the generated answer passed the citation audit, but ablation revealed a different sensitivity profile: one cited source showed weak influence, while seven uncited sources shifted the answer or citation set when removed.
                        </p>
                    </div>

                    <div style={{
                        background: 'rgba(255,255,255,0.045)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: 22,
                        padding: 24,
                    }}>
                        <p style={{ margin: '0 0 14px', color: 'rgba(255,255,255,0.38)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 850 }}>
                            Verdict Labels
                        </p>
                        {['Used', 'Hallucinated citation', 'Uncited influential', 'Low influence'].map((label) => (
                            <div
                                key={label}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 10,
                                    padding: '10px 0',
                                    borderTop: '1px solid rgba(255,255,255,0.07)',
                                }}
                            >
                                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#67e8f9', boxShadow: '0 0 16px rgba(103,232,249,0.55)' }} />
                                <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14 }}>{label}</span>
                            </div>
                        ))}
                    </div>
                </motion.section>

                <motion.section
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                    style={{ display: 'grid', gap: 20 }}
                >
                    <div className="research-two-column" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 0.6fr) minmax(0, 1fr)', gap: 28 }}>
                        <div>
                            <p style={{ margin: '0 0 12px', color: 'rgba(255,255,255,0.34)', fontSize: 12, letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 800 }}>
                                Tech Stack
                            </p>
                            <h2 style={{ margin: 0, color: '#fff', fontSize: 'clamp(28px, 3.8vw, 44px)', lineHeight: 1.05, letterSpacing: '-0.04em', fontWeight: 950 }}>
                                Built as measurable AI infrastructure.
                            </h2>
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                            {TECH_STACK.map((tech) => (
                                <span
                                    key={tech}
                                    style={{
                                        background: 'rgba(255,255,255,0.055)',
                                        border: '1px solid rgba(255,255,255,0.09)',
                                        color: 'rgba(255,255,255,0.68)',
                                        borderRadius: 999,
                                        padding: '9px 13px',
                                        fontSize: 13,
                                        lineHeight: 1,
                                    }}
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div style={{
                        background: 'rgba(10,10,10,0.58)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: 22,
                        padding: 'clamp(22px, 4vw, 34px)',
                    }}>
                        <p style={{ margin: '0 0 10px', color: '#facc15', fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 850 }}>
                            Limitations and Next Step
                        </p>
                        <p style={{ margin: 0, color: 'rgba(255,255,255,0.6)', fontSize: 15, lineHeight: 1.8 }}>
                            The current implementation uses a surface-level influence proxy because the local inference path does not expose per-token probabilities. The next research step is a probability-aware backend that can measure token-level distribution shift more directly and test the citation-influence gap across more benchmarks.
                        </p>
                    </div>
                </motion.section>
            </section>

            <style>{`
                @media (max-width: 980px) {
                    .research-hero-grid,
                    .research-two-column,
                    .research-pipeline-section,
                    .research-insight-grid {
                        grid-template-columns: 1fr !important;
                    }
                    .research-metrics-grid {
                        grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
                    }
                }
                @media (max-width: 640px) {
                    .research-metrics-grid,
                    .research-contribution-grid {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}</style>

            <Footer />
        </main>
    );
}
