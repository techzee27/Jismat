'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Button from '../../../components/Button';
import { BRANCHES } from '../../../data/branches';
import styles from './DishDetails.module.css';
import { MapPin } from 'lucide-react';

import { useCartStore } from '../../../store/cartStore';

function ReservationActionInner({ dish }) {
    const searchParams = useSearchParams();
    const branchParam = searchParams.get('branch');
    const [selectedBranch, setSelectedBranch] = useState(branchParam || BRANCHES[0].id);
    const [quantity, setQuantity] = useState(1);
    const addItem = useCartStore(state => state.addItem);

    useEffect(() => {
        if (branchParam && BRANCHES.some(b => b.id === branchParam)) {
            setSelectedBranch(branchParam);
        }
    }, [branchParam]);

    return (
        <div className={styles.actionGrid} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '20px', width: '100%' }}>

            {/* Order Delivery Box */}
            <div className={styles.reservationActionContainer} style={{ padding: '24px', backgroundColor: 'rgba(212, 175, 55, 0.02)', borderRadius: '12px', border: '1px solid rgba(212, 175, 55, 0.3)', display: 'flex', flexDirection: 'column' }}>
                <h4 style={{ marginBottom: '20px', color: '#D4AF37', fontSize: '1.4rem', fontFamily: 'var(--font-heading)' }}>Order for Delivery</h4>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', backgroundColor: '#1C1C1C', padding: '14px', borderRadius: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <button
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            style={{ width: '36px', height: '36px', backgroundColor: '#333', color: 'white', border: 'none', borderRadius: '4px', fontSize: '1.2rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >-</button>
                        <span style={{ fontSize: '1.1rem', color: 'white', minWidth: '30px', textAlign: 'center' }}>{quantity}</span>
                        <button
                            onClick={() => setQuantity(quantity + 1)}
                            style={{ width: '36px', height: '36px', backgroundColor: '#333', color: 'white', border: 'none', borderRadius: '4px', fontSize: '1.2rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >+</button>
                    </div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'white' }}>
                        ₹ {dish?.price ? dish.price * quantity : 0}
                    </div>
                </div>

                <div style={{ marginTop: 'auto' }}>
                    <button
                        onClick={() => {
                            if (dish) {
                                addItem(dish, quantity);
                                alert('Added to Cart!');
                            }
                        }}
                        style={{
                            width: '100%',
                            backgroundColor: '#D4AF37',
                            color: '#111',
                            padding: '16px',
                            borderRadius: '6px',
                            border: 'none',
                            fontWeight: '800',
                            fontSize: '1.1rem',
                            textTransform: 'uppercase',
                            cursor: 'pointer',
                            letterSpacing: '0.5px'
                        }}>
                        Add to Cart
                    </button>
                </div>
            </div>

            {/* Reservation Box */}
            <div className={styles.reservationActionContainer} style={{ padding: '24px', backgroundColor: 'rgba(212, 175, 55, 0.02)', borderRadius: '12px', border: '1px solid rgba(212, 175, 55, 0.3)', display: 'flex', flexDirection: 'column' }}>
                <h4 style={{ marginBottom: '20px', color: '#D4AF37', fontSize: '1.4rem', fontFamily: 'var(--font-heading)' }}>Reserve this Dish</h4>

                <div style={{ marginBottom: '24px' }}>
                    <label htmlFor="branch-select" style={{ display: 'block', marginBottom: '10px', color: 'white', fontSize: '1rem' }}>
                        Select Branch Setting
                    </label>
                    <select
                        id="branch-select"
                        value={selectedBranch}
                        onChange={(e) => setSelectedBranch(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '14px',
                            backgroundColor: '#1C1C1C',
                            color: 'white',
                            border: '1px solid #333',
                            borderRadius: '6px',
                            outline: 'none',
                            fontSize: '1.05rem',
                            cursor: 'pointer',
                            appearance: 'none',
                            backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'right 16px center',
                            backgroundSize: '16px'
                        }}
                    >
                        {BRANCHES.map(branch => (
                            <option key={branch.id} value={branch.id}>
                                {branch.area}, {branch.city}
                            </option>
                        ))}
                    </select>
                    {selectedBranch && (
                        <p style={{ marginTop: '12px', fontSize: '0.95rem', color: '#888', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <MapPin size={16} color="#BC4A3C" />
                            {BRANCHES.find(b => b.id === selectedBranch)?.address}
                        </p>
                    )}
                </div>

                <div style={{ display: 'flex', gap: '16px', flexDirection: 'column', marginTop: 'auto' }}>
                    <Link href={`/reservations?dish=${encodeURIComponent(dish?.name || '')}&branch=${selectedBranch}`} style={{ width: '100%', display: 'block' }}>
                        <button style={{
                            width: '100%',
                            backgroundColor: '#BC4A3C',
                            color: '#111',
                            padding: '16px',
                            borderRadius: '6px',
                            border: 'none',
                            fontWeight: '800',
                            fontSize: '1.1rem',
                            textTransform: 'uppercase',
                            cursor: 'pointer',
                            letterSpacing: '0.5px'
                        }}>
                            Add to Reservation
                        </button>
                    </Link>
                </div>
            </div>

        </div>
    );
}

export default function ReservationAction({ dish }) {
    return (
        <Suspense fallback={<div style={{ padding: '24px', backgroundColor: '#1C1C1C', borderRadius: '12px' }}>Loading...</div>}>
            <ReservationActionInner dish={dish} />
        </Suspense>
    );
}
