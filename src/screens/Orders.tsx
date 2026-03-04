import React from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Search, Filter, Home, ShoppingBag, ReceiptText, User, Sparkles, Bookmark, ChevronRight } from 'lucide-react';
import { Screen, Order } from '../types';

export default function Orders({ setScreen, orders }: { setScreen: (s: Screen) => void, orders: Order[] }) {
  return (
    <div className="relative flex h-[100dvh] w-full flex-col bg-background-light dark:bg-background-dark text-slate-900 dark:text-white overflow-hidden transition-colors duration-300">
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-primary/10">
        <div className="flex items-center p-4 justify-between">
          <button onClick={() => setScreen('home')} className="flex size-10 items-center justify-center rounded-full hover:bg-primary/10 transition-colors">
            <ChevronLeft className="size-6" />
          </button>
          <h1 className="text-lg font-bold tracking-tight flex-1 text-center">Orders</h1>
          <div className="flex items-center gap-1">
            <button className="flex size-10 items-center justify-center rounded-full hover:bg-primary/10 transition-colors">
              <Search className="size-6" />
            </button>
            <button className="flex size-10 items-center justify-center rounded-full hover:bg-primary/10 transition-colors">
              <Filter className="size-6" />
            </button>
          </div>
        </div>
        <nav className="flex px-4 gap-6 overflow-x-auto no-scrollbar">
          <TabItem label="All" active />
          <TabItem label="Pending" />
          <TabItem label="Shipped" />
          <TabItem label="Delivered" />
        </nav>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-6">
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
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-2 py-1 rounded">In Transit</span>
              </div>
              <div className="bg-primary/5 border border-primary/10 rounded-2xl p-5">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-primary/40 font-bold mb-1">Order ID</p>
                    <p className="text-base font-bold text-slate-900 dark:text-white">{orders[0].id}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] uppercase tracking-wider text-primary/40 font-bold mb-1">Date</p>
                    <p className="text-base font-bold text-slate-900 dark:text-white">{orders[0].date}</p>
                  </div>
                </div>

                <div className="relative flex items-center justify-between mb-8">
                  <div className="absolute left-0 right-0 h-1 bg-primary/20 top-1/2 -translate-y-1/2"></div>
                  <div className="absolute left-0 w-2/3 h-1 bg-primary top-1/2 -translate-y-1/2"></div>
                  <div className="size-3 rounded-full bg-primary relative z-10 shadow-[0_0_8px_rgba(242,127,13,0.6)]"></div>
                  <div className="size-3 rounded-full bg-primary relative z-10 shadow-[0_0_8px_rgba(242,127,13,0.6)]"></div>
                  <div className="size-3 rounded-full bg-primary relative z-10 shadow-[0_0_8px_rgba(242,127,13,0.6)]"></div>
                  <div className="size-3 rounded-full bg-primary/20 relative z-10"></div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="size-16 rounded-xl bg-primary/10 overflow-hidden shrink-0">
                    <img
                      src={orders[0].items[0].image}
                      alt="Product"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-slate-900 dark:text-white">{orders[0].items[0].name}</p>
                    <p className="text-xs text-primary/60">Customer: {orders[0].customerName}</p>
                  </div>
                  <button
                    onClick={() => setScreen('invoice')}
                    className="bg-primary text-white text-xs font-bold px-4 py-2 rounded-lg active:scale-95 transition-all"
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
                    statusColor={order.status === 'Delivered' ? 'text-green-400' : 'text-primary'}
                    bgColor={order.status === 'Delivered' ? 'bg-green-500/10' : 'bg-primary/10'}
                  />
                ))}
              </div>
            </section>
          </>
        )}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-background-dark/95 backdrop-blur-xl border-t border-slate-200 dark:border-primary/10 pb-8 pt-3 px-6 flex justify-between items-center z-50 transition-colors duration-300">
        <OrderNavItem icon={<Home className="size-5" />} label="Home" onClick={() => setScreen('home')} />
        <OrderNavItem icon={<ReceiptText className="size-5 fill-primary" />} label="Orders" active />
        <div className="flex flex-col items-center gap-1 cursor-pointer" onClick={() => setScreen('try-on')}>
          <div className="bg-primary p-2 rounded-full -mt-8 shadow-lg shadow-primary/40 ring-4 ring-background-dark">
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
    <a className={`flex flex-col items-center justify-center border-b-2 pb-3 pt-2 ${active ? 'border-primary text-primary' : 'border-transparent text-slate-400'}`} href="#">
      <span className="text-sm font-bold whitespace-nowrap">{label}</span>
    </a>
  );
}

function OrderListItem({ id, customer, items, price, status, statusColor, bgColor }: { id: string, customer: string, items: string, price: string, status: string, statusColor: string, bgColor: string }) {
  return (
    <div className="bg-primary/5 border border-primary/10 rounded-2xl p-4 flex items-center gap-4 cursor-pointer hover:bg-primary/10 transition-colors">
      <div className={`size-12 rounded-xl ${bgColor} flex items-center justify-center text-primary`}>
        <ShoppingBag className="size-6" />
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <p className="font-bold text-slate-900 dark:text-white">{id}</p>
          <span className={`text-[10px] font-bold uppercase tracking-wider ${statusColor}`}>{status}</span>
        </div>
        <p className="text-xs text-slate-400">{customer} • {items} • {price}</p>
      </div>
      <ChevronRight className="size-5 text-slate-500" />
    </div>
  );
}

function OrderNavItem({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick?: () => void }) {
  return (
    <div className={`flex flex-1 flex-col items-center justify-center gap-1 cursor-pointer ${active ? 'text-primary' : 'text-slate-400'}`} onClick={onClick}>
      {icon}
      <span className="text-[10px] font-semibold uppercase tracking-tighter">{label}</span>
    </div>
  );
}
