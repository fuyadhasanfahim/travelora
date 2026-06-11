import Navbar from '@/components/navbar';
import Footer from '@/components/home/footer';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Navbar />
            <main>{children}</main>
            <Footer />
        </>
    );
}
