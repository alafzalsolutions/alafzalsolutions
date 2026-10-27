import { getCollection } from 'astro:content';

export async function getPages() {
  return getCollection('pages', ({ data }) =>
    import.meta.env.PROD ? !data.draft : true
  );
}