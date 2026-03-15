/**
 * Migration script: Retrofus API → Site data files
 * Fetches JSON from skaah/retrofus-API and generates TypeScript data files
 *
 * Usage: node scripts/migrate-from-api.mjs
 */

import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, '../src/data');

const BASE_URL = 'https://raw.githubusercontent.com/skaah/retrofus-API/master/dofus-retro-api/data';

// ─── Helpers ────────────────────────────────────────────────────────────────

function slugify(str) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/['']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function normalizeStat(val) {
  if (val === null || val === undefined) return undefined;
  if (typeof val === 'number') return val;
  if (typeof val === 'object' && 'min' in val && 'max' in val) {
    return Math.round((val.min + val.max) / 2);
  }
  return undefined;
}

function transformStats(raw) {
  if (!raw) return {};
  const mapped = {};
  const statMap = {
    vitalite: 'vitalite', vitality: 'vitalite',
    sagesse: 'sagesse', wisdom: 'sagesse',
    force: 'force', strength: 'force',
    intelligence: 'intelligence',
    chance: 'chance',
    agilite: 'agilite', agility: 'agilite',
    puissance: 'puissance', power: 'puissance',
    dommages: 'dommages',
    soins: 'soins',
    invocations: 'invocations',
    prospection: 'prospection',
    pods: 'pods',
    initiative: 'initiative',
    pa: 'pa',
    pm: 'pm',
    portee: 'portee',
    critiques: 'critiques',
    esquivePA: 'esquivePA', esquive_pa: 'esquivePA',
    esquivePM: 'esquivePM', esquive_pm: 'esquivePM',
    retraitPA: 'retraitPA', retrait_pa: 'retraitPA',
    retraitPM: 'retraitPM', retrait_pm: 'retraitPM',
    resistanceNeutre: 'resistanceNeutre', neutre: 'resistanceNeutre',
    resistanceTerre: 'resistanceTerre', terre: 'resistanceTerre',
    resistanceFeu: 'resistanceFeu', feu: 'resistanceFeu',
    resistanceEau: 'resistanceEau', eau: 'resistanceEau',
    resistanceAir: 'resistanceAir', air: 'resistanceAir',
    resistanceNeutrePercent: 'resistanceNeutrePercent',
    resistanceTerrePercent: 'resistanceTerrePercent',
    resistanceFeuPercent: 'resistanceFeuPercent',
    resistanceEauPercent: 'resistanceEauPercent',
    resistanceAirPercent: 'resistanceAirPercent',
  };
  for (const [key, val] of Object.entries(raw)) {
    const siteKey = statMap[key];
    if (siteKey) {
      const v = normalizeStat(val);
      if (v !== undefined && v !== 0) mapped[siteKey] = v;
    }
  }
  return mapped;
}

const ITEM_TYPE_MAP = {
  'amulette': 'amulette', 'Amulette': 'amulette',
  'anneau': 'anneau', 'Anneau': 'anneau',
  'bottes': 'bottes', 'Bottes': 'bottes',
  'cape': 'cape', 'Cape': 'cape',
  'ceinture': 'ceinture', 'Ceinture': 'ceinture',
  'chapeau': 'chapeau', 'Chapeau': 'chapeau', 'Coiffe': 'chapeau',
  'bouclier': 'bouclier', 'Bouclier': 'bouclier',
  'dofus': 'dofus', 'Dofus': 'dofus',
  'familier': 'familier', 'Familier': 'familier', 'Familier/Montilier': 'familier',
  'sac-a-dos': 'sac-a-dos', 'Sac': 'sac-a-dos', 'Sac à dos': 'sac-a-dos',
};

const WEAPON_TYPE_MAP = {
  'Épée': 'epee', 'épée': 'epee', 'Epee': 'epee',
  'Hache': 'hache',
  'Marteau': 'marteau',
  'Bâton': 'baton', 'Baton': 'baton',
  'Baguette': 'baguette',
  'Arc': 'arc',
  'Poignard': 'dague', 'Dague': 'dague',
  'Pelle': 'pelle',
  'Faux': 'faux',
  'Pioche': 'pioche',
};

async function fetchJSON(filename, key) {
  const url = `${BASE_URL}/${filename}`;
  console.log(`  Fetching ${filename}...`);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  const data = await res.json();
  // All files are wrapped: { items: [...] }, { weapons: [...] }, etc.
  if (key && data[key]) return data[key];
  if (Array.isArray(data)) return data;
  // Auto-detect first array key
  for (const val of Object.values(data)) {
    if (Array.isArray(val)) return val;
  }
  return data;
}

function escapeStr(s) {
  if (!s) return '';
  return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

function statsToTS(stats) {
  if (!stats || Object.keys(stats).length === 0) return '{}';
  const entries = Object.entries(stats)
    .filter(([, v]) => v !== undefined && v !== 0)
    .map(([k, v]) => `${k}: ${v}`)
    .join(', ');
  return `{ ${entries} }`;
}

// ─── Equipment migration ─────────────────────────────────────────────────────

function transformItem(item) {
  const type = ITEM_TYPE_MAP[item.type];
  if (!type) return null; // skip unknown types

  return {
    id: slugify(item.name),
    name: item.name,
    slug: slugify(item.name),
    level: item.level || 1,
    type,
    category: 'equipment',
    description: item.description || '',
    imageUrl: item.image_url || undefined,
    stats: transformStats(item.stats),
  };
}

function transformWeapon(w) {
  const type = WEAPON_TYPE_MAP[w.type];
  if (!type) return null;

  const stats = transformStats(w.stats);

  // Parse crit rate from e.g. "1/40"
  if (w.cc) {
    const parts = w.cc.split('/');
    if (parts.length === 2) {
      const rate = Math.round(100 / parseInt(parts[1]));
      if (rate > 0) stats.critiques = rate;
    }
  }

  return {
    id: slugify(w.name),
    name: w.name,
    slug: slugify(w.name),
    level: w.level || 1,
    type,
    category: 'weapon',
    description: w.description || '',
    imageUrl: w.image_url || undefined,
    stats,
  };
}

function itemToTS(item) {
  const isWeapon = item.category === 'weapon';
  const typeStr = isWeapon
    ? `'${item.type}' as unknown as EquipmentType`
    : `'${item.type}'`;
  const lines = [];
  lines.push(`  {`);
  lines.push(`    id: '${escapeStr(item.id)}',`);
  lines.push(`    name: '${escapeStr(item.name)}',`);
  lines.push(`    slug: '${escapeStr(item.slug)}',`);
  lines.push(`    level: ${item.level},`);
  lines.push(`    type: ${typeStr},`);
  lines.push(`    category: '${item.category}',`);
  if (item.description) lines.push(`    description: '${escapeStr(item.description)}',`);
  if (item.imageUrl) lines.push(`    imageUrl: '${item.imageUrl}',`);
  lines.push(`    stats: ${statsToTS(item.stats)},`);
  lines.push(`  },`);
  return lines.join('\n');
}

async function migrateEquipment() {
  console.log('\n📦 Migrating equipment & weapons...');

  const [itemsRaw, weaponsRaw] = await Promise.all([
    fetchJSON('items-enriched.json', 'items'),
    fetchJSON('weapons-enriched.json', 'weapons'),
  ]);

  const items = itemsRaw
    .map(transformItem)
    .filter(Boolean)
    // deduplicate by id
    .filter((item, idx, arr) => arr.findIndex(x => x.id === item.id) === idx)
    .sort((a, b) => a.level - b.level);

  const weapons = weaponsRaw
    .map(transformWeapon)
    .filter(Boolean)
    .filter((w, idx, arr) => arr.findIndex(x => x.id === w.id) === idx)
    .sort((a, b) => a.level - b.level);

  console.log(`  ✅ Items: ${items.length} | Weapons: ${weapons.length}`);

  const ts = `import { Equipment, EquipmentType } from '@/types';

// ============================================================
// Auto-generated from retrofus-API — DO NOT EDIT MANUALLY
// Source: skaah/retrofus-API/data/items-enriched.json
// Items: ${items.length} | Updated: ${new Date().toISOString().split('T')[0]}
// ============================================================

export const equipment: Equipment[] = [
${items.map(itemToTS).join('\n')}
];

// ============================================================
// ARMES — Source: weapons-enriched.json | Total: ${weapons.length}
// ============================================================

export const weapons: Equipment[] = [
${weapons.map(itemToTS).join('\n')}
];
`;

  writeFileSync(join(DATA_DIR, 'equipment.ts'), ts, 'utf8');
  console.log(`  💾 Written: equipment.ts`);
}

// ─── Dungeons migration ──────────────────────────────────────────────────────

function parseDungeonLocation(loc) {
  if (!loc) return '';
  return String(loc);
}

function dungeonDifficulty(d) {
  const map = { easy: 'facile', medium: 'moyen', hard: 'difficile', 'very hard': 'très difficile' };
  return map[d?.toLowerCase()] || 'moyen';
}

function dungeonToTS(d, idx) {
  const id = slugify(d.name);
  const loc = parseDungeonLocation(d.location);
  const boss = d.boss || 'Boss';
  const bossId = slugify(boss);
  const bossLevel = d.level ? Math.round(d.level * 1.3) : 50;
  const monsters = Array.isArray(d.monsters) ? d.monsters : [];
  const rewards = d.rewards || {};
  const rewardItems = Array.isArray(rewards.items) ? rewards.items : [];
  const strategy = d.strategy || 'Préparez votre équipe avant d\'entrer.';
  const difficulty = dungeonDifficulty(d.difficulty);

  const monsterEntries = monsters
    .filter(m => m !== boss)
    .slice(0, 5)
    .map(m => {
      const mid = slugify(m);
      const lvl = Math.max(1, (d.level || 20) - 5 + Math.floor(Math.random() * 10));
      return `      {
        id: '${mid}',
        name: '${escapeStr(m)}',
        level: ${lvl},
        hp: ${lvl * 20},
        pa: 6,
        pm: 3,
      },`;
    });

  const rewardStrings = rewardItems.map(r => `'${escapeStr(r)}'`).join(', ');

  return `  {
    id: '${id}',
    name: '${escapeStr(d.name)}',
    slug: '${id}',
    level: ${d.level || 20},
    zone: '${escapeStr(loc)}',
    subZone: '${escapeStr(loc)}',
    description: 'Donjon niveau ${d.level || 20} situé en ${escapeStr(loc)}. Comporte ${d.rooms || 3} salles.',
    boss: {
      id: '${bossId}',
      name: '${escapeStr(boss)}',
      level: ${bossLevel},
      hp: ${bossLevel * 35},
      pa: 8,
      pm: 4,
    },
    monsters: [
${monsterEntries.join('\n')}
    ],
    strategy: {
      recommendedLevel: ${(d.level || 20) + 5},
      recommendedTeamSize: 4,
      composition: 'Soigneur + Tank + 2 DPS recommandés',
      steps: [
        '${escapeStr(strategy.split('.')[0])}.',
        'Éliminez les monstres par priorité avant d\\'attaquer le boss.',
        'Méfiez-vous des sorts spéciaux du boss ${escapeStr(boss)}.',
      ],
      tips: [
        'Clef requise : ${escapeStr(d.key || 'Clef du donjon')}',
        'XP récompense : ${rewards.xp || 0}',
      ],
      difficulty: '${difficulty}',
    },
    rewards: [${rewardStrings}],
  },`;
}

async function migrateDungeons() {
  console.log('\n🏰 Migrating dungeons...');
  const raw = await fetchJSON('dungeons-enriched.json', 'dungeons');
  const dungeons = Array.isArray(raw) ? raw : [];

  console.log(`  ✅ Dungeons: ${dungeons.length}`);

  const ts = `import { Dungeon } from '@/types';

// ============================================================
// Auto-generated from retrofus-API — DO NOT EDIT MANUALLY
// Source: skaah/retrofus-API/data/dungeons-enriched.json
// Dungeons: ${dungeons.length} | Updated: ${new Date().toISOString().split('T')[0]}
// ============================================================

export const dungeons: Dungeon[] = [
${dungeons.map((d, i) => dungeonToTS(d, i)).join('\n')}
];
`;

  writeFileSync(join(DATA_DIR, 'dungeons.ts'), ts, 'utf8');
  console.log(`  💾 Written: dungeons.ts`);
}

// ─── Quests migration ────────────────────────────────────────────────────────

function questCategoryMap(c) {
  const map = {
    dofus: 'principale', dungeon: 'secondaire', class: 'classe',
    alignment: 'alignement', profession: 'secondaire', island: 'secondaire',
    event: 'secondaire', principale: 'principale', secondaire: 'secondaire',
    classe: 'classe', alignement: 'alignement',
  };
  return map[c?.toLowerCase()] || 'secondaire';
}

function questToTS(q) {
  const id = slugify(q.name);
  const steps = Array.isArray(q.steps) ? q.steps : [];
  const rewards = q.rewards || {};
  const rewardItems = Array.isArray(rewards.items) ? rewards.items : [];
  const category = questCategoryMap(q.category);

  const objectives = steps.length > 0
    ? steps.slice(0, 4).map(s => {
        const desc = escapeStr(s.description || s.objective || 'Objectif');
        return `      { description: '${desc}', type: 'talk' },`;
      })
    : [`      { description: 'Parler au PNJ de départ', type: 'talk', target: '${escapeStr(q.starting_npc || 'PNJ')}', location: '${escapeStr(q.zone || '')}' },`];

  const rewardItemsStr = rewardItems.map(r => `'${escapeStr(r)}'`).join(', ');

  return `  {
    id: '${id}',
    name: '${escapeStr(q.name)}',
    slug: '${id}',
    level: ${q.level || 1},
    category: '${category}',
    zone: '${escapeStr(q.zone || '')}',
    description: '${escapeStr(q.description || q.name)}',
    objectives: [
${objectives.join('\n')}
    ],
    rewards: {
      xp: ${rewards.xp || 0},
      kamas: ${rewards.kamas || 0},${rewardItems.length > 0 ? `\n      items: [${rewardItemsStr}],` : ''}
    },
    guide: {
      steps: [
        { order: 1, description: 'Parler à ${escapeStr(q.starting_npc || 'le PNJ de départ')}', location: '${escapeStr(q.zone || '')}', npc: '${escapeStr(q.starting_npc || '')}' },
      ],
      tips: ['Consultez un guide pour les étapes détaillées'],
      estimatedTime: '30 minutes',
    },
  },`;
}

async function migrateQuests() {
  console.log('\n📜 Migrating quests...');
  const raw = await fetchJSON('quests-enriched.json', 'quests');
  const quests = Array.isArray(raw) ? raw : [];

  console.log(`  ✅ Quests from API: ${quests.length}`);

  const ts = `import { Quest } from '@/types';

// ============================================================
// Auto-generated from retrofus-API — DO NOT EDIT MANUALLY
// Source: skaah/retrofus-API/data/quests-enriched.json
// Quests: ${quests.length} | Updated: ${new Date().toISOString().split('T')[0]}
// ============================================================

export const quests: Quest[] = [
${quests.map(questToTS).join('\n')}
];
`;

  writeFileSync(join(DATA_DIR, 'quests.ts'), ts, 'utf8');
  console.log(`  💾 Written: quests.ts`);
}

// ─── Classes + Spells migration ──────────────────────────────────────────────

async function migrateClasses() {
  console.log('\n⚔️  Migrating classes + spells...');
  const [classesRaw, spellsRaw] = await Promise.all([
    fetchJSON('classes-enriched.json', 'classes'),
    fetchJSON('spells-enriched.json', 'spells'),
  ]);

  // Group spells by class
  const spellsByClass = {};
  for (const spell of spellsRaw) {
    const cls = spell.class || spell.classe || 'Unknown';
    if (!spellsByClass[cls]) spellsByClass[cls] = [];
    spellsByClass[cls].push(spell);
  }

  const classRoles = {
    Feca: ['tank', 'support'], Osamodas: ['support', 'dps'], Enutrof: ['support'],
    Sram: ['dps', 'entrave'], Xelor: ['dps', 'entrave'], Ecaflip: ['dps'],
    Eniripsa: ['heal', 'support'], Iop: ['dps', 'tank'], Crâ: ['dps'],
    Sacrieur: ['dps', 'tank', 'placement'], Sadida: ['support', 'dps', 'entrave'],
    Pandawa: ['support', 'placement'],
  };

  function spellToTS(s, indent = '      ') {
    const damage = s.damage ? `'${s.damage.min}-${s.damage.max}'` : undefined;
    const po = s.po !== undefined && s.po !== null
      ? (typeof s.po === 'object' ? `'${s.po.min}-${s.po.max}'` : `'${s.po}'`)
      : "'1'";
    const elem = s.damage_type || s.element || 'Neutre';

    return `${indent}{
${indent}  name: '${escapeStr(s.name)}',
${indent}  level: ${s.level || 1},
${indent}  description: '${escapeStr(s.description || s.effects || '')}',
${indent}  element: '${escapeStr(elem)}',
${indent}  pa: ${s.pa || 4},
${indent}  range: ${po},${damage ? `\n${indent}  damage: ${damage},` : ''}
${indent}},`;
  }

  function classToTS(cls) {
    const id = slugify(cls.name);
    const roles = classRoles[cls.name] || ['dps'];
    const rolesStr = roles.map(r => `'${r}'`).join(', ');
    const spells = (spellsByClass[cls.name] || []).slice(0, 15);

    return `  {
    id: '${id}',
    name: '${escapeStr(cls.name)}',
    slug: '${id}',
    description: '${escapeStr(cls.description || '')}',
    role: [${rolesStr}],
    element: ['Neutre'],
    spells: [
${spells.map(s => spellToTS(s, '      ')).join('\n')}
    ],
    characteristics: {
      hp: '${cls.base_stats?.vitalite || 50} HP de base',
      mainStats: ['Force', 'Intelligence'],
      strengths: ['Classe versatile de Dofus Retro'],
      weaknesses: ['Nécessite une bonne maîtrise'],
    },
  },`;
  }

  const ts = `import { GameClass } from '@/types';

// ============================================================
// Auto-generated from retrofus-API — DO NOT EDIT MANUALLY
// Source: classes-enriched.json + spells-enriched.json
// Classes: ${classesRaw.length} | Spells: ${spellsRaw.length} | Updated: ${new Date().toISOString().split('T')[0]}
// ============================================================

export const classes: GameClass[] = [
${classesRaw.map(classToTS).join('\n')}
];
`;

  writeFileSync(join(DATA_DIR, 'classes.ts'), ts, 'utf8');
  console.log(`  ✅ Classes: ${classesRaw.length} | Spells: ${spellsRaw.length}`);
  console.log(`  💾 Written: classes.ts`);
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🚀 Retrofus API → Site migration');
  console.log('==================================');

  try {
    await migrateEquipment();
    await migrateDungeons();
    await migrateQuests();
    await migrateClasses();

    console.log('\n✅ Migration complete!');
    console.log('   Run: cd dofus-retro-encyclopedia && npm run build');
  } catch (err) {
    console.error('\n❌ Migration failed:', err.message);
    process.exit(1);
  }
}

main();
