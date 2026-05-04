import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const styles = `
  @media (pointer: fine) {
    html,
    body,
    button,
    a,
    [role="button"],
    input,
    textarea,
    select {
      cursor: none !important;
    }

    .red-cursor {
      position: fixed;
      left: 0;
      top: 0;
      width: 92px;
      height: 92px;
      margin-left: -46px;
      margin-top: -46px;
      pointer-events: none;
      z-index: 2147483647;
      opacity: 0;
      transform: translate3d(-120px, -120px, 0) scale(1);
      transition: opacity 0.18s ease, scale 0.18s ease;
      will-change: transform, opacity;
      mix-blend-mode: screen;
    }

    .red-cursor.is-visible {
      opacity: 1;
    }

    .red-cursor-halo {
      position: absolute;
      inset: 0;
      border-radius: 50%;
      background:
        radial-gradient(circle, rgba(255,42,42,0.18) 0%, rgba(255,42,42,0.08) 38%, rgba(255,42,42,0) 72%),
        radial-gradient(circle, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 42%);
      filter: blur(2px);
    }

    .red-cursor-ring,
    .red-cursor-ring-soft {
      position: absolute;
      border-radius: 50%;
      border: 1px solid rgba(255,60,60,0.46);
      box-shadow:
        0 0 18px rgba(255,42,42,0.22),
        inset 0 0 14px rgba(255,42,42,0.08);
    }

    .red-cursor-ring {
      inset: 20px;
      animation: redCursorPulse 1.7s ease-in-out infinite;
    }

    .red-cursor-ring-soft {
      inset: 31px;
      border-color: rgba(255,255,255,0.25);
      box-shadow:
        0 0 16px rgba(255,42,42,0.18),
        inset 0 0 12px rgba(255,255,255,0.06);
      animation: redCursorPulseSmall 1.7s ease-in-out infinite;
    }

    .red-cursor-core {
      position: absolute;
      left: 50%;
      top: 50%;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      transform: translate(-50%, -50%);
      background: #ff2424;
      box-shadow:
        0 0 10px rgba(255,32,32,0.95),
        0 0 26px rgba(255,32,32,0.75),
        0 0 54px rgba(255,32,32,0.32);
    }

    .red-cursor-shine {
      position: absolute;
      left: 33px;
      top: 29px;
      width: 20px;
      height: 7px;
      border-radius: 999px;
      background: linear-gradient(90deg, rgba(255,255,255,0.56), rgba(255,255,255,0));
      filter: blur(1px);
      transform: rotate(-24deg);
      opacity: 0.62;
    }

    .red-cursor-trail {
      position: fixed;
      left: 0;
      top: 0;
      width: 8px;
      height: 8px;
      margin-left: -4px;
      margin-top: -4px;
      border-radius: 50%;
      pointer-events: none;
      z-index: 2147483646;
      background: rgba(255,42,42,0.75);
      box-shadow: 0 0 16px rgba(255,42,42,0.55);
      mix-blend-mode: screen;
      will-change: transform, opacity;
    }

    html[data-theme="light"] .red-cursor {
      mix-blend-mode: multiply;
    }

    html[data-theme="light"] .red-cursor-halo {
      background:
        radial-gradient(circle, rgba(118,0,0,0.2) 0%, rgba(150,0,0,0.09) 38%, rgba(150,0,0,0) 72%),
        radial-gradient(circle, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0) 42%);
    }

    html[data-theme="light"] .red-cursor-ring,
    html[data-theme="light"] .red-cursor-ring-soft {
      border-color: rgba(120,0,0,0.58);
      box-shadow:
        0 0 18px rgba(150,0,0,0.2),
        inset 0 0 14px rgba(120,0,0,0.1);
    }

    html[data-theme="light"] .red-cursor-ring-soft {
      border-color: rgba(70,0,0,0.28);
    }

    html[data-theme="light"] .red-cursor-core {
      background: #8f0000;
      box-shadow:
        0 0 10px rgba(120,0,0,0.78),
        0 0 24px rgba(150,0,0,0.46),
        0 0 46px rgba(120,0,0,0.22);
    }

    html[data-theme="light"] .red-cursor-shine {
      background: linear-gradient(90deg, rgba(255,255,255,0.38), rgba(255,255,255,0));
      opacity: 0.42;
    }

    html[data-theme="light"] .red-cursor-trail {
      background: rgba(130,0,0,0.7);
      box-shadow: 0 0 14px rgba(130,0,0,0.38);
      mix-blend-mode: multiply;
    }
  }

  @keyframes redCursorPulse {
    0%, 100% { transform: scale(0.94); opacity: 0.46; }
    50% { transform: scale(1.08); opacity: 0.84; }
  }

  @keyframes redCursorPulseSmall {
    0%, 100% { transform: scale(1.08); opacity: 0.32; }
    50% { transform: scale(0.92); opacity: 0.62; }
  }
`;

const TRAIL_COUNT = 14;

export default function RedCursor() {
    const cursorRef = useRef(null);
    const trailsRef = useRef([]);
    const mouseRef = useRef({ x: -120, y: -120 });
    const cursorPosRef = useRef({ x: -120, y: -120 });
    const trailPosRef = useRef(
        Array.from({ length: TRAIL_COUNT }, () => ({ x: -120, y: -120 }))
    );
    const frameRef = useRef(0);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (!window.matchMedia('(pointer: fine)').matches) return undefined;

        const move = (event) => {
            mouseRef.current.x = event.clientX;
            mouseRef.current.y = event.clientY;
            setVisible(true);
        };

        const leave = () => setVisible(false);
        const enter = () => setVisible(true);

        const animate = () => {
            const target = mouseRef.current;
            const pos = cursorPosRef.current;
            pos.x += (target.x - pos.x) * 0.24;
            pos.y += (target.y - pos.y) * 0.24;

            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
            }

            let followX = pos.x;
            let followY = pos.y;
            trailPosRef.current.forEach((trail, index) => {
                const followStrength = Math.max(0.055, 0.2 - index * 0.008);
                trail.x += (followX - trail.x) * followStrength;
                trail.y += (followY - trail.y) * followStrength;
                followX = trail.x;
                followY = trail.y;

                const node = trailsRef.current[index];
                if (node) {
                    const opacity = visible ? Math.max(0, 0.5 - index * 0.032) : 0;
                    const scale = Math.max(0.22, 1 - index * 0.055);
                    node.style.opacity = opacity;
                    node.style.transform = `translate3d(${trail.x}px, ${trail.y}px, 0) scale(${scale})`;
                }
            });

            frameRef.current = requestAnimationFrame(animate);
        };

        window.addEventListener('mousemove', move, { passive: true });
        window.addEventListener('mouseenter', enter);
        window.addEventListener('mouseleave', leave);
        frameRef.current = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(frameRef.current);
            window.removeEventListener('mousemove', move);
            window.removeEventListener('mouseenter', enter);
            window.removeEventListener('mouseleave', leave);
        };
    }, [visible]);

    const cursor = (
        <>
            <style>{styles}</style>
            {Array.from({ length: TRAIL_COUNT }).map((_, index) => (
                <span
                    key={index}
                    ref={(node) => { trailsRef.current[index] = node; }}
                    className="red-cursor-trail"
                    aria-hidden="true"
                />
            ))}
            <div
                ref={cursorRef}
                className={`red-cursor${visible ? ' is-visible' : ''}`}
                aria-hidden="true"
            >
                <div className="red-cursor-halo" />
                <div className="red-cursor-ring" />
                <div className="red-cursor-ring-soft" />
                <div className="red-cursor-shine" />
                <div className="red-cursor-core" />
            </div>
        </>
    );

    if (typeof document === 'undefined') return null;
    return createPortal(cursor, document.body);
}
