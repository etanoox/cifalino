import { useEffect, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { ArrowDown, ArrowUpRight, House, KeyRound, Wifi, TrainFront, Images } from 'lucide-react';
import { photos } from '../data/photos';
import { PhotoButton, type GallerySelection } from './Photo';

export function Hero({ openGallery }: { openGallery: (selection: GallerySelection) => void }) {
  const reduced = useReducedMotion(); const [finePointer, setFinePointer] = useState(false);
  const x = useMotionValue(0), y = useMotionValue(0);
  const rotateX = useSpring(x, { stiffness: 140, damping: 24 }), rotateY = useSpring(y, { stiffness: 140, damping: 24 });
  useEffect(() => {
    const query = window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 901px)');
    const update = () => setFinePointer(query.matches); update(); query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  return <>
    <section id="home" className="hero" aria-labelledby="hero-title">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow"><span className="tiny-line" />Cibali · Catania · Sicily</p>
          <h1 id="hero-title">A little home.<br />A lot of <br /><span className="catania-word">Catania.<svg aria-hidden="true" viewBox="0 0 390 18" preserveAspectRatio="none"><motion.path d="M3 12C100 3 260 3 386 8" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: reduced ? 0 : 0.65, delay: reduced ? 0 : 0.2 }} /></svg></span></h1>
          <p className="hero-description">Your own apartment in Catania, with a balcony, everyday comforts and the city waiting to be explored.</p>
          <div className="hero-actions"><a href="#stay" className="button button-dark">Plan your stay<ArrowUpRight size={21} /></a><a href="#apartment" className="text-link">Explore the apartment<ArrowDown size={17} /></a></div>
        </div>
        <div className="hero-visual" onPointerMove={event => {
          if (reduced || !finePointer) return;
          const bounds = event.currentTarget.getBoundingClientRect();
          x.set(-(event.clientY - bounds.top - bounds.height / 2) / bounds.height * 4);
          y.set((event.clientX - bounds.left - bounds.width / 2) / bounds.width * 4);
        }} onPointerLeave={() => { x.set(0); y.set(0); }}>
          <div className="hero-photo-index" aria-hidden="true"><span>Welcome to Cifalino</span><span>01 — 12</span></div>
          <motion.div className="hero-main-frame" style={{ rotateX: reduced || !finePointer ? 0 : rotateX, rotateY: reduced || !finePointer ? 0 : rotateY }}>
            <PhotoButton id="hero-sleeping" photo={photos[0]} priority sizes="(max-width: 700px) 92vw, 48vw" className="hero-main-photo" onOpen={() => openGallery({ index: 0, origin: 'hero-sleeping' })} />
          </motion.div>
          <div className="hero-balcony-frame"><PhotoButton id="hero-balcony" photo={photos[1]} sizes="(max-width: 700px) 45vw, 22vw" onOpen={() => openGallery({ index: 1, origin: 'hero-balcony' })} /><span className="balcony-note">A little fresh air.</span></div>
          <button className="hero-gallery text-link" onClick={() => openGallery({ index: 0, origin: 'hero-sleeping' })}><Images size={19} />View all 12 photos<ArrowUpRight size={16} /></button>
          <span className="hero-corner" aria-hidden="true" />
        </div>
      </div>
      <div className="container hero-bottom"><span>One apartment. All yours.</span><a href="#apartment" aria-label="Discover the apartment"><ArrowDown size={19} /></a><span>Your Catania chapter starts here.</span></div>
    </section>
    <div className="quick-facts"><div className="container facts-grid">{[{ icon: House, label: 'Entire apartment' }, { icon: KeyRound, label: 'Self check-in' }, { icon: Wifi, label: 'Free Wi-Fi' }, { icon: TrainFront, label: 'Near Cibali metro' }].map(({ icon: Icon, label }) => <div key={label}><Icon size={22} strokeWidth={1.6} /><span>{label}</span></div>)}</div></div>
  </>;
}
