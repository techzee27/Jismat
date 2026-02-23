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
import { Search, Flame, MapPin, ChevronLeft } from 'lucide-react';

const REGIONS = [
    {
        id: 'telangana',
        name: 'Hyderabad (Telangana)',
        image: 'images/Hyderabad.jpg', // Placeholder
        areas: [
            { id: 'jubilee', name: 'Jubilee Hills' },
            { id: 'dilsukhnagar', name: 'Dilsukhnagar' },
            { id: 'kukatpally', name: 'Kukatpally' },
            { id: 'asrao', name: 'AS Rao Nagar / Kapra' },
            { id: 'ameerpet', name: 'Ameerpet' },
            { id: 'kondapur', name: 'Kondapur' },
            { id: 'madinaguda', name: 'Madinaguda' },
            { id: 'pragathi', name: 'Pragathi Nagar' },
            { id: 'madhapur', name: 'Madhapur' },
        ]
    },
    {
        id: 'ap',
        name: 'Andhra Pradesh',
        image: 'images/Andhra_pradesh.jpg', // Placeholder
        areas: [
            { id: 'vijayawada', name: 'Vijayawada' },
            { id: 'vizag', name: 'Visakhapatnam (Vizag)' },
            { id: 'guntur', name: 'Guntur' },
            { id: 'nellore', name: 'Nellore' },
            { id: 'tenali', name: 'Tenali' },
        ]
    },
    {
        id: 'karnataka',
        name: 'Karnataka',
        image: 'images/Karnataka.jpg', // Placeholder
        areas: [
            { id: 'bangalore', name: 'Bangalore (Marathahalli)' },
        ]
    }
];

// Augmented Categories
const categories = [
    { id: 'best-sellers', label: 'Best Sellers', icon: Flame },
    ...originalCategories
];

export default function MenuPage() {
    const [activeRegion, setActiveRegion] = useState(null);
    const [activeArea, setActiveArea] = useState(null);
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
        <main ref={containerRef} className="bg-[#1c1a1a] min-h-screen text-white">
            <Navbar />
            <PageHeader
                title="Our Menu"
                subtitle="Explore our exquisite selection of traditional Yemeni dishes prepared with varying spices and cooking techniques."
                bgImage="/menu_header_jail_brick.png"
            />

            <SectionWrapper>
                {!activeRegion ? (
                    // 1. REGION SELECTION
                    <div className={styles.selectionContainer}>
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold mb-4 font-[var(--font-heading)]">Select State</h2>
                            <p className="text-gray-400">Choose your state to see the available branches.</p>
                        </div>
                        <div className={styles.regionGrid}>
                            {REGIONS.map(region => (
                                <div
                                    key={region.id}
                                    className={styles.regionCard}
                                    onClick={() => setActiveRegion(region)}
                                >
                                    <div className={styles.regionImageWrapper}>
                                        <div className={styles.regionOverlay}></div>
                                        <img src={region.image} alt={region.name} className={styles.regionImage} />
                                    </div>
                                    <h3 className={styles.regionName}>{region.name}</h3>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : !activeArea ? (
                    // 2. AREA SELECTION
                    <div className={styles.selectionContainer}>
                        <div className={styles.menuHeaderBar}>
                            <div className={styles.currentLocationBadge}>
                                <MapPin size={16} className="text-[#BC4A3C] mr-2" />
                                <span>{activeRegion.name}</span>
                            </div>
                            <button
                                onClick={() => setActiveRegion(null)}
                                className={styles.backButtonLocation}
                            >
                                <ChevronLeft size={20} /> Back to States
                            </button>
                        </div>
                        <div className="mb-10 text-center">
                            <h2 className="text-3xl font-bold mb-4 font-[var(--font-heading)]">{activeRegion.name} Branches</h2>
                            <p className="text-gray-400">Select your nearest hideout to view the menu.</p>
                        </div>
                        <div className={styles.areaGrid}>
                            {activeRegion.areas.map(area => (
                                <div
                                    key={area.id}
                                    className={styles.areaCard}
                                    onClick={() => setActiveArea(area)}
                                >
                                    <MapPin className="text-[#BC4A3C] mb-4" size={32} />
                                    <h4 className={styles.areaName}>{area.name}</h4>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    // 3. MENU DISPLAY
                    <div className={styles.menuDisplayContainer}>
                        <div className={styles.menuHeaderBar}>
                            <div className={styles.currentLocationBadge}>
                                <MapPin size={16} className="text-[#BC4A3C] mr-2" />
                                <span>{activeArea.name}, {activeRegion.name}</span>
                            </div>
                            <button
                                onClick={() => setActiveArea(null)}
                                className={styles.backButtonLocation}
                            >
                                <ChevronLeft size={20} /> Change Location
                            </button>
                        </div>

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
                                                {Icon && <Icon size={16} className={activeCategory === cat.id ? "text-inherit" : "text-[#BC4A3C]"} />}
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
                                    className="mt-4 text-[#BC4A3C] hover:underline"
                                >
                                    Reset Filters
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </SectionWrapper>

            <Footer />
        </main>
    );
}
