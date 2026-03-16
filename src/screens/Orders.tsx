import React from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Search, Filter, Home, ShoppingBag, ReceiptText, User, Sparkles, Bookmark, ChevronRight, MessageCircle } from 'lucide-react';
import { Screen, Order } from '../types';

export default function Orders({ setScreen, orders }: { setScreen: (s: Screen) => void, orders: Order[] }) {
  return (
    <div className="relative flex h-[100dvh] w-full flex-col bg-slate-50 text-slate-900 overflow-hidden">
      <nav className="flex px-4 gap-6 overflow-x-auto no-scrollbar border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-40">
        <TabItem label="All" active />
        <TabItem label="Pending" />
        <TabItem label="Shipped" />
        <TabItem label="Delivered" />
      </nav>

      <main className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-6 max-w-7xl mx-auto w-full">
        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-500">
            <ShoppingBag className="size-16 mb-4 opacity-20" />
            <p>No orders yet</p>
            <button onClick={() => setScreen('home')} className="mt-4 text-primary font-bold">Start Shopping</button>
          </div>
        ) : (
          <>
            <section>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">Active Tracking</h3>
                <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded ${
                  orders[0].status === 'Delivered' ? 'text-green-400 bg-green-400/10' : 
                  orders[0].status === 'Shipped' ? 'text-purple-400 bg-purple-400/10' :
                  orders[0].status === 'Accepted' ? 'text-blue-400 bg-blue-400/10' :
                  'text-orange-400 bg-orange-400/10'
                }`}>
                  {orders[0].status}
                </span>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-1">Order ID</p>
                    <p className="text-base font-bold text-slate-900">{orders[0].id}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-1">Date</p>
                    <p className="text-base font-bold text-slate-900">{orders[0].date}</p>
                  </div>
                </div>
                
                {/* Dynamic Progress Bar */}
                <div className="relative flex items-center justify-between mb-8 px-2">
                  <div className="absolute left-0 right-0 h-1 bg-slate-200 top-1/2 -translate-y-1/2 rounded-full"></div>
                  <div 
                    className="absolute left-0 h-1 bg-primary top-1/2 -translate-y-1/2 rounded-full transition-all duration-500"
                    style={{ 
                      width: orders[0].status === 'Pending' ? '0%' : 
                             orders[0].status === 'Accepted' ? '33%' : 
                             orders[0].status === 'Shipped' ? '66%' : '100%' 
                    }}
                  ></div>
                  
                  {['Pending', 'Accepted', 'Shipped', 'Delivered'].map((step, index) => {
                    const isCompleted = 
                      (orders[0].status === 'Pending' && index === 0) ||
                      (orders[0].status === 'Accepted' && index <= 1) ||
                      (orders[0].status === 'Shipped' && index <= 2) ||
                      (orders[0].status === 'Delivered');
                    
                    return (
                      <div key={step} className="relative z-10 flex flex-col items-center">
                        <div className={`size-3 rounded-full transition-all duration-500 ${isCompleted ? 'bg-primary shadow-[0_0_8px_rgba(242,127,13,0.4)]' : 'bg-slate-300'}`}></div>
                        <span className={`absolute top-5 text-[8px] font-bold uppercase tracking-wider ${isCompleted ? 'text-primary' : 'text-slate-500'}`}>{step}</span>
                      </div>
                    );
                  })}
                </div>

                <div className="flex items-center gap-4 mt-8">
                  <div className="size-16 rounded-xl bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
                    <img 
                      src={orders[0].items[0].image} 
                      alt="Product" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-slate-900">{orders[0].items[0].name}</p>
                    <p className="text-xs text-slate-500">Customer: {orders[0].customerName}</p>
                  </div>
                  <button 
                    onClick={() => setScreen('invoice')}
                    className="bg-primary text-white text-xs font-bold px-4 py-2 rounded-lg active:scale-95 transition-all shadow-sm hover:bg-primary/90"
                  >
                    Details
                  </button>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-bold mb-4">Recent Orders</h3>
              <div className="space-y-3">
                {orders.map((order) => (
                  <OrderListItem 
                    key={order.id}
                    id={order.id} 
                    customer={order.customerName} 
                    items={`${order.items.length} ${order.items.length === 1 ? 'item' : 'items'}`} 
                    price={`৳${order.total.toFixed(2)}`} 
                    status={order.status} 
                    statusColor={
                      order.status === 'Delivered' ? 'text-green-400' : 
                      order.status === 'Shipped' ? 'text-purple-400' :
                      order.status === 'Accepted' ? 'text-blue-400' :
                      'text-orange-400'
                    } 
                    bgColor={
                      order.status === 'Delivered' ? 'bg-green-500/10' : 
                      order.status === 'Shipped' ? 'bg-purple-500/10' :
                      order.status === 'Accepted' ? 'bg-blue-500/10' :
                      'bg-orange-500/10'
                    } 
                  />
                ))}
              </div>
            </section>
          </>
        )}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-slate-50 border-t border-slate-200 pb-8 pt-3 px-6 flex justify-between items-center z-50">
        <OrderNavItem icon={<Home className="size-5" />} label="Home" onClick={() => setScreen('home')} />
        <OrderNavItem icon={<ReceiptText className="size-5 fill-primary" />} label="Orders" active />
        <div className="flex flex-col items-center gap-1 cursor-pointer" onClick={() => setScreen('try-on')}>
          <div className="bg-primary p-2 rounded-full -mt-8 shadow-lg shadow-primary/40 ring-4 ring-slate-50">
            <Sparkles className="size-8 text-white" />
          </div>
          <span className="text-[10px] font-semibold text-primary uppercase tracking-tighter mt-1">Try-On</span>
        </div>
        <OrderNavItem icon={<Bookmark className="size-5" />} label="Saved" />
        <OrderNavItem icon={<User className="size-5" />} label="Profile" onClick={() => setScreen('profile')} />
      </nav>
    </div>
  );
}

function TabItem({ label, active }: { label: string, active?: boolean }) {
  return (
    <button className={`flex flex-col items-center justify-center border-b-2 pb-3 pt-2 ${active ? 'border-primary text-primary' : 'border-transparent text-slate-500'}`}>
      <span className="text-sm font-bold whitespace-nowrap">{label}</span>
    </button>
  );
}

function OrderListItem({ id, customer, items, price, status, statusColor, bgColor }: { id: string, customer: string, items: string, price: string, status: string, statusColor: string, bgColor: string }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-4 cursor-pointer hover:bg-slate-50 transition-colors shadow-sm">
      <div className={`size-12 rounded-xl ${bgColor} flex items-center justify-center text-primary`}>
        <ShoppingBag className="size-6" />
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <p className="font-bold text-slate-900">{id}</p>
          <span className={`text-[10px] font-bold uppercase tracking-wider ${statusColor}`}>{status}</span>
        </div>
        <p className="text-xs text-slate-500">{customer} • {items} • {price}</p>
      </div>
      <ChevronRight className="size-5 text-slate-400" />
    </div>
  );
}

function OrderNavItem({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick?: () => void }) {
  return (
    <div className={`flex flex-1 flex-col items-center justify-center gap-1 cursor-pointer ${active ? 'text-primary' : 'text-slate-500'}`} onClick={onClick}>
      {icon}
      <span className="text-[10px] font-semibold uppercase tracking-tighter">{label}</span>
    </div>
  );
}
