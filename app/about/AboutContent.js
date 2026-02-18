'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import PageHeader from '../../components/PageHeader';
import SectionWrapper from '../../components/SectionWrapper';
import styles from './About.module.css';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function AboutPage() {
    const containerRef = useRef(null);

    useGSAP(() => {
        const triggers = [];

        // Image Section Animation
        triggers.push(
            gsap.fromTo(`.${styles.imageSection}`,
                { opacity: 0, x: -50 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: `.${styles.imageSection}`,
                        start: "top 80%",
                    }
                }
            )
        );

        // Text Section Animation
        triggers.push(
            gsap.fromTo(`.${styles.textSection}`,
                { opacity: 0, x: 50 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: `.${styles.textSection}`,
                        start: "top 80%",
                    }
                }
            )
        );

        return () => {
            triggers.forEach(t => t.kill());
        };

    }, { scope: containerRef });

    return (
        <main ref={containerRef}>
            <Navbar />
            <PageHeader title="Our Story" subtitle="A culinary journey from the heart of Yemen to your table." />

            <SectionWrapper>
                <div className={styles.container}>
                    <div className={styles.imageSection}>
                        <div className={styles.imageWrapper}>
                            <Image
                                src="/images/interior.png"
                                alt="Our Restaurant"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className={styles.imageDecor}></div>
                    </div>

                    <div className={styles.textSection}>
                        <h2 className="text-gold mb-6">Heritage & Passion</h2>
                        <h3 className="text-white text-3xl mb-6">More Than Just A Meal</h3>
                        <p className="text-muted mb-6">
                            GISMAT MANDI was born from a desire to share the authentic flavors of Yemeni cuisine with the world.
                            Gismat means "Destiny" or "Share" in Arabic, reflecting our belief that sharing a meal is a sacred bond.
                        </p>
                        <p className="text-muted mb-6">
                            Our journey began decades ago in the ancient city of Hadramout, where the art of Mandi – slow-cooking meat in underground clay ovens – was perfected.
                        </p>
                        <div className={styles.quote}>
                            "Food is not just sustenance, it is a story of our ancestors told through spices and fire."
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            <SectionWrapper className="bg-section">
                <div className="text-center mb-12">
                    <h2 className="text-gold">Our Philosophy</h2>
                </div>
                <div className={styles.philosophyGrid}>
                    <div className={styles.card}>
                        <h3 className="text-gold mb-4 text-2xl">Authenticity</h3>
                        <p className="text-muted">We refuse to compromise on tradition. Our spices are sourced directly from Yemen.</p>
                    </div>
                    <div className={styles.card}>
                        <h3 className="text-gold mb-4 text-2xl">Hospitality</h3>
                        <p className="text-muted">In our culture, a guest is a gift from God. We serve with warmth and generosity.</p>
                    </div>
                    <div className={styles.card}>
                        <h3 className="text-gold mb-4 text-2xl">Quality</h3>
                        <p className="text-muted">From the finest basmati rice to premium cuts of fresh local meat.</p>
                    </div>
                </div>
            </SectionWrapper>

            <Footer />
        </main>
    );
}
