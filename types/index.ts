export type ProductCategory = 'todos' | 'camisetas' | 'moletons' | 'calcas' | 'acessorios';

export type ProductSize = 'P' | 'M' | 'G' | 'GG';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle?: string;
  price: number;
  originalPrice?: number;
  category: 'camisetas' | 'moletons' | 'calcas' | 'acessorios';
  collection: string;
  drop: string;
  images: string[];
  colors: ProductColor[];
  sizes: ProductSize[];
  availableSizes: ProductSize[];
  description: string;
  details: string[];
  composition: string;
  fit: string;
  isNew?: boolean;
  isFeatured?: boolean;
  isDrop?: boolean;
  measurements: {
    size: ProductSize;
    chest: number;
    length: number;
    sleeve: number;
  }[];
}

export interface CartItem {
  id: string; // unique item id combining product.id + size + color
  product: Product;
  size: ProductSize;
  color: string;
  quantity: number;
}

export interface CheckoutFormData {
  fullName: string;
  whatsapp: string;
  email: string;
  cep: string;
  address: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  paymentMethod: 'pix' | 'credit_card';
}
