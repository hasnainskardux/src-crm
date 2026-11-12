import React, { useState } from 'react';
import { useCrm } from '../../context/CrmContext';
import { X, Mail, Send, Building2 } from 'lucide-react';

export const SendMailModal: React.FC = () => {
  const {
    isSendMailOpen,
    setIsSendMailOpen,
    selectedProperty,
    showToast
  } = useCrm();

  const [recipient, setRecipient] = useState('olivia@untitledui.com');
  const [subject, setSubject] = useState(
    selectedProperty ? `Inquiry regarding ${selectedProperty.name} (${selectedProperty.ref})` : 'Property Information'
  );
  const [message, setMessage] = useState(
    `Dear Client,\n\nPlease find attached the complete portfolio and verified title deed details for ${
      selectedProperty?.name || 'this property'
    } located in Skardu, Gilgit-Baltistan.\n\nWarm regards,\nSRC Real Estate Agency\nSkardu, Pakistan`
  );

  if (!isSendMailOpen) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Mail Sent', `Property details dispatched to ${recipient}.`);
    setIsSendMailOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#2E66F6] flex items-center justify-center">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-base">Send Property Mail</h3>
              <p className="text-xs text-slate-500">Dispatch listing dossier to lead or client</p>
            </div>
          </div>
          <button
            onClick={() => setIsSendMailOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSend} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
              Recipient Email
            </label>
            <input
              type="email"
              required
              value={recipient}
              onChange={e => setRecipient(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#2E66F6]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
              Subject
            </label>
            <input
              type="text"
              required
              value={subject}
              onChange={e => setSubject(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#2E66F6]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
              Message
            </label>
            <textarea
              rows={5}
              required
              value={message}
              onChange={e => setMessage(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#2E66F6]"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsSendMailOpen(false)}
              className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm font-semibold text-white bg-[#2E66F6] hover:bg-[#2555D4] rounded-xl flex items-center gap-2 shadow-sm shadow-[#2E66F6]/20 transition-all"
            >
              <Send className="w-4 h-4" />
              <span>Send Mail</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
