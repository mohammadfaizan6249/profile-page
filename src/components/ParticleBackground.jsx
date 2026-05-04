import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const DOT_SIZE = 1.5;
const SPACING = 45;
const LIGHT_RADIUS = 150;
const WAVE_RADIUS = 280;
const PUSH = 3;
const FRICTION = 0.84;
const RETURN = 0.08;
const TAU = Math.PI * 2;
const ACCENT = [229, 57, 53];

export default function ParticleBackground() {
    const canvasRef = useRef(null);
    const particlesRef = useRef([]);
    const mouseRef = useRef({ x: -9999, y: -9999 });
    const frameRef = useRef(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return undefined;
        const ctx = canvas.getContext('2d');
        let width = 0;
        let height = 0;
        let dpr = 1;

        const buildGrid = () => {
            const cols = Math.ceil(width / SPACING) + 1;
            const rows = Math.ceil(height / SPACING) + 1;
            const particles = [];

            for (let row = 0; row < rows; row += 1) {
                for (let col = 0; col < cols; col += 1) {
                    const x = col * SPACING;
                    const y = row * SPACING;
                    const baseOpacity = 0.15 + Math.random() * 0.1;
                    particles.push({
                        x,
                        y,
                        baseX: x,
                        baseY: y,
                        vx: 0,
                        vy: 0,
                        opacity: baseOpacity,
                        baseOpacity,
                    });
                }
            }

            particlesRef.current = particles;
        };

        const resize = () => {
            dpr = Math.min(window.devicePixelRatio || 1, 2);
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = Math.floor(width * dpr);
            canvas.height = Math.floor(height * dpr);
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            buildGrid();
        };

        const updateMouse = (event) => {
            mouseRef.current.x = event.clientX;
            mouseRef.current.y = event.clientY;
        };

        const clearMouse = () => {
            mouseRef.current.x = -9999;
            mouseRef.current.y = -9999;
        };

        const draw = () => {
            const particles = particlesRef.current;
            const { x: mx, y: my } = mouseRef.current;
            const isLightTheme = document.documentElement.dataset.theme === 'light';
            const lightRadius2 = LIGHT_RADIUS * LIGHT_RADIUS;
            const waveRadius2 = WAVE_RADIUS * WAVE_RADIUS;

            ctx.clearRect(0, 0, width, height);

            for (const point of particles) {
                const dx = point.x - mx;
                const dy = point.y - my;
                const d2 = dx * dx + dy * dy;

                if (d2 < waveRadius2 && d2 > 0) {
                    const dist = Math.sqrt(d2);
                    const force = 1 - dist / WAVE_RADIUS;
                    point.vx += (dx / dist) * PUSH * force * force;
                    point.vy += (dy / dist) * PUSH * force * force;
                }

                point.vx = point.vx * FRICTION + (point.baseX - point.x) * RETURN;
                point.vy = point.vy * FRICTION + (point.baseY - point.y) * RETURN;
                point.x += point.vx;
                point.y += point.vy;

                if (d2 < lightRadius2) {
                    const glow = 1 - Math.sqrt(d2) / LIGHT_RADIUS;
                    point.opacity = point.baseOpacity + glow * 0.7;
                } else {
                    point.opacity += (point.baseOpacity - point.opacity) * 0.06;
                }
            }

            ctx.beginPath();
            for (const point of particles) {
                const dx = point.x - mx;
                const dy = point.y - my;
                if (dx * dx + dy * dy >= lightRadius2) {
                    ctx.moveTo(point.x + DOT_SIZE, point.y);
                    ctx.arc(point.x, point.y, DOT_SIZE, 0, TAU);
                }
            }
            ctx.fillStyle = isLightTheme ? 'rgba(20,20,20,0.24)' : 'rgba(240,240,240,0.22)';
            ctx.fill();

            for (const point of particles) {
                const dx = point.x - mx;
                const dy = point.y - my;
                const d2 = dx * dx + dy * dy;

                if (d2 < lightRadius2) {
                    const t = 1 - Math.sqrt(d2) / LIGHT_RADIUS;
                    const base = isLightTheme ? 20 : 240;
                    const r = Math.round(base + (ACCENT[0] - base) * t);
                    const g = Math.round(base + (ACCENT[1] - base) * t);
                    const b = Math.round(base + (ACCENT[2] - base) * t);
                    ctx.beginPath();
                    ctx.arc(point.x, point.y, DOT_SIZE, 0, TAU);
                    ctx.fillStyle = `rgba(${r},${g},${b},${Math.min(1, point.opacity)})`;
                    ctx.fill();
                }
            }

            if (mx > 0) {
                const gradient = ctx.createRadialGradient(mx, my, 0, mx, my, LIGHT_RADIUS);
                gradient.addColorStop(0, isLightTheme ? 'rgba(229,57,53,0.1)' : 'rgba(229,57,53,0.07)');
                gradient.addColorStop(0.5, isLightTheme ? 'rgba(229,57,53,0.035)' : 'rgba(229,57,53,0.02)');
                gradient.addColorStop(1, 'rgba(229,57,53,0)');
                ctx.beginPath();
                ctx.arc(mx, my, LIGHT_RADIUS, 0, TAU);
                ctx.fillStyle = gradient;
                ctx.fill();
            }

            frameRef.current = requestAnimationFrame(draw);
        };

        resize();
        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', updateMouse);
        window.addEventListener('mouseleave', clearMouse);
        frameRef.current = requestAnimationFrame(draw);

        return () => {
            cancelAnimationFrame(frameRef.current);
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', updateMouse);
            window.removeEventListener('mouseleave', clearMouse);
        };
    }, []);

    const canvas = (
        <canvas
            ref={canvasRef}
            className="particle-background-canvas"
            aria-hidden="true"
            style={{
                position: 'fixed',
                inset: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 0,
            }}
        />
    );

    if (typeof document === 'undefined') return null;
    return createPortal(canvas, document.body);
}
