'use client';

import { useState, useRef, useMemo } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import PageHeader from '../../components/PageHeader';
import SectionWrapper from '../../components/SectionWrapper';
import Image from 'next/image';
import { X } from 'lucide-react';
import styles from './Gallery.module.css';

const categories = [
    { id: 'all', label: 'All Moments' },
    { id: 'interior', label: 'Ambiance' },
    { id: 'food', label: 'Culinary' },
    { id: 'events', label: 'Events' },
];

const galleryImages = [
    { id: 1, src: '/hero_jail_brick.png', alt: 'Grand Entrance', category: 'interior', span: 'large' },
    { id: 2, src: '/about_process_jail_brick.png', alt: 'Signature Chicken Mandi', category: 'food', span: 'normal' },
    { id: 3, src: '/menu_header_jail_brick.png', alt: 'Majlis Seating', category: 'interior', span: 'tall' },
    { id: 4, src: '/about_legacy_jail_brick.png', alt: 'Lamb Zurbian Platter', category: 'food', span: 'normal' },
    { id: 5, src: '/philosophy_jail_brick.png', alt: 'Private Dining Room', category: 'interior', span: 'normal' },
    { id: 6, src: '/menu_header_jail_brick.png', alt: 'Traditional Decor', category: 'interior', span: 'tall' },
    { id: 7, src: '/cta_jail_brick.png', alt: 'Kunafa Dessert', category: 'food', span: 'normal' },
    { id: 8, src: '/menu_header_jail_brick.png', alt: 'Chef in Action', category: 'events', span: 'large' },
];

export default function GalleryPage() {
    const [activeCategory, setActiveCategory] = useState('all');
    const [selectedImage, setSelectedImage] = useState(null);

    const filteredImages = useMemo(() => {
        if (activeCategory === 'all') return galleryImages;
        return galleryImages.filter(img => img.category === activeCategory);
    }, [activeCategory]);
    return (
        <main>
            <Navbar />
            <PageHeader title="Gallery" subtitle="A visual feast of our ambiance and culinary creations." />
            <SectionWrapper>
                <div className={styles.galleryContainer}>
                    {/* Filters */}
                    <div className={styles.filterContainer}>
                        {categories.map(cat => (
                            <button
                                key={cat.id}
                                className={`${styles.filterBtn} ${activeCategory === cat.id ? styles.active : ''}`}
                                onClick={() => setActiveCategory(cat.id)}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>

                    {/* Infinite/Masonry Grid */}
                    <div className={styles.grid}>
                        {filteredImages.map((img, index) => (
                            <div
                                key={img.id}
                                className={`${styles.item} ${img.span === 'large' ? styles.large : ''} ${img.span === 'tall' ? styles.tall : ''}`}
                                onClick={() => setSelectedImage(img)}
                            >
                                <div className={styles.imageWrapper}>
                                    <Image
                                        src={img.src}
                                        alt={img.alt}
                                        fill
                                        className={styles.image}
                                    />
                                    <div className={styles.overlay}>
                                        <span className={styles.viewText}>View</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </SectionWrapper>
            {selectedImage && (
                <div className={styles.lightbox} onClick={() => setSelectedImage(null)}>
                    <button className={styles.closeBtn}>
                        <X size={32} />
                    </button>
                    <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.lightboxImageWrapper}>
                            <Image
                                src={selectedImage.src}
                                alt={selectedImage.alt}
                                fill
                                className="object-contain"
                            />
                        </div>
                        <p className={styles.caption}>{selectedImage.alt}</p>
                    </div>
                </div>
            )}
            <Footer />
        </main>
    );
}
