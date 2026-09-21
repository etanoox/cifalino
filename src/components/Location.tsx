import { useState } from 'react';
import { ArrowUpRight, Map, MapPin, TrainFront, Coffee, Goal } from 'lucide-react';
import { destination } from '../data/photos';
import { links } from '../data/site';
import { PhotoImage } from './Photo';
import { Reveal } from './Reveal';
export function Location() {
  const [mapLoaded, setMapLoaded] = useState(false);
  return <section id="location" className="container section location" aria-labelledby="location-title">
    <Reveal><p className="eyebrow section-number"><span>03</span>Out & about</p><h2 id="location-title">A local neighbourhood.<br />A city to discover.</h2></Reveal>
    <div className="location-grid"><Reveal className="destination-figure"><figure><PhotoImage photo={destination} sizes="(max-width: 700px) 90vw, 36vw" /><figcaption>{destination.caption}</figcaption></figure><span className="destination-tag" aria-hidden="true">Hello,<br />Catania.</span></Reveal>
      <Reveal className="location-copy"><div className="location-address"><MapPin size={19} /><span>Via Cifali · Cibali · 95123 Catania</span></div><p className="location-lead">Your base is Cibali, a lived-in neighbourhood beyond the historic centre. Get a feel for local life, then head out to discover the city.</p>
        <div className="nearby-item"><TrainFront size={26} strokeWidth={1.5} /><div><h3>Connect with the city</h3><p>Cibali metro is about a five-minute walk away. Walking time is indicative; a bus stop is nearby too.</p></div></div>
        <div className="nearby-item"><Coffee size={26} strokeWidth={1.5} /><div><h3>The everyday, nearby</h3><p>A bakery, a kiosk and a pizzeria are among the local services listed around the apartment.</p></div></div>
        <div className="nearby-item"><Goal size={26} strokeWidth={1.5} /><div><h3>A neighbourhood landmark</h3><p>The Angelo Massimino stadium is in the surrounding area.</p></div></div>
        <div className="map-panel"><div className="map-panel-title"><Map size={28} strokeWidth={1.3} /><h3>Find your way around.</h3></div><div className="map-actions">{!mapLoaded && <button className="button button-small button-dark" onClick={() => setMapLoaded(true)}>Load neighbourhood map<ArrowUpRight size={16} /></button>}<a href={links.map} target="_blank" rel="noopener noreferrer" className="text-link">Open in Google Maps<ArrowUpRight size={17} /></a></div><p className="small-note">{mapLoaded ? 'The map shows the neighbourhood and local points of interest.' : 'The map loads from Google only when you choose to view it.'}</p></div>
      </Reveal>
    </div>
    {mapLoaded && <div className="map-embed"><iframe src={links.mapEmbed} title="Cifalino neighbourhood map with local services in Cibali, Catania" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen /><a href={links.map} target="_blank" rel="noopener noreferrer" className="text-link">If the map does not load, open it in Google Maps<ArrowUpRight size={17} /></a></div>}
  </section>;
}
