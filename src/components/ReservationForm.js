'use client';

import { useState, useRef, Suspense, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useSearchParams } from 'next/navigation';
import Script from 'next/script';
import styles from './ReservationForm.module.css';

function ReservationFormInner() {
    const searchParams = useSearchParams();
    const dishParam = searchParams.get('dish');

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        date: '',
        time: '',
        guests: '2',
        requests: '',
        advancePayment: ''
    });

    const typeParam = searchParams.get('type');
    const minAdvance = typeParam === 'order' || dishParam ? 1000 : 500;

    useEffect(() => {
        if (dishParam) {
            setFormData(prev => {
                const message = `I would like to order: ${dishParam}`;
                if (!prev.requests.includes(dishParam)) {
                    return {
                        ...prev,
                        requests: prev.requests ? `${prev.requests}\n${message}` : message
                    }
                }
                return prev;
            });
        }
    }, [dishParam]);

    const [status, setStatus] = useState('idle'); // idle, submitting, success, error
    const [errorMsg, setErrorMsg] = useState('');
    const successRef = useRef(null);

    const handlePaymentSuccess = async (response, reservationId) => {
        try {
            const verifyRes = await fetch('/api/reservations/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    reservationId: reservationId,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature
                })
            });

            const verifyData = await verifyRes.json();
            if (verifyData.success) {
                setStatus('success');
            } else {
                setErrorMsg(verifyData.message || 'Payment verification failed');
                setStatus('error');
            }
        } catch (error) {
            setErrorMsg('Payment verification failed due to server error.');
            setStatus('error');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');
        setErrorMsg('');

        try {
            const res = await fetch('/api/reservations/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    formData,
                    amount: formData.advancePayment
                })
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Error initiate payment');
            }

            if (!window.Razorpay) {
                throw new Error('Razorpay script not loaded');
            }

            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_mockkey',
                amount: parseInt(formData.advancePayment) * 100,
                currency: "INR",
                name: "GISMAT MANDI",
                description: "Reservation Advance Payment",
                order_id: data.razorpayOrder ? data.razorpayOrder.id : undefined,
                handler: function (response) {
                    handlePaymentSuccess(response, data.reservationId);
                },
                prefill: {
                    name: formData.name,
                    email: formData.email,
                    contact: formData.phone
                },
                theme: {
                    color: "#D4AF37"
                },
                modal: {
                    ondismiss: function () {
                        setStatus('idle');
                        setErrorMsg('Payment cancelled by user');
                    }
                }
            };

            const ext = new window.Razorpay(options);
            ext.open();

        } catch (err) {
            console.error(err);
            setErrorMsg(err.message || 'Something went wrong. Please try again.');
            setStatus('error');
        }
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
            <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
            {dishParam && (
                <div style={{ padding: '15px', backgroundColor: 'rgba(212, 175, 55, 0.1)', border: '1px solid #D4AF37', borderRadius: '5px', marginBottom: '20px' }}>
                    <p style={{ color: '#D4AF37', margin: 0, fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span>🍽️</span> <strong>Pre-ordered Dish:</strong> {dishParam}
                    </p>
                </div>
            )}

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

            <div className={styles.group}>
                <label style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem', marginBottom: '8px', display: 'block' }}>
                    Advance Payment Amount (Min ₹{minAdvance})
                </label>
                <input
                    type="number"
                    min={minAdvance}
                    required
                    className={styles.input}
                    value={formData.advancePayment}
                    onChange={e => setFormData({ ...formData, advancePayment: e.target.value })}
                    placeholder={`Advance Amount (Min ₹${minAdvance})`}
                />
            </div>

            {errorMsg && (
                <div style={{ padding: '12px', backgroundColor: 'rgba(255, 0, 0, 0.1)', border: '1px solid red', color: '#ffaaaa', borderRadius: '4px', marginBottom: '20px', textAlign: 'center' }}>
                    {errorMsg}
                </div>
            )}

            <button
                type="submit"
                className={styles.submitBtn}
                disabled={status === 'submitting'}
            >
                {status === 'submitting' ? 'PROCESSING...' : 'BOOK YOUR TABLE'}
            </button>
        </form>
    );
}

export default function ReservationForm() {
    return (
        <Suspense fallback={<div>Loading form...</div>}>
            <ReservationFormInner />
        </Suspense>
    );
}
