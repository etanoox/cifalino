import { property } from '../data/site';
export interface StayDates { arrival: string; departure: string }
export type StayErrors = Partial<Record<keyof StayDates, string>>;
export function todayInCatania(): string {
  const parts = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Rome', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date());
  const get = (name: string) => parts.find(part => part.type === name)?.value;
  return `${get('year')}-${get('month')}-${get('day')}`;
}
export function nextDay(day: string) {
  const date = new Date(`${day}T12:00:00Z`); date.setUTCDate(date.getUTCDate() + 1); return date.toISOString().slice(0, 10);
}
export function validDate(date: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return false;
  const parsed = new Date(`${date}T12:00:00Z`);
  return Number.isFinite(parsed.getTime()) && parsed.toISOString().slice(0, 10) === date;
}
export function validateStay(dates: StayDates, today = todayInCatania()): StayErrors {
  const errors: StayErrors = {};
  if (!validDate(dates.arrival)) errors.arrival = 'Choose your arrival date.';
  else if (dates.arrival <= today) errors.arrival = 'Choose a future arrival date.';
  if (!validDate(dates.departure)) errors.departure = 'Choose your departure date.';
  else if (dates.departure <= today) errors.departure = 'Choose a future departure date.';
  else if (validDate(dates.arrival) && dates.departure <= dates.arrival) errors.departure = 'Departure must be after arrival.';
  return errors;
}
export function formatDate(date: string) {
  return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${date}T12:00:00Z`));
}
export function whatsappHref(dates: StayDates) {
  const message = `Hi Giuseppe! I'd like to ask about availability at Cifalino Apartment.\nArrival: ${formatDate(dates.arrival)}\nDeparture: ${formatDate(dates.departure)}\nCould you please confirm availability, the total price and the stay conditions? Thank you!`;
  return `https://wa.me/${property.whatsapp}?text=${encodeURIComponent(message)}`;
}
