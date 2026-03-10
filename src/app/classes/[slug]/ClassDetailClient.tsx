'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Users,
  ArrowLeft,
  Swords,
  Shield,
  Heart,
  Zap,
  Star,
  Check,
  X,
  BookOpen,
  ChevronRight,
} from 'lucide-react';
import { classes } from '@/data/classes';
import type { GameClass } from '@/types';
import { getRoleLabel, getRoleColor } from '@/lib/utils';

function getElementBadgeColor(element: string): string {
  switch (element.toLowerCase()) {
    case 'terre':
    case 'force':
      return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
    case 'feu':
    case 'intelligence':
      return 'bg-red-500/10 text-red-400 border-red-500/20';
    case 'eau':
    case 'chance':
      return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20';
    case 'air':
    case 'agilité':
      return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
    case 'neutre':
      return 'bg-gray-500/10 text-gray-300 border-gray-500/20';
    default:
      return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
  }
}

function getElementTextColor(element: string): string {
  switch (element.toLowerCase()) {
    case 'terre':
    case 'force':
      return 'text-amber-400';
    case 'feu':
    case 'intelligence':
      return 'text-red-400';
    case 'eau':
    case 'chance':
      return 'text-cyan-400';
    case 'air':
    case 'agilité':
      return 'text-emerald-400';
    case 'neutre':
      return 'text-gray-300';
    default:
      return 'text-gray-400';
  }
}

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: 'easeOut' as const,
    },
  }),
};

const spellCardVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.35,
      ease: 'easeOut' as const,
    },
  },
};

export default function ClassDetailClient() {
  const params = useParams();
  const slug = params.slug as string;
  const gameClass = classes.find((c) => c.slug === slug);

  if (!gameClass) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-300 mb-2">Classe introuvable</h1>
          <p className="text-gray-500 mb-6">Cette classe n&apos;existe pas dans notre encyclopédie.</p>
          <Link
            href="/classes"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-dofus-gold/10 text-dofus-gold border border-dofus-gold/20 hover:bg-dofus-gold/20 transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour aux classes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="relative py-12 md:py-16">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-20 w-64 h-64 bg-dofus-gold/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-20 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back button */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Link
              href="/classes"
              className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-dofus-gold transition-colors duration-200 mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour aux classes
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-dofus-gold/10 border border-dofus-gold/20 shrink-0">
                <Users className="w-7 h-7 text-dofus-gold" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-200">
                  {gameClass.name}
                </h1>
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  {gameClass.role.map((role) => (
                    <span
                      key={role}
                      className={`px-2.5 py-0.5 rounded-md text-xs font-semibold border ${getRoleColor(role)}`}
                    >
                      {getRoleLabel(role)}
                    </span>
                  ))}
                  <span className="text-gray-700">|</span>
                  {gameClass.element.map((el) => (
                    <span
                      key={el}
                      className={`px-2.5 py-0.5 rounded-md text-xs font-medium border ${getElementBadgeColor(el)}`}
                    >
                      {el}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-3xl">
              {gameClass.description}
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-6">
        {/* Characteristics Section */}
        <motion.div
          custom={0}
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 p-5 md:p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-5 h-5 text-blue-400" />
            <h2 className="text-lg font-bold text-gray-200">Caractéristiques</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left: HP and Main Stats */}
            <div className="space-y-4">
              <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="w-4 h-4 text-red-400" />
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Points de vie
                  </span>
                </div>
                <span className="text-lg font-bold text-red-400">{gameClass.characteristics.hp}</span>
              </div>

              <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-4 h-4 text-dofus-gold" />
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Stats principales
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {gameClass.characteristics.mainStats.map((stat) => (
                    <span
                      key={stat}
                      className="px-2.5 py-1 rounded-lg text-xs font-medium bg-dofus-gold/10 text-dofus-gold border border-dofus-gold/20"
                    >
                      {stat}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Strengths and Weaknesses */}
            <div className="space-y-4">
              <div>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  Forces
                </h3>
                <div className="space-y-1.5">
                  {gameClass.characteristics.strengths.map((strength) => (
                    <div key={strength} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-green-400 shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-300">{strength}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  Faiblesses
                </h3>
                <div className="space-y-1.5">
                  {gameClass.characteristics.weaknesses.map((weakness) => (
                    <div key={weakness} className="flex items-start gap-2">
                      <X className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-300">{weakness}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Spells Section */}
        <motion.div
          custom={1}
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 p-5 md:p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Swords className="w-5 h-5 text-red-400" />
            <h2 className="text-lg font-bold text-gray-200">Sorts</h2>
            <span className="ml-auto text-xs text-gray-500">
              {gameClass.spells.length} sort{gameClass.spells.length > 1 ? 's' : ''}
            </span>
          </div>

          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.06, delayChildren: 0.15 },
              },
            }}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 gap-3"
          >
            {gameClass.spells.map((spell) => (
              <motion.div
                key={spell.name}
                variants={spellCardVariants}
                className="rounded-xl bg-white/[0.03] border border-white/[0.07] p-4 hover:bg-white/[0.06] transition-colors duration-200"
              >
                {/* Spell header */}
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-gray-200 truncate">{spell.name}</h4>
                    <span className="text-[10px] text-gray-500 font-mono">Niv. {spell.level}</span>
                  </div>
                  <span
                    className={`shrink-0 ml-2 px-2 py-0.5 rounded-md text-[10px] font-semibold border ${getElementBadgeColor(spell.element)}`}
                  >
                    {spell.element}
                  </span>
                </div>

                {/* Spell description */}
                <p className="text-xs text-gray-400 leading-relaxed mb-3">{spell.description}</p>

                {/* Spell stats */}
                <div className="flex flex-wrap gap-3 text-[11px]">
                  <div className="flex items-center gap-1">
                    <Zap className="w-3 h-3 text-blue-400" />
                    <span className="text-gray-500">PA:</span>
                    <span className="text-blue-400 font-bold">{spell.pa}</span>
                  </div>
                  {spell.damage && (
                    <div className="flex items-center gap-1">
                      <Swords className="w-3 h-3 text-red-400" />
                      <span className="text-gray-500">Dégâts:</span>
                      <span className={`font-bold ${getElementTextColor(spell.element)}`}>
                        {spell.damage}
                      </span>
                    </div>
                  )}
                  {spell.range && (
                    <div className="flex items-center gap-1">
                      <ChevronRight className="w-3 h-3 text-green-400" />
                      <span className="text-gray-500">Portée:</span>
                      <span className="text-green-400 font-bold">{spell.range}</span>
                    </div>
                  )}
                  {spell.cooldown && (
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-400" />
                      <span className="text-gray-500">CD:</span>
                      <span className="text-yellow-400 font-bold">{spell.cooldown}t</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Guide Section */}
        {gameClass.guide && (
          <motion.div
            custom={2}
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            className="rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 p-5 md:p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-5 h-5 text-dofus-gold" />
              <h2 className="text-lg font-bold text-gray-200">Guide</h2>
            </div>

            {/* Overview */}
            <div className="mb-6">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Présentation
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed">{gameClass.guide.overview}</p>
            </div>

            {/* Stat Distribution */}
            <div className="mb-6">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Distribution des stats
              </h3>
              <div className="rounded-xl bg-white/5 border border-white/10 p-3">
                <p className="text-sm text-dofus-gold font-medium">{gameClass.guide.statDistribution}</p>
              </div>
            </div>

            {/* Spell Priority */}
            <div className="mb-6">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Priorité des sorts
              </h3>
              <div className="flex flex-wrap items-center gap-2">
                {gameClass.guide.spellOrder.map((spell, index) => (
                  <div key={spell} className="flex items-center gap-2">
                    <span className="flex items-center gap-2">
                      <span className="shrink-0 w-5 h-5 rounded-full bg-dofus-gold/10 border border-dofus-gold/20 flex items-center justify-center text-[9px] font-bold text-dofus-gold">
                        {index + 1}
                      </span>
                      <span className="text-sm text-gray-300 font-medium">{spell}</span>
                    </span>
                    {index < gameClass.guide.spellOrder.length - 1 && (
                      <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Equipment */}
            <div className="mb-6">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Équipement recommandé
              </h3>
              <div className="flex flex-wrap gap-2">
                {gameClass.guide.equipment.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium bg-dofus-gold/10 text-dofus-gold border border-dofus-gold/20"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Playstyle */}
            <div>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Style de jeu
              </h3>
              <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                <div className="flex items-start gap-2">
                  <Star className="w-4 h-4 text-dofus-gold shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-300 leading-relaxed">{gameClass.guide.playstyle}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
