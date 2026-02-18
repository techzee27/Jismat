'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import PageHeader from '../../components/PageHeader';
import ReservationForm from '../../components/ReservationForm';
import { Clock, MapPin, Phone, Mail } from 'lucide-react';
import styles from './Reservations.module.css';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function ReservationsPage() {
    const containerRef = useRef(null);

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
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29221.39176378906!2d55.27078280000001!3d25.197196999999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43348a67e24b%3A0xff45e502e1ceb7!2sBurj%20Khalifa!5e0!3m2!1sen!2sae!4v1652882878142!5m2!1sen!2sae"
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
                        <p className={`${styles.infoText} ${styles.highlight}`}>11.00 am - 2.30pm</p>
                    </div>

                    <div className={styles.infoColumn}>
                        <h3 className={styles.infoTitle}>Contact Info</h3>
                        <p className={styles.infoText}>123 Culinary Avenue, Food District, Dubai</p>
                        <p className={`${styles.infoText} ${styles.highlight}`}>booking@gismatmandi.com</p>
                        <p className={`${styles.infoText} ${styles.highlight}`}>Booking : +971 50 123 4567</p>
                    </div>

                    <div className={styles.infoColumn}>
                        <h3 className={styles.infoTitle}>Dinner Time</h3>
                        <p className={styles.infoText}>Monday to Sunday</p>
                        <p className={`${styles.infoText} ${styles.highlight}`}>5.30 pm - 11.30 pm</p>
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
                            </div>
                            <ReservationForm />
                        </div>

                        {/* Right Side: Image */}
                        <div className={styles.imageContainer}>
                            <Image
                                src="/images/interior.png"
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
