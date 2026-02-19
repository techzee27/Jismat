'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import styles from './About.module.css';
import { Utensils, Flame, Heart, Clock, Award, Users } from 'lucide-react';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const VALUES = [
    { icon: Utensils, title: "Authenticity", text: "We refuse to compromise. Our spices are sourced directly from the finest markets in Yemen." },
    { icon: Heart, title: "Hospitality", text: "In our culture, a guest is a gift from God. We serve every meal with warmth and generosity." },
    { icon: Award, title: "Quality", text: "From the finest basmati rice to premium cuts of fresh local meat, we use only the best ingredients." },
];

export default function AboutPage() {
    const containerRef = useRef(null);
    const heroRef = useRef(null);
    const legacyRef = useRef(null);
    const processRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline();

        // Hero Animation
        tl.fromTo(".hero-title",
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
        ).fromTo(".hero-subtitle",
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8 },
            "-=0.5"
        );

        // Parallax Effect for Hero BG
        gsap.to(".hero-bg", {
            yPercent: 30,
            ease: "none",
            scrollTrigger: {
                trigger: heroRef.current,
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });

        // Legacy Section Reveal
        gsap.from(".legacy-image", {
            x: -50,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: legacyRef.current,
                start: "top 70%",
            }
        });

        gsap.from(".legacy-text", {
            x: 50,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: legacyRef.current,
                start: "top 70%",
            }
        });

        // Process Steps Stagger
        gsap.from(".process-card", {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            scrollTrigger: {
                trigger: processRef.current,
                start: "top 75%",
            }
        });

        // Value Cards Flip/Reveal
        gsap.from(".value-card", {
            scale: 0.8,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            scrollTrigger: {
                trigger: ".values-section",
                start: "top 80%",
            }
        });

    }, { scope: containerRef });

    return (
        <main ref={containerRef} className="bg-[#12141C] text-white overflow-hidden">
            <Navbar />

            {/* 1. Immersive Hero Section */}
            <section ref={heroRef} className={styles.heroSection}>
                <div className={styles.heroOverlay}></div>
                <div className="absolute inset-0 w-full h-[120%] -top-[10%]">
                    <Image
                        src="/Landing_page_hotel_scroll_frames/ezgif-frame-001.jpg"
                        alt="Cooking Heritage"
                        fill
                        className={`object-cover hero-bg ${styles.heroImage}`}
                        priority
                    />
                </div>
                <div className={styles.heroContent}>
                    <h1 className={`${styles.heroTitle} hero-title`}>Destiny on a Plate</h1>
                    <p className={`${styles.heroSubtitle} hero-subtitle`}>
                        "Gismat" means destiny. We believe every meal shared is a moment written in the stars.
                    </p>
                </div>
            </section>

            {/* 2. The Legacy (Split Screen) */}
            <section ref={legacyRef} className={`${styles.section} ${styles.legacySection}`}>
                <div className={styles.container}>
                    <div className={`${styles.imageWrapper} legacy-image`}>
                        <Image
                            src="/images/interior.png" // Replace with a more 'historical' looking image if available
                            alt="Ancient Hadramout"
                            fill
                            className="object-cover"
                        />
                        <div className={styles.frameDecoration}></div>
                    </div>
                    <div className={`${styles.textContent} legacy-text`}>
                        <div className={styles.sectionBadge}>Our Origins</div>
                        <h2 className={styles.sectionTitle}>Roots in <br /><span className="text-[#C9A24D]">Hadramout</span></h2>
                        <p className={styles.paragraph}>
                            The story of Mandi begins in the dusty, spice-laden streets of Hadramout, Yemen. It is a tale of Bedouin hospitality, where cooking wasn't just a chore, but a ceremony.
                        </p>
                        <p className={styles.paragraph}>
                            At GISMAT MANDI, we are the custodians of this ancient art. We don't just replicate recipes; we preserve a way of life that honors patience, fire, and the sanctity of communal eating.
                        </p>
                    </div>
                </div>
            </section>

            {/* 3. The Art of Mandi (Process) */}
            <section ref={processRef} className={styles.processSection}>
                <div className="text-center mb-16">
                    <h2 className={styles.sectionTitle}>The Art of Mandi</h2>
                    <p className="text-gray-400 mt-4 max-w-2xl mx-auto">A culinary ritual perfected over centuries, requiring patience, precision, and passion.</p>
                </div>

                <div className={styles.processGrid}>
                    <div className={`${styles.processCard} process-card`}>
                        <div className={styles.processIconBox}><Flame size={32} /></div>
                        <h3>The Fire</h3>
                        <p>Underground clay ovens (Tandoor) are fired with desert wood to create a smokeless, intense heat.</p>
                    </div>
                    <div className={`${styles.processCard} process-card`}>
                        <div className={styles.processIconBox}><Clock size={32} /></div>
                        <h3>The Patience</h3>
                        <p>Meat is marinated for 24 hours in a secret blend of 14 spices, then slow-cooked for 4 hours until it falls off the bone.</p>
                    </div>
                    <div className={`${styles.processCard} process-card`}>
                        <div className={styles.processIconBox}><Users size={32} /></div>
                        <h3>The Sharing</h3>
                        <p>Served on a communal platter, honoring the Bedouin tradition where eating together creates a bond of brotherhood.</p>
                    </div>
                </div>
            </section>

            {/* 4. Immersive Quote (Parallax) */}
            <section className={styles.quoteSection}>
                <div className={styles.quoteOverlay} />
                <Image
                    src="/Landing_page_hotel_scroll_frames/ezgif-frame-080.jpg"
                    alt="Spices"
                    fill
                    className="object-cover fixed-bg"
                    style={{ opacity: 0.4 }}
                />
                <div className={styles.quoteContent}>
                    <div className="text-[#C9A24D] text-6xl mb-4">"</div>
                    <p className={styles.quoteText}>
                        Food is not just sustenance. It is a story of our ancestors, told through the language of saffron, cardamom, and fire.
                    </p>
                    <div className={styles.quoteAuthor}>- Head Chef, Ahmed Al-Yemeni</div>
                </div>
            </section>

            {/* 5. Our Philosophy (Values) */}
            <section className={`${styles.section} values-section`}>
                <div className={styles.containerColumn}>
                    <h2 className={`${styles.sectionTitle} text-center mb-16`}>Our Philosophy</h2>
                    <div className={styles.valuesGrid}>
                        {VALUES.map((val, idx) => (
                            <div key={idx} className={`${styles.valueCard} value-card`}>
                                <val.icon size={48} className="text-[#C9A24D] mb-6" />
                                <h3>{val.title}</h3>
                                <p>{val.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
