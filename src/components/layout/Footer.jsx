// src/components/layout/Footer.jsx
import { Github, Instagram, Palette } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-12 px-4 relative z-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Brand / Logo */}
        <div className="flex items-center gap-2 text-xl font-bold text-slate-50">
          <span className="text-blue-500">&lt;</span>
          Hugo.Lourenço
          <span className="text-blue-500">/&gt;</span>
        </div>

        {/* Links Sociais / Portfolio */}
        <div className="flex items-center gap-6">
          <a href="https://github.com/hugofsl" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-blue-400 transition-colors" title="GitHub">
            <Github size={20} />
          </a>
          <a href="https://behance.net/hugolou" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-blue-400 transition-colors" title="Behance (Design Portfolio)">
            <Palette size={20} />
          </a>
          <a href="https://www.instagram.com/hugofslourenco/" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-blue-400 transition-colors" title="Instagram">
            <Instagram size={20} />
          </a>
        </div>

        {/* Status System & Copyright */}
        <div className="flex flex-col items-center md:items-end gap-2 text-sm text-slate-500 font-mono">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Sistemas Operacionais
          </div>
          <p>©Hugo Lourenço 2026 | Desenvolvido com React & Vite</p>
        </div>

      </div>
    </footer>
  );
}