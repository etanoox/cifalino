export interface Photo {
  id: string; src: string; source: string; width: number; height: number; alt: string; caption: string;
}
const photo = (id: string, source: string, height: number, alt: string, caption: string, width = 1240): Photo => ({
  id, src: `/images/${id}.webp`, source: `https://cifalino.com/wp-content/uploads/${source}`, width, height, alt, caption,
});

// Descriptions and selection checked visually against the downloaded photographs.
export const photos: Photo[] = [
  photo('sleeping', '2021/09/cifalino-apartment-1240x760.webp', 827, 'Two beds with red fabric headboards and a bedside lamp in Cifalino Apartment.', 'A place to put the day on pause.'),
  photo('balcony', '2024/05/IMG_3482-1240x827.webp', 827, 'A small table and two chairs on the balcony, with neighbouring buildings beyond the railing.', 'Your own little outdoor corner.'),
  photo('workspace', '2024/05/IMG_3475-1240x826.webp', 826, 'Desk with a laptop, telephone and lamp inside the apartment.', 'A desk for a little work, if you need it.'),
  photo('bathroom', '2024/05/IMG_3452-1240x819.webp', 819, 'Bathroom washbasin, mirror and tiled wall.', 'The everyday essentials.'),
  photo('coffee', '2024/05/IMG_3463-1240x813.webp', 813, 'Kettle, tea tray and moka pot on a wooden surface.', 'Moka, kettle. Make yourself at home.'),
  photo('single-bed', '2024/05/single-bed-1240x827.webp', 827, 'A bed with a red headboard and folded towels on a patterned cover.', 'Fresh linen and towels.'),
  photo('books', '2024/05/IMG_3468-1240x816.webp', 816, 'A wall shelf with books and a round clock.', 'Little details around the apartment.'),
  photo('desk', '2024/05/IMG_3488-1240x832.webp', 832, 'Black office chair beside the wooden desk.', 'A comfortable spot to sit down.'),
  photo('bath-essentials', '2024/05/IMG_3449-1240x812.webp', 812, 'Individual bathroom products arranged on a glass surface.', 'Bathroom basics.'),
  photo('safety', '2024/05/IMG_3442-1240x817.webp', 817, 'First aid pouch and fire extinguisher on a wall shelf.', 'Practical details, close at hand.'),
  photo('balcony-table', '2024/05/IMG_3457-1240x827.webp', 827, 'A laptop on the balcony table in front of the railing.', 'A different spot to open your laptop.'),
  photo('tea', '2024/05/IMG_3464-1240x827.webp', 827, 'A tray with assorted tea packets beside the kettle.', 'Time for a cup of tea.'),
];
export const floorPlan = {
    id: 'floor-plan',
    src: '/images/floor-plan.png',
    source: '/images/floor-plan.png',
    width: 1161,
    height: 1354,
    alt: 'Floor plan of Cifalino Apartment.',
    caption: 'Cifalino Apartment · floor plan.'
  };
export const destination = photo('catania', '2024/04/Elephant-Catania-605x806.webp', 806, 'The Elephant Fountain and its obelisk in Piazza del Duomo, Catania.', 'Piazza del Duomo, Catania · a place to explore in the city', 605);
