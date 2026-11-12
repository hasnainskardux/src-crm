import React, { useState } from 'react';
import { useCrm } from '../../context/CrmContext';
import { DocumentItem } from '../../types';
import {
  FileText,
  Upload,
  Search,
  Download,
  Trash2,
  Eye,
  FileCode,
  FileSpreadsheet,
  Folder,
  X
} from 'lucide-react';

const CATEGORIES: DocumentItem['category'][] = [
  'Property Documents',
  'Customer Documents',
  'Agreements',
  'Invoices',
  'Identity Documents',
  'Other Documents'
];

export const DocumentsView: React.FC = () => {
  const { documents, addDocument, deleteDocument, showToast } = useCrm();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [previewDoc, setPreviewDoc] = useState<DocumentItem | null>(null);

  const [newDocData, setNewDocData] = useState({
    name: '',
    category: 'Property Documents' as DocumentItem['category'],
    fileSize: '2.4 MB',
    fileType: 'PDF'
  });

  const filteredDocs = documents.filter(doc => {
    const matchesCat = selectedCategory === 'All' || doc.category === selectedCategory;
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDocData.name.trim()) return;
    addDocument(newDocData);
    setIsUploadOpen(false);
    setNewDocData({
      name: '',
      category: 'Property Documents',
      fileSize: '1.8 MB',
      fileType: 'PDF'
    });
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#263238]">Document Vault & Archive</h1>
          <p className="text-sm text-[#78889B] mt-0.5">
            Encrypted repository for title deeds, FBR tax clearances, architectural drawings, and signed agreements.
          </p>
        </div>

        <button
          onClick={() => setIsUploadOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#2E66F6] hover:bg-[#2555D4] text-white rounded-xl text-xs font-semibold shadow-sm shadow-[#2E66F6]/25 transition-all self-start sm:self-auto"
        >
          <Upload className="w-4 h-4 stroke-[2.5]" />
          <span>Upload Document</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="relative flex-1 min-w-[240px] max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search documents by filename..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 pl-9 pr-4 py-2 text-xs font-medium text-slate-800 placeholder-slate-400 border border-slate-200 rounded-xl focus:outline-none focus:border-[#2E66F6]"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-medium">Category:</span>
          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            className="text-xs font-semibold px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 cursor-pointer"
          >
            <option value="All">All Categories</option>
            {CATEGORIES.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredDocs.map(doc => (
          <div
            key={doc.id}
            className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs hover:border-[#2E66F6]/60 hover:shadow-sm transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2E66F6] flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <button
                  onClick={() => deleteDocument(doc.id)}
                  className="p-1 text-slate-300 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                  title="Delete file"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="mt-3">
                <h4 className="text-xs font-bold text-slate-900 group-hover:text-[#2E66F6] transition-colors break-words leading-snug">
                  {doc.name}
                </h4>
                <span className="inline-block mt-1 text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                  {doc.category}
                </span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
              <span className="text-[11px] tabular-nums">{doc.fileSize} · {doc.uploadedAt}</span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setPreviewDoc(doc)}
                  className="p-1 text-slate-400 hover:text-[#2E66F6] rounded"
                  title="Preview"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  onClick={() => showToast('Download Started', `Downloading ${doc.name}...`)}
                  className="p-1 text-slate-400 hover:text-[#2E66F6] rounded"
                  title="Download"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Preview Modal */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#2E66F6]" />
                <h3 className="font-bold text-slate-900 text-sm truncate max-w-md">{previewDoc.name}</h3>
              </div>
              <button onClick={() => setPreviewDoc(null)}>
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <div className="py-12 text-center space-y-2 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
              <FileText className="w-12 h-12 text-[#2E66F6] mx-auto opacity-80" />
              <p className="text-xs font-semibold text-slate-700">Verified Legal Archive File</p>
              <p className="text-[11px] text-slate-400">Category: {previewDoc.category} · Size: {previewDoc.fileSize}</p>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setPreviewDoc(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
              >
                Close
              </button>
              <button
                onClick={() => {
                  showToast('Downloaded', `Saved ${previewDoc.name} to local device.`);
                  setPreviewDoc(null);
                }}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#2E66F6] rounded-xl hover:bg-[#2555D4]"
              >
                Download File
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {isUploadOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-800 text-base">Upload Document</h3>
              <button onClick={() => setIsUploadOpen(false)}>
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                  Document Filename *
                </label>
                <input
                  type="text"
                  required
                  value={newDocData.name}
                  onChange={e => setNewDocData({ ...newDocData, name: e.target.value })}
                  placeholder="e.g. Title-Deed-Plot-48-Satpara.pdf"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#2E66F6]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Category</label>
                <select
                  value={newDocData.category}
                  onChange={e => setNewDocData({ ...newDocData, category: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm bg-white"
                >
                  {CATEGORIES.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsUploadOpen(false)}
                  className="px-4 py-2 text-sm text-slate-600 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-sm font-semibold text-white bg-[#2E66F6] hover:bg-[#2555D4] rounded-xl shadow-sm shadow-[#2E66F6]/20"
                >
                  Store Document
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
