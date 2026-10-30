import { getCollection } from 'astro:content';

export async function getTools() {
  const tools = await getCollection('tools', ({ data }) =>
    import.meta.env.PROD ? !data.draft : true
  );
  return tools.sort((a, b) => a.data.title.localeCompare(b.data.title));
}