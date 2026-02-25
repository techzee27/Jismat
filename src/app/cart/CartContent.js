'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '../../store/cartStore';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import PageHeader from '../../components/PageHeader';
import { Trash2 } from 'lucide-react';

export default function CartContent() {
    const { items, updateQuantity, removeItem, getCartTotal } = useCartStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <main style={{ backgroundColor: 'var(--bg-dark)', minHeight: '100vh', color: 'white' }}>
                <Navbar />
                <PageHeader title="Your Cart" subtitle="Loading your cart..." />
                <div style={{ textAlign: 'center', padding: '100px 0', minHeight: '60vh' }}>
                    <div style={{ display: 'inline-block', width: '50px', height: '50px', border: '3px solid rgba(255,255,255,0.1)', borderRadius: '50%', borderTopColor: 'var(--gold)', animation: 'spin 1s ease-in-out infinite' }}></div>
                    <style dangerouslySetInnerHTML={{
                        __html: `
                        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
                    `}} />
                </div>
                <Footer />
            </main>
        );
    }

    const subtotal = getCartTotal();
    const gst = subtotal * 0.05; // Assuming 5% GST
    const deliveryFee = subtotal > 0 ? 50 : 0;
    const grandTotal = subtotal + gst + deliveryFee;

    return (
        <main style={{ backgroundColor: 'var(--bg-dark)', minHeight: '100vh', color: 'white' }}>
            <Navbar />
            <PageHeader title="Your Cart" subtitle="Review your items before checkout" />

            <div className="container" style={{ padding: '60px 20px', maxWidth: '1200px', margin: '0 auto' }}>
                {items.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '100px 0' }}>
                        <h2 style={{ fontSize: '2rem', fontFamily: 'var(--font-heading)', color: 'var(--gold)', marginBottom: '20px' }}>Your cart is empty</h2>
                        <Link href="/menu" style={{ display: 'inline-block', backgroundColor: '#BC4A3C', color: 'white', padding: '12px 24px', borderRadius: '4px', textTransform: 'uppercase', fontWeight: 'bold' }}>
                            Explore Menu
                        </Link>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '40px' }}>
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                <thead>
                                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                        <th style={{ padding: '20px 10px', color: 'var(--text-muted)' }}>Product</th>
                                        <th style={{ padding: '20px 10px', color: 'var(--text-muted)' }}>Price</th>
                                        <th style={{ padding: '20px 10px', color: 'var(--text-muted)' }}>Quantity</th>
                                        <th style={{ padding: '20px 10px', color: 'var(--text-muted)' }}>Total</th>
                                        <th style={{ padding: '20px 10px' }}></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map((item) => (
                                        <tr key={item.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                            <td style={{ padding: '20px 10px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                                                <div style={{ width: '80px', height: '80px', minWidth: '80px', position: 'relative', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#111' }}>
                                                    <Image src={item.image} alt={item.name} fill sizes="80px" style={{ objectFit: 'cover' }} />
                                                </div>
                                                <span style={{ fontSize: '1.2rem', fontFamily: 'var(--font-heading)' }}>{item.name}</span>
                                            </td>
                                            <td style={{ padding: '20px 10px' }}>₹ {item.price}</td>
                                            <td style={{ padding: '20px 10px' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#1C1C1C', padding: '5px', borderRadius: '4px', width: 'fit-content' }}>
                                                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{ width: '30px', height: '30px', backgroundColor: '#333', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>-</button>
                                                    <span style={{ width: '20px', textAlign: 'center' }}>{item.quantity}</span>
                                                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ width: '30px', height: '30px', backgroundColor: '#333', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>+</button>
                                                </div>
                                            </td>
                                            <td style={{ padding: '20px 10px', color: 'var(--gold)', fontWeight: 'bold' }}>₹ {item.price * item.quantity}</td>
                                            <td style={{ padding: '20px 10px' }}>
                                                <button onClick={() => removeItem(item.id)} style={{ background: 'none', border: 'none', color: '#BC4A3C', cursor: 'pointer' }}>
                                                    <Trash2 size={20} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div style={{ backgroundColor: '#111', padding: '40px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', marginLeft: 'auto', width: '100%', maxWidth: '500px' }}>
                            <h3 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-heading)', marginBottom: '20px', color: 'var(--gold)', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '15px' }}>Cart Totals</h3>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                                <span style={{ color: 'var(--text-muted)' }}>Subtotal</span>
                                <span>₹ {subtotal.toFixed(2)}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                                <span style={{ color: 'var(--text-muted)' }}>GST (5%)</span>
                                <span>₹ {gst.toFixed(2)}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '20px' }}>
                                <span style={{ color: 'var(--text-muted)' }}>Delivery Fee</span>
                                <span>₹ {deliveryFee.toFixed(2)}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px', fontSize: '1.4rem', fontWeight: 'bold' }}>
                                <span>Grand Total</span>
                                <span style={{ color: 'var(--gold)' }}>₹ {grandTotal.toFixed(2)}</span>
                            </div>

                            <Link href="/checkout" style={{ display: 'block', width: '100%', textAlign: 'center', backgroundColor: '#D4AF37', color: '#111', padding: '16px', borderRadius: '4px', textTransform: 'uppercase', fontWeight: 'bold', fontSize: '1.2rem', letterSpacing: '1px' }}>
                                Proceed to Checkout
                            </Link>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </main>
    );
}
