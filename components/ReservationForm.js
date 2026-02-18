'use client';

import { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import styles from './ReservationForm.module.css';

export default function ReservationForm() {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        date: '',
        time: '',
        guests: '2',
        requests: ''
    });
    const [status, setStatus] = useState('idle');
    const successRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('submitting');
        setTimeout(() => setStatus('success'), 1500);
    };

    useGSAP(() => {
        if (status === 'success' && successRef.current) {
            gsap.fromTo(successRef.current,
                { opacity: 0, scale: 0.9 },
                { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" }
            );
        }
    }, [status]);

    if (status === 'success') {
        return (
            <div
                ref={successRef}
                className={styles.successMessage}
            >
                <h3 className="text-gold mb-4 text-3xl">Reservation Received</h3>
                <p className="mb-6 text-lg text-white">Thank you, {formData.name}. We look forward to serving you.</p>
                <p className="text-muted mb-8">A confirmation has been sent to {formData.email}.</p>
                <button
                    onClick={() => setStatus('idle')}
                    className={styles.submitBtn}
                >
                    Make Another Reservation
                </button>
            </div>
        );
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.group}>
                <input
                    type="text"
                    required
                    className={styles.input}
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your Name"
                />
            </div>

            <div className={styles.group}>
                <input
                    type="email"
                    required
                    className={styles.input}
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Your Email"
                />
            </div>

            <div className={styles.group}>
                <input
                    type="tel"
                    required
                    className={styles.input}
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Phone Number"
                />
            </div>

            <div className={styles.group}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                    <input
                        type="date"
                        required
                        className={styles.input}
                        value={formData.date}
                        onChange={e => setFormData({ ...formData, date: e.target.value })}
                        placeholder="Date"
                    />
                    <input
                        type="time"
                        required
                        className={styles.input}
                        value={formData.time}
                        onChange={e => setFormData({ ...formData, time: e.target.value })}
                        placeholder="Time"
                    />
                    <select
                        className={styles.select}
                        value={formData.guests}
                        onChange={e => setFormData({ ...formData, guests: e.target.value })}
                    >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, '10+'].map(num => (
                            <option key={num} value={num}>{num} Guests</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className={styles.group}>
                <textarea
                    className={styles.textarea}
                    rows={4}
                    value={formData.requests}
                    onChange={e => setFormData({ ...formData, requests: e.target.value })}
                    placeholder="Message / Special Requests"
                />
            </div>

            <button
                type="submit"
                className={styles.submitBtn}
                disabled={status === 'submitting'}
            >
                {status === 'submitting' ? 'PROCESSING...' : 'SEND YOUR MESSAGE'}
            </button>
        </form>
    );
}
