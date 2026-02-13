import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

const isGitHubPages = process.env.GITHUB_PAGES === 'true';
const owner = process.env.GITHUB_REPOSITORY_OWNER;
const repo = process.env.GITHUB_REPOSITORY?.split('/')[1];
const base = isGitHubPages && repo ? `/${repo}/` : '/';

export default defineConfig({
  integrations: [mdx()],
  base,
  ...(isGitHubPages && owner && repo ? { site: `https://${owner}.github.io/${repo}/` } : {})
});
