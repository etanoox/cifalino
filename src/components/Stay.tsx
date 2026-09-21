import { useEffect, useRef, useState, type FormEvent } from 'react';
import { ArrowUpRight, CalendarDays, Mail, MessageCircle, Phone } from 'lucide-react';
import { bookingAlternatives, property } from '../data/site';
import { nextDay, todayInCatania, validateStay, validDate, whatsappHref, type StayDates, type StayErrors } from '../lib/stay';
import { Reveal } from './Reveal';

export function Stay() {
  const [dates, setDates] = useState<StayDates>({ arrival: '', departure: '' });
  const [errors, setErrors] = useState<StayErrors>({}); const [minimum, setMinimum] = useState('');
  const [draft, setDraft] = useState(''); const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => { setMinimum(nextDay(todayInCatania())); }, []);
  const change = (key: keyof StayDates, value: string) => { setDates(previous => ({ ...previous, [key]: value })); setErrors({}); setDraft(''); };
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); const nextErrors = validateStay(dates); setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      const field = nextErrors.arrival ? 'arrival' : 'departure';
      formRef.current?.querySelector<HTMLInputElement>(`[name="${field}"]`)?.focus(); return;
    }
    const href = whatsappHref(dates); setDraft(href);
    window.open(href, '_blank', 'noopener,noreferrer');
  }
  return <section id="stay" className="stay-section" aria-labelledby="stay-title"><div className="container stay-grid">
    <Reveal className="stay-copy"><p className="eyebrow section-number"><span>06</span>Your next chapter</p><h2 id="stay-title">Make Catania<br />your <span>next stop.</span></h2><p>A couple of dates. A quick hello.<br />Let’s plan your time at Cifalino.</p><div className="stay-contact"><a href={`tel:${property.phoneUri}`}><Phone size={20} />{property.phone}<ArrowUpRight size={17} /></a><a href={`mailto:${property.email}`}><Mail size={20} />{property.email}<ArrowUpRight size={17} /></a></div></Reveal>
    <Reveal className="stay-form-panel"><div className="form-eyebrow"><CalendarDays size={22} strokeWidth={1.5} /><span>When would you like to stay?</span></div><form ref={formRef} onSubmit={submit} noValidate>
      <div className="date-grid">{(['arrival', 'departure'] as const).map(key => <div className="date-field" key={key}><label htmlFor={key}>{key === 'arrival' ? 'Arrival' : 'Departure'}</label><input type="date" id={key} name={key} value={dates[key]} min={key === 'departure' && validDate(dates.arrival) && dates.arrival >= minimum ? nextDay(dates.arrival) : minimum} required onChange={event => change(key, event.target.value)} aria-invalid={Boolean(errors[key])} aria-describedby={errors[key] ? `${key}-error` : 'date-help'} />{errors[key] && <p className="field-error" id={`${key}-error`} role="alert">{errors[key]}</p>}</div>)}</div>
      <p id="date-help" className="date-help">Choose future dates. We’ll check them with you.</p>
      <button className="button button-whatsapp" type="submit"><MessageCircle size={23} /><span>Ask about availability<br className="desktop-break" /> on WhatsApp</span><ArrowUpRight size={23} /></button>
      <p className="form-promise">We'll confirm availability and the total price with you.</p>
      <p className="form-note">This opens a draft message. You decide when to send it. Your stay is confirmed directly with Giuseppe.</p>
      {draft && <div className="draft-ready" role="status"><p>Your message is ready. Continue in WhatsApp to send it.</p><a href={draft} target="_blank" rel="noopener noreferrer" className="text-link">Open your WhatsApp draft<ArrowUpRight size={17} /></a></div>}
      <noscript><p>Please call or email Giuseppe to ask about dates. The WhatsApp date form needs JavaScript.</p></noscript>
    </form>{bookingAlternatives.filter(link => link.enabled).length > 0 && <div className="booking-alternatives">{bookingAlternatives.filter(link => link.enabled).map(link => <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">{link.label}<ArrowUpRight size={17} /></a>)}</div>}</Reveal>
  </div></section>;
}

export function MobileStayBar() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const section = document.getElementById('stay'); if (!section) return;
    const observer = new IntersectionObserver(entries => setVisible(!entries[0].isIntersecting), { threshold: 0.05 }); observer.observe(section);
    return () => observer.disconnect();
  }, []);
  return <div className={`mobile-stay-bar ${visible ? '' : 'is-hidden'}`} aria-hidden={!visible}><div><strong>Your place in Catania.</strong><span>Talk directly with Giuseppe</span></div><a href="#stay" className="button button-dark" tabIndex={visible ? 0 : -1}>Plan your stay<ArrowUpRight size={18} /></a></div>;
}
