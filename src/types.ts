export type Screen =
  | 'splash'
  | 'login'
  | 'signup'
  | 'admin-login'
  | 'home'
  | 'baby'
  | 'women'
  | 'men'
  | 'shoes'
  | 'accs'
  | 'discover'
  | 'product'
  | 'try-on'
  | 'cart'
  | 'profile'
  | 'admin'
  | 'admin-inventory'
  | 'admin-orders'
  | 'admin-marketing'
  | 'admin-analytics'
  | 'admin-catalogs'
  | 'admin-staff'
  | 'admin-messages'
  | 'add-product'
  | 'orders'
  | 'invoice'
  | 'catalog-products'
  | 'custom-tshirt'
  | 'saved-looks'
  | 'measurements'
  | 'payment-methods'
  | 'financial';

export interface CustomDesign {
  frontText?: string;
  backText?: string;
  frontImage?: string; // base64
  backImage?: string; // base64
  color?: string;
  textColor?: string;
  fontSize?: number;
}

export interface UserMeasurements {
  height?: string;
  weight?: string;
  chest?: string;
  waist?: string;
  hips?: string;
  inseam?: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  isLoggedIn: boolean;
  measurements?: UserMeasurements;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  catalogId?: string;
  isVirtualReady?: boolean;
  rating?: number;
}

export interface Catalog {
  id: string;
  name: string;
  image: string;
  icon?: string; // lucide-react icon name
  parentCategory: string; // 'women', 'men', 'baby', 'shoes', 'accs'
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
  customDesign?: CustomDesign;
}

export interface Order {
  id: string;
  date: string;
  status: 'Pending' | 'Accepted' | 'Shipped' | 'Delivered' | 'Cancelled';
  items: CartItem[];
  total: number;
  customerName: string;
  shippingAddress?: string;
  phone?: string;
  paymentMethod?: string;
}
