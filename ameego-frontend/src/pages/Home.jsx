import { motion } from 'framer-motion'
import ContactSection from '../components/Contact';
import ScrollToTop from '../components/ScrollToTop';
import HeroSection from '../components/Hero';
import Navbar from '../components/Navbar';
import ServicesSection from '../components/Services';
import ProductsSection from '../components/Products';
import AboutSection from '../components/About'


function Home() {
  const fadeUp = {
    initial: { y: 30, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };
  //we can change the stats later on
  const stats = [
    { number: '50+', label: 'Projects Delivered' },
    { number: '6', label: 'Products Built' },
    { number: "12+", label: 'Happy Clients' },
  ]
  return (
    <>
      <HeroSection />
      <div id='homeStart'></div>
      <Navbar />
      <div id='serviceStart'></div>
      <AboutSection />
      <ServicesSection />
      <ProductsSection />
      <AboutSection />
      <ContactSection />
      <ScrollToTop />
    </>
  );

}

export default Home;
