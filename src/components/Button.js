'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import styles from './Button.module.css';

export default function Button({ children, variant = 'primary', onClick, className = '', type = 'button' }) {
    const buttonRef = useRef(null);
    const { contextSafe } = useGSAP({ scope: buttonRef });

    const baseStyle = styles.button;
    const variantStyle = styles[variant];

    const handleMouseEnter = contextSafe(() => {
        gsap.to(buttonRef.current, { scale: 1.05, duration: 0.2, ease: "power1.out" });
    });

    const handleMouseLeave = contextSafe(() => {
        gsap.to(buttonRef.current, { scale: 1, duration: 0.2, ease: "power1.out" });
    });

    const handleMouseDown = contextSafe(() => {
        gsap.to(buttonRef.current, { scale: 0.95, duration: 0.1 });
    });

    const handleMouseUp = contextSafe(() => {
        gsap.to(buttonRef.current, { scale: 1.05, duration: 0.1 });
    });

    return (
        <button
            ref={buttonRef}
            className={`${baseStyle} ${variantStyle} ${className}`}
            onClick={onClick}
            type={type}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
        >
            {children}
        </button>
    );
}
