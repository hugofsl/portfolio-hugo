import { Palette } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const GithubIcon = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
);

const InstagramIcon = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-12 px-4 relative z-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        
        <div className="flex items-center gap-2 text-xl font-bold text-slate-50">
          <span className="text-blue-500">&lt;</span>
          Hugo.Lourenço
          <span className="text-blue-500">/&gt;</span>
        </div>

        <div className="flex items-center gap-6">
          <a href="https://github.com/hugofsl" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-blue-400 transition-colors" title="GitHub">
            <GithubIcon size={20} />
          </a>
          <a href="https://behance.net/hugolou" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-blue-400 transition-colors" title="Behance (Design Portfolio)">
            <Palette size={20} />
          </a>
          <a href="https://www.instagram.com/hugofslourenco/" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-blue-400 transition-colors" title="Instagram">
            <InstagramIcon size={20} />
          </a>
        </div>

        <div className="flex flex-col items-center md:items-end gap-2 text-sm text-slate-500 font-mono">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            {t('footer.os_status')}
          </div>
          <p>{t('footer.copyright')}</p>
        </div>

      </div>
    </footer>
  );
}