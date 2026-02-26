import * as React from 'react';

export function GravityStarsBackground({
    starsCount = 130,
    starsSize = 2.5,
    starsOpacity = 0.8,
    glowIntensity = 25,
    glowAnimation = 'ease',
    movementSpeed = 0.8,
    mouseInfluence = 250,
    mouseGravity = 'attract',
    gravityStrength = 180,
    starsInteraction = true,
    className,
    style,
    ...props
}) {
    const containerRef = React.useRef(null);
    const canvasRef = React.useRef(null);
    const animRef = React.useRef(null);
    const starsRef = React.useRef([]);
    const mouseRef = React.useRef({ x: -2000, y: -2000 });
    const [dpr, setDpr] = React.useState(1);
    const [canvasSize, setCanvasSize] = React.useState({ width: 0, height: 0 });
    const [starColor, setStarColor] = React.useState('#ffffff');

    React.useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const updateColor = () => {
            const cs = getComputedStyle(el);
            const color = cs.color;
            if (color) {
                setStarColor((color === 'rgb(0, 0, 0)' || color === 'rgba(0, 0, 0, 0)') ? '#ffffff' : color);
            }
        };

        // Initial read
        updateColor();

        // Efficiently track color changes even if they happen via direct DOM manipulation
        const observer = new MutationObserver(updateColor);
        observer.observe(el, { attributes: true, attributeFilter: ['style', 'class'] });

        return () => observer.disconnect();
    }, []);
    const initStars = React.useCallback(
        (w, h) => {
            if (w === 0 || h === 0) return;
            starsRef.current = Array.from({ length: starsCount }).map(() => {
                const angle = Math.random() * Math.PI * 2;
                const speed = movementSpeed * (0.5 + Math.random() * 1.5);
                return {
                    x: Math.random() * w,
                    y: Math.random() * h,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed,
                    size: Math.random() * starsSize + 1.2,
                    opacity: starsOpacity,
                    baseOpacity: starsOpacity,
                    glowMultiplier: 1,
                };
            });
        },
        [starsCount, movementSpeed, starsOpacity, starsSize],
    );

    const resizeCanvas = React.useCallback(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;
        const rect = container.getBoundingClientRect();
        const nextDpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));
        setDpr(nextDpr);
        canvas.width = Math.max(1, Math.floor(rect.width * nextDpr));
        canvas.height = Math.max(1, Math.floor(rect.height * nextDpr));
        setCanvasSize({ width: rect.width, height: rect.height });
        if (starsRef.current.length === 0) {
            initStars(rect.width, rect.height);
        }
    }, [initStars]);

    // Optimization: Low-frequency mouse updates
    React.useEffect(() => {
        const handleGlobalMouseMove = (e) => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            const rect = canvas.getBoundingClientRect();
            mouseRef.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            };
        };

        window.addEventListener('mousemove', handleGlobalMouseMove, { passive: true });
        window.addEventListener('touchmove', (e) => {
            if (e.touches[0]) {
                const rect = canvasRef.current?.getBoundingClientRect();
                if (rect) {
                    mouseRef.current = { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
                }
            }
        }, { passive: true });

        return () => window.removeEventListener('mousemove', handleGlobalMouseMove);
    }, []);

    const updateStars = React.useCallback(() => {
        const { width: w, height: h } = canvasSize;
        if (w === 0 || h === 0) return;
        const mouse = mouseRef.current;

        for (let i = 0; i < starsRef.current.length; i++) {
            const p = starsRef.current[i];
            const dx = mouse.x - p.x;
            const dy = mouse.y - p.y;
            const distSq = dx * dx + dy * dy;
            const influenceSq = mouseInfluence * mouseInfluence;

            if (distSq < influenceSq && distSq > 0) {
                const dist = Math.sqrt(distSq);
                const force = (mouseInfluence - dist) / mouseInfluence;
                const nx = dx / dist;
                const ny = dy / dist;
                const g = force * (gravityStrength * 0.003);

                if (mouseGravity === 'attract') {
                    p.vx += nx * g;
                    p.vy += ny * g;
                } else {
                    p.vx -= nx * g;
                    p.vy -= ny * g;
                }
                p.glowMultiplier = 1 + force * 1.5;
            } else {
                p.glowMultiplier = Math.max(1, p.glowMultiplier * 0.95);
            }

            p.x += p.vx;
            p.y += p.vy;
            p.vx *= 0.99;
            p.vy *= 0.99;

            if (p.x < 0) p.x = w;
            if (p.x > w) p.x = 0;
            if (p.y < 0) p.y = h;
            if (p.y > h) p.y = 0;
        }
    }, [canvasSize, mouseInfluence, mouseGravity, gravityStrength]);

    const drawStars = React.useCallback(
        (ctx) => {
            const { width: w, height: h } = canvasSize;
            if (w === 0 || h === 0) return;
            ctx.clearRect(0, 0, w * dpr, h * dpr);

            ctx.fillStyle = starColor;
            for (const p of starsRef.current) {
                const opacity = p.baseOpacity * (0.8 + p.glowMultiplier * 0.2);
                ctx.globalAlpha = Math.min(1, opacity);

                // Draw simple core
                ctx.beginPath();
                ctx.arc(p.x * dpr, p.y * dpr, p.size * dpr, 0, Math.PI * 2);
                ctx.fill();

                // Advanced optimization: Only draw shadow for very active stars
                if (p.glowMultiplier > 1.2) {
                    ctx.save();
                    ctx.shadowColor = starColor;
                    ctx.shadowBlur = (glowIntensity * 0.5) * p.glowMultiplier;
                    ctx.beginPath();
                    ctx.arc(p.x * dpr, p.y * dpr, p.size * dpr, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.restore();
                }
            }
        },
        [dpr, canvasSize, starColor, glowIntensity],
    );

    const animate = React.useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d', { alpha: true });
        if (!ctx) return;
        updateStars();
        drawStars(ctx);
        animRef.current = requestAnimationFrame(animate);
    }, [updateStars, drawStars]);

    React.useEffect(() => {
        resizeCanvas();
        const container = containerRef.current;
        if (container && typeof ResizeObserver !== 'undefined') {
            const ro = new ResizeObserver(resizeCanvas);
            ro.observe(container);
            return () => ro.disconnect();
        }
        window.addEventListener('resize', resizeCanvas);
        return () => window.removeEventListener('resize', resizeCanvas);
    }, [resizeCanvas]);

    React.useEffect(() => {
        if (animRef.current) cancelAnimationFrame(animRef.current);
        animRef.current = requestAnimationFrame(animate);
        return () => {
            if (animRef.current) cancelAnimationFrame(animRef.current);
        };
    }, [animate]);

    return (
        <div
            ref={containerRef}
            className={className}
            style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                pointerEvents: 'none',
                ...style
            }}
            {...props}
        >
            <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
        </div>
    );
}
