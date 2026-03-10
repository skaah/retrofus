import { classes } from '@/data/classes';
import ClassDetailClient from './ClassDetailClient';

export function generateStaticParams() {
  return classes.map((c) => ({ slug: c.slug }));
}

export default function ClassPage() {
  return <ClassDetailClient />;
}
