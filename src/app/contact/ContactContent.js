'use client';
import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import PageHeader from '../../components/PageHeader';
import SectionWrapper from '../../components/SectionWrapper';
import Image from 'next/image';
import Button from '../../components/Button';
import { Mail, Phone, MapPin } from 'lucide-react';
import styles from './Contact.module.css';

export default function ContactPage() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <main>
            <Navbar />
            <PageHeader title="Contact Us" subtitle="We'd love to hear from you." />
            <SectionWrapper>
                <div className={styles.container}>
                    <div className={styles.infoColumn}>
                        <h2 className="text-gold mb-6">Get In Touch</h2>
                        <div className={styles.infoItems}>
                            <div className={styles.infoItem}>
                                <div className={styles.iconBox}>
                                    <Phone color="var(--gold)" />
                                </div>
                                <div>
                                    <h3 className="text-white text-xl">Phone</h3>
                                    <p className="text-muted">+971 4 123 4567</p>
                                </div>
                            </div>
                            <div className={styles.infoItem}>
                                <div className={styles.iconBox}>
                                    <Mail color="var(--gold)" />
                                </div>
                                <div>
                                    <h3 className="text-white text-xl">Email</h3>
                                    <p className="text-muted">info@gismatmandi.com</p>
                                </div>
                            </div>
                            <div className={styles.infoItem}>
                                <div className={styles.iconBox}>
                                    <MapPin color="var(--gold)" />
                                </div>
                                <div>
                                    <h3 className="text-white text-xl">Location</h3>
                                    <p className="text-muted">123 Culinary Avenue, Food District, Dubai</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.formColumn}>
                        {submitted ? (
                            <div className={styles.successMessage}>
                                <h3 className="text-gold text-2xl mb-4">Message Sent</h3>
                                <p className="text-muted">Thank you for reaching out. We will get back to you shortly.</p>
                                <div className="mt-8" style={{ marginTop: '2rem' }}>
                                    <Button onClick={() => setSubmitted(false)} variant="outline">Send Another</Button>
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className={styles.form}>
                                <h3 className="text-white text-2xl mb-6">Send a Message</h3>
                                <input type="text" placeholder="Name" className={styles.input} required />
                                <input type="email" placeholder="Email" className={styles.input} required />
                                <textarea rows={5} placeholder="Message" className={styles.textarea} required></textarea>
                                <Button type="submit" variant="primary">Send Message</Button>
                            </form>
                        )}
                    </div>
                </div>
            </SectionWrapper>
            <Footer />
        </main>
    );
}
