'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Castle,
  MapPin,
  Swords,
  ArrowLeft,
  Star,
  Shield,
  Heart,
  Zap,
  Target,
  BookOpen,
} from 'lucide-react';
import { dungeons } from '@/data/dungeons';
import { getDifficultyColor } from '@/lib/utils';

function getElementColor(element: string): string {
  switch (element) {
    case 'neutre':
      return 'text-gray-300';
    case 'terre':
      return 'text-amber-600';
    case 'feu':
      return 'text-red-500';
    case 'eau':
      return 'text-cyan-400';
    case 'air':
      return 'text-emerald-400';
    default:
      return 'text-gray-400';
  }
}

function getElementBgColor(element: string): string {
  switch (element) {
    case 'neutre':
      return 'bg-gray-400/10';
    case 'terre':
      return 'bg-amber-600/10';
    case 'feu':
      return 'bg-red-500/10';
    case 'eau':
      return 'bg-cyan-400/10';
    case 'air':
      return 'bg-emerald-400/10';
    default:
      return 'bg-gray-400/10';
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

export default function DungeonDetailClient() {
  const params = useParams();
  const slug = params.slug as string;
  const dungeon = dungeons.find((d) => d.slug === slug);

  if (!dungeon) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Castle className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-300 mb-2">Donjon introuvable</h1>
          <p className="text-gray-500 mb-6">Ce donjon n&apos;existe pas dans notre encyclopédie.</p>
          <Link
            href="/donjons"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-dofus-gold/10 text-dofus-gold border border-dofus-gold/20 hover:bg-dofus-gold/20 transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour aux donjons
          </Link>
        </div>
      </div>
    );
  }

  const resistanceEntries = dungeon.boss.resistances
    ? Object.entries(dungeon.boss.resistances)
    : [];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="relative py-12 md:py-16">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-20 w-64 h-64 bg-dofus-gold/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-20 w-80 h-80 bg-red-500/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back button */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Link
              href="/donjons"
              className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-dofus-gold transition-colors duration-200 mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour aux donjons
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-dofus-gold/10 border border-dofus-gold/20 shrink-0">
                <Castle className="w-7 h-7 text-dofus-gold" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-200">
                  {dungeon.name}
                </h1>
                <div className="flex flex-wrap items-center gap-3 mt-2">
                  <span className="text-sm text-gray-500 font-mono">
                    Niv. {dungeon.level}
                  </span>
                  <span className="text-gray-700">|</span>
                  <span className="flex items-center gap-1 text-sm text-gray-500">
                    <MapPin className="w-3.5 h-3.5" />
                    {dungeon.zone} - {dungeon.subZone}
                  </span>
                  <span className="text-gray-700">|</span>
                  <span
                    className={`px-2.5 py-0.5 rounded-md text-xs font-semibold border ${getDifficultyColor(
                      dungeon.strategy.difficulty
                    )}`}
                  >
                    {dungeon.strategy.difficulty.charAt(0).toUpperCase() +
                      dungeon.strategy.difficulty.slice(1)}
                  </span>
                </div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-3xl">
              {dungeon.description}
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-6">
        {/* Boss Section */}
        <motion.div
          custom={0}
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 p-5 md:p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Swords className="w-5 h-5 text-red-400" />
            <h2 className="text-lg font-bold text-gray-200">Boss - {dungeon.boss.name}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Boss Stats */}
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-white/5 border border-white/10 p-3 text-center">
                  <span className="text-[10px] uppercase tracking-wider text-gray-500 block mb-1">Niveau</span>
                  <span className="text-lg font-bold text-dofus-gold">{dungeon.boss.level}</span>
                </div>
                <div className="rounded-xl bg-white/5 border border-white/10 p-3 text-center">
                  <span className="text-[10px] uppercase tracking-wider text-gray-500 block mb-1">
                    <Heart className="w-3 h-3 inline-block mr-1 text-red-400" />
                    HP
                  </span>
                  <span className="text-lg font-bold text-red-400">{dungeon.boss.hp.toLocaleString()}</span>
                </div>
                <div className="rounded-xl bg-white/5 border border-white/10 p-3 text-center">
                  <span className="text-[10px] uppercase tracking-wider text-gray-500 block mb-1">
                    <Zap className="w-3 h-3 inline-block mr-1 text-blue-400" />
                    PA
                  </span>
                  <span className="text-lg font-bold text-blue-400">{dungeon.boss.pa}</span>
                </div>
                <div className="rounded-xl bg-white/5 border border-white/10 p-3 text-center">
                  <span className="text-[10px] uppercase tracking-wider text-gray-500 block mb-1">
                    <Zap className="w-3 h-3 inline-block mr-1 text-green-400" />
                    PM
                  </span>
                  <span className="text-lg font-bold text-green-400">{dungeon.boss.pm}</span>
                </div>
              </div>

              {/* Boss Spells */}
              {dungeon.boss.spells && dungeon.boss.spells.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    Sorts
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {dungeon.boss.spells.map((spell) => (
                      <span
                        key={spell}
                        className="px-2.5 py-1 rounded-lg text-xs font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20"
                      >
                        {spell}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Boss Resistances */}
            {resistanceEntries.length > 0 && (
              <div>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  Résistances
                </h3>
                <div className="space-y-2">
                  {resistanceEntries.map(([element, value]) => (
                    <div key={element} className="flex items-center gap-3">
                      <span
                        className={`w-20 text-xs font-medium capitalize ${getElementColor(element)}`}
                      >
                        {element}
                      </span>
                      <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            value >= 0 ? getElementBgColor(element) : 'bg-red-500/30'
                          }`}
                          style={{
                            width: `${Math.min(Math.abs(value) * 2, 100)}%`,
                          }}
                        />
                      </div>
                      <span
                        className={`text-xs font-bold w-12 text-right ${
                          value < 0 ? 'text-red-400' : getElementColor(element)
                        }`}
                      >
                        {value > 0 ? `+${value}%` : `${value}%`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Monsters Table */}
        <motion.div
          custom={1}
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 p-5 md:p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-5 h-5 text-purple-400" />
            <h2 className="text-lg font-bold text-gray-200">Monstres du donjon</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-2.5 px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Nom
                  </th>
                  <th className="text-center py-2.5 px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Niveau
                  </th>
                  <th className="text-center py-2.5 px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    <Heart className="w-3 h-3 inline-block mr-1 text-red-400" />
                    HP
                  </th>
                  <th className="text-center py-2.5 px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    <Zap className="w-3 h-3 inline-block mr-1 text-blue-400" />
                    PA
                  </th>
                  <th className="text-center py-2.5 px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    <Zap className="w-3 h-3 inline-block mr-1 text-green-400" />
                    PM
                  </th>
                </tr>
              </thead>
              <tbody>
                {dungeon.monsters.map((monster) => (
                  <tr
                    key={monster.id}
                    className="border-b border-white/5 hover:bg-white/[0.03] transition-colors"
                  >
                    <td className="py-2.5 px-3 text-gray-300 font-medium">{monster.name}</td>
                    <td className="py-2.5 px-3 text-center text-gray-400 font-mono text-xs">
                      {monster.level}
                    </td>
                    <td className="py-2.5 px-3 text-center text-red-400 font-mono text-xs">
                      {monster.hp.toLocaleString()}
                    </td>
                    <td className="py-2.5 px-3 text-center text-blue-400 font-mono text-xs">
                      {monster.pa}
                    </td>
                    <td className="py-2.5 px-3 text-center text-green-400 font-mono text-xs">
                      {monster.pm}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Strategy Section */}
        <motion.div
          custom={2}
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 p-5 md:p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-dofus-gold" />
            <h2 className="text-lg font-bold text-gray-200">Stratégie</h2>
          </div>

          {/* Strategy Info Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <div className="rounded-xl bg-white/5 border border-white/10 p-3 text-center">
              <span className="text-[10px] uppercase tracking-wider text-gray-500 block mb-1">
                Niv. recommandé
              </span>
              <span className="text-sm font-bold text-dofus-gold">{dungeon.strategy.recommendedLevel}</span>
            </div>
            <div className="rounded-xl bg-white/5 border border-white/10 p-3 text-center">
              <span className="text-[10px] uppercase tracking-wider text-gray-500 block mb-1">
                Taille d&apos;équipe
              </span>
              <span className="text-sm font-bold text-blue-400">
                {dungeon.strategy.recommendedTeamSize} joueurs
              </span>
            </div>
            <div className="rounded-xl bg-white/5 border border-white/10 p-3 text-center">
              <span className="text-[10px] uppercase tracking-wider text-gray-500 block mb-1">
                Composition
              </span>
              <span className="text-[11px] font-medium text-gray-300 leading-tight block">
                {dungeon.strategy.composition}
              </span>
            </div>
            <div className="rounded-xl bg-white/5 border border-white/10 p-3 text-center">
              <span className="text-[10px] uppercase tracking-wider text-gray-500 block mb-1">
                Difficulté
              </span>
              <span
                className={`inline-block px-2 py-0.5 rounded-md text-xs font-semibold border ${getDifficultyColor(
                  dungeon.strategy.difficulty
                )}`}
              >
                {dungeon.strategy.difficulty.charAt(0).toUpperCase() +
                  dungeon.strategy.difficulty.slice(1)}
              </span>
            </div>
          </div>

          {/* Steps */}
          <div className="mb-6">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Étapes
            </h3>
            <div className="space-y-2">
              {dungeon.strategy.steps.map((step, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="shrink-0 w-6 h-6 rounded-full bg-dofus-gold/10 border border-dofus-gold/20 flex items-center justify-center text-[10px] font-bold text-dofus-gold mt-0.5">
                    {index + 1}
                  </span>
                  <p className="text-sm text-gray-300 leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Conseils
            </h3>
            <div className="space-y-2">
              {dungeon.strategy.tips.map((tip, index) => (
                <div key={index} className="flex items-start gap-2">
                  <Star className="w-3.5 h-3.5 text-dofus-gold shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-400">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Rewards */}
        <motion.div
          custom={3}
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 p-5 md:p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5 text-yellow-400" />
            <h2 className="text-lg font-bold text-gray-200">Récompenses</h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {dungeon.rewards.map((reward) => (
              <span
                key={reward}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-dofus-gold/10 text-dofus-gold border border-dofus-gold/20"
              >
                {reward}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
