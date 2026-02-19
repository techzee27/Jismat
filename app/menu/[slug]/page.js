import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import SectionWrapper from '../../../components/SectionWrapper';
import Button from '../../../components/Button';
import { menuItems } from '../../../data/menuItems';
import styles from './DishDetails.module.css';
import { ArrowLeft, CheckCircle } from 'lucide-react';

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const dish = menuItems.find(item => item.slug === slug);
    if (!dish) return { title: 'Dish Not Found' };

    return {
        title: `${dish.name} | GISMAT MANDI`,
        description: dish.description,
    };
}

export default async function DishDetails({ params }) {
    const { slug } = await params;
    const dish = menuItems.find(item => item.slug === slug);

    if (!dish) {
        notFound();
    }

    return (
        <main>
            <Navbar />
            <div style={{ height: '100px' }}></div>

            <SectionWrapper>
                <Link href="/menu" className={styles.backLink}>
                    <ArrowLeft size={20} /> Back to Menu
                </Link>

                <div className={styles.container}>
                    <div className={styles.imageSection}>
                        <div className={styles.imageWrapper}>
                            <Image
                                src={dish.image}
                                alt={dish.name}
                                fill
                                priority
                                className={styles.image}
                            />
                        </div>
                    </div>

                    <div className={styles.detailsSection}>
                        <div className={styles.header}>
                            <h1 className={styles.title}>{dish.name}</h1>
                            <div className={styles.metaInfo}>
                                <span className={styles.price}>₹ {dish.price}</span>
                                {dish.serves && (
                                    <span className={styles.serving}>
                                        <span className={styles.servingIcon}>👤</span> Serves {dish.serves}
                                    </span>
                                )}
                            </div>
                        </div>

                        <p className={styles.description}>{dish.description}</p>

                        <div className={styles.ingredientsContainer}>
                            <h3 className={styles.subtitle}>Ingredients</h3>
                            <ul className={styles.ingredientsList}>
                                {dish.ingredients?.map((ingredient, index) => (
                                    <li key={index} className={styles.ingredientItem}>
                                        <CheckCircle size={16} className={styles.checkIcon} />
                                        {ingredient}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className={styles.actions}>
                            <Link href="/reservations" style={{ width: '100%' }}>
                                <Button variant="primary">Add to Reservation</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            <Footer />
        </main>
    );
}
