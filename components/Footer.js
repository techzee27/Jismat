import Link from 'next/link';
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail, Clock } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.footerContent}`}>
                <div className={styles.column}>
                    <h3 className={styles.logo}>GISMAT MANDI</h3>
                    <p className={styles.description}>
                        Experience the authentic taste of Yemen with our premium Mandi dishes, prepared with traditional spices and passion.
                    </p>
                    <div className={styles.socials}>
                        <Link href="#" className={styles.socialLink}><Facebook size={20} /></Link>
                        <Link href="#" className={styles.socialLink}><Instagram size={20} /></Link>
                        <Link href="#" className={styles.socialLink}><Twitter size={20} /></Link>
                    </div>
                </div>

                <div className={styles.column}>
                    <h4 className={styles.heading}>Quick Links</h4>
                    <ul className={styles.links}>
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/menu">Menu</Link></li>
                        <li><Link href="/reservations">Reservations</Link></li>
                        <li><Link href="/about">Our Story</Link></li>
                        <li><Link href="/contact">Contact</Link></li>
                    </ul>
                </div>

                <div className={styles.column}>
                    <h4 className={styles.heading}>Contact Us</h4>
                    <div className={styles.contactItem}>
                        <MapPin size={18} className={styles.icon} />
                        <span>123 Culinary Avenue, Food District, Dubai</span>
                    </div>
                    <div className={styles.contactItem}>
                        <Phone size={18} className={styles.icon} />
                        <span>+971 4 123 4567</span>
                    </div>
                    <div className={styles.contactItem}>
                        <Mail size={18} className={styles.icon} />
                        <span>info@gismatmandi.com</span>
                    </div>
                </div>

                <div className={styles.column}>
                    <h4 className={styles.heading}>Opening Hours</h4>
                    <div className={styles.contactItem}>
                        <Clock size={18} className={styles.icon} />
                        <span>Daily: 11:00 AM - 12:00 AM</span>
                    </div>
                    <p className={styles.subtext}>Friday: 1:00 PM - 1:00 AM</p>
                </div>
            </div>

            <div className={styles.copyright}>
                <div className="container text-center">
                    <p>&copy; {new Date().getFullYear()} GISMAT MANDI. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
