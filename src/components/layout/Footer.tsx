'use client';

import Link from 'next/link';
import {
  Shield,
  Sword,
  Castle,
  ScrollText,
  Trophy,
  Hammer,
  Users,
  MapPin,
  ExternalLink,
} from 'lucide-react';

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

const sources = [
  { href: 'https://nokazu.com', label: 'Nokazu' },
  { href: 'https://solomonk.fr', label: 'Solomonk' },
  { href: 'https://dotrofus.com', label: 'DOTOfus' },
  { href: 'https://barbok.fr', label: 'Barbok' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-20 backdrop-blur-xl bg-white/5 dark:bg-black/20 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Logo & Description */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Shield className="w-8 h-8 text-dofus-gold" />
              <span className="text-xl font-bold bg-gradient-to-r from-dofus-gold to-yellow-300 bg-clip-text text-transparent">
                Retrofus
              </span>
            </Link>
            <p className="text-sm text-gray-400 dark:text-gray-400 leading-relaxed max-w-sm">
              L&apos;encyclopedie de reference pour Dofus Retro 1.29.
              Retrouvez toutes les informations sur les equipements, armes,
              donjons, quetes et bien plus encore.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-dofus-gold uppercase tracking-wider mb-4">
              Liens rapides
            </h3>
            <ul className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-400 hover:text-dofus-gold dark:hover:text-dofus-gold transition-colors duration-200"
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Sources */}
          <div>
            <h3 className="text-sm font-semibold text-dofus-gold uppercase tracking-wider mb-4">
              Sources
            </h3>
            <ul className="space-y-2">
              {sources.map((source) => (
                <li key={source.href}>
                  <a
                    href={source.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-400 hover:text-dofus-gold dark:hover:text-dofus-gold transition-colors duration-200"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    {source.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-white/10">
          <p className="text-center text-sm text-gray-500 dark:text-gray-500">
            &copy; {currentYear} Retrofus. Tous droits reserves. Ce site
            n&apos;est pas affilie a Ankama Games.
          </p>
        </div>
      </div>
    </footer>
  );
}
