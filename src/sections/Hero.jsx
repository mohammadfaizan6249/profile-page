

/* ─── Injected styles (hero-only animations) ─────────────── */
const heroStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@900&family=Playfair+Display:ital@1&family=Inter:wght@300;400;500;600&display=swap');

  @keyframes nameFadeIn {
    0%   { opacity: 0; }
    100% { opacity: 1; }
  }
  @keyframes glassUp {
    0%   { opacity: 0; transform: translateY(48px); filter: blur(12px); }
    60%  { filter: blur(2px); }
    100% { opacity: 1; transform: translateY(0px); filter: blur(0px); }
  }
  @keyframes fadeUpSoft {
    0%   { opacity: 0; transform: translateY(24px); }
    100% { opacity: 1; transform: translateY(0); }
  }

  .name-anim        { animation: nameFadeIn  1.4s cubic-bezier(0.22,1,0.36,1) 0.1s  both; }
  .tagline-caps-anim { animation: glassUp      1.0s cubic-bezier(0.22,1,0.36,1) 0.7s  both; }
  .tagline-serif-anim{ animation: glassUp      1.0s cubic-bezier(0.22,1,0.36,1) 1.0s  both; }
  .bottom-anim       { animation: fadeUpSoft   0.8s ease-out                    1.4s  both; }
`;

/* ─── Hero section ────────────────────────────────────────── */
export default function Hero() {

    return (
        <>
            <style>{heroStyles}</style>

            <div
                id="hero"
                style={{
                    fontFamily: "'Inter', sans-serif",
                    width: '100%',
                    height: '100vh',
                    minHeight: '100vh',
                    background: 'transparent',
                    color: '#fff',
                    display: 'flex',
                    flexDirection: 'column',
                }}
                className="w-full h-screen flex flex-col"
            >
                {/* ── Mobile nav spacer — keeps hero content below the fixed hamburger bar ── */}
                <div className="sm:hidden" style={{ height: 64, flexShrink: 0 }} />

                {/* ── HERO CONTENT ── */}
                <div
                    className="flex-1 flex flex-col items-center justify-center"
                    style={{
                        marginTop: '-2rem',
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >

                    <h1 className="sr-only">
                        Mohammad Faizan — AI/ML Engineer &amp; Data Scientist
                    </h1>

                    <h1
                        className="name-anim text-white select-none leading-none"
                        style={{
                            fontFamily: "'Montserrat', sans-serif",
                            fontWeight: 900,
                            fontSize: 'clamp(64px, 15vw, 280px)',
                            letterSpacing: '-0.02em',
                            color: '#fff',
                            lineHeight: 1,
                        }}
                    >
                        FAIZAN
                    </h1>

                    <div
                        className="flex flex-col items-center mt-2 gap-2 px-4"
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: 8,
                            marginTop: 8,
                            paddingInline: 16,
                        }}
                    >
                        <p
                            className="tagline-caps-anim text-gray-400 uppercase text-center"
                            style={{ fontFamily: "'Inter', sans-serif", fontSize: 'clamp(9px, 2vw, 17px)', letterSpacing: '0.28em', fontWeight: 300, color: '#9ca3af', textTransform: 'uppercase', textAlign: 'center' }}
                        >
                            I BUILD AI AND ML SYSTEMS THAT
                        </p>
                        <p
                            className="tagline-serif-anim text-white text-center"
                            style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: 'clamp(22px, 4.2vw, 62px)', letterSpacing: '-0.01em', fontWeight: 400, color: '#fff', textAlign: 'center' }}
                        >
                            turn data into impact.
                        </p>
                    </div>
                </div>

                {/* ── BOTTOM CORNERS ── */}
                <div
                    className="bottom-anim w-full flex items-end justify-between px-6 sm:px-8 pb-10 sm:pb-12 shrink-0 z-10"
                    style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'flex-end',
                        justifyContent: 'space-between',
                        padding: '0 24px 40px',
                        flexShrink: 0,
                        boxSizing: 'border-box',
                        position: 'relative',
                        zIndex: 10,
                    }}
                >

                    {/* Left: location */}
                    <div className="flex flex-col gap-1 justify-center items-center">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(48,205,17,1)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                            <circle cx="12" cy="10" r="3" />
                        </svg>
                        <span className="text-white font-bold uppercase" style={{ fontSize: 'clamp(8px,2.5vw,11px)', letterSpacing: '0.18em' }}>Based In Tucson,</span>
                        <span className="text-gray-500 uppercase" style={{ fontSize: 'clamp(7px,2vw,10px)', letterSpacing: '0.18em' }}>Arizona</span>
                    </div>

                    {/* Right: stack */}
                    <div className="flex flex-col gap-1 justify-center items-center">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="12 2 2 7 12 12 22 7 12 2" />
                            <polyline points="2 17 12 22 22 17" />
                            <polyline points="2 12 12 17 22 12" />
                        </svg>
                        <span className="text-white font-bold uppercase" style={{ fontSize: 'clamp(8px,2.5vw,11px)', letterSpacing: '0.18em' }}>AI/ML Engineer,</span>
                        <span className="text-gray-500 uppercase" style={{ fontSize: 'clamp(7px,2vw,10px)', letterSpacing: '0.18em' }}>&amp; Data Scientist</span>
                    </div>
                </div>

            </div>
        </>
    );
}
