import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Code2, Database, ShieldCheck, Calculator, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { useTranslation } from 'react-i18next';

export default function ProjectImprimil() {
  const { t } = useTranslation();
  const [largura, setLargura] = useState(1.5);
  const [altura, setAltura] = useState(2.0);
  const [material, setMaterial] = useState(150);
  
  const area = largura * altura;
  const subtotal = area * material;
  const taxaMinima = 350;
  const total = Math.max(subtotal, taxaMinima);
  const usouTaxaMinima = subtotal < taxaMinima;

  return (
    <div className="bg-slate-950 min-h-screen text-slate-50 font-sans pt-24 pb-32">
      <SEO 
        title={t('case_imprimil.title')} 
        description={t('case_imprimil.subtitle')}
        url="/projects/sistema-comercial"
      />
      <div className="container mx-auto px-6 max-w-5xl">
        <Link to="/projects" className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors mb-12 font-mono text-sm">
          <ArrowLeft size={16} /> {t('case_common.back_projects')}
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
          <div className="flex flex-wrap gap-3 mb-6">
            <span className="px-3 py-1 text-xs font-mono rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400">React</span>
            <span className="px-3 py-1 text-xs font-mono rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400">Firebase Auth & Firestore</span>
            <span className="px-3 py-1 text-xs font-mono rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">APIs Financeiras</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">
            {t('case_imprimil.title')} <br /> <span className="text-blue-500">{t('case_imprimil.title_highlight')}</span>
          </h1>
          <p className="text-xl text-slate-400 leading-relaxed">
            {t('case_imprimil.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <Database className="text-purple-400" /> {t('case_imprimil.challenge_title')}
            </h3>
            <p className="text-slate-400 mb-10 leading-relaxed">
              {t('case_imprimil.challenge_desc')}
            </p>

            <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <ShieldCheck className="text-emerald-400" /> {t('case_imprimil.arch_title')}
            </h3>
            <p className="text-slate-400 mb-6 leading-relaxed">
              {t('case_imprimil.arch_desc')}
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}
            className="bg-slate-900 border border-slate-800 rounded-[2rem] p-8 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px] pointer-events-none"></div>

            <div className="relative z-10">
              <h4 className="text-sm font-mono text-blue-400 mb-6 flex items-center gap-2 tracking-widest uppercase">
                <Calculator size={16} /> {t('case_imprimil.sandbox_title')}
              </h4>
              <p className="text-slate-300 mb-8 font-medium">{t('case_imprimil.sandbox_subtitle')}</p>

              <div className="space-y-4 mb-8">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">{t('case_imprimil.width')}</label>
                    <input 
                      type="number" step="0.1" value={largura} onChange={(e) => setLargura(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-slate-200 outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">{t('case_imprimil.height')}</label>
                    <input 
                      type="number" step="0.1" value={altura} onChange={(e) => setAltura(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-slate-200 outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-slate-500 mb-1">{t('case_imprimil.material')}</label>
                  <select 
                    value={material} onChange={(e) => setMaterial(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-slate-200 outline-none focus:border-blue-500 transition-colors"
                  >
                    <option value={150}>{t('case_imprimil.mat_option1')}</option>
                    <option value={80}>{t('case_imprimil.mat_option2')}</option>
                  </select>
                </div>
              </div>

              <div className="bg-slate-950 rounded-xl p-6 border border-slate-800 font-mono text-sm">
                <div className="flex justify-between text-slate-400 mb-2">
                  <span>{t('case_imprimil.area_total')}</span> <span>{area.toFixed(2)} m²</span>
                </div>
                <div className="flex justify-between text-slate-400 mb-2">
                  <span>{t('case_imprimil.mat_cost')}</span> <span>$ {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-500 mb-4 pb-4 border-b border-slate-800">
                  <span>{t('case_imprimil.sys_floor')}</span> <span>$ {taxaMinima.toFixed(2)}</span>
                </div>

                <div className="flex justify-between items-center text-lg font-bold text-slate-50">
                  <span>{t('case_imprimil.total_quote')}</span> 
                  <span className={usouTaxaMinima ? "text-orange-400" : "text-emerald-400"}>
                    $ {total.toFixed(2)}
                  </span>
                </div>

                {usouTaxaMinima && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-4 text-xs text-orange-400 flex gap-2 items-start">
                    <CheckCircle2 size={14} className="mt-0.5 shrink-0" />
                    {t('case_imprimil.rule_applied')}
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}