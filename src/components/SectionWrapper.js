'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function SectionWrapper({ children, className = '', id = '' }) {
    const sectionRef = useRef(null);

    useGSAP(() => {
        gsap.fromTo(sectionRef.current,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} id={id} className={`section-padding ${className}`}>
            <div className="container">
                {children}
            </div>
        </section>
    );
}
