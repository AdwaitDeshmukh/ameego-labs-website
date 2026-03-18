import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()

  const LinkClass = 'cursor-pointer hover:text-blue-400 hover:bg-gray-700 px-3 py-1 rounded-md hover:scale-105 transition duration-300'

  // ── Scroll to a section on Home page ──────────────────────────
  // If already on Home → scroll directly
  // If on another page → go to Home first, then scroll
  const scrollToSection = (sectionId) => {
    if (location.pathname === '/') {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/')
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
      }, 300)
    }
  }

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-900 flex justify-between items-center px-6 py-4"
    >
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold text-white hover:opacity-80 transition">
        Ameego Labs
      </Link>

      {/* Links */}
      <div className="flex gap-6 text-white">
        <span className={LinkClass} onClick={() => scrollToSection('serviceStart')}>
          About
        </span>
        <span className={LinkClass} onClick={() => scrollToSection('serviceStart')}>
          Services
        </span>
        <span className={LinkClass} onClick={() => scrollToSection('serviceStart')}>
          Products
        </span>
        <span className={LinkClass} onClick={() => scrollToSection('contact')}>
          Contact
        </span>
      </div>
    </motion.nav>
  )
}

export default Navbar