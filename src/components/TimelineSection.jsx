import { motion } from 'framer-motion';
import { TerminalSquare, PenTool, Cpu, Gamepad2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function TimelineSection() {
  const { t } = useTranslation();

  const steps = [
    {
      year: t('timeline.steps.1.year'),
      title: t('timeline.steps.1.title'),
      subtitle: t('timeline.steps.1.subtitle'),
      description: t('timeline.steps.1.description'),
      icon: <TerminalSquare size={20} className="text-blue-400" />,
      glow: "shadow-[0_0_30px_-5px_rgba(59,130,246,0.5)]",
      border: "border-blue-500/50"
    },
    {
      year: t('timeline.steps.2.year'),
      title: t('timeline.steps.2.title'),
      subtitle: t('timeline.steps.2.subtitle'),
      description: t('timeline.steps.2.description'),
      icon: <PenTool size={20} className="text-purple-400" />,
      glow: "shadow-[0_0_30px_-5px_rgba(168,85,247,0.5)]",
      border: "border-purple-500/50"
    },
    {
      year: t('timeline.steps.3.year'),
      title: t('timeline.steps.3.title'),
      subtitle: t('timeline.steps.3.subtitle'),
      description: t('timeline.steps.3.description'),
      icon: <Gamepad2 size={20} className="text-pink-400" />,
      glow: "shadow-[0_0_30px_-5px_rgba(236,72,153,0.5)]",
      border: "border-pink-500/50"
    },
    {
      year: t('timeline.steps.4.year'),
      title: t('timeline.steps.4.title'),
      subtitle: t('timeline.steps.4.subtitle'),
      description: t('timeline.steps.4.description'),
      icon: <Cpu size={20} className="text-emerald-400" />,
      glow: "shadow-[0_0_30px_-5px_rgba(16,185,129,0.5)]",
      border: "border-emerald-500/50"
    }
  ];

  return (
    <section className="py-24 relative z-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-4xl md:text-5xl font-bold text-slate-50 mb-4"
          >
            {t('timeline.title')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">{t('timeline.title_highlight')}</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-slate-400 text-lg"
          >
            {t('timeline.subtitle')}
          </motion.p>
        </div>

        <div className="relative border-l border-slate-800 ml-3 md:ml-0 md:pl-0">
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className="mb-12 ml-8 md:ml-12 relative group"
            >
              <div className={`absolute -left-[41px] md:-left-[57px] top-1 p-2 rounded-full bg-slate-900 border ${step.border} ${step.glow} transition-all duration-500 group-hover:scale-125 z-10`}>
                {step.icon}
              </div>
              <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 hover:bg-slate-800/50 transition-colors">
                <span className="text-xs font-mono tracking-widest text-slate-500 mb-2 block uppercase">
                  {step.year}
                </span>
                <h3 className="text-2xl font-bold text-slate-100 mb-1">
                  {step.title}
                </h3>
                <h4 className="text-sm font-medium text-slate-400 mb-4">
                  {step.subtitle}
                </h4>
                <p className="text-slate-300 leading-relaxed text-sm md:text-base">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}