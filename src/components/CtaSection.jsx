import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Mail, MessageSquare, ArrowRight, CheckCircle2, Copy } from 'lucide-react';

export default function CtaSection() {
  const [status, setStatus] = useState('idle');
  const [copied, setCopied] = useState(false);

  const handleExecute = () => {
    setStatus('loading');
    setTimeout(() => setStatus('ready'), 1500);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('hugofsl@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-32 relative z-10 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl shadow-blue-900/20">
          <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            </div>
            <div className="mx-auto flex items-center gap-2 text-slate-500 text-xs font-mono">
              <Terminal size={14} /> root@hugo-lourenco:~
            </div>
          </div>
          <div className="p-6 md:p-8 font-mono text-sm md:text-base">
            <div className="text-slate-300 mb-4">
              <span className="text-emerald-400">hugo@admin:~$</span> ./initiate_contact.sh
            </div>
            {status === 'idle' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <p className="text-slate-400 mb-6">Pressione para estabelecer uma conexão segura e iniciar um novo projeto.</p>
                <button onClick={handleExecute} className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-sans font-bold rounded-lg transition-colors flex items-center gap-2">
                  Iniciar Contato <ArrowRight size={18} />
                </button>
              </motion.div>
            )}
            {status === 'loading' && (
              <div className="space-y-2 text-slate-400">
                <p>&gt; Resolvendo dependências...</p>
                <p>&gt; Estabelecendo handshake seguro...</p>
                <p className="text-blue-400">&gt; Descriptografando chaves...</p>
                <motion.div animate={{ opacity: [1, 0.5, 1] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-2 h-5 bg-slate-400 mt-2" />
              </div>
            )}
            <AnimatePresence>
              {status === 'ready' && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="pt-4 border-t border-slate-800 mt-4">
                  <p className="text-emerald-400 mb-6 flex items-center gap-2"><CheckCircle2 size={18} /> Acesso Concedido.</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans">
                    <div className="flex bg-slate-950 border border-slate-800 rounded-lg p-1">
                      <a href="mailto:hugofsl@gmail.com" className="flex-1 flex items-center justify-center gap-2 px-4 py-3 hover:bg-slate-900 rounded-md transition-colors text-slate-300">
                        <Mail size={18} /> E-mail
                      </a>
                      <button onClick={copyEmail} className="px-4 border-l border-slate-800 text-slate-400">{copied ? <CheckCircle2 size={18} className="text-emerald-400" /> : <Copy size={18} />}</button>
                    </div>
                    <a href="https://wa.me/5515988177800" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 px-4 py-3 bg-[#25D366]/10 border border-[#25D366]/20 text-[#25D366] rounded-lg font-medium">
                      <MessageSquare size={18} /> WhatsApp
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}