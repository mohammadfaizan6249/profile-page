import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';

/* ─── Social platform data ───────────────────────────────────── */
const LINKS = [
    {
        id: 'linkedin',
        name: 'LinkedIn',
        description: 'Connect with me professionally and view my AI/ML career profile.',
        url: 'https://www.linkedin.com/in/link-mohammad-faizan',
        accent: '#60a5fa',
        icon: (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.35 8.25h4.3V23H.35V8.25ZM8.2 8.25h4.12v2.02h.06c.57-1.08 1.98-2.22 4.08-2.22 4.36 0 5.17 2.87 5.17 6.6V23h-4.3v-7.4c0-1.77-.03-4.04-2.46-4.04-2.47 0-2.85 1.93-2.85 3.91V23H8.2V8.25Z" />
            </svg>
        ),
    },
    {
        id: 'github',
        name: 'GitHub',
        description: 'View my AI, ML, analytics, and full-stack project repositories.',
        url: 'https://github.com/mohammadfaizan6249',
        accent: '#e6edf3',
        icon: (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
            </svg>
        ),
    },
    {
        id: 'instagram',
        name: 'Instagram',
        description: 'Follow my personal updates and behind-the-scenes work.',
        url: 'https://www.instagram.com/mohdd.faizan',
        accent: '#f472b6',
        icon: (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
        ),
    },
    {
        id: 'email',
        name: 'Email',
        description: 'Reach out directly for collaborations, projects, or just a hello.',
        url: 'mailto:email.mdfaizan@gmail.com',
        accent: '#fb923c',
        icon: (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
        ),
    },
    {
        id: 'resume',
        name: 'Resume',
        description: 'View or download my latest AI/ML and data science resume.',
        url: '/resume.pdf',
        accent: '#4ade80',
        icon: (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <path d="M12 18v-6" />
                <path d="m9 15 3 3 3-3" />
            </svg>
        ),
    },
];

/* ─── Framer Motion variants ─────────────────────────────────── */
const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (d = 0) => ({
        opacity: 1, y: 0,
        transition: { duration: 0.65, delay: d * 0.1, ease: [0.22, 1, 0.36, 1] },
    }),
};

/* Cinematic per-line reveal: blur + scale + y + opacity */
const WORD_META = [
    { word: 'MY', delay: 0, color: 'rgba(255,255,255,0.95)' },
    { word: 'DIGITAL', delay: 0.15, color: 'rgba(255,255,255,0.60)' },
    { word: 'PRESENCE', delay: 0.30, color: 'rgba(255,255,255,0.25)' },
];

const heroWord = {
    hidden: {
        opacity: 0,
        y: 40,
        scale: 0.96,
        filter: 'blur(10px)',
    },
    visible: (delay) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
        transition: {
            duration: 0.7,
            delay,
            ease: 'easeOut',
        },
    }),
};

const cardVariant = {
    hidden: { opacity: 0, y: 22 },
    visible: (i) => ({
        opacity: 1, y: 0,
        transition: { duration: 0.45, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
    }),
};

/* ─── SocialCard ─────────────────────────────────────────────── */
function SocialCard({ link, index }) {
    return (
        <motion.a
            href={link.url}
            onClick={(event) => {
                event.preventDefault();
                window.location.href = link.url;
            }}
            aria-label={`Open ${link.name}`}
            custom={index}
            variants={cardVariant}
            initial="hidden"
            animate="visible"
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 20,
                background: '#0a0a0a',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 18,
                padding: '24px 28px',
                textDecoration: 'none',
                transition: 'transform 0.3s cubic-bezier(0.22,1,0.36,1), border-color 0.3s ease, box-shadow 0.3s ease, background 0.25s ease',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
                e.currentTarget.style.boxShadow = `0 20px 55px rgba(0,0,0,0.55)`;
                e.currentTarget.style.background = '#111';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.background = '#0a0a0a';
            }}
        >
            {/* Subtle top-edge glint */}
            <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 1,
                background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.1),transparent)',
                pointerEvents: 'none',
            }} />

            {/* Left — icon + text */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, minWidth: 0 }}>
                {/* Icon container */}
                <div style={{
                    width: 52, height: 52, borderRadius: 14, flexShrink: 0,
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: link.accent,
                }}>
                    {link.icon}
                </div>

                {/* Text */}
                <div style={{ minWidth: 0 }}>
                    <div style={{
                        fontSize: 16, fontWeight: 700,
                        color: 'rgba(255,255,255,0.92)',
                        letterSpacing: '-0.02em',
                        marginBottom: 4,
                        fontFamily: "'Inter', sans-serif",
                    }}>
                        {link.name}
                    </div>
                    <div style={{
                        fontSize: 13, lineHeight: 1.55,
                        color: 'rgba(255,255,255,0.35)',
                        fontFamily: "'Inter', sans-serif",
                    }}>
                        {link.description}
                    </div>
                </div>
            </div>

            {/* Right — arrow */}
            <div style={{
                flexShrink: 0,
                width: 36, height: 36, borderRadius: '50%',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'rgba(255,255,255,0.35)',
                fontSize: 16,
            }}>
                ↗
            </div>
        </motion.a>
    );
}

/* ─── Links Page ─────────────────────────────────────────────── */
export default function Links() {
    useEffect(() => {
        document.title = 'Links | Mohammad Faizan';
    }, []);

    return (
        <main style={{
            background: 'transparent', minHeight: '100vh',
            fontFamily: "'Inter', sans-serif",
            overflow: 'hidden',
        }}>

            {/* ────────────────────────────────────────────────────
                HERO — Two-column: typography left, portrait right
            ──────────────────────────────────────────────────── */}
            <section style={{
                position: 'relative',
                minHeight: '82vh',
                display: 'flex',
                alignItems: 'center',
                padding: 'clamp(100px,14vh,160px) clamp(24px,6vw,100px) clamp(60px,8vh,100px)',
                boxSizing: 'border-box',
                overflow: 'hidden',
            }}>

                {/* Background radial glow */}
                <div aria-hidden="true" style={{
                    position: 'absolute', inset: 0, pointerEvents: 'none',
                    background: [
                        'radial-gradient(ellipse 70% 55% at 30% 50%, rgba(255,255,255,0.025) 0%, transparent 65%)',
                        'radial-gradient(ellipse 40% 60% at 70% 40%, rgba(255,255,255,0.012) 0%, transparent 70%)',
                    ].join(','),
                }} />

                {/* Hard vignette */}
                <div aria-hidden="true" style={{
                    position: 'absolute', inset: 0, pointerEvents: 'none',
                    background: 'radial-gradient(ellipse 90% 90% at 50% 50%, transparent 50%, rgba(0,0,0,0.42) 100%)',
                }} />

                <div style={{
                    position: 'relative', zIndex: 1,
                    width: '100%', maxWidth: 1200, margin: '0 auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 'clamp(40px, 6vw, 100px)',
                    flexWrap: 'wrap',
                }}>

                    {/* LEFT — Text */}
                    <div style={{ flex: '1 1 340px', minWidth: 0 }}>

                        {/* Small label */}
                        <motion.p
                            custom={0} variants={fadeUp} initial="hidden" animate="visible"
                            style={{
                                fontSize: 11, fontWeight: 500,
                                letterSpacing: '0.28em', textTransform: 'uppercase',
                                color: 'rgba(255,255,255,0.28)',
                                margin: '0 0 28px 0',
                            }}
                        >
                            Connect · Follow · Chat
                        </motion.p>

                        {/* Big stacked title — cinematic line-by-line reveal */}
                        <div>
                            {WORD_META.map(({ word, delay, color }) => (
                                <motion.div
                                    key={word}
                                    custom={delay}
                                    variants={heroWord}
                                    initial="hidden"
                                    animate="visible"
                                    style={{
                                        display: 'block',
                                        fontSize: 'clamp(4.5rem, 10vw, 10rem)',
                                        fontWeight: 900,
                                        lineHeight: 0.95,
                                        letterSpacing: '-0.04em',
                                        color,
                                        userSelect: 'none',
                                        /* Subtle glow once fully visible */
                                        textShadow: '0 0 40px rgba(255,255,255,0.08)',
                                        willChange: 'transform, opacity, filter',
                                    }}
                                >
                                    {word}
                                </motion.div>
                            ))}
                        </div>

                        <motion.p
                            custom={4} variants={fadeUp} initial="hidden" animate="visible"
                            style={{
                                marginTop: 36,
                                fontSize: 14, lineHeight: 1.75,
                                color: 'rgba(255,255,255,0.3)',
                                maxWidth: 380,
                            }}
                        >
                            All the places you can find me across the internet — code, conversations, and everything in between.
                        </motion.p>
                    </div>

                    {/* RIGHT — Profile image */}
                    <motion.div
                        custom={2} variants={fadeUp} initial="hidden" animate="visible"
                        style={{ flex: '0 0 auto' }}
                    >
                        <motion.div
                            whileHover={{ scale: 1.04 }}
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            style={{
                                width: 'clamp(200px, 22vw, 320px)',
                                height: 'clamp(200px, 22vw, 320px)',
                                borderRadius: '50%',
                                overflow: 'hidden',
                                border: '1px solid rgba(255,255,255,0.1)',
                                position: 'relative',
                                cursor: 'default',
                                boxShadow: '0 0 0 1px rgba(255,255,255,0.04), 0 32px 80px rgba(0,0,0,0.6)',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.boxShadow =
                                    '0 0 0 2px rgba(255,255,255,0.14), 0 32px 80px rgba(0,0,0,0.7)';
                                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.22)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.boxShadow =
                                    '0 0 0 1px rgba(255,255,255,0.04), 0 32px 80px rgba(0,0,0,0.6)';
                                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                            }}
                        >
                            <img
                                src="/cropped_circle_image.webp?v=20260504"
                                alt="Mohammad Faizan"
                                style={{
                                    width: '100%', height: '100%',
                                    objectFit: 'cover',
                                    display: 'block',
                                }}
                            />
                        </motion.div>
                    </motion.div>

                </div>
            </section>

            {/* ────────────────────────────────────────────────────
                LINKS GRID
            ──────────────────────────────────────────────────── */}
            <section style={{
                maxWidth: 1000,
                margin: '0 auto',
                padding: '0 clamp(24px,6vw,60px) 120px',
            }}>

                {/* Section label */}
                <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                        fontSize: 11, fontWeight: 500,
                        letterSpacing: '0.26em', textTransform: 'uppercase',
                        color: 'rgba(255,255,255,0.22)',
                        margin: '0 0 28px 0',
                    }}
                >
                    {LINKS.length} links
                </motion.p>

                {/* Responsive 2-column grid */}
                <style>{`
                    .links-grid {
                        display: grid;
                        grid-template-columns: repeat(2, 1fr);
                        gap: 14px;
                    }
                    @media (max-width: 640px) {
                        .links-grid { grid-template-columns: 1fr; }
                    }
                    @media (max-width: 480px) {
                        .links-card { padding: 18px 20px !important; }
                    }
                `}</style>

                <div className="links-grid">
                    {LINKS.map((link, i) => (
                        <SocialCard key={link.id} link={link} index={i} />
                    ))}
                </div>

            </section>

            <Footer />
        </main>
    );
}
