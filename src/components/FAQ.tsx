import { Plus } from 'lucide-react';
import { faqs } from '../data/site';
import { Reveal } from './Reveal';
export function FAQ() {
  return <section id="faq" className="container section faq-section" aria-labelledby="faq-title"><Reveal><p className="eyebrow section-number"><span>04</span>A few good questions</p><h2 id="faq-title">Before you<br />pack your bags.</h2><p className="faq-aside">Anything else on your mind?<br /><a className="text-link" href="#stay">Just ask Giuseppe.</a></p></Reveal><Reveal className="faq-list">{faqs.map(item => <details key={item.question} name="faq"><summary>{item.question}<Plus size={21} aria-hidden="true" /></summary><p>{item.answer}</p></details>)}</Reveal></section>;
}
