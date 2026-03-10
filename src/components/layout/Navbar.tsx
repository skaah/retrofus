'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Menu,
  X,
  Sun,
  Moon,
  Shield,
  Sword,
  Castle,
  ScrollText,
  Trophy,
  Hammer,
  Users,
  MapPin,
} from 'lucide-react';
import { useThemeContext } from './ThemeProvider';

const navLinks = [
  { href: '/equipements', label: 'Equipements', icon: Shield },
  { href: '/armes', label: 'Armes', icon: Sword },
  { href: '/donjons', label: 'Donjons', icon: Castle },
  { href: '/quetes', label: 'Quetes', icon: ScrollText },
  { href: '/succes', label: 'Succes', icon: Trophy },
  { href: '/metiers', label: 'Metiers', icon: Hammer },
  { href: '/classes', label: 'Classes', icon: Users },
  { href: '/drops', label: 'Drops', icon: MapPin },
];

const menuVariants = {
  closed: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.3,
      ease: 'easeInOut' as const,
    },
  },
  open: {
    opacity: 1,
    height: 'auto',
    transition: {
      duration: 0.3,
      ease: 'easeInOut' as const,
    },
  },
};

const linkVariants = {
  closed: { opacity: 0, x: -20 },
  open: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.3,
    },
  }),
};

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { theme, toggleTheme } = useThemeContext();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/5 dark:bg-black/20 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Shield className="w-8 h-8 text-dofus-gold" />
            <span className="text-xl font-bold bg-gradient-to-r from-dofus-gold to-yellow-300 bg-clip-text text-transparent">
              Retrofus
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-300 dark:text-gray-300 hover:text-dofus-gold dark:hover:text-dofus-gold hover:bg-white/5 dark:hover:bg-white/5 transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Search + Theme Toggle + Mobile Menu Button */}
          <div className="flex items-center gap-3">
            {/* Search Bar */}
            <div className="hidden sm:flex items-center relative">
              <Search className="absolute left-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-48 lg:w-56 pl-9 pr-4 py-2 rounded-lg bg-white/5 dark:bg-white/5 border border-white/10 text-sm text-gray-200 dark:text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-dofus-gold/50 focus:border-dofus-gold/50 transition-all duration-200"
              />
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-white/5 dark:bg-white/5 border border-white/10 hover:bg-white/10 dark:hover:bg-white/10 transition-all duration-200"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-blue-400" />
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-white/5 dark:bg-white/5 border border-white/10 hover:bg-white/10 dark:hover:bg-white/10 transition-all duration-200"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-gray-300" />
              ) : (
                <Menu className="w-5 h-5 text-gray-300" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="lg:hidden overflow-hidden backdrop-blur-xl bg-white/5 dark:bg-black/30 border-t border-white/10"
          >
            <div className="px-4 py-4 space-y-1">
              {/* Mobile Search */}
              <div className="flex items-center relative mb-4 sm:hidden">
                <Search className="absolute left-3 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-lg bg-white/5 dark:bg-white/5 border border-white/10 text-sm text-gray-200 dark:text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-dofus-gold/50 focus:border-dofus-gold/50 transition-all duration-200"
                />
              </div>

              {navLinks.map((link, i) => {
                const Icon = link.icon;
                return (
                  <motion.div
                    key={link.href}
                    variants={linkVariants}
                    custom={i}
                    initial="closed"
                    animate="open"
                    exit="closed"
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 dark:text-gray-300 hover:text-dofus-gold dark:hover:text-dofus-gold hover:bg-white/5 dark:hover:bg-white/5 transition-all duration-200"
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{link.label}</span>
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
