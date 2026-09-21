import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, ShieldCheck } from 'lucide-react';
import { bookingPlatforms } from '../data/site';
import { photos } from '../data/photos';
import { Reveal } from './Reveal';

const platformVisuals = {
  airbnb: {
    photo: photos[1],
    tag: 'A little fresh air.',
  },
  booking: {
    photo: photos[0],
    tag: 'A place to put the day on pause.',
  },
} as const;

export function BookingPlatforms() {
  const reduced = useReducedMotion();

  return <section id="book-online" className="platforms-section section" aria-labelledby="platforms-title">
    <div className="container">
      <Reveal className="section-intro platforms-intro">
        <div>
          <p className="eyebrow section-number"><span>05</span>Book your way</p>
          <h2 id="platforms-title">Already use a<br />booking platform?</h2>
        </div>
        <div className="intro-aside">
          <p>You can also find Cifalino on Airbnb and Booking.com. Choose the platform you already know and continue there.</p>
          <span className="platforms-note"><ShieldCheck size={18} aria-hidden="true" /> External booking platforms · opens in a new tab</span>
        </div>
      </Reveal>

      <div className="booking-platform-stack">
        {bookingPlatforms.map((platform, index) => {
          const visual = platformVisuals[platform.slug];
          const imageAvif = visual.photo.src.replace(/\.webp$/, '.avif');

          return <Reveal key={platform.label}>
            <motion.a
              className={`booking-platform-experience booking-platform-${platform.slug}${index % 2 ? ' is-reverse' : ''}`}
              href={platform.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open Cifalino on ${platform.label}`}
              whileHover={reduced ? undefined : { y: -6 }}
              whileTap={reduced ? undefined : { scale: 0.995 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="booking-platform-copy">
                <div className="booking-platform-kicker">
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <span>Cifalino Apartment on</span>
                </div>

                <div className="booking-platform-brand">
                  <span className="booking-platform-mark" aria-hidden="true">
                    <img src={platform.icon} width="42" height="42" alt="" loading="lazy" decoding="async" />
                  </span>
                  <span className="booking-platform-wordmark">{platform.wordmark}</span>
                </div>

                <p className="booking-platform-description">{platform.description}</p>

                <span className="booking-platform-link">
                  <span>Open {platform.label} listing</span>
                  <span className="booking-platform-link-icon" aria-hidden="true"><ArrowUpRight size={20} /></span>
                </span>
              </div>

              <div className="booking-platform-visual" aria-hidden="true">
                <picture>
                  <source srcSet={imageAvif} type="image/avif" />
                  <img src={visual.photo.src} alt="" loading="lazy" decoding="async" />
                </picture>
                <span className="booking-platform-photo-tag">{visual.tag}</span>
                <span className="booking-platform-corner" />
              </div>
            </motion.a>
          </Reveal>;
        })}
      </div>
    </div>
  </section>;
}
