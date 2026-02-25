'use client';

import Link from 'next/link';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import PageHeader from '../../../components/PageHeader';
import { CheckCircle, Clock } from 'lucide-react';

export default function ConfirmationContent({ orderId, orderDetails, orderItems }) {
    if (!orderDetails) {
        return (
            <main style={{ backgroundColor: 'var(--bg-dark)', minHeight: '100vh', color: 'white' }}>
                <Navbar />
                <div style={{ textAlign: 'center', padding: '200px 20px' }}>
                    <h2 style={{ fontSize: '2rem', color: '#ffaaaa' }}>Order Not Found</h2>
                    <p style={{ marginTop: '20px' }}>We couldn't locate your order (ID: {orderId}).</p>
                    <Link href="/menu" style={{ display: 'inline-block', marginTop: '30px', backgroundColor: '#BC4A3C', padding: '10px 20px', color: 'white', borderRadius: '4px' }}>
                        Return to Menu
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main style={{ backgroundColor: 'var(--bg-dark)', minHeight: '100vh', color: 'white' }}>
            <Navbar />
            <PageHeader title="Order Confirmed" subtitle="Your order has been placed successfully." />

            <div className="container" style={{ padding: '60px 20px', maxWidth: '800px', margin: '0 auto' }}>
                <div style={{ backgroundColor: '#111', padding: '40px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>

                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                        <CheckCircle size={64} color="#D4AF37" />
                    </div>

                    <h2 style={{ fontSize: '2rem', fontFamily: 'var(--font-heading)', color: 'white', marginBottom: '10px' }}>
                        Thank You, {orderDetails.userDetails.name}!
                    </h2>

                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '40px' }}>
                        Your order <strong>#{orderId}</strong> has been confirmed.
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', textAlign: 'left', marginBottom: '40px', padding: '20px', backgroundColor: '#1a1a1a', borderRadius: '8px' }}>
                        <div>
                            <span style={{ color: 'var(--gold)', display: 'block', fontSize: '0.9rem', marginBottom: '5px' }}>Payment Status</span>
                            <strong style={{ fontSize: '1.1rem' }}>{orderDetails.paymentStatus}</strong>
                        </div>
                        <div>
                            <span style={{ color: 'var(--gold)', display: 'block', fontSize: '0.9rem', marginBottom: '5px' }}>Estimated Delivery</span>
                            <strong style={{ fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Clock size={16} /> 45 - 60 Mins
                            </strong>
                        </div>
                        <div style={{ gridColumn: '1 / -1', marginTop: '10px' }}>
                            <span style={{ color: 'var(--gold)', display: 'block', fontSize: '0.9rem', marginBottom: '5px' }}>Delivery Address</span>
                            <p style={{ color: 'var(--text-muted)', lineHeight: '1.5' }}>
                                {orderDetails.userDetails.address}, {orderDetails.userDetails.city} - {orderDetails.userDetails.pincode}
                            </p>
                        </div>
                    </div>

                    <div style={{ textAlign: 'left', padding: '20px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}>
                        <h3 style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '15px', marginBottom: '15px', color: 'var(--white)', fontFamily: 'var(--font-heading)' }}>
                            Order Summary
                        </h3>

                        {orderItems.map(item => (
                            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                <span>{item.quantity}x Dish</span>
                                <span>₹{item.price * item.quantity}</span>
                            </div>
                        ))}

                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', marginTop: '10px', color: 'var(--text-muted)' }}>
                            <span>Subtotal</span>
                            <span>₹{orderDetails.subtotal?.toFixed(2)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', color: 'var(--text-muted)' }}>
                            <span>GST (5%)</span>
                            <span>₹{orderDetails.gst?.toFixed(2)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', color: 'var(--text-muted)' }}>
                            <span>Delivery Fee</span>
                            <span>₹{orderDetails.deliveryFee?.toFixed(2)}</span>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '15px', marginTop: '15px', borderTop: '1px solid rgba(255,255,255,0.2)', fontSize: '1.3rem', fontWeight: 'bold' }}>
                            <span>Total Paid</span>
                            <span style={{ color: 'var(--gold)' }}>₹{orderDetails.totalAmount?.toFixed(2)}</span>
                        </div>
                    </div>

                    <div style={{ marginTop: '40px' }}>
                        <Link href="/" style={{ backgroundColor: 'var(--gold)', color: '#111', padding: '16px 32px', borderRadius: '4px', textTransform: 'uppercase', fontWeight: 'bold', letterSpacing: '1px', display: 'inline-block' }}>
                            Back to Home
                        </Link>
                    </div>

                </div>
            </div>

            <Footer />
        </main>
    );
}
