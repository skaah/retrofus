'use client';

import { motion } from 'framer-motion';
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
  Sparkles,
  BookOpen,
  TrendingUp,
  Star,
} from 'lucide-react';
import SearchBar from '@/components/ui/SearchBar';
import { equipment, weapons } from '@/data/equipment';
import { dungeons } from '@/data/dungeons';
import { quests } from '@/data/quests';
import { achievements } from '@/data/achievements';
import { professions } from '@/data/professions';
import { classes } from '@/data/classes';
import { dropZones } from '@/data/drops';

const categories = [
  {
    title: 'Equipements',
    href: '/equipements',
    icon: Shield,
    description: 'Amulettes, anneaux, chapeaux, capes et plus encore',
    count: equipment.length,
    gradient: 'from-blue-500/20 to-cyan-500/20',
    iconColor: 'text-blue-400',
    borderHover: 'hover:border-blue-500/30',
    shadowHover: 'hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]',
  },
  {
    title: 'Armes',
    href: '/armes',
    icon: Sword,
    description: 'Epees, arcs, baguettes, dagues et toutes les armes',
    count: weapons.length,
    gradient: 'from-red-500/20 to-orange-500/20',
    iconColor: 'text-red-400',
    borderHover: 'hover:border-red-500/30',
    shadowHover: 'hover:shadow-[0_0_20px_rgba(239,68,68,0.15)]',
  },
  {
    title: 'Donjons',
    href: '/donjons',
    icon: Castle,
    description: 'Strategies, boss, monstres et recompenses',
    count: dungeons.length,
    gradient: 'from-purple-500/20 to-pink-500/20',
    iconColor: 'text-purple-400',
    borderHover: 'hover:border-purple-500/30',
    shadowHover: 'hover:shadow-[0_0_20px_rgba(168,85,247,0.15)]',
  },
  {
    title: 'Quetes',
    href: '/quetes',
    icon: ScrollText,
    description: 'Guides complets pour toutes les quetes du jeu',
    count: quests.length,
    gradient: 'from-green-500/20 to-emerald-500/20',
    iconColor: 'text-green-400',
    borderHover: 'hover:border-green-500/30',
    shadowHover: 'hover:shadow-[0_0_20px_rgba(34,197,94,0.15)]',
  },
  {
    title: 'Succes',
    href: '/succes',
    icon: Trophy,
    description: 'Tous les succes et comment les debloquer',
    count: achievements.length,
    gradient: 'from-yellow-500/20 to-amber-500/20',
    iconColor: 'text-yellow-400',
    borderHover: 'hover:border-yellow-500/30',
    shadowHover: 'hover:shadow-[0_0_20px_rgba(234,179,8,0.15)]',
  },
  {
    title: 'Metiers',
    href: '/metiers',
    icon: Hammer,
    description: 'Guides de leveling et recettes pour chaque metier',
    count: professions.length,
    gradient: 'from-orange-500/20 to-amber-500/20',
    iconColor: 'text-orange-400',
    borderHover: 'hover:border-orange-500/30',
    shadowHover: 'hover:shadow-[0_0_20px_rgba(249,115,22,0.15)]',
  },
  {
    title: 'Classes',
    href: '/classes',
    icon: Users,
    description: 'Sorts, guides et builds pour chaque classe',
    count: classes.length,
    gradient: 'from-cyan-500/20 to-blue-500/20',
    iconColor: 'text-cyan-400',
    borderHover: 'hover:border-cyan-500/30',
    shadowHover: 'hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]',
  },
  {
    title: 'Drops',
    href: '/drops',
    icon: MapPin,
    description: 'Zones de farm, monstres et taux de drop',
    count: dropZones.length,
    gradient: 'from-emerald-500/20 to-teal-500/20',
    iconColor: 'text-emerald-400',
    borderHover: 'hover:border-emerald-500/30',
    shadowHover: 'hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]',
  },
];

const stats = [
  {
    label: 'Equipements',
    value: equipment.length,
    icon: Shield,
    color: 'text-blue-400',
  },
  {
    label: 'Armes',
    value: weapons.length,
    icon: Sword,
    color: 'text-red-400',
  },
  {
    label: 'Donjons',
    value: dungeons.length,
    icon: Castle,
    color: 'text-purple-400',
  },
  {
    label: 'Quetes',
    value: quests.length,
    icon: ScrollText,
    color: 'text-green-400',
  },
  {
    label: 'Succes',
    value: achievements.length,
    icon: Trophy,
    color: 'text-yellow-400',
  },
  {
    label: 'Metiers',
    value: professions.length,
    icon: Hammer,
    color: 'text-orange-400',
  },
  {
    label: 'Classes',
    value: classes.length,
    icon: Users,
    color: 'text-cyan-400',
  },
  {
    label: 'Zones de drop',
    value: dropZones.length,
    icon: MapPin,
    color: 'text-emerald-400',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut' as const,
    },
  },
};

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        {/* Background decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-dofus-gold/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/3 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            {/* Sparkles badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-xl bg-dofus-gold/10 border border-dofus-gold/20 mb-8"
            >
              <Sparkles className="w-4 h-4 text-dofus-gold" />
              <span className="text-sm font-medium text-dofus-gold">
                Retrofus — La reference Dofus Retro 1.29
              </span>
            </motion.div>

            {/* Animated Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6"
            >
              <span className="bg-gradient-to-r from-dofus-gold via-yellow-300 to-dofus-gold bg-[length:200%_100%] bg-clip-text text-transparent animate-shimmer">
                L&apos;Encyclopedie Ultime
              </span>
              <br />
              <span className="text-gray-200">
                de Dofus Retro
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              Retrouvez toutes les informations sur les equipements, armes, donjons,
              quetes, succes, metiers, classes et zones de drop. Le guide ultime pour
              tous les aventuriers du Monde des Douze.
            </motion.p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="max-w-2xl mx-auto"
            >
              <SearchBar size="lg" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Announcement Banner */}
      <section className="py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="relative overflow-hidden rounded-2xl backdrop-blur-xl bg-gradient-to-r from-dofus-gold/10 via-yellow-500/5 to-dofus-gold/10 border border-dofus-gold/20"
          >
            {/* Pulse effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-dofus-gold/5 to-transparent animate-pulse-slow" />

            <div className="relative flex items-center justify-center gap-3 py-4 px-6">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Trophy className="w-6 h-6 text-dofus-gold" />
              </motion.div>
              <p className="text-sm sm:text-base font-semibold text-center">
                <span className="text-dofus-gold">Succes arrivent le 31 Mars 2026!</span>
                <span className="text-gray-400 ml-2 hidden sm:inline">
                  Preparez-vous a debloquer les nouveaux succes
                </span>
              </p>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              >
                <Star className="w-5 h-5 text-yellow-400" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Cards Grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              <span className="text-gray-200">Explorer l&apos;</span>
              <span className="text-gold-gradient">Encyclopedie</span>
            </h2>
            <p className="text-gray-400 max-w-lg mx-auto">
              Parcourez toutes les categories pour trouver ce dont vous avez besoin
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <motion.div key={category.href} variants={itemVariants}>
                  <Link href={category.href} className="block group">
                    <div
                      className={`relative overflow-hidden rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 p-6 transition-all duration-300 ${category.borderHover} ${category.shadowHover} hover:bg-white/[0.08] hover:-translate-y-1`}
                    >
                      {/* Gradient background */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                      />

                      <div className="relative">
                        {/* Icon */}
                        <div className="mb-4">
                          <div
                            className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 border border-white/10 group-hover:border-white/20 transition-all duration-300`}
                          >
                            <Icon
                              className={`w-6 h-6 ${category.iconColor} transition-transform duration-300 group-hover:scale-110`}
                            />
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className="text-lg font-bold text-gray-200 group-hover:text-white mb-1.5 transition-colors duration-200">
                          {category.title}
                        </h3>

                        {/* Description */}
                        <p className="text-sm text-gray-500 group-hover:text-gray-400 mb-4 line-clamp-2 transition-colors duration-200">
                          {category.description}
                        </p>

                        {/* Count badge */}
                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>
                            {category.count} element{category.count > 1 ? 's' : ''}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              <span className="text-gray-200">Le jeu en </span>
              <span className="text-gold-gradient">chiffres</span>
            </h2>
            <p className="text-gray-400 max-w-lg mx-auto">
              Un apercu de tout le contenu disponible dans l&apos;encyclopedie
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6"
          >
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  variants={itemVariants}
                  className="relative group"
                >
                  <div className="rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 p-5 md:p-6 text-center hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300">
                    <Icon
                      className={`w-7 h-7 ${stat.color} mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}
                    />
                    <motion.p
                      className="text-2xl md:text-3xl font-bold text-gray-200 mb-1"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                    >
                      {stat.value}
                    </motion.p>
                    <p className="text-xs sm:text-sm text-gray-500">{stat.label}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Total count */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 text-center"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full backdrop-blur-xl bg-dofus-gold/5 border border-dofus-gold/20">
              <TrendingUp className="w-5 h-5 text-dofus-gold" />
              <span className="text-sm font-medium text-gray-300">
                <span className="text-dofus-gold font-bold">
                  {equipment.length +
                    weapons.length +
                    dungeons.length +
                    quests.length +
                    achievements.length +
                    professions.length +
                    classes.length +
                    dropZones.length}
                </span>{' '}
                elements au total dans l&apos;encyclopedie
              </span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
