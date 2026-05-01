import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Sparkles, Users, FileSpreadsheet, Server, ArrowRight, CheckCircle2, LayoutDashboard, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

export default function ProjectPersonalCleaner() {
  const [wizardStep, setWizardStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [crmLeads, setCrmLeads] = useState([
    { id: '101', name: 'Ana Souza', type: 'Limpeza Pesada', status: 'convertido', value: 350 },
    { id: '102', name: 'Carlos Mendes', type: 'Padrão (Manutenção)', status: 'novo', value: 180 }
  ]);
  const [sheetsLog, setSheetsLog] = useState([]);

  // Estados do Wizard Simulado
  const [rooms, setRooms] = useState(2);
  const [bathrooms, setBathrooms] = useState(1);
  const [cleanType, setCleanType] = useState('Padrão');

  const handleWizardSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      // Adiciona o lead no CRM Simulado
      const newLead = {
        id: Math.floor(Math.random() * 1000).toString(),
        name: 'Visitante (Você)',
        type: cleanType,
        status: 'novo',
        value: (rooms * 50) + (bathrooms * 40) + (cleanType === 'Pesada' ? 100 : 0)
      };
      setCrmLeads([newLead, ...crmLeads]);
      setIsSubmitting(false);
      setWizardStep(3); // Tela de Sucesso
      setTimeout(() => setWizardStep(1), 3000); // Reseta após 3s
    }, 1000);
  };

  const handleConvertLead = (id, value) => {
    setCrmLeads(crmLeads.map(lead => lead.id === id ? { ...lead, status: 'convertido' } : lead));
    
    // Simula a integração com Google Sheets
    const newLog = `> [Sheets API] Nova conversão registrada na linha ${Math.floor(Math.random() * 100) + 10}: R$ ${value},00`;
    setSheetsLog(prev => [newLog, ...prev].slice(0, 3)); // Mantém apenas os 3 últimos logs
  };

  return (
    <div className="bg-slate-950 min-h-screen text-slate-50 font-sans pt-24 pb-32">
                <SEO 
                title="Projeto Webapp Personal Cleaner" 
                description="Uma plataforma high-end de serviços de limpeza que une uma experiência de conversão B2C (Wizard) a um CRM leve de gestão de leads B2B, operando com custo de infraestrutura virtualmente zero."
                url="/projects/personal-cleaner"
              />
      <div className="container mx-auto px-6 max-w-5xl">
        
        {/* Navegação Voltar */}
        <Link to="/projects" className="inline-flex items-center gap-2 text-slate-400 hover:text-pink-400 transition-colors mb-12 font-mono text-sm">
          <ArrowLeft size={16} /> VOLTAR PARA PROJETOS
        </Link>

        {/* Cabeçalho do Case */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
          <div className="flex flex-wrap gap-3 mb-6">
            <span className="px-3 py-1 text-xs font-mono rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400">React & UX/UI</span>
            <span className="px-3 py-1 text-xs font-mono rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400">Firebase (Zero-Cost)</span>
            <span className="px-3 py-1 text-xs font-mono rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">Google Sheets API</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">
            Webapp <span className="text-pink-500">Personal Cleaner</span>.
          </h1>
          <p className="text-xl text-slate-400 leading-relaxed">
            Uma plataforma high-end de serviços de limpeza que une uma experiência de conversão B2C (Wizard) a um CRM leve de gestão de leads B2B, operando com custo de infraestrutura virtualmente zero.
          </p>
        </motion.div>

        {/* Container Principal Dividido */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          
          {/* O Desafio e a Solução */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <Sparkles className="text-pink-400" /> A Experiência Premium
            </h3>
            <p className="text-slate-400 mb-10 leading-relaxed">
              Serviços de limpeza de alto padrão exigem uma identidade visual clean e minimalista. O desafio era substituir o atrito de formulários longos ou contatos diretos e frios no WhatsApp por um funil de orçamentação elegante, onde o cliente se sente construindo um serviço personalizado.
            </p>

            <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <Server className="text-emerald-400" /> Arquitetura Zero-Cost & CRM
            </h3>
            <p className="text-slate-400 mb-6 leading-relaxed">
              O sistema foi desenhado para maximizar lucros eliminando custos fixos de servidor. Utilizando as cotas gratuitas do <strong>Firebase</strong>, a Landing Page atua também como um CRM enxuto. Leads são capturados, qualificados pelo administrador e, ao serem marcados como "Convertidos", sincronizam automaticamente com uma planilha financeira no Google Sheets.
            </p>
          </motion.div>

          {/* SIMULADOR INTERATIVO (A "DEMO") */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}
            className="bg-slate-900 border border-slate-800 rounded-[2rem] p-6 shadow-2xl relative overflow-hidden flex flex-col gap-6"
          >
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/10 rounded-full blur-[80px] pointer-events-none"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10 h-full">
              
              {/* PAINEL ESQUERDO: WIZARD B2C */}
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 flex flex-col">
                <h4 className="text-xs font-mono text-pink-400 flex items-center gap-2 mb-4 uppercase tracking-wider">
                  <Sparkles size={14} /> Wizard do Cliente
                </h4>
                
                <div className="flex-1 flex flex-col justify-center">
                  <AnimatePresence mode="wait">
                    {wizardStep === 1 && (
                      <motion.div key="step1" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
                        <label className="text-xs text-slate-500 block mb-2">Tamanho do Imóvel</label>
                        <div className="flex gap-2 mb-4">
                          <button onClick={() => setRooms(Math.max(1, rooms - 1))} className="px-3 py-1 bg-slate-800 rounded-lg">-</button>
                          <div className="flex-1 text-center py-1 bg-slate-900 rounded-lg text-sm">{rooms} Quartos</div>
                          <button onClick={() => setRooms(rooms + 1)} className="px-3 py-1 bg-slate-800 rounded-lg">+</button>
                        </div>
                        <div className="flex gap-2 mb-6">
                          <button onClick={() => setBathrooms(Math.max(1, bathrooms - 1))} className="px-3 py-1 bg-slate-800 rounded-lg">-</button>
                          <div className="flex-1 text-center py-1 bg-slate-900 rounded-lg text-sm">{bathrooms} Banheiros</div>
                          <button onClick={() => setBathrooms(bathrooms + 1)} className="px-3 py-1 bg-slate-800 rounded-lg">+</button>
                        </div>
                        <button onClick={() => setWizardStep(2)} className="w-full py-2 bg-pink-600 hover:bg-pink-500 rounded-lg text-sm font-bold flex justify-center items-center gap-2 transition-colors">
                          Avançar <ArrowRight size={14} />
                        </button>
                      </motion.div>
                    )}
                    {wizardStep === 2 && (
                      <motion.div key="step2" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
                        <label className="text-xs text-slate-500 block mb-2">Tipo de Serviço</label>
                        <div className="flex flex-col gap-2 mb-6">
                          {['Padrão', 'Pesada', 'Pós-Obra'].map(type => (
                            <button 
                              key={type} onClick={() => setCleanType(type)}
                              className={`p-2 text-sm rounded-lg border text-left transition-colors ${cleanType === type ? 'bg-pink-600/20 border-pink-500 text-pink-400' : 'bg-slate-900 border-slate-800 hover:border-slate-700'}`}
                            >
                              {type}
                            </button>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => setWizardStep(1)} className="px-3 py-2 bg-slate-800 rounded-lg text-xs font-mono">Voltar</button>
                          <button onClick={handleWizardSubmit} disabled={isSubmitting} className="flex-1 py-2 bg-pink-600 hover:bg-pink-500 rounded-lg text-sm font-bold flex justify-center items-center gap-2 transition-colors">
                            {isSubmitting ? 'Gerando...' : 'Pedir Orçamento'} <Send size={14} />
                          </button>
                        </div>
                      </motion.div>
                    )}
                    {wizardStep === 3 && (
                      <motion.div key="step3" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-4">
                        <CheckCircle2 size={32} className="text-emerald-400 mx-auto mb-2" />
                        <p className="text-sm font-bold text-slate-200">Orçamento Enviado!</p>
                        <p className="text-xs text-slate-500">Veja o lead no painel ao lado.</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* PAINEL DIREITO: CRM ADMIN */}
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 flex flex-col">
                <h4 className="text-xs font-mono text-blue-400 flex items-center gap-2 mb-4 uppercase tracking-wider">
                  <LayoutDashboard size={14} /> CRM Interno
                </h4>
                
                <div className="flex-1 space-y-2 overflow-y-auto max-h-[200px] pr-1">
                  <AnimatePresence>
                    {crmLeads.map(lead => (
                      <motion.div 
                        key={lead.id} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} layout
                        className="p-3 bg-slate-900 border border-slate-800 rounded-lg flex flex-col gap-2"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-xs font-bold text-slate-200">{lead.name}</p>
                            <p className="text-[10px] text-slate-500">{lead.type}</p>
                          </div>
                          <span className={`px-2 py-0.5 rounded text-[9px] font-mono uppercase border ${lead.status === 'novo' ? 'bg-orange-500/10 border-orange-500/30 text-orange-400' : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'}`}>
                            {lead.status}
                          </span>
                        </div>
                        {lead.status === 'novo' && (
                          <button 
                            onClick={() => handleConvertLead(lead.id, lead.value)}
                            className="w-full py-1.5 mt-1 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 rounded text-[10px] font-bold transition-colors flex items-center justify-center gap-1"
                          >
                            <FileSpreadsheet size={12} /> Fechar & Sincronizar
                          </button>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Console de Sincronização Sheets */}
                <div className="mt-3 pt-3 border-t border-slate-800 font-mono text-[9px] text-slate-500 space-y-1">
                  {sheetsLog.map((log, i) => (
                    <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-emerald-400">{log}</motion.div>
                  ))}
                  {sheetsLog.length === 0 && <span>Aguardando conversões para sincronizar...</span>}
                </div>
              </div>

            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}