import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight, Images, X } from 'lucide-react';
import { floorPlan, photos } from '../data/photos';
import { useModal } from '../hooks/useModal';
import { PhotoButton, type GallerySelection } from './Photo';
import { Reveal } from './Reveal';

export function Apartment({ openGallery }: { openGallery: (selection: GallerySelection) => void }) {
  return <section id="apartment" className="section apartment container" aria-labelledby="apartment-title">
    <Reveal className="section-intro"><div><p className="eyebrow section-number"><span>01</span>The apartment</p><h2 id="apartment-title">Come in.<br />Make it yours.</h2></div><div className="intro-aside"><p>A day out in Catania. A place of your own to come back to. Cifalino Apartment brings the simple comforts together, with room for your own routine.</p><p className="small-note">The whole apartment, just for you.</p></div></Reveal>
    <Reveal className="apartment-mosaic">
      {photos.slice(0, 5).map((photo, index) => <PhotoButton key={photo.id} id={`gallery-${photo.id}`} photo={photo} sizes={index === 0 ? '(max-width: 700px) 92vw, 55vw' : '(max-width: 700px) 45vw, 30vw'} className={`mosaic-photo mosaic-${index}`} caption={['Rest. Reset. Repeat.', 'Your balcony moment.', 'A corner for your plans.', 'Freshen up.', 'Coffee, your way.'][index]} index={`0${index + 1}`} onOpen={() => openGallery({ index, origin: `gallery-${photo.id}` })} />)}
    </Reveal>
    <div className="gallery-bottom"><p>Real spaces. The little details included.</p><button className="button button-outline" onClick={() => openGallery({ index: 0, origin: 'gallery-sleeping' })}><Images size={18} />View all photos<span className="photo-count">12</span><ArrowUpRight size={18} /></button></div>
  </section>;
}

export function GalleryDialog({ selection, close }: { selection: GallerySelection; close: () => void }) {
  const [index, setIndex] = useState(selection.index); const ref = useRef<HTMLDivElement>(null);
  const touch = useRef<{ x: number; y: number } | null>(null); const reduced = useReducedMotion();
  const plan = selection.floorPlan === true; const image = plan ? floorPlan : photos[index];
  const move = useCallback((direction: number) => setIndex(value => (value + direction + photos.length) % photos.length), []);
  useModal(ref, close);
  useEffect(() => {
    if (plan) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') { event.preventDefault(); move(1); }
      if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1); }
    };
    document.addEventListener('keydown', onKey); return () => document.removeEventListener('keydown', onKey);
  }, [move, plan]);
  return createPortal(<motion.div className="gallery-overlay" ref={ref} role="dialog" aria-modal="true" aria-labelledby="gallery-title" tabIndex={-1} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : 0.25 }} onClick={event => { if (event.target === event.currentTarget) close(); }}>
    <div className="lightbox-top"><div><span id="gallery-title">{plan ? 'The floor plan' : 'Inside Cifalino'}</span><span className="lightbox-meta">{plan ? 'Original apartment plan' : 'Cibali, Catania'}</span></div><button className="icon-button lightbox-close" onClick={close} aria-label="Close gallery"><X size={26} /></button></div>
    <div className={`lightbox-stage ${plan ? 'is-plan' : ''}`} onTouchStart={event => { if (event.touches.length === 1) touch.current = { x: event.touches[0].clientX, y: event.touches[0].clientY }; else touch.current = null; }} onTouchEnd={event => {
      if (!touch.current || plan || !event.changedTouches[0]) return;
      const dx = event.changedTouches[0].clientX - touch.current.x; const dy = event.changedTouches[0].clientY - touch.current.y;
      if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.5) move(dx < 0 ? 1 : -1);
      touch.current = null;
    }}>
      {!plan && <button className="icon-button lightbox-prev" onClick={() => move(-1)} aria-label="Previous photo"><ChevronLeft size={27} /></button>}
      <motion.div layoutId={reduced ? undefined : selection.origin} className="lightbox-photo" transition={{ layout: { duration: reduced ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] } }}>
        <AnimatePresence initial={false} mode="popLayout"><motion.img key={image.id} src={image.src} alt={image.alt} width={image.width} height={image.height} initial={{ opacity: reduced ? 1 : 0, x: reduced ? 0 : 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : 0.25 }} draggable={false} /></AnimatePresence>
      </motion.div>
      {!plan && <button className="icon-button lightbox-next" onClick={() => move(1)} aria-label="Next photo"><ChevronRight size={27} /></button>}
    </div>
    <div className="lightbox-bottom" aria-live="polite" aria-atomic="true"><p>{image.caption}</p><span>{plan ? <a className="text-link" href={floorPlan.src} target="_blank" rel="noopener noreferrer">Open full-size plan<ArrowUpRight size={17} /></a> : `${String(index + 1).padStart(2, '0')} / ${photos.length}`}</span></div>
    {!plan && <p className="lightbox-hint">Use the arrows or swipe to explore.</p>}
  </motion.div>, document.body);
}
