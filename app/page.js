'use client';

import { useRef, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MenuCard from '../components/MenuCard';
import { menuItems } from '@/data/menuItems';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Star, Quote } from 'lucide-react';
import styles from './Home.module.css';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(useGSAP, ScrollTrigger);
}

// Filter for signature dishes
const SIGNATURE_DISHES = menuItems.filter(item => item.isPopular).slice(0, 3);

const TESTIMONIALS = [
    {
        id: 1,
        name: "Ahmed Al-Farsi",
        role: "Food Critic",
        text: "The most authentic Mandi I've had outside of Yemen. The slow-cooked lamb literally falls off the bone. A masterpiece of flavor.",
        rating: 5
    },
    {
        id: 2,
        name: "Sarah Jenkins",
        role: "Tourist",
        text: "An absolute gem in Dubai! The ambience took us straight to a royal Arabian palace. The hospitality is unmatched.",
        rating: 5
    },
    {
        id: 3,
        name: "Mohammed Rashid",
        role: "Regular Guest",
        text: "I come here every weekend with my family. The consistency in taste and the warm service makes it our favorite spot.",
        rating: 5
    }
];

export default function Home() {
    const mainRef = useRef(null);
    const introRef = useRef(null);
    const heroRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline();

        // Initial State
        gsap.set(introRef.current, { zIndex: 100 });

        // 1. Reveal Intro Text
        tl.to(".intro-text", {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power2.out",
            delay: 0.2
        })
            .to(".intro-text", {
                opacity: 0,
                y: -20,
                duration: 0.8,
                stagger: 0.1,
                ease: "power2.in",
                delay: 1.5
            }, "+=0.2"); // Hold for a moment

        // 2. Gommage Effect (Reveal The Background)
        tl.to(introRef.current, {
            clipPath: "circle(150% at 50% 50%)",
            opacity: 0,
            duration: 1.5,
            ease: "power2.inOut",
            onComplete: () => {
                gsap.set(introRef.current, { display: 'none' });
            }
        }, "-=0.2"); // Start as text fades out

        // 3. Hero Content Reveal (The "Wave")
        tl.fromTo(".hero-animate",
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out" },
            "-=1.0" // Start much earlier, overlapping with background reveal
        );

        // --- SCROLL ANIMATIONS ---

        // Hero Parallax
        gsap.to(".hero-bg-img", {
            yPercent: 30,
            ease: "none",
            scrollTrigger: {
                trigger: heroRef.current,
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });

        // About Section Reveal
        gsap.from(".about-img", {
            x: -50,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: ".about-section",
                start: "top 70%",
            }
        });

        gsap.from(".about-text", {
            x: 50,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: ".about-section",
                start: "top 70%",
            }
        });

        // Menu Items Stagger
        gsap.from(".menu-item", {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            scrollTrigger: {
                trigger: ".menu-section",
                start: "top 75%",
            }
        });

        // Testimonials Stagger
        gsap.from(".testimonial-card", {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            scrollTrigger: {
                trigger: ".testimonials-section",
                start: "top 75%",
            }
        });

        // CTA Reveal
        gsap.from(".cta-content", {
            scale: 0.9,
            opacity: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".cta-section",
                start: "top 70%",
            }
        });

    }, { scope: mainRef });

    return (
        <main ref={mainRef} className="bg-[#12141C] min-h-screen text-white selection:bg-[#C9A24D] selection:text-white flex flex-col">
            <Navbar />

            {/* INTRO OVERLAY (Gommage Layer) */}
            <div ref={introRef} className={styles.introOverlay}>
                <div className={styles.introContent}>
                    <h2 className={`${styles.introTitle} intro-text`}>GISMAT MANDI</h2>
                    <p className={`${styles.introSubtitle} intro-text`}>The Essence of Arabia</p>
                </div>
            </div>

            {/* HERO SECTION (Static Background) */}
            <section ref={heroRef} className={`${styles.heroSection} hero-section`}>
                <div className={styles.heroOverlay} />
                <div className="absolute inset-0 w-full h-[120%] -top-[10%]">
                    <Image
                        src="/Landing_page_hotel_scroll_frames/ezgif-frame-163.jpg"
                        alt="Hero Background"
                        fill
                        className="object-cover hero-bg-img"
                        priority
                        quality={90}
                    />
                </div>

                <div className={styles.heroContent}>
                    <span className={`${styles.heroTagline} hero-animate`}>
                        Gismat Mandi
                    </span>
                    <h1 className={`${styles.heroTitle} hero-animate`}>
                        Taste the Legacy <br /> of <span className={styles.heroTitleHighlight}>Arabia</span>
                    </h1>
                    <p className={`${styles.heroDescription} hero-animate`}>
                        Experience premium Mandi dining where tradition meets luxury in every bite.
                    </p>

                    <div className={`${styles.heroButtons} hero-animate`}>
                        <Link href="/reservations" className={styles.primaryButton}>
                            Reserve a Table
                        </Link>
                        <Link href="/menu" className={styles.secondaryButton}>
                            View Our Menu
                        </Link>
                    </div>
                </div>
            </section>

            {/* ABOUT / STORY SECTION */}
            <section className={`${styles.section} about-section`}>
                <div className={styles.container}>
                    <div className={styles.aboutGrid}>
                        <div className={`${styles.imageWrapper} about-img`}>
                            <Image
                                src="/Landing_page_hotel_scroll_frames/ezgif-frame-163.jpg"
                                alt="Traditional Cooking"
                                fill
                                className="object-cover"
                            />
                            <div className={styles.imageFrame} />
                        </div>

                        <div className={`${styles.textContent} about-text`}>
                            <span className={styles.sectionTag}>Our Philosophy</span>
                            <h2 className={styles.sectionTitle}>
                                A Culinary Journey <br /> Through Time
                            </h2>
                            <p className={styles.sectionDescription}>
                                At Gismat Mandi, we don't just serve food; we serve history. Our recipes have been passed down through generations, preserving the authentic techniques of the Arabian Peninsula.
                            </p>
                            <p className={styles.sectionDescription}>
                                From the selection of premium spices to the slow-roasting process in our traditional underground ovens, every step is a tribute to the art of Mandi.
                            </p>
                            <Link href="/about" className={styles.textLink}>
                                Read Our Story <ArrowRight size={16} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* FEATURED MENU SECTION */}
            <section className={`${styles.sectionDark} menu-section`}>
                <div className={styles.container}>
                    <div className={styles.centerHeader}>
                        <span className={styles.sectionTag}>Curated Excellence</span>
                        <h2 className={styles.sectionTitle}>Signature Dishes</h2>
                    </div>

                    <div className={styles.grid3}>
                        {SIGNATURE_DISHES.map((dish) => (
                            <div key={dish.id} className="menu-item">
                                <MenuCard dish={dish} />
                            </div>
                        ))}
                    </div>

                    <div className={styles.viewAllWrapper}>
                        <Link href="/menu" className={styles.outlineButton}>
                            Explore Full Menu
                        </Link>
                    </div>
                </div>
            </section>

            {/* TESTIMONIALS SECTION */}
            <section className={`${styles.section} testimonials-section`}>
                <div className={styles.container}>
                    <div className={styles.centerHeader}>
                        <Star className="text-[#C9A24D] w-8 h-8 mx-auto mb-4 fill-[#C9A24D]" />
                        <h2 className={styles.sectionTitle}>Guest Stories</h2>
                    </div>

                    <div className={styles.grid3}>
                        {TESTIMONIALS.map((review) => (
                            <div key={review.id} className={`${styles.testimonialCard} testimonial-card`}>
                                <Quote className={styles.quoteIcon} size={32} />
                                <p className={styles.reviewText}>"{review.text}"</p>
                                <div>
                                    <span className={styles.reviewerName}>{review.name}</span>
                                    <span className={styles.reviewerRole}>{review.role}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FINAL CTA SECTION */}
            <section className={`${styles.ctaSection} cta-section`}>
                <div className={styles.ctaOverlay}></div>
                <Image
                    src="/Landing_page_hotel_scroll_frames/ezgif-frame-140.jpg"
                    alt="Background Texture"
                    fill
                    className="object-cover"
                    style={{ zIndex: 0 }}
                />

                <div className={`${styles.ctaContent} cta-content`}>
                    <h2 className={styles.sectionTitle}>Ready to Feast?</h2>
                    <p className={styles.sectionDescription}>
                        Join us for an unforgettable dining experience. Reservations are highly recommended.
                    </p>
                    <Link href="/reservations" className={styles.primaryButton}>
                        Book Your Table
                    </Link>
                </div>
            </section>

            <Footer />
        </main>
    );
}
