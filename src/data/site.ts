export const property = {
  name: 'Cifalino Apartment', host: 'Giuseppe',
  street: 'Via Cifali', postcode: '95123', city: 'Catania', neighbourhood: 'Cibali', region: 'Sicily',
  phone: '+39 334 1924709', phoneUri: '+393341924709', whatsapp: '393341924709',
  email: 'cifalinocatania@gmail.com',
  cir: '19087015C235493', cin: 'IT087015C253LBG2RK',
} as const;

export const links = {
  canonical: 'https://cifalino.com/',
  privacy: 'https://cifalino.com/privacy-policy/',
  facebook: 'https://www.facebook.com/cifalinocatania',
  instagram: 'https://www.instagram.com/cifalinocatania/',
  author: 'https://etanoox.me/',
  map: 'https://www.google.com/maps/d/viewer?mid=1vjJwH-O8Tk8-HBXDF6G25mjObDu3PFI&hl=en',
  mapEmbed: 'https://www.google.com/maps/d/embed?mid=1vjJwH-O8Tk8-HBXDF6G25mjObDu3PFI&hl=en&ehbc=2E312F',
  metro: 'https://maps.app.goo.gl/jJ2SkiXiJT3PzY838',
} as const;


export const bookingPlatforms = [
  {
    slug: 'airbnb',
    label: 'Airbnb',
    wordmark: 'airbnb',
    href: 'https://www.airbnb.it/rooms/8890050',
    icon: 'https://cdn.simpleicons.org/airbnb/FF385C',
    description: 'Open the Airbnb listing to check the details, availability and booking options shown there.',
  },
  {
    slug: 'booking',
    label: 'Booking.com',
    wordmark: 'Booking.com',
    href: 'https://www.booking.com/hotel/it/cifalino-full-cozy-apartment-with-wi-fi-in-catania.it.html',
    icon: 'https://cdn.simpleicons.org/bookingdotcom/003B95',
    description: 'Open the Booking.com listing to check the details, availability and booking options shown there.',
  },
] as const;

export interface BookingAlternative { label: string; href: string; enabled: boolean; verification: string }
export const bookingAlternatives: BookingAlternative[] = [
  { label: 'WordPress booking', href: 'https://cifalino.com/booking/', enabled: false, verification: 'Page exists; booking and inventory not operationally verified.' },
  { label: 'Airbnb', href: bookingPlatforms[0].href, enabled: false, verification: 'Published source link; listing and bookability not verified.' },
  { label: 'Booking.com', href: bookingPlatforms[1].href, enabled: false, verification: 'Published source link; listing and bookability not verified.' },
];

export const features = { journal: false };
export interface JournalArticle { slug: string; title: string; excerpt: string; image: string; imageAlt: string; href: string }
export const journalArticles: JournalArticle[] = [];
export const navigation = [
  { id: 'apartment', label: 'The apartment' },
  { id: 'amenities', label: 'Amenities' },
  { id: 'location', label: 'Location' },
  { id: 'faq', label: 'FAQ' },
  { id: 'book-online', label: 'Book your way' },
];
export const testimonials = [
  { name: 'Eleonora', quote: 'Giuseppe was an excellent host…' },
  { name: 'Sara', quote: 'Giuseppe is also a friendly and warm host.' },
] as const;

export const faqs = [
  { question: 'Will I have the whole apartment?', answer: 'Yes. Cifalino Apartment is a single apartment, entirely for your use during your stay.' },
  { question: 'How does self check-in work?', answer: 'You can let yourself in using a key lockbox. Giuseppe will share the arrival instructions and agree the check-in arrangements with you before your stay.' },
  { question: 'Where can I park?', answer: 'Free public street parking is listed near the apartment, and there is private parking nearby. Spaces are not reserved or guaranteed. Check local signs and any private parking charges when you arrive.' },
  { question: 'Is there a metro station nearby?', answer: 'Cibali metro station is approximately a five-minute walk away. This is an indicative walking time. There is also a bus stop nearby.' },
  { question: 'How do I ask about availability?', answer: 'Choose your arrival and departure dates below, then open your WhatsApp draft. Send it when you are ready. Giuseppe will confirm availability and the total price with you. You can also call or email.' },
  { question: 'What are the stay and cancellation conditions?', answer: 'Please agree the price, payment, check-in and check-out times, length of stay and cancellation conditions with Giuseppe for your requested dates before confirming. Sending an enquiry does not make a booking. Smoking is allowed outside only.' },
] as const;

export const structuredData = {
  '@context': 'https://schema.org', '@type': 'LodgingBusiness', '@id': `${links.canonical}#apartment`,
  name: property.name, url: links.canonical,
  description: 'An entire apartment in Cibali, Catania, with a balcony, self check-in and everyday comforts. Contact Giuseppe to ask about availability.',
  telephone: property.phoneUri, email: property.email,
  image: `${links.canonical}images/sleeping.webp`,
  logo: `${links.canonical}images/logo.svg`,
  address: { '@type': 'PostalAddress', streetAddress: property.street, addressLocality: property.city, postalCode: property.postcode, addressRegion: property.region, addressCountry: 'IT' },
  identifier: [ { '@type': 'PropertyValue', name: 'CIR', value: property.cir }, { '@type': 'PropertyValue', name: 'CIN', value: property.cin } ],
  amenityFeature: ['Wi-Fi', 'Air conditioning', 'Balcony', 'Kitchen', 'Washing machine', 'Self check-in'].map(name => ({ '@type': 'LocationFeatureSpecification', name, value: true })),
  sameAs: [links.facebook, links.instagram, ...bookingPlatforms.map(platform => platform.href)],
};
