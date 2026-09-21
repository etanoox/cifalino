import { useCallback, useState } from 'react';
import { AnimatePresence, LayoutGroup, MotionConfig } from 'framer-motion';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Apartment, GalleryDialog } from './components/Gallery';
import { Amenities } from './components/Amenities';
import { Location } from './components/Location';
import { Hospitality } from './components/Hospitality';
import { JournalSection } from './components/JournalSection';
import { FAQ } from './components/FAQ';
import { BookingPlatforms } from './components/BookingPlatforms';
import { Stay, MobileStayBar } from './components/Stay';
import { Footer } from './components/Footer';
import { features, journalArticles } from './data/site';
import type { GallerySelection } from './components/Photo';

export default function App() {
  const [selection, setSelection] = useState<GallerySelection | null>(null);
  const close = useCallback(() => setSelection(null), []);
  return <MotionConfig reducedMotion="user" transition={{ duration: 0.45 }}><LayoutGroup>
    <Header /><main id="main" tabIndex={-1}><Hero openGallery={setSelection} /><Apartment openGallery={setSelection} /><Amenities openGallery={setSelection} /><Location /><Hospitality />{features.journal && journalArticles.length > 0 && <JournalSection articles={journalArticles} />}<FAQ /><BookingPlatforms /><Stay /></main><Footer /><MobileStayBar />
    <AnimatePresence>{selection && <GalleryDialog selection={selection} close={close} />}</AnimatePresence>
  </LayoutGroup></MotionConfig>;
}
