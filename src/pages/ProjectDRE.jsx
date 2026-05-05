import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Database, LineChart, BarChart3, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { useTranslation } from 'react-i18next';

export default function ProjectDRE() {
  const { t } = useTranslation();
  const [activeBranch, setActiveBranch] = useState('consolidado');

  const dashboardData = {
    consolidado: { receita: 450000, custos: 280000, lucro: 170000, margin: 37, chart: [60, 80, 45, 90, 75, 100] },
    filial1: { receita: 280000, custos: 160000, lucro: 120000, margin: 42, chart: [40, 60, 30, 70, 50, 80] },
    filial2: { receita: 170000, custos: 120000, lucro: 50000, margin: 29, chart: [20, 30, 15, 40, 35, 45] }
  };

  const currentData = dashboardData[activeBranch];

  return (
    <div className="bg-slate-950 min-h-screen text-slate-50 font-sans pt-24 pb-32">
      <SEO 
        title={t('case_dre.title')} 
        description={t('case_dre.subtitle')}
        url="/projects/dashboard-dre"
      />
      <div className="container mx-auto px-6 max-w-5xl">
        <Link to="/projects" className="inline-flex items-center gap-2 text-slate-400 hover:text-purple-400 transition-colors mb-12 font-mono text-sm">
          <ArrowLeft size={16} /> {t('case_common.back_projects')}
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
          <div className="flex flex-wrap gap-3 mb-6">
            <span className="px-3 py-1 text-xs font-mono rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400">Looker Studio</span>
            <span className="px-3 py-1 text-xs font-mono rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400">Python (pyodbc)</span>
            <span className="px-3 py-1 text-xs font-mono rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">SQL & Data Warehouse</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">
            {t('case_dre.title')} <span className="text-purple-500">{t('case_dre.title_highlight')}</span>
          </h1>
          <p className="text-xl text-slate-400 leading-relaxed">
            {t('case_dre.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <Database className="text-blue-400" /> {t('case_dre.challenge_title')}
            </h3>
            <p className="text-slate-400 mb-10 leading-relaxed">
              {t('case_dre.challenge_desc')}
            </p>

            <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <LineChart className="text-purple-400" /> {t('case_dre.arch_title')}
            </h3>
            <p className="text-slate-400 mb-6 leading-relaxed">
              {t('case_dre.arch_desc')}
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}
            className="bg-slate-900 border border-slate-800 rounded-[2rem] p-6 shadow-2xl relative overflow-hidden flex flex-col"
          >
            <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] pointer-events-none"></div>

            <div className="relative z-10 flex flex-col h-full">
              <div className="flex justify-between items-center mb-6 border-b border-slate-800 pb-4">
                <h4 className="text-sm font-mono text-purple-400 flex items-center gap-2 tracking-widest uppercase">
                  <BarChart3 size={16} /> {t('case_dre.sandbox_title')}
                </h4>
                
                <div className="flex gap-2">
                  {Object.keys(dashboardData).map((key) => (
                    <button
                      key={key}
                      onClick={() => setActiveBranch(key)}
                      className={`px-3 py-1 text-[10px] font-mono uppercase rounded-md transition-colors ${
                        activeBranch === key 
                          ? 'bg-purple-600 text-white' 
                          : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                      }`}
                    >
                      {t(`case_dre.branches.${key}`)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl">
                  <span className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1 block">{t('case_dre.gross_revenue')}</span>
                  <div className="text-2xl font-bold text-slate-100 flex items-center gap-2">
                    $ {(currentData.receita / 1000).toFixed(0)}k
                  </div>
                </div>
                <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl">
                  <span className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1 block">{t('case_dre.net_profit')}</span>
                  <div className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
                    $ {(currentData.lucro / 1000).toFixed(0)}k
                  </div>
                </div>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 flex-1 flex flex-col justify-end relative mt-auto h-40">
                <div className="absolute top-4 left-4 flex items-center gap-2 text-xs font-medium text-slate-400">
                  <TrendingUp size={14} className="text-blue-400" /> {t('case_dre.margin_evolution')} ({currentData.margin}%)
                </div>
                <div className="flex items-end justify-between gap-2 h-24 mt-8 w-full">
                  <AnimatePresence mode="popLayout">
                    {currentData.chart.map((height, i) => (
                      <motion.div
                        key={`${activeBranch}-${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: `${height}%`, opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 100, damping: 15, delay: i * 0.05 }}
                        className="flex-1 bg-gradient-to-t from-purple-600 to-blue-400 rounded-t-sm"
                      />
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}