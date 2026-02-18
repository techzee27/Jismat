'use client';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import PageHeader from '../../components/PageHeader';
import SectionWrapper from '../../components/SectionWrapper';
import GalleryGrid from '../../components/GalleryGrid';

export default function GalleryPage() {
    return (
        <main>
            <Navbar />
            <PageHeader title="Gallery" subtitle="A visual feast of our ambiance and culinary creations." />
            <SectionWrapper>
                <GalleryGrid />
            </SectionWrapper>
            <Footer />
        </main>
    );
}
