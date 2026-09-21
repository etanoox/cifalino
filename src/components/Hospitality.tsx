import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, MessageCircle, Sparkles } from 'lucide-react';
import { testimonials } from '../data/site';
import { Reveal } from './Reveal';

export function Hospitality() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="hospitality hospitality-editorial" aria-labelledby="host-title">
      <span className="host-watermark" aria-hidden="true">HELLO.</span>

      <div className="container hospitality-editorial-grid">
        <Reveal className="host-story">
          <p className="eyebrow">
            <MessageCircle size={18} />
            A hello from your host
          </p>

          <h2 id="host-title">
            A place to stay.<br />
            A person to <span className="host-talk">talk to.</span>
          </h2>

          <p className="host-intro">
            Meet Giuseppe, your direct contact at Cifalino. From a question before your trip to arranging your arrival, it starts with a conversation.
          </p>

          <div className="host-signature" aria-label="Giuseppe, your host in Catania">
            <span className="host-signature-name">Giuseppe</span>
            <span className="host-signature-role">Your host in Catania</span>
          </div>

          <a href="#stay" className="text-link host-cta">
            Say hello to Giuseppe
            <ArrowUpRight size={19} />
          </a>
        </Reveal>

        <div className="host-notes" aria-label="Guest testimonials">
          <div className="host-notes-heading" aria-hidden="true">
            <span>Guest notes</span>
            <span>01 — 02</span>
          </div>

          {testimonials.map((item, index) => (
            <motion.div
              key={item.name}
              className={`host-note-motion host-note-motion-${index + 1}`}
              initial={reducedMotion ? false : { opacity: 0, y: 24 }}
              whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.28 }}
              transition={{
                duration: 0.62,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <figure className={`host-note-card host-note-card-${index + 1}`}>
                <div className="host-note-meta">
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <span className="host-note-quote" aria-hidden="true">“</span>
                </div>
                <blockquote>{item.quote}</blockquote>
                <figcaption>— {item.name}</figcaption>
              </figure>
            </motion.div>
          ))}

          <motion.div
            className="host-note-stamp"
            aria-hidden="true"
            initial={reducedMotion ? false : { opacity: 0, scale: 0.92, rotate: -4 }}
            whileInView={reducedMotion ? undefined : { opacity: 1, scale: 1, rotate: -2 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <Sparkles size={16} />
            <span>Good people.<br />Good stays.</span>
          </motion.div>

          <p className="small-note host-source">
            Excerpts from guest testimonials published on cifalino.com.
          </p>
        </div>
      </div>
    </section>
  );
}
