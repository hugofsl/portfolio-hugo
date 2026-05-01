import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, User, Briefcase, Mail, Menu, X, ArrowRight } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const navLinks = [
    { name: 'Início', path: '/', icon: <Terminal size={18} /> },
    { name: 'Sobre', path: '/about', icon: <User size={18} /> },
    { name: 'Projetos', path: '/projects', icon: <Briefcase size={18} /> },
    { name: 'Contato', path: '/contact', icon: <Mail size={18} /> },
  ];

  return (
    <nav className="fixed top-0 w-full bg-slate-950/80 backdrop-blur-md border-b border-slate-800 z-[100]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-slate-50 relative z-[110]">
            <span className="text-blue-500">&lt;</span>
            Hugo.Lourenço
            <span className="text-blue-500">/&gt;</span>
          </Link>

          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path || (link.path === '/projects' && location.pathname.startsWith('/projects'));
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`flex items-center gap-2 text-sm font-medium transition-all duration-300 relative group ${
                    isActive ? 'text-blue-400' : 'text-slate-400 hover:text-slate-50'
                  }`}
                >
                  {link.icon}
                  {link.name}
                  {isActive && (
                    <motion.div 
                      layoutId="navbar-underline"
                      className="absolute -bottom-[21px] left-0 right-0 h-0.5 bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"
                    />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="md:hidden flex items-center relative z-[110]">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-400 hover:text-slate-50 transition-colors focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 h-screen bg-slate-950 z-[105] flex flex-col pt-24 px-6 md:hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px] -z-10"></div>
            
            <div className="flex flex-col space-y-4">
              {navLinks.map((link, index) => {
                const isActive = location.pathname === link.path || (link.path === '/projects' && location.pathname.startsWith('/projects'));
                return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={link.path}
                      className={`flex items-center justify-between p-4 rounded-xl border ${
                        isActive 
                          ? 'bg-blue-600/10 border-blue-500/50 text-blue-400' 
                          : 'bg-slate-900/50 border-slate-800 text-slate-400'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <span className={isActive ? 'text-blue-400' : 'text-slate-500'}>
                          {link.icon}
                        </span>
                        <span className="text-lg font-bold tracking-tight">{link.name}</span>
                      </div>
                      <ArrowRight size={18} className={isActive ? 'opacity-100' : 'opacity-0'} />
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}