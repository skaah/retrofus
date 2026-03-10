import { dungeons } from '@/data/dungeons';
import DungeonDetailClient from './DungeonDetailClient';

export function generateStaticParams() {
  return dungeons.map((d) => ({ slug: d.slug }));
}

export default function DungeonPage() {
  return <DungeonDetailClient />;
}
