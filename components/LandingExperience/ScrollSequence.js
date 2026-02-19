'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Register standard GSAP plugins
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
}

// Configuration
const FRAME_COUNT = 163;
const IMAGES_BASE_PATH = '/Landing_page_hotel_scroll_frames/ezgif-frame-';

export default function ScrollSequence({ children }) {
    const containerRef = useRef(null);
    const canvasRef = useRef(null);
    const contentRef = useRef(null);
    const [images, setImages] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [loadProgress, setLoadProgress] = useState(0);

    // Preload Images
    useEffect(() => {
        const loadImages = async () => {
            const loadedImages = [];
            let loadedCount = 0;

            for (let i = 1; i <= FRAME_COUNT; i++) {
                const img = new Image();
                const formattedIndex = i.toString().padStart(3, '0');
                img.src = `${IMAGES_BASE_PATH}${formattedIndex}.jpg`;

                img.onload = () => {
                    loadedCount++;
                    setLoadProgress(Math.round((loadedCount / FRAME_COUNT) * 100));
                    if (loadedCount === FRAME_COUNT) {
                        setIsLoaded(true);
                    }
                };

                // Handle error to avoid hanging
                img.onerror = () => {
                    loadedCount++;
                    if (loadedCount === FRAME_COUNT) setIsLoaded(true);
                }

                loadedImages.push(img);
            }
            setImages(loadedImages);
        };

        loadImages();
    }, []);

    // Helper to render frame
    const renderFrame = (index, ctx, canvas) => {
        const imgIndex = Math.min(FRAME_COUNT - 1, Math.max(0, Math.round(index) - 1));
        const img = images[imgIndex];

        if (img && img.complete) {
            // High DPI handling
            const dpr = window.devicePixelRatio || 1;
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            ctx.scale(dpr, dpr);

            // "Cover" fit logic
            const width = window.innerWidth;
            const height = window.innerHeight;

            const imgRatio = img.width / img.height;
            const canvasRatio = width / height;

            let renderWidth, renderHeight, offsetX, offsetY;

            if (canvasRatio > imgRatio) {
                renderWidth = width;
                renderHeight = width / imgRatio;
                offsetX = 0;
                offsetY = (height - renderHeight) / 2;
            } else {
                renderWidth = height * imgRatio;
                renderHeight = height;
                offsetX = (width - renderWidth) / 2;
                offsetY = 0;
            }

            ctx.clearRect(0, 0, width, height);
            ctx.drawImage(img, 0, 0, img.width, img.height, offsetX, offsetY, renderWidth, renderHeight);
        }
    };

    // GSAP Scroll Animation
    useGSAP(() => {
        if (!isLoaded || images.length === 0 || !canvasRef.current || !containerRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Initial render of first frame
        renderFrame(1, ctx, canvas);

        // Animation Object
        const playhead = { frame: 1 };

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=500%", // Longer scroll for smoother feel
                pin: true,
                scrub: 1,
                anticipatePin: 1,
            }
        });

        // 1. Frame Sequence Animation
        tl.to(playhead, {
            frame: FRAME_COUNT,
            ease: "none",
            onUpdate: () => renderFrame(playhead.frame, ctx, canvas)
        });

        // 2. Text Animations (Storytelling before Hero Content)

        // Scene 1: Intro Text
        tl.to(".seq-scene-1", { opacity: 1, duration: 0.5, y: 0 }, 0.5) // Start early
            .to(".seq-scene-1", { opacity: 0, duration: 0.5, y: -20 }, 1.5);

        // Scene 2: Middle Text
        tl.fromTo(".seq-scene-2",
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5 },
            2.5
        )
            .to(".seq-scene-2", { opacity: 0, y: -20, duration: 0.5 }, 3.5);

        // 3. Final Reveal of Hero Content (passed as children)
        // Occurs differently: as we approach the end frame, we fade in the Hero Content
        // The Frame sequence finishes at t = <end of timeline>.
        // We want hero content to appear at the very end.

        tl.fromTo(contentRef.current,
            { autoAlpha: 0, y: 30 },
            { autoAlpha: 1, y: 0, duration: 1, ease: "power2.out" },
            ">-=0.5" // Overlap slightly with end of sequence
        );

    }, { scope: containerRef, dependencies: [isLoaded, images] });

    // Window resize handler
    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current && images.length > 0) {
                const ctx = canvasRef.current.getContext('2d');
                // Re-render current frame (would need state tracking, strictly speaking, 
                // but for now just let the scroll trigger update handle it on next event or frame 1)
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [images]);

    return (
        <div ref={containerRef} className="relative h-screen w-full bg-[#12141C] overflow-hidden">
            {/* Canvas Base */}
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover" />

            {/* Overlay Gradient for readability */}
            <div className="absolute inset-0 bg-black/40 pointer-events-none" />

            {/* Loading State */}
            {!isLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-[#12141C] z-50">
                    <div className="flex flex-col items-center gap-4">
                        <span className="text-[#C9A24D] text-xs tracking-[0.3em] animate-pulse">
                            PREPARING EXPERIENCE
                        </span>
                        <div className="w-48 h-[1px] bg-white/10 overflow-hidden">
                            <div
                                className="h-full bg-[#C9A24D] transition-all duration-300 ease-out"
                                style={{ width: `${loadProgress}%` }}
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Scroll Sequence Story Elements */}
            <div className="absolute inset-0 z-10 pointer-events-none flex flex-col items-center justify-center text-center">
                <div className="seq-scene-1 absolute opacity-0 translate-y-10">
                    <h2 className="text-4xl md:text-6xl text-white font-serif tracking-wide">
                        Journey Into <span className="text-[#C9A24D] italic">Tradition</span>
                    </h2>
                </div>
                <div className="seq-scene-2 absolute opacity-0 translate-y-10">
                    <h2 className="text-4xl md:text-6xl text-white font-serif tracking-wide">
                        Unveil the <span className="text-[#C9A24D] italic">Legacy</span>
                    </h2>
                </div>
            </div>

            {/* Final Hero Content (Children) */}
            <div ref={contentRef} className="absolute inset-0 z-20 flex items-center justify-center opacity-0 invisible">
                {children}
            </div>

            {/* Scroll Hint */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 text-[10px] tracking-[0.3em] uppercase animate-pulse">
                Scroll to Explore
            </div>
        </div>
    );
}
