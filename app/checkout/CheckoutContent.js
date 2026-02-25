'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Script from 'next/script';
import { useCartStore } from '../../store/cartStore';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import PageHeader from '../../components/PageHeader';

export default function CheckoutContent() {
    const router = useRouter();
    const { items, getCartTotal, clearCart } = useCartStore();
    const [mounted, setMounted] = useState(false);
    const [status, setStatus] = useState('idle'); // idle, processing, error, success
    const [errorMsg, setErrorMsg] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
        city: '',
        pincode: '',
        notes: '',
        paymentMethod: 'cod'
    });

    useEffect(() => {
        setMounted(true);
        if (items.length === 0) {
            router.push('/cart');
        }
    }, [items.length, router]);

    if (!mounted || items.length === 0) return null;

    const subtotal = getCartTotal();
    const gst = subtotal * 0.05;
    const deliveryFee = subtotal > 0 ? 50 : 0;
    const grandTotal = subtotal + gst + deliveryFee;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePaymentSuccess = async (response, orderId) => {
        try {
            const verifyRes = await fetch('/api/payment/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    orderId: orderId,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature
                })
            });

            const verifyData = await verifyRes.json();
            if (verifyData.success) {
                clearCart();
                router.push(`/confirmation/${orderId}`);
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
        setStatus('processing');
        setErrorMsg('');

        try {
            const res = await fetch('/api/orders/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userDetails: {
                        name: formData.name,
                        phone: formData.phone,
                        address: formData.address,
                        city: formData.city,
                        pincode: formData.pincode,
                        notes: formData.notes
                    },
                    items,
                    subtotal,
                    gst,
                    deliveryFee,
                    grandTotal,
                    paymentMethod: formData.paymentMethod
                })
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Error creating order');
            }

            if (formData.paymentMethod === 'cod') {
                clearCart();
                router.push(`/confirmation/${data.orderId}`);
            } else if (formData.paymentMethod === 'online') {
                if (!window.Razorpay) {
                    throw new Error('Razorpay script not loaded');
                }

                const options = {
                    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_mockkey', // Should match backend or use env
                    amount: grandTotal * 100,
                    currency: "INR",
                    name: "GISMAT MANDI",
                    description: "Order Payment",
                    order_id: data.razorpayOrder ? data.razorpayOrder.id : undefined, // Backend generated razorpay order ID
                    handler: function (response) {
                        handlePaymentSuccess(response, data.orderId);
                    },
                    prefill: {
                        name: formData.name,
                        contact: formData.phone
                    },
                    theme: {
                        color: "#BC4A3C"
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

                // Keep status processing so user doesn't double click
                // It will be reset if dismissed, or verified if success
            }
        } catch (err) {
            console.error(err);
            setErrorMsg(err.message || 'Something went wrong. Please try again.');
            setStatus('error');
        }
    };

    // Form input style for consistency
    const inputStyle = {
        width: '100%', padding: '12px 16px', backgroundColor: '#1C1C1C', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '4px', fontSize: '1rem', outline: 'none', marginBottom: '15px'
    };

    return (
        <main style={{ backgroundColor: 'var(--bg-dark)', minHeight: '100vh', color: 'white' }}>
            <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
            <Navbar />
            <PageHeader title="Checkout" subtitle="Complete your details securely." />

            <div className="container" style={{ padding: '60px 20px', maxWidth: '1200px', margin: '0 auto' }}>
                <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.5fr) minmax(0, 1fr)', gap: '40px' }}>

                    {/* Left Column: Details & Payment Selection */}
                    <div>
                        <div style={{ backgroundColor: '#111', padding: '30px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '30px' }}>
                            <h3 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-heading)', color: 'var(--gold)', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' }}>
                                Section 1 - User Details
                            </h3>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 15px' }}>
                                <input required style={inputStyle} type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleInputChange} />
                                <input required style={inputStyle} type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleInputChange} />
                            </div>
                            <input required style={inputStyle} type="text" name="address" placeholder="Delivery Address" value={formData.address} onChange={handleInputChange} />
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 15px' }}>
                                <input required style={inputStyle} type="text" name="city" placeholder="City" value={formData.city} onChange={handleInputChange} />
                                <input required style={inputStyle} type="text" name="pincode" placeholder="Pincode" value={formData.pincode} onChange={handleInputChange} />
                            </div>
                            <textarea style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }} name="notes" placeholder="Delivery Notes (Optional)" value={formData.notes} onChange={handleInputChange} />
                        </div>

                        <div style={{ backgroundColor: '#111', padding: '30px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <h3 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-heading)', color: 'var(--gold)', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' }}>
                                Section 2 - Payment Method
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '15px', backgroundColor: formData.paymentMethod === 'cod' ? 'rgba(212, 175, 55, 0.1)' : '#1C1C1C', border: `1px solid ${formData.paymentMethod === 'cod' ? '#D4AF37' : 'rgba(255,255,255,0.1)'}`, borderRadius: '4px', cursor: 'pointer' }}>
                                    <input type="radio" name="paymentMethod" value="cod" checked={formData.paymentMethod === 'cod'} onChange={handleInputChange} style={{ accentColor: '#D4AF37', width: '20px', height: '20px' }} />
                                    <span style={{ fontSize: '1.1rem' }}>Cash on Delivery</span>
                                </label>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '15px', backgroundColor: formData.paymentMethod === 'online' ? 'rgba(212, 175, 55, 0.1)' : '#1C1C1C', border: `1px solid ${formData.paymentMethod === 'online' ? '#D4AF37' : 'rgba(255,255,255,0.1)'}`, borderRadius: '4px', cursor: 'pointer' }}>
                                    <input type="radio" name="paymentMethod" value="online" checked={formData.paymentMethod === 'online'} onChange={handleInputChange} style={{ accentColor: '#D4AF37', width: '20px', height: '20px' }} />
                                    <span style={{ fontSize: '1.1rem' }}>Online Payment (Razorpay)</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Order Summary */}
                    <div>
                        <div style={{ backgroundColor: '#111', padding: '30px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', position: 'sticky', top: '100px' }}>
                            <h3 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-heading)', color: 'var(--gold)', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' }}>
                                Order Summary
                            </h3>

                            <div style={{ marginBottom: '20px', maxHeight: '300px', overflowY: 'auto' }}>
                                {items.map(item => (
                                    <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', fontSize: '0.95rem' }}>
                                        <span style={{ color: 'var(--text-muted)' }}>{item.quantity}x {item.name}</span>
                                        <span>₹ {item.price * item.quantity}</span>
                                    </div>
                                ))}
                            </div>

                            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px', marginBottom: '20px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                    <span style={{ color: 'var(--text-muted)' }}>Subtotal</span>
                                    <span>₹ {subtotal.toFixed(2)}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                    <span style={{ color: 'var(--text-muted)' }}>GST (5%)</span>
                                    <span>₹ {gst.toFixed(2)}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                    <span style={{ color: 'var(--text-muted)' }}>Delivery Fee</span>
                                    <span>₹ {deliveryFee.toFixed(2)}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)', fontSize: '1.4rem', fontWeight: 'bold' }}>
                                    <span>Grand Total</span>
                                    <span style={{ color: 'var(--gold)' }}>₹ {grandTotal.toFixed(2)}</span>
                                </div>
                            </div>

                            {errorMsg && (
                                <div style={{ padding: '12px', backgroundColor: 'rgba(255, 0, 0, 0.1)', border: '1px solid red', color: '#ffaaaa', borderRadius: '4px', marginBottom: '20px', textAlign: 'center' }}>
                                    {errorMsg}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={status === 'processing'}
                                style={{
                                    width: '100%', backgroundColor: status === 'processing' ? '#666' : '#BC4A3C', color: 'white', padding: '16px', borderRadius: '4px', textTransform: 'uppercase', fontWeight: 'bold', fontSize: '1.1rem', letterSpacing: '1px', border: 'none', cursor: status === 'processing' ? 'not-allowed' : 'pointer', transition: 'all 0.3s'
                                }}
                            >
                                {status === 'processing' ? 'Processing...' : `Place Order (₹${grandTotal.toFixed(0)})`}
                            </button>
                        </div>
                    </div>

                </form>
            </div>
            <Footer />
        </main>
    );
}
