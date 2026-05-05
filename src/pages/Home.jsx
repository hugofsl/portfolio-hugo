import { useRef } from 'react';
import { motion, useMotionValue, useMotionTemplate, useSpring, useTransform } from 'framer-motion';
import { Palette, Code2, Database, Bot, Zap, ArrowDown } from 'lucide-react';
import ProjectsSection from '../components/ProjectsSection';
import TimelineSection from '../components/TimelineSection';
import CtaSection from '../components/CtaSection';
import SEO from '../components/SEO';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const constraintsRef = useRef(null);
  const { t } = useTranslation();

  const heroMouseX = useMotionValue(0);
  const heroMouseY = useMotionValue(0);

  const handleHeroMouseMove = ({ currentTarget, clientX, clientY }) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    heroMouseX.set(clientX - left);
    heroMouseY.set(clientY - top);
  };

  const textMouseX = useMotionValue(0);
  const textMouseY = useMotionValue(0);

  const handleTextMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    textMouseX.set(e.clientX - rect.left);
    textMouseY.set(e.clientY - rect.top);
  };

  const skills = [
    { text: t('home.skills.react'), icon: <Code2 size={16} />, color: "bg-blue-500/20 text-blue-400 border-blue-500/30", x: -150, y: -100 },
    { text: t('home.skills.data'), icon: <Database size={16} />, color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30", x: 150, y: -50 },
    { text: t('home.skills.ui'), icon: <Palette size={16} />, color: "bg-pink-500/20 text-pink-400 border-pink-500/30", x: -100, y: 100 },
    { text: t('home.skills.automation'), icon: <Bot size={16} />, color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30", x: 200, y: 80 },
    { text: t('home.skills.firebase'), icon: <Zap size={16} />, color: "bg-orange-500/20 text-orange-400 border-orange-500/30", x: 0, y: -150 },
  ];

  return (
    <div className="bg-slate-950 font-sans">
      <SEO 
        title={t('navbar.home')} 
        description={t('seo.default_desc')}
        url="/"
      />
      <div 
        className="relative min-h-[95vh] overflow-hidden flex flex-col items-center justify-center group"
        onMouseMove={handleHeroMouseMove}
      >
        <motion.div
          className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition duration-500 z-10"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                600px circle at ${heroMouseX}px ${heroMouseY}px,
                rgba(59, 130, 246, 0.08),
                transparent 80%
              )
            `,
          }}
        />

        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none z-0"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none z-0"></div>

        <motion.div ref={constraintsRef} className="absolute inset-0 z-20 pointer-events-none" />

        <div className="relative z-30 text-center px-4 w-full max-w-5xl pointer-events-none">
          <TiltContainer>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-6 pointer-events-auto"
            >
              <h1 className="text-7xl md:text-[9rem] font-black tracking-tighter leading-none uppercase mb-6 flex flex-col items-center">
                
                <span className="text-transparent" style={{ WebkitTextStroke: '2px #334155' }}>
                  {t('home.title_first')}
                </span>

                <span 
                  className="relative inline-block group/text cursor-default"
                  onMouseMove={handleTextMouseMove}
                >
                  <span className="block text-transparent leading-tight" style={{ WebkitTextStroke: '2px #475569' }}>
                    {t('home.title_last')}
                  </span>
                  
                  <motion.span
                    className="absolute inset-0 block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent opacity-0 group-hover/text:opacity-100 transition-opacity duration-300 pointer-events-none leading-tight"
                    style={{
                      clipPath: useMotionTemplate`circle(120px at ${textMouseX}px ${textMouseY}px)`
                    }}
                  >
                    {t('home.title_last')}
                  </motion.span>
                </span>
                
              </h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto font-light"
              >
                {t('home.subtitle')}
              </motion.p>
            </motion.div>
          </TiltContainer>
        </div>

        <div className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none">
          {skills.map((skill, index) => (
            <motion.div 
              key={index} 
              drag 
              dragConstraints={constraintsRef} 
              dragElastic={0.2}
              whileHover={{ scale: 1.1, cursor: "grab" }}
              whileDrag={{ scale: 1.2, cursor: "grabbing" }}
              initial={{ opacity: 0, x: 0, y: 0 }} 
              animate={{ opacity: 1, x: skill.x, y: skill.y }} 
              transition={{ type: "spring", damping: 12, stiffness: 100, delay: 0.5 + (index * 0.1) }}
              className={`absolute flex items-center gap-2 px-4 py-2 rounded-full border backdrop-blur-md shadow-xl pointer-events-auto select-none ${skill.color}`}
            >
              {skill.icon} <span className="font-medium text-sm">{skill.text}</span>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 z-10 flex flex-col items-center gap-2 text-slate-500 pointer-events-none"
        >
          <span className="text-xs uppercase font-mono tracking-widest">{t('home.scroll_down')}</span>
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}>
            <ArrowDown size={20} />
          </motion.div>
        </motion.div>
      </div>

      <div className="bg-slate-950 border-t border-slate-900 relative z-50">
        <ProjectsSection />
      </div>
      <div className="bg-slate-950/50 border-t border-slate-900 relative z-50">
        <TimelineSection />
      </div>
      <div className="bg-slate-950 border-t border-slate-900 relative z-50">
        <CtaSection />
      </div>
    </div>
  );
}

function TiltContainer({ children }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-15, 15]);

  const springRotateX = useSpring(rotateX, { stiffness: 150, damping: 20 });
  const springRotateY = useSpring(rotateY, { stiffness: 150, damping: 20 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set((mouseX / rect.width) - 0.5);
    y.set((mouseY / rect.height) - 0.5);
  };

  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX: springRotateX, rotateY: springRotateY, transformStyle: "preserve-3d" }}
      className="inline-block"
    >
      <div style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}>
        {children}
      </div>
    </motion.div>
  );
}