import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Search, Send, User, Clock, CheckCircle2, MessageSquare } from 'lucide-react';
import { Screen } from '../types';

export default function AdminMessages({ setScreen }: { setScreen: (s: Screen) => void }) {
  const [activeChat, setActiveChat] = useState<number | null>(1);
  const [input, setInput] = useState('');

  const [chats, setChats] = useState([
    {
      id: 1,
      customer: 'Elena Rossi',
      lastMessage: 'Thanks for reaching out! An agent will be with you shortly.',
      time: 'Just now',
      unread: 0,
      status: 'active',
      messages: [
        { id: 1, text: 'Hello! How can we help you today?', sender: 'admin', time: '10:00 AM' },
        { id: 2, text: 'I have a question about my recent order #ORD-2849', sender: 'user', time: '10:05 AM' },
        { id: 3, text: 'Thanks for reaching out! An agent will be with you shortly.', sender: 'admin', time: '10:05 AM' }
      ]
    },
    {
      id: 2,
      customer: 'Guest User',
      lastMessage: 'Do you have the neon jacket in size M?',
      time: '2 hours ago',
      unread: 1,
      status: 'active',
      messages: [
        { id: 1, text: 'Hello! How can we help you today?', sender: 'admin', time: '08:00 AM' },
        { id: 2, text: 'Do you have the neon jacket in size M?', sender: 'user', time: '08:15 AM' }
      ]
    },
    {
      id: 3,
      customer: 'Sarah Williams',
      lastMessage: 'Thank you for your help!',
      time: '1 day ago',
      unread: 0,
      status: 'closed',
      messages: [
        { id: 1, text: 'My package arrived damaged.', sender: 'user', time: 'Yesterday' },
        { id: 2, text: 'We apologize for that. We will send a replacement immediately.', sender: 'admin', time: 'Yesterday' },
        { id: 3, text: 'Thank you for your help!', sender: 'user', time: 'Yesterday' }
      ]
    }
  ]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || activeChat === null) return;

    setChats(prevChats => prevChats.map(chat => {
      if (chat.id === activeChat) {
        return {
          ...chat,
          lastMessage: input,
          time: 'Just now',
          messages: [
            ...chat.messages,
            { id: Date.now(), text: input, sender: 'admin', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
          ]
        };
      }
      return chat;
    }));
    setInput('');
  };

  const activeChatData = chats.find(c => c.id === activeChat);

  return (
    <div className="relative flex h-[100dvh] w-full flex-col bg-slate-50 text-slate-900 overflow-hidden">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md p-4 flex items-center gap-4 border-b border-slate-200">
        <button 
          onClick={() => setScreen('admin')}
          className="size-10 bg-white border border-slate-200 rounded-full flex items-center justify-center hover:bg-slate-50 transition-colors shadow-sm"
        >
          <ChevronLeft className="size-6 text-slate-600" />
        </button>
        <div>
          <h1 className="text-xl font-bold text-slate-900">Customer Messages</h1>
          <p className="text-xs text-slate-500">Manage live chats and support tickets</p>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden max-w-7xl mx-auto w-full pb-20 md:pb-0">
        {/* Chat List */}
        <div className={`w-full md:w-1/3 border-r border-slate-200 flex flex-col bg-white ${activeChat !== null ? 'hidden md:flex' : 'flex'}`}>
          <div className="p-4 border-b border-slate-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search customers..." 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto no-scrollbar">
            {chats.map(chat => (
              <div 
                key={chat.id}
                onClick={() => setActiveChat(chat.id)}
                className={`p-4 border-b border-slate-100 cursor-pointer transition-colors hover:bg-slate-50 ${activeChat === chat.id ? 'bg-blue-50/50' : ''}`}
              >
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                    {chat.customer}
                    {chat.status === 'closed' && <CheckCircle2 className="size-3 text-emerald-500" />}
                  </h3>
                  <span className="text-[10px] text-slate-400 font-medium">{chat.time}</span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-xs text-slate-500 truncate pr-4">{chat.lastMessage}</p>
                  {chat.unread > 0 && (
                    <span className="size-5 bg-blue-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center shrink-0">
                      {chat.unread}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        {activeChat !== null ? (
          <div className="flex-1 flex flex-col bg-slate-50 h-full">
            <div className="bg-white p-4 border-b border-slate-200 flex items-center gap-3 shadow-sm z-10">
              <button 
                onClick={() => setActiveChat(null)}
                className="md:hidden p-2 -ml-2 text-slate-500 hover:text-slate-900"
              >
                <ChevronLeft className="size-5" />
              </button>
              <div className="size-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 shrink-0">
                <User className="size-5" />
              </div>
              <div>
                <h2 className="font-bold text-slate-900">{activeChatData?.customer}</h2>
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <span className={`size-2 rounded-full ${activeChatData?.status === 'active' ? 'bg-emerald-500' : 'bg-slate-300'}`}></span>
                  {activeChatData?.status === 'active' ? 'Online' : 'Offline'}
                </div>
              </div>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {activeChatData?.messages.map(msg => (
                <div key={msg.id} className={`flex ${msg.sender === 'admin' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[75%] ${msg.sender === 'admin' ? 'items-end' : 'items-start'} flex flex-col`}>
                    <div 
                      className={`p-3 rounded-2xl text-sm shadow-sm ${
                        msg.sender === 'admin' 
                          ? 'bg-blue-600 text-white rounded-br-sm' 
                          : 'bg-white border border-slate-200 text-slate-800 rounded-bl-sm'
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1 px-1">{msg.time}</span>
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSend} className="p-4 bg-white border-t border-slate-200 flex gap-3 items-center">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Type your reply..."
                disabled={activeChatData?.status === 'closed'}
                className="flex-1 border border-slate-200 bg-slate-50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all disabled:opacity-50 disabled:bg-slate-100"
              />
              <button 
                type="submit" 
                disabled={!input.trim() || activeChatData?.status === 'closed'}
                className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0 shadow-sm"
              >
                <Send className="size-5" />
              </button>
            </form>
          </div>
        ) : (
          <div className="hidden md:flex flex-1 flex-col items-center justify-center text-slate-400 bg-slate-50">
            <MessageSquare className="size-16 mb-4 opacity-20" />
            <p>Select a conversation to start messaging</p>
          </div>
        )}
      </main>
    </div>
  );
}
