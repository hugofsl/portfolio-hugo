import { motion } from 'framer-motion';
import { ArrowUpRight, Code2, Database, GitBranch, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ProjectsSection() {
  const projects = [
    {
      title: "ERP & Motor de Orçamentos",
      category: "Full-Stack • React & Firebase",
      icon: <Code2 className="text-blue-400" size={24} />,
      description: "Aplicação de gestão de produção com cálculo complexo de custos operacionais. Inclui lógica condicional avançada (como travas de 'Piso de Aplicação') e integração direta com APIs do Conta Azul e Vexsoft para suporte a múltiplos CNPJs.",
      techStack: ["React", "Firebase", "TailwindCSS", "REST APIs"],
      gradient: "from-blue-500/10 to-blue-900/10",
      border: "hover:border-blue-500/50",
      link: "/projects/sistema-comercial"
    },
    {
      title: "Automação 'Sanfona Inteligente'",
      category: "Data Engineering • Python",
      icon: <GitBranch className="text-emerald-400" size={24} />,
      description: "Pipeline de automação que conecta Google Sheets e a API do Asana. O script gerencia micro-tarefas de envelopamento de frotas e sincroniza status em tempo real (mapeando labels internas como 'on_track' e 'on_hold') via GitHub Actions.",
      techStack: ["Python", "GitHub Actions", "Asana API", "Google Apps Script"],
      gradient: "from-emerald-500/10 to-emerald-900/10",
      border: "hover:border-emerald-500/50",
      link: "/projects/automacao-asana"
    },
    {
      title: "Dashboard Consolidado DRE",
      category: "Business Intelligence • Looker",
      icon: <Database className="text-purple-400" size={24} />,
      description: "Projeto de Business Intelligence envolvendo a migração de bancos legados (Gestind.mdb) para a nuvem. Consolida dados financeiros de 3 filiais em painéis dinâmicos do Looker Studio para análise executiva em tempo real.",
      techStack: ["Looker Studio", "SQL", "Python", "Google Sheets"],
      gradient: "from-purple-500/10 to-purple-900/10",
      border: "hover:border-purple-500/50",
      link: "/projects/dashboard-dre"
    },
    {
      title: "Webapp Personal Cleaner",
      category: "UX/UI & CRM • Firebase",
      icon: <Sparkles className="text-pink-400" size={24} />,
      description: "Plataforma high-end de serviços com funil de conversão (Wizard) B2C e CRM integrado B2B. Arquitetura serverless utilizando Firebase para otimização extrema de custos.",
      techStack: ["React", "Firebase", "UX/UI", "Sheets API"],
      gradient: "from-pink-500/10 to-pink-900/10",
      border: "hover:border-pink-500/50",
      link: "/projects/personal-cleaner"
    }
  ];

  return (
    <section className="py-32 relative z-10 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Cabeçalho da Seção */}
        <div className="mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-4xl md:text-5xl font-bold text-slate-50 mb-4"
          >
            Projetos <span className="text-blue-500">Em Destaque.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-slate-400 max-w-2xl text-lg"
          >
            Casos reais de engenharia de software e análise de dados, focados em resolver gargalos operacionais e otimizar fluxos de trabalho.
          </motion.p>
        </div>

        {/* Grid de Projetos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className={`group relative p-8 rounded-2xl bg-gradient-to-br ${project.gradient} border border-slate-800 ${project.border} transition-all duration-300 hover:-translate-y-2 flex flex-col h-full`}
            >
              <div className="mb-6 p-3 bg-slate-900/80 rounded-xl w-fit border border-slate-800">
                {project.icon}
              </div>
              
              <p className="text-xs font-mono tracking-widest uppercase mb-2 text-slate-500">
                {project.category}
              </p>
              
              <h3 className="text-xl font-bold text-slate-100 mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-slate-100 group-hover:to-slate-400 transition-colors">
                {project.title}
              </h3>
              
              <p className="text-slate-400 text-sm mb-8 flex-grow leading-relaxed">
                {project.description}
              </p>

              <div className="mt-auto">
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.techStack.map((tech, i) => (
                    <span key={i} className="px-2 py-1 text-[10px] font-mono rounded-md bg-slate-900 border border-slate-800 text-slate-300">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Botão de Link para o Estudo de Caso */}
                <Link to={project.link} className="flex items-center gap-2 text-sm font-bold text-slate-300 group-hover:text-blue-400 transition-colors w-fit">
                  Estudo de Caso
                  <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}