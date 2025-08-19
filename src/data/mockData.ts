import { Product, Color, Size, Design } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'كاب أنيق',
    price: 45,
    image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg',
    description: 'كاب عصري بتصميم فريد وجودة عالية',
    category: 'cap',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'تيشيرت مطرز',
    price: 120,
    image: 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg',
    description: 'تيشيرت بتطريز يدوي فاخر وأقمشة عالية الجودة',
    category: 'tshirt',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'هودي فاخر',
    price: 175,
    image: 'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg',
    description: 'هودي مريح بتصميم عصري وخامات فاخرة',
    category: 'hoodie',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const colors: Color[] = [
  { id: '1', name: 'أسود', hex: '#000000' },
  { id: '2', name: 'أبيض', hex: '#FFFFFF' },
  { id: '3', name: 'أخضر', hex: '#00FF00' },
  { id: '4', name: 'أزرق', hex: '#0066FF' },
  { id: '5', name: 'أحمر', hex: '#FF0000' },
  { id: '6', name: 'رمادي', hex: '#808080' },
];

export const sizes: Size[] = [
  { id: '1', name: 'S', label: 'صغير' },
  { id: '2', name: 'M', label: 'متوسط' },
  { id: '3', name: 'L', label: 'كبير' },
  { id: '4', name: 'XL', label: 'كبير جداً' },
  { id: '5', name: 'XXL', label: 'كبير جداً جداً' },
];

export const designs: Design[] = [
  { id: '1', name: 'مطرز', type: 'embroidered', price: 25 },
  { id: '2', name: 'سادة', type: 'plain', price: 0 },
  { id: '3', name: 'تصميم مخصص', type: 'custom', price: 50 },
];