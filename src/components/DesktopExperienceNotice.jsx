import { useState } from 'react';

const NOTICE_KEY = 'faizan-desktop-notice-dismissed';

const styles = `
  .desktop-experience-notice {
    display: none;
  }

  @media (max-width: 820px) {
    .desktop-experience-notice {
      position: fixed;
      inset: 0;
      z-index: 2147483645;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      padding: calc(env(safe-area-inset-top, 0px) + 78px) 18px 0;
      background: linear-gradient(to bottom, rgba(0,0,0,0.74), rgba(0,0,0,0.24) 48%, transparent);
      pointer-events: none;
    }

    .desktop-experience-panel {
      width: min(100%, 360px);
      border-radius: 18px;
      border: 1px solid rgba(255,255,255,0.12);
      background: rgba(8,8,8,0.92);
      box-shadow: 0 28px 90px rgba(0,0,0,0.62), 0 0 55px rgba(255,36,36,0.12);
      padding: 18px 18px 16px;
      color: white;
      font-family: 'Inter', sans-serif;
      text-align: center;
      pointer-events: auto;
    }

    .desktop-experience-mark {
      width: 38px;
      height: 38px;
      margin: 0 auto 12px;
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ff4a4a;
      background: rgba(255,36,36,0.1);
      border: 1px solid rgba(255,36,36,0.18);
      box-shadow: 0 0 28px rgba(255,36,36,0.16);
    }

    .desktop-experience-title {
      margin: 0 0 9px;
      font-size: 18px;
      line-height: 1.22;
      font-weight: 850;
      letter-spacing: -0.02em;
    }

    .desktop-experience-copy {
      margin: 0;
      color: rgba(255,255,255,0.58);
      font-size: 13px;
      line-height: 1.55;
    }

    .desktop-experience-button {
      margin-top: 16px;
      width: 100%;
      border: 0;
      border-radius: 999px;
      padding: 13px 18px;
      background: white;
      color: #050505;
      font-weight: 800;
      cursor: pointer;
      font-family: 'Inter', sans-serif;
    }
  }
`;

function shouldShowNotice() {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(max-width: 820px)').matches
        && window.sessionStorage.getItem(NOTICE_KEY) !== '1';
}

export default function DesktopExperienceNotice() {
    const [visible, setVisible] = useState(shouldShowNotice);

    if (!visible) return null;

    const dismiss = () => {
        window.sessionStorage.setItem(NOTICE_KEY, '1');
        setVisible(false);
    };

    return (
        <>
            <style>{styles}</style>
            <div className="desktop-experience-notice" role="dialog" aria-modal="true" aria-labelledby="desktop-experience-title">
                <div className="desktop-experience-panel">
                    <div className="desktop-experience-mark" aria-hidden="true">
                        <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="4" width="18" height="12" rx="2" />
                            <path d="M8 20h8" />
                            <path d="M12 16v4" />
                        </svg>
                    </div>
                    <h2 id="desktop-experience-title" className="desktop-experience-title">
                        Open on desktop for the best experience
                    </h2>
                    <p className="desktop-experience-copy">
                        This portfolio has interactive project previews, motion, and AI tools that feel better on a larger screen.
                    </p>
                    <button className="desktop-experience-button" type="button" onClick={dismiss}>
                        Continue anyway
                    </button>
                </div>
            </div>
        </>
    );
}
