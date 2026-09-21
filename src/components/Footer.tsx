import { ArrowUpRight } from 'lucide-react';
import { links, property } from '../data/site';
export function Footer() {
  return <footer className="footer"><div className="container">
    <div className="footer-top"><div className="footer-brand"><a href="#home" className="footer-logo" aria-label="Cifalino — back to top"><img src="/images/footer-logo.svg" width="169" height="68" alt="Cifalino" /></a><p>A little home. A lot of Catania.</p></div>
      <div><p className="footer-label">Find us</p><address>Cifalino Apartment<br />{property.street}, {property.postcode} {property.city}<br />Sicily, Italy</address></div>
      <div><p className="footer-label">Say hello</p><a href={`tel:${property.phoneUri}`} className="footer-contact">{property.phone}</a><a href={`mailto:${property.email}`} className="footer-contact">{property.email}</a><div className="socials"><a href={links.instagram} target="_blank" rel="noopener noreferrer" aria-label="Cifalino on Instagram">Instagram<ArrowUpRight size={15} /></a><a href={links.facebook} target="_blank" rel="noopener noreferrer" aria-label="Cifalino on Facebook">Facebook<ArrowUpRight size={15} /></a></div></div>
    </div>
    <div className="registration"><span>CIR: {property.cir}</span><span>CIN: {property.cin}</span></div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} Cifalino Apartment</span><a href={links.privacy} className="privacy-link">Privacy policy<ArrowUpRight size={15} /></a><span className="signature">Made with the <span className="heart">♥</span> by <a href={links.author} target="_blank" rel="noopener noreferrer">Giuseppe Ricceri</a></span></div>
  </div></footer>;
}
