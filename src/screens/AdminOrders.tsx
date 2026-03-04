import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, Search, ReceiptText, Download, Printer, CheckCircle2, Clock, Package, User, DollarSign, FileText, Sparkles, LayoutDashboard, BarChart3, Megaphone, X } from 'lucide-react';
import { Screen, Order, CartItem } from '../types';

export default function AdminOrders({ setScreen, orders }: { setScreen: (s: Screen) => void, orders: Order[] }) {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const generateInvoice = (order: Order) => {
    setSelectedOrder(order);
  };

  const simulatePDFDownload = () => {
    setIsGeneratingPDF(true);
    setTimeout(() => {
      setIsGeneratingPDF(false);
      alert('Invoice PDF Generated & Downloaded Successfully!');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-[#0a0a0f] text-slate-900 dark:text-white flex flex-col transition-colors duration-300">
      <header className="p-4 flex items-center gap-4 border-b border-slate-200 dark:border-white/5 sticky top-0 bg-white/80 dark:bg-[#0a0a0f]/80 backdrop-blur-md z-10">
        <button onClick={() => setScreen('admin')} className="size-10 flex items-center justify-center bg-white/5 rounded-xl">
          <ChevronLeft className="size-6" />
        </button>
        <h1 className="text-lg font-bold">Order Management</h1>
      </header>

      <main className="flex-1 p-4 space-y-6">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
            <input
              className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="Search orders, customers..."
            />
          </div>
          <button className="px-4 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl flex items-center gap-2 font-bold text-sm text-slate-600 dark:text-white">
            <FileText className="size-4" /> Export
          </button>
        </div>

        <div className="space-y-4">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-2">Recent Orders</p>
          <div className="grid gap-3">
            {orders.length === 0 ? (
              <div className="text-center py-10 text-slate-500">No orders found.</div>
            ) : (
              orders.map(order => (
                <motion.div
                  layout
                  key={order.id}
                  className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-4 flex items-center gap-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-white/10 transition-colors shadow-sm"
                  onClick={() => setSelectedOrder(order)}
                >
                  <div className="size-14 rounded-xl overflow-hidden bg-slate-800 shrink-0 relative">
                    <img src={order.items[0]?.image} alt="Product" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    {order.items.some(i => i.customDesign) && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <span className="text-[8px] font-bold bg-blue-500 text-white px-1 rounded">CUSTOM</span>
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold text-sm truncate">{order.id}</h3>
                      <span className={`text-[8px] font-black px-2 py-0.5 rounded uppercase tracking-widest ${order.status === 'Delivered' ? 'text-green-400 bg-green-400/10' :
                          order.status === 'Pending' ? 'text-orange-400 bg-orange-400/10' :
                            'text-blue-400 bg-blue-400/10'
                        }`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="flex justify-between items-end mt-2">
                      <div className="space-y-0.5">
                        <p className="text-xs text-slate-400">{order.customerName}</p>
                        <p className="text-[10px] text-slate-500">{order.date} • {order.items.length} items</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-bold text-slate-900 dark:text-white">৳{order.total.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </main>

      {/* Order Details Modal */}
      <AnimatePresence>
        {selectedOrder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="w-full max-w-md bg-[#12121a] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            >
              <div className="p-6 border-b border-white/5 flex justify-between items-start shrink-0">
                <div>
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <ReceiptText className="size-5 text-blue-500" /> Order Details
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">{selectedOrder.id} • {selectedOrder.date}</p>
                </div>
                <button onClick={() => setSelectedOrder(null)} className="p-2 bg-white/5 rounded-full text-slate-400"><X className="size-5" /></button>
              </div>

              <div className="p-6 overflow-y-auto space-y-6 flex-1">
                {/* Customer Info */}
                <div className="space-y-2">
                  <h3 className="text-sm font-bold text-slate-300">Customer Information</h3>
                  <div className="bg-white/5 rounded-xl p-4 text-sm space-y-2">
                    <p><span className="text-slate-500">Name:</span> {selectedOrder.customerName}</p>
                    <p><span className="text-slate-500">Phone:</span> {selectedOrder.phone}</p>
                    <p><span className="text-slate-500">Address:</span> {selectedOrder.shippingAddress}</p>
                    <p><span className="text-slate-500">Payment:</span> {selectedOrder.paymentMethod}</p>
                  </div>
                </div>

                {/* Items */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-slate-300">Order Items</h3>
                  {selectedOrder.items.map((item, idx) => (
                    <div key={idx} className="bg-white/5 rounded-xl p-4 space-y-3">
                      <div className="flex gap-3">
                        <div className="size-16 rounded-lg bg-slate-800 overflow-hidden shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="font-bold text-sm">{item.name}</p>
                          <p className="text-xs text-slate-400">Qty: {item.quantity} • ৳{item.price.toFixed(2)}</p>
                          {!item.customDesign && (
                            <p className="text-xs text-slate-500 mt-1">Size: {item.selectedSize} | Color: {item.selectedColor}</p>
                          )}
                        </div>
                      </div>

                      {/* Custom Design Details */}
                      {item.customDesign && (
                        <div className="mt-3 pt-3 border-t border-white/10 space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold bg-blue-500 text-white px-2 py-0.5 rounded uppercase">Custom Design</span>
                            <div className="flex items-center gap-1 text-xs text-slate-400">
                              Color: <span className="inline-block w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: item.customDesign.color }}></span>
                            </div>
                          </div>

                          {(item.customDesign.frontText || item.customDesign.backText) && (
                            <div className="bg-black/20 rounded-lg p-3 text-xs space-y-1">
                              {item.customDesign.frontText && <p><span className="text-slate-500">Front Text:</span> "{item.customDesign.frontText}"</p>}
                              {item.customDesign.backText && <p><span className="text-slate-500">Back Text:</span> "{item.customDesign.backText}"</p>}
                            </div>
                          )}

                          {(item.customDesign.frontImage || item.customDesign.backImage) && (
                            <div className="flex gap-2 mt-2">
                              {item.customDesign.frontImage && (
                                <div className="flex-1">
                                  <p className="text-[10px] text-slate-500 mb-1">Front Image</p>
                                  <div className="aspect-square rounded-lg bg-black/20 flex items-center justify-center overflow-hidden p-1">
                                    <img src={item.customDesign.frontImage} alt="Front Design" className="max-w-full max-h-full object-contain" />
                                  </div>
                                </div>
                              )}
                              {item.customDesign.backImage && (
                                <div className="flex-1">
                                  <p className="text-[10px] text-slate-500 mb-1">Back Image</p>
                                  <div className="aspect-square rounded-lg bg-black/20 flex items-center justify-center overflow-hidden p-1">
                                    <img src={item.customDesign.backImage} alt="Back Design" className="max-w-full max-h-full object-contain" />
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="space-y-4 py-4 border-y border-white/5">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Subtotal</span>
                    <span className="font-bold">৳{selectedOrder.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Shipping</span>
                    <span className="font-bold text-green-500">FREE</span>
                  </div>
                  <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                    <span className="text-lg font-bold">Total Amount</span>
                    <span className="text-2xl font-black text-blue-500">৳{selectedOrder.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-white/5 bg-[#12121a] shrink-0">
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      alert('Order status updated to Accepted!');
                      setSelectedOrder(null);
                    }}
                    className="flex-1 bg-blue-600 py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 active:scale-95 transition-all"
                  >
                    <CheckCircle2 className="size-4" /> Accept Order
                  </button>
                  <button className="flex-1 bg-white/5 border border-white/10 py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 active:scale-95 transition-all">
                    <Printer className="size-4" /> Print Invoice
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-[#0a0a0f]/95 border-t border-slate-200 dark:border-white/5 pb-8 pt-3 px-6 flex justify-between items-center z-50 transition-colors duration-300">
        <AdminNavItem icon={<LayoutDashboard className="size-5" />} label="Overview" onClick={() => setScreen('admin')} />
        <AdminNavItem icon={<Package className="size-5" />} label="Inventory" onClick={() => setScreen('admin-inventory')} />
        <AdminNavItem icon={<ReceiptText className="size-5 text-blue-500" />} label="Orders" active onClick={() => setScreen('admin-orders')} />
        <AdminNavItem icon={<BarChart3 className="size-5" />} label="Analytics" onClick={() => setScreen('admin-analytics')} />
        <AdminNavItem icon={<Megaphone className="size-5" />} label="Marketing" onClick={() => setScreen('admin-marketing')} />
      </nav>
    </div>
  );
}

function AdminNavItem({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick?: () => void }) {
  return (
    <div className={`flex flex-col items-center gap-1 cursor-pointer ${active ? 'text-blue-500' : 'text-slate-500'}`} onClick={onClick}>
      {icon}
      <span className="text-[10px] font-bold uppercase tracking-tighter">{label}</span>
    </div>
  );
}
