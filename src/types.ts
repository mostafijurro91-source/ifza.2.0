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
  | 'add-product' 
  | 'orders' 
  | 'invoice'
  | 'catalog-products'
  | 'custom-tshirt';

export interface CustomDesign {
  frontText?: string;
  backText?: string;
  frontImage?: string; // base64
  backImage?: string; // base64
  color?: string;
}

export interface UserProfile {
  name: string;
  email: string;
  isLoggedIn: boolean;
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
}

export interface Catalog {
  id: string;
  name: string;
  image: string;
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
  status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
  items: CartItem[];
  total: number;
  customerName: string;
  shippingAddress?: string;
  phone?: string;
  paymentMethod?: string;
}
