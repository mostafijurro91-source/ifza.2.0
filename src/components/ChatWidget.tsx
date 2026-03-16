import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello! How can we help you today?', sender: 'admin' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-chat', handleOpen);
    return () => window.removeEventListener('open-chat', handleOpen);
  }, []);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const newUserMsg = { id: Date.now(), text: input, sender: 'user' };
    setMessages(prev => [...prev, newUserMsg]);
    setInput('');
    
    // Simulate admin reply
    setTimeout(() => {
      setMessages(prev => [
        ...prev, 
        { id: Date.now(), text: 'Thanks for reaching out! An agent will be with you shortly.', sender: 'admin' }
      ]);
    }, 1500);
  };

  return (
    <div className="fixed bottom-28 right-4 z-[60] md:bottom-8 md:right-8">
      {isOpen ? (
        <div className="bg-white rounded-2xl shadow-2xl w-80 sm:w-96 overflow-hidden border border-slate-200 flex flex-col h-[450px] animate-in slide-in-from-bottom-5 fade-in duration-200">
          <div className="bg-orange-500 text-white p-4 flex justify-between items-center shadow-md z-10">
            <div>
              <h3 className="font-bold text-sm">Customer Support</h3>
              <p className="text-[10px] text-orange-100">We typically reply in a few minutes</p>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="hover:bg-orange-600 p-1.5 rounded-full transition-colors"
            >
              <X className="size-5" />
            </button>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto bg-slate-50 space-y-4">
            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[85%] p-3 rounded-2xl text-sm shadow-sm ${
                    msg.sender === 'user' 
                      ? 'bg-orange-500 text-white rounded-br-sm' 
                      : 'bg-white border border-slate-200 text-slate-800 rounded-bl-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-200 flex gap-2 items-center">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 border border-slate-200 bg-slate-50 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
            />
            <button 
              type="submit" 
              disabled={!input.trim()}
              className="bg-orange-500 text-white p-2.5 rounded-full hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
            >
              <Send className="size-4 ml-0.5" />
            </button>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-white text-orange-500 border border-orange-100 p-3 rounded-full shadow-xl hover:bg-orange-50 transition-all hover:scale-105 active:scale-95 flex items-center justify-center animate-in zoom-in duration-200"
        >
          <MessageCircle className="size-5" />
          <span className="absolute top-0 right-0 size-2.5 bg-orange-500 border-2 border-white rounded-full"></span>
        </button>
      )}
    </div>
  );
}
