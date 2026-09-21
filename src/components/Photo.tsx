import { motion, useReducedMotion } from 'framer-motion';
import { Expand } from 'lucide-react';
import type { Photo as PhotoData } from '../data/photos';

interface ImageProps { photo: PhotoData; priority?: boolean; sizes?: string; full?: boolean }
export function PhotoImage({ photo, priority = false, sizes = '(max-width: 700px) 100vw, 50vw', full = false }: ImageProps) {
  full = full || photo.id === 'floor-plan';
  const responsive = photo.width > 800;
  return <picture>
    {!full && <source type="image/avif" srcSet={responsive ? `/images/${photo.id}-480.avif 480w, /images/${photo.id}-800.avif 800w, /images/${photo.id}.avif ${photo.width}w` : `/images/${photo.id}-480.avif 480w, /images/${photo.id}.avif ${photo.width}w`} sizes={sizes} />}
    <img src={photo.src} srcSet={!full && responsive ? `/images/${photo.id}-480.webp 480w, /images/${photo.id}-800.webp 800w, ${photo.src} ${photo.width}w` : undefined}
      sizes={sizes} width={photo.width} height={photo.height} alt={photo.alt} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} decoding="async" />
  </picture>;
}
export interface GallerySelection { index: number; origin: string; floorPlan?: boolean }
interface PhotoButtonProps extends ImageProps { id: string; onOpen: () => void; className?: string; caption?: string; index?: string }
export function PhotoButton({ id, onOpen, className = '', caption, index, ...imageProps }: PhotoButtonProps) {
  const reduced = useReducedMotion();
  return <motion.button type="button" layoutId={reduced ? undefined : id} className={`photo-button ${className}`} onClick={onOpen}
    aria-label={`Enlarge photo: ${imageProps.photo.alt}`} transition={{ layout: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }}>
    <PhotoImage {...imageProps} />
    <span className="photo-expand" aria-hidden="true"><Expand size={19} strokeWidth={1.6} /></span>
    {caption && <span className="photo-label"><span>{caption}</span>{index && <span>{index}</span>}</span>}
  </motion.button>;
}
