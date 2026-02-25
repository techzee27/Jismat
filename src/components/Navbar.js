'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import styles from './Navbar.module.css';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const menuRef = useRef(null);
    const tl = useRef(null);
    const containerRef = useRef(null);
    const items = useCartStore(state => state.items);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useGSAP(() => {
        // Set initial state
        gsap.set(menuRef.current, { autoAlpha: 0, y: -20 });

        // Create timeline
        tl.current = gsap.timeline({ paused: true })
            .to(menuRef.current, {
                autoAlpha: 1,
                y: 0,
                duration: 0.3,
                ease: 'power2.out'
            });

    }, { scope: containerRef });

    useEffect(() => {
        if (tl.current) {
            if (isOpen) {
                tl.current.play();
            } else {
                tl.current.reverse();
            }
        }
    }, [isOpen]);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Menu', href: '/menu' },
        { name: 'About', href: '/about' },
        { name: 'Gallery', href: '/gallery' },
        { name: 'Contact', href: '/contact' },
    ];

    return (
        <div ref={containerRef}>
            <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
                <div className={`container ${styles.navContainer}`}>
                    <Link href="/" className={styles.logo}>
                        GISMAT MANDI
                    </Link>

                    {/* Desktop Menu */}
                    <div className={styles.desktopMenu}>
                        {navLinks.map((link) => (
                            <Link key={link.name} href={link.href} className={styles.navLink}>
                                {link.name}
                            </Link>
                        ))}
                        <Link href="/reservations" className={styles.reservationBtn}>
                            Reservations
                        </Link>
                        <Link href="/cart" style={{ display: 'flex', alignItems: 'center', color: 'var(--white)', marginLeft: '10px', position: 'relative' }}>
                            <ShoppingCart size={24} color="var(--gold)" />
                            {mounted && items.length > 0 && (
                                <span style={{
                                    position: 'absolute', top: '-8px', right: '-12px', background: '#BC4A3C', color: 'white',
                                    borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold'
                                }}>
                                    {items.length}
                                </span>
                            )}
                        </Link>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className={styles.mobileToggle}
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle Menu"
                    >
                        {isOpen ? <X size={28} color="var(--gold)" /> : <Menu size={28} color="var(--gold)" />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div
                ref={menuRef}
                className={styles.mobileMenu}
            >
                <div className={styles.mobileMenuContent}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={styles.mobileLink}
                            onClick={() => setIsOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link
                        href="/reservations"
                        className={styles.mobileReservationBtn}
                        onClick={() => setIsOpen(false)}
                    >
                        Book a Table
                    </Link>
                    <Link
                        href="/cart"
                        className={styles.mobileLink}
                        onClick={() => setIsOpen(false)}
                        style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--gold)' }}
                    >
                        <ShoppingCart size={20} /> Cart ({mounted ? items.length : 0})
                    </Link>
                </div>
            </div>
        </div>
    );
}
