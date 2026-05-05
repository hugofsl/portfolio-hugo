import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion';
import { Cpu, Palette, Database, Gamepad2, GraduationCap, Boxes, Lightbulb, Zap, Rocket } from 'lucide-react';
import SEO from '../components/SEO';
import fotoHugo from '../assets/foto-hugo.png';
import { useTranslation } from 'react-i18next';

export default function About() {
  const containerRef = useRef(null);
  const { t } = useTranslation();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const y1 = useTransform(smoothProgress, [0, 1], [0, -200]);
  const y2 = useTransform(smoothProgress, [0, 1], [0, -500]);
  const rotate = useTransform(smoothProgress, [0, 1], [0, 45]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const handleGlobalMouseMove = ({ currentTarget, clientX, clientY }) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  const textMouseX = useMotionValue(0);
  const textMouseY = useMotionValue(0);
  const handleTextMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    textMouseX.set(e.clientX - rect.left);
    textMouseY.set(e.clientY - rect.top);
  };

  const skills = [
    { category: t('about.skills_cards.eng'), icon: <Cpu size={32} />, items: ["React & Vite", "Firebase", "Python", "SQL", "C++/C#", "GitHub Actions"], color: "text-blue-400", border: "border-blue-500/20" },
    { category: t('about.skills_cards.design'), icon: <Palette size={32} />, items: ["Adobe Illustrator", "Photoshop", "After Effects", t('about.skills_cards.items.art_direction'), "Rebranding"], color: "text-pink-400", border: "border-pink-500/20" },
    { category: t('about.skills_cards.strategy'), icon: <Database size={32} />, items: [t('about.skills_cards.items.data_science'), "BI (Looker Studio)", t('about.skills_cards.items.agile'), t('about.skills_cards.items.planning')], color: "text-emerald-400", border: "border-emerald-500/20" }
  ];

  return (
    <div 
      ref={containerRef} 
      className="bg-slate-950 min-h-screen text-slate-50 relative overflow-hidden font-sans group"
      onMouseMove={handleGlobalMouseMove} 
    >
      <SEO 
        title={t('navbar.about')} 
        description={t('about.subtitle')}
        url="/about"
      />
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition duration-300 z-30"
        style={{
          background: useMotionTemplate`radial-gradient(650px circle at ${mouseX}px ${mouseY}px, rgba(59, 130, 246, 0.05), transparent 80%)`,
        }}
      />

      <div className="fixed inset-0 z-0 pointer-events-none">
        <motion.div style={{ y: y1, rotate }} className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px]" />
        <motion.div style={{ y: y2 }} className="absolute bottom-[-20%] left-[-10%] w-[800px] h-[800px] bg-purple-600/5 rounded-full blur-[150px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <section className="min-h-screen flex flex-col lg:flex-row items-center justify-center gap-16 pt-20">
          <TiltContainer>
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "circOut" }}
              className="relative w-72 h-72 md:w-96 md:h-96 group"
            >
              <div className="absolute -inset-4 bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 rounded-[2rem] blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-700 animate-pulse"></div>
              <div className="relative w-full h-full bg-slate-900 rounded-[2rem] overflow-hidden border border-slate-800 p-2">
                <div className="w-full h-full rounded-[1.5rem] overflow-hidden bg-slate-800">
                  <img src={fotoHugo} alt="Hugo Lourenço" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                </div>
              </div>
              <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 3 }} className="absolute -top-4 -right-4 bg-slate-900/80 border border-slate-800 p-3 rounded-2xl backdrop-blur-md shadow-xl z-20">
                <Zap className="text-yellow-500" size={24} />
              </motion.div>
              <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 4, delay: 1 }} className="absolute -bottom-4 -left-4 bg-slate-900/80 border border-slate-800 p-3 rounded-2xl backdrop-blur-md shadow-xl z-20">
                <Rocket className="text-blue-500" size={24} />
              </motion.div>
            </motion.div>
          </TiltContainer>

          <div className="flex-1 text-center lg:text-left z-40">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono mb-6">
              <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span> {t('about.protocol')}
            </motion.div>
            
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-5xl md:text-8xl font-black tracking-tighter leading-none mb-8">
              {t('about.title_architect')} <br />
              <span 
                className="relative inline-block group/text cursor-default leading-tight"
                onMouseMove={handleTextMouseMove}
              >
                <span className="block text-transparent" style={{ WebkitTextStroke: '2px #475569' }}>{t('about.title_workflows')}</span>
                <motion.span 
                  className="absolute inset-0 block bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent opacity-0 group-hover/text:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ clipPath: useMotionTemplate`circle(100px at ${textMouseX}px ${textMouseY}px)` }}
                >
                  {t('about.title_workflows')}
                </motion.span>
              </span>
            </motion.h1>
            
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-xl text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed mb-8">
              {t('about.subtitle')}
            </motion.p>
          </div>
        </section>

        <section className="py-40">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <SkillCard key={index} skill={skill} index={index} />
            ))}
          </div>
        </section>

        <section className="py-40 border-t border-slate-900 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
                {t('about.philosophy.precision')} <span className="text-blue-500 relative group">{t('about.philosophy.logic')}<span className="absolute bottom-0 left-0 w-0 h-1 bg-blue-500 group-hover:w-full transition-all duration-300 rounded-full"></span></span> <br /> 
                {t('about.philosophy.breath')} <span className="text-pink-500 relative group">{t('about.philosophy.art')}<span className="absolute bottom-0 left-0 w-0 h-1 bg-pink-500 group-hover:w-full transition-all duration-300 rounded-full"></span></span>
              </h2>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                {t('about.philosophy.description')}
              </p>
              <div className="flex flex-col gap-6">
                {[
                  { label: t('about.philosophy_points.mechatronics'), value: t('about.philosophy_points.systemic'), icon: <Boxes size={20} /> }, 
                  { label: t('about.philosophy_points.graphic_design'), value: t('about.philosophy_points.aesthetic'), icon: <Palette size={20} /> }, 
                  { label: t('about.philosophy_points.data_science'), value: t('about.philosophy_points.analytic'), icon: <Database size={20} /> }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 group">
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 group-hover:border-blue-500/50 transition-colors">{item.icon}</div>
                    <div><h4 className="text-slate-200 font-bold">{item.label}</h4><p className="text-slate-500 text-sm">{item.value}</p></div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative aspect-square rounded-[3rem] bg-gradient-to-br from-blue-600/10 to-purple-600/10 border border-white/5 overflow-hidden flex items-center justify-center p-12 group">
               <div className="absolute inset-0 bg-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-[80px]"></div>
               <div className="grid grid-cols-3 gap-4 w-full relative z-10">
                  {[...Array(9)].map((_, i) => (<motion.div key={i} animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.03, 1] }} transition={{ duration: Math.random() * 2 + 2, repeat: Infinity, delay: i * 0.2 }} className="aspect-square bg-slate-900/80 rounded-2xl border border-white/10" />))}
               </div>
               <motion.div animate={{ rotate: 360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="absolute inset-0 border-[40px] border-dashed border-blue-500/5 rounded-full scale-150" />
            </motion.div>
          </div>
        </section>

        <section className="py-40">
           <div className="text-center mb-20">
              <h2 className="text-4xl font-bold mb-4">{t('about.knowledge_base.title')}</h2>
              <div className="h-1 w-20 bg-blue-600 mx-auto rounded-full"></div>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 bg-slate-900/50 p-10 rounded-[3rem] border border-slate-800 flex flex-col justify-between group relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <GraduationCap className="text-blue-500 mb-6" size={40} />
                  <h3 className="text-3xl font-bold mb-2">{t('about.knowledge_base.univesp_title')}</h3>
                  <p className="text-slate-400 mb-6 font-mono text-sm uppercase">{t('about.knowledge_base.univesp_date')}</p>
                  <p className="text-slate-500 leading-relaxed text-sm md:text-base">{t('about.knowledge_base.univesp_desc')}</p>
                </div>
              </div>
              <div className="space-y-6">
                {[
                  { title: t('about.knowledge_base.senai_title'), subtitle: t('about.knowledge_base.senai_subtitle'), quote: t('about.knowledge_base.senai_quote') }, 
                  { title: t('about.knowledge_base.panamericana_title'), subtitle: t('about.knowledge_base.panamericana_subtitle'), quote: t('about.knowledge_base.panamericana_quote') }
                ].map((edu, i) => (
                  <div key={i} className="bg-slate-900/50 p-8 rounded-[2.5rem] border border-slate-800 hover:border-slate-700 transition-colors">
                    <h4 className="font-bold text-xl mb-1">{edu.title}</h4>
                    <p className="text-xs text-slate-500 uppercase mb-4 tracking-widest font-mono">{edu.subtitle}</p>
                    <p className="text-slate-400 text-sm italic leading-relaxed">{edu.quote}</p>
                  </div>
                ))}
              </div>
           </div>
        </section>
      </div>
    </div>
  );
}

function SkillCard({ skill, index }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };
  return (
    <TiltContainer>
      <motion.div
        onMouseMove={handleMouseMove}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.2, duration: 0.8 }}
        className={`group p-8 rounded-[2.5rem] border ${skill.border} bg-slate-900/40 backdrop-blur-sm relative overflow-hidden flex flex-col h-full`}
      >
        <motion.div
          className="absolute -inset-px rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none z-0"
          style={{ background: useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px, rgba(59, 130, 246, 0.1), transparent 80%)` }}
        />
        <div className="relative z-10">
          <div className={`mb-8 p-4 rounded-2xl bg-slate-950 border ${skill.border} w-fit ${skill.color}`}>{skill.icon}</div>
          <h3 className="text-2xl font-bold mb-6">{skill.category}</h3>
          <div className="space-y-4">
            {skill.items.map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-slate-400 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-blue-500 transition-colors" /> {item}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </TiltContainer>
  );
}

function TiltContainer({ children }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-10, 10]);
  const springRotateX = useSpring(rotateX, { stiffness: 150, damping: 20 });
  const springRotateY = useSpring(rotateY, { stiffness: 150, damping: 20 });
  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };
  return (
    <motion.div ref={ref} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} style={{ rotateX: springRotateX, rotateY: springRotateY, transformStyle: "preserve-3d" }} className="flex-1 h-full">
      <div style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }} className="h-full">{children}</div>
    </motion.div>
  );
}