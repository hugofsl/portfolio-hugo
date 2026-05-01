import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Code2, Database, ShieldCheck, Calculator, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

export default function ProjectImprimil() {
  // Estados para o Simulador Interativo do ERP
  const [largura, setLargura] = useState(1.5);
  const [altura, setAltura] = useState(2.0);
  const [material, setMaterial] = useState(150); // Preço por m²
  
  // Lógica matemática central do sistema
  const area = largura * altura;
  const subtotal = area * material;
  const taxaMinima = 350; // O famoso "Piso de Aplicação"
  const total = Math.max(subtotal, taxaMinima);
  const usouTaxaMinima = subtotal < taxaMinima;

  return (
    <div className="bg-slate-950 min-h-screen text-slate-50 font-sans pt-24 pb-32">
        <SEO 
                title="Projeto Sistema Comercial Integrado" 
                description="Uma aplicação complexa de gestão de produção projetada para lidar com regras de negócios específicas (como taxas mínimas e perdas de material), com acesso multi-nível protegido por Firebase."
                url="/projects/sistema-comercial"
              />
      <div className="container mx-auto px-6 max-w-5xl">
        
        {/* Navegação Voltar */}
        <Link to="/projects" className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors mb-12 font-mono text-sm">
          <ArrowLeft size={16} /> VOLTAR PARA O TERMINAL
        </Link>

        {/* Cabeçalho do Case */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
          <div className="flex flex-wrap gap-3 mb-6">
            <span className="px-3 py-1 text-xs font-mono rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400">React</span>
            <span className="px-3 py-1 text-xs font-mono rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400">Firebase Auth & Firestore</span>
            <span className="px-3 py-1 text-xs font-mono rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">APIs Financeiras</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">
            Sistema Comercial <br /> <span className="text-blue-500">Integrado.</span>
          </h1>
          <p className="text-xl text-slate-400 leading-relaxed">
            Uma aplicação complexa de gestão de produção projetada para lidar com regras de negócios específicas (como taxas mínimas e perdas de material), com acesso multi-nível protegido por Firebase.
          </p>
        </motion.div>

        {/* Container Principal Dividido */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          
          {/* O Desafio e a Solução */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <Database className="text-purple-400" /> O Desafio
            </h3>
            <p className="text-slate-400 mb-10 leading-relaxed">
              O processo de orçamentação para frotas e materiais gráficos envolvia cálculos manuais demorados. Além disso, orçamentos muito pequenos geravam prejuízo devido aos custos fixos de setup das máquinas e deslocamento técnico. A solução precisava ser rápida, em nuvem e à prova de erros.
            </p>

            <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <ShieldCheck className="text-emerald-400" /> A Arquitetura
            </h3>
            <p className="text-slate-400 mb-6 leading-relaxed">
              Desenvolvi um SPA em React protegido pelo <strong>AuthProvider do Firebase</strong>. Apenas gestores podem aprovar layouts ou alterar os custos base de materiais no Firestore. A aplicação processa orçamentos complexos e comunica via REST API com sistemas de emissão de boletos.
            </p>
          </motion.div>

          {/* SIMULADOR INTERATIVO (A "DEMO") */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}
            className="bg-slate-900 border border-slate-800 rounded-[2rem] p-8 shadow-2xl relative overflow-hidden"
          >
            {/* Efeito Glow interno */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px] pointer-events-none"></div>

            <div className="relative z-10">
              <h4 className="text-sm font-mono text-blue-400 mb-6 flex items-center gap-2 tracking-widest uppercase">
                <Calculator size={16} /> Sandbox Interativo
              </h4>
              <p className="text-slate-300 mb-8 font-medium">Simule o motor de regras de negócio:</p>

              {/* Inputs */}
              <div className="space-y-4 mb-8">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">Largura (m)</label>
                    <input 
                      type="number" step="0.1" value={largura} onChange={(e) => setLargura(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-slate-200 outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">Altura (m)</label>
                    <input 
                      type="number" step="0.1" value={altura} onChange={(e) => setAltura(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-slate-200 outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-slate-500 mb-1">Material (Adesivo)</label>
                  <select 
                    value={material} onChange={(e) => setMaterial(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-slate-200 outline-none focus:border-blue-500 transition-colors"
                  >
                    <option value={150}>3M MCS Certificado (R$ 150/m²)</option>
                    <option value={80}>Vinil Promocional (R$ 80/m²)</option>
                  </select>
                </div>
              </div>

              {/* Resultados do Simulador */}
              <div className="bg-slate-950 rounded-xl p-6 border border-slate-800 font-mono text-sm">
                <div className="flex justify-between text-slate-400 mb-2">
                  <span>Área Total:</span> <span>{area.toFixed(2)} m²</span>
                </div>
                <div className="flex justify-between text-slate-400 mb-2">
                  <span>Custo Material:</span> <span>R$ {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-500 mb-4 pb-4 border-b border-slate-800">
                  <span>Trava do Sistema (Piso):</span> <span>R$ {taxaMinima.toFixed(2)}</span>
                </div>

                <div className="flex justify-between items-center text-lg font-bold text-slate-50">
                  <span>Total Orçado:</span> 
                  <span className={usouTaxaMinima ? "text-orange-400" : "text-emerald-400"}>
                    R$ {total.toFixed(2)}
                  </span>
                </div>

                {usouTaxaMinima && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-4 text-xs text-orange-400 flex gap-2 items-start">
                    <CheckCircle2 size={14} className="mt-0.5 shrink-0" />
                    Regra aplicada: O subtotal foi inferior ao piso operacional. O sistema bloqueou o prejuízo e ajustou para a taxa mínima de R$ 350,00.
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Snippet de Código Simulando o Repo Real */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="flex items-center gap-2 bg-slate-900 border-x border-t border-slate-800 rounded-t-xl px-4 py-3 w-fit">
            <Code2 size={16} className="text-slate-400" />
            <span className="text-xs font-mono text-slate-400">src/utils/calcRules.js</span>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-b-xl rounded-tr-xl p-6 overflow-x-auto">
            <pre className="font-mono text-sm text-slate-300">
              <span className="text-purple-400">export const</span> <span className="text-blue-400">calculateWrapQuote</span> = (width, height, materialPrice) =&gt; {'{\n'}
              {'  '}// 1. Calcula a área com margem de segurança de sangria (+10cm)\n
              {'  '}<span className="text-purple-400">const</span> safeWidth = width + <span className="text-orange-400">0.1</span>;\n
              {'  '}<span className="text-purple-400">const</span> safeHeight = height + <span className="text-orange-400">0.1</span>;\n
              {'  '}<span className="text-purple-400">const</span> area = safeWidth * safeHeight;\n\n
              {'  '}// 2. Calcula o custo subtotal da matéria prima\n
              {'  '}<span className="text-purple-400">const</span> subtotal = area * materialPrice;\n\n
              {'  '}// 3. Aplica a trava lógica de negócio (Piso Operacional)\n
              {'  '}<span className="text-purple-400">const</span> OPERATIONAL_FLOOR = <span className="text-orange-400">350.00</span>;\n
              {'  '}<span className="text-purple-400">return</span> Math.<span className="text-blue-300">max</span>(subtotal, OPERATIONAL_FLOOR);\n
              {'}'}
            </pre>
          </div>
        </motion.div>

      </div>
    </div>
  );
}