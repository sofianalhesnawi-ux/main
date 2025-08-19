export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
  category: 'cap' | 'tshirt' | 'hoodie';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Color {
  id: string;
  name: string;
  hex: string;
}

export interface Size {
  id: string;
  name: string;
  label: string;
}

export interface Design {
  id: string;
  name: string;
  type: 'embroidered' | 'plain' | 'custom';
  price: number;
}

export interface OrderItem {
  productId: string;
  product: Product;
  colorId: string;
  color: Color;
  sizeId: string;
  size: Size;
  designId: string;
  design: Design;
  quantity: number;
}

export interface Customer {
  name: string;
  phone: string;
  address: string;
  notes?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  items: OrderItem[];
  customer: Customer;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface Admin {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'super_admin';
}

export interface OrderStep {
  step: number;
  title: string;
  isCompleted: boolean;
  isActive: boolean;
}