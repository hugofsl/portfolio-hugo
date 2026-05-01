import { useRef } from 'react';
import { motion, useMotionValue, useMotionTemplate, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight, Code2, Database, GitBranch, Sparkles, Terminal } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

export default function Projects() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleGlobalMouseMove = ({ currentTarget, clientX, clientY }) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  const allProjects = [
    {
      id: "erp-imprimil",
      title: "ERP & Motor de Orçamentos",
      category: "Full-Stack • React & Firebase",
      icon: <Code2 className="text-blue-400" size={28} />,
      description: "Sistema de gestão focado em automação de orçamentos para grandes formatos. Resolve o desafio de cálculos complexos e travas operacionais de segurança.",
      tech: ["React", "Firebase", "Tailwind", "Vexsoft API"],
      link: "/projects/sistema-comercial",
      gradient: "from-blue-500/10 to-blue-900/10"
    },
    {
      id: "asana-sync",
      title: "Automação 'Sanfona Inteligente'",
      category: "Data Engineering • Python",
      icon: <GitBranch className="text-emerald-400" size={28} />,
      description: "Pipeline de dados que desmembra OS em micro-tarefas automáticas no Asana. Sincronização em tempo real via GitHub Actions.",
      tech: ["Python", "Asana API", "GitHub Actions", "Pandas"],
      link: "/projects/automacao-asana",
      gradient: "from-emerald-500/10 to-emerald-900/10"
    },
    {
      id: "dashboard-dre",
      title: "Dashboard Consolidado DRE",
      category: "Business Intelligence • Looker",
      icon: <Database className="text-purple-400" size={28} />,
      description: "Extração de dados legados (.mdb) via Python para dashboards executivos. Visão clara de margens e lucros de múltiplas filiais.",
      tech: ["SQL", "Python", "Looker Studio", "ODBC"],
      link: "/projects/dashboard-dre",
      gradient: "from-purple-500/10 to-purple-900/10"
    },
    {
      id: "personal-cleaner",
      title: "Webapp Personal Cleaner",
      category: "UX/UI & CRM • Firebase",
      icon: <Sparkles className="text-pink-400" size={28} />,
      description: "Plataforma high-end de serviços com funil de conversão (Wizard) B2C e CRM integrado B2B. Integração direta com Google Sheets para consolidação financeira.",
      tech: ["React", "Firebase", "UX/UI", "Sheets API"],
      link: "/projects/personal-cleaner",
      gradient: "from-pink-500/10 to-pink-900/10"
    }
  ];

  return (
    <div 
      className="bg-slate-950 min-h-screen text-slate-50 pt-32 pb-24 relative overflow-hidden group"
      onMouseMove={handleGlobalMouseMove}
    >
      <SEO 
        title="Projetos" 
        description="Uma seleção de sistemas desenvolvidos para otimizar operações, extrair inteligência de dados legados e automatizar fluxos de trabalho complexos,"
         url="/projects"
      />
      {/* Holofote Global de Fundo */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition duration-500 z-10"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              700px circle at ${mouseX}px ${mouseY}px,
              rgba(59, 130, 246, 0.05),
              transparent 80%
            )
          `,
        }}
      />

      <div className="container mx-auto px-6 relative z-20">
        <header className="max-w-3xl mb-20">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-blue-400 font-mono text-sm mb-4"
          >
            <Terminal size={16} /> PORTFÓLIO_DE_ENGENHARIA
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-black tracking-tighter mb-6"
          >
            Soluções que <br /> <span className="text-transparent" style={{ WebkitTextStroke: '1.5px #475569' }}>Escalam.</span>
          </motion.h1>
          <p className="text-xl text-slate-400 leading-relaxed">
            Uma seleção de sistemas desenvolvidos para otimizar operações, 
            extrair inteligência de dados legados e automatizar fluxos de trabalho complexos.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allProjects.map((project, idx) => (
            <ProjectCard key={project.id} project={project} index={idx} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project, index }) {
  const cardX = useMotionValue(0);
  const cardY = useMotionValue(0);

  const rotateX = useSpring(useTransform(cardY, [-0.5, 0.5], [10, -10]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(cardX, [-0.5, 0.5], [-10, 10]), { stiffness: 150, damping: 20 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    cardX.set((e.clientX - rect.left) / rect.width - 0.5);
    cardY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { cardX.set(0); cardY.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="h-full"
    >
      <Link 
        to={project.link}
        className={`block h-full p-8 rounded-[2.5rem] bg-gradient-to-br ${project.gradient} border border-slate-800 hover:border-blue-500/50 transition-colors relative overflow-hidden group`}
      >
        <div style={{ transform: "translateZ(30px)" }}>
          <div className="mb-8 p-4 bg-slate-950 border border-slate-800 w-fit rounded-2xl group-hover:scale-110 transition-transform duration-500">
            {project.icon}
          </div>
          <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
          <p className="text-slate-400 text-sm mb-8 leading-relaxed line-clamp-3">
            {project.description}
          </p>
          
          <div className="flex flex-wrap gap-2 mt-auto">
            {project.tech.map(t => (
              <span key={t} className="px-2 py-1 text-[10px] font-mono rounded bg-slate-900 text-slate-500 border border-slate-800">
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
          <ArrowUpRight size={20} className="text-blue-400" />
        </div>
      </Link>
    </motion.div>
  );
}