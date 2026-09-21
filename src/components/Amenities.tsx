import { motion } from 'framer-motion';
import { ArrowUpRight, ChevronDown, ScanLine } from 'lucide-react';
import { amenities, amenityGroups } from '../data/amenities';
import { floorPlan } from '../data/photos';
import { PhotoButton, type GallerySelection } from './Photo';
import { Reveal } from './Reveal';

const wallClasses = [
  'amenity-wall-item--wifi',
  'amenity-wall-item--air',
  'amenity-wall-item--kitchen',
  'amenity-wall-item--balcony',
  'amenity-wall-item--checkin',
  'amenity-wall-item--coffee',
  'amenity-wall-item--workspace',
  'amenity-wall-item--laundry',
];

export function Amenities({ openGallery }: { openGallery: (selection: GallerySelection) => void }) {
  return <section id="amenities" className="amenities-section" aria-labelledby="amenities-title"><div className="container section">
    <Reveal className="section-intro"><div><p className="eyebrow section-number"><span>02</span>Everyday comforts</p><h2 id="amenities-title">Less to pack.<br />More to enjoy.</h2></div><p className="intro-aside">From your first coffee to a fresh set of clothes, the essentials are here. Settle in at your own pace.</p></Reveal>

    <div className="amenities-wall" aria-label="Apartment amenities">
      {amenities.map(({ name, description, icon: Icon }, index) => (
        <motion.article
          className={`amenity-wall-item ${wallClasses[index] ?? ''}`}
          key={name}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.22 }}
          transition={{ duration: 0.55, delay: Math.min(index * 0.055, 0.28), ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -4 }}
        >
          <div className="amenity-wall-topline">
            <span className="amenity-wall-number">{String(index + 1).padStart(2, '0')}</span>
            <span className="amenity-wall-rule" aria-hidden="true" />
          </div>
          <Icon className="amenity-wall-icon" aria-hidden="true" strokeWidth={1.35} />
          <div className="amenity-wall-copy">
            <h3>{name}</h3>
            <p>{description}</p>
          </div>
          <span className="amenity-wall-ghost-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
        </motion.article>
      ))}
    </div>

    <details className="all-amenities"><summary><span>All the little things, covered.</span><span className="details-action">See all amenities<ChevronDown size={20} /></span></summary><div className="amenity-details">{amenityGroups.map(group => <div key={group.title}><h3>{group.title}</h3><ul>{group.items.map(item => <li key={item}>{item}</li>)}</ul></div>)}</div></details>
    <Reveal className="floor-plan-block"><div className="floor-plan-intro"><ScanLine size={29} strokeWidth={1.3} /><p className="eyebrow">Get your bearings</p><h3>A little look<br />at the layout.</h3></div><PhotoButton id="floor-plan" photo={floorPlan} className="floor-plan-photo" sizes="(max-width: 700px) 65vw, 25vw" onOpen={() => openGallery({ index: 0, origin: 'floor-plan', floorPlan: true })} /><div className="floor-plan-copy"><p>See how the apartment fits together, from the kitchen to your place to unwind.</p><button className="text-link" onClick={() => openGallery({ index: 0, origin: 'floor-plan', floorPlan: true })}>View the floor plan<ArrowUpRight size={20} /></button><span className="small-note">Original apartment floor plan</span></div></Reveal>
  </div></section>;
}
