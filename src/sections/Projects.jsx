import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

/* ─── Static fallback data (used if Supabase is unavailable) ──────────── */
const FALLBACK_PROJECTS = [
    {
        id: 0, title: 'Tarnished AI', category: 'Multimodal AI Product', color: '#f97316',
        description: 'A resume-aware AI interview coach that turns a resume and job description into prep sessions, live mock interviews, transcripts, and DOCX coaching reports.',
        features: ['Resume and job-description context builder', 'Voice-backed live mock interview workflow', 'Transcript-aware reports with DOCX export'],
        tech: [{ label: 'React', icon: '⚛' }, { label: 'FastAPI', icon: '⚡' }, { label: 'Qwen / MLX', icon: 'AI' }],
        desktop: { bg: '#120b05', accent: '#f97316' },
        mobile: { bg: '#170d06', accent: '#f97316', label: 'Live interview room' },
        images: { desktop: '', mobile: '' },
    },
    {
        id: 1, title: 'ProvenAI', category: 'Explainable AI Agents', color: '#a855f7',
        description: 'A framework for auditable MCP-based AI agents with immutable data lineage, evidence attribution, and resource-ablation explainability.',
        features: ['JSON-RPC interception for LLM tool traffic', 'KL-divergence resource ablation engine', 'FAISS retrieval and evidence-chain dashboard'],
        tech: [{ label: 'Python', icon: 'PY' }, { label: 'FAISS', icon: 'FX' }, { label: 'Streamlit', icon: 'ST' }],
        desktop: { bg: '#0d0814', accent: '#a855f7' },
        mobile: { bg: '#130a1f', accent: '#a855f7', label: 'Evidence chain' },
        images: { desktop: '', mobile: '' },
    },
    {
        id: 2, title: 'ModelSentinel', category: 'MLOps Monitoring', color: '#38bdf8',
        description: 'An end-to-end MLOps dashboard for detecting production drift, measuring model-health degradation, triggering retraining, and validating recovery.',
        features: ['PSI and KS feature-drift monitoring', 'Model health alerts and impact summaries', 'Versioned retraining and recovery validation'],
        tech: [{ label: 'React', icon: '⚛' }, { label: 'FastAPI', icon: '⚡' }, { label: 'Chart.js', icon: 'CH' }],
        desktop: { bg: '#03111a', accent: '#38bdf8' },
        mobile: { bg: '#051520', accent: '#38bdf8', label: 'Drift dashboard' },
        images: { desktop: '', mobile: '' },
    },
    {
        id: 3, title: 'YouTube Data Extraction', category: 'Data Engineering', color: '#ef4444',
        description: 'A Python project that integrates the YouTube API to collect top-video statistics, compute engagement ratios, and export structured analytics datasets.',
        features: ['API-based extraction for top video data', 'Views, likes, comments, and engagement analysis', 'JSON exports for downstream reporting'],
        tech: [{ label: 'Python', icon: 'PY' }, { label: 'Requests', icon: 'RQ' }, { label: 'Pandas', icon: 'PD' }],
        desktop: { bg: '#170707', accent: '#ef4444' },
        mobile: { bg: '#1b0808', accent: '#ef4444', label: 'Engagement report' },
        images: { desktop: '', mobile: '' },
    },
    {
        id: 4, title: 'Job Market Analysis', category: 'Analytics Report', color: '#10b981',
        description: 'A data-role market analysis that summarizes hiring trends, identifies in-demand skills, and turns findings into a structured PDF insight report.',
        features: ['Market trend and skills-demand analysis', 'Ideal data-role candidate profile', 'PDF report with visualized insights'],
        tech: [{ label: 'Python', icon: 'PY' }, { label: 'Visualization', icon: 'VZ' }, { label: 'Reports', icon: 'RP' }],
        desktop: { bg: '#06140f', accent: '#10b981' },
        mobile: { bg: '#071811', accent: '#10b981', label: 'Skill insights' },
        images: { desktop: '', mobile: '' },
    },
    {
        id: 5, title: 'TMDB Web Scraper', category: 'Web Scraping', color: '#facc15',
        description: 'A BeautifulSoup scraping pipeline that extracts movie data from TMDB, cleans it into pandas DataFrames, and exports analysis-ready CSV datasets.',
        features: ['BeautifulSoup movie-data extraction', 'Data cleaning and DataFrame structuring', 'CSV exports for exploratory analysis'],
        tech: [{ label: 'Python', icon: 'PY' }, { label: 'BeautifulSoup', icon: 'BS' }, { label: 'CSV', icon: 'CS' }],
        desktop: { bg: '#151204', accent: '#facc15' },
        mobile: { bg: '#181504', accent: '#facc15', label: 'Movie dataset' },
        images: { desktop: '', mobile: '' },
    },
    {
        id: 6, title: 'Urban Park Rangers Analysis', category: 'Data Analysis', color: '#60a5fa',
        description: 'A Python analysis of Urban Park Rangers data with cleaned tables, trend summaries, and reporting around animal rescues and call-source patterns.',
        features: ['Messy CSV cleaning and transformation', 'Trend analysis for rescues and call sources', 'Publication-ready tables and PDF reporting'],
        tech: [{ label: 'Python', icon: 'PY' }, { label: 'Jupyter', icon: 'JP' }, { label: 'Excel / CSV', icon: 'XL' }],
        desktop: { bg: '#07111f', accent: '#60a5fa' },
        mobile: { bg: '#091423', accent: '#60a5fa', label: 'Ranger insights' },
        images: { desktop: '', mobile: '' },
    },
];

/* ─── Projects hook ─────────────────────────────────────────────────────── */
function useProjects() {
    return FALLBACK_PROJECTS;
}

/* ─── Injected CSS ──────────────────────────────────────────────────────── */
const injectStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;900&family=Playfair+Display:ital@1&display=swap');

  .vs-pill {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 14px;
    border-radius: 999px;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.10);
    font-size: 12px;
    color: rgba(255,255,255,0.65);
    font-family: 'Inter', sans-serif;
    font-weight: 500;
    cursor: default;
    transition: border-color 0.2s, background 0.2s;
    white-space: nowrap;
  }
  .vs-pill:hover {
    background: rgba(255,255,255,0.09);
    border-color: rgba(255,255,255,0.22);
  }

  /* Mobile project cards */
  .mobile-project-card {
    background: rgba(10,10,10,0.82);
    border: 1px solid rgba(255,255,255,0.08);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-radius: 22px;
    padding: 32px 28px;
    transition: border-color 0.3s, background 0.3s;
  }
  .mobile-project-card:hover {
    border-color: rgba(255,255,255,0.15);
    background: rgba(17,17,17,0.9);
  }

  .projects-showcase-stage {
    background: rgba(0,0,0,0.22);
  }
  .projects-light-portal {
    filter: invert(1) hue-rotate(180deg) saturate(0.94) contrast(0.96);
  }
  .projects-light-portal img {
    filter: invert(1) hue-rotate(180deg) saturate(1.06) contrast(1.04);
  }

  @media (max-width: 479px) {
    .projects-sticky-section { display: none !important; }
    .projects-mobile-section { display: block !important; }
  }
  @media (min-width: 480px) {
    .projects-sticky-section { display: block !important; }
    .projects-mobile-section { display: none !important; }
  }

  @media (max-width: 899px) {
    .projects-showcase-stage {
      background: rgba(0,0,0,0.26) !important;
      backdrop-filter: none !important;
      -webkit-backdrop-filter: none !important;
    }
    .projects-showcase-header {
      padding: 92px 22px 22px !important;
    }
    .projects-showcase-header h2 {
      font-size: clamp(38px, 10.5vw, 64px) !important;
    }
    .projects-showcase-grid {
      display: flex !important;
      align-items: stretch !important;
      justify-content: center !important;
      padding: 0 20px 46px !important;
      max-width: 720px !important;
    }
    .projects-copy-panel {
      width: 100% !important;
      padding: 30px 28px !important;
      border-radius: 20px !important;
      border: 1px solid rgba(255,255,255,0.09) !important;
      background: rgba(7,7,7,0.78) !important;
      backdrop-filter: blur(12px) !important;
      -webkit-backdrop-filter: blur(12px) !important;
      box-shadow: 0 24px 70px rgba(0,0,0,0.55) !important;
    }
    .projects-copy-panel p {
      max-width: none !important;
    }
    .projects-timeline-col,
    .projects-mockup-col {
      display: none !important;
    }
  }

  @media (min-width: 900px) {
    .projects-copy-panel {
      background: rgba(7,7,7,0.46);
      border: 1px solid rgba(255,255,255,0.055);
      border-radius: 22px;
      padding: 32px 34px;
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
    }
  }
`;

/* ─── Desktop Mockup ────────────────────────────────────────────────────── */
/* Real image: aspect-ratio 1536:1100 ≈ 1.4:1 (landscape)                  */
/* Fallback: generated browser-chrome UI                                     */
function DesktopMockup({ project }) {
    const { bg, accent } = project.desktop;
    const imgSrc = project.images?.desktop;

    return (
        <div style={{
            width: '100%', maxWidth: 560,
            borderRadius: 14, overflow: 'hidden',
            background: bg,
            border: '1px solid rgba(255,255,255,0.12)',
            boxShadow: `0 40px 100px rgba(0,0,0,0.92), 0 0 0 1px rgba(255,255,255,0.06), 0 0 80px ${accent}28`,
            fontFamily: "'Inter',sans-serif",
        }}>
            {/* macOS-style browser chrome */}
            <div style={{
                background: '#181818',
                padding: '10px 16px',
                display: 'flex', alignItems: 'center', gap: 8,
                borderBottom: '1px solid rgba(255,255,255,0.07)',
            }}>
                <div style={{ display: 'flex', gap: 5 }}>
                    {['#ff5f57', '#febc2e', '#28c840'].map((c, i) => (
                        <div key={i} style={{ width: 9, height: 9, borderRadius: '50%', background: c }} />
                    ))}
                </div>
                <div style={{
                    flex: 1, background: 'rgba(255,255,255,0.06)',
                    borderRadius: 5, height: 22,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                    <span style={{ fontSize: 9.5, color: 'rgba(255,255,255,0.32)' }}>
                        faizan.dev/{project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}
                    </span>
                </div>
            </div>

            {/* Content */}
            {imgSrc ? (
                /* ── Real screenshot fills frame at native 1536:1100 ratio ── */
                <div style={{ aspectRatio: '1536 / 1100', width: '100%', overflow: 'hidden' }}>
                    <img
                        src={imgSrc}
                        alt={`${project.title} desktop`}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        draggable={false}
                    />
                </div>
            ) : (
                /* ── Generated UI fallback ── */
                <div style={{ padding: '20px 20px 16px', minHeight: 220 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
                        <span style={{ fontSize: 14, fontWeight: 800, color: 'white', letterSpacing: '-0.02em' }}>
                            {project.title}
                        </span>
                        <div style={{ display: 'flex', gap: 14 }}>
                            {['Home', 'Tools', 'Docs', 'Pricing'].map((n, i) => (
                                <span key={i} style={{
                                    fontSize: 9.5,
                                    color: i === 3 ? accent : 'rgba(255,255,255,0.4)',
                                    fontWeight: i === 3 ? 700 : 400,
                                }}>{n}</span>
                            ))}
                        </div>
                        <div style={{
                            width: 27, height: 27, borderRadius: 7,
                            background: accent, display: 'flex',
                            alignItems: 'center', justifyContent: 'center', fontSize: 12,
                        }}>✦</div>
                    </div>
                    <div style={{ textAlign: 'center', padding: '8px 0 12px' }}>
                        <div style={{ fontSize: 22, fontWeight: 900, color: 'white', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 9 }}>
                            {project.title} <span style={{ color: accent }}>workspace</span>
                        </div>
                        <div style={{ fontSize: 9.8, color: 'rgba(255,255,255,0.35)', maxWidth: 290, margin: '0 auto', lineHeight: 1.6 }}>
                            {project.description}
                        </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 7, marginTop: 14 }}>
                        {project.features.slice(0, 3).map((feat, i) => (
                            <div key={i} style={{
                                padding: '9px 10px', borderRadius: 7, fontSize: 8.7,
                                minHeight: 48,
                                background: i === 0 ? `${accent}24` : 'rgba(255,255,255,0.05)',
                                color: i === 0 ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.44)',
                                border: `1px solid ${i === 0 ? accent : 'rgba(255,255,255,0.08)'}`,
                                lineHeight: 1.35,
                            }}>{feat}</div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

/* ─── Mobile Mockup ─────────────────────────────────────────────────────── */
/* Real image: aspect-ratio 420:908 ≈ 0.46:1 (portrait)                    */
/* W=148 → H = 148 × (908/420) ≈ 320px                                     */
function MobileMockup({ project }) {
    const { bg, accent } = project.mobile;
    const imgSrc = project.images?.mobile;
    const W = 158;
    const H = Math.round(W * (908 / 420)); // ≈ 320

    return (
        <div style={{
            width: W, height: H, position: 'relative',
            borderRadius: 24, overflow: 'hidden',
            background: bg,
            border: '1.5px solid rgba(255,255,255,0.14)',
            boxShadow: `0 32px 72px rgba(0,0,0,0.96), 0 0 50px ${accent}38`,
            fontFamily: "'Inter',sans-serif",
            flexShrink: 0,
            display: 'flex', flexDirection: 'column',
        }}>
            {imgSrc ? (
                /* ── Real screenshot fills phone shell ── */
                <>
                    {/* Status bar gradient overlay */}
                    <div style={{
                        position: 'absolute', top: 0, left: 0, right: 0, height: 28,
                        background: 'linear-gradient(to bottom,rgba(0,0,0,0.5),transparent)',
                        zIndex: 2, pointerEvents: 'none',
                        display: 'flex', alignItems: 'center',
                        justifyContent: 'space-between', padding: '6px 12px 0',
                    }}>
                        <span style={{ fontSize: 7, color: 'rgba(255,255,255,0.75)', fontWeight: 600 }}>9:41</span>
                        <span style={{ fontSize: 7, color: 'rgba(255,255,255,0.5)' }}>▌▌ WiFi</span>
                    </div>
                    <img
                        src={imgSrc}
                        alt={`${project.title} mobile`}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        draggable={false}
                    />
                </>
            ) : (
                /* ── Generated UI fallback ── */
                <>
                    <div style={{ padding: '11px 13px 7px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: 8.6, color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>9:41</span>
                        <span style={{ fontSize: 7.5, color: 'rgba(255,255,255,0.45)' }}>▌▌▌ WiFi</span>
                    </div>
                    <div style={{ padding: '5px 11px 9px', flex: 1 }}>
                        <div style={{ background: accent, borderRadius: 13, padding: '13px 11px', marginBottom: 9 }}>
                            <div style={{ fontSize: 10.2, fontWeight: 800, color: 'white', marginBottom: 3 }}>{project.title}</div>
                            <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.75)', lineHeight: 1.5, marginBottom: 11 }}>
                                {project.mobile.label}<br />Get started →
                            </div>
                            <div style={{ background: 'rgba(0,0,0,0.2)', borderRadius: 6, padding: '5px 8px', fontSize: 7.5, color: 'rgba(255,255,255,0.65)' }}>
                                ✦ {project.tech[0]?.label} · {project.tech[1]?.label}
                            </div>
                        </div>
                        <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 13, padding: '10px 11px' }}>
                            <div style={{ fontSize: 9.2, fontWeight: 700, color: 'white', marginBottom: 3 }}>{project.category}</div>
                            <div style={{ fontSize: 7.5, color: 'rgba(255,255,255,0.35)', marginBottom: 7 }}>
                                {project.features[0]}
                            </div>
                            <div style={{
                                height: 22, borderRadius: 999, background: accent,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: 7.5, fontWeight: 700, color: 'white',
                            }}>View Case Study →</div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

/* ─── Spark bullet icon ─────────────────────────────────────────────────── */
function SparkIcon({ color }) {
    return (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: 3 }}>
            <path d="M12 2L13.5 9L20 10.5L13.5 12L12 19L10.5 12L4 10.5L10.5 9L12 2Z"
                fill={color} opacity="0.9" />
        </svg>
    );
}

/* ─── Tech Pill ─────────────────────────────────────────────────────────── */
function TechPill({ icon, label }) {
    return (
        <span className="vs-pill">
            <span style={{ fontSize: 11 }}>{icon}</span>
            {label}
        </span>
    );
}

/* ─── Center Timeline ───────────────────────────────────────────────────── */
function Timeline({ activeIndex, total, scrollProgress, projects }) {
    const sy = Math.min(252, Math.max(0, scrollProgress * 252));
    const activeColor = projects[activeIndex]?.color ?? '#a855f7';

    return (
        <div style={{
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', position: 'relative',
            width: 48,
        }}>
            {/* Vertical track */}
            <div style={{
                position: 'relative',
                width: 2, flexGrow: 1, minHeight: 300,
                margin: '0 auto',
            }}>
                {/* Dim rail */}
                <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(255,255,255,0.07)', borderRadius: 2,
                }} />

                {/* Filled progress */}
                <motion.div style={{
                    position: 'absolute', top: 0, left: 0, right: 0,
                    height: sy,
                    background: `linear-gradient(to bottom, #e84c1e, ${activeColor})`,
                    borderRadius: 2,
                    transition: 'background 0.5s ease',
                }} />

                {/* Profile image — the moving marker */}
                <motion.div style={{
                    position: 'absolute',
                    left: '50%',
                    y: sy,
                    translateX: '-50%',
                    translateY: '-50%',
                    zIndex: 10,
                }}>
                    <div style={{
                        width: 52, height: 52, borderRadius: '50%', padding: 2,
                        background: `conic-gradient(${activeColor}, #a855f7, #e84c1e, ${activeColor})`,
                        boxShadow: `0 0 18px 4px ${activeColor}66`,
                        transition: 'box-shadow 0.5s ease, background 0.5s ease',
                    }}>
                        <img
                            src="/cropped_circle_image.webp?v=20260504"
                            alt="Profile"
                            style={{
                                width: '100%', height: '100%',
                                borderRadius: '50%',
                                objectFit: 'cover',
                                display: 'block',
                                border: '2px solid #000',
                            }}
                        />
                    </div>
                </motion.div>

                {/* Project dot markers */}
                {Array.from({ length: total }).map((_, i) => (
                    <div key={i} style={{
                        position: 'absolute',
                        left: '50%', transform: 'translateX(-50%)',
                        top: `${(i / (total - 1)) * 100}%`,
                        marginTop: -5,
                        width: activeIndex === i ? 10 : 7,
                        height: activeIndex === i ? 10 : 7,
                        borderRadius: '50%',
                        background: activeIndex === i ? projects[i].color : 'rgba(255,255,255,0.18)',
                        border: activeIndex === i
                            ? `2px solid ${projects[i].color}`
                            : '1.5px solid rgba(255,255,255,0.1)',
                        boxShadow: activeIndex === i ? `0 0 8px 2px ${projects[i].color}99` : 'none',
                        transition: 'all 0.35s ease',
                        zIndex: 3,
                    }} />
                ))}
            </div>
        </div>
    );
}

function ProjectShowcaseStage({
    activeProject,
    activeIndex,
    projects,
    scrollProgress,
    stagePhase,
    stagePosition,
    usePortalStage,
}) {
    return (
        <section
            className={`projects-showcase-stage${usePortalStage ? ' projects-light-portal' : ''}`}
            style={{
                position: stagePosition,
                top: stagePhase === 'after' ? 'auto' : 0,
                bottom: stagePhase === 'after' ? 0 : 'auto',
                left: 0,
                right: 0,
                width: '100%',
                height: '100vh',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                zIndex: usePortalStage ? 45 : 1,
                pointerEvents: 'auto',
            }}
        >
            <div style={{
                position: 'absolute', right: '5%', top: '25%',
                width: 640, height: 640, borderRadius: '50%',
                background: `radial-gradient(ellipse,${activeProject.color}1a 0%,transparent 68%)`,
                pointerEvents: 'none', zIndex: 0,
            }} />
            <div style={{
                position: 'absolute', left: '-5%', bottom: '10%',
                width: 400, height: 400, borderRadius: '50%',
                background: `radial-gradient(ellipse,${activeProject.color}0d 0%,transparent 70%)`,
                pointerEvents: 'none', zIndex: 0,
            }} />

            <div className="projects-showcase-header" style={{
                textAlign: 'center',
                paddingTop: 88, paddingBottom: 28,
                position: 'relative', zIndex: 1, flexShrink: 0,
            }}>
                <p style={{
                    fontSize: 12, letterSpacing: '0.28em',
                    color: 'rgba(255,255,255,0.3)',
                    textTransform: 'uppercase', fontWeight: 500, marginBottom: 12,
                }}>
                    AI/ML Systems Portfolio
                </p>
                <h2 style={{
                    fontSize: 'clamp(40px, 6.5vw, 88px)',
                    fontWeight: 900, letterSpacing: '-0.03em',
                    lineHeight: 1, margin: 0, display: 'inline',
                }}>
                    <span style={{ color: 'white' }}>PROJECT </span>
                    <span style={{
                        fontStyle: 'italic',
                        background: 'linear-gradient(90deg,#6366f1 0%,#a855f7 50%,#ec4899 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontFamily: "'Playfair Display',serif",
                    }}>SHOWCASE</span>
                </h2>
                <p style={{
                    marginTop: 14, fontSize: 12,
                    color: 'rgba(255,255,255,0.24)',
                    letterSpacing: '0.2em', textTransform: 'uppercase',
                }}>
                    {String(activeIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                </p>
            </div>

            <div className="projects-showcase-grid" style={{
                display: 'grid',
                gridTemplateColumns: '1.12fr 88px 1.44fr',
                maxWidth: 1420, width: '100%',
                margin: '0 auto', padding: '0 56px 58px',
                position: 'relative', zIndex: 1,
                flex: 1, minHeight: 0,
                alignItems: 'center',
            }}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={`copy-${activeProject.id}`}
                        className="projects-copy-panel"
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -18 }}
                        transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                        style={{ paddingRight: 40, overflow: 'hidden' }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                            <div style={{ width: 25, height: 3, background: activeProject.color, borderRadius: 2, flexShrink: 0 }} />
                            <h3 style={{
                                fontSize: 30, fontWeight: 800, color: 'white',
                                letterSpacing: '-0.02em', margin: 0,
                            }}>
                                {activeProject.title}
                            </h3>
                            <span style={{
                                fontSize: 12, color: 'rgba(255,255,255,0.28)',
                                letterSpacing: '0.18em', textTransform: 'uppercase',
                                marginLeft: 6, fontWeight: 500,
                            }}>
                                {activeProject.category}
                            </span>
                        </div>

                        <p style={{
                            fontSize: 14.5, color: 'rgba(255,255,255,0.48)',
                            lineHeight: 1.82, marginBottom: 26, maxWidth: 490,
                        }}>
                            {activeProject.description}
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 30 }}>
                            {activeProject.features.map((feat, fi) => (
                                <div key={fi} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                                    <SparkIcon color={activeProject.color} />
                                    <span style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.62)', lineHeight: 1.6 }}>
                                        {feat}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                            {activeProject.tech.map(({ label, icon }) => (
                                <TechPill key={label} icon={icon} label={label} />
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>

                <div className="projects-timeline-col" style={{ display: 'flex', justifyContent: 'center', height: '100%', alignItems: 'center' }}>
                    <Timeline
                        activeIndex={activeIndex}
                        total={projects.length}
                        scrollProgress={scrollProgress}
                        projects={projects}
                    />
                </div>

                <div className="projects-mockup-col" style={{
                    paddingLeft: 48,
                    display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
                    height: '100%',
                }}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`mockups-${activeProject.id}`}
                            initial={{ opacity: 0, x: 28, scale: 0.97 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: -18, scale: 0.97 }}
                            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                            style={{ position: 'relative', width: '100%', maxWidth: 630, height: 360 }}
                        >
                            <motion.div
                                whileHover={{ rotateX: 3, rotateY: 3, scale: 1.03 }}
                                style={{
                                    position: 'absolute',
                                    left: 0, bottom: -20,
                                    rotate: -12,
                                    transformOrigin: 'bottom left',
                                    zIndex: 2,
                                }}
                            >
                                <MobileMockup project={activeProject} />
                            </motion.div>

                            <motion.div
                                whileHover={{ rotateX: 3, rotateY: -3, scale: 1.02 }}
                                style={{
                                    position: 'absolute',
                                    right: 0, top: 0,
                                    rotate: 2,
                                    transformOrigin: 'top right',
                                    zIndex: 1,
                                    width: 'calc(100% - 100px)',
                                }}
                            >
                                <DesktopMockup project={activeProject} />
                            </motion.div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}

/* ─── Main Section ──────────────────────────────────────────────────────── */
export default function Projects() {
    const PROJECTS = useProjects();
    const stickySectionRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [stagePhase, setStagePhase] = useState('before');
    const [isLightTheme, setIsLightTheme] = useState(false);
    const activeProject = PROJECTS[activeIndex] ?? PROJECTS[0];
    const scrollProgress = PROJECTS.length <= 1 ? 0 : activeIndex / (PROJECTS.length - 1);

    useEffect(() => {
        const syncTheme = () => {
            setIsLightTheme(document.documentElement.dataset.theme === 'light');
        };

        syncTheme();
        const observer = new MutationObserver(syncTheme);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const updateActiveProject = () => {
            const section = stickySectionRef.current;
            if (!section) return;

            const rect = section.getBoundingClientRect();
            const scrollableDistance = Math.max(1, section.offsetHeight - window.innerHeight);
            const progress = Math.min(1, Math.max(0, -rect.top / scrollableDistance));
            const nextPhase = rect.top > 0
                ? 'before'
                : rect.bottom <= window.innerHeight
                    ? 'after'
                    : 'inside';
            const nextIndex = Math.min(
                PROJECTS.length - 1,
                Math.floor(progress * PROJECTS.length)
            );

            setActiveIndex(nextIndex);
            setStagePhase(nextPhase);
        };

        updateActiveProject();
        window.addEventListener('scroll', updateActiveProject, { passive: true });
        window.addEventListener('resize', updateActiveProject);

        return () => {
            window.removeEventListener('scroll', updateActiveProject);
            window.removeEventListener('resize', updateActiveProject);
        };
    }, [PROJECTS.length]);

    const stagePosition = stagePhase === 'inside' ? 'fixed' : 'absolute';
    const usePortalStage = isLightTheme && stagePhase === 'inside';
    const stageElement = (
        <ProjectShowcaseStage
            activeProject={activeProject}
            activeIndex={activeIndex}
            projects={PROJECTS}
            scrollProgress={scrollProgress}
            stagePhase={stagePhase}
            stagePosition={stagePosition}
            usePortalStage={usePortalStage}
        />
    );

    return (
        <>
            <style>{injectStyles}</style>
            <div id="projects">

            {/* ───────── MOBILE: Simple vertical cards ───────── */}
            <div
                className="projects-mobile-section"
                style={{
                    display: 'none',
                    background: 'transparent',
                    padding: '68px 18px 88px',
                    fontFamily: "'Inter',sans-serif",
                }}
            >
                {/* Section header */}
                <div style={{ textAlign: 'center', marginBottom: 48 }}>
                    <p style={{
                        fontSize: 12, letterSpacing: '0.28em',
                        color: 'rgba(255,255,255,0.3)',
                        textTransform: 'uppercase', fontWeight: 500, marginBottom: 12,
                    }}>
                        AI/ML Systems Portfolio
                    </p>
                    <h2 style={{
                        fontSize: 'clamp(36px, 10.5vw, 62px)',
                        fontWeight: 900, letterSpacing: '-0.03em',
                        lineHeight: 1, margin: 0,
                    }}>
                        <span style={{ color: 'white' }}>PROJECT </span>
                        <span style={{
                            fontStyle: 'italic',
                            background: 'linear-gradient(90deg,#6366f1 0%,#a855f7 50%,#ec4899 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            fontFamily: "'Playfair Display',serif",
                        }}>SHOWCASE</span>
                    </h2>
                </div>

                {/* Project cards */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    {PROJECTS.map((project, i) => (
                        <motion.div
                            key={project.id}
                            className="mobile-project-card"
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-40px' }}
                            transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                        >
                            {/* Category + number */}
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
                                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 500 }}>
                                    {project.category}
                                </span>
                                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.22)', letterSpacing: '0.12em' }}>
                                    {String(i + 1).padStart(2, '0')} / {String(PROJECTS.length).padStart(2, '0')}
                                </span>
                            </div>

                            {/* Color line + title */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: 11, marginBottom: 14 }}>
                                <div style={{ width: 20, height: 3, background: project.color, borderRadius: 2, flexShrink: 0 }} />
                                <h3 style={{ fontSize: 25, fontWeight: 800, color: 'white', letterSpacing: '-0.02em', margin: 0 }}>
                                    {project.title}
                                </h3>
                            </div>

                            {/* Description */}
                            <p style={{ fontSize: 14.5, color: 'rgba(255,255,255,0.42)', lineHeight: 1.75, marginBottom: 20 }}>
                                {project.description}
                            </p>

                            {/* Features */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginBottom: 20 }}>
                                {project.features.map((feat, fi) => (
                                    <div key={fi} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                                        <SparkIcon color={project.color} />
                                        <span style={{ fontSize: 13.4, color: 'rgba(255,255,255,0.55)', lineHeight: 1.55 }}>{feat}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Tech pills */}
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                                {project.tech.map(({ label, icon }) => (
                                    <TechPill key={label} icon={icon} label={label} />
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* ───────── STICKY: one pinned viewport, projects change while scrolling ───────── */}
            <div
                ref={stickySectionRef}
                className="projects-sticky-section"
                style={{
                    display: 'block',
                    position: 'relative',
                    fontFamily: "'Inter',sans-serif",
                    background: 'transparent',
                    height: `${PROJECTS.length * 105}vh`,
                }}
            >
                    {!usePortalStage && stageElement}
            </div>
            {usePortalStage ? createPortal(stageElement, document.body) : null}
            </div>
        </>
    );
}
