'use client';

import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import styles from './About.module.css';
import { Utensils, Flame, Heart, Clock, Award, Users, MapPin } from 'lucide-react';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const VALUES = [
    { icon: Utensils, title: "Authenticity", text: "We refuse to compromise. Our spices are sourced directly from the finest markets in Yemen." },
    { icon: Heart, title: "Hospitality", text: "In our culture, a guest is a gift from God. We serve every meal with warmth and generosity." },
    { icon: Award, title: "Quality", text: "From the finest basmati rice to premium cuts of fresh local meat, we use only the best ingredients." },
];

const BRANCHES = [
    { id: 'jubilee', city: 'Hyderabad', area: 'Jubilee Hills', address: 'Road No. 36, Shrestha Aura.', mapQuery: 'Jismat Mandi Jubilee Hills Hyderabad' },
    { id: 'dilsukhnagar', city: 'Hyderabad', area: 'Dilsukhnagar', address: 'VR Colony, Kamala Nagar (often listed as Jismat Jail Mandi).', mapQuery: 'Jismat Jail Mandi Dilsukhnagar Hyderabad' },
    { id: 'kukatpally', city: 'Hyderabad', area: 'Kukatpally', address: '2nd Floor, PNR Enclave, beside Kalamandir.', mapQuery: 'Jismat Mandi Kukatpally Hyderabad' },
    { id: 'asrao', city: 'Hyderabad', area: 'AS Rao Nagar / Kapra', address: '3rd Floor, Dr. AS Rao Nagar Rd.', mapQuery: 'Jismat Mandi AS Rao Nagar Hyderabad' },
    { id: 'ameerpet', city: 'Hyderabad', area: 'Ameerpet', address: 'PNR Enclave, Pillar No. 1072.', mapQuery: 'Jismat Mandi Ameerpet Hyderabad' },
    { id: 'kondapur', city: 'Hyderabad', area: 'Kondapur', address: '3rd Floor, Nagarjuna Ikon, above Croma Electronics.', mapQuery: 'Jismat Mandi Kondapur Hyderabad' },
    { id: 'madinaguda', city: 'Hyderabad', area: 'Madinaguda', address: 'Above Croma Showroom, near Deepthisri Nagar.', mapQuery: 'Jismat Mandi Madinaguda Hyderabad' },
    { id: 'pragathi', city: 'Hyderabad', area: 'Pragathi Nagar', address: 'Near More Super Market.', mapQuery: 'Jismat Mandi Pragathi Nagar Hyderabad' },
    { id: 'madhapur', city: 'Hyderabad', area: 'Madhapur', address: 'Kaithalapoor (primarily delivery focused).', mapQuery: 'Kaithalapoor Madhapur Hyderabad' },
    { id: 'vijayawada', city: 'Andhra Pradesh', area: 'Vijayawada', address: '1st Floor, KBR Heights, above Reliance Trends, Labbipet/Benz Circle.', mapQuery: 'Jismat Mandi Vijayawada' },
    { id: 'vizag', city: 'Andhra Pradesh', area: 'Visakhapatnam (Vizag)', address: '1st Floor, Annapurna Nilayam, Lawsons Bay Colony.', mapQuery: 'Jismat Mandi Visakhapatnam' },
    { id: 'guntur', city: 'Andhra Pradesh', area: 'Guntur', address: 'Lakshmipuram Main Road.', mapQuery: 'Jismat Mandi Guntur' },
    { id: 'nellore', city: 'Andhra Pradesh', area: 'Nellore', address: 'Located in the main city area.', mapQuery: 'Jismat Mandi Nellore' },
    { id: 'tenali', city: 'Andhra Pradesh', area: 'Tenali', address: 'Listed as part of the regional expansion.', mapQuery: 'Jismat Mandi Tenali' },
    { id: 'bangalore', city: 'Karnataka', area: 'Bangalore (Marathahalli)', address: '2nd/3rd Floor, Venkatadri Plaza, Outer Ring Road.', mapQuery: 'Jismat Mandi Marathahalli Bangalore' },
];

export default function AboutPage() {
    const containerRef = useRef(null);
    const heroRef = useRef(null);
    const legacyRef = useRef(null);
    const processRef = useRef(null);
    const [activeBranch, setActiveBranch] = useState(BRANCHES[0]);

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
        <main ref={containerRef} className="bg-[#1c1a1a] text-white overflow-hidden">
            <Navbar />

            {/* 1. Immersive Hero Section */}
            <section ref={heroRef} className={styles.heroSection}>
                <div className={styles.heroOverlay}></div>
                <div className="absolute inset-0 w-full h-[120%] -top-[10%]">
                    <Image
                        src="/about_legacy_jail_brick.png"
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
                        <h2 className={styles.sectionTitle}>Roots in <br /><span className="text-[#BC4A3C]">Hadramout</span></h2>
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
                    src="/about_process_jail_brick.png"
                    alt="Spices and Cooking Process"
                    fill
                    className="object-cover fixed-bg"
                    style={{ opacity: 0.4 }}
                />
                <div className={styles.quoteContent}>
                    <div className="text-[#BC4A3C] text-6xl mb-4">"</div>
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
                                <val.icon size={48} className="text-[#BC4A3C] mb-6" />
                                <h3>{val.title}</h3>
                                <p>{val.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6. Branches / Hideouts Section */}
            <section className={`${styles.section} ${styles.branchesSection}`}>
                <div className={styles.containerColumn}>
                    <div className="text-center mb-16">
                        <div className={styles.sectionBadge}>Take a Visit</div>
                        <h2 className={styles.sectionTitle}>Explore Our <span className="text-[#BC4A3C]">Jail Hideouts</span></h2>
                        <p className="text-gray-400 mt-4 max-w-2xl mx-auto">From Hyderabad to Bangalore, find the nearest Jismat Jail Mandi and experience destiny on a plate.</p>
                    </div>

                    <div className={styles.branchesLayout}>
                        {/* Map Column */}
                        <div className={styles.mapColumn}>
                            <div className={styles.mapWrapper}>
                                <iframe
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    loading="lazy"
                                    allowFullScreen
                                    referrerPolicy="no-referrer-when-downgrade"
                                    src={`https://maps.google.com/maps?q=${encodeURIComponent(activeBranch.mapQuery)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                                    className="filter invert-[90%] hue-rotate-180 contrast-[85%] sepia-[20%] opacity-80 mix-blend-screen" // Add dark mode map effect if possible, but standard is fine
                                ></iframe>
                            </div>
                        </div>

                        {/* Branches List Column */}
                        <div className={styles.branchesColumn}>
                            <div className={styles.branchesGrid}>
                                {BRANCHES.map(branch => (
                                    <div
                                        key={branch.id}
                                        className={`${styles.branchCard} ${activeBranch.id === branch.id ? styles.activeBranch : ''}`}
                                        onClick={() => setActiveBranch(branch)}
                                    >
                                        <h4 className={styles.branchArea}>{branch.area}</h4>
                                        <p className={styles.branchCity}>{branch.city}</p>
                                        <div className={styles.branchAddress}>
                                            <MapPin size={14} className="inline mr-2 text-[#BC4A3C] shrink-0 mt-[2px]" />
                                            <span>{branch.address}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
