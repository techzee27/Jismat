'use client';
import { useRef, useState, Suspense, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import PageHeader from '../../components/PageHeader';
import ReservationForm from '../../components/ReservationForm';
import { Clock, MapPin, Phone, Mail } from 'lucide-react';
import styles from './Reservations.module.css';
import { BRANCHES } from '../../data/branches';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

function ReservationsPageInner() {
    const searchParams = useSearchParams();
    const branchParam = searchParams.get('branch');
    const containerRef = useRef(null);
    const [activeBranch, setActiveBranch] = useState(BRANCHES[0]);

    useEffect(() => {
        if (branchParam) {
            const branch = BRANCHES.find(b => b.id === branchParam);
            if (branch) {
                setActiveBranch(branch);
            }
        }
    }, [branchParam]);

    useGSAP(() => {
        gsap.fromTo(`.${styles.infoBar}`,
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: `.${styles.infoBar}`,
                    start: 'top 90%'
                }
            }
        );

        gsap.fromTo(`.${styles.dualLayout}`,
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: `.${styles.dualLayout}`,
                    start: 'top 85%'
                }
            }
        );

    }, { scope: containerRef });

    return (
        <main ref={containerRef}>
            <Navbar />
            <PageHeader title="Reservations" subtitle="Secure your table for an unforgettable dining experience." />

            {/* Map Section */}
            <div className={styles.mapWrapper}>
                <iframe
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(activeBranch.mapQuery)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                    className={styles.mapFrame}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>

            {/* Info Bar Overlapping Map */}
            <div className={`container ${styles.infoBarContainer}`}>
                <div className={styles.infoBar}>
                    <div className={styles.infoColumn}>
                        <h3 className={styles.infoTitle}>Lunch Time</h3>
                        <p className={styles.infoText}>Monday to Sunday</p>
                        <p className={`${styles.infoText} ${styles.highlight}`}>{activeBranch.lunchTime}</p>
                    </div>

                    <div className={styles.infoColumn}>
                        <h3 className={styles.infoTitle}>Contact Info</h3>
                        <p className={styles.infoText}>{activeBranch.address}</p>
                        <p className={`${styles.infoText} ${styles.highlight}`}>{activeBranch.email}</p>
                        <p className={`${styles.infoText} ${styles.highlight}`}>Booking : {activeBranch.phone}</p>
                    </div>

                    <div className={styles.infoColumn}>
                        <h3 className={styles.infoTitle}>Dinner Time</h3>
                        <p className={styles.infoText}>Monday to Sunday</p>
                        <p className={`${styles.infoText} ${styles.highlight}`}>{activeBranch.dinnerTime}</p>
                    </div>
                </div>
            </div>

            {/* Main Content with Form and Image */}
            <div className={styles.contentSection}>
                <div className={`container`}>
                    <div className={styles.dualLayout}>
                        {/* Left Side: Form */}
                        <div className={styles.formContainer}>
                            <div className={styles.formHeader}>
                                <h2 className={styles.formTitle}>Book Your Table</h2>
                                <p className={styles.formSubtitle}>
                                    Have a question about our service? We're here to help,
                                    contact us today or make a reservation directly.
                                </p>

                                <div className={styles.branchSelectWrapper}>
                                    <label htmlFor="branch-select" className={styles.branchLabel}>Select Branch Setting</label>
                                    <select
                                        id="branch-select"
                                        className={styles.branchSelect}
                                        value={activeBranch.id}
                                        onChange={(e) => {
                                            const branch = BRANCHES.find(b => b.id === e.target.value);
                                            setActiveBranch(branch);
                                            window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to map
                                        }}
                                    >
                                        {BRANCHES.map(branch => (
                                            <option key={branch.id} value={branch.id}>
                                                {branch.area}, {branch.city}
                                            </option>
                                        ))}
                                    </select>
                                    <p className={styles.branchAddressText}>
                                        <MapPin size={14} className="inline mr-1 text-[#BC4A3C]" />
                                        {activeBranch.address}
                                    </p>
                                </div>
                            </div>
                            <ReservationForm />
                        </div>

                        {/* Right Side: Image */}
                        <div className={styles.imageContainer}>
                            <Image
                                src="/images/philosophy.jpg"
                                alt="Restaurant Ambience"
                                fill
                                className={styles.image}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}

export default function ReservationsPage() {
    return (
        <Suspense fallback={<div>Loading reservations...</div>}>
            <ReservationsPageInner />
        </Suspense>
    );
}
