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
      width: 58px;
      height: 58px;
      margin-left: -29px;
      margin-top: -29px;
      pointer-events: none;
      z-index: 2147483647;
      opacity: 0;
      transform: translate3d(-120px, -120px, 0) rotate(0deg);
      transition: opacity 0.18s ease, scale 0.18s ease;
      will-change: transform, opacity;
      mix-blend-mode: screen;
    }

    .red-cursor.is-visible {
      opacity: 1;
    }

    .red-cursor-halo {
      position: absolute;
      inset: -13px;
      border-radius: 50%;
      background:
        radial-gradient(circle, rgba(255,42,42,0.22) 0%, rgba(255,42,42,0.08) 44%, rgba(255,42,42,0) 72%),
        radial-gradient(circle, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 42%);
      filter: blur(5px);
    }

    .red-cursor-head {
      position: absolute;
      left: 14px;
      top: 15px;
      width: 29px;
      height: 26px;
      border-radius: 46% 52% 52% 46%;
      background:
        radial-gradient(circle at 76% 31%, rgba(255,255,255,0.36) 0 2px, transparent 2.5px),
        radial-gradient(circle at 76% 69%, rgba(255,255,255,0.28) 0 2px, transparent 2.5px),
        linear-gradient(135deg, #ff4a4a 0%, #d30000 44%, #7d0000 100%);
      clip-path: polygon(100% 50%, 16% 5%, 29% 38%, 2% 50%, 29% 62%, 16% 95%);
      box-shadow:
        0 0 14px rgba(255,42,42,0.62),
        0 0 30px rgba(255,42,42,0.28),
        inset -7px 0 12px rgba(80,0,0,0.44),
        inset 5px 0 10px rgba(255,255,255,0.12);
    }

    .red-cursor-head::before {
      content: "";
      position: absolute;
      left: 8px;
      top: 4px;
      width: 15px;
      height: 17px;
      border-radius: 50%;
      border-left: 1px solid rgba(255,255,255,0.2);
      transform: rotate(18deg);
      opacity: 0.72;
    }

    .red-cursor-shine {
      position: absolute;
      left: 22px;
      top: 23px;
      width: 14px;
      height: 3px;
      border-radius: 999px;
      background: linear-gradient(90deg, rgba(255,255,255,0.56), rgba(255,255,255,0));
      filter: blur(1px);
      transform: rotate(-12deg);
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
        radial-gradient(circle, rgba(118,0,0,0.2) 0%, rgba(150,0,0,0.09) 44%, rgba(150,0,0,0) 72%),
        radial-gradient(circle, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0) 42%);
    }

    html[data-theme="light"] .red-cursor-head {
      background:
        radial-gradient(circle at 76% 31%, rgba(255,255,255,0.34) 0 2px, transparent 2.5px),
        radial-gradient(circle at 76% 69%, rgba(255,255,255,0.24) 0 2px, transparent 2.5px),
        linear-gradient(135deg, #a40000 0%, #850000 44%, #4e0000 100%);
      box-shadow:
        0 0 11px rgba(120,0,0,0.44),
        0 0 24px rgba(120,0,0,0.18),
        inset -7px 0 12px rgba(45,0,0,0.48),
        inset 5px 0 10px rgba(255,255,255,0.08);
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

`;

const TRAIL_COUNT = 14;

export default function RedCursor() {
    const cursorRef = useRef(null);
    const trailsRef = useRef([]);
    const mouseRef = useRef({ x: -120, y: -120 });
    const cursorPosRef = useRef({ x: -120, y: -120 });
    const angleRef = useRef(0);
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
            const prevX = pos.x;
            const prevY = pos.y;
            pos.x += (target.x - pos.x) * 0.24;
            pos.y += (target.y - pos.y) * 0.24;

            const dx = pos.x - prevX;
            const dy = pos.y - prevY;
            if (Math.hypot(dx, dy) > 0.18) {
                angleRef.current = Math.atan2(dy, dx) * (180 / Math.PI);
            }

            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) rotate(${angleRef.current}deg)`;
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
                <div className="red-cursor-head" />
                <div className="red-cursor-shine" />
            </div>
        </>
    );

    if (typeof document === 'undefined') return null;
    return createPortal(cursor, document.body);
}
