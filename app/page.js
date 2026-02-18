'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/Button';
import SectionWrapper from '../components/SectionWrapper';
import MenuCard from '../components/MenuCard';
import styles from './Home.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const containerRef = useRef();
  const heroRef = useRef();
  const heroImageRef = useRef();
  const heroTextRef = useRef();

  const featuredDishes = [
    {
      name: "Special Chicken Mandi",
      description: "Our signature Mandi with tender roasted chicken, saffron rice, and a blend of 12 secret spices.",
      price: 45,
      image: "/images/mandi-chicken.png",
      isPopular: true
    },
    {
      name: "Lamb Zurbian",
      description: "Traditional Yemeni rice dish with succulent lamb slow-cooked in yogurt and spices for 6 hours.",
      price: 65,
      image: "/images/mandi-chicken.png", // Using placeholder image for now
      isPopular: false
    },
    {
      name: "Kingfish Sayadieh",
      description: "Fresh Kingfish marinated in special masala, served with aromatic caramelized onion rice.",
      price: 55,
      image: "/images/mandi-chicken.png", // Using placeholder image for now
      isPopular: false
    }
  ];

  useGSAP(() => {
    // Hero Initial Animation
    const tl = gsap.timeline();

    tl.fromTo(heroImageRef.current,
      { scale: 1.2, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.5, ease: "power3.out" }
    )
      .fromTo(".hero-animate",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power3.out" },
        "-=1"
      );

    // Hero Parallax
    gsap.to(heroImageRef.current, {
      yPercent: 30,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    // About Section Animation
    gsap.fromTo(".about-image",
      { x: -100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-container",
          start: "top 75%",
        }
      }
    );

    gsap.fromTo(".about-content",
      { x: 100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-container",
          start: "top 75%",
        }
      }
    );

    // CTA Scale Animation
    gsap.fromTo(".cta-content",
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".cta-section",
          start: "top 80%",
        }
      }
    );

  }, { scope: containerRef });

  return (
    <main ref={containerRef}>
      <Navbar />

      {/* Hero Section */}
      <section ref={heroRef} className={styles.heroSection} style={{ overflow: 'hidden' }}>
        <div ref={heroImageRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '120%', zIndex: 0 }}>
          <Image
            src="/images/hero-bg.png"
            alt="Luxury Restaurant Ambience"
            fill
            priority
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className={styles.heroOverlay} style={{ zIndex: 1 }} />

        <div className={styles.heroContent} style={{ position: 'relative', zIndex: 2 }}>
          <h1 className={`${styles.heroTitle} hero-animate`}>
            Taste the Legacy of Arabia
          </h1>
          <p className={`${styles.heroSubtitle} hero-animate`}>
            Experience premium Mandi dining where tradition meets luxury in every bite.
          </p>
          <div className={`${styles.heroButtons} hero-animate`}>
            <Link href="/reservations">
              <Button variant="primary" className="text-lg px-8 py-3">Reserve a Table</Button>
            </Link>
            <Link href="/menu">
              <Button variant="outline" className="text-lg px-8 py-3">View Our Menu</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Dishes */}
      <SectionWrapper>
        <div className={styles.sectionHeader}>
          <h2>Signature Dishes</h2>
          <p className={styles.subHeader}>Curated selection of our most loved traditional recipes</p>
        </div>

        <div className={styles.dishesGrid}>
          {featuredDishes.map((dish, index) => (
            <MenuCard key={index} dish={dish} />
          ))}
        </div>
      </SectionWrapper>

      {/* About Section */}
      <SectionWrapper className="bg-section">
        <div className={`${styles.aboutContainer} about-container`}>
          <div className={`${styles.aboutImageWrapper} about-image`}>
            <Image
              src="/images/interior.png"
              alt="Restaurant Interior"
              fill
              className="object-cover"
            />
          </div>

          <div className={`${styles.aboutContent} about-content`}>
            <h2 className="text-gold">A Story of Tradition</h2>
            <h3 className="text-white mb-6">Authentic Flavors, Modern Luxury</h3>
            <p className="text-muted mb-6">
              At GISMAT MANDI, we bring the soulful heritage of Yemeni cuisine to a premium dining setting.
              Our chefs use age-old techniques, slow-cooking premium meats in underground ovens (Taboon)
              to achieve the perfect melt-in-your-mouth texture.
            </p>
            <p className="text-muted mb-8">
              Every spice is hand-picked, every grain of rice is perfectly seasoned.
              Join us for an unforgettable culinary journey.
            </p>
            <Link href="/about">
              <Button variant="outline">Read Our Story</Button>
            </Link>
          </div>
        </div>
      </SectionWrapper>

      {/* Reservation CTA */}
      <section
        className={`${styles.ctaSection} cta-section`}
        style={{ backgroundImage: 'url(/images/hero-bg.png)' }}
      >
        <div className={styles.ctaOverlay}></div>
        <div className={styles.ctaContent + " cta-content"}>
          <div>
            <h2 className="text-white mb-6">Taste Excellence Today</h2>
            <p className={styles.ctaText}>
              Book your table now and indulge in the finest Arabic dining experience in the city.
            </p>
            <Link href="/reservations">
              <Button variant="primary">Book Now</Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
