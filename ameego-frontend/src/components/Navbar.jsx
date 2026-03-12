import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
function Navbar() {
   const LinkClass = 'cursor-pointer hover:text-blue-400 hover:bg-gray-700 px-3 py-1 rounded-md hover:scale-105 transition duration-300'
   return (

      <motion.nav
         initial={{ y: -100, opacity: 0 }}
         animate={{ y: 0, opacity: 1 }}
         transition={{ duration: 0.5 }}
         className="bg-gray-900 flex justify-between items-center px-6 py-4">
         <span className="text-2xl font-bold text-white">Ameego Labs</span>
         <div className="flex gap-6 text-white ">
            <Link className={LinkClass} to="/">Home</Link>
            <Link className={LinkClass} to="/about">About</Link>
            <span
               className={LinkClass}
               onClick={() => document.getElementById('serviceStart').scrollIntoView({ behavior: 'smooth' })}
            >
               Services
            </span>
            <Link className={LinkClass} to="/products">Products</Link>
            <Link className={LinkClass} to="/portfolio">Portfolio</Link>
            <span
               className={LinkClass}
               onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
            >
               Contact
            </span>
         </div>
      </motion.nav>
   );
}

export default Navbar;


