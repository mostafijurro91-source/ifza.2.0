/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Loader2 } from 'lucide-react';
import { Screen, UserProfile, CartItem, Order, Product, Catalog, UserMeasurements } from './types';
import { supabase, isSupabaseConfigured } from './lib/supabase';

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
import AdminStaff from './screens/AdminStaff';
import AdminMessages from './screens/AdminMessages';
import Header from './components/Header';
import CatalogProducts from './screens/CatalogProducts';
import Orders from './screens/Orders';
import Invoice from './screens/Invoice';
import CategorySection from './screens/CategorySection';
import CustomTShirt from './screens/CustomTShirt';
import SavedLooks from './screens/SavedLooks';
import Measurements from './screens/Measurements';
import PaymentMethods from './screens/PaymentMethods';
import BuyCredits from './screens/BuyCredits';
import FinancialDashboard from './components/FinancialDashboard';

import ChatWidget from './components/ChatWidget';

const INITIAL_CATALOGS: Catalog[] = [
  // Women
  { id: 'c1', name: 'Borka', image: 'https://images.unsplash.com/photo-1589467381464-9d10e08f5209?auto=format&fit=crop&q=80&w=400', icon: 'User', parentCategory: 'women' },
  { id: 'c2', name: 'Hijab', image: 'https://images.unsplash.com/photo-1584844281358-15496f8b92b6?auto=format&fit=crop&q=80&w=400', icon: 'UserCircle', parentCategory: 'women' },
  { id: 'c3', name: 'Saree', image: 'https://images.unsplash.com/photo-1610030469983-98e550d615ef?auto=format&fit=crop&q=80&w=400', icon: 'Waves', parentCategory: 'women' },
  { id: 'c4', name: 'Three Piece', image: 'https://images.unsplash.com/photo-1583391733958-d15f07011438?auto=format&fit=crop&q=80&w=400', icon: 'Layers', parentCategory: 'women' },
  { id: 'c5', name: 'Palazzo', image: 'https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?auto=format&fit=crop&q=80&w=400', icon: 'Columns', parentCategory: 'women' },
  { id: 'c6', name: 'Jacket', image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&q=80&w=400', icon: 'Wind', parentCategory: 'women' },

  // Men
  { id: 'c7', name: 'Panjabi', image: 'https://images.unsplash.com/photo-1596455607563-ad6193f76b17?auto=format&fit=crop&q=80&w=400', icon: 'Crown', parentCategory: 'men' },
  { id: 'c8', name: 'Shirt', image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&q=80&w=400', icon: 'Shirt', parentCategory: 'men' },
  { id: 'c9', name: 'T-Shirt', image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=400', icon: 'Shirt', parentCategory: 'men' },
  { id: 'c10', name: 'Pajama', image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=400', icon: 'Moon', parentCategory: 'men' },
  { id: 'c22', name: 'Fotua', image: 'https://images.unsplash.com/photo-1604695573706-53170668f6a6?auto=format&fit=crop&q=80&w=400', icon: 'Sun', parentCategory: 'men' },
  { id: 'c23', name: 'Jacket', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=400', icon: 'Wind', parentCategory: 'men' },
  { id: 'c24', name: 'Custom T-Shirt', image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&q=80&w=400', icon: 'PenTool', parentCategory: 'men' },

  // Baby
  { id: 'c11', name: 'Baby Boy', image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=400', icon: 'Baby', parentCategory: 'baby' },
  { id: 'c12', name: 'Baby Girl', image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&q=80&w=400', icon: 'Heart', parentCategory: 'baby' },
  { id: 'c13', name: 'Toys', image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=400', icon: 'Gamepad2', parentCategory: 'baby' },

  // Shoes
  { id: 'c14', name: 'Sneakers', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=400', icon: 'Activity', parentCategory: 'shoes' },
  { id: 'c15', name: 'Formal', image: 'https://images.unsplash.com/photo-1614252235316-02015ea26d18?auto=format&fit=crop&q=80&w=400', icon: 'Briefcase', parentCategory: 'shoes' },
  { id: 'c16', name: 'Sandals', image: 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&q=80&w=400', icon: 'Sun', parentCategory: 'shoes' },
  { id: 'c17', name: 'Nagra', image: 'https://images.unsplash.com/photo-1603487742131-4160ec999306?auto=format&fit=crop&q=80&w=400', icon: 'Star', parentCategory: 'shoes' },

  // Accessories
  { id: 'c18', name: 'Watches', image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=400', icon: 'Watch', parentCategory: 'accs' },
  { id: 'c19', name: 'Bags', image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&q=80&w=400', icon: 'ShoppingBag', parentCategory: 'accs' },
  { id: 'c20', name: 'Jewelry', image: 'https://images.unsplash.com/photo-1599643478524-fb66f70d00f0?auto=format&fit=crop&q=80&w=400', icon: 'Gem', parentCategory: 'accs' },
  { id: 'c21', name: 'Sunglasses', image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=400', icon: 'Glasses', parentCategory: 'accs' }
];

const INITIAL_PRODUCTS: Product[] = [
  // Women
  { id: 'p1', name: 'Premium Dubai Borka', price: 2500, image: 'https://images.unsplash.com/photo-1589467381464-9d10e08f5209?auto=format&fit=crop&q=80&w=400', category: 'women', catalogId: 'c1', rating: 5 },
  { id: 'p2', name: 'Georgette Hijab', price: 450, image: 'https://images.unsplash.com/photo-1584844281358-15496f8b92b6?auto=format&fit=crop&q=80&w=400', category: 'women', catalogId: 'c2', rating: 4 },
  { id: 'p3', name: 'Dhakai Jamdani Saree', price: 4500, image: 'https://images.unsplash.com/photo-1610030469983-98e550d615ef?auto=format&fit=crop&q=80&w=400', category: 'women', catalogId: 'c3', rating: 5 },
  { id: 'p4', name: 'Cotton Three Piece', price: 1250, image: 'https://images.unsplash.com/photo-1583391733958-d15f07011438?auto=format&fit=crop&q=80&w=400', category: 'women', catalogId: 'c4', rating: 2 },

  // Men
  { id: 'p5', name: 'Premium Silk Panjabi', price: 2500, image: 'https://images.unsplash.com/photo-1596455607563-ad6193f76b17?auto=format&fit=crop&q=80&w=400', category: 'men', catalogId: 'c7', rating: 5 },
  { id: 'p6', name: 'Cotton Casual Shirt', price: 850, image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&q=80&w=400', category: 'men', catalogId: 'c8', rating: 3 },

  // Shoes
  { id: 'p7', name: 'Leather Sandal', price: 1200, image: 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&q=80&w=400', category: 'shoes', catalogId: 'c16', rating: 4 },
  { id: 'p8', name: 'Traditional Nagra', price: 950, image: 'https://images.unsplash.com/photo-1603487742131-4160ec999306?auto=format&fit=crop&q=80&w=400', category: 'shoes', catalogId: 'c17', rating: 2 },

  // Accessories
  { id: 'p9', name: 'Gold Plated Necklace', price: 3500, image: 'https://images.unsplash.com/photo-1599643478524-fb66f70d00f0?auto=format&fit=crop&q=80&w=400', category: 'accs', catalogId: 'c20', rating: 5 },
  { id: 'p10', name: 'Leather Handbag', price: 2200, image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&q=80&w=400', category: 'accs', catalogId: 'c19', rating: 3 }
];

export default function App() {
  const [screen, setScreen] = useState<Screen>('splash');
  const [history, setHistory] = useState<Screen[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState<UserProfile>({
    name: '',
    email: '',
    isLoggedIn: false,
    measurements: {
      height: '',
      weight: '',
      chest: '',
      waist: '',
      hips: '',
      inseam: ''
    }
  });
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCatalog, setSelectedCatalog] = useState<Catalog | null>(null);
  const [fittingRoomItems, setFittingRoomItems] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const [searchImage, setSearchImage] = useState<string | null>(null);

  const [catalogs, setCatalogs] = useState<Catalog[]>(INITIAL_CATALOGS);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [virtualFitImage, setVirtualFitImage] = useState<string | null>(null);
  const [savedLooks, setSavedLooks] = useState<string[]>([]);

  const toggleSavedLook = (productId: string) => {
    setSavedLooks(prev => prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]);
  };

  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    const initializeSession = async () => {
      setIsAuthLoading(true);
      
      try {
        // 1. Check for custom mock/manual sessions first
        const adminSession = localStorage.getItem('admin_session');
        const userSession = localStorage.getItem('user_session');

        if (adminSession) {
          try {
            const parsed = JSON.parse(adminSession);
            if (parsed.email) {
              const { data } = await supabase
                .from('app_admins')
                .select('role')
                .eq('email', parsed.email)
                .single();
              
              if (data && ['admin', 'staff', 'manager'].includes(data.role)) {
                setIsAdminLoggedIn(true);
              }
            }
          } catch (e) {
            localStorage.removeItem('admin_session');
          }
        }

        if (userSession) {
          try {
            const parsed = JSON.parse(userSession);
            setUser(prev => ({ ...prev, isLoggedIn: true, name: parsed.name, email: parsed.email }));
          } catch (e) {
            localStorage.removeItem('user_session');
          }
        }

        // 2. Check Supabase Auth Session
        if (isSupabaseConfigured) {
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user) {
            setUser(prev => ({
              ...prev,
              isLoggedIn: true,
              name: session.user.user_metadata.full_name || session.user.email?.split('@')[0] || 'User',
              email: session.user.email || ''
            }));

            // If not already logged in as admin via custom session, check DB
            if (!isAdminLoggedIn) {
              const { data: adminData } = await supabase
                .from('app_admins')
                .select('role')
                .eq('id', session.user.id)
                .single();
              
              if (adminData) {
                setIsAdminLoggedIn(true);
              } else {
                // Secondary check in profiles
                const { data: profile } = await supabase
                  .from('profiles')
                  .select('role')
                  .eq('id', session.user.id)
                  .single();
                if (profile?.role === 'admin' || profile?.role === 'staff') {
                  setIsAdminLoggedIn(true);
                }
              }
            }
          }
        }
      } catch (err) {
        console.error('Session initialization error:', err);
      } finally {
        setIsAuthLoading(false);
      }
    };

    initializeSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        setUser(prev => ({
          ...prev,
          isLoggedIn: true,
          name: session.user.user_metadata.full_name || session.user.email?.split('@')[0] || 'User',
          email: session.user.email || ''
        }));

        const { data: adminData } = await supabase
          .from('app_admins')
          .select('role')
          .eq('id', session.user.id)
          .single();
        
        if (adminData) {
          setIsAdminLoggedIn(true);
        }
      } else {
        setUser({ 
          name: '', 
          email: '', 
          isLoggedIn: false,
          measurements: { height: '', weight: '', chest: '', waist: '', hips: '', inseam: '' }
        });
        if (!localStorage.getItem('admin_session')) {
          setIsAdminLoggedIn(false);
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Fetch data from Supabase
  useEffect(() => {
    const fetchData = async () => {
      if (!isSupabaseConfigured) {
        setIsAuthLoading(false);
        return;
      }

      try {
        // Fetch Catalogs
        const { data: catalogsData, error: catalogsError } = await supabase
          .from('catalogs')
          .select('*');

        if (!catalogsError && catalogsData) {
          const mappedCatalogs: Catalog[] = catalogsData.map((c) => ({
            id: c.id,
            name: c.name,
            image: c.image,
            parentCategory: c.parent_category,
            icon: c.icon
          }));
          setCatalogs(mappedCatalogs.length > 0 ? mappedCatalogs : INITIAL_CATALOGS);
        }

        // Fetch Products
        const { data: productsData, error: productsError } = await supabase
          .from('products')
          .select('*');

        if (!productsError && productsData) {
          const mappedProducts: Product[] = productsData.map((p) => ({
            id: p.id,
            name: p.name,
            price: p.price,
            originalPrice: p.original_price,
            image: p.image,
            category: p.category,
            catalogId: p.catalog_id,
            rating: p.rating,
            isVirtualReady: p.is_virtual_ready,
            stock: p.stock,
            variants: p.variants || []
          }));
          // Only show mock data if DB is completely empty and no records returned
          setProducts(mappedProducts.length > 0 ? mappedProducts : INITIAL_PRODUCTS);
        }

        // Fetch Orders
        const { data: ordersData, error: ordersError } = await supabase
          .from('orders')
          .select('*')
          .order('date', { ascending: false });

        if (!ordersError && ordersData) {
          const mappedOrders: Order[] = ordersData.map((o) => ({
            id: o.id,
            date: o.date,
            status: o.status,
            total: o.total,
            customerName: o.customer_name,
            shippingAddress: o.shipping_address,
            phone: o.phone,
            paymentMethod: o.payment_method,
            items: o.items,
            user_id: o.user_id
          }));
          setOrders(mappedOrders);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setIsAuthLoading(false);
      }
    };

    fetchData();
  }, []);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleLogout = async () => {
    localStorage.removeItem('user_session');
    if (isSupabaseConfigured) {
      await supabase.auth.signOut();
    }
    setUser({ name: '', email: '', isLoggedIn: false });
    setScreen('login');
  };

  const handleAdminLogout = async () => {
    localStorage.removeItem('admin_session');
    if (isSupabaseConfigured) {
      await supabase.auth.signOut();
    }
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

  const addToFittingRoom = (product: Product) => {
    if (!fittingRoomItems.find(i => i.id === product.id)) {
      setFittingRoomItems(prev => [...prev, product]);
    }
    setScreen('try-on');
  };

  const removeFromFittingRoom = (productId: string) => {
    setFittingRoomItems(prev => prev.filter(i => i.id !== productId));
  };

  const checkout = (details: { name: string, phone: string, address: string, paymentMethod: string }) => {
    if (cart.length === 0) return;

    // Update user profile with latest details for future auto-fill
    setUser(prev => ({
      ...prev,
      name: details.name,
      phone: details.phone,
      address: details.address
    }));

    const newOrder: Order = {
      id: `#COKMOKE-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString(),
      status: 'Pending',
      items: [...cart],
      total: cart.reduce((acc, item) => acc + (item.price * item.quantity), 0),
      customerName: details.name || user.name || 'Guest',
      phone: details.phone,
      shippingAddress: details.address,
      paymentMethod: details.paymentMethod,
      user_id: undefined // In a real app, this would be supabase.auth.user()?.id
    };

    // Persist to Supabase
    if (isSupabaseConfigured) {
      supabase.from('orders').insert({
        id: newOrder.id,
        status: newOrder.status,
        total: newOrder.total,
        customer_name: newOrder.customerName,
        shipping_address: newOrder.shippingAddress,
        phone: newOrder.phone,
        payment_method: newOrder.paymentMethod,
        items: newOrder.items
      }).then(({ error }) => {
        if (error) console.error('Error saving order:', error);
      });
    }

    setOrders(prev => [newOrder, ...prev]);
    setCart([]);
    setScreen('invoice');
  };

  const updateOrderStatus = async (orderId: string, status: 'Pending' | 'Shipped' | 'Delivered' | 'Accepted') => {
    if (isSupabaseConfigured) {
      const { error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', orderId);
      
      if (error) {
        console.error('Error updating order status:', error);
        return;
      }
    }

    setOrders(prev => prev.map(order =>
      order.id === orderId ? { ...order, status: status as any } : order
    ));
  };

  const addProduct = async (product: Product) => {
    if (isSupabaseConfigured) {
      const { error } = await supabase
        .from('products')
        .insert({
          id: product.id,
          name: product.name,
          price: product.price,
          original_price: product.originalPrice,
          image: product.image,
          category: product.category,
          catalog_id: product.catalogId || null,
          is_virtual_ready: product.isVirtualReady,
          rating: product.rating || 0,
          stock: product.stock || 0,
          variants: product.variants || []
        });
      
      if (error) {
        console.error('Error adding product to Supabase:', error);
        throw error; // Rethrow to handle in component
      }
      console.log('Product added successfully to Supabase');
    }
    setProducts(prev => [...prev, product]);
  };

  const updateProduct = async (id: string, updates: Partial<Product & { stock: number }>) => {
    if (isSupabaseConfigured) {
      const { error } = await supabase
        .from('products')
        .update({
          price: updates.price,
          original_price: updates.originalPrice,
          stock: updates.stock,
          variants: updates.variants,
          catalog_id: updates.catalogId !== undefined ? (updates.catalogId || null) : undefined
        })
        .eq('id', id);
      
      if (error) {
        console.error('Error updating product in Supabase:', error);
        throw error;
      }
      console.log('Product updated successfully in Supabase');
    }
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const deleteProduct = async (id: string) => {
    if (isSupabaseConfigured) {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);
      
      if (error) {
        console.error('Error deleting product from Supabase:', error);
        throw error;
      }
      console.log('Product deleted successfully from Supabase');
    }
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const navigateWithAuth = (target: Screen, product?: Product, catalog?: Catalog) => {
    if (product) setSelectedProduct(product);
    if (catalog) setSelectedCatalog(catalog);

    // If still verifying sessions, don't allow potentially insecure navigation
    if (isAuthLoading) return;

    if ((target === 'try-on' || target === 'cart' || target === 'orders') && !user.isLoggedIn) {
      setHistory(prev => [...prev, screen]);
      setScreen('login');
      return;
    }

    // Protect admin screens
    const adminScreens: Screen[] = ['admin', 'add-product', 'admin-inventory', 'admin-orders', 'admin-marketing', 'admin-analytics', 'admin-catalogs', 'admin-staff'];
    if (adminScreens.includes(target) && !isAdminLoggedIn) {
      setHistory(prev => [...prev, screen]);
      setScreen('admin-login');
      return;
    }

    setHistory(prev => [...prev, screen]);
    setScreen(target);
  };

  const goBack = () => {
    if (history.length > 0) {
      const previousScreen = history[history.length - 1];
      setHistory(prev => prev.slice(0, -1));
      setScreen(previousScreen);
    }
  };

  const saveMeasurements = (measurements: UserMeasurements) => {
    setUser(prev => ({ ...prev, measurements }));
    // In a real app, save to Supabase/backend
  };

  const renderScreen = () => {
    if (isAuthLoading && (screen.startsWith('admin') || screen === 'add-product')) {
      return (
        <div className="flex h-screen items-center justify-center">
          <Loader2 className="animate-spin text-blue-600 size-10" />
        </div>
      );
    }

    switch (screen) {
      case 'splash':
        return <Splash onComplete={() => setScreen('home')} />;
      case 'login':
        return <Login setScreen={(s) => setScreen(s)} />;
      case 'signup':
        return <Signup setScreen={(s) => setScreen(s)} />;
      case 'admin-login':
        return <AdminLogin setScreen={(s) => {
          if (s === 'admin') setIsAdminLoggedIn(true);
          setScreen(s);
        }} />;
      case 'home':
        return <Home
          setScreen={navigateWithAuth}
          cartCount={cartCount}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          products={products}
          catalogs={catalogs}
          setSearchImage={setSearchImage}
          savedLooks={savedLooks}
          toggleSavedLook={toggleSavedLook}
          user={user}
        />;
      case 'baby':
        return <BabySection setScreen={navigateWithAuth} products={products} catalogs={catalogs} />;
      case 'women':
      case 'men':
      case 'shoes':
      case 'accs':
      case 'discover':
        return <CategorySection
          setScreen={navigateWithAuth}
          category={screen}
          catalogs={catalogs}
          searchQuery={searchQuery}
          products={products}
          searchImage={searchImage}
          user={user}
        />;
      case 'catalog-products':
        if (selectedCatalog?.id === 'c24') {
          return <CustomTShirt setScreen={navigateWithAuth} addToCart={addCustomToCart} />;
        }
        return <CatalogProducts setScreen={navigateWithAuth} goBack={goBack} catalog={selectedCatalog} products={products} user={user} />;
      case 'custom-tshirt':
        return <CustomTShirt setScreen={navigateWithAuth} addToCart={addCustomToCart} />;
      case 'product':
        return <ProductDetail
          setScreen={navigateWithAuth}
          product={selectedProduct}
          onAddToCart={addToCart}
          onAddToFittingRoom={addToFittingRoom}
          savedLooks={savedLooks}
          toggleSavedLook={toggleSavedLook}
        />;
      case 'try-on':
        return <VirtualFittingRoom
          setScreen={navigateWithAuth}
          items={fittingRoomItems}
          onRemoveItem={removeFromFittingRoom}
          onAddToCart={addToCart}
          uploadedImage={virtualFitImage}
          setUploadedImage={setVirtualFitImage}
        />;
      case 'cart':
        return <Cart
          setScreen={navigateWithAuth}
          cart={cart}
          onRemove={removeFromCart}
          onUpdateQuantity={updateQuantity}
          onCheckout={checkout}
          user={user}
        />;
      case 'profile':
        return <Profile setScreen={navigateWithAuth} user={user} onLogout={handleLogout} />;
      case 'saved-looks':
        return <SavedLooks setScreen={navigateWithAuth} products={products} savedLooks={savedLooks} toggleSavedLook={toggleSavedLook} />;
      case 'measurements':
        return <Measurements setScreen={navigateWithAuth} user={user} onSave={saveMeasurements} />;
      case 'payment-methods':
        return <PaymentMethods setScreen={navigateWithAuth} />;
      case 'financial':
        return <FinancialDashboard />;
      case 'buy-credits':
        return <BuyCredits setScreen={navigateWithAuth} />;
      case 'admin':
        return <AdminDashboard setScreen={navigateWithAuth} onLogout={handleAdminLogout} />;
      case 'admin-inventory':
        return <AdminInventory setScreen={navigateWithAuth} products={products} onUpdateProduct={updateProduct} onDeleteProduct={deleteProduct} />;
      case 'admin-orders':
        return <AdminOrders setScreen={navigateWithAuth} orders={orders} onUpdateStatus={updateOrderStatus} />;
      case 'admin-marketing':
        return <AdminMarketing setScreen={navigateWithAuth} />;
      case 'admin-analytics':
        return <AdminAnalytics setScreen={navigateWithAuth} orders={orders} />;
      case 'admin-catalogs':
        return <AdminCatalogs setScreen={navigateWithAuth} catalogs={catalogs} setCatalogs={setCatalogs} />;
      case 'admin-staff':
        return <AdminStaff setScreen={navigateWithAuth} />;
      case 'admin-messages':
        return <AdminMessages setScreen={navigateWithAuth} />;
      case 'add-product':
        return <AddProduct setScreen={navigateWithAuth} catalogs={catalogs} addProduct={addProduct} />;
      case 'orders':
        return <Orders setScreen={navigateWithAuth} orders={orders} />;
      case 'invoice':
        return <Invoice setScreen={navigateWithAuth} order={orders[0]} />;
      default:
        return <Home setScreen={navigateWithAuth} cartCount={cartCount} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />;
    }
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark overflow-x-hidden">
      <div className={`mx-auto w-full ${screen.startsWith('admin') || screen === 'add-product' ? 'max-w-full' : 'max-w-7xl'} min-h-screen relative shadow-2xl overflow-x-hidden bg-background-light dark:bg-background-dark`}>
        {screen !== 'splash' && !screen.startsWith('admin') && (
          <Header setScreen={navigateWithAuth} cartCount={cartCount} currentScreen={screen} />
        )}
        <AnimatePresence mode="wait">
          <motion.div
            key={screen}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full"
          >
            {renderScreen()}
          </motion.div>
        </AnimatePresence>
        {!screen.startsWith('admin') && <ChatWidget />}
      </div>
    </div>
  );
}

