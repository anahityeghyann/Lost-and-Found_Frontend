import TopBar from '../components/layout/TopBar';
import Navbar from '../components/layout/Navbar';
import Hero from '../components/home/Hero';
import FiltersBar from '../components/home/FiltersBar';
import ItemGrid from '../components/home/ItemGrid';
import Footer from '../components/layout/Footer';

export default function HomePage() {
  return (
    <div className="bg-slate-50 text-slate-800 font-sans antialiased min-h-screen">
      <TopBar />
      <Navbar />
      <Hero />
      <FiltersBar />
      <ItemGrid />
      <Footer />
    </div>
  );
}
