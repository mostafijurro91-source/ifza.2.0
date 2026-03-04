/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Sun, Moon, ShoppingBag, User, Sparkles } from 'lucide-react';
import { Screen, UserProfile, CartItem, Order, Product, Catalog } from './types';

// Screens
import Splash from './screens/Splash';
import Login from './screens/Login';
import Signup from './screens/Signup';
import AdminLogin from './screens/AdminLogin';
import Home from './screens/Home';
import BabySection from './screens/BabySection';
import ProductDetail from './screens/ProductDetail';
import VirtualFittingRoom from './screens/VirtualFittingRoom';
import Cart from './screens/Cart';
import Profile from './screens/Profile';
import AdminDashboard from './screens/AdminDashboard';
import AddProduct from './screens/AddProduct';
import AdminInventory from './screens/AdminInventory';
import AdminOrders from './screens/AdminOrders';
import AdminMarketing from './screens/AdminMarketing';
import AdminAnalytics from './screens/AdminAnalytics';
import AdminCatalogs from './screens/AdminCatalogs';
import CatalogProducts from './screens/CatalogProducts';
import Orders from './screens/Orders';
import Invoice from './screens/Invoice';
import CategorySection from './screens/CategorySection';
import CustomTShirt from './screens/CustomTShirt';

const INITIAL_CATALOGS: Catalog[] = [
  // Women
  { id: 'c1', name: 'Borka', image: 'https://images.unsplash.com/photo-1589467381464-9d10e08f5209?auto=format&fit=crop&q=80&w=400', parentCategory: 'women' },
  { id: 'c2', name: 'Hijab', image: 'https://images.unsplash.com/photo-1584844281358-15496f8b92b6?auto=format&fit=crop&q=80&w=400', parentCategory: 'women' },
  { id: 'c3', name: 'Saree', image: 'https://images.unsplash.com/photo-1610030469983-98e550d615ef?auto=format&fit=crop&q=80&w=400', parentCategory: 'women' },
  { id: 'c4', name: 'Three Piece', image: 'https://images.unsplash.com/photo-1583391733958-d15f07011438?auto=format&fit=crop&q=80&w=400', parentCategory: 'women' },
  { id: 'c5', name: 'Palazzo', image: 'https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?auto=format&fit=crop&q=80&w=400', parentCategory: 'women' },
  { id: 'c6', name: 'Jacket', image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&q=80&w=400', parentCategory: 'women' },

  // Men
  { id: 'c7', name: 'Panjabi', image: 'https://images.unsplash.com/photo-1596455607563-ad6193f76b17?auto=format&fit=crop&q=80&w=400', parentCategory: 'men' },
  { id: 'c8', name: 'Shirt', image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&q=80&w=400', parentCategory: 'men' },
  { id: 'c9', name: 'T-Shirt', image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=400', parentCategory: 'men' },
  { id: 'c10', name: 'Pajama', image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=400', parentCategory: 'men' },
  { id: 'c22', name: 'Fotua', image: 'https://images.unsplash.com/photo-1604695573706-53170668f6a6?auto=format&fit=crop&q=80&w=400', parentCategory: 'men' },
  { id: 'c23', name: 'Jacket', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=400', parentCategory: 'men' },
  { id: 'c24', name: 'Custom T-Shirt', image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&q=80&w=400', parentCategory: 'men' },

  // Baby
  { id: 'c11', name: 'Baby Boy', image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=400', parentCategory: 'baby' },
  { id: 'c12', name: 'Baby Girl', image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&q=80&w=400', parentCategory: 'baby' },
  { id: 'c13', name: 'Toys', image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=400', parentCategory: 'baby' },

  // Shoes
  { id: 'c14', name: 'Sneakers', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=400', parentCategory: 'shoes' },
  { id: 'c15', name: 'Formal', image: 'https://images.unsplash.com/photo-1614252235316-02015ea26d18?auto=format&fit=crop&q=80&w=400', parentCategory: 'shoes' },
  { id: 'c16', name: 'Sandals', image: 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&q=80&w=400', parentCategory: 'shoes' },
  { id: 'c17', name: 'Nagra', image: 'https://images.unsplash.com/photo-1603487742131-4160ec999306?auto=format&fit=crop&q=80&w=400', parentCategory: 'shoes' },

  // Accessories
  { id: 'c18', name: 'Watches', image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=400', parentCategory: 'accs' },
  { id: 'c19', name: 'Bags', image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&q=80&w=400', parentCategory: 'accs' },
  { id: 'c20', name: 'Jewelry', image: 'https://images.unsplash.com/photo-1599643478524-fb66f70d00f0?auto=format&fit=crop&q=80&w=400', parentCategory: 'accs' },
  { id: 'c21', name: 'Sunglasses', image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=400', parentCategory: 'accs' }
];

const INITIAL_PRODUCTS: Product[] = [
  // Women
  { id: 'p1', name: 'Premium Dubai Borka', price: 2500, image: 'https://images.unsplash.com/photo-1589467381464-9d10e08f5209?auto=format&fit=crop&q=80&w=400', category: 'women', catalogId: 'c1' },
  { id: 'p2', name: 'Georgette Hijab', price: 450, image: 'https://images.unsplash.com/photo-1584844281358-15496f8b92b6?auto=format&fit=crop&q=80&w=400', category: 'women', catalogId: 'c2' },
  { id: 'p3', name: 'Dhakai Jamdani Saree', price: 4500, image: 'https://images.unsplash.com/photo-1610030469983-98e550d615ef?auto=format&fit=crop&q=80&w=400', category: 'women', catalogId: 'c3' },
  { id: 'p4', name: 'Cotton Three Piece', price: 1250, image: 'https://images.unsplash.com/photo-1583391733958-d15f07011438?auto=format&fit=crop&q=80&w=400', category: 'women', catalogId: 'c4' },

  // Men
  { id: 'p5', name: 'Premium Silk Panjabi', price: 2500, image: 'https://images.unsplash.com/photo-1596455607563-ad6193f76b17?auto=format&fit=crop&q=80&w=400', category: 'men', catalogId: 'c7' },
  { id: 'p6', name: 'Cotton Casual Shirt', price: 850, image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&q=80&w=400', category: 'men', catalogId: 'c8' },

  // Shoes
  { id: 'p7', name: 'Leather Sandal', price: 1200, image: 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&q=80&w=400', category: 'shoes', catalogId: 'c16' },
  { id: 'p8', name: 'Traditional Nagra', price: 950, image: 'https://images.unsplash.com/photo-1603487742131-4160ec999306?auto=format&fit=crop&q=80&w=400', category: 'shoes', catalogId: 'c17' },

  // Accessories
  { id: 'p9', name: 'Gold Plated Necklace', price: 3500, image: 'https://images.unsplash.com/photo-1599643478524-fb66f70d00f0?auto=format&fit=crop&q=80&w=400', category: 'accs', catalogId: 'c20' },
  { id: 'p10', name: 'Leather Handbag', price: 2200, image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&q=80&w=400', category: 'accs', catalogId: 'c19' }
];

export default function App() {
  const [screen, setScreen] = useState<Screen>('splash');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [user, setUser] = useState<UserProfile>({
    name: '',
    email: '',
    isLoggedIn: false
  });
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCatalog, setSelectedCatalog] = useState<Catalog | null>(null);

  const [catalogs, setCatalogs] = useState<Catalog[]>(INITIAL_CATALOGS);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    // Force the dark class on html to enable Tailwind's dark: modifiers
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.style.colorScheme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.style.colorScheme = 'light';
    }
  }, [isDarkMode]);

  const handleLogin = (email: string) => {
    setUser({
      name: email.split('@')[0],
      email: email,
      isLoggedIn: true
    });
    setScreen('home');
  };

  const handleLogout = () => {
    setUser({
      name: '',
      email: '',
      isLoggedIn: false
    });
    setScreen('login');
  };

  const handleAdminLogin = (u: string, p: string) => {
    if (u === 'admin' && p === 'ifza2026') {
      setIsAdminLoggedIn(true);
      setScreen('admin');
      return true;
    }
    return false;
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    setScreen('home');
  };

  const addToCart = (product: Product, size: string, color: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.selectedSize === size && item.selectedColor === color && !item.customDesign);
      if (existing) {
        return prev.map(item =>
          (item.id === product.id && item.selectedSize === size && item.selectedColor === color && !item.customDesign)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1, selectedSize: size, selectedColor: color }];
    });
  };

  const addCustomToCart = (item: CartItem) => {
    setCart(prev => [...prev, item]);
  };

  const removeFromCart = (id: string, size?: string, color?: string) => {
    setCart(prev => prev.filter(item => !(item.id === id && item.selectedSize === size && item.selectedColor === color)));
  };

  const updateQuantity = (id: string, delta: number, size?: string, color?: string) => {
    setCart(prev => prev.map(item =>
      (item.id === id && item.selectedSize === size && item.selectedColor === color)
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    ));
  };

  const checkout = (details: { name: string, phone: string, address: string, paymentMethod: string }) => {
    if (cart.length === 0) return;

    const newOrder: Order = {
      id: `#IFZA-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'Pending',
      items: [...cart],
      total: cart.reduce((acc, item) => acc + (item.price * item.quantity), 0),
      customerName: details.name || user.name || 'Guest',
      phone: details.phone,
      shippingAddress: details.address,
      paymentMethod: details.paymentMethod
    };

    setOrders(prev => [newOrder, ...prev]);
    setCart([]);
    setScreen('invoice');
  };

  const navigateWithAuth = (target: Screen, product?: Product, catalog?: Catalog) => {
    // Scroll to top on every navigation
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (product) setSelectedProduct(product);
    if (catalog) setSelectedCatalog(catalog);

    // Auth Protection
    const protectedScreens: Screen[] = ['try-on', 'cart', 'orders', 'profile', 'add-product', 'admin-inventory', 'admin-orders', 'admin-marketing', 'admin-analytics', 'admin-catalogs'];

    if (protectedScreens.includes(target) && !user.isLoggedIn && !isAdminLoggedIn) {
      setScreen('login');
      return;
    }

    // Protect admin screens
    const adminScreens: Screen[] = ['admin', 'add-product', 'admin-inventory', 'admin-orders', 'admin-marketing', 'admin-analytics', 'admin-catalogs'];
    if (adminScreens.includes(target) && !isAdminLoggedIn) {
      setScreen('admin-login');
      return;
    }

    setScreen(target);
  };

  const NavItems = [
    { id: 'home' as Screen, label: 'Home', icon: <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg> },
    { id: 'discover' as Screen, label: 'Discover', icon: <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg> },
    { id: 'orders' as Screen, label: 'Orders', icon: <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg> },
    { id: 'profile' as Screen, label: 'Profile', icon: <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg> },
  ];

  const renderScreen = () => {
    switch (screen) {
      case 'splash':
        return <Splash onComplete={() => setScreen('home')} />;
      case 'login':
        return <Login setScreen={setScreen} onLogin={handleLogin} />;
      case 'signup':
        return <Signup setScreen={setScreen} onSignup={handleLogin} />;
      case 'admin-login':
        return <AdminLogin setScreen={setScreen} onAdminLogin={handleAdminLogin} />;
      case 'home':
        return <Home setScreen={navigateWithAuth} cartCount={cartCount} />;
      case 'baby':
        return <BabySection setScreen={navigateWithAuth} />;
      case 'women':
      case 'men':
      case 'shoes':
      case 'accs':
      case 'discover':
        return <CategorySection setScreen={navigateWithAuth} category={screen} catalogs={catalogs} />;
      case 'catalog-products':
        if (selectedCatalog?.id === 'c24') {
          return <CustomTShirt setScreen={navigateWithAuth} addToCart={addCustomToCart} />;
        }
        return <CatalogProducts setScreen={navigateWithAuth} catalog={selectedCatalog} products={products} />;
      case 'custom-tshirt':
        return <CustomTShirt setScreen={navigateWithAuth} addToCart={addCustomToCart} />;
      case 'product':
        return <ProductDetail
          setScreen={navigateWithAuth}
          product={selectedProduct}
          onAddToCart={addToCart}
        />;
      case 'try-on':
        return <VirtualFittingRoom setScreen={navigateWithAuth} />;
      case 'cart':
        return <Cart
          setScreen={navigateWithAuth}
          cart={cart}
          onRemove={removeFromCart}
          onUpdateQuantity={updateQuantity}
          onCheckout={checkout}
        />;
      case 'profile':
        return <Profile setScreen={navigateWithAuth} user={user} onLogout={handleLogout} />;
      case 'admin':
        return <AdminDashboard setScreen={navigateWithAuth} onLogout={handleAdminLogout} />;
      case 'admin-inventory':
        return <AdminInventory setScreen={navigateWithAuth} />;
      case 'admin-orders':
        return <AdminOrders setScreen={navigateWithAuth} orders={orders} />;
      case 'admin-marketing':
        return <AdminMarketing setScreen={navigateWithAuth} />;
      case 'admin-analytics':
        return <AdminAnalytics setScreen={navigateWithAuth} />;
      case 'admin-catalogs':
        return <AdminCatalogs setScreen={navigateWithAuth} catalogs={catalogs} setCatalogs={setCatalogs} />;
      case 'add-product':
        return <AddProduct setScreen={navigateWithAuth} catalogs={catalogs} addProduct={(p) => setProducts([...products, p])} />;
      case 'orders':
        return <Orders setScreen={navigateWithAuth} orders={orders} />;
      case 'invoice':
        return <Invoice setScreen={navigateWithAuth} order={orders[0]} />;
      default:
        return <Home setScreen={navigateWithAuth} cartCount={cartCount} />;
    }
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-white flex flex-col items-center transition-colors duration-300">
      {/* Desktop Header */}
      <header className="hidden md:flex w-full bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-primary/10 sticky top-0 z-[100] justify-center px-6">
        <div className="flex w-full max-w-7xl h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <h1
              className="text-2xl font-black italic tracking-tighter text-primary cursor-pointer"
              onClick={() => setScreen('home')}
            >
              IFZA
            </h1>
            <nav className="flex items-center gap-6">
              {['Women', 'Men', 'Baby', 'Shoes', 'Accessories'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setScreen(cat.toLowerCase() === 'accessories' ? 'accs' : cat.toLowerCase() as Screen)}
                  className="text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-primary transition-colors uppercase tracking-widest"
                >
                  {cat}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 hover:text-primary transition-colors rounded-full hover:bg-slate-100 dark:hover:bg-white/5"
              >
                {isDarkMode ? <Sun className="size-5" /> : <Moon className="size-5" />}
              </button>
              <button onClick={() => setScreen('cart')} className="relative p-2 hover:text-primary transition-colors">
                <ShoppingBag className="size-6" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 size-4 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
              <button onClick={() => setScreen('profile')} className="p-2 hover:text-primary transition-colors">
                <User className="size-6" />
              </button>
            </div>

            <button
              onClick={() => setScreen('try-on')}
              className="bg-primary hover:bg-primary/90 text-white font-bold py-2.5 px-6 rounded-full shadow-lg shadow-primary/20 transition-all active:scale-95 text-sm uppercase tracking-widest"
            >
              Virtual Try-On
            </button>
          </div>
        </div>
      </header>

      <main className="w-full flex-1 flex flex-col items-center">
        <div className="w-full max-w-7xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={screen}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="w-full min-h-full"
            >
              {renderScreen()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Mobile Navigation Spacer */}
      <div className="h-24 md:hidden" />
    </div>
  );
}

