'use client';

import { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import PageHeader from '../../components/PageHeader';
import MenuCard from '../../components/MenuCard';
import SectionWrapper from '../../components/SectionWrapper';
import styles from './Menu.module.css';
import { menuItems, categories } from '../../data/menuItems';

export default function MenuPage() {
    const [activeCategory, setActiveCategory] = useState('all');
    const containerRef = useRef(null);

    const filteredItems = activeCategory === 'all'
        ? menuItems
        : menuItems.filter(item => item.category === activeCategory);

    useGSAP(() => {
        gsap.fromTo(`.${styles.grid} > *`,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, ease: 'power2.out' }
        );
    }, { scope: containerRef, dependencies: [activeCategory] });

    return (
        <main ref={containerRef}>
            <Navbar />
            <PageHeader
                title="Our Menu"
                subtitle="Explore our exquisite selection of traditional Yemeni dishes prepared with varying spices and cooking techniques."
            />

            <SectionWrapper>
                {/* Category Tabs */}
                <div className={styles.tabsContainer}>
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`${styles.tab} ${activeCategory === cat.id ? styles.activeTab : ''}`}
                        >
                            {cat.label}
                            {activeCategory === cat.id && (
                                <div className={styles.activeIndicator} />
                            )}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <div className={styles.grid}>
                    {filteredItems.map((item) => (
                        <MenuCard key={item.id} dish={item} />
                    ))}
                </div>
            </SectionWrapper>

            <Footer />
        </main>
    );
}
