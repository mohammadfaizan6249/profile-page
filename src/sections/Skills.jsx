import { useRef } from 'react';
import { motion } from 'framer-motion';

/* ─── Skills Data ───────────────────────────────────────────── */
const SKILLS = [
    { name: 'Python', color: '#3776AB', sym: 'PY' },
    { name: 'Machine Learning', color: '#FF6F61', sym: 'ML' },
    { name: 'MLOps', color: '#38BDF8', sym: 'MO' },
    { name: 'FastAPI', color: '#009688', sym: 'API' },
    { name: 'React', color: '#61DAFB', sym: 'RE' },
    { name: 'TypeScript', color: '#3178C6', sym: 'TS' },
    { name: 'Pandas', color: '#EAB308', sym: 'PD' },
    { name: 'NumPy', color: '#4D77CF', sym: 'NP' },
    { name: 'Seaborn', color: '#60A5FA', sym: 'SB' },
    { name: 'Matplotlib', color: '#F97316', sym: 'MP' },
    { name: 'SQL', color: '#4479A1', sym: 'SQL' },
    { name: 'MySQL', color: '#4479A1', sym: 'MY' },
    { name: 'FAISS', color: '#A855F7', sym: 'FX' },
    { name: 'RAG', color: '#C084FC', sym: 'RG' },
    { name: 'LLM Agents', color: '#F472B6', sym: 'AI' },
    { name: 'Streamlit', color: '#FF4B4B', sym: 'ST' },
    { name: 'Tableau', color: '#60A5FA', sym: 'TB' },
    { name: 'Power BI', color: '#FACC15', sym: 'BI' },
    { name: 'Excel / CSV', color: '#22C55E', sym: 'XL' },
    { name: 'BeautifulSoup', color: '#10B981', sym: 'BS' },
    { name: 'TensorFlow', color: '#FF6F00', sym: 'TF' },
    { name: 'PyTorch', color: '#EE4C2C', sym: 'PT' },
    { name: 'Java', color: '#F97316', sym: 'JV' },
    { name: 'C', color: '#A8B9CC', sym: 'C' },
    { name: 'GitHub', color: '#e5e5e5', sym: 'GH' },
];



/* ─── Skill Pill ─────────────────────────────────────────────── */
function SkillPill({ skill, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -3, scale: 1.05 }}
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 9,
                padding: '11px 18px',
                borderRadius: 999,
                background: '#0f0f10',
                border: '1px solid rgba(255,255,255,0.08)',
                cursor: 'default',
                fontFamily: "'Inter',sans-serif",
                userSelect: 'none',
                transition: 'border-color 0.2s, box-shadow 0.2s',
                boxShadow: '0 0 0 0 transparent',
            }}
            onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.22)';
                e.currentTarget.style.boxShadow = `0 0 14px 2px ${skill.color}22`;
            }}
            onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                e.currentTarget.style.boxShadow = '0 0 0 0 transparent';
            }}
        >
            {/* Icon badge */}
            <span style={{
                width: 25, height: 25,
                borderRadius: 5,
                background: skill.color + '1a',
                border: `1px solid ${skill.color}33`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, fontWeight: 800,
                color: skill.color,
                flexShrink: 0,
                lineHeight: 1,
                letterSpacing: '-0.02em',
            }}>
                {skill.sym}
            </span>

            {/* Name */}
            <span style={{
                fontSize: 14.8, fontWeight: 500,
                color: 'rgba(255,255,255,0.8)',
                whiteSpace: 'nowrap',
                letterSpacing: '-0.01em',
            }}>
                {skill.name}
            </span>
        </motion.div>
    );
}

/* ─── Main Skills Section ────────────────────────────────────── */
export default function Skills() {
    const sectionRef = useRef(null);

    return (
        <section
            id="skills"
            ref={sectionRef}
            style={{
                background: 'rgba(0,0,0,0.14)',
                width: '100%',
                padding: 'clamp(56px, 8.5vw, 92px) 28px 72px',
                position: 'relative',
                overflow: 'hidden',
                fontFamily: "'Inter',sans-serif",
                borderTop: 'none',
                margin: 0,
            }}
        >
            {/* ── Section heading ── */}
            <div style={{ textAlign: 'center', position: 'relative', zIndex: 1, marginBottom: 62 }}>
                <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    style={{
                        fontSize: 12, letterSpacing: '0.26em',
                        textTransform: 'uppercase',
                        color: 'rgba(255,255,255,0.3)',
                        fontWeight: 500, marginBottom: 14,
                    }}
                >
                    My Skillset
                </motion.p>

                <motion.h2
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, delay: 0.08 }}
                    style={{
                        fontSize: 'clamp(42px, 6.4vw, 84px)',
                        fontWeight: 900,
                        letterSpacing: '-0.03em',
                        lineHeight: 1,
                        margin: 0,
                    }}
                >
                    <span style={{ color: 'white' }}>The Magic </span>
                    <span style={{
                        fontStyle: 'italic',
                        fontFamily: "'Playfair Display', serif",
                        background: 'linear-gradient(90deg, #ff3ea5 0%, #ff7a18 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}>
                        Behind
                    </span>
                </motion.h2>
            </div>

            {/* ── 3. Skills pill grid ── */}
            <motion.div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '12px 12px',
                    justifyContent: 'center',
                    maxWidth: 1000,
                    margin: '0 auto',
                    position: 'relative',
                    zIndex: 1,
                }}
            >
                {SKILLS.map((skill, i) => (
                    <SkillPill key={skill.name} skill={skill} index={i} />
                ))}
            </motion.div>
        </section>
    );
}
