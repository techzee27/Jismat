'use client';

import { useState, useRef, useMemo } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import PageHeader from '../../components/PageHeader';
import MenuCard from '../../components/MenuCard';
import SectionWrapper from '../../components/SectionWrapper';
import styles from './Menu.module.css';
import { menuItems, categories as originalCategories } from '../../data/menuItems'; // Renamed import
import { Search, Flame } from 'lucide-react';

// Augmented Categories
const categories = [
    { id: 'best-sellers', label: 'Best Sellers', icon: Flame },
    ...originalCategories
];

export default function MenuPage() {
    const [activeCategory, setActiveCategory] = useState('best-sellers'); // Default to Best Sellers
    const [searchQuery, setSearchQuery] = useState('');
    const containerRef = useRef(null);

    const filteredItems = useMemo(() => {
        let items = menuItems;

        // 1. Filter by Search
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            items = items.filter(item =>
                item.name.toLowerCase().includes(query) ||
                item.description.toLowerCase().includes(query)
            );
        }

        // 2. Filter by Category
        if (activeCategory === 'best-sellers') {
            items = items.filter(item => item.isPopular);
        } else if (activeCategory !== 'all') {
            items = items.filter(item => item.category === activeCategory);
        }

        return items;
    }, [activeCategory, searchQuery]);

    useGSAP(() => {
        // Animate Grid Items on change
        gsap.fromTo(`.${styles.gridItem}`,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: 'power2.out', clearProps: "all" }
        );
    }, { scope: containerRef, dependencies: [filteredItems] });

    return (
        <main ref={containerRef} className="bg-[#12141C] min-h-screen text-white">
            <Navbar />
            <PageHeader
                title="Our Menu"
                subtitle="Explore our exquisite selection of traditional Yemeni dishes prepared with varying spices and cooking techniques."
                bgImage="/Landing_page_hotel_scroll_frames/ezgif-frame-060.jpg" // Added generic BG or allow component default
            />

            <SectionWrapper>
                <div className={styles.controlsContainer}>
                    {/* Search Bar */}
                    <div className={styles.searchWrapper}>
                        <Search className={styles.searchIcon} size={20} />
                        <input
                            type="text"
                            placeholder="Search dishes, ingredients..."
                            className={styles.searchInput}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    {/* Category Tabs */}
                    <div className={styles.tabsScroll}> {/* Wrapper for horizontal scroll on mobile */}
                        <div className={styles.tabsContainer}>
                            {categories.map(cat => {
                                const Icon = cat.icon;
                                return (
                                    <button
                                        key={cat.id}
                                        onClick={() => setActiveCategory(cat.id)}
                                        className={`${styles.tab} ${activeCategory === cat.id ? styles.activeTab : ''}`}
                                    >
                                        {Icon && <Icon size={16} className={activeCategory === cat.id ? "text-inherit" : "text-[#C9A24D]"} />}
                                        {cat.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Grid */}
                {filteredItems.length > 0 ? (
                    <div className={styles.grid}>
                        {filteredItems.map((item) => (
                            <div key={item.id} className={styles.gridItem}>
                                <MenuCard dish={item} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 text-gray-500">
                        <p className="text-xl">No dishes found matching your criteria.</p>
                        <button
                            onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                            className="mt-4 text-[#C9A24D] hover:underline"
                        >
                            Reset Filters
                        </button>
                    </div>
                )}
            </SectionWrapper>

            <Footer />
        </main>
    );
}
