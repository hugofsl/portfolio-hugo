import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Terminal, GitBranch, Play, Database, Server, LayoutDashboard } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { useTranslation } from 'react-i18next';

export default function ProjectAsana() {
  const { t } = useTranslation();
  const [syncStatus, setSyncStatus] = useState('idle'); 
  const [logs, setLogs] = useState([]);
  const [asanaTasks, setAsanaTasks] = useState([]);

  const runSync = () => {
    if (syncStatus === 'running') return;
    setSyncStatus('running');
    setLogs([]);
    setAsanaTasks([]);

    const sequence = [
      { time: 500, log: "> Iniciando worker Python (GitHub Actions)...", task: null },
      { time: 1500, log: "> Autenticando Google Apps Script (Sheets API)... [OK]", task: null },
      { time: 2500, log: "> Nova OS detectada: [OS-4021]", task: null },
      { time: 3500, log: "> Autenticando Asana API v1.0... [OK]", task: null },
      { time: 4500, log: "> Expandindo OS-4021...", task: { id: 1, title: "1. Print (OS-4021)", status: "done" } },
      { time: 5500, log: "> Criando micro-tarefa...", task: { id: 2, title: "2. Assembly (OS-4021)", status: "pending" } },
      { time: 6500, log: "> Alocando responsáveis...", task: { id: 3, title: "3. Apply (OS-4021)", status: "pending" } },
      { time: 7500, log: "> Sincronização concluída com sucesso.", task: null },
    ];

    sequence.forEach(({ time, log, task }, index) => {
      setTimeout(() => {
        setLogs(prev => [...prev, log]);
        if (task) {
          setAsanaTasks(prev => [...prev, task]);
        }
        if (index === sequence.length - 1) {
          setSyncStatus('done');
        }
      }, time);
    });
  };

  return (
    <div className="bg-slate-950 min-h-screen text-slate-50 font-sans pt-24 pb-32">
      <SEO 
        title={t('case_asana.title')} 
        description={t('case_asana.subtitle')}
        url="/projects/automacao-asana"
      />
      <div className="container mx-auto px-6 max-w-5xl">
        <Link to="/projects" className="inline-flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors mb-12 font-mono text-sm">
          <ArrowLeft size={16} /> {t('case_common.back_projects')}
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
          <div className="flex flex-wrap gap-3 mb-6">
            <span className="px-3 py-1 text-xs font-mono rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">Python</span>
            <span className="px-3 py-1 text-xs font-mono rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400">Asana API</span>
            <span className="px-3 py-1 text-xs font-mono rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400">GitHub Actions</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">
            {t('case_asana.title')} <span className="text-emerald-500">{t('case_asana.title_highlight')}</span>
          </h1>
          <p className="text-xl text-slate-400 leading-relaxed">
            {t('case_asana.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <Database className="text-blue-400" /> {t('case_asana.challenge_title')}
            </h3>
            <p className="text-slate-400 mb-10 leading-relaxed">
              {t('case_asana.challenge_desc')}
            </p>
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <Server className="text-emerald-400" /> {t('case_asana.arch_title')}
            </h3>
            <p className="text-slate-400 mb-6 leading-relaxed">
              {t('case_asana.arch_desc')}
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}
            className="bg-slate-900 border border-slate-800 rounded-[2rem] p-6 shadow-2xl relative overflow-hidden flex flex-col"
          >
            <div className="flex justify-between items-center mb-6">
              <h4 className="text-sm font-mono text-emerald-400 flex items-center gap-2 tracking-widest uppercase">
                <Terminal size={16} /> {t('case_asana.sandbox_title')}
              </h4>
              <button 
                onClick={runSync}
                disabled={syncStatus === 'running'}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition-all ${
                  syncStatus === 'running' ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                }`}
              >
                <Play size={16} /> {syncStatus === 'running' ? t('case_asana.btn_processing') : syncStatus === 'done' ? t('case_asana.btn_run_again') : t('case_asana.btn_run')}
              </button>
            </div>

            <div className="flex-1 flex flex-col gap-4">
              <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 font-mono text-xs text-slate-400 h-32 overflow-y-auto flex flex-col">
                {logs.length === 0 && <span className="opacity-50">{t('case_asana.waiting_log')}</span>}
                {logs.map((log, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                    <span className={log.includes('OK') || log.includes('sucesso') || log.includes('success') ? 'text-emerald-400' : log.includes('OS-') ? 'text-blue-400' : ''}>
                      {log}
                    </span>
                  </motion.div>
                ))}
              </div>

              <div className="bg-slate-950/50 rounded-xl border border-slate-800 p-4 flex-1">
                <div className="flex items-center gap-2 mb-4 text-slate-300 font-medium text-sm">
                  <LayoutDashboard size={16} className="text-purple-400" /> {t('case_asana.board_title')}
                </div>
                <div className="space-y-3">
                  <AnimatePresence>
                    {asanaTasks.length === 0 && syncStatus !== 'running' && (
                      <motion.div exit={{ opacity: 0 }} className="text-center text-slate-600 text-xs py-4 border border-dashed border-slate-700 rounded-lg">
                        {t('case_asana.board_empty')}
                      </motion.div>
                    )}
                    {asanaTasks.map((task) => (
                      <motion.div 
                        key={task.id}
                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className="bg-slate-800 border border-slate-700 rounded-lg p-3 flex justify-between items-center shadow-lg"
                      >
                        <span className="text-sm font-medium text-slate-200">{task.title}</span>
                        <div className="flex gap-2">
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-500/20 text-purple-400 border border-purple-500/30">API_SYNC</span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">on_track</span>
                        </div>
                      </motion.div>
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