import React from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, MoreVertical, Download, Share2, Home, ShoppingBag, ReceiptText, User } from 'lucide-react';
import { Screen, Order } from '../types';

export default function Invoice({ setScreen, order }: { setScreen: (s: Screen) => void, order: Order | null }) {
  if (!order) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-slate-50 text-slate-900">
        <p>Order not found</p>
        <button onClick={() => setScreen('home')} className="ml-4 text-primary underline">Go Home</button>
      </div>
    );
  }

  return (
    <div className="relative flex h-[100dvh] w-full flex-col bg-slate-50 text-slate-900 overflow-hidden">
      <main className="flex-1 overflow-y-auto pb-24 no-scrollbar">
        <div className="p-6 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-white border border-slate-200 rounded-xl flex items-center justify-center mb-4 shadow-sm">
            <span className="text-slate-900 font-black text-2xl tracking-tighter">Cokmoke<span className="text-blue-600">.</span></span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Order Details</h1>
          <p className="text-slate-500 text-sm font-medium">Order {order.id}</p>
        </div>

        <div className="px-4 mb-6">
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-1">Date</p>
                <p className="text-sm font-semibold text-slate-900">{order.date}</p>
              </div>
              <div className="text-right">
                <p className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-1">Status</p>
                <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-600">{order.status}</span>
              </div>
              <div className="col-span-2 pt-2">
                <p className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-1">Customer</p>
                <p className="text-sm font-semibold text-slate-900 leading-relaxed">
                  {order.customerName}
                  {order.phone && <><br />{order.phone}</>}
                  {order.shippingAddress && <><br />{order.shippingAddress}</>}
                </p>
              </div>
              {order.paymentMethod && (
                <div className="col-span-2 pt-2 border-t border-slate-100 mt-2">
                  <p className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-1">Payment Method</p>
                  <p className="text-sm font-semibold text-slate-900">{order.paymentMethod}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="px-4 mb-6">
          <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3">Item</th>
                  <th className="px-4 py-3 text-center">Qty</th>
                  <th className="px-4 py-3 text-right">Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {order.items.map((item, idx) => {
                  let details = `${item.selectedColor} / ${item.selectedSize}`;
                  if (item.customDesign) {
                    details = `Custom Design (${item.customDesign.color})`;
                  }
                  return (
                    <InvoiceRow 
                      key={idx}
                      name={item.name} 
                      details={details} 
                      qty={item.quantity} 
                      price={`৳${(item.price * item.quantity).toFixed(2)}`} 
                    />
                  );
                })}
              </tbody>
            </table>
            <div className="p-4 bg-slate-50 space-y-2 border-t border-slate-200">
              <SummaryRow label="Subtotal" value={`৳${order.total.toFixed(2)}`} />
              <SummaryRow label="Shipping" value="FREE" isFree />
              <div className="pt-2 mt-2 border-t border-slate-200 flex justify-between items-center">
                <span className="text-base font-bold text-slate-900">Grand Total</span>
                <span className="text-xl font-bold text-blue-600">৳{order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center gap-2 bg-blue-600 text-white font-bold py-4 rounded-xl shadow-md shadow-blue-600/20 active:scale-95 transition-transform hover:bg-blue-700">
            <Download className="size-5" />
            <span>Download PDF</span>
          </button>
          <button 
            onClick={() => setScreen('home')}
            className="flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 font-bold py-4 rounded-xl active:scale-95 transition-transform hover:bg-slate-50 shadow-sm"
          >
            <Home className="size-5" />
            <span>Home</span>
          </button>
        </div>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 border-t border-slate-200 bg-white/80 backdrop-blur-lg px-4 pb-6 pt-2 z-20">
        <div className="flex justify-between items-center max-w-md mx-auto">
          <InvoiceNavItem icon={<Home className="size-5" />} label="Home" onClick={() => setScreen('home')} />
          <InvoiceNavItem icon={<ShoppingBag className="size-5" />} label="Shop" />
          <InvoiceNavItem icon={<ReceiptText className="size-5 fill-blue-600" />} label="Orders" active />
          <InvoiceNavItem icon={<User className="size-5" />} label="Profile" onClick={() => setScreen('profile')} />
        </div>
      </nav>
    </div>
  );
}

function InvoiceRow({ name, details, qty, price }: { name: string, details: string, qty: number, price: string }) {
  return (
    <tr>
      <td className="px-4 py-4">
        <p className="font-bold text-slate-900">{name}</p>
        <p className="text-xs text-slate-500 italic">{details}</p>
      </td>
      <td className="px-4 py-4 text-center text-slate-900">{qty}</td>
      <td className="px-4 py-4 text-right font-semibold text-slate-900">{price}</td>
    </tr>
  );
}

function SummaryRow({ label, value, isFree }: { label: string, value: string, isFree?: boolean }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-slate-500">{label}</span>
      <span className={`font-medium ${isFree ? 'text-green-600' : 'text-slate-900'}`}>{value}</span>
    </div>
  );
}

function InvoiceNavItem({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick?: () => void }) {
  return (
    <div className={`flex flex-1 flex-col items-center justify-center gap-1 cursor-pointer ${active ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600 transition-colors'}`} onClick={onClick}>
      {icon}
      <p className="text-[10px] font-bold uppercase tracking-wider">{label}</p>
    </div>
  );
}
