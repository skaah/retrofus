import { professions } from '@/data/professions';
import ProfessionDetailClient from './ProfessionDetailClient';

export function generateStaticParams() {
  return professions.map((p) => ({ slug: p.slug }));
}

export default function MetierPage() {
  return <ProfessionDetailClient />;
}
