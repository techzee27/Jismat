'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import styles from './MenuCard.module.css';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function MenuCard({ dish }) {
    const { name, description, price, image, isPopular, slug } = dish;
    const cardRef = useRef();
    const buttonRef = useRef();

    useGSAP(() => {
        // Initial Scroll Trigger Animation
        gsap.fromTo(cardRef.current,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: cardRef.current,
                    start: 'top 90%',
                }
            }
        );
    }, { scope: cardRef });

    const { contextSafe } = useGSAP({ scope: cardRef });

    const handleMouseEnter = contextSafe(() => {
        gsap.to(cardRef.current, { y: -8, duration: 0.3, ease: 'power1.out' });
        gsap.to(buttonRef.current, { scale: 1.1, duration: 0.2 });
    });

    const handleMouseLeave = contextSafe(() => {
        gsap.to(cardRef.current, { y: 0, duration: 0.3, ease: 'power1.out' });
        gsap.to(buttonRef.current, { scale: 1, duration: 0.2 });
    });

    const handleButtonPress = contextSafe(() => {
        gsap.to(buttonRef.current, { scale: 0.9, duration: 0.1, yoyo: true, repeat: 1 });
    });

    return (
        <div
            ref={cardRef}
            className={styles.card}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <Link href={`/menu/${slug}`} className={styles.cardLink}>
                <div className={styles.imageWrapper}>
                    <div className={styles.imageContainer}>
                        <Image
                            src={image}
                            alt={name}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className={styles.image}
                        />
                    </div>
                    {isPopular && <span className={styles.badge}>Best Seller</span>}
                </div>

                <div className={styles.content}>
                    <div className={styles.textContent}>
                        <h3 className={styles.name}>{name}</h3>
                        <p className={styles.description}>{description}</p>
                    </div>

                    <div className={styles.footer}>
                        <span className={styles.price}>{price} AED</span>
                        <div className={styles.detailsBtnWrapper}>
                            <div
                                ref={buttonRef}
                                className={styles.orderBtn}
                                onMouseDown={handleButtonPress}
                                role="button"
                                aria-label="View Details"
                            >
                                <ArrowRight size={24} color="var(--dark-navy)" />
                            </div>
                            <span className={styles.detailsText}>More Details</span>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}
