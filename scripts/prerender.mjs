import { readFile, writeFile, rm } from 'node:fs/promises';
import { render, structuredData } from '../.prerender/entry-server.js';
const template = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');
if (!template.includes('<!--app-html-->') || !template.includes('<!--structured-data-->')) throw new Error('Missing prerender insertion points.');
const html = template.replace('<!--app-html-->', render()).replace('<!--structured-data-->', `<script type="application/ld+json">${JSON.stringify(structuredData).replaceAll('<', '\\u003c')}</script>`);
if (!html.includes('<h1') || !html.includes('IT087015C253LBG2RK') || !html.includes('19087015C235493')) throw new Error('The landing page was not completely prerendered.');
await writeFile(new URL('../dist/index.html', import.meta.url), html);
await rm(new URL('../.prerender', import.meta.url), { recursive: true, force: true });
console.log('Prerendered the complete landing page and factual structured data.');
