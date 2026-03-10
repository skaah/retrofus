'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Hammer,
  ArrowLeft,
  MapPin,
  Clock,
  Star,
  ChevronRight,
  BookOpen,
  Wrench,
  Pickaxe,
} from 'lucide-react';
import { professions } from '@/data/professions';
import type { Profession } from '@/types';

function getTypeColor(type: string): string {
  switch (type) {
    case 'recolte':
      return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
    case 'artisanat':
      return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
    default:
      return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
  }
}

function getTypeLabel(type: string): string {
  switch (type) {
    case 'recolte':
      return 'Récolte';
    case 'artisanat':
      return 'Artisanat';
    default:
      return type;
  }
}

function getTypeIcon(type: string) {
  switch (type) {
    case 'recolte':
      return <Pickaxe className="w-4 h-4" />;
    case 'artisanat':
      return <Wrench className="w-4 h-4" />;
    default:
      return null;
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

export default function ProfessionDetailClient() {
  const params = useParams();
  const slug = params.slug as string;
  const profession = professions.find((p) => p.slug === slug) as Profession | undefined;

  if (!profession) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Hammer className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-300 mb-2">Métier introuvable</h1>
          <p className="text-gray-500 mb-6">Ce métier n&apos;existe pas dans notre encyclopédie.</p>
          <Link
            href="/metiers"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-dofus-gold/10 text-dofus-gold border border-dofus-gold/20 hover:bg-dofus-gold/20 transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour aux métiers
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
          <div className="absolute bottom-0 right-20 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back button */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Link
              href="/metiers"
              className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-dofus-gold transition-colors duration-200 mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour aux métiers
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-dofus-gold/10 border border-dofus-gold/20 shrink-0">
                <Hammer className="w-7 h-7 text-dofus-gold" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-200">
                  {profession.name}
                </h1>
                <div className="flex flex-wrap items-center gap-3 mt-2">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-semibold border ${getTypeColor(
                      profession.type
                    )}`}
                  >
                    {getTypeIcon(profession.type)}
                    {getTypeLabel(profession.type)}
                  </span>
                  <span className="text-gray-700">|</span>
                  <span className="flex items-center gap-1 text-sm text-gray-500">
                    <Clock className="w-3.5 h-3.5" />
                    {profession.levelingGuide.estimatedTime}
                  </span>
                </div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-3xl">
              {profession.description}
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-6">
        {/* Workshops Section */}
        <motion.div
          custom={0}
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 p-5 md:p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-5 h-5 text-blue-400" />
            <h2 className="text-lg font-bold text-gray-200">Ateliers</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {profession.workshops.map((workshop) => (
              <div
                key={workshop}
                className="flex items-center gap-3 rounded-xl bg-white/5 border border-white/10 p-3"
              >
                <div className="shrink-0 w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-blue-400" />
                </div>
                <span className="text-sm text-gray-300 font-medium">{workshop}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Leveling Guide Section */}
        <motion.div
          custom={1}
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 p-5 md:p-6"
        >
          <div className="flex items-center gap-2 mb-6">
            <BookOpen className="w-5 h-5 text-dofus-gold" />
            <h2 className="text-lg font-bold text-gray-200">Guide de leveling</h2>
          </div>

          {/* Timeline / Steps */}
          <div className="relative space-y-6 mb-8">
            {/* Vertical timeline line */}
            <div className="absolute left-[15px] top-2 bottom-2 w-px bg-gradient-to-b from-dofus-gold/30 via-dofus-gold/10 to-transparent" />

            {profession.levelingGuide.sections.map((section, index) => (
              <div key={index} className="relative flex gap-4">
                {/* Timeline dot */}
                <div className="shrink-0 w-8 h-8 rounded-full bg-dofus-gold/10 border border-dofus-gold/30 flex items-center justify-center z-10">
                  <ChevronRight className="w-4 h-4 text-dofus-gold" />
                </div>

                {/* Content card */}
                <div className="flex-1 rounded-xl bg-white/[0.03] border border-white/[0.07] p-4 hover:bg-white/[0.05] transition-colors duration-200">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-dofus-gold/15 text-dofus-gold border border-dofus-gold/25 font-mono">
                      Niv. {section.levelRange}
                    </span>
                    <h3 className="text-sm font-bold text-gray-200">{section.title}</h3>
                  </div>

                  <p className="text-xs text-gray-400 leading-relaxed mb-3">
                    {section.description}
                  </p>

                  {/* Recipes */}
                  {section.recipes.length > 0 && (
                    <div className="mb-2">
                      <span className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold block mb-1.5">
                        Recettes
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {section.recipes.map((recipe) => (
                          <span
                            key={recipe}
                            className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-white/5 text-gray-300 border border-white/10"
                          >
                            {recipe}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Location */}
                  {section.location && (
                    <div className="flex items-center gap-1.5 mt-2">
                      <MapPin className="w-3 h-3 text-blue-400" />
                      <span className="text-[11px] text-blue-400 font-medium">
                        {section.location}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Tips */}
          <div className="rounded-xl bg-white/[0.03] border border-white/[0.07] p-4">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Conseils
            </h3>
            <div className="space-y-2">
              {profession.levelingGuide.tips.map((tip, index) => (
                <div key={index} className="flex items-start gap-2">
                  <Star className="w-3.5 h-3.5 text-dofus-gold shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-400">{tip}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Estimated Time */}
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/5">
            <Clock className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-gray-400">
              Temps total estimé:{' '}
              <span className="text-gray-200 font-semibold">
                {profession.levelingGuide.estimatedTime}
              </span>
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
