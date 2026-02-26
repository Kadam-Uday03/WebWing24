import React, { useState, useEffect } from 'react';
import { GravityStarsBackground } from './GravityStarsBackground';

const Hero = () => {
    const COLORS_HSL = [160, 215, 300, 345];
    const sectionRef = React.useRef(null);
    const btnRef = React.useRef(null);

    useEffect(() => {
        let currentHue = COLORS_HSL[0];
        let colorIndex = 0;
        let animationId;

        const animate = () => {
            const targetHue = COLORS_HSL[colorIndex];
            currentHue = currentHue + (targetHue - currentHue) * 0.005; // Slightly faster transition

            if (Math.abs(currentHue - targetHue) < 1) {
                colorIndex = (colorIndex + 1) % COLORS_HSL.length;
            }

            if (sectionRef.current) {
                const colorStr = `hsla(${currentHue}, 100%, 54%, 0.2)`;
                const solidColor = `hsl(${currentHue}, 100%, 54%)`;

                // Directly update styles to avoid React re-renders
                sectionRef.current.style.backgroundImage = `radial-gradient(100% 100% at 50% 0%, ${colorStr} 0%, rgba(2, 6, 23, 0.9) 80%), url('assets/img/hero-bg.jpeg')`;

                if (btnRef.current) {
                    btnRef.current.style.borderColor = solidColor;
                    btnRef.current.style.boxShadow = `0px 4px 20px ${solidColor}`;
                }

                // Update stars color if needed by exposing a method or using a custom event
                // For now, let's just use a CSS variable for the stars to pick up
                sectionRef.current.style.color = solidColor;
            }

            animationId = requestAnimationFrame(animate);
        };

        animate();
        return () => cancelAnimationFrame(animationId);
    }, []);

    // Initial styles
    const initialSolidColor = `hsl(${COLORS_HSL[0]}, 100%, 54%)`;

    return (
        <section
            id="hero"
            ref={sectionRef}
            className="hero section aurora-hero"
            style={{
                position: 'relative',
                overflow: 'hidden',
                backgroundImage: `radial-gradient(100% 100% at 50% 0%, hsla(${COLORS_HSL[0]}, 100%, 54%, 0.2) 0%, rgba(2, 6, 23, 0.9) 80%), url('assets/img/hero-bg.jpeg')`,
                color: initialSolidColor
            }}
        >
            <div className="aurora-container" style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                <GravityStarsBackground
                    starsCount={80} // Reduced for performance
                    gravityStrength={100}
                />
            </div>
            <div className="container position-relative z-10 d-flex flex-column align-items-center text-center">
                <span className="beta-tag mb-1.5 inline-block rounded-full bg-slate-600/50 px-3 py-1.5 text-sm" data-aos="fade-up">
                    Modern Digital Solutions
                </span>
                <h1 className="hero-title max-w-3xl bg-gradient-to-br from-white to-gray-400 bg-clip-text text-center text-3xl font-medium leading-tight text-transparent sm:text-5xl sm:leading-tight md:text-7xl md:leading-tight" data-aos="fade-up" data-aos-delay="100">
                    Elevate Your Brand with <span style={{ color: '#fff', textShadow: '0 0 20px rgba(255,255,255,0.2)' }}>Webwing24</span>
                </h1>
                <p className="hero-description my-6 max-w-xl text-center text-base leading-relaxed md:text-lg md:leading-relaxed mx-auto text-white" data-aos="fade-up" data-aos-delay="200" style={{ color: '#fff' }}>
                    We craft high-performance websites, innovative mobile apps, and stunning digital designs tailored to scale your business.
                </p>
                <div className="d-flex justify-content-center mt-4" data-aos="fade-up" data-aos-delay="300">
                    <a
                        href="#contact"
                        ref={btnRef}
                        className="hero-btn group relative flex w-fit items-center gap-1.5 rounded-full bg-gray-950/10 px-4 py-2 text-gray-50 transition-colors hover:bg-gray-950/50"
                        style={{ border: `1px solid ${initialSolidColor}`, boxShadow: `0px 4px 20px ${initialSolidColor}` }}
                    >
                        Get Started Today
                        <i className="bi bi-arrow-right transition-transform group-hover:-rotate-45 group-active:-rotate-12"></i>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Hero;
