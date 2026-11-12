import React, { useState } from 'react';
import { useCrm } from '../../context/CrmContext';
import {
  X,
  Mail,
  Send,
  Building2,
  Phone,
  ArrowLeft
} from 'lucide-react';

export const MessagesDrawer: React.FC = () => {
  const {
    isMessagesOpen,
    setIsMessagesOpen,
    conversations,
    activeConversationId,
    setActiveConversationId,
    sendMessage,
    markConversationAsRead
  } = useCrm();

  const [inputReply, setInputReply] = useState('');

  if (!isMessagesOpen) return null;

  const activeConv = conversations.find(c => c.id === activeConversationId);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputReply.trim() || !activeConversationId) return;
    sendMessage(activeConversationId, inputReply.trim());
    setInputReply('');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/30 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {activeConv && (
              <button
                onClick={() => setActiveConversationId(null)}
                className="p-1 hover:bg-slate-100 rounded-lg text-slate-500 mr-1"
                title="Back to conversation list"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#2E66F6] flex items-center justify-center">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-base">
                {activeConv ? activeConv.contactName : 'Messages & Chat'}
              </h3>
              <p className="text-xs text-slate-500">
                {activeConv ? 'Customer Direct Channel' : 'Recent tenant and buyer conversations'}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setIsMessagesOpen(false);
              setActiveConversationId(null);
            }}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {!activeConv ? (
          /* Conversation List */
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {conversations.map(conv => (
              <div
                key={conv.id}
                onClick={() => {
                  setActiveConversationId(conv.id);
                  markConversationAsRead(conv.id);
                }}
                className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 ${
                  conv.unread
                    ? 'bg-blue-50/40 border-blue-100/90 hover:border-blue-200'
                    : 'bg-white border-slate-100 hover:border-slate-200 hover:bg-slate-50/50'
                }`}
              >
                <div className="relative">
                  <img
                    src={conv.contactAvatar}
                    alt={conv.contactName}
                    className="w-11 h-11 rounded-full object-cover"
                  />
                  {conv.unread && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#2E66F6] ring-2 ring-white rounded-full" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-slate-900 truncate">
                      {conv.contactName}
                    </h4>
                    <span className="text-[11px] text-slate-400 tabular-nums">
                      {conv.time}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 truncate mt-0.5">
                    {conv.lastMessage}
                  </p>
                  {conv.propertyRef && (
                    <div className="flex items-center gap-1 mt-1 text-[10px] text-[#2E66F6] font-medium">
                      <Building2 className="w-3 h-3" /> Property {conv.propertyRef}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Active Chat Thread */
          <div className="flex-1 flex flex-col justify-between overflow-hidden">
            {/* Quick Contact Info Strip */}
            <div className="px-5 py-2.5 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-600 font-medium">
                Client: {activeConv.contactName}
              </span>
              <div className="flex items-center gap-2">
                <a
                  href={`tel:+923001234567`}
                  className="flex items-center gap-1 text-[#2E66F6] hover:underline"
                >
                  <Phone className="w-3 h-3" /> Call
                </a>
              </div>
            </div>

            {/* Messages Bubbles */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {activeConv.messages.map(msg => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                      msg.isMe
                        ? 'bg-[#2E66F6] text-white rounded-br-xs'
                        : 'bg-slate-100 text-slate-800 rounded-bl-xs'
                    }`}
                  >
                    <p className="leading-relaxed">{msg.text}</p>
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 px-1">
                    {msg.timestamp}
                  </span>
                </div>
              ))}
            </div>

            {/* Input Bar */}
            <form onSubmit={handleSend} className="p-3 border-t border-slate-100 bg-white flex items-center gap-2">
              <input
                type="text"
                placeholder="Write a message to client..."
                value={inputReply}
                onChange={e => setInputReply(e.target.value)}
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#2E66F6]"
              />
              <button
                type="submit"
                disabled={!inputReply.trim()}
                className="p-2 rounded-xl bg-[#2E66F6] text-white hover:bg-[#2555D4] disabled:opacity-50 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
