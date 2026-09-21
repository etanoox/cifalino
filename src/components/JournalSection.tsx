import type { JournalArticle } from '../data/site';
export function JournalSection({ articles }: { articles: JournalArticle[] }) {
  if (!articles.length) return null;
  return <section id="journal" className="section container" aria-labelledby="journal-title">
    <p className="eyebrow">From Catania</p><h2 id="journal-title">The journal.</h2>
    <div className="journal-grid">{articles.map(article => <article key={article.slug}>
      <img src={article.image} alt={article.imageAlt} loading="lazy" width="600" height="400" />
      <h3><a href={article.href}>{article.title}</a></h3><p>{article.excerpt}</p>
    </article>)}</div>
  </section>;
}
