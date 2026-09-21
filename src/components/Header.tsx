import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { features, journalArticles, navigation } from '../data/site';
import { useModal } from '../hooks/useModal';

const items = [...navigation];
if (features.journal && journalArticles.length) items.splice(3, 0, { id: 'journal', label: 'Journal' });

function MobileMenu({ close }: { close: () => void }) {
  const ref = useRef<HTMLDivElement>(null); const reduced = useReducedMotion();
  useModal(ref, close);
  return createPortal(<motion.div className="menu-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : 0.35 }} onClick={event => { if (event.target === event.currentTarget) close(); }}>
    <motion.div id="mobile-menu" ref={ref} role="dialog" aria-modal="true" aria-labelledby="menu-title" tabIndex={-1} className="mobile-menu" initial={{ x: reduced ? 0 : 35 }} animate={{ x: 0 }} exit={{ x: reduced ? 0 : 35 }}>
      <div className="menu-top"><img src="/images/logo.svg" width="145" height="59" alt="Cifalino" /><button className="icon-button" onClick={close} aria-label="Close menu"><X /></button></div>
      <p id="menu-title" className="eyebrow">Make yourself at home</p>
      <nav aria-label="Mobile navigation">{items.map((item, i) => <a href={`#${item.id}`} key={item.id} onClick={close}><span className="menu-number">0{i + 1}</span>{item.label}<ArrowUpRight size={24} /></a>)}</nav>
      <a href="#stay" className="button button-dark" onClick={close}>Plan your stay<ArrowUpRight size={20} /></a>
      <p className="menu-bottom">Cibali · Catania · Sicily</p>
    </motion.div>
  </motion.div>, document.body);
}

export function Header() {
  const [open, setOpen] = useState(false); const [active, setActive] = useState('');
  const close = useCallback(() => setOpen(false), []);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) setActive(entry.target.id); });
    }, { rootMargin: '-15% 0px -60% 0px', threshold: 0 });
    document.querySelectorAll('section[id], .hero').forEach(section => observer.observe(section));
    const desktop = window.matchMedia('(min-width: 901px)');
    const onSize = () => { if (desktop.matches) close(); };
    desktop.addEventListener('change', onSize);
    return () => { observer.disconnect(); desktop.removeEventListener('change', onSize); };
  }, [close]);
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="header">
      <div className="container header-inner">
        <a href="#home" className="logo" aria-label="Cifalino — home"><img src="/images/logo.svg" alt="Cifalino" width="150" height="61" /></a>
        <nav className="desktop-nav" aria-label="Main navigation">{items.map(item => <a key={item.id} href={`#${item.id}`} className={`nav-link ${active === item.id ? 'is-active' : ''}`} aria-current={active === item.id ? 'location' : undefined}>{item.label}</a>)}</nav>
        <a className="button button-dark header-cta" href="#stay">Plan your stay<ArrowUpRight size={18} /></a>
        <button className="menu-toggle icon-button" aria-expanded={open} aria-controls={open ? 'mobile-menu' : undefined} aria-label="Open menu" onClick={() => setOpen(true)}><Menu size={27} /></button>
      </div>
    </header>
    <AnimatePresence>{open && <MobileMenu close={close} />}</AnimatePresence>
  </>;
}
