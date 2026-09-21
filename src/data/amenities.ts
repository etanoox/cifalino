import { Wifi, Snowflake, Coffee, WashingMachine, KeyRound, Sun, Laptop, CookingPot, type LucideIcon } from 'lucide-react';
export interface Amenity { name: string; description: string; icon: LucideIcon }
export const amenities: Amenity[] = [
  { name: 'Free Wi-Fi', description: 'Keep in touch.', icon: Wifi },
  { name: 'Air conditioning', description: 'Come back and cool down.', icon: Snowflake },
  { name: 'Your own kitchen', description: 'Eat in, whenever you like.', icon: CookingPot },
  { name: 'Balcony', description: 'Take a moment outside.', icon: Sun },
  { name: 'Self check-in', description: 'Let yourself in with a lockbox.', icon: KeyRound },
  { name: 'Moka & kettle', description: 'Start the day your way.', icon: Coffee },
  { name: 'Workspace', description: 'A desk and office chair.', icon: Laptop },
  { name: 'Washing machine', description: 'Useful for the everyday.', icon: WashingMachine },
];
export const amenityGroups = [
  { title: 'Kitchen', items: ['Refrigerator', 'Utensils and kitchenware', 'Moka coffee pot', 'Kettle'] },
  { title: 'Bathroom', items: ['Shower and bidet', 'Hair dryer', 'Basic toiletries', 'Towels'] },
  { title: 'Sleep & work', items: ['Bed linen', 'Desk and office chair', 'Wi-Fi', 'TV'] },
  { title: 'Practical details', items: ['Key lockbox for self check-in', 'Fire extinguisher and smoke detector', 'Public street parking; no reserved space', 'Private parking nearby', 'Smoking outside only'] },
];
