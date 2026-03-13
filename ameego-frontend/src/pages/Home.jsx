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
      {/* <section className="bg-gray-50 min-h-screen flex flex-col  justify-center items-center relative overflow-hidden">
        <div className="relative z-10 flex flex-col items-center text-center ">
          <motion.div  {...fadeUp} transition={{ duration: 0.7, delay: 0.1 }} className='inline-flex items-center gap-2 border rounded-full px-4 py-1'>
            <span className='font-bold'>Awarded by PM of India · Digital India Initiative</span>
          </motion.div>
          <motion.div {...fadeUp} transition={{ duration: 0.7, delay: 0.3 }} className="text-5xl font-bold text-slate-900 relative">
            Building Digital Solutions that Drive Real Results
          </motion.div>
          <motion.div {...fadeUp} transition={{ duration: 0.7, delay: 0.5 }} className="text-xl text-slate-600 py-3 max-w-2xl mt-6">
            We craft web apps, mobile apps & AI powered solutions for businesses
            that want to grow
          </motion.div>
          <motion.div {...fadeUp} transition={{ duration: 0.7, delay: 0.7 }} className="flex gap-4 mt-8">
            <button className='bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-white hover:text-black transition duration-300 cursor-pointer'>Get Started</button>
            <button className='border border-blue-500 text-blue-500 px-6 py-3 rounded-lg hover:bg-white hover:text-black hover:border-white transition duration-300 cursor-pointer'>Our Work</button>
          </motion.div>
          <motion.div {...fadeUp} transition={{ duration: 0.7, delay: 0.9 }} className=' mt-16 flex gap-12'>
            {stats.map((stat, index) => (
              <div key={index} >
                <div className='text-3xl font-bold'> {stat.number} </div>
                <div className='text-sm text-slate-500 mt-1'> {stat.label} </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section> */}
      <div id='serviceStart'></div>
      <ServicesSection />
      <ProductsSection />
      <ContactSection />
      <AboutSection />
      <ScrollToTop />
    </>
  );

}

export default Home;
