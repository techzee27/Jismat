'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import styles from './PageHeader.module.css';

export default function PageHeader({ title, subtitle, bgImage = '/images/hero-bg.png' }) {
    const containerRef = useRef(null);
    useGSAP(() => {
        const tl = gsap.timeline();
        tl.fromTo(`.${styles.title}`,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
        );
        if (subtitle) {
            tl.fromTo(`.${styles.subtitle}`,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
                "-=0.4"
            );
        }
    }, { scope: containerRef, dependencies: [title, subtitle] });

    return (
        <section ref={containerRef} className={styles.header} style={{ backgroundImage: `url(${bgImage})` }}>
            <div className={styles.overlay}></div>
            <div className={styles.content}>
                <h1 className={styles.title}>
                    {title}
                </h1>
                {subtitle && (
                    <p className={styles.subtitle}>
                        {subtitle}
                    </p>
                )}
            </div>
        </section>
    );
}
