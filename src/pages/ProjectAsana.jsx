import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Terminal, GitBranch, Play, Database, Server, CheckCircle2, LayoutDashboard } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

export default function ProjectAsana() {
  const [syncStatus, setSyncStatus] = useState('idle'); // idle, running, done
  const [logs, setLogs] = useState([]);
  const [asanaTasks, setAsanaTasks] = useState([]);

  // Função para simular a execução do Script Python
  const runSync = () => {
    if (syncStatus === 'running') return;
    setSyncStatus('running');
    setLogs([]);
    setAsanaTasks([]);

    const sequence = [
      { time: 500, log: "> Iniciando worker Python (GitHub Actions)...", task: null },
      { time: 1500, log: "> Autenticando Google Apps Script (Sheets API)... [OK]", task: null },
      { time: 2500, log: "> Nova OS detectada: [OS-4021 - Envelopamento Hilux]", task: null },
      { time: 3500, log: "> Autenticando Asana API v1.0... [OK]", task: null },
      { time: 4500, log: "> Aplicando lógica 'Sanfona': Expandindo OS-4021...", task: { id: 1, title: "1. Impressão (OS-4021)", status: "done" } },
      { time: 5500, log: "> Criando micro-tarefa de Montagem e alocando responsáveis...", task: { id: 2, title: "2. Montagem (OS-4021)", status: "pending" } },
      { time: 6500, log: "> Criando micro-tarefa de Aplicação na frota...", task: { id: 3, title: "3. Aplicação (OS-4021)", status: "pending" } },
      { time: 7500, log: "> Sincronização concluída com sucesso. Tempo total: 1.2s", task: null },
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
                title="Projeto Automação 'Sanfona' Asana" 
                description="Um pipeline de engenharia de dados invisível que conecta o planejamento no Google Sheets à execução operacional no Asana, automatizando fluxos de produção física em tempo real."
                url="/projects/automacao-asana"
              />
      <div className="container mx-auto px-6 max-w-5xl">
        
        {/* Navegação Voltar */}
        <Link to="/projects" className="inline-flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors mb-12 font-mono text-sm">
          <ArrowLeft size={16} /> VOLTAR PARA O TERMINAL
        </Link>

        {/* Cabeçalho do Case */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
          <div className="flex flex-wrap gap-3 mb-6">
            <span className="px-3 py-1 text-xs font-mono rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">Python</span>
            <span className="px-3 py-1 text-xs font-mono rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400">Asana API</span>
            <span className="px-3 py-1 text-xs font-mono rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400">GitHub Actions</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">
            Automação <span className="text-emerald-500">'Sanfona'</span>.
          </h1>
          <p className="text-xl text-slate-400 leading-relaxed">
            Um pipeline de engenharia de dados invisível que conecta o planejamento no Google Sheets à execução operacional no Asana, automatizando fluxos de produção física em tempo real.
          </p>
        </motion.div>

        {/* Container Principal Dividido */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          
          {/* O Desafio e a Solução */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <Database className="text-blue-400" /> O Gargalo
            </h3>
            <p className="text-slate-400 mb-10 leading-relaxed">
              O setor de planejamento gerava Ordens de Serviço (OS) massivas no Google Sheets. No entanto, para a fábrica funcionar, cada OS precisava ser desmembrada manualmente no Asana em tarefas diárias (Impressão, Montagem, Aplicação), alocando equipes específicas. Isso gerava atrasos, duplicidades e perda da formatação HTML original.
            </p>

            <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <Server className="text-emerald-400" /> O Motor de Sincronização
            </h3>
            <p className="text-slate-400 mb-6 leading-relaxed">
              Criei um script Python agendado via GitHub Actions. Ele varre as planilhas, consome a API REST do Asana e cria o efeito "Sanfona": uma linha de planilha vira múltiplas micro-tarefas encadeadas na nuvem, com labels mapeadas dinamicamente (como 'on_track' ou 'on_hold') e evitando duplicatas no banco.
            </p>
          </motion.div>

          {/* SIMULADOR INTERATIVO (A "DEMO") */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}
            className="bg-slate-900 border border-slate-800 rounded-[2rem] p-6 shadow-2xl relative overflow-hidden flex flex-col"
          >
            {/* Topo do Simulador */}
            <div className="flex justify-between items-center mb-6">
              <h4 className="text-sm font-mono text-emerald-400 flex items-center gap-2 tracking-widest uppercase">
                <Terminal size={16} /> Script Sandbox
              </h4>
              <button 
                onClick={runSync}
                disabled={syncStatus === 'running'}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition-all ${
                  syncStatus === 'running' ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                }`}
              >
                <Play size={16} /> {syncStatus === 'running' ? 'Processando...' : syncStatus === 'done' ? 'Rodar Novamente' : 'Executar Automação'}
              </button>
            </div>

            {/* Layout Dividido da Demo: Terminal em cima, Kanban embaixo */}
            <div className="flex-1 flex flex-col gap-4">
              
              {/* Terminal de Logs */}
              <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 font-mono text-xs text-slate-400 h-32 overflow-y-auto flex flex-col">
                {logs.length === 0 && <span className="opacity-50">Aguardando execução do script python...</span>}
                {logs.map((log, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                    <span className={log.includes('OK') || log.includes('sucesso') ? 'text-emerald-400' : log.includes('OS-') ? 'text-blue-400' : ''}>
                      {log}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Visualização de Kanban (Asana Simulator) */}
              <div className="bg-slate-950/50 rounded-xl border border-slate-800 p-4 flex-1">
                <div className="flex items-center gap-2 mb-4 text-slate-300 font-medium text-sm">
                  <LayoutDashboard size={16} className="text-purple-400" /> Fila de Produção (Asana)
                </div>
                
                <div className="space-y-3">
                  <AnimatePresence>
                    {asanaTasks.length === 0 && syncStatus !== 'running' && (
                      <motion.div exit={{ opacity: 0 }} className="text-center text-slate-600 text-xs py-4 border border-dashed border-slate-700 rounded-lg">
                        Board vazio. Rode a automação para importar dados da planilha.
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

        {/* Snippet de Código Simulando o Python Real */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="flex items-center gap-2 bg-slate-900 border-x border-t border-slate-800 rounded-t-xl px-4 py-3 w-fit">
            <GitBranch size={16} className="text-slate-400" />
            <span className="text-xs font-mono text-slate-400">asana_sync.py</span>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-b-xl rounded-tr-xl p-6 overflow-x-auto">
            <pre className="font-mono text-sm text-slate-300">
              <span className="text-purple-400">import</span> asana\n
              <span className="text-purple-400">import</span> pandas <span className="text-purple-400">as</span> pd\n\n
              <span className="text-blue-400">def</span> <span className="text-emerald-300">create_micro_tasks</span>(os_data, client, project_id):\n
              {'    '}"""Aplica a lógica de expansão (Sanfona) na API do Asana"""\n
              {'    '}stages = [<span className="text-orange-400">"1. Impressão"</span>, <span className="text-orange-400">"2. Montagem"</span>, <span className="text-orange-400">"3. Aplicação"</span>]\n
              {'    '}\n
              {'    '}<span className="text-purple-400">for</span> stage <span className="text-purple-400">in</span> stages:\n
              {'        '}task_name = <span className="text-orange-400">f"</span><span className="text-blue-300">{'{stage}'}</span><span className="text-orange-400"> - OS: </span><span className="text-blue-300">{'{os_data.id}'}</span><span className="text-orange-400">"</span>\n
              {'        '}\n
              {'        '}# Payload para a API mantendo a formatação HTML original\n
              {'        '}payload = {'{\n'}
              {'            '}<span className="text-orange-400">'projects'</span>: [project_id],\n
              {'            '}<span className="text-orange-400">'name'</span>: task_name,\n
              {'            '}<span className="text-orange-400">'html_notes'</span>: os_data.html_description,\n
              {'            '}<span className="text-orange-400">'custom_fields'</span>: {'{'} <span className="text-orange-400">'status'</span>: <span className="text-orange-400">'on_track'</span> {'}'}\n
              {'        }'}\n
              {'        '}\n
              {'        '}# Previne duplicatas de chamadas de API antes de injetar\n
              {'        '}<span className="text-purple-400">if not</span> check_task_exists(task_name, client):\n
              {'            '}client.tasks.create_task(payload)\n
              {'            '}<span className="text-blue-400">print</span>(<span className="text-orange-400">f"[SUCCESS] Tarefa </span><span className="text-blue-300">{'{task_name}'}</span><span className="text-orange-400"> sincronizada."</span>)\n
            </pre>
          </div>
        </motion.div>

      </div>
    </div>
  );
}