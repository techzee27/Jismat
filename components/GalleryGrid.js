'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import styles from './GalleryGrid.module.css';

const galleryImages = [
    { id: 1, src: '/images/hero-bg.png', alt: 'Restaurant Interior' },
    { id: 2, src: '/images/mandi-chicken.png', alt: 'Chicken Mandi' },
    { id: 3, src: '/images/interior.png', alt: 'Dining Area' },
    { id: 4, src: '/images/mandi-chicken.png', alt: 'Lamb Zurbian' },
    { id: 5, src: '/images/hero-bg.png', alt: 'Private Dining' },
    { id: 6, src: '/images/interior.png', alt: 'Arabic Seating' },
];

export default function GalleryGrid() {
    const [selectedImage, setSelectedImage] = useState(null);
    const lightboxRef = useRef(null);
    const contentRef = useRef(null);

    const closeLightbox = () => {
        if (!lightboxRef.current) return;

        gsap.to(lightboxRef.current, {
            opacity: 0,
            duration: 0.3,
            onComplete: () => setSelectedImage(null)
        });
    };

    useGSAP(() => {
        if (selectedImage && lightboxRef.current) {
            gsap.fromTo(lightboxRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.3 }
            );

            if (contentRef.current) {
                gsap.fromTo(contentRef.current,
                    { scale: 0.9, opacity: 0 },
                    { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.2)", delay: 0.1 }
                );
            }
        }
    }, [selectedImage]);

    return (
        <>
            <div className={styles.grid}>
                {galleryImages.map((img) => (
                    <div
                        key={img.id}
                        className={styles.item}
                        onClick={() => setSelectedImage(img)}
                    >
                        <div className={styles.imageWrapper}>
                            <Image
                                src={img.src}
                                alt={img.alt}
                                fill
                                className={styles.image}
                            />
                        </div>
                    </div>
                ))}
            </div>

            {selectedImage && (
                <div
                    ref={lightboxRef}
                    className={styles.lightbox}
                    onClick={closeLightbox}
                >
                    <button className={styles.closeBtn} onClick={(e) => { e.stopPropagation(); closeLightbox(); }}>
                        <X size={32} color="#fff" />
                    </button>
                    <div
                        ref={contentRef}
                        className={styles.lightboxContent}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className={styles.lightboxImageWrapper}>
                            <Image
                                src={selectedImage.src}
                                alt={selectedImage.alt}
                                fill
                                style={{ objectFit: 'contain' }}
                            />
                        </div>
                        <p className={styles.caption}>{selectedImage.alt}</p>
                    </div>
                </div>
            )}
        </>
    );
}
