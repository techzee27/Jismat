'use client';
import { useRef, useState } from 'react';
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

const BRANCHES = [
    {
        id: 'jubilee', city: 'Hyderabad', area: 'Jubilee Hills', address: 'Road No. 36, Shrestha Aura.',
        mapQuery: 'Jismat Mandi Jubilee Hills Hyderabad',
        lunchTime: '12:00 pm - 4:00 pm', dinnerTime: '7:00 pm - 12:00 am',
        phone: '+91 98765 43210', email: 'jubilee@jismatmandi.com'
    },
    {
        id: 'dilsukhnagar', city: 'Hyderabad', area: 'Dilsukhnagar', address: 'VR Colony, Kamala Nagar.',
        mapQuery: 'Jismat Jail Mandi Dilsukhnagar Hyderabad',
        lunchTime: '12:00 pm - 4:00 pm', dinnerTime: '7:00 pm - 11:30 pm',
        phone: '+91 98765 43211', email: 'dilsukhnagar@jismatmandi.com'
    },
    {
        id: 'kukatpally', city: 'Hyderabad', area: 'Kukatpally', address: '2nd Floor, PNR Enclave, beside Kalamandir.',
        mapQuery: 'Jismat Mandi Kukatpally Hyderabad',
        lunchTime: '11:30 am - 3:30 pm', dinnerTime: '6:30 pm - 11:30 pm',
        phone: '+91 98765 43212', email: 'kukatpally@jismatmandi.com'
    },
    {
        id: 'asrao', city: 'Hyderabad', area: 'AS Rao Nagar / Kapra', address: '3rd Floor, Dr. AS Rao Nagar Rd.',
        mapQuery: 'Jismat Mandi AS Rao Nagar Hyderabad',
        lunchTime: '12:00 pm - 4:00 pm', dinnerTime: '7:00 pm - 11:30 pm',
        phone: '+91 98765 43213', email: 'asrao@jismatmandi.com'
    },
    {
        id: 'ameerpet', city: 'Hyderabad', area: 'Ameerpet', address: 'PNR Enclave, Pillar No. 1072.',
        mapQuery: 'Jismat Mandi Ameerpet Hyderabad',
        lunchTime: '11:30 am - 4:00 pm', dinnerTime: '6:30 pm - 11:30 pm',
        phone: '+91 98765 43214', email: 'ameerpet@jismatmandi.com'
    },
    {
        id: 'kondapur', city: 'Hyderabad', area: 'Kondapur', address: '3rd Floor, Nagarjuna Ikon, above Croma.',
        mapQuery: 'Jismat Mandi Kondapur Hyderabad',
        lunchTime: '12:00 pm - 4:30 pm', dinnerTime: '7:00 pm - 12:00 am',
        phone: '+91 98765 43215', email: 'kondapur@jismatmandi.com'
    },
    {
        id: 'madinaguda', city: 'Hyderabad', area: 'Madinaguda', address: 'Above Croma Showroom, near Deepthisri Nagar.',
        mapQuery: 'Jismat Mandi Madinaguda Hyderabad',
        lunchTime: '12:00 pm - 4:00 pm', dinnerTime: '7:00 pm - 11:30 pm',
        phone: '+91 98765 43216', email: 'madinaguda@jismatmandi.com'
    },
    {
        id: 'pragathi', city: 'Hyderabad', area: 'Pragathi Nagar', address: 'Near More Super Market.',
        mapQuery: 'Jismat Mandi Pragathi Nagar Hyderabad',
        lunchTime: '12:00 pm - 4:00 pm', dinnerTime: '7:00 pm - 11:30 pm',
        phone: '+91 98765 43217', email: 'pragathi@jismatmandi.com'
    },
    {
        id: 'madhapur', city: 'Hyderabad', area: 'Madhapur', address: 'Kaithalapoor.',
        mapQuery: 'Kaithalapoor Madhapur Hyderabad',
        lunchTime: '11:00 am - 3:00 pm', dinnerTime: '6:00 pm - 11:00 pm',
        phone: '+91 98765 43218', email: 'madhapur@jismatmandi.com'
    },
    {
        id: 'vijayawada', city: 'Andhra Pradesh', area: 'Vijayawada', address: '1st Floor, KBR Heights, Labbipet.',
        mapQuery: 'Jismat Mandi Vijayawada',
        lunchTime: '11:30 am - 4:00 pm', dinnerTime: '6:30 pm - 11:30 pm',
        phone: '+91 98765 43219', email: 'vijayawada@jismatmandi.com'
    },
    {
        id: 'vizag', city: 'Andhra Pradesh', area: 'Visakhapatnam', address: '1st Floor, Annapurna Nilayam, Lawsons Bay Colony.',
        mapQuery: 'Jismat Mandi Visakhapatnam',
        lunchTime: '12:00 pm - 4:30 pm', dinnerTime: '7:00 pm - 11:30 pm',
        phone: '+91 98765 43220', email: 'vizag@jismatmandi.com'
    },
    {
        id: 'guntur', city: 'Andhra Pradesh', area: 'Guntur', address: 'Lakshmipuram Main Road.',
        mapQuery: 'Jismat Mandi Guntur',
        lunchTime: '11:30 am - 3:30 pm', dinnerTime: '6:30 pm - 11:00 pm',
        phone: '+91 98765 43221', email: 'guntur@jismatmandi.com'
    },
    {
        id: 'nellore', city: 'Andhra Pradesh', area: 'Nellore', address: 'Main city area.',
        mapQuery: 'Jismat Mandi Nellore',
        lunchTime: '11:30 am - 4:00 pm', dinnerTime: '6:30 pm - 11:30 pm',
        phone: '+91 98765 43222', email: 'nellore@jismatmandi.com'
    },
    {
        id: 'tenali', city: 'Andhra Pradesh', area: 'Tenali', address: 'Regional expansion.',
        mapQuery: 'Jismat Mandi Tenali',
        lunchTime: '11:30 am - 3:30 pm', dinnerTime: '6:30 pm - 11:00 pm',
        phone: '+91 98765 43223', email: 'tenali@jismatmandi.com'
    },
    {
        id: 'bangalore', city: 'Karnataka', area: 'Bangalore (Marathahalli)', address: '2nd/3rd Floor, Venkatadri Plaza, ORR.',
        mapQuery: 'Jismat Mandi Marathahalli Bangalore',
        lunchTime: '12:00 pm - 4:30 pm', dinnerTime: '7:00 pm - 12:00 am',
        phone: '+91 98765 43224', email: 'bangalore@jismatmandi.com'
    },
];

export default function ReservationsPage() {
    const containerRef = useRef(null);
    const [activeBranch, setActiveBranch] = useState(BRANCHES[0]);

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
