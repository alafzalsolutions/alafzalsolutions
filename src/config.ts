export const SITE = {
  name: 'Al Afzal Solutions',
  description:
    'Guides and free tools for studying, productivity and everyday wellbeing.',
  locale: 'en_US',
  defaultImage: '/og-default.png',
};

export type CategoryId =
  | 'learning'
  | 'productivity'
  | 'health'
  | 'reading'
  | 'stationery';

// Keep the ids in sync with the categories in content.config.ts and public/admin/config.yml.
// A page is only built for a category once it has a published article.
export const CATEGORIES: Record<CategoryId, { label: string; intro: string }> = {
  learning: {
    label: 'Learning',
    intro:
      'Simple, practical ways to study, take notes and remember what you read, based on how learning actually works.',
  },
  productivity: {
    label: 'Productivity',
    intro:
      'Calm routines and small systems for planning your time and getting the important things done.',
  },
  health: {
    label: 'Health',
    intro:
      'General, evidence-based information about everyday wellbeing. It is never a substitute for advice from a doctor.',
  },
  reading: {
    label: 'Reading',
    intro:
      'Ideas for reading more, understanding better and keeping what books teach you.',
  },
  stationery: {
    label: 'Stationery',
    intro:
      'Notebooks, pens and paper tools that make studying and planning more pleasant.',
  },
};


// Shown in the author box at the end of every article.
// Replace the text with your real details when you are ready.
export const AUTHOR = {
  bio: 'Every guide on this site is researched from the sources listed at the end and updated when things change. Health content is general information only.',
};


// Reserved spaces. Turn one on only when its content is ready, so readers
// never see an empty box. The reserved height stops the page jumping later.
export const SLOTS = {
  email: true,
  ads: false,
};